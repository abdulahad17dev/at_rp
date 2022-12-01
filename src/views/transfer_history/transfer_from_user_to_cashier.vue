<template>
  <Header_item :balance="balance" />

  <ul
    class="nav nav-tabs navv-fill nav-justified mb-3"
    id="pills-tab"
    role="tablist"
  >
    <li class="nav-item mx-1" role="presentation">
      <a
        class="nav-link"
        id="pills-profile-tab"
        data-mdb-toggle="pill"
        data-mdb-target="#pills-profile"
        type="button"
        role="tab"
        aria-controls="pills-profile"
        aria-selected="false"
        @click="accept = true"
      >
        кассирлардан пул қабул қилиш
      </a>
    </li>
    <li class="nav-item mx-1" role="presentation">
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
          transfer_cashier.length
            ? ''
            : this.transfer_to_users(
                this.t_page,
                this.t_limit,
                this.t_from,
                this.t_to,
                this.t_status,
                this.t_from_time,
                this.t_to_time
              )
        "
      >
        кассирларга пул ўтказиш
      </a>
    </li>
  </ul>
  <div class="tab-content" id="pills-tabContent">
    <div
      class="tab-pane fade"
      id="pills-profile"
      role="tabpanel"
      aria-labelledby="pills-profile-tab"
    >
      <Accept_m_in_users_from_cashier
        v-if="accept"
        @get_balance="get_balance"
      />
    </div>
    <div
      class="tab-pane fade"
      id="pills-home"
      role="tabpanel"
      aria-labelledby="pills-home-tab"
    >
      <form @submit.prevent="time">
        <div class="row mb-1">
          <div class="col">
            <input
              type="date"
              class="form-control form-control-sm"
              v-model="t_from_time"
              required
            />
          </div>
          <div class="col">
            <input
              type="date"
              class="form-control form-control-sm"
              v-model="t_to_time"
              required
            />
          </div>
          <div class="col">
            <div class="btn-group w-100">
              <button
                class="btn btn-outline-primary btn-sm w-80"
                :disabled="t_from_time == '' || t_to_time == ''"
              >
                <i class="fa-solid fa-search"></i>
              </button>
              <button
                class="btn btn-outline-danger btn-sm w-20"
                @click="reset"
                v-if="t_from_time && t_to_time"
              >
                <i class="fa-solid fa-circle-xmark"></i>
              </button>
              <button
                class="btn btn-sm btn-outline-secondary"
                type="button"
                data-mdb-toggle="modal"
                data-mdb-target="#pay_cashier"
              >
                <i class="fa-solid fa-money-bill-transfer"></i>
              </button>
            </div>
          </div>
        </div>
      </form>

      <Money_to_cashier_items
        :transfer_cashier="transfer_cashier"
        @status="sort_status"
        @to="sort_to"
        @remove="remove"
      />

      <nav
        aria-label="Page navigation example"
        class="mt-1"
        v-if="transfer_cashier != ''"
      >
        <ul class="pagination pagination-sm justify-content-end">
          <div class="page-item">
            <select
              class="form-control form-control-sm form-select mx-1"
              v-model="t_limit"
            >
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>
          <li class="page-item">
            <button
              type="button"
              class="page-link"
              @click="
                transfer_to_users(
                  t_page,
                  t_limit,
                  t_from,
                  t_to,
                  t_status,
                  t_from_time,
                  t_to_time
                )
              "
            >
              <i class="fa-solid fa-rotate"></i>
            </button>
          </li>
          <li class="page-item">
            <button
              class="page-link"
              @click="t_page = 0"
              :disabled="t_page == 0"
            >
              <i class="fa-solid fa-angles-left text-dark"></i>
            </button>
          </li>
          <li class="page-item">
            <button class="page-link" @click="t_page--" :disabled="t_page == 0">
              <i class="fa-solid fa-angle-left text-dark"></i>
            </button>
          </li>
          <li class="page-item">
            <button class="page-link text-dark" disabled>
              {{ t_page + 1 }}
            </button>
          </li>
          <li class="page-item">
            <button
              class="page-link"
              @click="t_page++"
              :disabled="t_page == t_pages - 1"
            >
              <i class="fa-solid fa-angle-right text-dark"></i>
            </button>
          </li>
          <li class="page-item">
            <button
              class="page-link"
              @click="t_page = t_pages - 1"
              :disabled="t_page == t_pages - 1"
            >
              <i class="fa-solid fa-angles-right text-dark"></i>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  </div>

  <div class="modal fade" id="pay_cashier">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Пул ўтказиш</h5>
          <button
            type="button"
            class="btn-close"
            data-mdb-dismiss="modal"
            aria-label="Close"
            id="pay_cashier_c"
          ></button>
        </div>
        <form @submit.prevent="transfer">
          <div class="modal-body">
            <div class="row gap-2">
              <div class="col-10 mx-auto">
                <label for="balance5">
                  Сумма:
                  <span class="text-primary"
                    >{{ new Intl.NumberFormat().format(body.money) }} сўм
                  </span></label
                >
                <div class="input-group input-group-sm">
                  <input
                    id="balance5"
                    type="number"
                    step="any"
                    class="form-control"
                    v-model="body.money"
                    required
                    min="0"
                  />
                  <span class="input-group-text bg-white">сўм</span>
                </div>
              </div>
              <div class="col-10 mx-auto">
                <label for="user">Кассирлар: </label>
                <div class="dropdown">
                  <button
                    class="btn btn-light btn-sm dropdown-toggle"
                    type="button"
                    id="cashier_text"
                    data-mdb-toggle="dropdown"
                    data-bs-auto-close="outside"
                    aria-expanded="false"
                    @click="
                      cashiers.length
                        ? ''
                        : get_cashier(page, limit, search, role)
                    "
                  >
                    {{ text }}
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
                        v-model="search"
                      />
                    </li>
                    <li>
                      <ul class="dropdown-items">
                        <li
                          v-for="item in cashiers"
                          :key="item"
                          @click="select(item.id, item.name)"
                        >
                          <a class="dropdown-item">{{ item.name }}</a>
                        </li>
                      </ul>
                    </li>
                    <li v-if="cashiers != ''">
                      <hr class="dropdown-divider m-0" />
                    </li>
                    <li>
                      <nav
                        aria-label="Page navigation example"
                        class="mt-2"
                        v-if="cashiers != ''"
                      >
                        <ul
                          class="pagination pagination-sm justify-content-end"
                        >
                          <li class="page-item">
                            <button
                              type="button"
                              class="page-link"
                              @click="get_cashier(page, limit, search, role)"
                            >
                              <i class="fa-solid fa-rotate"></i>
                            </button>
                          </li>
                          <li class="page-item">
                            <button
                              type="button"
                              class="page-link"
                              @click="page--"
                              :disabled="page == 0"
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
                              {{ page + 1 }}
                            </button>
                          </li>
                          <li class="page-item">
                            <button
                              type="button"
                              class="page-link"
                              @click="page++"
                              :disabled="page == pages - 1"
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
                <label for="comment15">Изох: </label>
                <textarea
                  id="comment15"
                  class="form-control form-control-sm"
                  v-model="body.comment"
                ></textarea>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="submit"
              class="btn btn-outline-primary btn-sm"
              id="cashier_disabled"
              :disabled="!body.money || !body.to_ || !body.comment"
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
</template>

