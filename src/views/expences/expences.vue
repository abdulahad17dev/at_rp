<template>
  <Header_item />

  <div class="row mb-2">
    <div class="col mt-2 d-flex align-items-center justify-content-center">
      <button
        class="btn btn-sm btn-secondary mx-1"
        data-mdb-toggle="modal"
        data-mdb-target="#fixed_expense"
        v-if="role == 'admin'"
      >
        <i class="fa-solid fa-list"></i> Доимий чиқим турини қўшиш
      </button>
      <button
        class="btn btn-sm btn-secondary"
        data-mdb-toggle="modal"
        data-mdb-target="#pay_for_fixed_expense"
        v-if="role != 'admin'"
      >
        Доимий <i class="fa-solid fa-circle-plus"></i>
      </button>
      <!-- <button
        class="btn btn-sm btn-secondary mx-1"
         data-mdb-toggle="modal"
        data-mdb-target="#pay_for_variable_expense"
        v-if="role != 'admin'"
      >
        Бир марталик <i class="fa-solid fa-circle-plus"></i>
      </button> -->
    </div>
  </div>

  <div v-if="role == 'admin'">
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

  <form @submit.prevent="time" v-if="role != 'admin'">
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

  <Fixed
    v-if="role != 'admin'"
    :fixed_history="fixed_history"
    @from="sort_from"
    @to="sort_to"
    @remove="remove"
  />

  <nav
    aria-label="Page navigation example"
    class="mt-1"
    v-if="fixed_history != ''"
  >
    <ul class="pagination pagination-sm justify-content-end">
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
        <button class="page-link" @click="h_page = 0" :disabled="h_page == 0">
          <i class="fa-solid fa-angles-left text-dark"></i>
        </button>
      </li>
      <li class="page-item">
        <button class="page-link" @click="h_page--" :disabled="h_page == 0">
          <i class="fa-solid fa-angle-left text-dark"></i>
        </button>
      </li>
      <li class="page-item">
        <button class="page-link text-dark" disabled>
          {{ h_page + 1 }}
        </button>
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
      <li class="page-item">
        <button
          class="page-link"
          @click="h_page = h_pages - 1"
          :disabled="h_page == h_pages - 1"
        >
          <i class="fa-solid fa-angles-right text-dark"></i>
        </button>
      </li>
    </ul>
  </nav>

  <ul
    v-if="variable_history.length"
    class="nav nav-tabs nav-fill nav-justified mb-3 row"
    id="pills-tab"
    role="tablist"
  >
    <li
      class="nav-item col-lg-4 col-md-6 col-sm-12 my-1 col-xxl-4"
      role="presentation"
      v-if="role == 'admin'"
    >
      <a
        class="nav-link"
        id="pills-home-tab"
        data-mdb-toggle="pill"
        data-mdb-target="#pills-home"
        type="button"
        role="tab"
        aria-controls="pills-home"
        aria-selected="true"
        @click="
          fixed_expenses.length ? '' : get_fixed_expenses(page, limit, search)
        "
      >
        Чиқимлар
      </a>
    </li>
    <li
      class="nav-item col-lg-4 col-md-6 col-sm-12 my-1 col-xxl-4"
      role="presentation"
    >
      <a
        class="nav-link"
        id="pills-profile-tab"
        data-mdb-toggle="pill"
        data-mdb-target="#pills-profile"
        type="button"
        role="tab"
        aria-controls="pills-profile"
        aria-selected="false"
        @click="
          fixed_history.length
            ? ''
            : fixed_history_get(
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
        Доимий чиқимлар
      </a>
    </li>
    <li
      class="nav-item col-lg-4 col-md-6 col-sm-12 my-1 col-xxl-4"
      role="presentation"
    >
      <a
        class="nav-link"
        id="pills-contact-tab"
        data-mdb-toggle="pill"
        data-mdb-target="#pills-contact"
        type="button"
        role="tab"
        aria-controls="pills-contact"
        aria-selected="false"
        @click="
          variable_history.length
            ? ''
            : variable_history_get(v_page, v_limit, v_from, v_user_id)
        "
      >
        Бир марталик чиқимлар
      </a>
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
      <Fixed :fixed_history="fixed_history" @from="sort_from" @to="sort_to" />

      <nav
        aria-label="Page navigation example"
        class="mt-1"
        v-if="fixed_history != ''"
      >
        <ul class="pagination pagination-sm justify-content-end">
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
            <button
              class="page-link"
              @click="h_page = 0"
              :disabled="h_page == 0"
            >
              <i class="fa-solid fa-angles-left text-dark"></i>
            </button>
          </li>
          <li class="page-item">
            <button class="page-link" @click="h_page--" :disabled="h_page == 0">
              <i class="fa-solid fa-angle-left text-dark"></i>
            </button>
          </li>
          <li class="page-item">
            <button class="page-link text-dark" disabled>
              {{ h_page + 1 }}
            </button>
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
          <li class="page-item">
            <button
              class="page-link"
              @click="h_page = h_pages - 1"
              :disabled="h_page == h_pages - 1"
            >
              <i class="fa-solid fa-angles-right text-dark"></i>
            </button>
          </li>
        </ul>
      </nav>
    </div>
    <div
      class="tab-pane fade"
      id="pills-contact"
      role="tabpanel"
      aria-labelledby="pills-contact-tab"
    >
      <Variable :variable_history="variable_history" @from="sort_from_v" />

      <nav
        aria-label="Page navigation example"
        class="mt-1"
        v-if="variable_history != ''"
      >
        <ul class="pagination pagination-sm justify-content-end">
          <li class="page-item">
            <select
              class="form-control form-control-sm form-select mx-1"
              v-model="v_limit"
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
              @click="variable_history_get(v_page, v_limit, v_from, v_user_id)"
            >
              <i class="fa-solid fa-rotate"></i>
            </button>
          </li>
          <li class="page-item">
            <button
              class="page-link"
              @click="v_page = 0"
              :disabled="v_page == 0"
            >
              <i class="fa-solid fa-angles-left text-dark"></i>
            </button>
          </li>
          <li class="page-item">
            <button class="page-link" @click="v_page--" :disabled="v_page == 0">
              <i class="fa-solid fa-angle-left text-dark"></i>
            </button>
          </li>
          <li class="page-item">
            <button class="page-link text-dark" disabled>
              {{ v_page + 1 }}
            </button>
          </li>
          <li class="page-item">
            <button
              class="page-link"
              @click="v_page++"
              :disabled="v_page == v_pages - 1"
            >
              <i class="fa-solid fa-angle-right text-dark"></i>
            </button>
          </li>
          <li class="page-item">
            <button
              class="page-link"
              @click="v_page = v_pages - 1"
              :disabled="v_page == v_pages - 1"
            >
              <i class="fa-solid fa-angles-right text-dark"></i>
            </button>
          </li>
        </ul>
      </nav>
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
            data-mdb-dismiss="modal"
            aria-label="Close"
            id="expense_close"
          ></button>
        </div>
        <form @submit.prevent="add_fixed_expense">
          <div class="modal-body">
            <div class="row gap-2">
              <div class="col-10 mx-auto">
                <label for="expense_name2">Чиқим номи: </label>
                <input
                  id="expense_name2"
                  type="text"
                  class="form-control form-control-sm"
                  placeholder="Доимий чиқим номи"
                  v-model="body.name"
                  required
                />
              </div>
              <div class="col-10 mx-auto">
                <label for="expense_role2">Рухсат этилган ихтисослик</label>
                <select
                  id="expense_role2"
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
                    id="inlineRadio3"
                    value="option1"
                    @click="
                      (limit_of_expense = true), (body.limit_of_expense = null)
                    "
                    required
                  />
                  <label class="form-check-label" for="inlineRadio3"
                    >Лимит:
                  </label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio4"
                    value="option2"
                    @click="
                      (body.limit_of_expense = 0), (limit_of_expense = false)
                    "
                    required
                  />
                  <label class="form-check-label" for="inlineRadio4"
                    >Безлимит</label
                  >
                </div>

                <span class="text-primary d-block" v-if="limit_of_expense"
                  >{{ new Intl.NumberFormat().format(body.limit_of_expense) }}
                  сўм
                </span>
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
                    step="any"
                    min="0"
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
              data-mdb-dismiss="modal"
            >
              <i class="fa-solid fa-circle-xmark"></i>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <FixedItemPut :item="item" @put="put" />
  <FixedBody @pay_f_expense="pay_f_expense" />
  <VariableBody @pay_v_expense="pay_v_expense" />
</template>

<script>
import Header_item from "@/components/header/header_item.vue";
import { catchError, success } from "@/utils/request/handle_api_err";
import {
  fixed_expence_add,
  fixed_expence_get,
  fixed_expence_put,
  get_fixed_history,
  get_variable_history,
  pay_for_fixed_expense,
  pay_for_variable_expense,
  take_back_money_from_expense,
} from "@/utils/request/request";
import Fixed from "@/components/expences/Fixed.vue";
import Variable from "@/components/expences/Variable.vue";
import FixedExpenses from "../../components/expences/FixedExpenses.vue";
import FixedItemPut from "@/components/expences/FixedItemPut.vue";
import FixedBody from "@/components/expences/FixedBody.vue";
import VariableBody from "../../components/expences/VariableBody.vue";
export default {
  components: {
    Header_item,
    Fixed,
    Variable,
    FixedExpenses,
    FixedItemPut,
    FixedBody,
    VariableBody,
  },
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
      fixed_history: [],
      h_limit: 25,
      h_page: 0,
      h_pages: null,
      h_from: 0,
      h_from_time: "",
      h_to_time: "",
      h_to: 0,
      h_user_id: 0,
      v_limit: 25,
      v_page: 0,
      v_pages: null,
      variable_history: [],
      v_from: 0,
      v_user_id: 0,
    };
  },
  watch: {
    limit(e) {
      this.page = 0;
      this.get_fixed_expenses(this.page, e, this.search);
    },
    page(e) {
      this.get_fixed_expenses(e, this.limit, this.search);
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
    v_limit(e) {
      this.v_page = 0;
      this.variable_history_get(this.v_page, e, this.v_from, this.v_user_id);
    },
    v_page(e) {
      this.variable_history_get(e, this.v_limit, this.v_from, this.v_user_id);
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
          success(res);
          this.get_fixed_expenses(this.page, this.limit, this.search);
          this.body.name = "";
          this.body.allowed_user_role = "";
          this.body.limit_of_expense = null;
          this.limit_of_expense = false;
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
          success(res);
          this.get_fixed_expenses(this.page, this.limit, this.search);
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
          success(res);
          this.get_fixed_expenses(this.page, this.limit, this.search);
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("fixed_e_disabled").disabled = false;
        });
    },
    pay_f_expense(e) {
      document.getElementById("pay_f_e_disabled").disabled = true;
      this.$store.dispatch("setLoading", { isLoading: true });
      pay_for_fixed_expense(e)
        .then((res) => {
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("pay_f").click();
          document.getElementById("pay_f_e_disabled").disabled = false;
          success(res);
          this.fixed_history_get(
            this.h_page,
            this.h_limit,
            this.h_from,
            this.h_to,
            this.h_user_id,
            this.h_from_time,
            this.h_to_time
          );
          e.money = null;
          e.from_ = null;
          e.to_ = null;
          e.for_ = 0;
          e.comment = "";

          if (document.getElementById("select_bank_building2")) {
            document.getElementById("select_bank_building2").innerHTML =
              "объектлар";
          }
          if (document.getElementById("bank_account_text")) {
            document.getElementById("bank_account_text").innerHTML =
              "ҳисоб рақамлар";
          }

          document.getElementById("expenses_text").innerHTML = "чиқимлар";
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("pay_f_e_disabled").disabled = false;
        });
    },
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
    sort_from(e) {
      this.h_page = 0;
      this.h_from = e;
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
    sort_to(e) {
      this.h_page = 0;
      this.h_to = e;
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
    pay_v_expense(e) {
      document.getElementById("pay_v_e_disabled").disabled = true;
      this.$store.dispatch("setLoading", { isLoading: true });
      pay_for_variable_expense(e)
        .then((res) => {
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("pay_v").click();
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("pay_v_e_disabled").disabled = false;
          success(res);
          this.variable_history_get(
            this.v_page,
            this.v_limit,
            this.v_from,
            this.v_user_id
          );
          e.money = null;
          e.from_ = null;
          e.comment = "";
          document.getElementById("bank_account_text2").innerHTML =
            "ҳисоб рақамлар";
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("pay_v_e_disabled").disabled = false;
        });
    },
    variable_history_get(v_page, v_limit, v_from, v_user_id) {
      this.$store.dispatch("setLoading", { isLoading: true });
      get_variable_history(v_page, v_limit, v_from, v_user_id)
        .then((res) => {
          this.variable_history = res.data.data;
          this.v_pages = res.data.pages;
          this.$store.dispatch("setLoading", { isLoading: false });
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
        });
    },
    sort_from_v(e) {
      this.v_page = 0;
      this.v_from = e;
      this.variable_history_get(
        this.v_page,
        this.v_limit,
        this.v_from,
        this.v_user_id
      );
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
    remove(e) {
      document.getElementById("remove_expense").disabled = true;
      this.$store.dispatch("setLoading", { isLoading: true });
      take_back_money_from_expense(e, "fixed")
        .then((res) => {
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("remove_expense").disabled = false;
          success(res);
          this.fixed_history_get(
            this.h_page,
            this.h_limit,
            this.h_from,
            this.h_to,
            this.h_user_id,
            this.h_from_time,
            this.h_to_time
          );
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("remove_expense").disabled = false;
        });
    },
  },
  created() {
    if (this.role != "admin") {
      this.fixed_history_get(
        this.h_page,
        this.h_limit,
        this.h_from,
        this.h_to,
        this.h_user_id,
        this.h_from_time,
        this.h_to_time
      );
    } else {
      this.get_fixed_expenses(this.page, this.limit, this.search);
    }
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

@media (max-width: 509px) {
  .row {
    display: block;
  }
  .row .col .input-group {
    width: 100%;
  }
  .row .col select {
    width: 100%;
  }
}
</style>
