<template>
  <details>
    <summary @click="fixed_history_get(page, limit, from, to, user_id)">
      доимий чиқим тарихи
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
              <select
                class="form-control form-control-sm form-select mx-1"
                v-model="to"
                @click="get_expenses"
              >
                <option value="0">барча чиқимлар</option>
                <option :value="item.id" v-for="item in expenses" :key="item">
                  {{ item.name }}
                </option>
              </select>
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
      expenses: [],
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
    to(e) {
      this.page = 0;
      this.fixed_history_get(this.page, this.limit, this.from, e, this.user_id);
    },
  },
  methods: {
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
    get_expenses() {
      this.$store.dispatch("setLoading", { isLoading: true });

      fixed_expence_get()
        .then((res) => {
          this.expenses = res.data;
          this.$store.dispatch("setLoading", { isLoading: false });
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
        });
    },
  },
  components: { Data_notfound },
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
}

table {
  width: 100%;
  min-width: 900px;
}
</style>
