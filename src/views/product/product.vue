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
      </div>
    </div>
  </div>

  <Product_item :data="products" />

  <Data_notfound v-if="products == ''" />

  <nav aria-label="Page navigation example" class="mt-2" v-if="products != ''">
    <ul class="pagination pagination-sm justify-content-end">
      <li class="page-item">
        <button
          type="button"
          class="page-link"
          @click="get_products(page, limit, search)"
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
import { products_get } from "@/utils/request/request";
import { catchError } from "@/utils/request/handle_api_err";
import Product_item from "@/components/product/product_item.vue";
export default {
  name: "ProductItem",
  components: { Header_item, Data_notfound, Product_item },
  data() {
    return {
      limit: 25,
      page: 0,
      pages: null,
      products: [],
      search: "",
      product_id: null,
    };
  },
  watch: {
    limit(e) {
      this.page = 0;
      this.get_products(this.page, e, this.search);
    },
    page(e) {
      this.get_products(e, this.limit, this.search);
      document.getElementById("scroll").scrollTop = 0;
    },
    search(e) {
      this.page = 0;
      if (e.length > 0) {
        this.get_products(this.page, this.limit, this.search);
      } else if (e.length == 0) {
        this.get_products(this.page, this.limit, this.search);
        this.page = 0;
      }
    },
  },
  methods: {
    get_products(page, limit, search) {
      this.$store.dispatch("setLoading", { isLoading: true });

      products_get(page, limit, search)
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
    this.get_products(this.page, this.limit, this.search);
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

@media (max-width: 632px) {
  .row {
    display: block;
  }
  .row .col .input-group {
    width: 600px;
  }
  .row .col select {
    width: 100%;
  }
}
</style>
