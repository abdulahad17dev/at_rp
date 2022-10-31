<template>
  <Header_item />

  <ul
    class="nav nav-pills nav-fill nav-jusitified mb-3"
    id="pills-tab"
    role="tablist"
  >
    <li class="nav-item d-flex mx-1" role="presentation">
      <button
        class="btn btn-sm btn-light shadow-sm w-100"
        id="pills-home-tab"
        data-bs-toggle="pill"
        data-bs-target="#pills-home"
        type="button"
        role="tab"
        aria-controls="pills-home"
        aria-selected="true"
        @click="
          product_requests.length
            ? ''
            : get_proche_s(page, limit, building_id, status, user_id, search)
        "
      >
        Проче сўровлар
      </button>
      <button
        class="btn btn-sm btn-light shadow-sm"
        id="pills-homee-tab"
        data-bs-toggle="pill"
        data-bs-target="#pills-homee"
        type="button"
        role="tab"
        aria-controls="pills-homee"
        aria-selected="true"
        @click="proche_history = true"
      >
        <i class="fa-solid fa-clock-rotate-left"></i>
      </button>
    </li>
    <li class="nav-item d-flex mx-1" role="presentation">
      <button
        class="btn btn-sm btn-light shadow-sm w-100"
        id="pills-profile-tab"
        data-bs-toggle="pill"
        data-bs-target="#pills-profile"
        type="button"
        role="tab"
        aria-controls="pills-profile"
        aria-selected="false"
        @click="smeta = true"
      >
        Сметалар
      </button>
      <button
        class="btn btn-sm btn-light shadow-sm"
        id="pills-profilee-tab"
        data-bs-toggle="pill"
        data-bs-target="#pills-profilee"
        type="button"
        role="tab"
        aria-controls="pills-profilee"
        aria-selected="false"
        @click="smeta_history = true"
      >
        <i class="fa-solid fa-clock-rotate-left"></i>
      </button>
    </li>
  </ul>
  <div class="tab-content" id="pills-tabContent">
    <div
      class="tab-pane fade"
      id="pills-home"
      role="tabpanel"
      aria-labelledby="pills-home-tab"
    >
      <div class="table-responsive">
        <table class="table table-sm table-hover">
          <thead class="">
            <tr>
              <th style="width: 7%">№</th>
              <th style="width: 15%">Номи</th>
              <th style="width: 15%">Ҳажм</th>
              <th style="width: 15%">Ўлчов бирлиги</th>
              <th style="width: 15%">Сана</th>
              <th style="width: 15%">Изох</th>
              <th style="width: 8%">
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
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, inc) in product_requests" :key="item">
              <td>{{ inc + 1 }}</td>
              <td>
                {{ item.Proche_sorovlar.name }}
              </td>
              <td>
                <Format_numbers :number="item.Proche_sorovlar.quantity" />
              </td>
              <td>
                {{ item.Proche_sorovlar.olchov_birligi }}
              </td>
              <td>
                {{
                  new Date(item.Proche_sorovlar.time)
                    .toLocaleDateString({
                      year: "numeric",
                      month: "numeric",
                      day: "numeric",
                    })
                    .slice(0, 10)
                }}
              </td>
              <td>
                {{ item.Proche_sorovlar.comment }}
              </td>
              <td>{{ item.building }}</td>
              <td>
                <button
                  class="btn btn-sm btn-success"
                  @click="
                    select_item(
                      item.Proche_sorovlar.id,
                      item.Proche_sorovlar.name
                    )
                  "
                  data-bs-toggle="modal"
                  data-bs-target="#accept_request"
                >
                  <i class="fa-solid fa-circle-check text-white"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <Data_notfound v-if="product_requests == ''" />
      </div>

      <nav
        aria-label="Page navigation example"
        class="mt-2"
        v-if="product_requests != ''"
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
                get_proche_s(page, limit, building_id, status, user_id, search)
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

      <Accept_request :item="item" @accept_request="accept_request" />
    </div>
    <div
      class="tab-pane fade"
      id="pills-homee"
      role="tabpanel"
      aria-labelledby="pills-homee-tab"
    >
      <Proche_history_zakupshik v-if="proche_history" />
    </div>
    <div
      class="tab-pane fade"
      id="pills-profile"
      role="tabpanel"
      aria-labelledby="pills-profile-tab"
    >
      <Smeta_zakupshik v-if="smeta" />
    </div>
    <div
      class="tab-pane fade"
      id="pills-profilee"
      role="tabpanel"
      aria-labelledby="pills-profilee-tab"
    >
      <Smeta_history_zakupshik v-if="smeta_history" />
    </div>
  </div>
