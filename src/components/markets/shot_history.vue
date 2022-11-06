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
              id="select_bank_market3"
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
                    <a class="dropdown-item"
                      >{{ item.Markets.name }} ({{
                        "+998 " + item.Markets.phone
                      }})</a
                    >
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
        <div class="col"></div>
      </div>
    </form>
    <div class="table-responsive mt-3">
      <table class="table table-sm table-hover">
        <thead class="">
          <tr>
            <th style="width: 10%">№</th>
            <th style="width: 20%">Махсулот</th>
            <th style="width: 15%">Ҳажм</th>
            <th style="width: 15%">Ўлчов бирлиги</th>
            <th style="width: 15%">Сана</th>
            <th style="width: 20%">Сумма</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, inc) in requests || []" :key="item">
            <td class="shadow_n">
              {{ inc + 1 }}
              <button
                class="btn btn-sm"
                @click="get_dates(item.Supplies_by_bank_account.related_id)"
                data-bs-toggle="modal"
                data-bs-target="#shot_modal"
              >
                <i
                  class="fa-solid fa-circle-question product"
                  style="font-size: 17px"
                ></i>
              </button>
            </td>
            <td>{{ item.product }}</td>
            <td>
              <Format_numbers
                :number="item.Supplies_by_bank_account.quantity"
              />
            </td>
            <td>
              {{ item.Supplies_by_bank_account.olchov_birligi }}
            </td>
            <td>
              {{
                new Date(item.Supplies_by_bank_account.time)
                  .toLocaleDateString({
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                  })
                  .slice(0, 10)
              }}
            </td>
            <td colspan="2">
              <span class="d-flex">
                <Format_numbers
                  :number="item.Supplies_by_bank_account.total_price"
                />
                <span class="mx-1"> сўм </span>
              </span>
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
  <!-- Modal -->
  <div
    class="modal fade"
    id="shot_modal"
    tabindex="-1"
    aria-labelledby="shot_modal_label"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <p class="modal-title" id="shot_modal_label">Олинганлар</p>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="table-responsive">
            <table class="table table-sm table-hover">
              <thead>
                <tr>
                  <th style="width: 10%">Т/р</th>
                  <th style="width: 15%">Ҳажм</th>
                  <th style="width: 15%">Ўлчов бирлиги</th>
                  <th style="width: 15%">Нарх</th>
                  <th style="width: 20%">Сана</th>
                  <th style="width: 25%">Корхона</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, inc) in dates" :key="item">
                  <td>{{ inc + 1 }}</td>
                  <td>{{ item.Supplies.quantity }}</td>
                  <td>{{ item.Supplies.olchov_birligi }}</td>
                  <td>{{ item.Supplies.price }}</td>
                  <td>{{ item.Supplies.time }}</td>
                  <td>{{ item.Supplies.market }}</td>
                </tr>
              </tbody>
            </table>
            <Data_notfound v-if="!dates.length" />
          </div>

          <nav
            aria-label="Page navigation example"
            class="mt-2"
            v-if="dates.length"
          >
            <ul class="pagination pagination-sm justify-content-end">
              <li class="page-item">
                <select
                  class="form-control form-control-sm form-select mx-1"
                  v-model="d_limit"
                >
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
              </li>
              <li class="page-item">
                <button type="button" class="page-link" @click="get_dates(id)">
                  <i class="fa-solid fa-rotate"></i>
                </button>
              </li>
              <li class="page-item">
                <button
                  class="page-link"
                  @click="d_page = 0"
                  :disabled="d_page == 0"
                >
                  <i class="fa-solid fa-angles-left text-dark"></i>
                </button>
              </li>
              <li class="page-item">
                <button
                  class="page-link"
                  @click="d_page--"
                  :disabled="d_page == 0"
                >
                  <i class="fa-solid fa-angle-left text-dark"></i>
                </button>
              </li>
              <li class="page-item">
                <button class="page-link text-dark" disabled>
                  {{ d_page + 1 }}
                </button>
              </li>
              <li class="page-item">
                <button
                  class="page-link"
                  @click="d_page++"
                  :disabled="d_page == d_pages - 1"
                >
                  <i class="fa-solid fa-angle-right text-dark"></i>
                </button>
              </li>
              <li class="page-item">
                <button
                  class="page-link"
                  @click="d_page = d_pages - 1"
                  :disabled="d_page == d_pages - 1"
                >
                  <i class="fa-solid fa-angles-right text-dark"></i>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Data_notfound from "@/utils/notfound/data_notfound.vue";
import {
  get_supplies,
  markets_get,
  shot_request,
} from "@/utils/request/request";
import { catchError } from "@/utils/request/handle_api_err";
import Format_numbers from "@/utils/format/format_numbers.vue";
export default {
  name: "ShotHistory",
  data() {
    return {
      requests: [],
      pages: null,
      market_id: 0,
      status: "true",
      paid_status: "",
      building_id: 0,
      type: "shot",
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
      d_page: 0,
      d_pages: null,
      d_limit: 25,
      dates: [],
      id: null,
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
      this.get_markets(this.page_market, this.limit_market, e);
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
    d_limit() {
      this.d_page = 0;
      this.get_dates(this.id);
    },
    d_page() {
      this.get_dates(this.id);
      document.getElementById("scroll").scrollTop = 0;
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
      document.getElementById("select_bank_market3").click();
    },
    get_dates(e) {
      this.id = e;
      this.$store.dispatch("setLoading", { isLoading: true });
      get_supplies(0, "", "", 0, "", "", "", this.d_page, this.d_limit, e, "0")
        .then((res) => {
          this.d_pages = res.data.pages;
          this.dates = res.data.data;
          this.$store.dispatch("setLoading", { isLoading: false });
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
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
.mt-3.table-responsive {
  max-height: 83vh;
  min-height: 83vh;
}

.modal-body .table-responsive {
  max-height: 70vh;
  min-height: 70vh;
}

@media (max-width: 500px) {
  .mt-3.table-responsive {
    max-height: 110vh;
    min-height: 110vh;
  }
  .modal-body .table-responsive {
    max-height: 82vh;
    min-height: 82vh;
  }
}
.mt-3 table {
  min-width: 1150px;
  width: 100%;
}

.modal-body .table-responsive table {
  min-width: 900px;
  width: 100%;
  zoom: 75%;
}

.shadow_n button:focus {
  box-shadow: none;
}
</style>
