<template>
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
  </form>
  <div class="table-responsive m-1">
    <table class="table table-sm table-hover">
      <thead>
        <tr>
          <th style="width: 5%">№</th>
          <th style="width: 35%">Сумма</th>
          <th style="width: 20%">Сана</th>
          <th style="width: 40%">Изох</th>
          <th>
            <div class="dropdown">
              <button
                class="btn btn-light btn-sm dropdown-toggle"
                type="button"
                id="expenses_select"
                data-bs-toggle="dropdown"
                data-bs-auto-close="outside"
                aria-expanded="false"
                @click="
                  expenses.length
                    ? ''
                    : expense_get(page_expense, limit_expense, search_expense)
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
                    <ul class="pagination pagination-sm justify-content-end">
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
        <tr v-for="(item, inc) in fixed_history" :key="item">
          <td>{{ inc + 1 }}</td>
          <td>{{ new Intl.NumberFormat().format(item.Expenses.money) }} сўм</td>
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
</template>

<script>
import Data_notfound from "@/utils/notfound/data_notfound.vue";
import { fixed_expence_get, get_fixed_history } from "@/utils/request/request";
import { catchError } from "@/utils/request/handle_api_err";
export default {
  name: "TransferHistoryExpense",
  data() {
    return {
      limit: 25,
      page: 0,
      pages: null,
      fixed_history: [],
      from: this.$route.query.id,
      to: 0,
      user_id: 0,
      from_time: "",
      to_time: "",
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
    to(e) {
      this.page = 0;
      this.fixed_history_get(
        this.page,
        this.limit,
        this.from,
        e,
        this.user_id,
        this.from_time,
        this.to_time
      );
    },
    limit_expense(e) {
      this.page_account = 0;
      this.expense_get(this.page_expense, e, this.search_expense);
    },
    page_expense(e) {
      this.expense_get(e, this.limit_expense, this.search_expense);
    },
    search_expense(e) {
      this.page_expense = 0;
      if (e.length > 0) {
        this.expense_get(
          this.page_expense,
          this.limit_expense,
          this.search_expense
        );
      } else if (e.length == 0) {
        this.expense_get(
          this.page_expense,
          this.limit_expense,
          this.search_expense
        );
        this.page_expense = 0;
      }
    },
  },
  methods: {
    fixed_history_get(page, limit, from, to, user_id, from_time, to_time) {
      this.$store.dispatch("setLoading", { isLoading: true });
      get_fixed_history(page, limit, from, to, user_id, from_time, to_time)
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
      this.to = id;
      this.text_expense = name;
      document.getElementById("expenses_select").click();
    },
    time() {
      this.fixed_history_get(
        this.page,
        this.limit,
        this.from,
        this.to,
        this.user_id,
        this.from_time,
        this.to_time
      );
      this.page = 0;
    },
    reset() {
      this.from_time = "";
      this.to_time = "";
      this.fixed_history_get(
        this.page,
        this.limit,
        this.from,
        this.to,
        this.user_id,
        this.from_time,
        this.to_time
      );
      this.page = 0;
    },
  },
  created() {
    this.expense_get(
      this.page_expense,
      this.limit_expense,
      this.search_expense
    );
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
  max-height: 400px;
  min-height: 400px;
}

@media (max-width: 480px) {
  .table-responsive {
    max-height: 500px;
    min-height: 500px;
  }
}

table {
  width: 100%;
  min-width: 900px;
}
</style>