</template>

<script>
import Header_item from "@/components/header/header_item.vue";
import {
  building_get,
  proche_s_get,
  proche_s_put,
} from "@/utils/request/request";
import Data_notfound from "@/utils/notfound/data_notfound.vue";
import { catchError, success } from "@/utils/request/handle_api_err";
import Accept_request from "@/components/buildings/accept_request.vue";
import Smeta_zakupshik from "@/components/smeta/smeta_zakupshik.vue";
import Smeta_history_zakupshik from "@/components/supply_history/smeta_history_zakupshik.vue";
import Proche_history_zakupshik from "@/components/supply_history/proche_history_zakupshik.vue";
export default {
  name: "ProcheSorovZakupshik",
  data() {
    return {
      limit: 25,
      page: 0,
      pages: null,
      product_requests: [],
      building_id: 0,
      user_id: 0,
      search: "",
      status: "zakupshikda_proche",
      item: {},
      page_building: 0,
      pages_building: null,
      limit_building: 25,
      search_building: "",
      buildings: [],
      text_building: "объектлар",
      smeta: false,
      smeta_history: false,
      proche_history: false,
    };
  },
  watch: {
    limit(e) {
      this.page = 0;
      this.get_proche_s(
        this.page,
        e,
        this.building_id,
        this.status,
        this.user_id,
        this.search
      );
    },
    page(e) {
      this.get_proche_s(
        e,
        this.limit,
        this.building_id,
        this.status,
        this.user_id,
        this.search
      );
      document.getElementById("scroll").scrollTop = 0;
    },
    building_id(e) {
      this.page = 0;
      this.get_proche_s(
        this.page,
        this.limit,
        e,
        this.status,
        this.user_id,
        this.search
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
    get_proche_s(page, limit, building_id, status, user_id, search) {
      this.$store.dispatch("setLoading", { isLoading: true });

      proche_s_get(page, limit, building_id, status, user_id, search)
        .then((res) => {
          this.product_requests = res.data.data;
          this.pages = res.data.pages;
          this.$store.dispatch("setLoading", { isLoading: false });
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
        });
    },
    select_item(id, name) {
      this.item = {
        id: id,
        name: name,
      };
    },
    accept_request(e, data) {
      document.getElementById(`accept_request_disabled`).disabled = true;
      this.$store.dispatch("setLoading", { isLoading: true });
      proche_s_put(e.proche_sorov_id, e.status, e.taminotchi_id, data)
        .then((res) => {
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById(`accpet_request_close`).click();
          document.getElementById(`accept_request_disabled`).disabled = false;
          success(res).then(() => {
            this.get_proche_s(
              this.page,
              this.limit,
              this.building_id,
              this.status,
              this.user_id,
              this.search
            );
          });
          e.taminotchi_id = null;
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
          e.taminotchi_id = null;
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
  components: {
    Header_item,
    Data_notfound,
    Accept_request,
    Smeta_zakupshik,
    Smeta_history_zakupshik,
    Proche_history_zakupshik,
  },
};
</script>

<style lang="scss" scoped>
.table-responsive {
  max-height: 70vh;
  min-height: 70vh;
}

@media (max-width: 500px) {
  .table-responsive {
    max-height: 100vh;
    min-height: 100vh;
  }
}
table {
  min-width: 1150px;
  width: 100%;
}
</style>
