<template>
  <form @submit.prevent="time">
    <div class="row mb-2">
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
  <div class="table-responsive">
    <table class="table table-sm table-hover" id="accept_m_in_cashier">
      <thead>
        <tr>
          <th style="width: 10%">№</th>
          <th style="width: 20%">Сумма</th>
          <th style="width: 20%">Сана</th>
          <th style="width: 20%">Изох</th>
          <th>
            <div class="dropdown" data-exclude="true">
              <button
                class="btn btn-light btn-sm dropdown-toggle"
                type="button"
                id="user_text3"
                data-mdb-toggle="dropdown"
                data-bs-auto-close="outside"
                aria-expanded="false"
                @click="
                  users.length
                    ? ''
                    : get_users(page_user, limit_user, search_user)
                "
              >
                {{ text }}
              </button>
              <ul
                class="dropdown-menu border-top-0"
                aria-labelledby="user_text3"
              >
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
                    <li @click="select(0, 'барчаси')">
                      <a class="dropdown-item">барчаси</a>
                    </li>
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
                        <button
                          type="button"
                          class="page-link text-dark"
                          disabled
                        >
                          {{ page_user + 1 }}
                        </button>
                      </li>
                      <li class="page-item">
                        <button
                          type="button"
                          class="page-link"
                          @click="page_user++"
                          :disabled="page_user == pages_user"
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
          <th style="width: 15%" data-exclude="true">
            <select class="form-control form-control-sm" v-model="status">
              <option value="false">қабул қилинганмаган</option>
              <option value="true">қабул қилинган</option>
            </select>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, inc) in transfer_cashier" :key="item">
          <td>{{ inc + 1 }}</td>
          <td>
            {{ new Intl.NumberFormat().format(item.Transfers.money) }} сўм
          </td>
          <td>
            {{
              new Date(item.Transfers.time)
                .toLocaleDateString({
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                })
                .slice(0, 10)
            }}
          </td>
          <td>{{ item.Transfers.comment }}</td>
          <td>
            <b class="text-primary">{{ item.user_for_from_ }}</b>
          </td>
          <td data-exclude="true">
            <button
              class="btn btn-sm btn-success"
              v-if="item.Transfers.status == false"
              @click="accept(item.Transfers.id)"
              :id="item.Transfers.id"
            >
              <i class="fa-solid fa-circle-check"></i>
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
      <li>
        <Select_data :id="'accept_m_in_cashier'" />
      </li>
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
          @click="
            transfer_to_users(page, limit, from, to, status, from_time, to_time)
          "
        >
          <i class="fa-solid fa-rotate"></i>
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
        <button class="page-link" @click="page++" :disabled="page == pages">
          <i class="fa-solid fa-angle-right text-dark"></i>
        </button>
      </li>
    </ul>
  </nav>
</template>

<script>
import {
  accept_or_remove_m_user,
  transfer_m_cashiers_get,
  user_get,
} from "@/utils/request/request";
import { catchError, success } from "@/utils/request/handle_api_err";
import Data_notfound from "@/utils/notfound/data_notfound.vue";
import Select_data from "@/utils/select_data/select_data.vue";
export default {
  name: "AcceptMoneyInCashierFromUser",
  emits: ["get_balance"],
  data() {
    return {
      transfer_cashier: [],
      from_time: "",
      to_time: "",
      from: 0,
      to: localStorage.getItem("user_id"),
      status: false,
      page: 0,
      limit: 25,
      pages: null,
      // users
      limit_user: 25,
      page_user: 0,
      pages_user: null,
      search_user: "",
      users: [],
      text: "ходимлар",
    };
  },
  watch: {
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
    },
    status(e) {
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
    from(e) {
      this.page = 0;
      this.transfer_to_users(
        this.page,
        this.limit,
        e,
        this.to,
        this.status,
        this.from_time,
        this.to_time
      );
    },
    // users
    limit_user(e) {
      this.page_user = 0;
      this.get_users(this.page_user, e, this.search_user);
    },
    page_user(e) {
      this.get_users(e, this.limit_user, this.search_user);
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
  },
  methods: {
    transfer_to_users(page, limit, from, to, status, from_time, to_time) {
      this.$store.dispatch("setLoading", { isLoading: true });
      transfer_m_cashiers_get(page, limit, from, to, status, from_time, to_time)
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
      this.from = id;
      this.text = name;
      document.getElementById("user_text3").click();
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
    accept(e) {
      this.$store.dispatch("setLoading", { isLoading: true });
      document.getElementById(e).disabled = true;
      accept_or_remove_m_user(e)
        .then((res) => {
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById(e).disabled = false;
          success(res);
          this.transfer_to_users(
            this.page,
            this.limit,
            this.from,
            this.to,
            this.status,
            this.from_time,
            this.to_time
          );
          this.$emit("get_balance");
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById(e).disabled = false;
        });
    },
  },
  created() {
    this.transfer_to_users(
      this.page,
      this.limit,
      this.from,
      this.to,
      this.status,
      this.from_time,
      this.to_time
    );
  },
  components: { Data_notfound, Select_data },
};
</script>

<style lang="scss" scoped>
table {
  width: 100%;
  min-width: 1100px;
}

.table-responsive {
  min-height: 63vh;
  max-height: 63vh;
}

@media (max-width: 575px) {
  .table-responsive {
    min-height: 64vh;
    max-height: 64vh;
  }
}
@media (max-width: 500px) {
  .table-responsive {
    min-height: 88vh;
    max-height: 88vh;
  }
}
</style>
