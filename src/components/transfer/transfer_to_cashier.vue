<template>
  <details class="my-2">
    <summary
      @click="
        transfer_to_cashier(page, limit, from, to, status, from_time, to_time)
      "
    >
      кассирга ўтказилган пуллар
    </summary>
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
              <i class="fa-solid fa-circle-check"></i>
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
      <table class="table table-sm table-hover">
        <thead>
          <tr>
            <th style="width: 5%">#ИД</th>
            <th style="width: 25%">Сумма</th>
            <th style="width: 20%">Сана</th>
            <th style="width: 20%">Изох</th>
            <th style="width: 20%">Кассирлар</th>
            <th>
              <select
                class="form-control form-control-sm"
                @click="get_cashier"
                v-model="to"
              >
                <option value="0">барчаси</option>
                <option :value="item.id" v-for="item in cashiers" :key="item">
                  {{ item.name }}
                </option>
              </select>
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
            <td>{{ new Date(item.Transfers.time).toLocaleDateString() }}</td>
            <td>{{ item.Transfers.comment }}</td>
            <td colspan="2">
              <b class="text-primary">{{ item.name }}</b>
            </td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
    <Data_notfound v-if="transfer_cashier == ''" />
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
  </details>
</template>

<script>
import { transfer_cashier_get, user_get } from "@/utils/request/request";
import { catchError } from "@/utils/request/handle_api_err";
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
      search: "",
      role: "kassir",
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
    get_cashier() {
      if (this.cashiers == "") {
        this.$store.dispatch("setLoading", { isLoading: true });

        user_get(0, 100, this.search, this.role)
          .then((res) => {
            this.cashiers = res.data.data;
            this.$store.dispatch("setLoading", { isLoading: false });
          })
          .catch((err) => {
            catchError(err);
            this.$store.dispatch("setLoading", { isLoading: false });
          });
      }
    },
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
}

table {
  width: 100%;
  min-width: 900px;
}
</style>
