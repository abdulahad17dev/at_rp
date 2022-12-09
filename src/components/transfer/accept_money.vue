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
    <table class="table table-sm table-hover" id="accept_money">
      <thead>
        <tr>
          <th style="width: 5%">№</th>
          <th style="width: 30%">Сумма</th>
          <th style="width: 30%">Сана</th>
          <th style="width: 35%">Изох</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, inc) in hisob_raqamiga_qabul_qilingan_pullar"
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
        </tr>
      </tbody>
      <tfoot v-if="total_price > 0">
        <tr>
          <td colspan="4" class="text-center">
            <b> Жами сумма: <Format_numbers :number="total_price" /> сўм </b>
          </td>
        </tr>
      </tfoot>
    </table>
    <Data_notfound v-if="hisob_raqamiga_qabul_qilingan_pullar == ''" />
  </div>
  <nav
    aria-label="Page navigation example"
    class="mt-1"
    v-if="hisob_raqamiga_qabul_qilingan_pullar != ''"
  >
    <ul class="pagination pagination-sm justify-content-end">
      <li>
        <Select_data :id="'accept_money'" />
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
          @click="transfer_me(page, limit, from, to, type, from_time, to_time)"
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
import { transfer_history_get } from "@/utils/request/request";
import { catchError } from "@/utils/request/handle_api_err";
import Data_notfound from "@/utils/notfound/data_notfound.vue";
import Format_numbers from "@/utils/format/format_numbers.vue";
import Select_data from "@/utils/select_data/select_data.vue";
export default {
  name: "AcceptMoney",
  components: { Data_notfound, Format_numbers, Select_data },
  data() {
    return {
      limit: 25,
      page: 0,
      pages: null,
      hisob_raqamiga_qabul_qilingan_pullar: [],
      from: 0,
      to: this.$route.query.id,
      type: "hisob_raqamiga_qabul_qilingan_pullar",
      id: this.$route.query.id,
      from_time: "",
      to_time: "",
      total_price: null,
    };
  },
  watch: {
    limit(e) {
      this.page = 0;
      this.transfer_me(
        this.page,
        e,
        this.from,
        this.to,
        this.type,
        this.from_time,
        this.to_time
      );
    },
    page(e) {
      this.transfer_me(
        e,
        this.limit,
        this.from,
        this.to,
        this.type,
        this.from_time,
        this.to_time
      );
    },
  },
  methods: {
    transfer_me(page, limit, from, to, type, from_time, to_time) {
      this.$store.dispatch("setLoading", { isLoading: true });

      transfer_history_get(page, limit, from, to, type, from_time, to_time)
        .then((res) => {
          this.total_price = null;
          res.data.data.forEach((element) => {
            this.total_price += element.Transfers.money;
          });
          this.hisob_raqamiga_qabul_qilingan_pullar = res.data.data;
          this.pages = res.data.pages;
          this.$store.dispatch("setLoading", { isLoading: false });
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
        });
    },
    time() {
      this.transfer_me(
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
      this.transfer_me(
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
  },
  created() {
    this.transfer_me(
      this.page,
      this.limit,
      this.from,
      this.to,
      this.type,
      this.from_time,
      this.to_time
    );
  },
};
</script>

<style lang="scss" scoped>
.table-responsive {
  max-height: 400px;
}

@media (max-width: 480px) {
  .table-responsive {
    max-height: 500px;
  }
}

table {
  width: 100%;
  min-width: 700px;
}
</style>
