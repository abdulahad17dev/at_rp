<template>
  <form @submit.prevent="time">
    <div class="row m-1">
      <div class="col">
        <input
          type="date"
          class="form-control form-control-sm"
          v-model="from_time"
          required
        />
      </div>
      <div class="col">
        <input
          type="date"
          class="form-control form-control-sm"
          v-model="to_time"
          required
        />
      </div>
      <div class="col">
        <div class="btn-group w-100">
          <button
            class="btn btn-outline-primary btn-sm w-80"
            :disabled="from_time == '' || to_time == ''"
          >
            <i class="fa-solid fa-search"></i>
          </button>
          <button
            class="btn btn-outline-danger btn-sm w-20"
            @click="reset"
            v-if="from_time && to_time"
          >
            <i class="fa-solid fa-circle-xmark"></i>
          </button>
        </div>
      </div>
    </div>
  </form>
  <div class="table-responsive m-1">
    <table class="table table-sm table-hover table-bordered">
      <thead>
        <tr>
          <th style="width: 5%">#ИД</th>
          <th style="width: 25%">Сумма</th>
          <th style="width: 20%">Сана</th>
          <th style="width: 20%">Изох</th>
          <th style="width: 20%">Кассирлар</th>
          <th>
            <div class="dropdown">
              <button
                class="btn btn-light btn-sm dropdown-toggle"
                type="button"
                id="cashier_text"
                data-bs-toggle="dropdown"
                data-bs-auto-close="outside"
                aria-expanded="false"
                @click="
                  cashiers.length
                    ? ''
                    : get_cashier(user_page, user_limit, user_search, user_role)
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
                    v-model="user_search"
                  />
                </li>
                <li>
                  <ul class="dropdown-items">
                    <li @click="select(0, 'барчаси')">
                      <a class="dropdown-item">барчаси</a>
                    </li>
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
                    <ul class="pagination pagination-sm justify-content-end">
                      <li class="page-item">
                        <button
                          type="button"
                          class="page-link"
                          @click="
                            get_cashier(
                              user_page,
                              user_limit,
                              user_search,
                              user_role
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
                          @click="user_page--"
                          :disabled="user_page == 0"
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
                          {{ user_page + 1 }}
                        </button>
                      </li>
                      <li class="page-item">
                        <button
                          type="button"
                          class="page-link"
                          @click="user_page++"
                          :disabled="user_page == user_pages - 1"
                        >
                          <i class="fa-solid fa-angle-right text-dark"></i>
                        </button>
                      </li>
                    </ul>
                  </nav>
                </li>
              </ul>
            </div>
          </th>
          <th>
            <select class="form-control form-control-sm" v-model="status">
              <option value="false">қабул қилинганмаган</option>
              <option value="true">қабул қилинган</option>
            </select>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in transfer_cashier" :key="item">
          <td>{{ item.Transfers.id }}</td>
          <td>
            {{ new Intl.NumberFormat().format(item.Transfers.money) }} сўм
          </td>
          <td>
            {{
              new Date(item.Transfers.time)
                .toLocaleDateString("en-us", {
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  hour12: false,
                })
                .slice(0, 16)
            }}
          </td>
          <td>{{ item.Transfers.comment }}</td>
          <td colspan="2">
            <b class="text-primary">{{ item.name }}</b>
          </td>
          <td>
            <button
              class="btn btn-danger btn-sm"
              :id="'remove_money' + item.Transfers.id"
              v-if="item.Transfers.status == false"
              @click="remove(item.Transfers.id)"
            >
              <i class="fa-solid fa-circle-xmark"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <Data_notfound v-if="transfer_cashier == ''" />
  </div>
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
import {
  accept_money_in_cashier,
  transfer_cashier_get,
  user_get,
} from "@/utils/request/request";
import { catchError, success } from "@/utils/request/handle_api_err";
import Data_notfound from "@/utils/notfound/data_notfound.vue";
export default {
  name: "TransferToCashier",
  data() {
    return {
      limit: 25,
      page: 0,
      pages: null,
      transfer_cashier: [],
      to: 0,
      from: this.$route.query.id,
      status: false,
      id: this.$route.query.id,
      from_time: "",
      to_time: "",
      cashiers: [],
      user_search: "",
      user_role: "kassir",
      user_limit: 25,
      user_page: 0,
      user_pages: null,
      text: "кассирлар",
    };
  },
  watch: {
    limit(e) {
      this.page = 0;
      this.transfer_to_cashier(
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
      this.transfer_to_cashier(
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
    to(e) {
      this.page = 0;
      this.transfer_to_cashier(
        this.page,
        this.limit,
        this.from,
        e,
        this.status,
        this.from_time,
        this.to_time
      );
    },
    status(e) {
      this.page = 0;
      this.transfer_to_cashier(
        this.page,
        this.limit,
        this.from,
        this.to,
        e,
        this.from_time,
        this.to_time
      );
    },
    user_limit(e) {
      this.page = 0;
      this.get_cashier(this.user_page, e, this.user_search, this.user_role);
    },
    user_page(e) {
      this.get_cashier(e, this.user_limit, this.user_search, this.user_role);
      document.getElementById("scroll").scrollTop = 0;
    },
    user_search(e) {
      if (e.length > 0) {
        this.get_cashier(
          this.user_page,
          this.user_limit,
          this.user_search,
          this.user_role
        );
      } else if (e.length == 0) {
        this.get_cashier(
          this.user_page,
          this.user_limit,
          this.user_search,
          this.user_role
        );
        this.page = 0;
      }
    },
  },
  methods: {
    transfer_to_cashier(page, limit, from, to, status, from_time, to_time) {
      this.$store.dispatch("setLoading", { isLoading: true });
      transfer_cashier_get(page, limit, from, to, status, from_time, to_time)
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
      this.transfer_to_cashier(
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
      this.transfer_to_cashier(
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
    get_cashier(user_page, user_limit, user_search, user_role) {
      this.$store.dispatch("setLoading", { isLoading: true });

      user_get(user_page, user_limit, user_search, user_role)
        .then((res) => {
          this.cashiers = res.data.data;
          this.user_pages = res.data.pages;
          this.$store.dispatch("setLoading", { isLoading: false });
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
        });
    },
    select(id, name) {
      this.to = id;
      this.text = name;
      document.getElementById("cashier_text").click();
    },
    remove(e) {
      this.$store.dispatch("setLoading", { isLoading: true });
      document.getElementById(`remove_money${e}`).disabled = true;
      accept_money_in_cashier(e, 0, 0, "")
        .then((res) => {
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById(`remove_money${e}`).disabled = false;
          success(res).then(() => {
            this.transfer_to_cashier(
              this.page,
              this.limit,
              this.from,
              this.to,
              this.status,
              this.from_time,
              this.to_time
            );
          });
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById(`remove_money${e}`).disabled = false;
        });
    },
  },
  created() {
    this.transfer_to_cashier(
      this.page,
      this.limit,
      this.from,
      this.to,
      this.status,
      this.from_time,
      this.to_time
    );
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
  min-height: 400px;
}

table {
  width: 100%;
  min-width: 900px;
}
</style>
