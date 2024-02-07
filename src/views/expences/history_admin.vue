<template>
  <Header_item />
  <ul class="nav nav-tabs nav-justified" id="pills-tab" role="tablist">
    <li class="nav-item mx-1" role="presentation">
      <a
        class="nav-link active"
        id="pills-home-tab"
        data-mdb-toggle="pill"
        data-mdb-target="#pills-home"
        type="button"
        role="tab"
        aria-controls="pills-home"
        aria-selected="true"
        >Чиқимлар тарихи
      </a>
    </li>
    <li class="nav-item mx-1" role="presentation">
      <a
        class="nav-link"
        id="pills-profile-tab"
        data-mdb-toggle="pill"
        data-mdb-target="#pills-profile"
        type="button"
        role="tab"
        aria-controls="pills-profile"
        aria-selected="false"
        @click="supplies.length ? '' : get_supply()"
      >
        Таминотлар тарихи
      </a>
    </li>
  </ul>

  <div class="tab-content" id="pills-tabContent">
    <div
      class="tab-pane fade active show"
      id="pills-home"
      role="tabpanel"
      aria-labelledby="pills-home-tab"
    >
      <div class="table-responsive mt-3 m-1">
        <table class="table table-sm table-hover" id="history_admin">
          <thead>
            <tr>
              <th style="width: 5%">№</th>
              <th style="width: 20%">Сумма</th>
              <th style="width: 20%">Сана</th>
              <th style="width: 25%">Изох</th>
              <th data-exclude="true">
                <div class="dropdown">
                  <button
                    class="btn btn-light btn-sm dropdown-toggle"
                    type="button"
                    id="select_expense"
                    data-mdb-toggle="dropdown"
                    data-bs-auto-close="outside"
                    aria-expanded="false"
                    @click="
                      expenses.length
                        ? ''
                        : expenses_get(
                            page_expense,
                            limit_expense,
                            search_expense
                          )
                    "
                  >
                    {{ text_expense }}
                  </button>
                  <ul
                    class="dropdown-menu border-top-0"
                    aria-labelledby="bank_expense"
                  >
                    <li>
                      <input
                        type="search"
                        class="form-control form-control-sm"
                        placeholder="қидириш ..."
                        v-model="search_expense"
                      />
                    </li>
                    <li>
                      <ul class="dropdown-items">
                        <li @click="select_expense(0, 'барчаси')">
                          <a class="dropdown-item">барчаси</a>
                        </li>
                        <li
                          v-for="item in expenses"
                          :key="item"
                          @click="select_expense(item.id, item.name)"
                        >
                          <a class="dropdown-item">{{ item.name }}</a>
                        </li>
                      </ul>
                    </li>
                    <li v-if="expenses != ''">
                      <hr class="dropdown-divider m-0" />
                    </li>
                    <li>
                      <nav
                        aria-label="Page navigation example"
                        class="mt-2"
                        v-if="expenses != ''"
                      >
                        <ul
                          class="pagination pagination-sm justify-content-end"
                        >
                          <li class="page-item">
                            <button
                              type="button"
                              class="page-link"
                              @click="
                                expenses_get(
                                  page_expense,
                                  limit_expense,
                                  search_expense
                                )
                              "
                            >
                              <i class="fa-solid fa-rotate"></i>
                            </button>
                          </li>
                          <li class="page-item">
                            <button
                              type="button"
                              class="page-link"
                              @click="page_expense--"
                              :disabled="page_expense == 0"
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
                              {{ page_expense + 1 }}
                            </button>
                          </li>
                          <li class="page-item">
                            <button
                              type="button"
                              class="page-link"
                              @click="page_expense++"
                              :disabled="page_expense == pages_expense"
                            >
                              <i class="fa-solid fa-angle-right text-dark"></i>
                            </button>
                          </li>
                        </ul>
                      </nav>
                    </li>
                  </ul>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, inc) in fixed_history" :key="item">
              <td>{{ inc + 1 }}</td>
              <td>
                {{ new Intl.NumberFormat().format(item.Expenses.money) }} сўм
              </td>
              <td>
                {{
                  new Date(item.Expenses.time)
                    .toLocaleDateString({
                      year: "numeric",
                      month: "numeric",
                      day: "numeric",
                    })
                    .slice(0, 10)
                }}
              </td>
              <td>{{ item.Expenses.comment }}</td>
              <td>
                <b class="text-primary"> {{ item.fixed_expense }}</b>
              </td>
            </tr>
          </tbody>
        </table>
        <Data_notfound v-if="fixed_history == ''" />
      </div>
      <nav
        aria-label="Page navigation example"
        class="mt-1"
        v-if="fixed_history != ''"
      >
        <ul class="pagination pagination-sm justify-content-end">
          <li>
            <Select_data :id="'history_admin'" />
          </li>
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
                fixed_history_get(
                  page,
                  limit,
                  from,
                  to,
                  user_id,
                  from_time,
                  to_time
                )
              "
            >
              <i class="fa-solid fa-rotate"></i>
            </button>
          </li>
          <li class="page-item">
            <button class="page-link" @click="page--" :disabled="page == 0">
              <i class="fa-solid fa-angle-left text-dark"></i>
            </button>
          </li>
          <li class="page-item">
            <select
              class="form-control form-control-sm page_select"
              v-model="page"
            >
              <option :value="item - 1" v-for="item in pages" :key="item">
                {{ item }}
              </option>
            </select>
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
        </ul>
      </nav>
    </div>
    <div
      class="tab-pane fade"
      id="pills-profile"
      role="tabpanel"
      aria-labelledby="pills-profile-tab"
    >
      <form @submit.prevent="time" class="mt-2">
        <div class="row">
          <div class="col">
            <input
              type="date"
              class="form-control form-control-sm"
              v-model="from_time_"
              required
            />
          </div>
          <div class="col">
            <input
              type="date"
              class="form-control form-control-sm"
              v-model="to_time_"
              required
            />
          </div>
          <div class="col">
            <div class="btn-group w-100">
              <button
                class="btn btn-outline-primary btn-sm w-80"
                :disabled="from_time_ == '' || to_time_ == ''"
              >
                <i class="fa-solid fa-search"></i>
              </button>
              <button
                class="btn btn-outline-danger btn-sm w-20"
                @click="reset"
                v-if="from_time_ && to_time_"
              >
                <i class="fa-solid fa-circle-xmark"></i>
              </button>
            </div>
          </div>
        </div>
        <div class="row my-1">
          <div class="col-lg-3 col-md-6 col-sm-6 col-6 mt-1">
            <div class="dropdown">
              <button
                class="btn btn-light btn-sm dropdown-toggle"
                type="button"
                id="select_bank_market"
                data-mdb-toggle="dropdown"
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
                    <li @click="select(0, 'барчаси', '')">
                      <a class="dropdown-item">барчаси</a>
                    </li>
                    <li
                      v-for="item in markets"
                      :key="item"
                      @click="
                        select(
                          item.Markets.id,
                          item.Markets.name,
                          item.Markets.phone
                        )
                      "
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
                            get_markets(
                              page_market,
                              limit_market,
                              search_market
                            )
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

          <div class="col-lg-3 col-md-6 col-sm-6 col-6 mt-1">
            <select
              class="form-select form-select-sm"
              v-model="paid_status_"
              @change="
                page_ = 0;
                get_supply();
              "
            >
              <option value="">барчаси</option>
              <option value="true">тўланди</option>
              <option value="false">тўланмади</option>
            </select>
          </div>
          <div class="col-lg-3 col-md-6 col-sm-6 col-6 mt-1">
            <select
              class="form-select form-select-sm"
              v-model="status_"
              @change="
                page_ = 0;
                get_supply();
              "
            >
              <option value="">барчаси</option>
              <option value="true">қабул қилинди</option>
              <option value="false">қабул қилинмади</option>
            </select>
          </div>
        </div>
      </form>
      <div class="table-responsive supply mt-3">
        <table class="table table-sm table-hover">
          <thead class="">
            <tr>
              <th style="width: 10%">№</th>
              <th style="width: 20%">Махсулот</th>
              <th style="width: 10%">Ҳажм</th>
              <th style="width: 10%">Ўлчов бирлиги</th>
              <th style="width: 10%">Сана</th>
              <th style="width: 15%">Сотувчи корхона</th>
              <th style="width: 15%">Сумма</th>
              <th style="width: 10%">
                <select
                  class="form-select form-select-sm"
                  v-model="type_"
                  @change="
                    page_ = 0;
                    get_supply();
                  "
                >
                  <option value="">барчаси</option>
                  <option value="proche">проче</option>
                  <option value="smeta">смета</option>
                  <option value="tarkib">таркиб</option>
                </select>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, inc) in supplies" :key="item">
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
                {{ item.market }}(<a
                  class="text-decoration-none text-dark"
                  :href="`tel:+998${item.market_phone}`"
                >
                  +998 {{ item.market_phone }} </a
                >)
              </td>
              <td>
                <Format_numbers :number="item.Supplies.price" />
                <span class="mx-1"> сўм </span>
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
        <Data_notfound v-if="supplies == ''" />
      </div>
      <nav
        aria-label="Page navigation example"
        class="mt-2"
        v-if="supplies != ''"
      >
        <ul class="pagination pagination-sm justify-content-end">
          <li class="page-item">
            <select
              class="form-control form-control-sm form-select mx-1"
              v-model="limit_"
              @change="get_supply()"
            >
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </li>
          <li class="page-item">
            <button type="button" class="page-link" @click="get_supply()">
              <i class="fa-solid fa-rotate"></i>
            </button>
          </li>
          <li class="page-item">
            <button
              class="page-link"
              @click="page_--, get_supply()"
              :disabled="page_ == 0"
            >
              <i class="fa-solid fa-angle-left text-dark"></i>
            </button>
          </li>
          <li class="page-item">
            <select
              class="form-control form-control-sm page_select"
              v-model="page_"
            >
              <option :value="item - 1" v-for="item in pages_" :key="item">
                {{ item }}
              </option>
            </select>
          </li>
          <li class="page-item">
            <button
              class="page-link"
              @click="page_++, get_supply()"
              :disabled="page_ == pages_ - 1"
            >
              <i class="fa-solid fa-angle-right text-dark"></i>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import Header_item from "@/components/header/header_item.vue";
