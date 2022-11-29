<template>
  <div class="row">
    <div class="col mt-1 d-flex align-items-center">
      <span class="d-none d-md-block d-sm-block d-lg-block d-xll-block mx-2"
        >Лимит</span
      >
      <select class="form-control form-control-sm form-select" v-model="limit">
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

  <div class="table-responsive smeta mt-2">
    <table class="table table-sm table-hover">
      <thead>
        <tr>
          <td style="width: 10%">
            <input
              class="form-check-input"
              type="checkbox"
              v-model="checkAll"
              v-if="smeta.length && status == ' '"
            />
            №
          </td>
          <td style="width: 20%">Номи</td>
          <td style="width: 20%">Ўлчов бирлиги</td>
          <td style="width: 20%">Ҳажм</td>
          <th style="width: 10%">Бошланиш санаси</th>
          <td style="width: 10%">
            <div class="dropdown">
              <button
                class="btn btn-light btn-sm dropdown-toggle"
                type="button"
                id="select_bank_building"
                data-mdb-toggle="dropdown"
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
                    <li @click="select(0, 'барчаси')">
                      <a class="dropdown-item">барчаси</a>
                    </li>
                    <li
                      v-for="item in buildings"
                      :key="item"
                      @click="select(item.Buildings.id, item.Buildings.name)"
                    >
                      <a class="dropdown-item">{{ item.Buildings.name }}</a>
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
          </td>
          <td style="width: 10%">
            <select class="form-select form-select-sm" v-model="status">
              <option value=" ">бириктирилмаган</option>
              <option value="wait">бириктирилган</option>
            </select>
          </td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, inc) in smeta" :key="item" class="product">
          <td class="td_grafik">
            <input
              class="form-check-input"
              type="checkbox"
              :value="{ id: item.Smeta.id }"
              v-model="checked"
              v-if="status == ' '"
            />
            {{ inc + 1 }}
            <span
              class="fa-solid fa-circle product rounded-circle"
              style="font-size: 17px"
              :class="
                date < item.grafik.start_date &&
                date_sort(item.grafik.start_date) > 5
                  ? 'bg-success text-success'
                  : date < item.grafik.start_date &&
                    date_sort(item.grafik.start_date) <= 5 &&
                    date_sort(item.grafik.start_date) >= 3
                  ? 'bg-warning text-warning'
                  : 'bg-danger text-danger'
              "
            >
            </span>
            <button
              class="btn btn-sm"
              data-mdb-toggle="modal"
              data-mdb-target="#smeta_grafik"
              @click="
                get_grafik(item);
                sum_supply_by_b_a_quantity = item.sum_supply_by_b_a_quantity;
                sum_supply_quantity = item.sum_supply_quantity;
                product_olchov_birligi = item.product_olchov_birligi;
              "
            >
              <i
                class="fa-solid fa-circle-question product"
                style="font-size: 17px"
              ></i>
            </button>
          </td>
          <td>{{ item.product_name }}</td>
          <td>{{ item.product_olchov_birligi }}</td>
          <td>
            <Format_numbers :number="item.Smeta.quantity" />
          </td>
          <td>
            {{
              new Date(item.grafik.start_date)
                .toLocaleDateString({
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                })
                .slice(0, 10)
            }}
          </td>
          <td>{{ item.building }}</td>
          <td>
            <button
              class="btn btn-sm btn-success"
              @click="select_item(item.Smeta.id, item.product_name)"
              data-mdb-toggle="modal"
              data-mdb-target="#accept_request_smeta"
              v-if="status == ' ' && !checked.length"
            >
              <i class="fa-solid fa-circle-check text-white"></i>
            </button>
            <button
              class="btn btn-sm btn-danger"
              @click="remove(item.Smeta.id)"
              v-if="
                status == 'wait' &&
                item.sum_supply_by_b_a_quantity + item.sum_supply_quantity == 0
              "
              :id="item.Smeta.id"
            >
              <i class="fa-solid fa-circle-xmark text-white"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <Data_notfound v-if="smeta == ''" />
  </div>

  <div class="row mt-2" v-if="checked.length">
    <div class="col-12">
      <button
        class="btn btn-sm btn-outline-success w-100"
        style="padding: 2px !important"
        id="accept_proche"
        data-mdb-toggle="modal"
        data-mdb-target="#accept_request_smeta"
      >
        <i class="fa-solid fa-circle-check"></i> бириктириш
      </button>
    </div>
  </div>

  <nav aria-label="Page navigation example" class="mt-2" v-if="smeta != ''">
    <ul class="pagination pagination-sm justify-content-end">
      <li class="page-item">
        <button
          type="button"
          class="page-link"
          @click="get_smeta(page, limit, search, status, building_id, user_id)"
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
  <div
    class="modal fade"
    id="smeta_grafik"
    tabindex="-1"
    aria-labelledby="smeta_grafik_labek"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <p class="modal-title" id="smeta_grafik_labek">
            {{ product_name }}
          </p>
          <button
            type="button"
            class="btn-close"
            data-mdb-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <ul
            class="nav nav-tabs nav-justified nav-fill mb-3"
            id="pills-tab"
            role="tablist"
          >
            <li class="nav-item mx-1" role="presentation">
              <a
                class="nav-link active"
                id="pills-homme-tab"
                data-mdb-toggle="pill"
                data-mdb-target="#pills-homme"
                type="button"
                role="tab"
                aria-controls="pills-homme"
                aria-selected="true"
              >
                График
              </a>
            </li>
            <li
              class="nav-item mx-1"
              role="presentation"
              v-if="sum_supply_by_b_a_quantity + sum_supply_quantity != 0"
            >
              <a
                class="nav-link"
                id="pills-profille-tab"
                data-mdb-toggle="pill"
                data-mdb-target="#pills-profille"
                type="button"
                role="tab"
                aria-controls="pills-profille"
                aria-selected="false"
              >
                Олинган ҳажм
              </a>
            </li>
          </ul>
          <div class="tab-content" id="pills-tabContent">
            <div
              class="tab-pane fade show active"
              id="pills-homme"
              role="tabpanel"
              aria-labelledby="pills-homme-tab"
            >
              <div class="table-responsive">
                <table class="table table-sm table-hover">
                  <tbody style="font-size: 12px">
                    <tr>
                      <td scope="col">ШНК</td>
                      <td>{{ item.shnk }}</td>
                    </tr>
                    <tr>
                      <td scope="col">Номи</td>
                      <td>{{ item.name }}</td>
                    </tr>
                    <tr>
                      <td scope="col">Муддат</td>
                      <td>{{ item.muddat }}</td>
                    </tr>
                    <tr>
                      <td scope="col">Бошланиш санаси</td>
                      <td>
                        {{
                          new Date(item.start_date)
                            .toLocaleDateString({
                              year: "numeric",
                              month: "numeric",
                              day: "numeric",
                            })
                            .slice(0, 10)
                        }}
                      </td>
                    </tr>
                    <tr>
                      <td scope="col">Тугаш санаси</td>
                      <td>
                        {{
                          new Date(item.end_date)
                            .toLocaleDateString({
                              year: "numeric",
                              month: "numeric",
                              day: "numeric",
                            })
                            .slice(0, 10)
                        }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div
              class="tab-pane fade"
              id="pills-profille"
              role="tabpanel"
              aria-labelledby="pills-profille-tab"
              v-if="sum_supply_by_b_a_quantity + sum_supply_quantity != 0"
            >
              <h6>
                <b>Олинган ҳажм: </b>
                {{ sum_supply_by_b_a_quantity + sum_supply_quantity }}
                {{ product_olchov_birligi }}
              </h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <Accept_smeta_request
    :smeta_item="smeta_item"
    @accept_request="accept_request"
  />
</template>

<script>
import {
  accept_smeta_request,
  building_get,
  remove_smeta_request,
  smeta_request_get,
} from "@/utils/request/request";
import { catchError, success } from "@/utils/request/handle_api_err";
import Data_notfound from "@/utils/notfound/data_notfound.vue";
import Accept_smeta_request from "./accept_smeta_request.vue";
import Format_numbers from "@/utils/format/format_numbers.vue";
export default {
  name: "SmetaZakupshik",
  data() {
    return {
      smeta: [],
      pages: null,
      limit: 25,
      page: 0,
      search: "",
      building_id: 0,
      user_id: 0,
      status: " ",
      item: {},
      product_name: "",
      smeta_item: {},
      page_building: 0,
      pages_building: null,
      limit_building: 25,
      search_building: "",
      buildings: [],
      text_building: "объектлар",
      sum_supply_by_b_a_quantity: null,
      sum_supply_quantity: null,
      product_olchov_birligi: "",
      date: new Date().toISOString().slice(0, 10),
      body: {
        id: null,
      },
      checked: [],
    };
  },
  watch: {
    limit(e) {
      this.checked = [];
      this.page = 0;
      this.get_smeta(
        this.page,
        e,
        this.search,
        this.status,
        this.building_id,
        this.user_id
      );
    },
    page(e) {
      this.checked = [];
      this.get_smeta(
        e,
        this.limit,
        this.search,
        this.status,
        this.building_id,
        this.user_id
      );
    },
    search(e) {
      this.checked = [];
      this.page = 0;
      this.get_smeta(
        this.page,
        this.limit,
        e,
        this.status,
        this.building_id,
        this.user_id
      );
    },
    status(e) {
      this.checked = [];
      this.page = 0;
      this.get_smeta(
        this.page,
        this.limit,
        this.search,
        e,
        this.building_id,
        this.user_id
      );
    },
    building_id(e) {
      this.checked = [];
      this.page = 0;
      this.get_smeta(
        this.page,
        this.limit,
        this.search,
        this.status,
        e,
        this.user_id
      );
    },
    limit_building(e) {
      this.page_building = 0;
      this.buildings_get(this.page_building, e, this.search_building);
    },
    page_building(e) {
      this.buildings_get(e, this.limit_building, this.search_building);
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
    get_smeta(page, limit, search, status, building_id, user_id) {
      this.$store.dispatch("setLoading", { isLoading: true });
      smeta_request_get(page, limit, search, status, building_id, user_id)
        .then((res) => {
          this.smeta = res.data.data;
          this.pages = res.data.pages;
          this.$store.dispatch("setLoading", { isLoading: false });
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
        });
    },
    get_grafik(item) {
      this.item = item.grafik;
      this.product_name = item.product_name;
    },
    select_item(id, name) {
      this.smeta_item = {
        smeta_id: id,
        smeta_name: name,
      };
      this.body.id = id;
    },
    accept_request(e) {
      document.getElementById(`accept_request_smeta_disabled`).disabled = true;
      this.$store.dispatch("setLoading", { isLoading: true });
      accept_smeta_request(
        e,
        this.checked.length ? this.checked : Array(this.body)
      )
        .then((res) => {
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById(`accpet_request_smeta_close`).click();
          document.getElementById(
            `accept_request_smeta_disabled`
          ).disabled = false;
          success(res);
          this.get_smeta(
            this.page,
            this.limit,
            this.search,
            this.status,
            this.building_id,
            this.user_id
          );
          e = null;
          this.checked = [];
          document.getElementById("request_text_smeta").innerHTML =
            "таминотчилар";
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById(
            `accept_request_smeta_disabled`
          ).disabled = false;
        });
    },
    remove(e) {
      document.getElementById(e).disabled = true;
      this.$store.dispatch("setLoading", { isLoading: true });
      remove_smeta_request(e)
        .then((res) => {
          this.$store.dispatch("setLoading", { isLoading: false });
          success(res);
          this.get_smeta(
            this.page,
            this.limit,
            this.search,
            this.status,
            this.building_id,
            this.user_id
          );
          document.getElementById(e).disabled = false;
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById(e).disabled = false;
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
      document.getElementById("select_bank_building").click();
    },
    date_sort(e) {
      let date1 = new Date(e);
      let date2 = new Date(this.date);

      const diffTime = Math.abs(date1 - date2);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      return Number(diffDays);
    },
  },
  created() {
    this.get_smeta(
      this.page,
      this.limit,
      this.search,
      this.status,
      this.building_id,
      this.user_id
    );
  },
  components: { Data_notfound, Accept_smeta_request, Format_numbers },
  computed: {
    checkAll: {
      get: function () {
        return this.smeta ? this.checked.length == this.smeta.length : false;
      },
      set: function (value) {
        var checked = [];
        if (value) {
          this.smeta.forEach(function (requests) {
            checked.push({ id: requests.Smeta.id });
          });
        }
        this.checked = checked;
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.smeta table {
  min-width: 1150px;
  width: 100%;
  zoom: 75%;
}

.smeta {
  max-height: 62vh;
  min-height: 62vh;
}

@media (max-width: 500px) {
  .smeta {
    max-height: 92vh;
    min-height: 92vh;
  }
}

td.td_grafik {
  cursor: pointer;
}

.td_grafik button:focus {
  box-shadow: none;
}

.dropdown-menu {
  transform: translate3d(0px, 32.8px, 0px) !important;
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
</style>
