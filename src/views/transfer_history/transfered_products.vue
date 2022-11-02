<template>
  <Header_item />
  <ul
    class="nav nav-pills nav-justified nav-fill mb-3"
    id="pills-tab"
    role="tablist"
  >
    <li class="nav-item mx-1" role="presentation">
      <button
        class="btn btn-sm btn-light w-100 active"
        id="pills-home-tab"
        data-bs-toggle="pill"
        data-bs-target="#pills-home"
        type="button"
        role="tab"
        aria-controls="pills-home"
        aria-selected="true"
      >
        Базага жўнатилган материаллар
      </button>
    </li>
    <li class="nav-item mx-1" role="presentation">
      <button
        class="btn btn-sm btn-light w-100"
        id="pills-profile-tab"
        data-bs-toggle="pill"
        data-bs-target="#pills-profile"
        type="button"
        role="tab"
        aria-controls="pills-profile"
        aria-selected="false"
        @click="
          products_accept.length
            ? ''
            : get_transfered_product_a(
                a_status2,
                a_type,
                a_from,
                a_to,
                a_status,
                a_search,
                a_page,
                a_limit
              )
        "
      >
        Базадан қабул қилинган материаллар
      </button>
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
            v-model="sh_limit"
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
              v-model="sh_search"
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
              <th style="width: 20%">Материаллар</th>
              <th style="width: 15%">Ҳажм</th>
              <th style="width: 15%">Ўлчов бирлиги</th>
              <th style="width: 10%">Сана</th>
              <th>
                <select class="form-select form-select-sm" v-model="sh_type">
                  <option value="proche">проче</option>
                  <option value="tarkib">таркиб</option>
                  <option value="smeta">смета</option>
                </select>
              </th>
              <th>
                <select class="form-select form-select-sm" v-model="sh_status">
                  <option value="true">қаъбул қилинди</option>
                  <option value="false">қаъбул қилинмади</option>
                </select>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, inc) in products_accept" :key="item">
              <td>{{ inc + 1 }}</td>
              <td>{{ item.product }}</td>
              <td>{{ item.sum_quantity }}</td>
              <td>{{ item.olchov_birligi }}</td>
              <td>
                {{
                  new Date(item.Product_transfers.time)
                    .toLocaleDateString({
                      year: "numeric",
                      month: "numeric",
                      day: "numeric",
                    })
                    .slice(0, 10)
                }}
              </td>
              <td></td>
              <td>
                <button
                  class="btn btn-sm btn-danger"
                  v-if="item.Product_transfers.status == false"
                  @click="remove(item.Product_transfers.id)"
                >
                  <i class="fa-solid fa-circle-xmark"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <Data_notfound v-if="products_accept == ''" />

      <nav
        aria-label="Page navigation example"
        class="mt-2"
        v-if="products_accept != ''"
      >
        <ul class="pagination pagination-sm justify-content-end">
          <li class="page-item">
            <button
              type="button"
              class="page-link"
              @click="
                get_transfered_product(
                  sh_status2,
                  sh_type,
                  sh_from,
                  sh_to,
                  sh_status,
                  sh_search,
                  sh_page,
                  sh_limit
                )
              "
            >
              <i class="fa-solid fa-rotate"></i>
            </button>
          </li>
          <li class="page-item">
            <button
              class="page-link"
              @click="sh_page = 0"
              :disabled="sh_page == 0"
            >
              <i class="fa-solid fa-angles-left text-dark"></i>
            </button>
          </li>
          <li class="page-item">
            <button
              class="page-link"
              @click="sh_page--"
              :disabled="sh_page == 0"
            >
              <i class="fa-solid fa-angle-left text-dark"></i>
            </button>
          </li>
          <li class="page-item">
            <button class="page-link text-dark" disabled>
              {{ sh_page + 1 }}
            </button>
          </li>
          <li class="page-item">
            <button
              class="page-link"
              @click="sh_page++"
              :disabled="sh_page == sh_pages - 1"
            >
              <i class="fa-solid fa-angle-right text-dark"></i>
            </button>
          </li>
          <li class="page-item">
            <button
              class="page-link"
              @click="sh_page = sh_pages - 1"
              :disabled="sh_page == sh_pages - 1"
            >
              <i class="fa-solid fa-angles-right text-dark"></i>
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
            v-model="a_limit"
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
              v-model="a_search"
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
              <th style="width: 20%">Материаллар</th>
              <th style="width: 15%">Ҳажм</th>
              <th style="width: 15%">Ўлчов бирлиги</th>
              <th style="width: 10%">Сана</th>
              <th>
                <select class="form-select form-select-sm" v-model="a_type">
                  <option value="proche">проче</option>
                  <option value="tarkib">таркиб</option>
                  <option value="smeta">смета</option>
                </select>
              </th>
              <th>
                <select class="form-select form-select-sm" v-model="a_status">
                  <option value="true">қаъбул қилинди</option>
                  <option value="false">қаъбул қилинмади</option>
                </select>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, inc) in products_accept" :key="item">
              <td>{{ inc + 1 }}</td>
              <td>{{ item.product }}</td>
              <td>{{ item.sum_quantity }}</td>
              <td>{{ item.olchov_birligi }}</td>
              <td>
                {{
                  new Date(item.Product_transfers.time)
                    .toLocaleDateString({
                      year: "numeric",
                      month: "numeric",
                      day: "numeric",
                    })
                    .slice(0, 10)
                }}
              </td>
              <td></td>
              <td>
                <button
                  class="btn btn-sm btn-success"
                  v-if="item.Product_transfers.status == false"
                  @click="accept(item.Product_transfers.id)"
                >
                  <i class="fa-solid fa-circle-check"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <Data_notfound v-if="products_accept == ''" />
      </div>

      <nav
        aria-label="Page navigation example"
        class="mt-2"
        v-if="products_accept != ''"
      >
        <ul class="pagination pagination-sm justify-content-end">
          <li class="page-item">
            <button
              type="button"
              class="page-link"
              @click="
                get_transfered_product_a(
                  a_status2,
                  a_type,
                  a_from,
                  a_to,
                  a_status,
                  a_search,
                  a_page,
                  a_limit
                )
              "
            >
              <i class="fa-solid fa-rotate"></i>
            </button>
          </li>
          <li class="page-item">
            <button
              class="page-link"
              @click="a_page = 0"
              :disabled="a_page == 0"
            >
              <i class="fa-solid fa-angles-left text-dark"></i>
            </button>
          </li>
          <li class="page-item">
            <button class="page-link" @click="a_page--" :disabled="a_page == 0">
              <i class="fa-solid fa-angle-left text-dark"></i>
            </button>
          </li>
          <li class="page-item">
            <button class="page-link text-dark" disabled>
              {{ a_page + 1 }}
            </button>
          </li>
          <li class="page-item">
            <button
              class="page-link"
              @click="a_page++"
              :disabled="a_page == a_pages - 1"
            >
              <i class="fa-solid fa-angle-right text-dark"></i>
            </button>
          </li>
          <li class="page-item">
            <button
              class="page-link"
              @click="a_page = a_pages - 1"
              :disabled="a_page == a_pages - 1"
            >
              <i class="fa-solid fa-angles-right text-dark"></i>
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
  acceptance_transfered_product,
  take_back_transfered_product,
  transfered_products,
} from "@/utils/request/request";
import { catchError, success } from "@/utils/request/handle_api_err";
import Data_notfound from "@/utils/notfound/data_notfound.vue";
export default {
  components: { Header_item, Data_notfound },
  name: "TransferedProducts",
  data() {
    return {
      products_share: [],
      sh_status2: "to_main_warehouse",
      sh_type: "proche",
      sh_from: 0,
      sh_to: 0,
      sh_status: "false",
      sh_search: "",
      sh_page: 0,
      sh_limit: 25,
      sh_pages: null,
      products_accept: [],
      a_status2: "to_warehouse",
      a_type: "proche",
      a_from: 0,
      a_to: 0,
      a_status: "false",
      a_search: "",
      a_page: 0,
      a_limit: 25,
      a_pages: null,
    };
  },
  watch: {
    sh_limit(e) {
      this.page = 0;
      this.get_transfered_product(
        this.sh_status2,
        this.sh_type,
        this.sh_from,
        this.sh_to,
        this.sh_status,
        this.sh_search,
        this.sh_page,
        e
      );
    },
    sh_page(e) {
      this.get_transfered_product(
        this.sh_status2,
        this.sh_type,
        this.sh_from,
        this.sh_to,
        this.sh_status,
        this.sh_search,
        e,
        this.sh_limit
      );
      document.getElementById("scroll").scrollTop = 0;
    },
    sh_search(e) {
      this.page = 0;
      this.get_transfered_product(
        this.sh_status2,
        this.sh_type,
        this.sh_from,
        this.sh_to,
        this.sh_status,
        e,
        this.sh_page,
        this.sh_limit
      );
    },
    sh_type(e) {
      this.page = 0;
      this.get_transfered_product(
        this.sh_status2,
        e,
        this.sh_from,
        this.sh_to,
        this.sh_status,
        this.sh_search,
        this.sh_page,
        this.sh_limit
      );
    },
    sh_status(e) {
      this.page = 0;
      this.get_transfered_product(
        this.sh_status2,
        this.sh_type,
        this.sh_from,
        this.sh_to,
        e,
        this.sh_search,
        this.sh_page,
        this.sh_limit
      );
    },
    a_limit(e) {
      this.page = 0;
      this.get_transfered_product_a(
        this.a_status2,
        this.a_type,
        this.a_from,
        this.a_to,
        this.a_status,
        this.a_search,
        this.a_page,
        e
      );
    },
    a_page(e) {
      this.get_transfered_product_a(
        this.a_status2,
        this.a_type,
        this.a_from,
        this.a_to,
        this.a_status,
        this.a_search,
        e,
        this.a_limit
      );
      document.getElementById("scroll").scrollTop = 0;
    },
    a_search(e) {
      this.page = 0;
      this.get_transfered_product_a(
        this.a_status2,
        this.a_type,
        this.a_from,
        this.a_to,
        this.a_status,
        e,
        this.a_page,
        this.a_limit
      );
    },
    a_type(e) {
      this.page = 0;
      this.get_transfered_product_a(
        this.a_status2,
        e,
        this.a_from,
        this.a_to,
        this.a_status,
        this.a_search,
        this.a_page,
        this.a_limit
      );
    },
    a_status(e) {
      this.page = 0;
      this.get_transfered_product_a(
        this.a_status2,
        this.a_type,
        this.a_from,
        this.a_to,
        e,
        this.a_search,
        this.a_page,
        this.a_limit
      );
    },
  },
  methods: {
    get_transfered_product(
      status2,
      type,
      from,
      to,
      status,
      search,
      page,
      limit
    ) {
      this.$store.dispatch("setLoading", { isLoading: true });

      transfered_products(status2, type, from, to, status, search, page, limit)
        .then((res) => {
          this.products_accept = res.data.data;
          this.sh_pages = res.data.pages;
          this.$store.dispatch("setLoading", { isLoading: false });
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
        });
    },
    remove(e) {
      this.$store.dispatch("setLoading", { isLoading: true });
      take_back_transfered_product(e)
        .then((res) => {
          this.$store.dispatch("setLoading", { isLoading: false });
          success(res).then(() => {
            this.get_transfered_product(
              this.sh_status2,
              this.sh_type,
              this.sh_from,
              this.sh_to,
              this.sh_status,
              this.sh_search,
              this.sh_page,
              this.sh_limit
            );
          });
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
        });
    },
    get_transfered_product_a(
      status2,
      type,
      from,
      to,
      status,
      search,
      page,
      limit
    ) {
      this.$store.dispatch("setLoading", { isLoading: true });

      transfered_products(status2, type, from, to, status, search, page, limit)
        .then((res) => {
          this.products_accept = res.data.data;
          this.a_pages = res.data.pages;
          this.$store.dispatch("setLoading", { isLoading: false });
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
        });
    },
    accept(e) {
      this.$store.dispatch("setLoading", { isLoading: true });
      acceptance_transfered_product(e)
        .then((res) => {
          this.$store.dispatch("setLoading", { isLoading: false });
          success(res).then(() => {
            this.get_transfered_product_a(
              this.a_status2,
              this.a_type,
              this.a_from,
              this.a_to,
              this.a_status,
              this.a_search,
              this.a_page,
              this.a_limit
            );
          });
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
        });
    },
  },
  created() {
    this.get_transfered_product_a(
      this.sh_status2,
      this.sh_type,
      this.sh_from,
      this.sh_to,
      this.sh_status,
      this.sh_search,
      this.sh_page,
      this.sh_limit
    );
  },
};
</script>

<style lang="scss" scoped>
@media (max-width: 500px) {
  ul.nav {
    zoom: 70%;
  }
}
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
  min-width: 800px;
  width: 100%;
}

.table-responsive {
  max-height: 62vh;
}

@media (max-width: 500px) {
  .table-responsive {
    max-height: 84vh;
  }
}
</style>
