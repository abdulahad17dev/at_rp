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
      >
        Чиқимлар тарихи
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
        @click="users.length ? '' : get_transfer(filter)"
        >Ҳодимларга берилган пуллар
      </a>
    </li>
  </ul>
  <div class="tab-content" id="pills-tabContent">
    <div
      class="tab-pane fade show active"
      id="pills-home"
      role="tabpanel"
      aria-labelledby="pills-home-tab"
    >
      <form @submit.prevent="time" class="m-1 mt-2">
        <div class="row">
          <div class="col">
            <input
              type="date"
              class="form-control form-control-sm"
              v-model="h_from_time"
              required
            />
          </div>
          <div class="col">
            <input
              type="date"
              class="form-control form-control-sm"
              v-model="h_to_time"
              required
            />
          </div>
          <div class="col">
            <div class="btn-group w-100">
              <button
                class="btn btn-outline-primary btn-sm w-80"
                :disabled="h_from_time == '' || h_to_time == ''"
              >
                <i class="fa-solid fa-search"></i>
              </button>
              <button
                class="btn btn-outline-danger btn-sm w-20"
                @click="reset"
                v-if="h_from_time && h_to_time"
              >
                <i class="fa-solid fa-circle-xmark"></i>
              </button>
            </div>
          </div>
        </div>
      </form>

      <div class="table-responsive m-1">
        <table
          class="table table-sm table-hover"
          id="select_fixed_expense_data2"
        >
          <thead>
            <tr>
              <th style="width: 5%">№</th>
              <th style="width: 20%">Сумма</th>
              <th style="width: 20%">Сана</th>
              <th style="width: 30%">Изох</th>
              <th>
                <div class="dropdown">
                  <button
                    class="btn btn-light btn-sm dropdown-toggle"
                    type="button"
                    id="expenses_select"
                    data-mdb-toggle="dropdown"
                    data-bs-auto-close="outside"
                    aria-expanded="false"
                    @click="
                      expenses.length
                        ? ''
                        : expense_get(
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
                    aria-labelledby="bank_account"
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
                    <li>
                      <hr class="dropdown-divider m-0" />
                    </li>
                    <li>
                      <nav aria-label="Page navigation example" class="mt-2">
                        <ul
                          class="pagination pagination-sm justify-content-end"
                        >
                          <li class="page-item">
                            <button
                              type="button"
                              class="page-link"
                              @click="
                                expense_get(
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
            <Select_data :id="'select_fixed_expense_data2'" />
          </li>
          <li class="page-item">
            <select
              class="form-control form-control-sm form-select mx-1"
              v-model="h_limit"
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
                  h_page,
                  h_limit,
                  h_from,
                  h_to,
                  h_user_id,
                  h_from_time,
                  h_to_time
                )
              "
            >
              <i class="fa-solid fa-rotate"></i>
            </button>
          </li>
          <li class="page-item">
            <button class="page-link" @click="h_page--" :disabled="h_page == 0">
              <i class="fa-solid fa-angle-left text-dark"></i>
            </button>
          </li>
          <li class="page-item">
            <select
              class="form-control form-control-sm page_select"
              v-model="h_page"
            >
              <option :value="item - 1" v-for="item in h_pages" :key="item">
                {{ item }}
              </option>
            </select>
          </li>
          <li class="page-item">
            <button
              class="page-link"
              @click="h_page++"
              :disabled="h_page == h_pages - 1"
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
      <div class="row">
        <div class="col mt-2 m-1 d-flex align-items-center justify-content-end">
          <select
            style="width: 200px"
            class="form-control form-control-sm"
            v-model="filter"
            @change="get_transfer()"
          >
            <option value="user">ходим ўтказган пуллар</option>
            <option value="cashier">кассир ўтказган пуллар</option>
          </select>
        </div>
      </div>
      <div v-if="filter == 'user'">
        <div class="table-responsive">
          <table class="table table-sm table-hover">
            <thead>
              <tr>
                <th style="width: 10%">№</th>
                <th style="width: 20%">Сумма</th>
                <th style="width: 20%">Сана</th>
                <th style="width: 20%">Изох</th>
                <th>Ходим</th>
                <th style="width: 15%">
                  <select
                    class="form-control form-control-sm"
                    v-model="user_status"
                    @change="get_transfer(filter)"
                  >
                    <option value="false">қабул қилинганмаган</option>
                    <option value="true">қабул қилинган</option>
                  </select>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, inc) in users" :key="item">
                <td>{{ inc + 1 }}</td>
                <td>
                  {{ new Intl.NumberFormat().format(item.Transfers.money) }} сўм
                </td>
                <td>
                  {{
                    new Date(item.Transfers.time)
                      .toLocaleDateString({
                        year: "numeric",
                        month: "numeric",
                        day: "numeric",
                      })
                      .slice(0, 10)
                  }}
                </td>
                <td>{{ item.Transfers.comment }}</td>
                <td>
                  <b class="text-primary">{{ item.user_for_from_ }}</b>
                </td>
                <td></td>
              </tr>
            </tbody>
          </table>
          <Data_notfound v-if="users == ''" />
        </div>

        <nav
          aria-label="Page navigation example"
          class="mt-1"
          v-if="users != ''"
        >
          <ul class="pagination pagination-sm justify-content-end">
            <li class="page-item">
              <select
                class="form-control form-control-sm form-select mx-1"
                v-model="user_limit"
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
                @click="get_transfer(filter)"
              >
                <i class="fa-solid fa-rotate"></i>
              </button>
            </li>
            <li class="page-item">
              <button
                class="page-link"
                @click="user_page--"
                :disabled="user_page == 0"
              >
                <i class="fa-solid fa-angle-left text-dark"></i>
              </button>
            </li>
            <li class="page-item">
              <select
                class="form-control form-control-sm page_select"
                v-model="user_page"
              >
                <option
                  :value="item - 1"
                  v-for="item in user_pages"
                  :key="item"
                >
                  {{ item }}
                </option>
              </select>
            </li>
            <li class="page-item">
              <button
                class="page-link"
                @click="user_page++"
                :disabled="user_page == user_pages - 1"
              >
                <i class="fa-solid fa-angle-right text-dark"></i>
              </button>
            </li>
          </ul>
        </nav>
      </div>
      <div v-else>
        <div class="table-responsive">
          <table class="table table-sm table-hover">
            <thead>
              <tr>
                <th style="width: 10%">№</th>
                <th style="width: 20%">Сумма</th>
                <th style="width: 20%">Сана</th>
                <th style="width: 20%">Изох</th>
                <th>Ходим</th>
                <th style="width: 15%">
                  <select
                    class="form-control form-control-sm"
                    v-model="cashier_status"
                    @change="get_transfer(filter)"
                  >
                    <option value="false">қабул қилинганмаган</option>
                    <option value="true">қабул қилинган</option>
                  </select>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, inc) in cashiers" :key="item">
                <td>{{ inc + 1 }}</td>
                <td>
                  {{ new Intl.NumberFormat().format(item.Transfers.money) }} сўм
                </td>
                <td>
                  {{
                    new Date(item.Transfers.time)
                      .toLocaleDateString({
                        year: "numeric",
                        month: "numeric",
                        day: "numeric",
                      })
                      .slice(0, 10)
                  }}
                </td>
                <td>{{ item.Transfers.comment }}</td>
                <td>
                  <b class="text-primary">{{ item.user_for_to_ }}</b>
                </td>
                <td></td>
              </tr>
            </tbody>
          </table>
          <Data_notfound v-if="cashiers == ''" />
        </div>
        <nav
          aria-label="Page navigation example"
          class="mt-1"
          v-if="cashiers != ''"
        >
          <ul class="pagination pagination-sm justify-content-end">
            <li class="page-item">
              <select
                class="form-control form-control-sm form-select mx-1"
                v-model="cashier_limit"
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
                @click="get_transfer(filter)"
              >
                <i class="fa-solid fa-rotate"></i>
              </button>
            </li>
            <li class="page-item">
              <button
                class="page-link"
                @click="cashier_page--"
                :disabled="cashier_page == 0"
              >
                <i class="fa-solid fa-angle-left text-dark"></i>
              </button>
            </li>
            <li class="page-item">
              <select
                class="form-control form-control-sm page_select"
                v-model="cashier_page"
              >
                <option
                  :value="item - 1"
                  v-for="item in cashier_pages"
                  :key="item"
                >
                  {{ item }}
                </option>
              </select>
            </li>
            <li class="page-item">
              <button
                class="page-link"
                @click="cashier_page++"
                :disabled="cashier_page == cashier_pages - 1"
              >
                <i class="fa-solid fa-angle-right text-dark"></i>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import Header_item from "@/components/header/header_item.vue";
