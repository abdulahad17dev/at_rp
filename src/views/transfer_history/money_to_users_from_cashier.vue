<template>
  <Header_item :balance="balance" />
  <form @submit.prevent="transfer">
    <div class="row mb-5">
      <div class="col-md-3 col-lg-3 col-sm-6">
        <label for="balance">
          Сумма:
          <span class="text-primary"
            >{{ new Intl.NumberFormat().format(body.money) }} сўм
          </span></label
        >
        <div class="input-group input-group-sm">
          <input
            id="balance"
            type="number"
            step="any"
            class="form-control"
            v-model="body.money"
            required
            min="1"
          />
          <span class="input-group-text bg-white">сўм</span>
        </div>
      </div>
      <div class="col-md-3 col-lg-3 col-sm-6">
        <label for="user">Ходим: </label>
        <div class="dropdown">
          <button
            class="btn btn-light btn-sm dropdown-toggle"
            type="button"
            id="user_text"
            data-bs-toggle="dropdown"
            data-bs-auto-close="outside"
            aria-expanded="false"
            @click="
              users.length ? '' : get_users(page_user, limit_user, search_user)
            "
          >
            {{ text }}
          </button>
          <ul class="dropdown-menu border-top-0" aria-labelledby="user_text">
            <li>
              <input
                type="search"
                class="form-control form-control-sm"
                placeholder="қидириш ..."
                v-model="search_user"
              />
            </li>
            <li>
              <ul class="dropdown-items">
                <li
                  v-for="item in users"
                  :key="item"
                  @click="select(item.id, item.name)"
                >
                  <a class="dropdown-item">{{ item.name }}</a>
                </li>
              </ul>
            </li>
            <li v-if="users != ''">
              <hr class="dropdown-divider m-0" />
            </li>
            <li>
              <nav
                aria-label="Page navigation example"
                class="mt-2"
                v-if="users != ''"
              >
                <ul class="pagination pagination-sm justify-content-end">
                  <li class="page-item">
                    <button
                      type="button"
                      class="page-link"
                      @click="users_get(page_user, limit_user, search_user)"
                    >
                      <i class="fa-solid fa-rotate"></i>
                    </button>
                  </li>
                  <li class="page-item">
                    <button
                      type="button"
                      class="page-link"
                      @click="page_user--"
                      :disabled="page_user == 0"
                    >
                      <i class="fa-solid fa-angle-left text-dark"></i>
                    </button>
                  </li>
                  <li class="page-item">
                    <button type="button" class="page-link text-dark" disabled>
                      {{ page_user + 1 }}
                    </button>
                  </li>
                  <li class="page-item">
                    <button
                      type="button"
                      class="page-link"
                      @click="page_user++"
                      :disabled="page_user == pages_user - 1"
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
      <div class="col-md-3 col-lg-3 col-sm-6">
        <label for="comment">Изох: </label>
        <textarea
          id="comment"
          class="form-control form-control-sm"
          v-model="body.comment"
        ></textarea>
      </div>
      <div class="col-md-3 col-lg-3 col-sm-6">
        <label>ㅤ</label>
        <button
          class="btn btn-primary btn-sm w-100"
          type="submit"
          :disabled="!body.money || !body.to_ || !body.comment"
          id="transfer_disabled"
        >
          <i class="fa-solid fa-circle-check"></i>
        </button>
      </div>
    </div>
  </form>

  <Money_to_user_items
    :transfer_cashier="transfer_cashier"
    @status="sort_status"
    @to="sort_to"
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
          v-model="limit"
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
            transfer_to_cashier(
              page,
              limit,
              from,
              to,
              status,
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
import Header_item from "@/components/header/header_item.vue";
import {
  current_user,
  transfer_money_to_users,
  transfer_users_get,
  user_get,
} from "@/utils/request/request";
import { catchError, success } from "@/utils/request/handle_api_err";
import Money_to_user_items from "../../components/transfer/money_to_user_items.vue";
export default {
  name: "TransferMoneyUser",
  data() {
    return {
      body: {
        money: null,
        from_: 0,
        to_: null,
        comment: "",
      },
      limit_user: 25,
      page_user: 0,
      pages_user: null,
      search_user: "",
      users: [],
      text: "ходимлар",
      balance: null,
      // history
      transfer_cashier: [],
      from_time: "",
      to_time: "",
      from: 0,
      to: 0,
      status: false,
      page: 0,
      limit: 25,
      pages: null,
    };
  },
  watch: {
    limit_user(e) {
      this.page_user = 0;
      this.get_users(this.page_user, e, this.search_user);
    },
    page_user(e) {
      this.get_users(e, this.limit_user, this.search_user);
      document.getElementById("scroll").scrollTop = 0;
    },
    search_user(e) {
      this.page_user = 0;
      if (e.length > 0) {
        this.get_users(this.page_user, this.limit_user, this.search_user);
      } else if (e.length == 0) {
        this.get_users(this.page_user, this.limit_user, this.search_user);
        this.page_user = 0;
      }
    },
    // history
    limit(e) {
      this.page = 0;
      this.transfer_to_users(
        this.page,
        e,
        this.from,
        this.to,
        this.status,
        this.from_time,
        this.to_time
      );
    },
    page(e) {
      this.transfer_to_users(
        e,
        this.limit,
        this.from,
        this.to,
        this.status,
        this.from_time,
        this.to_time
      );
      document.getElementById("scroll").scrollTop = 0;
    },
  },
  methods: {
    get_users(page, limit, search) {
      this.$store.dispatch("setLoading", { isLoading: true });

      user_get(page, limit, search)
        .then((res) => {
          this.users = res.data.data;
          this.pages_user = res.data.pages;
          this.$store.dispatch("setLoading", { isLoading: false });
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
        });
    },
    select(id, name) {
      this.body.to_ = id;
      this.text = name;
      document.getElementById("user_text").click();
    },
    transfer() {
      document.getElementById("transfer_disabled").disabled = true;
      this.$store.dispatch("setLoading", { isLoading: true });
      transfer_money_to_users(this.body)
        .then((res) => {
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("transfer_disabled").disabled = false;
          success(res).then(() => {
            this.get_balance();
            this.body.money = null;
            this.body.from_ = 0;
            this.body.to_ = null;
            this.body.comment = "";
          });
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("transfer_disabled").disabled = false;
        });
    },
    get_balance() {
      this.$store.dispatch("setLoading", { isLoading: true });

      current_user()
        .then((res) => {
          this.transfer_to_users(
            this.page,
            this.limit,
            this.from,
            this.to,
            this.status,
            this.from_time,
            this.to_time
          );
          this.balance = res.data.balance;
          this.$store.dispatch("setLoading", { isLoading: false });
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
        });
    },
    transfer_to_users(page, limit, from, to, status, from_time, to_time) {
      this.$store.dispatch("setLoading", { isLoading: true });
      transfer_users_get(page, limit, from, to, status, from_time, to_time)
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
        this.page,
        this.limit,
        this.from,
        this.to,
        this.status,
        this.from_time,
        this.to_time
      );
      this.page = 0;
    },
    reset() {
      this.from_time = "";
      this.to_time = "";
      this.transfer_to_users(
        this.page,
        this.limit,
        this.from,
        this.to,
        this.status,
        this.from_time,
        this.to_time
      );
      this.page = 0;
    },
    sort_status(e) {
      this.page = 0;
      this.transfer_to_users(
        this.page,
        this.limit,
        this.from,
        this.to,
        e,
        this.from_time,
        this.to_time
      );
    },
    sort_to(e) {
      this.page = 0;
      this.transfer_to_users(
        this.page,
        this.limit,
        this.from,
        e,
        this.status,
        this.from_time,
        this.to_time
      );
    },
  },
  created() {
    this.get_balance();
  },
  components: { Header_item, Money_to_user_items },
};
</script>

<!-- <style lang="scss" scoped>
</style> -->
