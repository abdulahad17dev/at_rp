<template>
  <Header_item />

  <div class="row mb-2">
    <div class="col mt-2 d-flex align-items-center justify-content-center">
      <button
        class="btn btn-sm btn-secondary mx-1"
        data-bs-toggle="modal"
        data-bs-target="#fixed_expense"
        v-if="role == 'admin'"
      >
        <i class="fa-solid fa-list"></i> Доимий чиқим турини қўшиш
      </button>
      <button
        class="btn btn-sm btn-secondary"
        data-bs-toggle="modal"
        data-bs-target="#pay_for_fixed_expense"
        v-if="role != 'admin'"
      >
        Доимий <i class="fa-solid fa-circle-plus"></i>
      </button>
      <button
        class="btn btn-sm btn-secondary mx-1"
        data-bs-toggle="modal"
        data-bs-target="#pay_for_variable_expense"
        v-if="role != 'admin'"
      >
        Бир марталик <i class="fa-solid fa-circle-plus"></i>
      </button>
    </div>
  </div>

  <ul
    class="nav nav-pills nav-fill nav-justified mb-3 row"
    id="pills-tab"
    role="tablist"
  >
    <li
      class="nav-item col-lg-4 col-md-6 col-sm-12 my-1 col-xxl-4"
      role="presentation"
      v-if="role == 'admin'"
    >
      <button
        class="btn btn-sm w-100 btn-light"
        id="pills-home-tab"
        data-bs-toggle="pill"
        data-bs-target="#pills-home"
        type="button"
        role="tab"
        aria-controls="pills-home"
        aria-selected="true"
        @click="
          fixed_expenses.length ? '' : get_fixed_expenses(page, limit, search)
        "
      >
        Чиқимлар
      </button>
    </li>
    <li
      class="nav-item col-lg-4 col-md-6 col-sm-12 my-1 col-xxl-4"
      role="presentation"
    >
      <button
        class="btn btn-sm w-100 btn-light"
        id="pills-profile-tab"
        data-bs-toggle="pill"
        data-bs-target="#pills-profile"
        type="button"
        role="tab"
        aria-controls="pills-profile"
        aria-selected="false"
        @click="fixed = true"
      >
        Доимий чиқимлар
      </button>
    </li>
    <li
      class="nav-item col-lg-4 col-md-6 col-sm-12 my-1 col-xxl-4"
      role="presentation"
    >
      <button
        class="btn btn-sm w-100 btn-light"
        id="pills-contact-tab"
        data-bs-toggle="pill"
        data-bs-target="#pills-contact"
        type="button"
        role="tab"
        aria-controls="pills-contact"
        aria-selected="false"
        @click="variable = true"
      >
        Бир марталик чиқимлар
      </button>
    </li>
  </ul>
  <div class="tab-content" id="pills-tabContent">
    <div
      class="tab-pane fade show"
      id="pills-home"
      role="tabpanel"
      aria-labelledby="pills-home-tab"
    >
      <div class="row m-1">
        <div class="col mt-1 d-flex align-items-center">
          <span>Лимит</span>
          <select
            class="form-control form-control-sm mx-2 form-select"
            v-model="limit"
          >
            <option value="25" selected>25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>
        <div class="col mt-2 d-flex align-items-center justify-content-end">
          <span>Қидириш: </span>
          <div class="input-group input-group-sm mx-2">
            <input
              type="search"
              v-model="search"
              class="form-control form-control-sm"
            />
          </div>
        </div>
      </div>

      <FixedExpenses :data="fixed_expenses" @get_item="get_item" />

      <nav
        aria-label="Page navigation example"
        class="mt-1"
        v-if="fixed_expenses != ''"
      >
        <ul class="pagination pagination-sm justify-content-end">
          <li class="page-item">
            <button
              type="button"
              class="page-link"
              @click="get_fixed_expenses(page, limit, search)"
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
    </div>
    <div
      class="tab-pane fade"
      id="pills-profile"
      role="tabpanel"
      aria-labelledby="pills-profile-tab"
    >
      <Fixed v-if="fixed == true" />
    </div>
    <div
      class="tab-pane fade"
      id="pills-contact"
      role="tabpanel"
      aria-labelledby="pills-contact-tab"
    >
      <Variable v-if="variable == true" />
    </div>
  </div>

  <!-- Modal -->
  <div
    class="modal fade"
    id="fixed_expense"
    tabindex="-1"
    aria-labelledby="fixed_expenses"
    aria-hidden="true"
    v-if="role == 'admin'"
  >
    <div class="modal-dialog">
      <div class="modal-content border-0">
        <div class="modal-header">
          <h5 class="modal-title">Доимий чиқим турини қўшиш</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            id="expense_close"
          ></button>
        </div>
        <form @submit.prevent="add_fixed_expense">
          <div class="modal-body">
            <div class="row gap-2">
              <div class="col-10 mx-auto">
                <label for="expense_name">Чиқим номи: </label>
                <input
                  id="expense_name"
                  type="text"
                  class="form-control form-control-sm"
                  placeholder="Доимий чиқим номи"
                  v-model="body.name"
                  required
                />
              </div>
              <div class="col-10 mx-auto">
                <label for="expense_role">Рухсат этилган ихтисослик</label>
                <select
                  id="expense_role"
                  class="form-control form-control-sm"
                  v-model="body.allowed_user_role"
                  required
                >
                  <option value="taminotchi">таминотчи</option>
                  <option value="kassir">кассир</option>
                  <option value="bugalter">бугалтер</option>
                </select>
              </div>
              <div class="col-10 mx-auto">
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio1"
                    value="option1"
                    @click="
                      (limit_of_expense = true), (body.limit_of_expense = null)
                    "
                    required
                  />
                  <label class="form-check-label" for="inlineRadio1"
                    >Лимит</label
                  >
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio2"
                    value="option2"
                    @click="
                      (body.limit_of_expense = 0), (limit_of_expense = false)
                    "
                    required
                  />
                  <label class="form-check-label" for="inlineRadio2"
                    >Безлимит</label
                  >
                </div>
                <div
                  class="input-group input-group-sm mt-1"
                  v-if="limit_of_expense"
                >
                  <input
                    type="number"
                    class="form-control"
                    placeholder="Лимит"
                    v-model="body.limit_of_expense"
                    required
                    min="1"
                  />
                  <span class="input-group-text bg-white"> сўм </span>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="submit"
              class="btn btn-outline-primary btn-sm"
              id="fixed_expense_disabled"
            >
              <i class="fa-solid fa-circle-check"></i>
            </button>
            <button
              type="button"
              class="btn btn-outline-danger btn-sm"
              data-bs-dismiss="modal"
            >
              <i class="fa-solid fa-circle-xmark"></i>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <FixedItemPut :item="item" @put="put" />
