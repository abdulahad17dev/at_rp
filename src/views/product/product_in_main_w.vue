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
        <router-link
          :to="{
            name: 'transfered_products_main_w',
            query: { id: this.$route.query.id },
          }"
          class="btn btn-sm btn-secondary"
        >
          <i class="fa-solid fa-clock-rotate-left"></i>
        </router-link>
      </div>
    </div>
  </div>

  <div class="table-responsive mt-3">
    <table class="table table-sm table-hover">
      <thead class="">
        <tr>
          <th style="width: 10%">№</th>
          <th style="width: 20%">Номи</th>
          <th style="width: 20%">Ўлчов бирлиги</th>
          <th style="width: 15%">Ҳажм</th>
          <th style="width: 15%">Нарх</th>
          <th style="width: 10%">
            <select class="form-select form-select-sm" v-model="type">
              <option value="proche">проче</option>
              <option value="smeta">смета</option>
              <option value="tarkib">таркиб</option>
            </select>
          </th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, inc) in products || []" :key="item">
          <td>{{ inc + 1 }}</td>
          <td>
            {{
              item.Warehouse_products.type == "proche"
                ? item.Warehouse_products.name
                : item.product_name
            }}
          </td>
          <td>{{ item.Warehouse_products.olchov_birligi }}</td>
          <td>
            <Format_numbers :number="item.Warehouse_products.quantity" />
          </td>
          <td>
            <Format_numbers :number="item.Warehouse_products.price" />
          </td>
          <td>{{ item.building }}</td>
          <td>
            <button
              class="btn btn-sm btn-success mx-1"
              data-bs-toggle="modal"
              data-bs-target="#share_m_warehouse"
              @click="
                product = item.Warehouse_products;
                body.related_id = item.Warehouse_products.id;
              "
            >
              <i class="fa-solid fa-circle-check"></i>
            </button>
          </td>
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

  <!-- Modal -->
  <div class="modal fade" id="share_m_warehouse">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="share_m_warehouse">Омборчига ўткизиш</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            id="share_product"
          ></button>
        </div>
        <form @submit.prevent="share">
          <div class="modal-body">
            <div class="row gap-2">
              <div class="col-10 mx-auto">
                <div class="form-group">
                  <label for="quantity">Ҳажм: </label>
                  <div class="input-group input-group-sm">
                    <input
                      type="number"
                      id="quantity"
                      step="any"
                      class="form-control"
                      v-model="body.quantity"
                      placeholder="Ҳажм"
                      min="0"
                      required
                    />
                    <span class="input-group-text bg-white">{{
                      product.olchov_birligi
                    }}</span>
                  </div>
                </div>
              </div>
              <div class="col-10 mx-auto">
                <label for="from">Объектлар: </label>
                <div class="dropdown">
                  <button
                    class="btn btn-light btn-sm dropdown-toggle"
                    type="button"
                    id="select_bank_building"
                    data-bs-toggle="dropdown"
                    data-bs-auto-close="outside"
                    aria-expanded="false"
                    @click="
                      buildings.length
                        ? ''
                        : buildings_get(
                            page_building,
                            limit_building,
                            search_building
                          )
                    "
                  >
                    {{ text_building }}
                  </button>
                  <ul
                    class="dropdown-menu border-top-0"
                    aria-labelledby="bank_building"
                  >
                    <li>
                      <input
                        type="search"
                        class="form-control form-control-sm"
                        placeholder="қидириш ..."
                        v-model="search_building"
                      />
                    </li>
                    <li>
                      <ul class="dropdown-items">
                        <li
                          v-for="item in buildings"
                          :key="item"
                          @click="select_building(item.id, item.name)"
                        >
                          <a class="dropdown-item">{{ item.name }}</a>
                        </li>
                      </ul>
                    </li>
                    <li v-if="buildings != ''">
                      <hr class="dropdown-divider m-0" />
                    </li>
                    <li>
                      <nav
                        aria-label="Page navigation example"
                        class="mt-2"
                        v-if="buildings != ''"
                      >
                        <ul
                          class="pagination pagination-sm justify-content-end"
                        >
                          <li class="page-item">
                            <button
                              type="button"
                              class="page-link"
                              @click="
                                buildings_get(
                                  page_building,
                                  limit_building,
                                  search_building
                                )
                              "
                            >
                              <i class="fa-solid fa-rotate"></i>
                            </button>
                          </li>
                          <li class="page-item">
                            <button
                              type="button"
                              class="page-link"
                              @click="page_building--"
                              :disabled="page_building == 0"
                            >
                              <i class="fa-solid fa-angle-left text-dark"></i>
                            </button>
                          </li>
                          <li class="page-item">
                            <button
                              type="button"
                              class="page-link text-dark"
                              disabled
                            >
                              {{ page_building + 1 }}
                            </button>
                          </li>
                          <li class="page-item">
                            <button
                              type="button"
                              class="page-link"
                              @click="page_building++"
                              :disabled="page_building == pages_building - 1"
                            >
                              <i class="fa-solid fa-angle-right text-dark"></i>
                            </button>
                          </li>
                        </ul>
                      </nav>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="submit"
              class="btn btn-outline-primary btn-sm"
              id="share_disabled"
              :disabled="!body.related_id || !body.quantity || !body.to_"
            >
              <i class="fa-solid fa-circle-check"></i>
            </button>
            <button
              type="button"
              class="btn btn-outline-danger btn-sm"
              data-bs-dismiss="modal"
            >
              <i class="fa-solid fa-circle-xmark"></i>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Header_item from "@/components/header/header_item.vue";
