<template>
  <Header_item />
  <ul class="nav nav-tabs nav-justified" id="user_info" role="tablist">
    <li class="nav-item mx-1" role="presentation">
      <a
        class="nav-link active"
        id="pills-proche-tab"
        data-mdb-toggle="pill"
        data-mdb-target="#pills-proche"
        type="button"
        role="tab"
        aria-controls="pills-proche"
        aria-selected="true"
      >
        Олиниши керак бўлган таъминотлар
      </a>
    </li>
    <li class="nav-item mx-1" role="presentation">
      <a
        class="nav-link"
        id="pills-smeta-tab"
        data-mdb-toggle="pill"
        data-mdb-target="#pills-smeta"
        type="button"
        role="tab"
        aria-controls="pills-smeta"
        aria-selected="false"
      >
        Олинган таъминотлар
      </a>
    </li>
  </ul>
  <div class="tab-content" id="user_infoContent">
    <div
      class="tab-pane fade show active"
      id="pills-proche"
      role="tabpanel"
      aria-labelledby="pills-proche-tab"
    >
      <div class="request" v-if="filter == 'proche'">
        <div class="row">
          <div class="col mt-1 d-flex align-items-center">
            <span
              class="d-none d-md-block d-sm-block d-lg-block d-xll-block mx-2"
              >Лимит</span
            >
            <select
              class="form-control form-control-sm form-select"
              v-model="p_limit"
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
                v-model="p_search"
                class="form-control form-control-sm"
              />
            </div>
          </div>
        </div>
        <div class="table-responsive mt-3">
          <table
            class="table table-sm table-hover"
            id="select_proche_request_data2"
          >
            <thead class="">
              <tr>
                <th style="width: 10%">№</th>
                <th style="width: 15%">Номи</th>
                <th style="width: 15%">Ҳажм</th>
                <th style="width: 10%">Ўлчов бирлиги</th>
                <th style="width: 10%">Сана</th>
                <th style="width: 15%">Изох</th>
                <th style="width: 15%">Объект</th>
                <th>
                  <select class="form-control form-control-sm" v-model="filter">
                    <option value="smeta">смета</option>
                    <option value="proche">проче</option>
                  </select>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, inc) in product_requests || []" :key="item">
                <td class="td_grafik">
                  {{ inc + 1 }}
                </td>
                <td>
                  {{ item.Proche_sorovlar.name }}
                </td>
                <td>
                  <Format_numbers :number="item.Proche_sorovlar.quantity" />
                  <span class="d-flex">
                    олинган ҳажм:
                    <Format_numbers
                      :number="
                        item.sum_supply_by_b_a_quantity +
                        item.sum_supply_quantity
                      "
                    />
                  </span>
                </td>
                <td>{{ item.Proche_sorovlar.olchov_birligi }}</td>
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
                <td>{{ item.Proche_sorovlar.comment }}</td>
                <td>{{ item.building }}</td>
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
            <li>
              <Select_data :id="'select_proche_request_data2'" />
            </li>
            <li class="page-item">
              <button
                type="button"
                class="page-link"
                @click="
                  get_proche_s(
                    p_page,
                    p_limit,
                    p_building_id,
                    p_status,
                    user_id,
                    p_search
                  )
                "
              >
                <i class="fa-solid fa-rotate"></i>
              </button>
            </li>
            <li class="page-item">
              <button
                class="page-link"
                @click="p_page--"
                :disabled="p_page == 0"
              >
                <i class="fa-solid fa-angle-left text-dark"></i>
              </button>
            </li>
            <li class="page-item">
              <button class="page-link text-dark" disabled>
                {{ p_page + 1 }}
              </button>
            </li>
            <li class="page-item">
              <button
                class="page-link"
                @click="p_page++"
                :disabled="p_page == p_pages"
              >
                <i class="fa-solid fa-angle-right text-dark"></i>
              </button>
            </li>
          </ul>
        </nav>
      </div>
      <div class="request" v-else>
        <div class="row">
          <div class="col mt-1 d-flex align-items-center">
            <span
              class="d-none d-md-block d-sm-block d-lg-block d-xll-block mx-2"
              >Лимит</span
            >
            <select
              class="form-control form-control-sm form-select"
              v-model="s_limit"
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
                v-model="s_search"
                class="form-control form-control-sm"
              />
            </div>
          </div>
        </div>
        <div class="table-responsive smeta mt-3">
          <table
            class="table table-sm table-hover"
            id="select_sm_request_data2"
          >
            <thead class="">
              <tr>
                <td style="width: 10%">№</td>
                <td style="width: 20%">Номи</td>
                <td style="width: 15%">Ўлчов бирлиги</td>
                <td style="width: 15%">Сана</td>
                <td style="width: 15%">Ҳажм</td>
                <td style="width: 15%">Объект</td>
                <td>
                  <select class="form-control form-control-sm" v-model="filter">
                    <option value="smeta">смета</option>
                    <option value="proche">проче</option>
                  </select>
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
                <td>
                  {{
                    new Date(item.grafik.start_date)
                      .toLocaleDateString({
                        year: "numeric",
                        month: "numeric",
                        day: "numeric",
                      })
                      .slice(0, 10) != "0000-00-00"
                      ? new Date(item.grafik.start_date)
                          .toLocaleDateString({
                            year: "numeric",
                            month: "numeric",
                            day: "numeric",
                          })
                          .slice(0, 10)
                      : ""
                  }}
                </td>
                <td>
                  <Format_numbers :number="item.Smeta.quantity" />
                  <span class="d-flex">
                    олинган ҳажм:
                    <Format_numbers
                      :number="
                        item.sum_supply_by_b_a_quantity +
                        item.sum_supply_quantity +
                        item.max_supply_from_composition
                      "
                    />
                  </span>
                </td>
                <td>{{ item.building }}</td>
                <td></td>
              </tr>
            </tbody>
          </table>
          <Data_notfound v-if="smeta == ''" />
        </div>

        <nav
          aria-label="Page navigation example"
          class="mt-2"
          v-if="smeta != ''"
        >
          <ul class="pagination pagination-sm justify-content-end mb-0">
            <li>
              <Select_data :id="'select_sm_request_data2'" />
            </li>
            <li class="page-item">
              <button
                type="button"
                class="page-link"
                @click="
                  get_smeta(
                    s_page,
                    s_limit,
                    s_search,
                    s_status,
                    s_building_id,
                    user_id
                  )
                "
              >
                <i class="fa-solid fa-rotate"></i>
              </button>
            </li>
            <li class="page-item">
              <button
                class="page-link"
                @click="s_page--"
                :disabled="s_page == 0"
              >
                <i class="fa-solid fa-angle-left text-dark"></i>
              </button>
            </li>
            <li class="page-item">
              <button class="page-link text-dark" disabled>
                {{ s_page + 1 }}
              </button>
            </li>
            <li class="page-item">
              <button
                class="page-link"
                @click="s_page++"
                :disabled="s_page == s_pages"
              >
                <i class="fa-solid fa-angle-right text-dark"></i>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <div
      class="tab-pane fade"
      id="pills-smeta"
      role="tabpanel"
      aria-labelledby="pills-smeta-tab"
    ></div>
  </div>
