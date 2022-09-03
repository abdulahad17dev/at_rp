<template>
  <div class="table-responsive m-1">
    <table class="table table-sm table-hover table-bordered">
      <thead>
        <tr>
          <th style="width: 5%">#ИД</th>
          <th style="width: 35%">Сумма</th>
          <th style="width: 20%">Сана</th>
          <th style="width: 30%">Изох</th>
          <th>
            <div class="dropdown">
              <button
                class="btn btn-light btn-sm dropdown-toggle"
                type="button"
                id="bank_account_text4"
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
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in variable_history" :key="item">
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
            <b class="text-primary"> {{ item.name }}</b>
          </td>
        </tr>
      </tbody>
    </table>
    <Data_notfound v-if="variable_history == ''" />
  </div>

  <nav
    aria-label="Page navigation example"
    class="mt-1"
    v-if="variable_history != ''"
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
          @click="variable_history_get(page, limit, from, user_id)"
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
        <button class="page-link" @click="page++" :disabled="page == pages - 1">
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

  <div
    class="modal fade"
    id="pay_for_variable_expense"
    tabindex="-1"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Бир марталик</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            id="pay_v"
          ></button>
        </div>
        <VariableBody @pay_v_expense="pay_v_expense" />
      </div>
    </div>
  </div>
</template>

<script>
import Data_notfound from "@/utils/notfound/data_notfound.vue";
import {
  bank_account_get,
  get_variable_history,
  pay_for_variable_expense,
} from "@/utils/request/request";
import { catchError, success } from "@/utils/request/handle_api_err";
import VariableBody from "./VariableBody.vue";
export default {
  name: "VariableItem",
  data() {
    return {
      limit: 25,
      page: 0,
      pages: null,
      variable_history: [],
      from: 0,
      user_id: 0,
      page_account: 0,
      pages_account: null,
      limit_account: 25,
      search_account: "",
      bank_accounts: [],
      text_account: "ҳисоб рақамлар",
    };
  },
  watch: {
    limit(e) {
      this.page = 0;
      this.variable_history_get(this.page, e, this.from, this.user_id);
    },
    page(e) {
      this.variable_history_get(e, this.limit, this.from, this.user_id);
      document.getElementById("scroll").scrollTop = 0;
    },
    from(e) {
      this.page = 0;
      this.variable_history_get(this.page, this.limit, e, this.user_id);
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
  },
  methods: {
    pay_v_expense(e) {
      document.getElementById("pay_v_e_disabled").disabled = true;
      this.$store.dispatch("setLoading", { isLoading: true });
      pay_for_variable_expense(e)
        .then((res) => {
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("pay_v").click();
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("pay_v_e_disabled").disabled = false;
          success(res).then(() => {
            this.variable_history_get(
              this.page,
              this.limit,
              this.from,
              this.user_id
            );
            e.money = null;
            e.from_ = null;
            e.comment = "";
            document.getElementById("bank_account_text2").innerHTML =
              "ҳисоб рақамлар";
          });
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("pay_v_e_disabled").disabled = false;
        });
    },
    variable_history_get(page, limit, from, user_id) {
      this.$store.dispatch("setLoading", { isLoading: true });
      get_variable_history(page, limit, from, user_id)
        .then((res) => {
          this.variable_history = res.data.data;
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
      document.getElementById("bank_account_text4").click();
    },
  },
  created() {
    this.variable_history_get(this.page, this.limit, this.from, this.user_id);
  },
  components: { Data_notfound, VariableBody },
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
  max-height: 65vh;
  min-height: 65vh;
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