import {
  fixed_expence_get,
  get_fixed_history,
  get_supplies,
  markets_get,
} from "@/utils/request/request";
import { catchError } from "@/utils/request/handle_api_err";
import Data_notfound from "@/utils/notfound/data_notfound.vue";
import Select_data from "@/utils/select_data/select_data.vue";
import Format_numbers from "@/utils/format/format_numbers.vue";

export default {
  name: "FixedExpenseHistory",
  components: { Header_item, Data_notfound, Select_data, Format_numbers },
  data() {
    return {
      fixed_history: [],
      limit: 25,
      page: 0,
      pages: null,
      to: 0,
      from_time: "",
      to_time: "",
      from: Number(this.$route.query.id),
      user_id: 0,
      page_expense: 0,
      pages_expense: null,
      limit_expense: 25,
      search_expense: "",
      expenses: [],
      text_expense: "чиқимлар",
      user_id_: 0,
      market_id_: 0,
      status_: "",
      paid_status_: "",
      building_id_: this.$route.query.id,
      type_: "",
      from_time_: "",
      to_time_: "",
      page_: 0,
      limit_: 25,
      pages_: null,
      supplies: [],
      text_market: "маҳсулот сотувчи",
      page_market: 0,
      pages_market: null,
      limit_market: 25,
      search_market: "",
      markets: [],
    };
  },
  watch: {
    limit(e) {
      this.page = 0;
      this.fixed_history_get(
        this.page,
        e,
        this.from,
        this.to,
        this.user_id,
        this.from_time,
        this.to_time
      );
    },
    page(e) {
      this.fixed_history_get(
        e,
        this.limit,
        this.from,
        this.to,
        this.user_id,
        this.from_time,
        this.to_time
      );
    },
    limit_expense(e) {
      this.page_expense = 0;
      this.expenses_get(this.page_expense, e, this.search_expense);
    },
    page_expense(e) {
      this.expenses_get(e, this.limit_expense, this.search_expense);
    },
    search_expense(e) {
      this.page_expense = 0;
      this.expenses_get(this.page_expense, this.limit_expense, e);
    },
    limit_market(e) {
      this.page_market = 0;
      this.get_markets(this.page_market, e, this.search_market);
    },
    page_market(e) {
      this.get_markets(e, this.limit_market, this.search_market);
    },
    search_market(e) {
      this.page_market = 0;
      this.get_markets(this.page_market, this.limit_market, e);
    },
  },
  methods: {
    fixed_history_get() {
      this.$store.dispatch("setLoading", { isLoading: true });
      get_fixed_history(
        this.page,
        this.limit,
        this.from,
        this.to,
        this.user_id,
        this.from_time,
        this.to_time
      )
        .then((res) => {
          this.fixed_history = res.data.data;
          this.pages = res.data.pages;
          this.$store.dispatch("setLoading", { isLoading: false });
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
        });
    },
    expenses_get(page_expense, limit_expense, search_expense) {
      this.$store.dispatch("setLoading", { isLoading: true });

      fixed_expence_get(page_expense, limit_expense, search_expense)
        .then((res) => {
          this.expenses = res.data.data;
          this.pages_expense = res.data.pages;
          this.$store.dispatch("setLoading", { isLoading: false });
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
        });
    },
    select_expense(id, name) {
      this.text_expense = name;
      document.getElementById("select_expense").click();
      this.page = 0;
      this.fixed_history_get(
        this.page,
        this.limit,
        this.from,
        id,
        this.user_id,
        this.from_time,
        this.to_time
      );
    },
    get_supply() {
      this.$store.dispatch("setLoading", { isLoading: true });
      get_supplies(
        this.market_id_,
        this.status_,
        this.paid_status_,
        this.building_id_,
        this.type_,
        this.from_time_,
        this.to_time_,
        this.page_,
        this.limit_,
        0,
        "",
        this.user_id_
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

          this.supplies = res.data.data;
          this.pages_ = res.data.pages;
          this.$store.dispatch("setLoading", { isLoading: false });
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
        });
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
    select(id, name, phone) {
      this.market_id_ = id;
      this.page_ = 0;
      this.get_supply();
      if (phone) {
        this.text_market = name + " +998 " + phone;
        document.getElementById("select_bank_market").click();
      } else {
        this.text_market = name;
        document.getElementById("select_bank_market").click();
      }
    },
    time() {
      this.page_ = 0;
      this.get_supply();
    },
    reset() {
      this.from_time_ = "";
      this.to_time_ = "";
      this.page_ = 0;
      this.get_supply();
    },
  },
  created() {
    this.fixed_history_get();
  },
};
</script>

<style lang="scss" scoped>
.table-responsive {
  max-height: 67vh;
  min-height: 67vh;
}

@media (max-width: 500px) {
  .table-responsive {
    max-height: 96vh;
    min-height: 96vh;
  }
}
table {
  width: 100%;
  min-width: 900px;
}

.supply.table-responsive {
  max-height: 57vh;
  min-height: 57vh;
}

@media (max-width: 500px) {
  .supply.table-responsive {
    max-height: 80vh;
    min-height: 80vh;
  }
}
.supply table {
  min-width: 1000px;
  width: 100%;
}
</style>
