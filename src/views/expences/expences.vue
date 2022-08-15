<template>
  <Header_item />

  <div class="row">
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
        @click="get_bank_account"
      >
        Доимий <i class="fa-solid fa-circle-plus"></i>
      </button>
      <button
        class="btn btn-sm btn-secondary mx-1"
        data-bs-toggle="modal"
        data-bs-target="#pay_for_variable_expense"
        @click="get_bank_account"
      >
        Ўзгарувчан <i class="fa-solid fa-circle-plus"></i>
      </button>
    </div>
  </div>

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
  pay_for_fixed_expense,
  pay_for_variable_expense,
} from "@/utils/request/request";
export default {
  components: { Header_item, Pay },
  name: "ExpencesItem",
  data() {
    return {
      fixed_expenses: [],
      bank_account: [],
    };
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
  },
  beforeMount() {
    this.get_fixed_expenses();
  },
};
</script>

<!-- <style lang="scss" scoped>
</style> -->
