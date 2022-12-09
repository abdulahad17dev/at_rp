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
          v-if="role != 'admin'"
          class="btn btn-outline-secondary"
          type="button"
          data-mdb-toggle="modal"
          data-mdb-target="#main_warehouse_add"
          @click="get_position"
        >
          <i class="fa-solid fa-circle-plus"></i>
        </button>
      </div>
    </div>
  </div>

  <Main_w_item :data="main_warehouses" @item="item_get" />

  <Data_notfound v-if="main_warehouses == ''" />

  <nav
    aria-label="Page navigation example"
    class="mt-2"
    v-if="main_warehouses != ''"
  >
    <ul class="pagination pagination-sm justify-content-end">
      <li>
        <Select_data :id="'select_main_w_data'" />
      </li>
      <li class="page-item">
        <button
          type="button"
          class="page-link"
          @click="get_main_warehouses(page, limit, search)"
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

  <Main_w_add :lat="lat" :long="long" @add="add" />
  <Main_w_put :item="item" @put="put" />
</template>

<script>
import Header_item from "@/components/header/header_item.vue";
import {
  main_warehouses_add,
  main_warehouses_get,
  main_warehouses_put,
} from "@/utils/request/request";
import {
  catchError,
  position_err,
  success,
} from "@/utils/request/handle_api_err";
import Data_notfound from "@/utils/notfound/data_notfound.vue";
import Main_w_item from "@/components/main_warehouses/main_w_item.vue";
import Main_w_add from "@/components/main_warehouses/main_w_add.vue";
import Main_w_put from "@/components/main_warehouses/main_w_put.vue";
import Select_data from "@/utils/select_data/select_data.vue";
export default {
  name: "MainWarehouses",
  components: {
    Header_item,
    Data_notfound,
    Main_w_item,
    Main_w_add,
    Main_w_put,
    Select_data,
  },
  data() {
    return {
      limit: 25,
      page: 0,
      pages: null,
      main_warehouses: [],
      search: "",
      lat: "",
      long: "",
      item: {},
      role: localStorage.getItem("role"),
    };
  },
  watch: {
    limit(e) {
      this.page = 0;
      this.get_main_warehouses(this.page, e, this.search);
    },
    page(e) {
      this.get_main_warehouses(e, this.limit, this.search);
    },
    search(e) {
      this.page = 0;
      if (e.length > 0) {
        this.get_main_warehouses(this.page, this.limit, this.search);
      } else if (e.length == 0) {
        this.get_main_warehouses(this.page, this.limit, this.search);
        this.page = 0;
      }
    },
  },
  methods: {
    get_main_warehouses(page, limit, search) {
      this.$store.dispatch("setLoading", { isLoading: true });

      main_warehouses_get(page, limit, search)
        .then((res) => {
          this.main_warehouses = res.data.data;
          this.pages = res.data.pages;
          this.$store.dispatch("setLoading", { isLoading: false });
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
        });
    },
    get_position() {
      this.lat = "";
      this.long = "";
      const success = (position) => {
        this.lat = String(position.coords.latitude);
        this.long = String(position.coords.longitude);
      };

      const error = (err) => {
        position_err(err);
      };

      navigator.geolocation.getCurrentPosition(success, error);
    },
    add(e) {
      document.getElementById("main_w_disabled").disabled = true;
      this.$store.dispatch("setLoading", { isLoading: true });
      main_warehouses_add(e)
        .then((res) => {
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("main_w_add").click();
          document.getElementById("main_w_disabled").disabled = false;
          success(res);
          this.get_main_warehouses(this.page, this.limit, this.search);
          e.name = "";
          e.phone = null;
          e.address = "";
          e.map_long = "";
          e.map_lat = "";
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("main_w_disabled").disabled = false;
        });
    },
    item_get(e) {
      this.item = {
        id: e.id,
        name: e.name,
        phone: e.phone,
        address: e.address,
        map_long: e.map_long,
        map_lat: e.map_lat,
      };
    },
    put(e) {
      this.$store.dispatch("setLoading", { isLoading: true });
      document.getElementById("main_w_disabled2").disabled = true;
      main_warehouses_put(e)
        .then((res) => {
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("main_w_put").click();
          document.getElementById("main_w_disabled2").disabled = false;
          success(res);
          this.get_main_warehouses(this.page, this.limit, this.search);
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("main_w_disabled2").disabled = false;
        });
    },
  },
  created() {
    this.get_main_warehouses(this.page, this.limit, this.search);
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
