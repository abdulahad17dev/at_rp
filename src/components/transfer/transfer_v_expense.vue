<template>
  <div class="table-responsive m-1">
    <table class="table table-sm table-hover">
      <thead>
        <tr>
          <th style="width: 5%">№</th>
          <th style="width: 35%">Сумма</th>
          <th style="width: 20%">Сана</th>
          <th style="width: 30%">Изох</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, inc) in variable_history" :key="item">
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
</template>

<script>
import Data_notfound from "@/utils/notfound/data_notfound.vue";
import { get_variable_history } from "@/utils/request/request";
import { catchError } from "@/utils/request/handle_api_err";
export default {
  name: "HistoryExpense",
  data() {
    return {
      limit: 25,
      page: 0,
      pages: null,
      variable_history: [],
      from: this.$route.query.id,
      user_id: 0,
    };
  },
  watch: {
    limit(e) {
      this.page = 0;
      this.variable_history_get(this.page, e, this.from, this.user_id);
    },
    page(e) {
      this.variable_history_get(e, this.limit, this.from, this.user_id);
    },
    from(e) {
      this.page = 0;
      this.variable_history_get(this.page, this.limit, e, this.user_id);
    },
  },
  methods: {
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
  },
  created() {
    this.variable_history_get(this.page, this.limit, this.from, this.user_id);
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
