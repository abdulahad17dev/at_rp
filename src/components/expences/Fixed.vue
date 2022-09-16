<template>
  <div class="table-responsive m-1">
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
                      @click="
                        select(item.Bank_accounts.id, item.Bank_accounts.name)
                      "
                    >
                      <a class="dropdown-item">{{ item.Bank_accounts.name }}</a>
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
                    : expenses_get(page_expense, limit_expense, search_expense)
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
          <td>{{ new Intl.NumberFormat().format(item.Expenses.money) }} сўм</td>
          <td>
            {{
              new Date(item.Expenses.time)
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
    <Data_notfound v-if="fixed_history == ''" />
  </div>
</template>

<script>
import { bank_account_get, fixed_expence_get } from "@/utils/request/request";
import { catchError } from "@/utils/request/handle_api_err";
import Data_notfound from "@/utils/notfound/data_notfound.vue";
export default {
  name: "FixedItem",
  props: ["fixed_history"],
  emits: ["from", "to"],
  data() {
    return {
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
    limit_account(e) {
      this.page_account = 0;
      this.bank_accounts_get(this.page_account, e, this.search_account);
    },
    page_account(e) {
      this.bank_accounts_get(e, this.limit_account, this.search_account);
      document.getElementById("scroll").scrollTop = 0;
    },
    search_account(e) {
      this.page_account = 0;
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
      this.page_expense = 0;
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
      this.$emit("from", id);
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
      this.$emit("to", id);
      this.text_expense = name;
      document.getElementById("select_expense").click();
    },
  },
  components: { Data_notfound },
};
</script>

<style lang="scss" scoped>
th select {
  width: 170px;
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
}

.table-responsive {
  max-height: 64vh;
  min-height: 64vh;
}

@media (max-width: 634px) {
  .table-responsive {
    max-height: 58vh;
    min-height: 58vh;
  }
}
table {
  width: 100%;
  min-width: 900px;
}
</style>
