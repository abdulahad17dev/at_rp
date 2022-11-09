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
        Сметадаги материаллар
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
      <div class="row">
        <div class="col mt-1 d-flex align-items-center">
          <span class="d-none d-md-block d-sm-block d-lg-block d-xll-block mx-2"
            >Лимит</span
          >
          <select
            class="form-control form-control-sm form-select"
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
      <div class="table-responsive mt-2">
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
              <th>
                <select class="form-select form-select-sm" v-model="status">
                  <option value="zakupshikda_proche">закупшикда</option>
                  <option value="taminotchida_proche">таминотчида</option>
                  <option value="taminotchida_proche_qabul_qilindi">
                    қабул қилинди
                  </option>
                  <option value="rejected_proche">руҳсат этилмаган</option>
                </select>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, inc) in product_requests" :key="item">
              <td class="td_grafik">
                {{ inc + 1 }}
                <button
                  class="btn btn-sm"
                  data-bs-toggle="modal"
                  data-bs-target="#users"
                  @click="users = item"
                >
                  <i
                    class="fa-solid fa-circle-question product"
                    style="font-size: 17px"
                  ></i>
                </button>
              </td>
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
                  v-if="item.Proche_sorovlar.status == 'zakupshikda_proche'"
                  data-bs-toggle="modal"
                  data-bs-target="#accept_request"
                >
                  <i class="fa-solid fa-circle-check text-white"></i>
                </button>

                <button
                  class="btn btn-sm btn-danger"
                  @click="remove(item.Proche_sorovlar.id)"
                  v-if="item.Proche_sorovlar.status == 'taminotchida_proche'"
                  :id="item.Proche_sorovlar.id"
                >
                  <i class="fa-solid fa-circle-xmark text-white"></i>
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
      id="pills-profile"
      role="tabpanel"
      aria-labelledby="pills-profile-tab"
    >
      <Smeta_zakupshik v-if="smeta" />
    </div>
  </div>

  <!-- Modal -->
  <div
    class="modal fade"
    id="users"
    tabindex="-1"
    aria-labelledby="users_label"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="users_label">Ҳодимлар</h5>
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
                  <td scope="col">Прорап :</td>
                  <td>{{ users.prorap }}</td>
                </tr>
                <tr>
                  <td scope="col">Оператор :</td>
                  <td>{{ users.operator }}</td>
                </tr>
                <tr>
                  <td scope="col">Админ :</td>
                  <td>{{ users.admin }}</td>
                </tr>
                <tr>
                  <td scope="col">Закупшик :</td>
                  <td>{{ users.zakuvshik }}</td>
                </tr>
                <tr>
                  <td scope="col">Таминотчи :</td>
                  <td>{{ users.taminotchi }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
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
import Format_numbers from "@/utils/format/format_numbers.vue";
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
      body: {
        name: "string",
        quantity: 0,
        olchov_birligi: "string",
        comment: "string",
        building_id: 0,
      },
      users: {},
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
    search(e) {
      this.page = 0;
      this.get_proche_s(
        this.page,
        this.limit,
        this.building_id,
        this.status,
        this.user_id,
        e
      );
    },
    status(e) {
      this.page = 0;
      this.get_proche_s(
        this.page,
        this.limit,
        this.building_id,
        e,
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
      this.buildings_get(this.page_building, this.limit_building, e);
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
    remove(e) {
      document.getElementById(e).disabled = true;
      this.$store.dispatch("setLoading", { isLoading: true });
      proche_s_put(e, "false", 0, this.body)
        .then((res) => {
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById(e).disabled = false;
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
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById(e).disabled = false;
        });
    },
  },
  components: {
    Header_item,
    Data_notfound,
    Accept_request,
    Smeta_zakupshik,
    Format_numbers,
  },
};
</script>

<style lang="scss" scoped>
#pills-home .table-responsive {
  max-height: 64vh;
  min-height: 64vh;
}

@media (max-width: 500px) {
  #pills-home .table-responsive {
    max-height: 94vh;
    min-height: 94vh;
  }
}
#pills-home table {
  min-width: 1150px;
  width: 100%;
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
