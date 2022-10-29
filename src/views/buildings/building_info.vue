<template>
  <Header_item />
  <div class="table-responsive">
    <table class="table table-sm table-hover">
      <thead>
        <tr>
          <th style="width: 10%">№</th>
          <th style="width: 45%">Иш</th>
          <th style="width: 15%">Ҳажм</th>
          <th style="width: 15%">Нарх</th>
          <th style="width: 15%">Сана</th>
        </tr>
      </thead>
      <!-- work, time, quantity, price -->
      <tbody>
        <tr v-for="(item, inc) in info" :key="item">
          <td>{{ inc + 1 }}</td>
          <td>{{ item.work }}</td>
          <td>{{ item.Spent_items_to_work.quantity }}</td>
          <td>
            {{ new Intl.NumberFormat().format(item.Spent_items_to_work.price) }}
            сўм
          </td>
          <td>
            {{
              new Date(item.Spent_items_to_work.time)
                .toLocaleDateString("en-us", {
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                })
                .slice(0, 10)
            }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <Data_notfound v-if="info == ''" />

  <nav aria-label="Page navigation example" class="mt-2" v-if="info != ''">
    <ul class="pagination pagination-sm justify-content-end">
      <li class="page-item">
        <select
          class="form-control form-control-sm mx-2 form-select"
          v-model="limit"
        >
          <option value="25" selected>25</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </li>
      <li class="page-item">
        <button
          type="button"
          class="page-link"
          @click="get_work_info(work_id, worker_id, type, user_id, page, limit)"
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
import Header_item from "@/components/header/header_item.vue";
import Data_notfound from "@/utils/notfound/data_notfound.vue";
import { get_spent_items_to_work } from "@/utils/request/request";
import { catchError } from "@/utils/request/handle_api_err";

export default {
  name: "Work_Info",
  components: { Header_item, Data_notfound },
  data() {
    return {
      work_id: this.$route.query.id,
      worker_id: 0,
      type: this.$route.query.type,
      user_id: 0,
      page: 0,
      limit: 25,
      pages: null,
      info: [],
    };
  },
  watch: {
    limit(e) {
      this.page = 0;
      this.get_work_info(
        this.work_id,
        this.worker_id,
        this.type,
        this.user_id,
        this.page,
        e
      );
    },
    page(e) {
      this.get_work_info(
        this.work_id,
        this.worker_id,
        this.type,
        this.user_id,
        e,
        this.limit
      );
      document.getElementById("scroll").scrollTop = 0;
    },
  },
  methods: {
    get_work_info(work_id, worker_id, type, user_id, page, limit) {
      this.$store.dispatch("setLoading", { isLoading: true });

      get_spent_items_to_work(work_id, worker_id, type, user_id, page, limit)
        .then((res) => {
          this.info = res.data.data;
          this.pages = res.data.pages;
          this.$store.dispatch("setLoading", { isLoading: false });
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
        });
    },
  },
  created() {
    this.get_work_info(
      this.work_id,
      this.worker_id,
      this.type,
      this.user_id,
      this.page,
      this.limit
    );
  },
};
</script>

<style lang="scss" scoped>
table {
  min-width: 900px;
  width: 100%;
}

.table-responsive {
  max-height: 75vh;
}

@media (max-width: 500px) {
  .table-responsive {
    max-height: 110vh;
  }
}
</style>
