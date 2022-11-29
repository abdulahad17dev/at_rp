<template>
  <div class="row sort">
    <div class="col mt-1 d-flex align-items-center">
      <span class="d-none d-md-block d-sm-block d-lg-block">Лимит</span>
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
      </div>
    </div>
  </div>

  <div class="table-responsive mt-3">
    <table class="table table-sm table-hover">
      <thead>
        <tr>
          <th style="width: 10%">№</th>
          <th style="width: 20%">Исм</th>
          <th style="width: 15%">Телефон рақам</th>
          <th style="width: 20%">Манзил</th>
          <th style="width: 20%">Баланс</th>
          <th style="width: 15%"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, inc) in markets || []" :key="item">
          <td>{{ inc + 1 }}</td>
          <td>{{ item.Markets.name }}</td>
          <td>
            <a
              :href="`tel:+998${item.Markets.phone}`"
              class="text-decoration-none text-dark"
            >
              +998 {{ format_phone(item.Markets.phone) }}</a
            >
          </td>
          <td>{{ item.Markets.address }}</td>
          <td>
            {{ item.naxt_supply - item.naxt_expense }} сўм
            <br />
            {{ item.shot_supply - item.shot_expense }} сўм
          </td>
          <td>
            <button
              class="btn btn-sm btn-warning"
              @click="get_item(item.Markets)"
              data-mdb-toggle="modal"
              data-mdb-target="#supplier_put"
            >
              <i class="fa-solid fa-edit text-white"></i>
            </button>
            <Route_map
              :lat="item.Markets.map_lat"
              :long="item.Markets.map_long"
            />
            <router-link
              :to="{ name: 'supply_history', query: { id: item.Markets.id } }"
              class="btn btn-sm btn-secondary"
            >
              <i class="fa-solid fa-clock-rotate-left"></i>
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
    <Data_notfound v-if="markets == ''" />
  </div>

  <nav aria-label="Page navigation example" class="mt-2" v-if="markets != ''">
    <ul class="pagination pagination-sm justify-content-end">
      <li class="page-item">
        <button
          type="button"
          class="page-link"
          @click="get_markets(page, limit, search)"
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

  <Supplier_put :item="items" @put="put" />
</template>

<script>
import Route_map from "@/utils/map/route_map.vue";
import Data_notfound from "@/utils/notfound/data_notfound.vue";
import { catchError, success } from "@/utils/request/handle_api_err";
import { markets_get, market_put } from "@/utils/request/request";
import Supplier_put from "./supplier_put.vue";
export default {
  name: "SupplierItem",
  data() {
    return {
      limit: 25,
      page: 0,
      pages: null,
      markets: [],
      search: "",
      items: {},
    };
  },
  watch: {
    limit(e) {
      this.page = 0;
      this.get_markets(this.page, e, this.search);
    },
    page(e) {
      this.get_markets(e, this.limit, this.search);
    },
    search(e) {
      this.page = 0;
      if (e.length > 0) {
        this.get_markets(this.page, this.limit, this.search);
      } else if (e.length == 0) {
        this.get_markets(this.page, this.limit, this.search);
        this.page = 0;
      }
    },
    role(e) {
      if (e.length > 0) {
        this.get_markets(this.page, this.limit, this.search);
      } else if (e.length == 0) {
        this.get_markets(this.page, this.limit, this.search);
        this.page = 0;
      }
    },
  },
  methods: {
    get_markets(page, limit, search) {
      this.$store.dispatch("setLoading", { isLoading: true });

      markets_get(page, limit, search)
        .then((res) => {
          this.markets = res.data.data;
          this.pages = res.data.pages;
          this.$store.dispatch("setLoading", { isLoading: false });
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
        });
    },
    get_item(item) {
      this.items = {
        name: item.name,
        phone: item.phone,
        address: item.address,
        map_long: item.map_long,
        map_lat: item.map_lat,
        id: item.id,
      };
    },
    put(e) {
      this.$store.dispatch("setLoading", { isLoading: true });
      document.getElementById("supplier_disabled").disabled = true;
      market_put(e)
        .then((res) => {
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("supplier_put_c").click();
          document.getElementById("supplier_disabled").disabled = false;
          success(res);
          this.get_markets(this.page, this.limit, this.search);
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("supplier_disabled").disabled = false;
        });
    },
    format_phone(number) {
      return String(
        "(" +
          String(number).substr(0, 2) +
          ") " +
          String(number).substr(2, 3) +
          " " +
          String(number).substr(5, 2) +
          " " +
          String(number).substr(7, 2)
      );
    },
  },
  created() {
    this.get_markets(this.page, this.limit, this.search);
  },
  components: { Data_notfound, Supplier_put, Route_map },
};
</script>

<style lang="scss" scoped>
.col .input-group {
  width: 200px;
}

table {
  min-width: 1150px;
  width: 100%;
}

.col select {
  width: 80px;
  height: 30px;
}

.table-responsive {
  max-height: 65vh;
}

@media (max-width: 500px) {
  .table-responsive {
    max-height: 100vh;
  }
  .sort {
    zoom: 80%;
  }
}
</style>
