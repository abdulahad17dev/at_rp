<template>
  <Header_item />
  <ul
    class="nav nav-pills nav-fill nav-justified mb-3"
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
        Таминот қабул қилиш
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
        @click="product_warehouse = true"
      >
        Омбордаги маҳсулотлар
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
      <div class="request">
        <form @submit.prevent="time">
          <div class="row">
            <div class="col">
              <input
                type="date"
                class="form-control form-control-sm"
                v-model="from_time"
                required
              />
            </div>
            <div class="col">
              <input
                type="date"
                class="form-control form-control-sm"
                v-model="to_time"
                required
              />
            </div>
            <div class="col">
              <div class="btn-group w-100">
                <button
                  class="btn btn-outline-primary btn-sm w-80"
                  :disabled="from_time == '' || to_time == ''"
                >
                  <i class="fa-solid fa-search"></i>
                </button>
                <button
                  class="btn btn-outline-danger btn-sm w-20"
                  @click="reset"
                  v-if="from_time && to_time"
                >
                  <i class="fa-solid fa-circle-xmark"></i>
                </button>
              </div>
            </div>
          </div>
          <div class="row my-1">
            <div class="col">
              <select class="form-select form-select-sm" v-model="type">
                <option disabled>сўров турини танланг</option>
                <option value="">барчаси</option>
                <option value="proche">проче</option>
                <option value="smeta">смета</option>
                <option value="tarkib">таркиб</option>
              </select>
            </div>
            <div class="col">
              <select class="form-select form-select-sm" v-model="status">
                <option value="">барчаси</option>
                <option value="true">қабул қилинди</option>
                <option value="false">қабул қилинмади</option>
              </select>
            </div>
            <div class="col">
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
            </div>
          </div>
        </form>
        <div class="table-responsive mt-3">
          <table class="table table-sm table-hover">
            <thead class="">
              <tr>
                <th style="width: 5%">№</th>
                <th style="width: 10%">Махсулот</th>
                <th style="width: 10%">Ҳажм</th>
                <th style="width: 10%">Ўлчов бирлиги</th>
                <th style="width: 10%">Сана</th>
                <th style="width: 10%">Объект</th>
                <th style="width: 10%">Таминотчи</th>
                <th style="width: 10%">Омборчи</th>
                <th style="width: 10%">Тури</th>
                <th style="width: 15%"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, inc) in requests || []" :key="item">
                <td>
                  {{ inc + 1 }}
                </td>
                <td>
                  {{
                    item.Supplies.type == "qarz_tarkib" ||
                    item.Supplies.type == "naxt_tarkib" ||
                    item.Supplies.type == "shot_tarkib"
                      ? item.product + ":" + item.Supplies.product_composition
                      : item.product
                  }}
                </td>
                <td>
                  <Format_numbers :number="item.Supplies.quantity" />
                </td>
                <td>{{ item.Supplies.olchov_birligi }}</td>
                <td>
                  {{
                    new Date(item.Supplies.time)
                      .toLocaleDateString({
                        year: "numeric",
                        month: "numeric",
                        day: "numeric",
                      })
                      .slice(0, 10)
                  }}
                </td>
                <td>
                  {{ item.building }}
                </td>
                <td>
                  {{ item.taminotchi }}
                </td>
                <td>
                  {{ item.Supplies.status == true ? item.warehouseman : "" }}
                </td>
                <td>
                  {{
                    item.Supplies.type == "shot_proche"
                      ? "проче"
                      : "" || item.Supplies.type == "naxt_proche"
                      ? "проче"
                      : "" || item.Supplies.type == "qarz_proche"
                      ? "проче"
                      : "" || item.Supplies.type == "shot_smeta"
                      ? "смета"
                      : "" || item.Supplies.type == "naxt_smeta"
                      ? "смета"
                      : "" || item.Supplies.type == "qarz_smeta"
                      ? "смета"
                      : "" || item.Supplies.type == "shot_tarkib"
                      ? "таркиб"
                      : "" || item.Supplies.type == "naxt_tarkib"
                      ? "таркиб"
                      : "" || item.Supplies.type == "qarz_tarkib"
                      ? "таркиб"
                      : ""
                  }}
                </td>
                <td>
                  <div class="input-group" v-if="item.Supplies.status == false">
                    <button
                      class="btn btn-outline-primary btn-sm"
                      @click="input(item.Supplies.id)"
                    >
                      <i class="fa-solid fa-upload"></i>
                    </button>
                    <input
                      type="text"
                      class="form-control form-control-sm"
                      style="cursor: auto !important"
                      :value="body.supply_id == item.Supplies.id ? text : ''"
                      readonly
                    />
                    <input
                      type="file"
                      accept="image/*"
                      :id="`input_file${item.Supplies.id}`"
                      ref="file"
                      @change="file(item.Supplies.id)"
                      hidden
                    />
                    <button
                      class="btn btn-sm btn-success mx-2 rounded-lg"
                      :disabled="item.Supplies.id !== body.supply_id"
                      @click="accept"
                      id="disabled_accept_btn"
                      v-if="item.Supplies.status == false"
                    >
                      <i class="fa-solid fa-circle-check"></i>
                    </button>
                  </div>
                  <button
                    v-else
                    class="btn btn-sm btn-danger rounded-lg"
                    id="disabled_remove_btn"
                    @click="remove(item.Supplies.id)"
                  >
                    <i class="fa-solid fa-rotate-left"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <Data_notfound v-if="requests == ''" />
        </div>

        <nav
          aria-label="Page navigation example"
          class="mt-2"
          v-if="requests != ''"
        >
          <ul class="pagination pagination-sm justify-content-end">
            <li class="page-item">
              <select
                class="form-control form-control-sm form-select mx-1"
                v-model="limit"
              >
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </li>
            <li class="page-item">
              <button
                type="button"
                class="page-link"
                @click="
                  get_supply(
                    market_id,
                    status,
                    paid_status,
                    building_id,
                    type,
                    from_time,
                    to_time,
                    page,
                    limit
                  )
                "
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
              <button
                class="page-link"
                @click="page++"
                :disabled="page == pages - 1"
              >
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
      </div>
    </div>
    <div
      class="tab-pane fade"
      id="pills-profile"
      role="tabpanel"
      aria-labelledby="pills-profile-tab"
    >
      <Product_in_warehouse v-if="product_warehouse" />
    </div>
  </div>
