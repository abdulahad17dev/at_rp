<template>
  <Header_item />

  <div class="row">
    <div class="col mt-1 d-flex align-items-center">
      <span>Лимит</span>
      <select
        class="form-control form-control-sm mx-2 form-select"
        v-model="limit"
      >
        <option value="25" selected>25</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
    </div>
    <div class="col mt-2 d-flex align-items-center justify-content-end">
      <span>Қидириш: </span>
      <div class="input-group input-group-sm mx-2">
        <input
          type="search"
          v-model="search"
          class="form-control form-control-sm"
        />
        <button
          class="btn btn-outline-secondary"
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#worker_type_add"
        >
          <i class="fa-solid fa-circle-plus"></i>
        </button>
      </div>
    </div>
  </div>

  <Worker_type_item :worker_types="worker_types" @remove="remove_type" />

  <Data_notfound v-if="worker_types == ''" />

  <nav
    aria-label="Page navigation example"
    class="mt-2"
    v-if="worker_types != ''"
  >
    <ul class="pagination pagination-sm justify-content-end">
      <li class="page-item">
        <button
          type="button"
          class="page-link"
          @click="get_worker_types(page, limit, search)"
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

  <Worker_type_add @add="add" />
</template>

<script>
import Header_item from "@/components/header/header_item.vue";
import { catchError, success } from "@/utils/request/handle_api_err";
import {
  worker_type_add,
  worker_type_get,
  worker_type_remove,
} from "@/utils/request/request";
import Data_notfound from "@/utils/notfound/data_notfound.vue";
import Worker_type_item from "@/components/worker/worker_type_item.vue";
import Worker_type_add from "@/components/worker/worker_type_add.vue";
export default {
  name: "WorkerTypes",
  data() {
    return {
      limit: 25,
      page: 0,
      pages: null,
      worker_types: [],
      search: "",
      item: {},
      w_id: null,
      w_name: "",
    };
  },
  watch: {
    limit(e) {
      this.page = 0;
      this.get_worker_types(this.page, e, this.search);
    },
    page(e) {
      this.get_worker_types(e, this.limit, this.search);
      document.getElementById("scroll").scrollTop = 0;
    },
    search(e) {
      this.page = 0;
      if (e.length > 0) {
        this.get_worker_types(this.page, this.limit, this.search);
      } else if (e.length == 0) {
        this.get_worker_types(this.page, this.limit, this.search);
        this.page = 0;
      }
    },
  },
  methods: {
    get_worker_types(page, limit, search) {
      this.$store.dispatch("setLoading", { isLoading: true });

      worker_type_get(page, limit, search)
        .then((res) => {
          this.worker_types = res.data.data;
          this.pages = res.data.pages;
          this.$store.dispatch("setLoading", { isLoading: false });
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
        });
    },
    remove_type(e) {
      this.$store.dispatch("setLoading", { isLoading: true });
      worker_type_remove(e)
        .then((res) => {
          this.$store.dispatch("setLoading", { isLoading: false });
          success(res).then(() => {
            this.get_worker_types(this.page, this.limit, this.search);
          });
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
        });
    },
    add(e) {
      document.getElementById("worker_t_disabled").disabled = true;
      this.$store.dispatch("setLoading", { isLoading: true });
      worker_type_add(e)
        .then((res) => {
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("worker_t_add").click();
          document.getElementById("worker_t_disabled").disabled = false;
          success(res).then(() => {
            this.get_worker_types(this.page, this.limit, this.search);
            e.specialty = "";
          });
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("worker_t_disabled").disabled = false;
        });
    },
  },
  created() {
    this.get_worker_types(this.page, this.limit, this.search);
  },
  components: { Header_item, Data_notfound, Worker_type_item, Worker_type_add },
};
</script>

<style lang="scss" scoped>
.col select {
  width: 80px;
  height: 30px;
}
.col .input-group {
  width: 200px;
}

@media (max-width: 509px) {
  .row {
    display: block;
  }
  .row .col .input-group {
    width: 100%;
  }
  .row .col select {
    width: 100%;
  }
}
</style>
