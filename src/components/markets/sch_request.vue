<template>
  <div class="request">
    <div class="table-responsive mt-3">
      <table class="table table-sm table-hover">
        <thead class="">
          <tr>
            <th style="width: 7%">№</th>
            <th style="width: 15%">Махсулот</th>
            <th style="width: 15%">Ҳажм</th>
            <th style="width: 15%">Ўлчов бирлиги</th>
            <th style="width: 15%">Сана</th>
            <th style="width: 15%">Жами сумма</th>
            <th style="width: 8%"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, inc) in shot_requests || []" :key="item">
            <td>{{ inc + 1 }}</td>
            <td>{{ item.product }}</td>
            <td>
              {{
                new Intl.NumberFormat().format(
                  item.Supplies_by_bank_account.quantity
                )
              }}
            </td>
            <td>{{ item.Supplies_by_bank_account.olchov_birligi }}</td>
            <td>
              {{
                new Date(item.Supplies_by_bank_account.time)
                  .toLocaleDateString("en-us", {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                  })
                  .slice(0, 10)
              }}
            </td>
            <td>{{ item.Supplies_by_bank_account.total_price }} сўм</td>
            <td>
              <button
                class="btn btn-sm btn-success"
                @click="get_item(item.Supplies_by_bank_account)"
                data-bs-toggle="modal"
                data-bs-target="#accept_shot_request"
              >
                <i class="fa-solid fa-circle-check text-white"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <Data_notfound v-if="shot_requests == ''" />
    </div>

    <nav
      aria-label="Page navigation example"
      class="mt-2"
      v-if="shot_requests != ''"
    >
      <ul class="pagination pagination-sm justify-content-end">
        <li class="page-item">
          <select
            class="form-control form-control-sm form-select mx-1"
            v-model="limit"
          >
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </li>
        <li class="page-item">
          <button
            type="button"
            class="page-link"
            @click="
              get_shot_r(
                market_id,
                status,
                paid_status,
                building_id,
                type,
                from_time,
                to_time,
                page,
                limit
              )
            "
          >
            <i class="fa-solid fa-rotate"></i>
          </button>
        </li>
        <li class="page-item">
          <button class="page-link" @click="page = 0" :disabled="page == 0">
            <i class="fa-solid fa-angles-left text-dark"></i>
          </button>
        </li>
        <li class="page-item">
          <button class="page-link" @click="page--" :disabled="page == 0">
            <i class="fa-solid fa-angle-left text-dark"></i>
          </button>
        </li>
        <li class="page-item">
          <button class="page-link text-dark" disabled>
            {{ page + 1 }}
          </button>
        </li>
        <li class="page-item">
          <button
            class="page-link"
            @click="page++"
            :disabled="page == pages - 1"
          >
            <i class="fa-solid fa-angle-right text-dark"></i>
          </button>
        </li>
        <li class="page-item">
          <button
            class="page-link"
            @click="page = pages - 1"
            :disabled="page == pages - 1"
          >
            <i class="fa-solid fa-angles-right text-dark"></i>
          </button>
        </li>
      </ul>
    </nav>
  </div>

  <!-- Modal -->
  <div
    class="modal fade"
    id="accept_shot_request"
    tabindex="-1"
    aria-labelledby="accept_shot_requestLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="accept_shot_requestLabel">қабул қилиш</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            id="supply__take_shot"
          ></button>
        </div>
        <form @submit.prevent="take">
          <div class="modal-body">
            <div class="row gap-2">
              <div class="col-10 mx-auto">
                <label for="quantity"> Ҳажм: ({{ quantity }})</label>
                <input
                  type="number"
                  id="quantity"
                  class="form-control form-control-sm"
                  v-model="body.quantity"
                  placeholder="Ҳажм"
                  step="any"
                  min="1"
                  :max="quantity"
                  required
                />
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="submit"
              class="btn btn-outline-primary btn-sm"
              id="supply_disabled_shot"
            >
              <i class="fa-solid fa-circle-check"></i>
            </button>
            <button
              type="button"
              class="btn btn-outline-danger btn-sm"
              data-bs-dismiss="modal"
            >
              <i class="fa-solid fa-circle-xmark"></i>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { shot_request, take_supply_b_a } from "@/utils/request/request";