import {
  fixed_expence_get,
  get_fixed_history,
  transfer_m_cashiers_get,
  transfer_users_get,
} from "@/utils/request/request";
import { catchError } from "@/utils/request/handle_api_err";
import Data_notfound from "@/utils/notfound/data_notfound.vue";
import Select_data from "@/utils/select_data/select_data.vue";

export default {
  name: "CashierHistory",
  components: { Header_item, Data_notfound, Select_data },
  data() {
    return {
      h_limit: 25,
      h_page: 0,
      h_pages: null,
      h_from: 0,
      h_from_time: "",
      h_to_time: "",
      h_to: 0,
      h_user_id: this.$route.query.id,
      fixed_history: [],
      page_expense: 0,
      pages_expense: null,
      limit_expense: 25,
      search_expense: "",
      expenses: [],
      text_expense: "чиқимлар",
      user_pages: 0,
      user_page: 0,
      user_limit: 25,
      user_from: 0,
      user_to: this.$route.query.id,
      users: [],
      user_status: true,
      cashier_pages: 0,
      cashier_page: 0,
      cashier_limit: 25,
      cashier_from: this.$route.query.id,
      cashier_to: 0,
      cashier_status: true,
      cashiers: [],
      filter: "user",
    };
  },
  watch: {
    h_limit(e) {
      this.h_page = 0;
      this.fixed_history_get(
        this.h_page,
        e,
        this.h_from,
        this.h_to,
        this.h_user_id,
        this.h_from_time,
        this.h_to_time
      );
    },
    h_page(e) {
      this.fixed_history_get(
        e,
        this.h_limit,
        this.h_from,
        this.h_to,
        this.h_user_id,
        this.h_from_time,
        this.h_to_time
      );
    },
    limit_expense(e) {
      this.page_account = 0;
      this.expense_get(this.page_expense, e, this.search_expense);
    },
    page_expense(e) {
      this.expense_get(e, this.limit_expense, this.search_expense);
    },
    search_expense() {
      this.page_expense = 0;
      this.expense_get(
        this.page_expense,
        this.limit_expense,
        this.search_expense
      );
    },
  },
  methods: {
    fixed_history_get(
      h_page,
      h_limit,
      h_from,
      h_to,
      h_user_id,
      h_from_time,
      h_to_time
    ) {
      this.$store.dispatch("setLoading", { isLoading: true });
      get_fixed_history(
        h_page,
        h_limit,
        h_from,
        h_to,
        h_user_id,
        h_from_time,
        h_to_time
      )
        .then((res) => {
          this.fixed_history = res.data.data;
          this.h_pages = res.data.pages;
          this.$store.dispatch("setLoading", { isLoading: false });
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
        });
    },
    time() {
      this.fixed_history_get(
        this.h_page,
        this.h_limit,
        this.h_from,
        this.h_to,
        this.h_user_id,
        this.h_from_time,
        this.h_to_time
      );
      this.page = 0;
    },
    reset() {
      this.h_from_time = "";
      this.h_to_time = "";
      this.fixed_history_get(
        this.h_page,
        this.h_limit,
        this.h_from,
        this.h_to,
        this.h_user_id,
        this.h_from_time,
        this.h_to_time
      );
      this.page = 0;
    },
    expense_get(page_expense, limit_expense, search_expense) {
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
      document.getElementById("expenses_select").click();
      this.h_page = 0;
      this.fixed_history_get(
        this.h_page,
        this.h_limit,
        this.h_from,
        id,
        this.h_user_id,
        this.h_from_time,
        this.h_to_time
      );
    },
    get_transfer() {
      if (this.filter == "user") {
        this.$store.dispatch("setLoading", { isLoading: true });
        transfer_m_cashiers_get(
          this.user_page,
          this.user_limit,
          this.user_from,
          this.user_to,
          this.user_status,
          "",
          ""
        )
          .then((res) => {
            this.users = res.data.data;
            this.user_pages = res.data.pages;
            this.$store.dispatch("setLoading", { isLoading: false });
          })
          .catch((err) => {
            catchError(err);
            this.$store.dispatch("setLoading", { isLoading: false });
          });
      } else {
        this.$store.dispatch("setLoading", { isLoading: true });
        transfer_users_get(
          this.cashier_page,
          this.cashier_limit,
          this.cashier_from,
          this.cashier_to,
          this.cashier_status,
          "",
          ""
        )
          .then((res) => {
            this.cashiers = res.data.data;
            this.cashier_pages = res.data.pages;
            this.$store.dispatch("setLoading", { isLoading: false });
          })
          .catch((err) => {
            catchError(err);
            this.$store.dispatch("setLoading", { isLoading: false });
          });
      }
    },
  },
  created() {
    this.fixed_history_get(
      this.h_page,
      this.h_limit,
      this.h_from,
      this.h_to,
      this.h_user_id,
      this.h_from_time,
      this.h_to_time
    );
  },
};
</script>

<style lang="scss" scoped>
.table-responsive {
  max-height: 63vh;
  min-height: 63vh;
}

@media (max-width: 500px) {
  .table-responsive {
    max-height: 90vh;
    min-height: 90vh;
  }
}
table {
  width: 100%;
  min-width: 800px;
}
</style>
