<template>
  <details>
    <summary
      @click="
        hisob_raqamiga_qabul_qilingan_pullar.length
          ? ''
          : transfer_me(page, limit, from, to, type, from_time, to_time)
      "
    >
      ҳисоб рақамига қабул қилинган пуллар
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
      <table class="table table-sm table-hover">
        <thead>
          <tr>
            <th style="width: 5%">#ИД</th>
            <th style="width: 30%">Сумма</th>
            <th style="width: 30%">Сана</th>
            <th style="width: 35%">Изох</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in hisob_raqamiga_qabul_qilingan_pullar" :key="item">
            <td>{{ item.id }}</td>
            <td>{{ new Intl.NumberFormat().format(item.money) }} сўм</td>
            <td>{{ new Date(item.time).toLocaleDateString() }}</td>
            <td>{{ item.comment }}</td>
          </tr>
        </tbody>
      </table>
      <Data_notfound v-if="hisob_raqamiga_qabul_qilingan_pullar == ''" />
    </div>
    <nav
      aria-label="Page navigation example"
      class="mt-1"
      v-if="hisob_raqamiga_qabul_qilingan_pullar != ''"
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
              transfer_me(page, limit, from, to, type, from_time, to_time)
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
import { transfer_history_get } from "@/utils/request/request";
import { catchError } from "@/utils/request/handle_api_err";
import Data_notfound from "@/utils/notfound/data_notfound.vue";
export default {
  name: "AcceptMoney",
  components: { Data_notfound },
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
      document.getElementById("scroll").scrollTop = 0;
    },
  },
  methods: {
    transfer_me(page, limit, from, to, type, from_time, to_time) {
      this.$store.dispatch("setLoading", { isLoading: true });

      transfer_history_get(page, limit, from, to, type, from_time, to_time)
        .then((res) => {
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
};
</script>

<style lang="scss" scoped>
.page-item select {
  width: 80px;
  height: 30px;
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
}

.table-responsive {
  max-height: 400px;
  min-height: 400px;
}

table {
  width: 100%;
  min-width: 700px;
}
</style>
