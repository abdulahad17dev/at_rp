<template>
  <div class="request">
    <div class="table-responsive mt-3">
      <table class="table table-sm table-hover">
        <thead class="">
          <tr>
            <th style="width: 7%">#ИД</th>
            <th style="width: 15%">Ҳажм</th>
            <th style="width: 15%">Ўлчов бирлиги</th>
            <th style="width: 15%">Сана</th>
            <th style="width: 15%">Жами сумма</th>
            <th style="width: 8%"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in shot_requests || []" :key="item">
            <td>{{ item.id }}</td>
            <td>
              {{ item.quantity }}
            </td>
            <td>{{ item.olchov_birligi }}</td>
            <td>
              {{
                new Date(item.time)
                  .toLocaleDateString("en-us", {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    hour12: false,
                  })
                  .slice(0, 16)
              }}
            </td>
            <td>{{ item.total_price }} сўм</td>
            <td>
              <button
                class="btn btn-sm btn-success"
                @click="accept(item)"
                id="accept_shot"
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
</template>

<script>
import { shot_request, take_supply_b_a } from "@/utils/request/request";
import { catchError, success } from "@/utils/request/handle_api_err";
import Data_notfound from "@/utils/notfound/data_notfound.vue";
export default {
  name: "ShotRequest",
  data() {
    return {
      shot_requests: [],
      pages: null,
      market_id: 0,
      status: false,
      paid_status: "",
      building_id: 0,
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
    time() {
      this.page = 0;
      this.get_shot_r(
        this.market_id,
        this.status,
        this.paid_status,
        this.building_id,
        this.from_time,
        this.to_time,
        this.page,
        this.limit
      );
    },
    reset() {
      this.from_time = "";
      this.to_time = "";
      this.page = 0;
      this.get_shot_r(
        this.market_id,
        this.status,
        this.paid_status,
        this.building_id,
        this.from_time,
        this.to_time,
        this.page,
        this.limit
      );
    },
    accept(e) {
      this.$store.dispatch("setLoading", { isLoading: true });
      this.body = {
        related_id: e.related_id,
        product_composition: e.product_composition,
        sup_by_b_a_id: e.id,
        quantity: e.quantity,
        price: e.total_price,
        market_phone: 0,
        type: e.type,
        didox_link: e.didox_link,
        map_long: "",
        map_lat: "",
        building_id: e.building_id,
      };

      document.getElementById("accept_shot").disabled = true;
      take_supply_b_a(this.body)
        .then((res) => {
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("accept_shot").disabled = false;
          success(res).then(() => {
            this.get_shot_r(
              this.market_id,
              this.status,
              this.paid_status,
              this.building_id,
              this.from_time,
              this.to_time,
              this.page,
              this.limit
            );
          });
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("accept_shot").disabled = false;
        });
    },
  },
  created() {
    this.get_shot_r(
      this.market_id,
      this.status,
      this.paid_status,
      this.building_id,
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
