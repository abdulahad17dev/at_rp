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
        Бир марталик <i class="fa-solid fa-circle-plus"></i>
      </button>
    </div>
  </div>

  <Fixed />

  <Variable />

  <!-- Modal -->
  <div
    class="modal fade"
    id="fixed_expense"
    tabindex="-1"
    aria-labelledby="fixed_expenses"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content border-0">
        <ul
          class="nav nav-pills m-2 nav-justified"
          id="pills-tab"
          role="tablist"
        >
          <li class="nav-item" role="presentation">
            <button
              class="nav-link btn btn-sm active"
              id="pills-home-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-home"
              type="button"
              role="tab"
              aria-controls="pills-home"
              aria-selected="true"
            >
              Чиқим турини қўшиш
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button
              class="nav-link btn btn-sm"
              id="pills-profile-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-profile"
              type="button"
              role="tab"
              aria-controls="pills-profile"
              aria-selected="false"
              @click="get_fixed_expenses(page, limit, search)"
            >
              Чиқим турлари
            </button>
          </li>
        </ul>
        <div class="tab-content" id="pills-tabContent">
          <div
            class="tab-pane fade show active"
            id="pills-home"
            role="tabpanel"
            aria-labelledby="pills-home-tab"
          >
            <form @submit.prevent="add_fixed_expense">
              <div class="modal-body">
                <div class="row gap-2">
                  <div class="col-10 mx-auto">
                    <input
                      type="text"
                      class="form-control form-control-sm"
                      placeholder="Доимий чиқим номи"
                      v-model="body.name"
                      required
                    />
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="submit"
                  class="btn btn-outline-primary btn-sm"
                  id="fixed_expense_disabled"
                >
                  <i class="fas fa-circle-check"></i>
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
          <div
            class="tab-pane fade mb-2"
            id="pills-profile"
            role="tabpanel"
            aria-labelledby="pills-profile-tab"
          >
            <div class="modal-body">
              <div class="row gap-2">
                <div class="col-10 mx-auto">
                  <div class="input-group input-group-sm">
                    <input
                      type="search"
                      v-model="search"
                      placeholder="Қидириш ..."
                      class="form-control"
                    />
                    <div class="input-group-append border-start-0">
                      <select
                        class="form-select form-select-sm"
                        v-model="limit"
                      >
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div
                  class="col-10 mx-auto"
                  v-for="item in fixed_expenses"
                  :key="item"
                >
                  <form @submit.prevent="edit(item)">
                    <div class="input-group input-group-sm">
                      <input
                        type="text"
                        class="form-control"
                        v-model="item.name"
                        required
                      />
                      <div class="input-group-prepend">
                        <button
                          class="btn btn-sm btn-warning"
                          :id="'disabled' + item.id"
                          type="submit"
                        >
                          <i class="fa-solid fa-edit text-white"></i>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
                <div class="col-10 mx-auto">
                  <nav
                    aria-label="Page navigation example"
                    class="mt-1"
                    v-if="fixed_expenses != ''"
                  >
                    <ul class="pagination pagination-sm justify-content-end">
                      <li class="page-item">
                        <button
                          class="page-link"
                          @click="page = 0"
                          :disabled="page == 0"
                        >
                          <i class="fa-solid fa-angles-left text-dark"></i>
                        </button>
                      </li>
                      <li class="page-item">
                        <button
                          class="page-link"
                          @click="page--"
                          :disabled="page == 0"
                        >
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
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-outline-danger btn-sm"
                data-bs-dismiss="modal"
              >
                <i class="fa-solid fa-circle-xmark"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
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
export default {
  components: { Header_item, Fixed, Variable },
  name: "ExpencesItem",
  data() {
    return {
      fixed_expenses: [],
      bank_account: [],
      body: {
        name: "",
      },
      search: "",
      limit: 25,
      page: 0,
      pages: null,
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
          document.getElementById("fixed_expense_disabled").disabled = false;
          success(res).then(() => {
            this.get_fixed_expenses(this.page, this.limit, this.search);
            this.body.name = "";
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
  },
};
</script>

<!-- <style lang="scss" scoped>
</style> -->
