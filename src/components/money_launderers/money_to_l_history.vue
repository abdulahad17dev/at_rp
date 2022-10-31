<template>
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
  <div class="table-responsive mt-1">
    <table class="table table-sm table-hover">
      <thead>
        <tr>
          <th style="width: 5%">№</th>
          <th style="width: 25%">Сумма</th>
          <th style="width: 20%">Сана</th>
          <th style="width: 20%">Изох</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, inc) in money_history" :key="item">
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
    </table>
    <Data_notfound v-if="money_history == ''" />
  </div>
  <nav
    aria-label="Page navigation example"
    class="mt-1"
    v-if="money_history != ''"
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
          @click="money_history_get(page, limit, to, from_time, to_time)"
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
import { money_to_launderer_get } from "@/utils/request/request";
import { catchError } from "@/utils/request/handle_api_err";
export default {
  name: "MoneyToMoneyLaundererHistory",
  data() {
    return {
      limit: 25,
      page: 0,
      pages: null,
      money_history: [],
      to: this.$route.query.id,
      from_time: "",
      to_time: "",
      id: this.$route.query.id,
    };
  },
  watch: {
    limit(e) {
      this.page = 0;
      this.money_history_get(
        this.page,
        e,
        this.to,
        this.from_time,
        this.to_time
      );
    },
    page(e) {
      this.money_history_get(
        e,
        this.limit,
        this.to,
        this.from_time,
        this.to_time
      );
      document.getElementById("scroll").scrollTop = 0;
    },
  },
  methods: {
    money_history_get(page, limit, to, from_time, to_time) {
      this.$store.dispatch("setLoading", { isLoading: true });
      money_to_launderer_get(page, limit, to, from_time, to_time)
        .then((res) => {
          this.money_history = res.data.data;
          this.pages = res.data.pages;
          this.$store.dispatch("setLoading", { isLoading: false });
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
        });
    },
    time() {
      this.money_history_get(
        this.page,
        this.limit,
        this.to,
        this.from_time,
        this.to_time
      );
      this.page = 0;
    },
    reset() {
      this.from_time = "";
      this.to_time = "";
      this.money_history_get(
        this.page,
        this.limit,
        this.to,
        this.from_time,
        this.to_time
      );
      this.page = 0;
    },
  },
  created() {
    this.money_history_get(
      this.page,
      this.limit,
      this.to,
      this.from_time,
      this.to_time
    );
  },
  components: { Data_notfound },
};
</script>

<style lang="scss" scoped>
.table-responsive {
  max-height: 62vh;
  min-height: 62vh;
}

@media (max-width: 500px) {
  .table-responsive {
    max-height: 86vh;
    min-height: 86vh;
  }
}

table {
  width: 100%;
  min-width: 900px;
}
</style>