</template>

<script>
import Header_item from "@/components/header/header_item.vue";
import { catchError, success } from "@/utils/request/handle_api_err";
import {
  fixed_expence_add,
  fixed_expence_get,
  fixed_expence_put,
} from "@/utils/request/request";
import Fixed from "@/components/expences/Fixed.vue";
import Variable from "@/components/expences/Variable.vue";
import FixedExpenses from "../../components/expences/FixedExpenses.vue";
import FixedItemPut from "@/components/expences/FixedItemPut.vue";
export default {
  components: { Header_item, Fixed, Variable, FixedExpenses, FixedItemPut },
  name: "ExpencesItem",
  data() {
    return {
      fixed_expenses: [],
      bank_account: [],
      body: {
        name: "",
        allowed_user_role: "",
        limit_of_expense: null,
      },
      search: "",
      limit: 25,
      page: 0,
      pages: null,
      role: localStorage.getItem("role"),
      limit_of_expense: false,
      item: {},
      fixed: false,
      variable: false,
    };
  },
  watch: {
    limit(e) {
      this.page = 0;
      this.get_fixed_expenses(this.page, e, this.search);
    },
    page(e) {
      this.get_fixed_expenses(e, this.limit, this.search);
      document.getElementById("scroll").scrollTop = 0;
    },
    search(e) {
      this.page = 0;
      if (e.length > 0) {
        this.get_fixed_expenses(this.page, this.limit, this.search);
      } else if (e.length == 0) {
        this.get_fixed_expenses(this.page, this.limit, this.search);
        this.page = 0;
      }
    },
  },
  methods: {
    add_fixed_expense() {
      document.getElementById("fixed_expense_disabled").disabled = true;
      this.$store.dispatch("setLoading", { isLoading: true });
      fixed_expence_add(this.body)
        .then((res) => {
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("expense_close").click();
          document.getElementById("fixed_expense_disabled").disabled = false;
          success(res).then(() => {
            this.get_fixed_expenses(this.page, this.limit, this.search);
            this.body.name = "";
            this.body.allowed_user_role = "";
            this.body.limit_of_expense = null;
            this.limit_of_expense = false;
          });
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("fixed_expense_disabled").disabled = false;
        });
    },
    get_fixed_expenses(page, limit, search) {
      this.$store.dispatch("setLoading", { isLoading: true });

      fixed_expence_get(page, limit, search)
        .then((res) => {
          this.fixed_expenses = res.data.data;
          this.pages = res.data.pages;
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
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("disabled" + e.id).disabled = false;
          success(res).then(() => {
            this.get_fixed_expenses(this.page, this.limit, this.search);
          });
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("disabled" + e.id).disabled = false;
        });
    },
    get_item(e) {
      this.item = {
        id: e.id,
        name: e.name,
        allowed_user_role: e.allowed_user_role,
        limit_of_expense: e.limit_of_expense,
      };
    },
    put(e) {
      this.$store.dispatch("setLoading", { isLoading: true });
      document.getElementById("fixed_e_disabled").disabled = true;
      fixed_expence_put(e)
        .then((res) => {
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("expense_p_close").click();
          document.getElementById("fixed_e_disabled").disabled = false;
          success(res).then(() => {
            this.get_fixed_expenses(this.page, this.limit, this.search);
          });
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("fixed_e_disabled").disabled = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.col select {
  width: 80px;
  height: 30px;
}
.col .input-group {
  width: 200px;
}
@media (max-width: 632px) {
  .row {
    display: block;
  }
  .row .col .input-group {
    width: 600px;
  }
  .row .col select {
    width: 50%;
  }
}
button.active {
  background: #6c757d !important;
  color: #fff;
}
</style>