</template>

<script>
import Header_item from "@/components/header/header_item.vue";
import Format_numbers from "@/utils/format/format_numbers.vue";
import Data_notfound from "@/utils/notfound/data_notfound.vue";
import Select_data from "@/utils/select_data/select_data.vue";
import { proche_s_get, smeta_request_get } from "@/utils/request/request";
import { catchError } from "@/utils/request/handle_api_err";
export default {
  components: { Header_item, Format_numbers, Data_notfound, Select_data },
  name: "UserInfo",
  data() {
    return {
      p_limit: 25,
      p_page: 0,
      p_pages: null,
      product_requests: [],
      p_building_id: 0,
      user_id: this.$route.query.id,
      p_search: "",
      p_status: "taminotchida_proche",
      smeta: [],
      s_pages: null,
      s_limit: 25,
      s_page: 0,
      s_search: "",
      s_building_id: 0,
      s_status: "wait",
      filter: "proche",
    };
  },
  watch: {
    filter(e) {
      if (e == "smeta") {
        this.get_smeta(
          this.s_page,
          this.s_limit,
          this.s_search,
          this.s_status,
          this.s_building_id,
          this.user_id
        );
      } else {
        this.get_proche_s(
          this.p_page,
          this.p_limit,
          this.p_building_id,
          this.p_status,
          this.user_id,
          this.p_search
        );
      }
    },
    p_limit(e) {
      this.p_page = 0;
      this.get_proche_s(
        this.p_page,
        e,
        this.p_building_id,
        this.p_status,
        this.user_id,
        this.p_search
      );
    },
    p_page(e) {
      this.get_proche_s(
        e,
        this.p_limit,
        this.p_building_id,
        this.p_status,
        this.user_id,
        this.p_search
      );
    },
    p_search(e) {
      this.p_page = 0;
      this.get_proche_s(
        this.p_page,
        this.p_limit,
        this.p_building_id,
        this.p_status,
        this.user_id,
        e
      );
    },
    s_limit(e) {
      this.s_page = 0;
      this.get_smeta(
        this.s_page,
        e,
        this.s_search,
        this.s_status,
        this.s_building_id,
        this.user_id
      );
    },
    s_page(e) {
      this.get_smeta(
        e,
        this.limit,
        this.s_search,
        this.s_status,
        this.s_building_id,
        this.user_id
      );
    },
    s_search(e) {
      this.s_page = 0;
      if (e.length > 0) {
        this.get_smeta(
          this.s_page,
          this.limit,
          e,
          this.s_status,
          this.s_building_id,
          this.user_id
        );
      }
    },
  },
  methods: {
    get_proche_s(page, limit, building_id, status, user_id, search) {
      this.$store.dispatch("setLoading", { isLoading: true });

      proche_s_get(page, limit, building_id, status, user_id, search)
        .then((res) => {
          this.product_requests = res.data.data;
          this.p_pages = res.data.pages;
          this.$store.dispatch("setLoading", { isLoading: false });
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
        });
    },
    get_smeta(page, limit, search, status, building_id, user_id) {
      this.$store.dispatch("setLoading", { isLoading: true });
      smeta_request_get(page, limit, search, status, building_id, user_id)
        .then((res) => {
          this.smeta = res.data.data;
          this.s_pages = res.data.pages;
          this.$store.dispatch("setLoading", { isLoading: false });
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
        });
    },
  },
  created() {
    this.get_proche_s(
      this.p_page,
      this.p_limit,
      this.p_building_id,
      this.p_status,
      this.user_id,
      this.p_search
    );
  },
  computed: {
    filtering() {
      return this.quantities.filter((e) => {
        return e.Supplies.type != "shot_proche";
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.col select {
  width: 80px;
  height: 30px;
}

.col .input-group {
  width: 200px;
}

@media (max-width: 480px) {
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
.table-responsive {
  max-height: 62vh;
  min-height: 62vh;
}

@media (max-width: 500px) {
  .table-responsive {
    max-height: 80vh;
    min-height: 80vh;
  }
}
table {
  min-width: 1000px;
  width: 100%;
}
</style>
