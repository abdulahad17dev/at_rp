<template>
  <Header_item />
  <div class="request">
    <form @submit.prevent="time">
      <div class="row">
        <div class="col">
          <input
            type="date"
            class="form-control form-control-sm"
            v-model="from_time"
            required
          />
        </div>
        <div class="col">
          <input
            type="date"
            class="form-control form-control-sm"
            v-model="to_time"
            required
          />
        </div>
        <div class="col">
          <div class="btn-group w-100">
            <button
              class="btn btn-outline-primary btn-sm w-80"
              :disabled="from_time == '' || to_time == ''"
            >
              <i class="fa-solid fa-search"></i>
            </button>
            <button
              class="btn btn-outline-danger btn-sm w-20"
              @click="reset"
              v-if="from_time && to_time"
            >
              <i class="fa-solid fa-circle-xmark"></i>
            </button>
          </div>
        </div>
      </div>
      <div class="row my-1">
        <div class="col">
          <select class="form-select form-select-sm" v-model="type">
            <option disabled>сўров турини танланг</option>
            <option value="">барчаси</option>
            <option value="proche">проче</option>
            <option value="smeta">смета</option>
            <option value="tarkib">таркиб</option>
          </select>
        </div>
        <div class="col">
          <select class="form-select form-select-sm" v-model="status">
            <option value="">барчаси</option>
            <option value="true">қабул қилинди</option>
            <option value="false">қабул қилинмади</option>
          </select>
        </div>
        <div class="col">
          <!-- <select class="form-select form-select-sm" v-model="paid_status">
            <option value="">барчаси</option>
            <option value="true">тўланди</option>
            <option value="false">тўланмади</option>
          </select> -->
        </div>
      </div>
    </form>
    <div class="table-responsive mt-3">
      <table class="table table-sm table-hover">
        <thead class="">
          <tr>
            <th style="width: 8%">№</th>
            <th style="width: 15%">Махсулот</th>
            <th style="width: 15%">Ҳажм</th>
            <th style="width: 15%">Ўлчов бирлиги</th>
            <th style="width: 15%">Сана</th>
            <th style="width: 15%">Сумма</th>
            <th style="width: 17%"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, inc) in requests || []" :key="item">
            <td>
              {{ inc + 1 }}
            </td>
            <td>{{ item.product }}</td>

            <td>
              {{ new Intl.NumberFormat().format(item.Supplies.quantity) }}
            </td>
            <td>{{ item.Supplies.olchov_birligi }}</td>
            <td>
              {{
                new Date(item.Supplies.time)
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
            <td>
              {{ item.Supplies.price }}
            </td>
            <td>
              <div class="input-group" v-if="item.Supplies.status == false">
                <button
                  class="btn btn-outline-primary btn-sm"
                  @click="input(item.Supplies.id)"
                >
                  <i class="fa-solid fa-upload"></i>
                </button>
                <input
                  type="text"
                  class="form-control form-control-sm"
                  style="cursor: auto !important"
                  :value="body.supply_id == item.Supplies.id ? text : ''"
                  readonly
                />
                <input
                  type="file"
                  accept="image/*"
                  :id="`input_file${item.Supplies.id}`"
                  ref="file"
                  @change="file(item.Supplies.id)"
                  hidden
                />
                <button
                  class="btn btn-sm btn-success mx-2 rounded-lg"
                  :disabled="item.Supplies.id !== body.supply_id"
                  @click="accept"
                  id="disabled_accept_btn"
                  v-if="item.Supplies.status == false"
                >
                  <i class="fa-solid fa-circle-check"></i>
                </button>
              </div>
              <button
                v-else
                class="btn btn-sm btn-danger rounded-lg"
                id="disabled_remove_btn"
                @click="remove(item.Supplies.id)"
              >
                <i class="fa-solid fa-rotate-left"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <Data_notfound v-if="requests == ''" />
    </div>

    <nav
      aria-label="Page navigation example"
      class="mt-2"
      v-if="requests != ''"
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
              get_supply(
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
</template>

<script>
import {
  accept_supply,
  get_supplies,
  remove_supply_w,
} from "@/utils/request/request";
import { catchError, success } from "@/utils/request/handle_api_err";
import Header_item from "@/components/header/header_item.vue";
import Data_notfound from "@/utils/notfound/data_notfound.vue";
export default {
  name: "SupplyInWarehouse",
  data() {
    return {
      requests: [],
      pages: null,
      market_id: 0,
      status: "",
      paid_status: "",
      building_id: 0,
      type: "",
      from_time: "",
      to_time: "",
      page: 0,
      limit: 25,
      body: {
        file: "",
        supply_id: null,
      },
      id: "",
      text: "",
    };
  },
  watch: {
    type(e) {
      this.page = 0;
      this.get_supply(
        this.market_id,
        this.status,
        this.paid_status,
        this.building_id,
        e,
        this.from_time,
        this.to_time,
        this.page,
        this.limit
      );
    },
    status(e) {
      this.paid_status = "";
      this.page = 0;
      this.get_supply(
        this.market_id,
        e,
        this.paid_status,
        this.building_id,
        this.type,
        this.from_time,
        this.to_time,
        this.page,
        this.limit
      );
    },
    // paid_status(e) {
    //   this.status = "";
    //   this.page = 0;
    //   this.get_supply(
    //     this.market_id,
    //     this.status,
    //     e,
    //     this.building_id,
    //     this.type,
    //     this.from_time,
    //     this.to_time,
    //     this.page,
    //     this.limit
    //   );
    // },
  },
  methods: {
    get_supply(
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
      get_supplies(
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
          this.requests = res.data.data;
          this.pages = res.data.pages;
          this.$store.dispatch("setLoading", { isLoading: false });
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
        });
    },
    time() {
      this.get_supply(
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
      this.page = 0;
    },
    reset() {
      this.from_time = "";
      this.to_time = "";
      this.get_supply(
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
      this.page = 0;
    },
    input(e) {
      this.text = "";
      this.body.file = "";
      document.querySelector(`#input_file${e}`).value = null;
      document.getElementById("input_file" + e).click();
    },
    file(e) {
      this.body.supply_id = e;
      this.body.file = document.querySelector(`#input_file${e}`).files[0];
      this.text = document.querySelector(`#input_file${e}`).files[0].name;
    },
    accept() {
      let data = new FormData();
      data.append("file", this.body.file);
      data.append("supply_id", this.body.supply_id);
      document.getElementById("disabled_accept_btn").disabled = true;
      this.$store.dispatch("setLoading", { isLoading: true });
      accept_supply(data)
        .then((res) => {
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("disabled_accept_btn").disabled = false;
          success(res).then(() => {
            this.get_supply(
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

            this.body.file = "";
            this.text = "";
          });
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("disabled_accept_btn").disabled = false;
        });
    },
    remove(e) {
      document.getElementById("disabled_remove_btn").disabled = true;
      this.$store.dispatch("setLoading", { isLoading: true });
      remove_supply_w(e)
        .then((res) => {
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("disabled_remove_btn").disabled = false;
          success(res).then(() => {
            this.get_supply(
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
          });
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("disabled_remove_btn").disabled = false;
        });
    },
  },
  created() {
    this.get_supply(
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
  components: { Header_item, Data_notfound },
};
</script>

<style lang="scss" scoped>
.request {
  zoom: 75%;
}
.table-responsive {
  max-height: 90vh;
  min-height: 90vh;
}
@media (max-width: 500px) {
  .table-responsive {
    max-height: 133vh;
    min-height: 133vh;
  }
}
table {
  min-width: 1200px;
  width: 100%;
}
</style>
