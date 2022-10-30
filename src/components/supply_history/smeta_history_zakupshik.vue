<template>
  <div class="">
    <div class="request">
      <div class="table-responsive smeta mt-3">
        <table class="table table-sm table-hover">
          <thead class="">
            <tr>
              <td style="width: 10%">№</td>
              <td style="width: 25%">Номи</td>
              <td style="width: 15%">Ўлчов бирлиги</td>
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
              </td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, inc) in smeta" :key="item" class="product">
              <td class="td_grafik">
                {{ inc + 1 }}
              </td>
              <td>{{ item.product_name }}</td>
              <td>{{ item.product_olchov_birligi }}</td>
              <td>{{ item.Smeta.norm }}</td>
              <td>
                <Format_numbers :number="item.Smeta.quantity" />
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
        <Data_notfound v-if="smeta == ''" />
      </div>

      <nav aria-label="Page navigation example" class="mt-2" v-if="smeta != ''">
        <ul class="pagination pagination-sm justify-content-end mb-0">
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
                get_smeta(page, limit, search, status, building_id, user_id)
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
</template>

<script>
import { building_get, smeta_request_get } from "@/utils/request/request";
import { catchError } from "@/utils/request/handle_api_err";
import Data_notfound from "@/utils/notfound/data_notfound.vue";
import Format_numbers from "@/utils/format/format_numbers.vue";
export default {
  name: "SmetaHistoryZakupshik",
  data() {
    return {
      smeta: [],
      pages: null,
      limit: 25,
      page: 0,
      search: "",
      building_id: 0,
      user_id: 0,
      status: "wait",
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
      this.get_smeta(
        e,
        this.limit,
        this.search,
        this.status,
        this.building_id,
        this.user_id
      );
      document.getElementById("scroll").scrollTop = 0;
    },
    search(e) {
      this.page = 0;
      if (e.length > 0) {
        this.get_smeta(
          this.page,
          this.limit,
          e,
          this.status,
          this.building_id,
          this.user_id
        );
      } else if (e.length == 0) {
        this.remove_check = false;
        this.get_smeta(
          this.page,
          this.limit,
          e,
          this.status,
          this.building_id,
          this.user_id
        );
        this.page = 0;
      }
    },
    status(e) {
      this.page = 0;
      this.get_smeta(
        this.page,
        this.limit,
        this.search,
        e,
        this.building_id,
        this.user_id
      );
      document.getElementById("scroll").scrollTop = 0;
    },
    building_id(e) {
      this.page = 0;
      this.get_smeta(
        this.page,
        this.limit,
        this.search,
        this.status,
        e,
        this.user_id
      );
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
      this.building_id,
      this.user_id
    );
  },
  components: { Data_notfound, Format_numbers },
};
</script>

<style lang="scss" scoped>
table {
  min-width: 1180px;
  width: 100%;
}

.table-responsive {
  max-height: 97vh;
}

.request {
  zoom: 75%;
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

@media (max-width: 500px) {
  .table-responsive {
    max-height: 125vh;
  }
}
</style>
