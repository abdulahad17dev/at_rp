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
          <th style="width: 20%">Хисоб рақам</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in hisob_raqamidan_otkazilgan_pullar" :key="item">
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
          <td>
            <b class="text-primary">{{ item.name }}</b>
          </td>
        </tr>
      </tbody>
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
import { transfer_history_get } from "@/utils/request/request";
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
      to: 0,
      type: "hisob_raqamidan_otkazilgan_pullar",
      id: this.$route.query.id,
      from_time: "",
      to_time: "",
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
      document.getElementById("scroll").scrollTop = 0;
    },
  },
  methods: {
    transfer_money(page, limit, from, to, type, from_time, to_time) {
      this.$store.dispatch("setLoading", { isLoading: true });

      transfer_history_get(page, limit, from, to, type, from_time, to_time)
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