<script>
import {
  accept_or_remove_m_user,
  current_user,
  transfer_money_to_cashier,
  transfer_m_cashiers_get,
  user_get,
} from "@/utils/request/request";
import { catchError, success } from "@/utils/request/handle_api_err";
import Header_item from "../../components/header/header_item.vue";
import Money_to_cashier_items from "@/components/transfer/money_to_cashier_items.vue";
import Accept_m_in_users_from_cashier from "../../components/transfer/accept_m_in_users_from_cashier.vue";
export default {
  name: "TransferFromUserToCashier",
  data() {
    return {
      body: {
        money: null,
        from_: 0,
        to_: null,
        comment: "",
      },
      limit: 25,
      page: 0,
      pages: null,
      search: "",
      cashiers: [],
      role: "kassir",
      text: "кассирлар",
      balance: null,
      transfer_cashier: [],
      t_from_time: "",
      t_to_time: "",
      t_from: 0,
      t_to: 0,
      t_status: false,
      t_page: 0,
      t_limit: 25,
      t_pages: null,
      accept: false,
    };
  },
  watch: {
    id(e) {
      this.cashier.from_ = e;
    },
    limit(e) {
      this.page = 0;
      this.get_cashier(this.page, e, this.search, this.role);
    },
    page(e) {
      this.get_cashier(e, this.limit, this.search, this.role);
    },
    search(e) {
      this.page = 0;
      if (e.length > 0) {
        this.get_cashier(this.page, this.limit, this.search, this.role);
      } else if (e.length == 0) {
        this.get_cashier(this.page, this.limit, this.search, this.role);
        this.page = 0;
      }
    },
    t_limit(e) {
      this.t_page = 0;
      this.transfer_to_users(
        this.t_page,
        e,
        this.t_from,
        this.t_to,
        this.t_status,
        this.t_from_time,
        this.t_to_time
      );
    },
    t_page(e) {
      this.transfer_to_users(
        e,
        this.t_limit,
        this.t_from,
        this.t_to,
        this.t_status,
        this.t_from_time,
        this.t_to_time
      );
    },
  },
  methods: {
    get_cashier(page, limit, search, role) {
      this.$store.dispatch("setLoading", { isLoading: true });
      user_get(page, limit, search, role)
        .then((res) => {
          this.cashiers = res.data.data;
          this.pages = res.data.pages;
          this.$store.dispatch("setLoading", { isLoading: false });
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
        });
    },
    transfer() {
      document.getElementById("cashier_disabled").disabled = true;
      this.$store.dispatch("setLoading", { isLoading: true });
      transfer_money_to_cashier(this.body)
        .then((res) => {
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("pay_cashier_c").click();
          document.getElementById("cashier_disabled").disabled = false;
          success(res);
          this.transfer_to_users(
            this.t_page,
            this.t_limit,
            this.t_from,
            this.t_to,
            this.t_status,
            this.t_from_time,
            this.t_to_time
          );
          this.body.money = null;
          this.body.from_ = 0;
          this.body.to_ = null;
          this.body.comment = "";
          this.text = "кассирлар";
          this.get_balance();
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("cashier_disabled").disabled = false;
        });
    },
    select(id, name) {
      this.body.to_ = id;
      this.text = name;
      document.getElementById("cashier_text").click();
    },
    get_balance() {
      this.$store.dispatch("setLoading", { isLoading: true });
      current_user()
        .then((res) => {
          this.balance = res.data.balance;
          this.$store.dispatch("setLoading", { isLoading: false });
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
        });
    },
    transfer_to_users(
      t_page,
      t_limit,
      t_from,
      t_to,
      t_status,
      t_from_time,
      t_to_time
    ) {
      this.$store.dispatch("setLoading", { isLoading: true });
      transfer_m_cashiers_get(
        t_page,
        t_limit,
        t_from,
        t_to,
        t_status,
        t_from_time,
        t_to_time
      )
        .then((res) => {
          this.transfer_cashier = res.data.data;
          this.pages = res.data.pages;
          this.$store.dispatch("setLoading", { isLoading: false });
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
        });
    },
    time() {
      this.transfer_to_users(
        this.t_page,
        this.t_limit,
        this.t_from,
        this.t_to,
        this.t_status,
        this.t_from_time,
        this.t_to_time
      );
      this.t_page = 0;
    },
    reset() {
      this.t_from_time = "";
      this.t_to_time = "";
      this.transfer_to_users(
        this.t_page,
        this.t_limit,
        this.t_from,
        this.t_to,
        this.t_status,
        this.t_from_time,
        this.t_to_time
      );
      this.t_page = 0;
    },
    sort_status(e) {
      this.t_status = e;
      this.t_page = 0;
      this.transfer_to_users(
        this.t_page,
        this.t_limit,
        this.t_from,
        this.t_to,
        this.t_status,
        this.t_from_time,
        this.t_to_time
      );
    },
    sort_to(e) {
      this.t_page = 0;
      this.t_to = e;
      this.transfer_to_users(
        this.t_page,
        this.t_limit,
        this.t_from,
        this.t_to,
        this.t_status,
        this.t_from_time,
        this.t_to_time
      );
    },
    remove(e) {
      this.$store.dispatch("setLoading", { isLoading: true });
      document.getElementById(e).disabled = true;
      accept_or_remove_m_user(e)
        .then((res) => {
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById(e).disabled = false;
          success(res);
          this.transfer_to_users(
            this.t_page,
            this.t_limit,
            this.t_from,
            this.t_to,
            this.t_status,
            this.t_from_time,
            this.t_to_time
          );
          this.get_balance();
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById(e).disabled = false;
        });
    },
  },
  created() {
    this.get_balance();
  },
  components: {
    Header_item,
    Money_to_cashier_items,
    Accept_m_in_users_from_cashier,
  },
};
</script>

<style lang="scss" scoped>
@media (max-width: 500px) {
  div#pills-home {
    zoom: 75%;
  }
}
</style>
