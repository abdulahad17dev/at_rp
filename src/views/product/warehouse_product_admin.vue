<template>
  <Header_item :name="this.$route.query.name" />
  <ul
    class="nav nav-tabs nav-justified nav-fill mb-3"
    id="pills-tab"
    role="tablist"
  >
    <li class="nav-item mx-1" role="presentation">
      <a
        class="nav-link active"
        id="pills-home-tab"
        data-mdb-toggle="pill"
        data-mdb-target="#pills-home"
        type="button"
        role="tab"
        aria-controls="pills-home"
        aria-selected="true"
      >
        Материаллар
      </a>
    </li>
    <li class="nav-item mx-1" role="presentation">
      <a
        class="nav-link"
        id="pills-profile-tab"
        data-mdb-toggle="pill"
        data-mdb-target="#pills-profile"
        type="button"
        role="tab"
        aria-controls="pills-profile"
        aria-selected="false"
        @click="
          invalid_products.length
            ? ''
            : get_invalid_product(
                invalid_status,
                invalid_type,
                invalid_search,
                invalid_from_time,
                invalid_to_time,
                invalid_building_id,
                invalid_page,
                invalid_limit
              )
        "
      >
        Яроқсиз материаллар
      </a>
    </li>
  </ul>
  <div class="tab-content" id="pills-tabContent">
    <div
      class="tab-pane fade show active"
      id="pills-home"
      role="tabpanel"
      aria-labelledby="pills-home-tab"
    >
      <div class="row">
        <div class="col mt-1 d-flex align-items-center">
          <span>Лимит</span>
          <select
            class="form-control form-control-sm mx-2 form-select"
            v-model="valid_limit"
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
              v-model="valid_search"
              class="form-control form-control-sm"
            />
          </div>
        </div>
      </div>

      <div class="table-responsive valid mt-3">
        <table class="table table-sm table-hover" id="warehouse_valid_product">
          <thead class="">
            <tr>
              <th style="width: 10%">№</th>
              <th style="width: 25%">Номи</th>
              <th style="width: 25%">Ўлчов бирлиги</th>
              <th style="width: 25%">Ҳажм</th>
              <th data-exclude="true">
                <select class="form-select form-select-sm" v-model="valid_type">
                  <option value="proche">проче</option>
                  <option value="smeta">смета</option>
                  <option value="tarkib">таркиб</option>
                </select>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, inc) in valid_products || []" :key="item">
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
              <td></td>
            </tr>
          </tbody>
        </table>
        <Data_notfound v-if="valid_products == ''" />
      </div>

      <nav
        aria-label="Page navigation example"
        class="mt-2"
        v-if="valid_products != ''"
      >
        <ul class="pagination pagination-sm justify-content-end">
          <li>
            <Select_data :id="'warehouse_valid_product'" />
          </li>
          <li class="page-item">
            <button
              type="button"
              class="page-link"
              @click="
                get_valid_product(
                  valid_type,
                  valid_building_id,
                  valid_search,
                  valid_status,
                  valid_page,
                  valid_limit
                )
              "
            >
              <i class="fa-solid fa-rotate"></i>
            </button>
          </li>
          <li class="page-item">
            <button
              class="page-link"
              @click="valid_page--"
              :disabled="valid_page == 0"
            >
              <i class="fa-solid fa-angle-left text-dark"></i>
            </button>
          </li>
          <li class="page-item">
            <button class="page-link text-dark" disabled>
              {{ valid_page + 1 }}
            </button>
          </li>
          <li class="page-item">
            <button
              class="page-link"
              @click="valid_page++"
              :disabled="valid_page == valid_pages"
            >
              <i class="fa-solid fa-angle-right text-dark"></i>
            </button>
          </li>
        </ul>
      </nav>
    </div>
    <div
      class="tab-pane fade"
      id="pills-profile"
      role="tabpanel"
      aria-labelledby="pills-profile-tab"
    >
      <div class="row">
        <div class="col mt-1 d-flex align-items-center">
          <span>Лимит</span>
          <select
            class="form-control form-control-sm mx-2 form-select"
            v-model="invalid_limit"
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
              v-model="invalid_search"
              class="form-control form-control-sm"
            />
          </div>
        </div>
      </div>

      <div class="table-responsive valid mt-3">
        <table
          class="table table-sm table-hover"
          id="warehouse_invalid_product"
        >
          <thead class="">
            <tr>
              <th style="width: 10%">№</th>
              <th style="width: 20%">Номи</th>
              <th style="width: 15%">Ҳажм</th>
              <th style="width: 15%">Сана</th>
              <th style="width: 20%">Ўтказган ҳодим</th>
              <th data-exclude="true">
                <select
                  class="form-select form-select-sm"
                  v-model="invalid_type"
                >
                  <option value="proche">проче</option>
                  <option value="smeta">смета</option>
                  <option value="tarkib">таркиб</option>
                </select>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, inc) in invalid_products || []" :key="item">
              <td>{{ inc + 1 }}</td>
              <td>
                {{ item.product }}
              </td>
              <td>
                <Format_numbers :number="item.Invalid_products.sum_quantity" />
              </td>
              <td>
                {{
                  new Date(item.Invalid_products.time)
                    .toLocaleDateString({
                      year: "numeric",
                      month: "numeric",
                      day: "numeric",
                    })
                    .slice(0, 10)
                }}
              </td>
              <td>{{ item.pto_user }}</td>
              <td></td>
            </tr>
          </tbody>
        </table>
        <Data_notfound v-if="invalid_products == ''" />
      </div>

      <nav
        aria-label="Page navigation example"
        class="mt-2"
        v-if="invalid_products != ''"
      >
        <ul class="pagination pagination-sm justify-content-end">
          <li>
            <Select_data :id="'warehouse_invalid_product'" />
          </li>
          <li class="page-item">
            <button
              type="button"
              class="page-link"
              @click="
                get_invalid_product(
                  invalid_status,
                  invalid_type,
                  invalid_search,
                  invalid_from_time,
                  invalid_to_time,
                  invalid_building_id,
                  invalid_page,
                  invalid_limit
                )
              "
            >
              <i class="fa-solid fa-rotate"></i>
            </button>
          </li>
          <li class="page-item">
            <button
              class="page-link"
              @click="invalid_page--"
              :disabled="invalid_page == 0"
            >
              <i class="fa-solid fa-angle-left text-dark"></i>
            </button>
          </li>
          <li class="page-item">
            <button class="page-link text-dark" disabled>
              {{ invalid_page + 1 }}
            </button>
          </li>
          <li class="page-item">
            <button
              class="page-link"
              @click="invalid_page++"
              :disabled="invalid_page == invalid_pages"
            >
              <i class="fa-solid fa-angle-right text-dark"></i>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import Header_item from "@/components/header/header_item.vue";
