<template>
  <details>
    <summary @click="fixed_history_get(page, limit, from, to, user_id)">
      Доимий чиқим тарихи
    </summary>
    <div class="table-responsive">
      <table class="table table-sm table-hover">
        <thead>
          <tr>
            <th style="width: 5%">#ИД</th>
            <th style="width: 35%">Сумма</th>
            <th style="width: 20%">Сана</th>
            <th style="width: 40%">Изох</th>
            <th>
              <div class="dropdown">
                <button
                  class="btn btn-light btn-sm dropdown-toggle"
                  type="button"
                  id="select_bank_account"
                  data-bs-toggle="dropdown"
                  data-bs-auto-close="outside"
                  aria-expanded="false"
                  @click="
                    bank_accounts.length
                      ? ''
                      : bank_accounts_get(
                          page_account,
                          limit_account,
                          search_account
                        )
                  "
                >
                  {{ text_account }}
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
                      v-model="search_account"
                    />
                  </li>
                  <li>
                    <ul class="dropdown-items">
                      <li @click="select(0, 'барчаси')">
                        <a class="dropdown-item">барчаси</a>
                      </li>
                      <li
                        v-for="item in bank_accounts"
                        :key="item"
                        @click="select(item.id, item.name)"
                      >
                        <a class="dropdown-item">{{ item.name }}</a>
                      </li>
                    </ul>
                  </li>
                  <li v-if="bank_accounts != ''">
                    <hr class="dropdown-divider m-0" />
                  </li>
                  <li>
                    <nav
                      aria-label="Page navigation example"
                      class="mt-2"
                      v-if="bank_accounts != ''"
                    >
                      <ul class="pagination pagination-sm justify-content-end">
                        <li class="page-item">
                          <button
                            type="button"
                            class="page-link"
                            @click="
                              bank_accounts_get(
                                page_account,
                                limit_account,
                                search_account
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
                            @click="page_account--"
                            :disabled="page_account == 0"
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
                            {{ page_account + 1 }}
                          </button>
                        </li>
                        <li class="page-item">
                          <button
                            type="button"
                            class="page-link"
                            @click="page_account++"
                            :disabled="page_account == pages_account - 1"
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
            <th>
              <div class="dropdown">
                <button
                  class="btn btn-light btn-sm dropdown-toggle"
                  type="button"
                  id="select_expense"
                  data-bs-toggle="dropdown"
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
                      <ul class="pagination pagination-sm justify-content-end">
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
                            :disabled="page_expense == pages_expense - 1"
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
          <tr v-for="item in fixed_history" :key="item">
            <td>{{ item.Expenses.id }}</td>
            <td>
              {{ new Intl.NumberFormat().format(item.Expenses.money) }} сўм
            </td>
            <td>{{ new Date(item.Expenses.time).toLocaleDateString() }}</td>
            <td>{{ item.Expenses.comment }}</td>
            <td>
              <b class="text-primary"> {{ item.bank_account }}</b>
            </td>
            <td>
              <b class="text-primary"> {{ item.fixed_expense }}</b>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <Data_notfound v-if="fixed_history == ''" />
    <nav
      aria-label="Page navigation example"
      class="mt-1"
      v-if="fixed_history != ''"
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
  </details>

  <div
    class="modal fade"
    id="pay_for_fixed_expense"
    tabindex="-1"
    aria-labelledby="pay_for_expneses"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="pay_for_expneses">Доимий чиқим</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            id="pay_f"
          ></button>
        </div>

        <FixedBody @pay_f_expense="pay_f_expense" />
      </div>
    </div>
  </div>
</template>

<script>
import {
  bank_account_get,
  fixed_expence_get,
  get_fixed_history,
  pay_for_fixed_expense,
} from "@/utils/request/request";
import { catchError, success } from "@/utils/request/handle_api_err";
import Data_notfound from "@/utils/notfound/data_notfound.vue";
import FixedBody from "./FixedBody.vue";
export default {
  name: "FixedItem",
  data() {
    return {
      limit: 25,
      page: 0,
      pages: null,
      fixed_history: [],
      from: 0,
      to: 0,
      user_id: 0,
      page_account: 0,
      pages_account: null,
      limit_account: 25,
      search_account: "",
      bank_accounts: [],
      text_account: "ҳисоб рақамлар",
      page_expense: 0,
      pages_expense: null,
      limit_expense: 25,
      search_expense: "",
      expenses: [],
      text_expense: "чиқимлар",
    };
  },
  watch: {
    limit(e) {
      this.page = 0;
      this.fixed_history_get(this.page, e, this.from, this.to, this.user_id);
    },
    page(e) {
      this.fixed_history_get(e, this.limit, this.from, this.to, this.user_id);
      document.getElementById("scroll").scrollTop = 0;
    },
    from(e) {
      this.page = 0;
      this.fixed_history_get(this.page, this.limit, e, this.to, this.user_id);
    },
    to(e) {
      this.page = 0;
      this.fixed_history_get(this.page, this.limit, this.from, e, this.user_id);
    },
    limit_account(e) {
      this.page_account = 0;
      this.bank_accounts_get(this.page_account, e, this.search_account);
    },
    page_account(e) {
      this.bank_accounts_get(e, this.limit_account, this.search_account);
      document.getElementById("scroll").scrollTop = 0;
    },
    search_account(e) {
      if (e.length > 0) {
        this.bank_accounts_get(
          this.page_account,
          this.limit_account,
          this.search_account
        );
      } else if (e.length == 0) {
        this.bank_accounts_get(
          this.page_account,
          this.limit_account,
          this.search_account
        );
        this.page_account = 0;
      }
    },
    limit_expense(e) {
      this.page_expense = 0;
      this.expenses_get(this.page_expense, e, this.search_expense);
    },
    page_expense(e) {
      this.expenses_get(e, this.limit_expense, this.search_expense);
      document.getElementById("scroll").scrollTop = 0;
    },
    search_expense(e) {
      if (e.length > 0) {
        this.expenses_get(
          this.page_expense,
          this.limit_expense,
          this.search_expense
        );
      } else if (e.length == 0) {
        this.expenses_get(
          this.page_expense,
          this.limit_expense,
          this.search_expense
        );
        this.page_expense = 0;
      }
    },
  },
  methods: {
    pay_f_expense(e) {
      document.getElementById("pay_f_e_disabled").disabled = true;
      this.$store.dispatch("setLoading", { isLoading: true });
      pay_for_fixed_expense(e)
        .then((res) => {
          document.getElementById("pay_f").click();
          document.getElementById("pay_f_e_disabled").disabled = false;
          success(res).then(() => {
            this.fixed_history_get(
              this.page,
              this.limit,
              this.from,
              this.to,
              this.user_id
            );
            e.money = null;
            e.from_ = null;
            e.to_ = null;
            e.comment = "";
          });
          document.getElementById("bank_account_text").innerHTML =
            "ҳисоб рақамлар";
          document.getElementById("expenses_text").innerHTML = "чиқимлар";
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("pay_f_e_disabled").disabled = false;
        });
    },
    fixed_history_get(page, limit, from, to, user_id) {
      this.$store.dispatch("setLoading", { isLoading: true });
      get_fixed_history(page, limit, from, to, user_id)
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
    bank_accounts_get(page_account, limit_account, search_account) {
      this.$store.dispatch("setLoading", { isLoading: true });

      bank_account_get(page_account, limit_account, search_account)
        .then((res) => {
          this.bank_accounts = res.data.data;
          this.pages_account = res.data.pages;
          this.$store.dispatch("setLoading", { isLoading: false });
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
        });
    },
    select(id, name) {
      this.from = id;
      this.text_account = name;
      document.getElementById("select_bank_account").click();
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
      this.to = id;
      this.text_expense = name;
      document.getElementById("select_expense").click();
    },
  },
  components: { Data_notfound, FixedBody },
};
</script>

<style lang="scss" scoped>
.page-item select {
  width: 80px;
  height: 30px;
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
}

th select {
  width: 170px;
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
}

.table-responsive {
  max-height: 400px;
  min-height: 400px;
}

table {
  width: 100%;
  min-width: 900px;
}
</style>
