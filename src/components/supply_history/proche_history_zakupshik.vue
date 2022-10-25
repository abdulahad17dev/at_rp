<template>
  <div class="table-responsive">
    <table class="table table-sm">
      <thead class="">
        <tr>
          <th style="width: 10%">№</th>
          <th style="width: 12%">Сана</th>
          <th style="width: 15%">Номи</th>
          <th style="width: 15%">Ҳажм</th>
          <th style="width: 15%">Ўлчов бирлиги</th>
          <th style="width: 20%">Изох</th>
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
            <select
              class="form-control form-control-sm form-select"
              v-model="status"
            >
              <option value="" selected>барчаси</option>
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
        <tr v-for="(item, inc) in product_requests || []" :key="item">
          <td>{{ inc + 1 }}</td>
          <td>
            <span v-if="item.Proche_sorovlar.time">
              {{
                new Date(item.Proche_sorovlar.time)
                  .toLocaleDateString("en-us", {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                  })
                  .slice(0, 10)
              }}
            </span>
          </td>
          <td>
            {{ item.Proche_sorovlar.name }}
          </td>
          <td>
            {{ new Intl.NumberFormat().format(item.Proche_sorovlar.quantity) }}
          </td>
          <td>
            {{ item.Proche_sorovlar.olchov_birligi }}
          </td>
          <td>
            {{ item.Proche_sorovlar.comment }}
          </td>
          <td></td>
          <td></td>
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
</template>

<script>
import Data_notfound from "@/utils/notfound/data_notfound.vue";
import { building_get, proche_s_get } from "@/utils/request/request";
import { catchError } from "@/utils/request/handle_api_err";
export default {
  name: "ProcheHistoryZakupshik",
  components: { Data_notfound },
  data() {
    return {
      limit: 25,
      page: 0,
      pages: null,
      product_requests: [],
      building_id: 0,
      status: "zakupshikda_proche",
      search: "",
      user_id: localStorage.getItem("user_id"),
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
    this.get_proche_s(
      this.page,
      this.limit,
      this.building_id,
      this.status,
      this.user_id,
      this.search
    );
  },
};
</script>

<style lang="scss" scoped>
th select {
  width: 170px;
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
}

.table-responsive {
  max-height: 77vh;
}

@media (max-width: 500px) {
  .table-responsive {
    max-height: 110vh;
  }
}

table {
  min-width: 1150px;
  width: 100%;
}
</style>
