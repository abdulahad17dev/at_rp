<template>
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
      </div>
    </div>
  </div>

  <div class="table-responsive mt-3">
    <table class="table table-sm table-hover">
      <thead>
        <tr>
          <th>#ИД</th>
          <th>Исм</th>
          <th>Телефон рақам</th>
          <th>Манзил</th>
          <th>Баланс</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in markets || []" :key="item">
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>
            <a
              :href="`tel:+998${item.phone}`"
              class="text-decoration-none text-dark"
            >
              +998 {{ item.phone }}</a
            >
          </td>
          <td>{{ item.address }}</td>
          <td :class="item.balance >= 0 ? 'text-success' : 'text-danger'">
            {{ new Intl.NumberFormat().format(item.balance) }} сўм
          </td>
          <td>
            <button
              class="btn btn-sm btn-warning"
              @click="get_item(item)"
              data-bs-toggle="modal"
              data-bs-target="#supplier_put"
            >
              <i class="fa-solid fa-edit text-white"></i>
            </button>
            <a
              target="_blank"
              :href="`https://www.google.com/maps/@${item.map_lat},${item.map_long},8z`"
              class="btn btn-sm btn-primary mx-1"
            >
              <i class="fa-solid fa-location-dot"></i>
            </a>
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
          data-bs-toggle="modal"
          data-bs-target="#supplier_put"
        >
          <i class="fa-solid fa-angles-right text-dark"></i>
        </button>
      </li>
    </ul>
  </nav>

  <Supplier_put :item="items" @put="put" />
</template>

<script>
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
      document.getElementById("scroll").scrollTop = 0;
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
          success(res).then(() => {
            this.get_markets(this.page, this.limit, this.search);
          });
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("supplier_disabled").disabled = false;
        });
    },
  },
  created() {
    this.get_markets(this.page, this.limit, this.search);
  },
  components: { Data_notfound, Supplier_put },
};
</script>

<style lang="scss" scoped>
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

.col .input-group {
  width: 200px;
}

table {
  min-width: 600px;
  width: 100%;
}

.col select {
  width: 80px;
  height: 30px;
}

.table-responsive {
  max-height: 60vh;
}

@media (max-width: 500px) {
  .table-responsive {
    max-height: 95vh;
  }
}
</style>
