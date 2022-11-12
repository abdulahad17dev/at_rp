<template>
  <Header_item :name="this.$route.query.name" />

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
      <thead class="">
        <tr>
          <th style="width: 10%">№</th>
          <th style="width: 25%">Номи</th>
          <th style="width: 25%">Ўлчов бирлиги</th>
          <th style="width: 25%">Ҳажм</th>
          <th>
            <select class="form-select form-select-sm" v-model="type">
              <option value="proche">проче</option>
              <option value="smeta">смета</option>
              <option value="tarkib">таркиб</option>
            </select>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, inc) in products || []" :key="item">
          <td>{{ inc + 1 }}</td>
          <td>
            {{
              item.Warehouse_products.type == "proche"
                ? item.Warehouse_products.name
                : item.Warehouse_products.type == "tarkib"
                ? item.product_name + ":" + item.Warehouse_products.name
                : item.product_name
            }}
          </td>
          <td>{{ item.Warehouse_products.olchov_birligi }}</td>
          <td>
            <Format_numbers :number="item.Warehouse_products.quantity" />
          </td>
          <td></td>
        </tr>
      </tbody>
    </table>
    <Data_notfound v-if="products == ''" />
  </div>

  <nav aria-label="Page navigation example" class="mt-2" v-if="products != ''">
    <ul class="pagination pagination-sm justify-content-end">
      <li class="page-item">
        <button
          type="button"
          class="page-link"
          @click="get_products(type, building_id, search, status, page, limit)"
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
import { warehouse_products } from "@/utils/request/request";
import { catchError } from "@/utils/request/handle_api_err";
import Data_notfound from "@/utils/notfound/data_notfound.vue";
import Format_numbers from "@/utils/format/format_numbers.vue";
import Header_item from "@/components/header/header_item.vue";
export default {
  name: "ProductInWarehouse",
  data() {
    return {
      type: "proche",
      building_id: this.$route.query.id,
      search: "",
      status: "warehouse",
      page: 0,
      limit: 25,
      pages: 0,
      products: [],
      role: localStorage.getItem("role"),
    };
  },
  watch: {
    limit(e) {
      this.page = 0;
      this.get_products(
        this.type,
        this.building_id,
        this.search,
        this.status,
        this.page,
        e
      );
    },
    page(e) {
      this.get_products(
        this.type,
        this.building_id,
        this.search,
        this.status,
        e,
        this.limit
      );
    },
    search(e) {
      this.page = 0;
      this.get_products(
        this.type,
        this.building_id,
        e,
        this.status,
        this.page,
        this.limit
      );
    },
    type(e) {
      this.page = 0;
      this.get_products(
        e,
        this.building_id,
        this.search,
        this.status,
        this.page,
        this.limit
      );
    },
    building_id(e) {
      this.page = 0;
      this.get_products(
        this.type,
        e,
        this.search,
        this.status,
        this.page,
        this.limit
      );
    },
  },
  methods: {
    get_products(type, building_id, search, status, page, limit) {
      this.$store.dispatch("setLoading", { isLoading: true });
      warehouse_products(type, building_id, search, status, page, limit)
        .then((res) => {
          this.products = res.data.data;
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
    this.get_products(
      this.type,
      this.building_id,
      this.search,
      this.status,
      this.page,
      this.limit
    );
  },
  components: { Data_notfound, Format_numbers, Header_item },
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
.table-responsive {
  min-height: 64vh;
  max-height: 64vh;
}

@media (max-width: 500px) {
  .table-responsive {
    min-height: 90vh;
    max-height: 90vh;
  }

  table {
    min-width: 650px;
    width: 100%;
  }
}

table {
  table-layout: fixed;
}
</style>