import {
  warehouse_invalid_products,
  warehouse_products,
} from "@/utils/request/request";
import { catchError } from "@/utils/request/handle_api_err";
import Data_notfound from "@/utils/notfound/data_notfound.vue";
import Format_numbers from "@/utils/format/format_numbers.vue";
import Select_data from "@/utils/select_data/select_data.vue";

export default {
  name: "BuildingProducts",
  components: { Header_item, Data_notfound, Format_numbers, Select_data },
  data() {
    return {
      valid_type: "proche",
      valid_building_id: this.$route.query.id,
      valid_search: "",
      valid_status: "warehouse",
      valid_page: 0,
      valid_limit: 25,
      valid_pages: null,
      valid_products: [],
      invalid_status: "warehouse",
      invalid_type: "proche",
      invalid_search: "",
      invalid_from_time: "",
      invalid_to_time: "",
      invalid_building_id: this.$route.query.id,
      invalid_page: 0,
      invalid_limit: 25,
      invalid_pages: null,
      invalid_products: [],
    };
  },
  watch: {
    valid_limit(e) {
      this.valid_page = 0;
      this.get_valid_product(
        this.valid_type,
        this.valid_building_id,
        this.valid_search,
        this.valid_status,
        this.valid_page,
        e
      );
    },
    valid_page(e) {
      this.get_valid_product(
        this.valid_type,
        this.valid_building_id,
        this.valid_search,
        this.valid_status,
        e,
        this.valid_limit
      );
    },
    valid_search(e) {
      this.valid_page = 0;
      if (e.length > 0) {
        this.get_valid_product(
          this.valid_type,
          this.valid_building_id,
          e,
          this.valid_status,
          this.valid_page,
          this.valid_limit
        );
      } else if (e.length == 0) {
        this.get_valid_product(
          this.valid_type,
          this.valid_building_id,
          e,
          this.valid_status,
          this.valid_page,
          this.valid_limit
        );
        this.valid_page = 0;
      }
    },
    valid_type(e) {
      this.valid_page = 0;
      this.get_valid_product(
        e,
        this.valid_building_id,
        this.valid_search,
        this.valid_status,
        this.valid_page,
        this.valid_limit
      );
    },
    invalid_type(e) {
      this.invalid_page = 0;
      this.get_invalid_product(
        this.invalid_status,
        e,
        this.invalid_search,
        this.invalid_from_time,
        this.invalid_to_time,
        this.invalid_building_id,
        this.invalid_page,
        this.invalid_limit
      );
    },
    invalid_search(e) {
      this.invalid_page = 0;
      this.get_invalid_product(
        this.invalid_status,
        this.invalid_type,
        e,
        this.invalid_from_time,
        this.invalid_to_time,
        this.invalid_building_id,
        this.invalid_page,
        this.invalid_limit
      );
    },
  },
  methods: {
    get_valid_product(type, building_id, search, status, page, limit) {
      this.$store.dispatch("setLoading", { isLoading: true });
      warehouse_products(type, building_id, search, status, page, limit)
        .then((res) => {
          res.data.data.forEach((element) => {
            element.invalid_quantity = null;
          });
          this.valid_products = res.data.data;
          this.valid_pages = res.data.pages;
          this.$store.dispatch("setLoading", { isLoading: false });
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
        });
    },
    get_invalid_product(
      status,
      type,
      search,
      from_time,
      to_time,
      building_id,
      page,
      limit
    ) {
      this.$store.dispatch("setLoading", { isLoading: true });
      warehouse_invalid_products(
        status,
        type,
        search,
        from_time,
        to_time,
        building_id,
        page,
        limit
      )
        .then((res) => {
          this.invalid_products = res.data.data;
          this.invalid_pages = res.data.pages;
          this.$store.dispatch("setLoading", { isLoading: false });
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
        });
    },
  },
  created() {
    this.get_valid_product(
      this.valid_type,
      this.valid_building_id,
      this.valid_search,
      this.valid_status,
      this.valid_page,
      this.valid_limit
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
  width: 190px;
}

@media (max-width: 500px) {
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

.table-responsive.valid table {
  min-width: 800px;
  width: 100%;
}

.table-responsive.valid {
  min-height: 58vh;
  max-height: 58vh;
}

@media (max-width: 500px) {
  .table-responsive.valid {
    min-height: 78vh;
    max-height: 78vh;
  }
}
</style>
