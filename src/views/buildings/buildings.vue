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
      <select
        class="form-control form-control-sm mx-2 form-select"
        v-model="status"
      >
        <option value="">барчаси</option>
        <option value="wait">кутилмоқда</option>
        <option value="start">қурилмоқда</option>
        <option value="end">якунланди</option>
      </select>
    </div>
    <div
      class="col mt-2 d-flex align-items-center justify-content-end"
      v-if="role != 'prorap' || role != 'omborchi'"
    >
      <span>Қидириш: </span>
      <div class="input-group input-group-sm mx-2">
        <input
          type="search"
          v-model="search"
          class="form-control form-control-sm"
        />
        <button
          v-if="role == 'pto'"
          class="btn btn-outline-secondary"
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#building_add"
          @click="get_position"
        >
          <i class="fa-solid fa-circle-plus"></i>
        </button>
      </div>
    </div>
  </div>

  <Buildings_item
    :data="buildings"
    @get_buildings="get_buildings(page, limit, search, status)"
  />

  <Data_notfound v-if="buildings == ''" />

  <nav aria-label="Page navigation example" class="mt-2" v-if="buildings != ''">
    <ul class="pagination pagination-sm justify-content-end">
      <li class="page-item">
        <button
          type="button"
          class="page-link"
          @click="get_buildings(page, limit, search, status)"
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

  <Building_add @add="add" :lat="lat" :long="long" />
</template>

<script>
import { building_add, building_get } from "@/utils/request/request";
import {
  catchError,
  position_err,
  success,
} from "@/utils/request/handle_api_err";
import Buildings_item from "@/components/buildings/buildings_item.vue";
import Building_add from "@/components/buildings/building_add.vue";
import Data_notfound from "@/utils/notfound/data_notfound.vue";
import Header_item from "@/components/header/header_item.vue";
export default {
  name: "Buildings_Item",
  data() {
    return {
      limit: 25,
      page: 0,
      pages: null,
      buildings: [],
      search: "",
      lat: "",
      long: "",
      status: "",
      role: localStorage.getItem("role"),
    };
  },
  watch: {
    limit(e) {
      this.page = 0;
      this.get_buildings(this.page, e, this.search, this.status);
    },
    page(e) {
      this.get_buildings(e, this.limit, this.search, this.status);
      document.getElementById("scroll").scrollTop = 0;
    },
    search(e) {
      this.page = 0;
      if (e.length > 0) {
        this.get_buildings(this.page, this.limit, this.search, this.status);
      } else if (e.length == 0) {
        this.get_buildings(this.page, this.limit, this.search, this.status);
        this.page = 0;
      }
    },
    status(e) {
      if (e.length > 0) {
        this.get_buildings(this.page, this.limit, this.search, this.status);
      } else if (e.length == 0) {
        this.get_buildings(this.page, this.limit, this.search, this.status);
        this.page = 0;
      }
    },
  },
  methods: {
    get_buildings(page, limit, search, status) {
      this.$store.dispatch("setLoading", { isLoading: true });
      building_get(page, limit, search, status)
        .then((res) => {
          this.buildings = res.data.data;
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
        this.lat = position.coords.latitude;
        this.long = position.coords.longitude;
      };

      const error = (err) => {
        position_err(err);
      };

      navigator.geolocation.getCurrentPosition(success, error);
    },
    add(e) {
      document.getElementById("building_disabled").disabled = true;
      this.$store.dispatch("setLoading", { isLoading: true });
      building_add(e)
        .then((res) => {
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("buildings_add").click();
          document.getElementById("building_disabled").disabled = false;
          success(res).then(() => {
            this.get_buildings(this.page, this.limit, this.search, this.status);
            e.name = "";
            e.address = "";
            e.budget = null;
            e.start_date = "";
            e.end_date = "";
            e.map_long = "";
            e.map_lat = "";
            e.status = "wait";
          });
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("building_disabled").disabled = false;
        });
    },
  },
  created() {
    this.get_buildings(this.page, this.limit, this.search, this.status);
  },
  components: { Buildings_item, Building_add, Data_notfound, Header_item },
};
</script>

<style lang="scss" scoped>
.col select {
  width: 80px;
  height: 30px;
}
.col select:last-child {
  width: 130px;
  height: 30px;
}

.col .input-group {
  width: 200px;
}

@media (max-width: 632px) {
  .row {
    display: block;
  }
  .row .col .input-group {
    width: 600px;
  }
  .row .col select {
    width: 50%;
  }
}
</style>