</template>

<script>
import {
  accept_supply,
  building_get,
  get_supplies,
  remove_supply_w,
} from "@/utils/request/request";
import { catchError, success } from "@/utils/request/handle_api_err";
import Header_item from "@/components/header/header_item.vue";
import Data_notfound from "@/utils/notfound/data_notfound.vue";
import Product_in_warehouse from "@/components/product/product_in_warehouse.vue";
import Format_numbers from "@/utils/format/format_numbers.vue";
export default {
  name: "SupplyInWarehouse",
  data() {
    return {
      requests: [],
      pages: null,
      market_id: 0,
      status: "",
      paid_status: "",
      building_id: 0,
      type: "",
      from_time: "",
      to_time: "",
      page: 0,
      limit: 25,
      body: {
        file: "",
        supply_id: null,
      },
      id: "",
      text: "",
      product_warehouse: false,
      page_building: 0,
      pages_building: null,
      limit_building: 25,
      search_building: "",
      buildings: [],
      text_building: "объектлар",
    };
  },
  watch: {
    type(e) {
      this.page = 0;
      this.get_supply(
        this.market_id,
        this.status,
        this.paid_status,
        this.building_id,
        e,
        this.from_time,
        this.to_time,
        this.page,
        this.limit
      );
    },
    building_id(e) {
      this.page = 0;
      this.get_supply(
        this.market_id,
        this.status,
        this.paid_status,
        e,
        this.type,
        this.from_time,
        this.to_time,
        this.page,
        this.limit
      );
    },
    status(e) {
      this.page = 0;
      this.get_supply(
        this.market_id,
        e,
        this.paid_status,
        this.building_id,
        this.type,
        this.from_time,
        this.to_time,
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
    get_supply(
      market_id,
      status,
      paid_status,
      building_id,
      type,
      from_time,
      to_time,
      page,
      limit
    ) {
      this.$store.dispatch("setLoading", { isLoading: true });
      get_supplies(
        market_id,
        status,
        paid_status,
        building_id,
        type,
        from_time,
        to_time,
        page,
        limit,
        0,
        ""
      )
        .then((res) => {
          this.requests = res.data.data;
          this.pages = res.data.pages;
          this.$store.dispatch("setLoading", { isLoading: false });
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
        });
    },
    time() {
      this.get_supply(
        this.market_id,
        this.status,
        this.paid_status,
        this.building_id,
        this.type,
        this.from_time,
        this.to_time,
        this.page,
        this.limit
      );
      this.page = 0;
    },
    reset() {
      this.from_time = "";
      this.to_time = "";
      this.get_supply(
        this.market_id,
        this.status,
        this.paid_status,
        this.building_id,
        this.type,
        this.from_time,
        this.to_time,
        this.page,
        this.limit
      );
      this.page = 0;
    },
    input(e) {
      this.text = "";
      this.body.file = "";
      document.querySelector(`#input_file${e}`).value = null;
      document.getElementById("input_file" + e).click();
    },
    file(e) {
      this.body.supply_id = e;
      this.body.file = document.querySelector(`#input_file${e}`).files[0];
      this.text = document.querySelector(`#input_file${e}`).files[0].name;
    },
    accept() {
      let data = new FormData();
      data.append("file", this.body.file);
      data.append("supply_id", this.body.supply_id);
      document.getElementById("disabled_accept_btn").disabled = true;
      this.$store.dispatch("setLoading", { isLoading: true });
      accept_supply(data)
        .then((res) => {
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("disabled_accept_btn").disabled = false;
          success(res).then(() => {
            this.get_supply(
              this.market_id,
              this.status,
              this.paid_status,
              this.building_id,
              this.type,
              this.from_time,
              this.to_time,
              this.page,
              this.limit
            );

            this.body.file = "";
            this.text = "";
          });
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("disabled_accept_btn").disabled = false;
        });
    },
    remove(e) {
      document.getElementById("disabled_remove_btn").disabled = true;
      this.$store.dispatch("setLoading", { isLoading: true });
      remove_supply_w(e)
        .then((res) => {
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("disabled_remove_btn").disabled = false;
          success(res).then(() => {
            this.get_supply(
              this.market_id,
              this.status,
              this.paid_status,
              this.building_id,
              this.type,
              this.from_time,
              this.to_time,
              this.page,
              this.limit
            );
          });
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("disabled_remove_btn").disabled = false;
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
  },
  created() {
    this.get_supply(
      this.market_id,
      this.status,
      this.paid_status,
      this.building_id,
      this.type,
      this.from_time,
      this.to_time,
      this.page,
      this.limit
    );
  },
  components: {
    Header_item,
    Data_notfound,
    Product_in_warehouse,
    Format_numbers,
  },
};
</script>

<style lang="scss" scoped>
.request {
  zoom: 75%;
}
.table-responsive {
  max-height: 84vh;
  min-height: 84vh;
}
.dropdown-menu {
  transform: translate3d(0px, 32.8px, 0px) !important;
}
@media (max-width: 500px) {
  .table-responsive {
    max-height: 124vh;
    min-height: 124vh;
  }
}
table {
  min-width: 1350px;
  width: 100%;
}
</style>
