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
    <table class="table table-sm table-hover">
      <thead>
        <tr>
          <th style="width: 5%">№</th>
          <th style="width: 25%">Сумма</th>
          <th style="width: 20%">Сана</th>
          <th style="width: 20%">Изох</th>
          <th style="width: 20%">
            <div class="dropdown">
              <button
                class="btn btn-light btn-sm dropdown-toggle"
                type="button"
                id="select_bank_account"
                data-mdb-toggle="dropdown"
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
                    <li @click="select(0, 'барчаси')">
                      <a class="dropdown-item">барчаси</a>
                    </li>
                    <li
                      v-for="item in bank_accounts"
                      :key="item"
                      @click="
                        select(item.Bank_accounts.id, item.Bank_accounts.name)
                      "
                    >
                      <a class="dropdown-item">{{ item.Bank_accounts.name }}</a>
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
                    <ul class="pagination pagination-sm justify-content-end">
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
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, inc) in hisob_raqamidan_otkazilgan_pullar"
          :key="item"
        >
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
            <b class="text-primary">{{ item.for_to }}</b>
          </td>
        </tr>
      </tbody>
      <tfoot v-if="total_price > 0">
        <tr>
          <td colspan="5" class="text-center">
            <b> Жами сумма: <Format_numbers :number="total_price" /> сўм </b>
          </td>
        </tr>
      </tfoot>
    </table>
    <Data_notfound v-if="hisob_raqamidan_otkazilgan_pullar == ''" />
  </div>
  <nav
    aria-label="Page navigation example"
    class="mt-1"
    v-if="hisob_raqamidan_otkazilgan_pullar != ''"
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
            transfer_money(page, limit, from, to, type, from_time, to_time)
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
import Data_notfound from "@/utils/notfound/data_notfound.vue";
import {
  bank_account_get,
  transfer_history_get,
} from "@/utils/request/request";
import { catchError } from "@/utils/request/handle_api_err";
import Format_numbers from "@/utils/format/format_numbers.vue";
export default {
  name: "TransferMoney",
  data() {
    return {
      limit: 25,
      page: 0,
      pages: null,
      hisob_raqamidan_otkazilgan_pullar: [],
      from: this.$route.query.id,
      to: 0,
      type: "hisob_raqamidan_otkazilgan_pullar",
      id: this.$route.query.id,
      from_time: "",
      to_time: "",
      page_account: 0,
      pages_account: null,
      limit_account: 25,
      search_account: "",
      bank_accounts: [],
      text_account: "ҳисоб рақамлар",
      total_price: null,
    };
  },
  watch: {
    limit(e) {
      this.page = 0;
      this.transfer_money(
        this.page,
        e,
        this.from,
        this.to,
        this.type,
        this.from_time,
        this.to_time
      );
    },
    to(e) {
      this.page = 0;
      this.transfer_money(
        this.page,
        this.limit,
        this.from,
        e,
        this.type,
        this.from_time,
        this.to_time
      );
    },
    page(e) {
      this.transfer_money(
        e,
        this.limit,
        this.from,
        this.to,
        this.type,
        this.from_time,
        this.to_time
      );
    },
    limit_account(e) {
      this.page_account = 0;
      this.bank_accounts_get(this.page_account, e, this.search_account);
    },
    page_account(e) {
      this.bank_accounts_get(e, this.limit_account, this.search_account);
    },
    search_account(e) {
      this.page_account = 0;
      this.bank_accounts_get(this.page_account, this.limit_account, e);
    },
  },
  methods: {
    transfer_money(page, limit, from, to, type, from_time, to_time) {
      this.$store.dispatch("setLoading", { isLoading: true });

      transfer_history_get(page, limit, from, to, type, from_time, to_time)
        .then((res) => {
          this.total_price = null;
          res.data.data.forEach((element) => {
            this.total_price += element.Transfers.money;
          });
          this.hisob_raqamidan_otkazilgan_pullar = res.data.data;
          this.pages = res.data.pages;
          this.$store.dispatch("setLoading", { isLoading: false });
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
        });
    },
    time() {
      this.transfer_money(
        this.page,
        this.limit,
        this.from,
        this.to,
        this.type,
        this.from_time,
        this.to_time
      );
      this.page = 0;
    },
    reset() {
      this.from_time = "";
      this.to_time = "";
      this.transfer_money(
        this.page,
        this.limit,
        this.from,
        this.to,
        this.type,
        this.from_time,
        this.to_time
      );
      this.page = 0;
    },
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
      this.to = id;
      this.text_account = name;
      document.getElementById("select_bank_account").click();
    },
  },
  created() {
    this.transfer_money(
      this.page,
      this.limit,
      this.from,
      this.to,
      this.type,
      this.from_time,
      this.to_time
    );
  },
  components: { Data_notfound, Format_numbers },
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
  min-height: 400px;
}

@media (max-width: 480px) {
  .table-responsive {
    max-height: 500px;
    min-height: 500px;
  }
}

table {
  width: 100%;
  min-width: 900px;
}
</style>
