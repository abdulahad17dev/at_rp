<template>
  <Header_item />

  <Proche_s_add @add="add" />

  <Proche_s_item
    :data="product_requests"
    @remove="remove"
    @status="status_get"
  />

  <Data_notfound v-if="product_requests == ''" />

  <nav
    aria-label="Page navigation example"
    class="mt-2"
    v-if="product_requests != ''"
  >
    <ul class="pagination pagination-sm justify-content-end">
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
          @click="
            get_proche_s(page, limit, building_id, status, user_id, search)
          "
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
        <select class="form-control form-control-sm page_select" v-model="page">
          <option :value="item - 1" v-for="item in pages" :key="item">
            {{ item }}
          </option>
        </select>
      </li>
      <li class="page-item">
        <button class="page-link" @click="page++" :disabled="page == pages - 1">
          <i class="fa-solid fa-angle-right text-dark"></i>
        </button>
      </li>
    </ul>
  </nav>
</template>

<script>
import Header_item from "@/components/header/header_item.vue";
import Data_notfound from "@/utils/notfound/data_notfound.vue";
import {
  proche_s_add,
  proche_s_get,
  proche_s_put,
} from "@/utils/request/request";
import { catchError, success } from "@/utils/request/handle_api_err";
import Proche_s_item from "@/components/buildings/proche_s_item.vue";
import Proche_s_add from "@/components/buildings/proche_s_add.vue";
export default {
  name: "ProcheSorovlar",
  components: { Header_item, Data_notfound, Proche_s_item, Proche_s_add },
  data() {
    return {
      limit: 25,
      page: 0,
      pages: null,
      product_requests: [],
      building_id: this.$route.query.id,
      user_id: 0,
      status: "",
      search: "",
      body: {
        id: null,
        name: "string",
        quantity: 0,
        olchov_birligi: "string",
        comment: "string",
        building_id: 0,
      },
    };
  },
  watch: {
    limit(e) {
      this.page = 0;
      this.get_proche_s(
        this.page,
        e,
        this.building_id,
        this.status,
        this.user_id,
        this.search
      );
    },
    page(e) {
      this.get_proche_s(
        e,
        this.limit,
        this.building_id,
        this.status,
        this.user_id,
        this.search
      );
    },
    status(e) {
      this.page = 0;
      this.get_proche_s(
        this.page,
        this.limit,
        this.building_id,
        e,
        this.user_id,
        this.search
      );
    },
  },
  methods: {
    get_proche_s(page, limit, building_id, status, user_id, search) {
      this.$store.dispatch("setLoading", { isLoading: true });

      proche_s_get(page, limit, building_id, status, user_id, search)
        .then((res) => {
          this.product_requests = res.data.data;
          this.pages = res.data.pages;
          this.$store.dispatch("setLoading", { isLoading: false });
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
        });
    },
    add(e) {
      document.getElementById("proche_sorov_disabled").disabled = true;
      this.$store.dispatch("setLoading", { isLoading: true });
      proche_s_add(e)
        .then((res) => {
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("proche_sorov_disabled").disabled = false;
          success(res);
          this.get_proche_s(
            this.page,
            this.limit,
            this.building_id,
            this.status,
            this.user_id,
            this.search
          );
          e.name = "";
          e.quantity = null;
          e.olchov_birligi = "";
          e.comment = "";
          e.building_id = this.$route.query.id;
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("proche_sorov_disabled").disabled = false;
        });
    },
    remove(e) {
      this.body.id = e;
      document.getElementById("remove_proche").disabled = true;
      this.$store.dispatch("setLoading", { isLoading: true });
      proche_s_put("false", 0, Array(this.body))
        .then((res) => {
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("remove_proche").disabled = false;
          success(res);
          this.get_proche_s(
            this.page,
            this.limit,
            this.building_id,
            this.status,
            this.user_id,
            this.search
          );
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("remove_proche").disabled = false;
        });
    },
    status_get(e) {
      this.status = e;
    },
  },
  created() {
    this.get_proche_s(
      this.page,
      this.limit,
      this.building_id,
      this.status,
      this.user_id,
      this.search
    );
  },
};
</script>

<style lang="scss" scoped>
th select {
  width: 170px;
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
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
