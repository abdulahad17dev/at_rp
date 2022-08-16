<template>
  <Header_item />

  <div class="row mb-2">
    <div class="col mt-2 d-flex align-items-center justify-content-center">
      <button
        class="btn btn-sm btn-secondary mx-1"
        data-bs-toggle="modal"
        data-bs-target="#fixed_expense"
      >
        <i class="fa-solid fa-list"></i>
      </button>
      <button
        class="btn btn-sm btn-secondary"
        data-bs-toggle="modal"
        data-bs-target="#pay_for_fixed_expense"
      >
        Доимий <i class="fa-solid fa-circle-plus"></i>
      </button>
      <button
        class="btn btn-sm btn-secondary mx-1"
        data-bs-toggle="modal"
        data-bs-target="#pay_for_variable_expense"
      >
        Ўзгарувчан <i class="fa-solid fa-circle-plus"></i>
      </button>
    </div>
  </div>

  <div class="table-responsive">
    <table class="table table-sm table-hover table-bordered">
      <thead>
        <tr>
          <th colspan="5" class="text-center">Доимий чиқим тарихи</th>
        </tr>
        <tr>
          <th style="width: 5%">#ИД</th>
          <th style="width: 35%">Сумма</th>
          <th style="width: 30%">Сана</th>
          <th style="width: 30%">Изох</th>
          <th class="d-flex">
            <select
              class="form-control form-control-sm form-select mx-1"
              v-model="from"
            >
              <option value="0">барча хисоблар</option>
              <option :value="item.id" v-for="item in bank_account" :key="item">
                {{ item.name }}
              </option>
            </select>
            <select
              class="form-control form-control-sm form-select mx-1"
              v-model="to"
            >
              <option value="0">барча чиқимлар</option>
              <option
                :value="item.id"
                v-for="item in fixed_expenses"
                :key="item"
              >
                {{ item.name }}
              </option>
            </select>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in fixed_history" :key="item">
          <td>{{ item.id }}</td>
          <td>{{ new Intl.NumberFormat().format(item.money) }} сўм</td>
          <td>{{ new Date(item.time).toLocaleDateString() }}</td>
          <td colspan="2">{{ item.comment }}</td>
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

  <Pay
    @add_fixed_expense="add_fixed_expense"
    :data="fixed_expenses"
    @edit="edit"
    :accounts="bank_account"
    @pay_f_expense="pay_f_expense"
    @pay_v_expense="pay_v_expense"
  />
</template>

<script>
import Header_item from "@/components/header/header_item.vue";
import Pay from "../../components/expences/Pay.vue";
import { catchError, success } from "@/utils/request/handle_api_err";
import {
  bank_account_get,
  fixed_expence_add,
  fixed_expence_get,
  fixed_expence_put,
  get_fixed_history,
  pay_for_fixed_expense,
  pay_for_variable_expense,
} from "@/utils/request/request";
import Data_notfound from "@/utils/notfound/data_notfound.vue";
export default {
  components: { Header_item, Pay, Data_notfound },
  name: "ExpencesItem",
  data() {
    return {
      fixed_expenses: [],
      bank_account: [],
      limit: 25,
      page: 0,
      pages: null,
      fixed_history: [],
      from: 0,
      to: 0,
      user_id: 0,
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
  },
  methods: {
    add_fixed_expense(e) {
      document.getElementById("fixed_expense_disabled").disabled = true;
      this.$store.dispatch("setLoading", { isLoading: true });
      fixed_expence_add(e)
        .then((res) => {
          success(res);
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("fixed_expense_disabled").disabled = false;
          this.get_fixed_expenses();
          e.name = "";
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("fixed_expense_disabled").disabled = false;
        });
    },
    get_fixed_expenses() {
      this.$store.dispatch("setLoading", { isLoading: true });

      fixed_expence_get()
        .then((res) => {
          this.fixed_expenses = res.data;
          this.$store.dispatch("setLoading", { isLoading: false });
          this.get_bank_account();
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
        });
    },
    edit(e) {
      this.$store.dispatch("setLoading", { isLoading: true });
      document.getElementById("disabled" + e.id).disabled = true;
      fixed_expence_put(e)
        .then((res) => {
          success(res);
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("disabled" + e.id).disabled = false;
          this.get_fixed_expenses();
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("disabled" + e.id).disabled = false;
        });
    },
    get_bank_account() {
      this.$store.dispatch("setLoading", { isLoading: true });

      bank_account_get(0, 100)
        .then((res) => {
          this.bank_account = res.data.data;
          this.$store.dispatch("setLoading", { isLoading: false });
          this.fixed_history_get(
            this.page,
            this.limit,
            this.from,
            this.to,
            this.user_id
          );
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
        });
    },
    pay_f_expense(e) {
      document.getElementById("pay_f_e_disabled").disabled = true;
      this.$store.dispatch("setLoading", { isLoading: true });
      pay_for_fixed_expense(e)
        .then((res) => {
          success(res);
          document.getElementById("pay_f").click();
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("pay_f_e_disabled").disabled = false;
          e.money = null;
          e.from_ = null;
          e.to_ = null;
          e.comment = "";
          this.fixed_history_get(
            this.page,
            this.limit,
            this.from,
            this.to,
            this.user_id
          );
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("pay_f_e_disabled").disabled = false;
        });
    },
    pay_v_expense(e) {
      document.getElementById("pay_v_e_disabled").disabled = true;
      this.$store.dispatch("setLoading", { isLoading: true });
      pay_for_variable_expense(e)
        .then((res) => {
          success(res);
          document.getElementById("pay_v").click();
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("pay_v_e_disabled").disabled = false;
          e.money = null;
          e.from_ = null;
          e.comment = "";
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("pay_v_e_disabled").disabled = false;
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
  },
  beforeMount() {
    this.get_fixed_expenses();
  },
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
  max-height: 242.5px;
}

table {
  width: 100%;
  min-width: 900px;
}
</style>
