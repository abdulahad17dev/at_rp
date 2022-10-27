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
        <router-link
          :to="{ name: 'transfered_products' }"
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
          <th style="width: 15%">Номи</th>
          <th style="width: 15%">Ўлчов бирлиги</th>
          <th style="width: 15%">Ҳажм</th>
          <th style="width: 15%">Нарх</th>
          <th>
            <div class="dropdown">
              <button
                class="btn btn-light btn-sm dropdown-toggle"
                type="button"
                id="select_building"
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
                aria-labelledby="select_building"
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
                    <li @click="select(0, 'барчаси')">
                      <a class="dropdown-item">барчаси</a>
                    </li>
                    <li
                      v-for="item in buildings"
                      :key="item"
                      @click="select(item.id, item.name)"
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
                    <ul class="pagination pagination-sm justify-content-end">
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
          </th>
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
                : item.product_name
            }}
          </td>
          <td>{{ item.Warehouse_products.olchov_birligi }}</td>
          <td>{{ item.Warehouse_products.quantity }}</td>
          <td>{{ item.Warehouse_products.price }}</td>
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
          <h5 class="modal-title" id="share_m_warehouse">Базага ўткизиш</h5>
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
                      min="1"
                      required
                    />
                    <span class="input-group-text bg-white">{{
                      product.olchov_birligi
                    }}</span>
                  </div>
                </div>
              </div>
              <div class="col-10 mx-auto" v-if="role == 'omborchi'">
                <div class="form-group">
                  <label for="warehouse_text">Базалар: </label>
                  <div class="dropdown">
                    <button
                      class="btn btn-light btn-sm dropdown-toggle"
                      type="button"
                      id="warehouse_text"
                      data-bs-toggle="dropdown"
                      data-bs-auto-close="outside"
                      aria-expanded="false"
                      @click="
                        warehouses.length
                          ? ''
                          : warehouses_get(
                              page_warehouse,
                              limit_warehouse,
                              search_warehouse
                            )
                      "
                    >
                      {{ text_warehouse }}
                    </button>
                    <ul
                      class="dropdown-menu border-top-0"
                      aria-labelledby="warehouse_text"
                    >
                      <li>
                        <input
                          type="search"
                          class="form-control form-control-sm"
                          placeholder="қидириш ..."
                          v-model="search_warehouse"
                        />
                      </li>
                      <li>
                        <ul class="dropdown-items">
                          <li
                            v-for="item in warehouses"
                            :key="item"
                            @click="select_w(item.id, item.name)"
                          >
                            <a class="dropdown-item">{{ item.name }}</a>
                          </li>
                        </ul>
                      </li>
                      <li v-if="warehouses != ''">
                        <hr class="dropdown-divider m-0" />
                      </li>
                      <li>
                        <nav
                          aria-label="Page navigation example"
                          class="mt-2"
                          v-if="warehouses != ''"
                        >
                          <ul
                            class="pagination pagination-sm justify-content-end"
                          >
                            <li class="page-item">
                              <button
                                type="button"
                                class="page-link"
                                @click="
                                  warehouses_get(
                                    page_warehouse,
                                    limit_warehouse,
                                    search_warehouse
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
                                @click="page_warehouse--"
                                :disabled="page_warehouse == 0"
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
                                {{ page_warehouse + 1 }}
                              </button>
                            </li>
                            <li class="page-item">
                              <button
                                type="button"
                                class="page-link"
                                @click="page_warehouse++"
                                :disabled="
                                  page_warehouse == pages_warehouse - 1
                                "
                              >
                                <i
                                  class="fa-solid fa-angle-right text-dark"
                                ></i>
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
import {
  building_get,
  main_warehouses_get,
  transfer_product,
  warehouse_products,
} from "@/utils/request/request";
import { catchError, success } from "@/utils/request/handle_api_err";
import Data_notfound from "@/utils/notfound/data_notfound.vue";
export default {
  name: "ProductInWarehouse",
  data() {
    return {
      type: "proche",
      building_id: 0,
      search: "",
      status: "warehouse",
      page: 0,
      limit: 25,
      pages: 0,
      products: [],
      page_building: 0,
      pages_building: null,
      limit_building: 25,
      search_building: "",
      buildings: [],
      text_building: "объектлар",
      role: localStorage.getItem("role"),
      body: {
        related_id: null,
        quantity: null,
        from_: 0,
        to_: null,
      },
      page_warehouse: 0,
      pages_warehouse: null,
      limit_warehouse: 25,
      search_warehouse: "",
      warehouses: [],
      text_warehouse: "базалар",
      product: {},
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
      if (e.length > 0) {
        this.get_products(
          this.type,
          this.building_id,
          e,
          this.status,
          this.page,
          this.limit
        );
      } else if (e.length == 0) {
        this.get_products(
          this.type,
          this.building_id,
          e,
          this.status,
          this.page,
          this.limit
        );
        this.page = 0;
      }
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
      if (e.length > 0) {
        this.buildings_get(
          this.page_building,
          this.limit_building,
          this.search_building
        );
      } else if (e.length == 0) {
        this.buildings_get(
          this.page_building,
          this.limit_building,
          this.search_building
        );
        this.page_building = 0;
      }
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
    select(id, name) {
      this.building_id = id;
      this.text_building = name;
      document.getElementById("select_building").click();
    },
    warehouses_get(page_warehouse, limit_warehouse, search_warehouse) {
      this.$store.dispatch("setLoading", { isLoading: true });

      main_warehouses_get(page_warehouse, limit_warehouse, search_warehouse)
        .then((res) => {
          this.warehouses = res.data.data;
          this.pages_warehouse = res.data.pages;
          this.$store.dispatch("setLoading", { isLoading: false });
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
        });
    },
    select_w(id, name) {
      this.body.to_ = id;
      this.text_warehouse = name;
      document.getElementById("warehouse_text").click();
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
  components: { Data_notfound },
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
  min-height: 62vh;
  max-height: 62vh;
}

@media (max-width: 500px) {
  .table-responsive {
    min-height: 88vh;
    max-height: 88vh;
  }
}

td button:focus {
  box-shadow: none;
}
</style>
