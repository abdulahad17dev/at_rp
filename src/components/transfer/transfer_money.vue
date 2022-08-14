<template>
  <div class="table-responsive">
    <table class="table table-sm table-hover table-bordered">
      <thead>
        <tr>
          <th colspan="5" class="text-center">
            <b class="text-primary"> {{ this.$route.query.name }} </b> ҳисоб
            рақамидан отказилган пуллар
          </th>
        </tr>
        <tr>
          <th style="width: 5%">#ИД</th>
          <th style="width: 25%">Сумма</th>
          <th style="width: 25%">Сана</th>
          <th style="width: 30%">Изох</th>
          <th class="d-flex">
            <select
              class="form-control form-control-sm form-select"
              v-model="limit"
            >
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
            <select
              @click="get_bank_accounts"
              class="form-control form-control-sm form-select mx-1"
              v-model="to"
            >
              <option value="">барчаси</option>
              <option
                :value="item.id"
                v-for="item in bank_accounts"
                :key="item"
              >
                {{ item.name }}
              </option>
            </select>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in hisob_raqamidan_otkazilgan_pullar" :key="item">
          <td>{{ item.id }}</td>
          <td>{{ new Intl.NumberFormat().format(item.money) }} сўм</td>
          <td>{{ new Date(item.time).toLocaleDateString() }}</td>
          <td colspan="2">{{ item.comment }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <Data_notfound v-if="hisob_raqamidan_otkazilgan_pullar == ''" />
  <nav
    aria-label="Page navigation example"
    class="mt-1"
    v-if="hisob_raqamidan_otkazilgan_pullar != ''"
  >
    <ul class="pagination justify-content-end">
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
import Data_notfound from "@/utils/notfound/data_notfound.vue";
import {
  bank_account_get,
  transfer_history_get,
} from "@/utils/request/request";
import { catchError } from "@/utils/request/handle_api_err";
export default {
  name: "TransferMoney",
  data() {
    return {
      limit: 25,
      page: 0,
      pages: null,
      hisob_raqamidan_otkazilgan_pullar: [],
      from: this.$route.query.id,
      to: "",
      type: "hisob_raqamidan_otkazilgan_pullar",
      id: this.$route.query.id,
      bank_accounts: [],
    };
  },
  watch: {
    limit(e) {
      this.page = 0;
      this.transfer_money(this.page, e, this.from, this.to, this.type);
    },
    page(e) {
      this.transfer_money(e, this.limit, this.from, this.to, this.type);
      document.getElementById("scroll").scrollTop = 0;
    },
    to(e) {
      this.page = 0;
      this.transfer_money(this.page, this.limit, this.from, e, this.type);
    },
  },
  methods: {
    transfer_money(page, limit, from, to, type) {
      this.$store.dispatch("setLoading", { isLoading: true });

      transfer_history_get(page, limit, from, to, type)
        .then((res) => {
          this.hisob_raqamidan_otkazilgan_pullar = res.data.data;
          this.pages = res.data.pages;
          this.$store.dispatch("setLoading", { isLoading: false });
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
        });
    },
    get_bank_accounts() {
      if (this.bank_accounts != "") {
        return this.bank_accounts;
      } else {
        bank_account_get(0, 100)
          .then((res) => {
            this.bank_accounts = res.data.data;
          })
          .catch((err) => {
            catchError(err);
          });
      }
    },
  },
  beforeMount() {
    this.transfer_money(this.page, this.limit, this.from, this.to, this.type);
  },
  components: { Data_notfound },
};
</script>

<style lang="scss" scoped>
th select {
  width: 80px;
  height: 30px;
}

th select:nth-child(2) {
  width: 170px;
}

.table-responsive {
  max-height: 242.5px;
}

table {
  width: 100%;
  min-width: 900px;
}
</style>
