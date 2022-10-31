<template>
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
          <div class="dropdown">
            <button
              class="btn btn-light btn-sm dropdown-toggle"
              type="button"
              id="select_bank_market"
              data-bs-toggle="dropdown"
              data-bs-auto-close="outside"
              aria-expanded="false"
              @click="
                markets.length
                  ? ''
                  : get_markets(page_market, limit_market, search_market)
              "
            >
              {{ text_market }}
            </button>
            <ul
              class="dropdown-menu border-top-0"
              aria-labelledby="bank_market"
            >
              <li>
                <input
                  type="search"
                  class="form-control form-control-sm"
                  placeholder="қидириш ..."
                  v-model="search_market"
                />
              </li>
              <li>
                <ul class="dropdown-items">
                  <li @click="select(0, 'барчаси')">
                    <a class="dropdown-item">барчаси</a>
                  </li>
                  <li
                    v-for="item in markets"
                    :key="item"
                    @click="select(item.Markets.id, item.Markets.name)"
                  >
                    <a class="dropdown-item">{{ item.Markets.name }}</a>
                  </li>
                </ul>
              </li>
              <li v-if="markets != ''">
                <hr class="dropdown-divider m-0" />
              </li>
              <li>
                <nav
                  aria-label="Page navigation example"
                  class="mt-2"
                  v-if="markets != ''"
                >
                  <ul class="pagination pagination-sm justify-content-end">
                    <li class="page-item">
                      <button
                        type="button"
                        class="page-link"
                        @click="
                          get_markets(page_market, limit_market, search_market)
                        "
                      >
                        <i class="fa-solid fa-rotate"></i>
                      </button>
                    </li>
                    <li class="page-item">
                      <button
                        type="button"
                        class="page-link"
                        @click="page_market--"
                        :disabled="page_market == 0"
                      >
                        <i class="fa-solid fa-angle-left text-dark"></i>
                      </button>
                    </li>
                    <li class="page-item">
                      <button
                        type="button"
                        class="page-link text-dark"
                        disabled
                      >
                        {{ page_market + 1 }}
                      </button>
                    </li>
                    <li class="page-item">
                      <button
                        type="button"
                        class="page-link"
                        @click="page_market++"
                        :disabled="page_market == pages_market - 1"
                      >
                        <i class="fa-solid fa-angle-right text-dark"></i>
                      </button>
                    </li>
                  </ul>
                </nav>
              </li>
            </ul>
          </div>
        </div>

        <div class="col">
          <select class="form-select form-select-sm" v-model="paid_status">
            <option value="">барчаси</option>
            <option value="true">тўланди</option>
            <option value="false">тўланмади</option>
          </select>
        </div>
        <div class="col">
          <select class="form-select form-select-sm" v-model="status">
            <option value="">барчаси</option>
            <option value="true">қабул қилинди</option>
            <option value="false">қабул қилинмади</option>
          </select>
        </div>
      </div>
    </form>
    <div class="table-responsive mt-3">
      <table class="table table-sm table-hover">
        <thead class="">
          <tr>
            <th style="width: 10%">№</th>
            <th style="width: 15%">Махсулот</th>
            <th style="width: 15%">Ҳажм</th>
            <th style="width: 15%">Ўлчов бирлиги</th>
            <th style="width: 15%">Сана</th>
            <th style="width: 15%">Сумма</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, inc) in requests || []" :key="item">
            <td>
              {{ inc + 1 }}
            </td>
            <td>{{ item.product }}</td>
            <td>
              <Format_numbers :number="item.Supplies.quantity" />
            </td>
            <td>{{ item.Supplies.olchov_birligi }}</td>
            <td>
              {{
                new Date(item.Supplies.time)
                  .toLocaleDateString({
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                  })
                  .slice(0, 10)
              }}
            </td>
            <td>
              <Format_numbers :number="item.Supplies.price" />
              сўм
            </td>
            <td>
              <button
                class="btn btn-sm btn-danger mx-1"
                v-if="item.Supplies.status == false"
                @click="remove(item.Supplies.id)"
                id="remove_supplies"
              >
                <i class="fa-solid fa-circle-xmark"></i>
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
  get_supplies,
  markets_get,
  remove_supply,
} from "@/utils/request/request";
import { catchError, success } from "@/utils/request/handle_api_err";
import Data_notfound from "@/utils/notfound/data_notfound.vue";
import Format_numbers from "@/utils/format/format_numbers.vue";
export default {
  name: "ProcheHistory",
  data() {
    return {
      requests: [],
      pages: null,
      market_id: 0,
      status: "",
      paid_status: "",
      building_id: 0,
      type: "proche",
      from_time: "",
      to_time: "",
      page: 0,
      limit: 25,
      text_market: "таминотчилар",
      page_market: 0,
      pages_market: null,
      limit_market: 25,
      search_market: "",
      markets: [],
    };
  },
  watch: {
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
    market_id(e) {
      this.page = 0;
      this.get_supply(
        e,
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
    paid_status(e) {
      this.status = "";
      this.page = 0;
      this.get_supply(
        this.market_id,
        this.status,
        e,
        this.building_id,
        this.type,
        this.from_time,
        this.to_time,
        this.page,
        this.limit
      );
    },
    limit_market(e) {
      this.page_market = 0;
      this.get_markets(this.page_market, e, this.search_market);
    },
    page_market(e) {
      this.get_markets(e, this.limit_market, this.search_market);
      document.getElementById("scroll").scrollTop = 0;
    },
    search_market(e) {
      this.page_market = 0;
      if (e.length > 0) {
        this.get_markets(
          this.page_market,
          this.limit_market,
          this.search_market
        );
      } else if (e.length == 0) {
        this.get_markets(
          this.page_market,
          this.limit_market,
          this.search_market
        );
        this.page_market = 0;
      }
    },
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
          res.data.data.forEach((element) => {
            if (element.Supplies.paid_status == false) {
              let num =
                element.Supplies.quantity * element.Supplies.price -
                element.sum_paid_money;
              element.total_price = num;
            }
          });

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
    get_markets(page_market, limit_market, search_market) {
      this.$store.dispatch("setLoading", { isLoading: true });

      markets_get(page_market, limit_market, search_market)
        .then((res) => {
          this.markets = res.data.data;
          this.pages_market = res.data.pages;
          this.$store.dispatch("setLoading", { isLoading: false });
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
        });
    },
    select(id, name) {
      this.market_id = id;
      this.text_market = name;
      document.getElementById("select_bank_market").click();
    },
    remove(e) {
      document.getElementById("remove_supplies").disabled = true;
      this.$store.dispatch("setLoading", { isLoading: true });
      remove_supply(e)
        .then((res) => {
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("remove_supplies").disabled = false;
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
          document.getElementById("remove_supplies").disabled = false;
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
  components: { Data_notfound, Format_numbers },
};
</script>

<style lang="scss" scoped>
.request {
  zoom: 75%;
}
.table-responsive {
  max-height: 83vh;
  min-height: 83vh;
}
@media (max-width: 500px) {
  .table-responsive {
    max-height: 115vh;
    min-height: 115vh;
  }
}
table {
  min-width: 1150px;
  width: 100%;
}
</style>