import {
  catchError,
  position_err,
  success,
} from "@/utils/request/handle_api_err";
import Data_notfound from "@/utils/notfound/data_notfound.vue";
export default {
  name: "ShotRequest",
  data() {
    return {
      shot_requests: [],
      pages: null,
      market_id: 0,
      status: "false",
      paid_status: "",
      building_id: 0,
      type: "",
      from_time: "",
      to_time: "",
      page: 0,
      limit: 25,
      body: {
        related_id: 0,
        product_composition: "",
        sup_by_b_a_id: 0,
        quantity: 0,
        price: 0,
        market_phone: 0,
        type: "",
        didox_link: "",
        map_long: "",
        map_lat: "",
        building_id: 0,
      },
      quantity: "",
    };
  },
  watch: {
    limit(e) {
      this.page = 0;
      this.get_shot_r(
        this.market_id,
        this.status,
        this.paid_status,
        this.building_id,
        this.type,
        this.from_time,
        this.to_time,
        this.page,
        e
      );
    },
    page(e) {
      this.get_shot_r(
        this.market_id,
        this.status,
        this.paid_status,
        this.building_id,
        this.type,
        this.from_time,
        this.to_time,
        e,
        this.limit
      );
      document.getElementById("scroll").scrollTop = 0;
    },
  },
  methods: {
    get_shot_r(
      market_id,
      status,
      paid_status,
      building_id,
      type,
      from_time,
      to_time,
      page,
      limit
    ) {
      this.$store.dispatch("setLoading", { isLoading: true });
      shot_request(
        market_id,
        status,
        paid_status,
        building_id,
        type,
        from_time,
        to_time,
        page,
        limit
      )
        .then((res) => {
          this.shot_requests = res.data.data;
          this.pages = res.data.pages;
          this.$store.dispatch("setLoading", { isLoading: false });
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
        });
    },
    get_item(e) {
      this.body = {
        related_id: e.related_id,
        product_composition: e.product_composition,
        sup_by_b_a_id: e.id,
        quantity: null,
        price: 0,
        market_phone: 0,
        type: e.type,
        didox_link: "",
        map_long: "",
        map_lat: "",
        building_id: e.building_id,
      };

      const success = (position) => {
        this.body.map_lat = position.coords.latitude;
        this.body.map_long = position.coords.longitude;
      };

      const error = (err) => {
        position_err(err);
        this.body.map_lat = 0;
        this.body.map_long = 0;
      };

      navigator.geolocation.getCurrentPosition(success, error);
      this.quantity = e.quantity;
    },
    take() {
      this.$store.dispatch("setLoading", { isLoading: true });
      document.getElementById("supply_disabled_shot").disabled = true;
      take_supply_b_a(this.body)
        .then((res) => {
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("supply__take_shot").click();
          document.getElementById("supply_disabled_shot").disabled = false;
          success(res).then(() => {
            this.get_shot_r(
              this.market_id,
              this.status,
              this.paid_status,
              this.building_id,
              this.type,
              this.from_time,
              this.to_time,
              this.page,
              this.limit
            );

            this.body = {
              related_id: null,
              product_composition: "",
              sup_by_b_a_id: 0,
              quantity: null,
              price: null,
              market_phone: null,
              type: "",
              didox_link: "",
              map_long: "",
              map_lat: "",
              building_id: null,
            };
          });
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("supply_disabled_shot").disabled = false;
        });
    },
  },
  created() {
    this.get_shot_r(
      this.market_id,
      this.status,
      this.paid_status,
      this.building_id,
      this.type,
      this.from_time,
      this.to_time,
      this.page,
      this.limit
    );
  },
  components: { Data_notfound },
};
</script>

<style lang="scss" scoped>
.request {
  zoom: 75%;
}
.table-responsive {
  max-height: 94vh;
  min-height: 94vh;
}
@media (max-width: 500px) {
  .table-responsive {
    max-height: 124vh;
    min-height: 124vh;
  }
}
table {
  min-width: 1150px;
  width: 100%;
}
</style>