import {
  building_get,
  transfer_product,
  warehouse_products,
} from "@/utils/request/request";
import { catchError, success } from "@/utils/request/handle_api_err";
import Data_notfound from "@/utils/notfound/data_notfound.vue";
import Format_numbers from "@/utils/format/format_numbers.vue";

export default {
  name: "ProductMainWarehouse",
  components: { Header_item, Data_notfound, Format_numbers },
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
      body: {
        related_id: null,
        quantity: null,
        from_: 0,
        to_: null,
      },
      product: {},
      page_building: 0,
      pages_building: null,
      limit_building: 25,
      search_building: "",
      buildings: [],
      text_building: "объектлар",
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
      document.getElementById("scroll").scrollTop = 0;
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
    limit_building(e) {
      this.page_building = 0;
      this.buildings_get(this.page_building, e, this.search_building);
    },
    page_building(e) {
      this.buildings_get(e, this.limit_building, this.search_building);
      document.getElementById("scroll").scrollTop = 0;
    },
    search_building(e) {
      this.page_building = 0;
      this.buildings_get(this.page_building, this.limit_building, e);
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
    buildings_get(page_building, limit_building, search_building) {
      this.$store.dispatch("setLoading", { isLoading: true });

      building_get(page_building, limit_building, search_building)
        .then((res) => {
          this.buildings = res.data.data;
          this.pages_building = res.data.pages;
          this.$store.dispatch("setLoading", { isLoading: false });
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
        });
    },
    select_building(id, name) {
      this.body.to_ = id;
      this.text_building = name;
      document.getElementById("select_bank_building").click();
    },
    share() {
      document.getElementById("share_disabled").disabled = true;
      this.$store.dispatch("setLoading", { isLoading: true });
      transfer_product(Array(this.body))
        .then((res) => {
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("share_product").click();
          document.getElementById("share_disabled").disabled = false;
          success(res).then(() => {
            this.get_products(
              this.type,
              this.building_id,
              this.search,
              this.status,
              this.page,
              this.limit
            );
            this.text_warehouse = "базалар";
            this.body.related_id = null;
            this.body.quantity = null;
            this.body.to_ = null;
          });
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("share_disabled").disabled = false;
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
table {
  min-width: 950px;
  width: 100%;
}

.table-responsive {
  min-height: 64vh;
  max-height: 64vh;
}

@media (max-width: 500px) {
  .table-responsive {
    min-height: 89vh;
    max-height: 89vh;
  }
}
</style>
