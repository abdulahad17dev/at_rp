<template>
  <div class="table-responsive smeta mt-3">
    <table class="table table-sm table-hover">
      <thead>
        <tr>
          <td style="width: 8%">№</td>
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
          <td style="width: 10%">
            <select class="form-select form-select-sm" v-model="status">
              <option value=" ">қаъбул қилинмаганлар</option>
              <option value="wait">қаъбул қилинганлар</option>
            </select>
          </td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, inc) in smeta" :key="item" class="product">
          <td
            v-if="item.Smeta"
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
          <td v-if="item.Smeta">{{ item.product_name }}</td>
          <td v-if="item.Smeta">{{ item.product_olchov_birligi }}</td>
          <td v-if="item.Smeta">{{ item.Smeta.norm }}</td>
          <td v-if="item.Smeta">
            {{ new Intl.NumberFormat().format(item.Smeta.quantity) }}
          </td>
          <td v-if="item.Smeta"></td>
          <td v-if="item.Smeta">
            <button
              class="btn btn-sm btn-success"
              @click="select_item(item.Smeta.id, item.product_name)"
              data-bs-toggle="modal"
              data-bs-target="#accept_request_smeta"
              v-if="status == ' '"
            >
              <i class="fa-solid fa-circle-check text-white"></i>
            </button>
            <button
              class="btn btn-sm btn-danger"
              @click="remove(item.Smeta.id)"
              v-if="status == 'wait'"
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

  <nav aria-label="Page navigation example" class="mt-2" v-if="smeta != ''">
    <ul class="pagination pagination-sm justify-content-end">
      <div class="page-item">
        <select
          class="form-control form-control-sm mx-2 form-select"
          v-model="limit"
        >
          <option value="100">100</option>
          <option value="250">250</option>
          <option value="500">500</option>
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
                  <td>
                    {{ new Intl.NumberFormat().format(item.quantity) }}
                    {{ item.olchov_birligi }}
                  </td>
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
export default {
  name: "SmetaZakupshik",
  data() {
    return {
      smeta: [],
      pages: null,
      limit: 100,
      page: 0,
      search: "",
      building_id: 0,
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
    select_item(id, name) {
      this.smeta_item = {
        smeta_id: id,
        smeta_name: name,
      };
    },
    accept_request(e) {
      document.getElementById(`accept_request_smeta_disabled`).disabled = true;
      this.$store.dispatch("setLoading", { isLoading: true });
      accept_smeta_request(e)
        .then((res) => {
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById(`accpet_request_smeta_close`).click();
          document.getElementById(
            `accept_request_smeta_disabled`
          ).disabled = false;
          success(res).then(() => {
            this.get_smeta(
              this.page,
              this.limit,
              this.search,
              this.status,
              this.building_id
            );
          });
          e.taminotchi_id = null;
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
          success(res).then(() => {
            this.get_smeta(
              this.page,
              this.limit,
              this.search,
              this.status,
              this.building_id
            );
            document.getElementById(e).disabled = false;
          });
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
  components: { Data_notfound, Accept_smeta_request },
};
</script>

<style lang="scss" scoped>
.smeta table {
  min-width: 1150px;
  width: 100%;
  zoom: 75%;
}

.smeta {
  max-height: 70vh;
  min-height: 70vh;
}

@media (max-width: 500px) {
  .smeta {
    max-height: 100vh;
    min-height: 100vh;
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
