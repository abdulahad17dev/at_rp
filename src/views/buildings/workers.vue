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
          data-bs-target="#worker_add"
        >
          <i class="fa-solid fa-user-plus"></i>
        </button>
      </div>
    </div>
  </div>

  <Worker_item
    :data="workers"
    @item="item_get"
    @remove_specialty="remove_specialty"
  />

  <Data_notfound v-if="workers == ''" />

  <nav aria-label="Page navigation example" class="mt-2" v-if="workers != ''">
    <ul class="pagination pagination-sm justify-content-end">
      <li class="page-item">
        <button
          type="button"
          class="page-link"
          @click="get_workers(page, limit, search)"
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

  <Worker_add @add="add" />
  <Worker_update :item="item" @put="put" />
  <Worker_speciality :item="item" @add_speciality="add_speciality" />
</template>

<script>
import Header_item from "@/components/header/header_item.vue";
import { catchError, success } from "@/utils/request/handle_api_err";
import {
  workers_get,
  worker_add,
  worker_put,
  worker_speciality_add,
  worker_speciality_remove,
} from "@/utils/request/request";
import Data_notfound from "@/utils/notfound/data_notfound.vue";
import Worker_item from "../../components/worker/worker_item.vue";
import Worker_add from "@/components/worker/worker_add.vue";
import Worker_update from "../../components/worker/worker_update.vue";
import Worker_speciality from "../../components/worker/worker_speciality.vue";
export default {
  name: "BuildingWorkers",
  data() {
    return {
      limit: 25,
      page: 0,
      pages: null,
      search: "",
      building_id: this.$route.query.id,
      workers: [],
      item: {},
      w_id: null,
      w_name: "",
    };
  },
  watch: {
    limit(e) {
      this.page = 0;
      this.get_workers(this.page, e, this.search, this.building_id);
    },
    page(e) {
      this.get_workers(e, this.limit, this.search, this.building_id);
      document.getElementById("scroll").scrollTop = 0;
    },
    search(e) {
      this.page = 0;
      if (e.length > 0) {
        this.get_workers(this.page, this.limit, this.search, this.building_id);
      } else if (e.length == 0) {
        this.get_workers(this.page, this.limit, this.search, this.building_id);
        this.page = 0;
      }
    },
  },
  methods: {
    get_workers(page, limit, search, building_id) {
      this.$store.dispatch("setLoading", { isLoading: true });

      workers_get(page, limit, search, building_id)
        .then((res) => {
          this.workers = res.data.data;
          this.pages = res.data.pages;
          this.$store.dispatch("setLoading", { isLoading: false });
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
        });
    },
    add(e) {
      document.getElementById("worker_disabled").disabled = true;
      this.$store.dispatch("setLoading", { isLoading: true });
      worker_add(e)
        .then((res) => {
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("worker_close").click();
          document.getElementById("worker_disabled").disabled = false;
          success(res).then(() => {
            this.get_workers(
              this.page,
              this.limit,
              this.search,
              this.building_id
            );
            e.name = "";
            e.phone = null;
          });
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("worker_disabled").disabled = false;
        });
    },
    item_get(e) {
      this.item = {
        id: e.id,
        name: e.name,
        phone: e.phone,
        building_id: e.building_id,
      };
    },
    put(e) {
      this.$store.dispatch("setLoading", { isLoading: true });
      document.getElementById("worker_disabled2").disabled = true;
      worker_put(e)
        .then((res) => {
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("worker_put_close").click();
          document.getElementById("worker_disabled2").disabled = false;
          success(res).then(() => {
            this.get_workers(
              this.page,
              this.limit,
              this.search,
              this.building_id
            );
          });
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("worker_disabled2").disabled = false;
        });
    },
    add_speciality(e) {
      document.getElementById("worker_s_disabled").disabled = true;
      this.$store.dispatch("setLoading", { isLoading: true });
      worker_speciality_add(e)
        .then((res) => {
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("worker_s_close").click();
          document.getElementById("worker_s_disabled").disabled = false;
          success(res).then(() => {
            this.get_workers(
              this.page,
              this.limit,
              this.search,
              this.building_id
            );
            e.specialty = "";
          });
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("worker_s_disabled").disabled = false;
        });
    },
    remove_specialty(e) {
      this.$store.dispatch("setLoading", { isLoading: true });
      worker_speciality_remove(e)
        .then((res) => {
          this.$store.dispatch("setLoading", { isLoading: false });
          success(res).then(() => {
            this.get_workers(
              this.page,
              this.limit,
              this.search,
              this.building_id
            );
          });
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
        });
    },
  },
  created() {
    this.get_workers(this.page, this.limit, this.search, this.building_id);
  },
  components: {
    Header_item,
    Data_notfound,
    Worker_item,
    Worker_add,
    Worker_update,
    Worker_speciality,
  },
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

@media (max-width: 368px) {
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
