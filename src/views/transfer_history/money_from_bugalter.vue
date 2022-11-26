<template>
  <Header_item />

  <form @submit.prevent="time">
    <div class="row">
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
  <div class="table-responsive mt-3">
    <table class="table table-sm table-hover">
      <thead>
        <tr>
          <th style="width: 10%">№</th>
          <th style="width: 30%">Сумма</th>
          <th style="width: 30%">Сана</th>
          <th style="width: 30%">Изох</th>
          <th>
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
            <button
              v-if="item.Transfers.status == false"
              class="btn btn-sm btn-success"
              data-bs-toggle="modal"
              data-bs-target="#accept_moneys"
              @click="transfer_id = item.Transfers.id"
            >
              <i class="fa-solid fa-circle-check"></i>
            </button>
          </td>
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

  <Accept_money_in_cashier @accept="accept" />
</template>

<script>
import {
  accept_money_in_cashier,
  transfer_cashier_get,
} from "@/utils/request/request";
import { catchError, success } from "@/utils/request/handle_api_err";
import Data_notfound from "@/utils/notfound/data_notfound.vue";
import Header_item from "@/components/header/header_item.vue";
import Accept_money_in_cashier from "@/components/transfer/accept_money_in_cashier.vue";
export default {
  name: "TransferToCashier",
  data() {
    return {
      limit: 25,
      page: 0,
      pages: null,
      transfer_cashier: [],
      to: localStorage.getItem("user_id"),
      from: 0,
      status: false,
      id: this.$route.query.id,
      from_time: "",
      to_time: "",
      transfer_id: null,
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
    accept(e) {
      this.$store.dispatch("setLoading", { isLoading: true });
      document.getElementById("accept_m_disabled").disabled = true;
      accept_money_in_cashier(
        this.transfer_id,
        e.money_laundered_id,
        e.percent,
        e.comment
      )
        .then((res) => {
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("accept_money").click();
          document.getElementById("accept_m_disabled").disabled = false;
          success(res);
          this.transfer_to_cashier(
            this.page,
            this.limit,
            this.from,
            this.to,
            this.status,
            this.from_time,
            this.to_time
          );
          this.transfer_id = null;
          e.money_laundered_id = null;
          e.percent = null;
          e.comment = "";
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("accept_m_disabled").disabled = false;
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
  components: { Data_notfound, Header_item, Accept_money_in_cashier },
};
</script>

<style lang="scss" scoped>
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
