<template>
  <div class="request">
    <div class="table-responsive smeta mt-3">
      <table class="table table-sm table-hover">
        <thead class="">
          <tr>
            <td style="width: 8%">Т/р</td>
            <td style="width: 32%">Номи</td>
            <td style="width: 10%">Ўлчов бирлиги</td>
            <td style="width: 15%">Норма</td>
            <td style="width: 15%">Ҳажм</td>
            <td style="width: 10%">
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
            </td>
            <!-- <td style="width: 10%">
              <select class="form-select form-select-sm" v-model="status">
                <option value=" ">қаъбул қилинмаганлар</option>
                <option value="wait">қаъбул қилинганлар</option>
              </select>
            </td> -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, inc) in smeta" :key="item" class="product">
            <td
              class="td_grafik"
              data-bs-toggle="modal"
              data-bs-target="#smeta_grafik"
              @click="get_grafik(item)"
            >
              {{ inc + 1 }}
              <button class="btn btn-sm">
                <i
                  class="fa-solid fa-circle-question product"
                  style="font-size: 17px"
                ></i>
              </button>
            </td>
            <td>{{ item.product_name }}</td>
            <td>{{ item.product_olchov_birligi }}</td>
            <td>{{ item.Smeta.norm }}</td>
            <td>{{ item.Smeta.quantity }}</td>
            <td>
              <button
                class="btn btn-sm btn-success"
                @click="get_item(item.Smeta)"
                data-bs-toggle="modal"
                data-bs-target="#accept_smeta"
              >
                <i class="fa-solid fa-circle-check text-white"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <Data_notfound v-if="smeta == ''" />
    </div>

    <nav aria-label="Page navigation example" class="mt-2" v-if="smeta != ''">
      <ul class="pagination pagination-sm justify-content-end">
        <div class="page-item">
          <select
            class="form-control form-control-sm mx-2 form-select"
            v-model="limit"
          >
            <option value="100">100</option>
            <option value="500">500</option>
            <option value="1000">1000</option>
          </select>
        </div>
        <li class="page-item">
          <button
            type="button"
            class="page-link"
            @click="get_smeta(page, limit, search, status, building_id)"
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
            {{ product_name }} ни графиклиги
          </p>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="table-responsive">
            <table class="table table-sm table-hover">
              <tbody style="font-size: 12px">
                <tr>
                  <td scope="col">Номи</td>
                  <td>{{ item.name }}</td>
                </tr>
                <tr>
                  <td scope="col">Ҳажм</td>
                  <td>{{ item.quantity }} {{ item.olchov_birligi }}</td>
                </tr>
                <tr>
                  <td scope="col">ШНК</td>
                  <td>{{ item.shnk }}</td>
                </tr>
                <tr>
                  <td scope="col">Нарх</td>
                  <td>{{ item.allotted_price }} сўм</td>
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
                        .toLocaleDateString("en-us", {
                          year: "numeric",
                          month: "numeric",
                          day: "numeric",
                          hour: "numeric",
                          minute: "numeric",
                          hour12: false,
                        })
                        .slice(0, 16)
                    }}
                  </td>
                </tr>
                <tr>
                  <td scope="col">Тугаш санаси</td>
                  <td>
                    {{
                      new Date(item.end_date)
                        .toLocaleDateString("en-us", {
                          year: "numeric",
                          month: "numeric",
                          day: "numeric",
                          hour: "numeric",
                          minute: "numeric",
                          hour12: false,
                        })
                        .slice(0, 16)
                    }}
                  </td>
                </tr>
                <tr>
                  <td scope="col">Норма</td>
                  <td>{{ item.norm }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal -->
  <div
    class="modal fade"
    id="accept_smeta"
    tabindex="-1"
    aria-labelledby="accept_smetaLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="accept_smetaLabel">
            {{ smeta_name }}ни қабул қилиш
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            id="supply_take"
          ></button>
        </div>
        <form @submit.prevent="take">
          <div class="modal-body">
            <div class="row gap-2">
              <div class="col-10 mx-auto">
                <label for="quantity"> Ҳажм: </label>
                <input
                  type="number"
                  id="quantity"
                  class="form-control form-control-sm"
                  v-model="body[0].quantity"
                  placeholder="Ҳажм"
                  min="1"
                  required
                />
              </div>
              <div class="col-10 mx-auto">
                <label for="price">
                  Нарх:
                  <span class="text-primary"
                    >{{
                      new Intl.NumberFormat().format(body[0].price)
                    }}
                    сўм</span
                  ></label
                >
                <div class="input-group input-group-sm">
                  <input
                    id="price"
                    type="number"
                    step="any"
                    class="form-control"
                    v-model="body[0].price"
                    min="1"
                    placeholder="Нарх"
                    required
                  />
                  <span class="input-group-text bg-white">сўм</span>
                </div>
              </div>
              <div class="col-10 mx-auto">
                <label for="market_phone"> Телефон рақам: </label>
                <div class="input-group input-group-sm">
                  <span class="input-group-text bg-white">+998</span>
                  <input
                    type="tel"
                    id="market_phone"
                    class="form-control form-control-sm"
                    v-model="body[0].market_phone"
                    required
                    placeholder="Телефон рақам"
                    maxlength="9"
                    minlength="9"
                    @keypress="onlyNumber"
                  />
                </div>
              </div>
              <div class="col-10 mx-auto">
                <label for="type"> Статус: </label>
                <select
                  id="type"
                  class="form-control form-control-sm"
                  v-model="body[0].type"
                  required
                >
                  <option value="naxt_proche">нахт проче</option>
                  <option value="qarz_proche">қарз проче</option>
                  <option value="shot_proche">счёт проче</option>
                </select>
              </div>
              <div class="col-10 mx-auto">
                <label for="map_long"> Узунлик: </label>
                <input
                  type="text"
                  id="map_long"
                  class="form-control form-control-sm"
                  v-model="body[0].map_long"
                  required
                  placeholder="Узунлик"
                />
              </div>
              <div class="col-10 mx-auto">
                <label for="map_lat"> Кенглик: </label>
                <input
                  type="text"
                  id="map_lat"
                  class="form-control form-control-sm"
                  v-model="body[0].map_lat"
                  required
                  placeholder="Кенглик"
                />
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="submit"
              class="btn btn-outline-primary btn-sm"
              id="supply_s_disabled"
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
import { building_get, smeta_request_get } from "@/utils/request/request";
import { catchError, position_err } from "@/utils/request/handle_api_err";
import Data_notfound from "@/utils/notfound/data_notfound.vue";
export default {
  name: "Sm_request",
  data() {
    return {
      smeta: [],
      pages: null,
      limit: 100,
      page: 0,
      search: "",
      building_id: 0,
      status: "wait",
      item: {},
      product_name: "",
      page_building: 0,
      pages_building: null,
      limit_building: 25,
      search_building: "",
      buildings: [],
      text_building: "объектлар",
      body: [
        {
          related_id: null,
          product_composition: "",
          sup_by_b_a_id: 0,
          quantity: null,
          price: null,
          market_phone: null,
          type: "",
          map_long: "",
          map_lat: "",
          building_id: null,
        },
      ],
      smeta_name: "",
    };
  },
  watch: {
    limit(e) {
      this.page = 0;
      this.get_smeta(this.page, e, this.search, this.status, this.building_id);
    },
    page(e) {
      this.get_smeta(e, this.limit, this.search, this.status, this.building_id);
      document.getElementById("scroll").scrollTop = 0;
    },
    search(e) {
      this.page = 0;
      if (e.length > 0) {
        this.get_smeta(
          this.page,
          this.limit,
          this.search,
          this.status,
          this.building_id
        );
      } else if (e.length == 0) {
        this.get_smeta(
          this.page,
          this.limit,
          this.search,
          this.status,
          this.building_id
        );
        this.page = 0;
      }
    },
    status(e) {
      this.page = 0;
      this.get_smeta(this.page, this.limit, this.search, e, this.building_id);
      document.getElementById("scroll").scrollTop = 0;
    },
    building_id(e) {
      this.page = 0;
      this.get_smeta(this.page, this.limit, this.search, this.status, e);
      document.getElementById("scroll").scrollTop = 0;
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
    get_smeta(page, limit, search, status, building_id) {
      this.$store.dispatch("setLoading", { isLoading: true });
      smeta_request_get(page, limit, search, status, building_id)
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
    get_item(e) {
      console.log(e);
      this.body[0].map_lat = "";
      this.body[0].map_long = "";
      const success = (position) => {
        this.body[0].map_lat = position.coords.latitude;
        this.body[0].map_long = position.coords.longitude;
      };

      const error = (err) => {
        position_err(err);
      };

      navigator.geolocation.getCurrentPosition(success, error);
      // this.proche_name = e.Smeta.name;
      // this.body[0].building_id = e.Smeta.building_id;
      // this.body[0].related_id = e.Smeta.id;
    },
    onlyNumber($event) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
        $event.preventDefault();
      }
    },
  },
  created() {
    this.get_smeta(
      this.page,
      this.limit,
      this.search,
      this.status,
      this.building_id
    );
  },
  components: { Data_notfound },
};
</script>

<style lang="scss" scoped>
.smeta table {
  min-width: 1180px;
  width: 100%;
}

.table-responsive.smeta {
  max-height: 92vh;
  min-height: 92vh;
}

.request {
  zoom: 75%;
}

@media (max-width: 500px) {
  .table-responsive {
    max-height: 124vh;
    min-height: 124vh;
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
</style>
