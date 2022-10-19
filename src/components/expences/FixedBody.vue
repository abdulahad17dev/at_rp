<template>
  <div
    class="modal fade"
    id="pay_for_fixed_expense"
    tabindex="-1"
    aria-labelledby="pay_for_expneses"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="pay_for_expneses">Доимий чиқим</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            id="pay_f"
          ></button>
        </div>
        <form @submit.prevent="$emit('pay_f_expense', pay_body)">
          <div class="modal-body">
            <div class="row gap-2">
              <div class="col-10 mx-auto" v-if="role == 'bugalter'">
                <label for="from">Банк ҳисоб: </label>
                <div class="dropdown">
                  <button
                    class="btn btn-light btn-sm dropdown-toggle"
                    type="button"
                    id="bank_account_text"
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
                        <li
                          v-for="item in bank_accounts"
                          :key="item"
                          @click="
                            select(
                              item.Bank_accounts.id,
                              item.Bank_accounts.name
                            )
                          "
                        >
                          <a class="dropdown-item">{{
                            item.Bank_accounts.name
                          }}</a>
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
                        <ul
                          class="pagination pagination-sm justify-content-end"
                        >
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
              </div>
              <div class="col-10 mx-auto" v-if="role != 'bugalter'">
                <label for="from">Объектлар: </label>
                <div class="dropdown">
                  <button
                    class="btn btn-light btn-sm dropdown-toggle"
                    type="button"
                    id="select_bank_building"
                    data-bs-toggle="dropdown"
                    data-bs-auto-close="outside"
                    aria-expanded="false"
                    @click="
                      buildings.length
                        ? ''
                        : buildings_get(
                            page_building,
                            limit_building,
                            search_building
                          )
                    "
                  >
                    {{ text_building }}
                  </button>
                  <ul
                    class="dropdown-menu border-top-0"
                    aria-labelledby="bank_building"
                  >
                    <li>
                      <input
                        type="search"
                        class="form-control form-control-sm"
                        placeholder="қидириш ..."
                        v-model="search_building"
                      />
                    </li>
                    <li>
                      <ul class="dropdown-items">
                        <li
                          v-for="item in buildings"
                          :key="item"
                          @click="select_building(item.id, item.name)"
                        >
                          <a class="dropdown-item">{{ item.name }}</a>
                        </li>
                      </ul>
                    </li>
                    <li v-if="buildings != ''">
                      <hr class="dropdown-divider m-0" />
                    </li>
                    <li>
                      <nav
                        aria-label="Page navigation example"
                        class="mt-2"
                        v-if="buildings != ''"
                      >
                        <ul
                          class="pagination pagination-sm justify-content-end"
                        >
                          <li class="page-item">
                            <button
                              type="button"
                              class="page-link"
                              @click="
                                buildings_get(
                                  page_building,
                                  limit_building,
                                  search_building
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
                              @click="page_building--"
                              :disabled="page_building == 0"
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
                              {{ page_building + 1 }}
                            </button>
                          </li>
                          <li class="page-item">
                            <button
                              type="button"
                              class="page-link"
                              @click="page_building++"
                              :disabled="page_building == pages_building - 1"
                            >
                              <i class="fa-solid fa-angle-right text-dark"></i>
                            </button>
                          </li>
                        </ul>
                      </nav>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="col-10 mx-auto">
                <label for="to">Чиқим тури: </label>
                <div class="dropdown">
                  <button
                    class="btn btn-light btn-sm dropdown-toggle"
                    type="button"
                    id="expenses_text"
                    data-bs-toggle="dropdown"
                    data-bs-auto-close="outside"
                    aria-expanded="false"
                    @click="
                      expenses.length
                        ? ''
                        : expense_get(
                            page_expense,
                            limit_expense,
                            search_expense
                          )
                    "
                  >
                    {{ text_expense }}
                  </button>
                  <ul
                    class="dropdown-menu border-top-0 expenses_text"
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
                        <ul
                          class="pagination pagination-sm justify-content-end"
                        >
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
              </div>
              <div class="col-10 mx-auto">
                <label for="summa"
                  >Сумма:
                  <span class="text-primary"
                    >{{
                      new Intl.NumberFormat().format(pay_body.money)
                    }}
                    сўм</span
                  ></label
                >
                <div class="input-group input-group-sm">
                  <input
                    type="number"
                    class="form-control"
                    id="summa"
                    step="any"
                    v-model="pay_body.money"
                    required
                    min="1"
                  />
                  <span class="input-group-text bg-white">сўм</span>
                </div>
              </div>
              <div class="col-10 mx-auto">
                <label for="comment">Изох: </label>
                <textarea
                  id="comment"
                  class="form-control form-control-sm"
                  v-model="pay_body.comment"
                ></textarea>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="submit"
              class="btn btn-outline-primary btn-sm"
              id="pay_f_e_disabled"
              :disabled="
                role != 'bugalter'
                  ? !pay_body.money || !pay_body.comment || !pay_body.to_
                  : !pay_body.money ||
                    !pay_body.comment ||
                    !pay_body.from_ ||
                    !pay_body.to_
              "
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
</template>

<script>
import {
  bank_account_get,
  building_get,
  fixed_expence_get,
} from "@/utils/request/request";
import { catchError } from "@/utils/request/handle_api_err";
export default {
  name: "ExpenseFBody",
  data() {
    return {
      page_account: 0,
      pages_account: null,
      limit_account: 25,
      search_account: "",
      page_expense: 0,
      pages_expense: null,
      limit_expense: 25,
      search_expense: "",
      bank_accounts: [],
      expenses: [],
      text_account: "ҳисоб рақамлар",
      text_expense: "чиқимлар",
      pay_body: {
        money: null,
        from_: null,
        to_: null,
        for_: 0,
        comment: "",
      },
      role: localStorage.getItem("role"),
      page_building: 0,
      pages_building: null,
      limit_building: 25,
      search_building: "",
      buildings: [],
      text_building: "объектлар",
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
      this.page_account = 0;
      this.expense_get(this.page_expense, e, this.search_expense);
    },
    page_expense(e) {
      this.expense_get(e, this.limit_expense, this.search_expense);
      document.getElementById("scroll").scrollTop = 0;
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
    limit_building(e) {
      this.page_building = 0;
      this.buildings_get(this.page_building, e, this.search_building);
    },
    page_building(e) {
      this.buildings_get(e, this.limit_building, this.search_building);
      document.getElementById("scroll").scrollTop = 0;
    },
    search_building(e) {
      this.page_building = 0;
      if (e.length > 0) {
        this.buildings_get(
          this.page_building,
          this.limit_building,
          this.search_building
        );
      } else if (e.length == 0) {
        this.buildings_get(
          this.page_building,
          this.limit_building,
          this.search_building
        );
        this.page_building = 0;
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
      this.pay_body.from_ = id;
      this.text_account = name;
      document.getElementById("bank_account_text").click();
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
      this.pay_body.to_ = id;
      this.text_expense = name;
      document.getElementById("expenses_text").click();
    },
    buildings_get(page_building, limit_building, search_building) {
      this.$store.dispatch("setLoading", { isLoading: true });

      building_get(page_building, limit_building, search_building)
        .then((res) => {
          this.buildings = res.data.data;
          this.pages_building = res.data.pages;
          this.$store.dispatch("setLoading", { isLoading: false });
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
        });
    },
    select_building(id, name) {
      this.pay_body.from_ = id;
      this.text_building = name;
      document.getElementById("select_bank_building").click();
    },
  },
};
</script>

<!-- <style lang="scss" scoped>
</style> -->
