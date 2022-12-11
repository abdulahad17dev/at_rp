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
        @click="supplies.length ? '' : get_supply()"
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
        <div class="table-responsive mt-3 supply">
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
    >
      <form @submit.prevent="time" class="mt-2">
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
          <div class="col-lg-3 col-md-6 col-sm-6 col-6 mt-1">
            <div class="dropdown">
              <button
                class="btn btn-light btn-sm dropdown-toggle"
                type="button"
                id="select_bank_market"
                data-mdb-toggle="dropdown"
                data-bs-auto-close="outside"
                aria-expanded="false"
                @click="
                  markets.length
                    ? ''
                    : get_markets(page_market, limit_market, search_market)
                "
              >
                {{ text_market }}
              </button>
              <ul
                class="dropdown-menu border-top-0"
                aria-labelledby="bank_market"
              >
                <li>
                  <input
                    type="search"
                    class="form-control form-control-sm"
                    placeholder="қидириш ..."
                    v-model="search_market"
                  />
                </li>
                <li>
                  <ul class="dropdown-items">
                    <li @click="select(0, 'барчаси', '')">
                      <a class="dropdown-item">барчаси</a>
                    </li>
                    <li
                      v-for="item in markets"
                      :key="item"
                      @click="
                        select(
                          item.Markets.id,
                          item.Markets.name,
                          item.Markets.phone
                        )
                      "
                    >
                      <a class="dropdown-item"
                        >{{ item.Markets.name }} ({{
                          "+998 " + item.Markets.phone
                        }})</a
                      >
                    </li>
                  </ul>
                </li>
                <li v-if="markets != ''">
                  <hr class="dropdown-divider m-0" />
                </li>
                <li>
                  <nav
                    aria-label="Page navigation example"
                    class="mt-2"
                    v-if="markets != ''"
                  >
                    <ul class="pagination pagination-sm justify-content-end">
                      <li class="page-item">
                        <button
                          type="button"
                          class="page-link"
                          @click="
                            get_markets(
                              page_market,
                              limit_market,
                              search_market
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
                          @click="page_market--"
                          :disabled="page_market == 0"
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
                          {{ page_market + 1 }}
                        </button>
                      </li>
                      <li class="page-item">
                        <button
                          type="button"
                          class="page-link"
                          @click="page_market++"
                          :disabled="page_market == pages_market"
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

          <div class="col-lg-3 col-md-6 col-sm-6 col-6 mt-1">
            <select
              class="form-select form-select-sm"
              v-model="paid_status"
              @change="
                page = 0;
                get_supply();
              "
            >
              <option value="">барчаси</option>
              <option value="true">тўланди</option>
              <option value="false">тўланмади</option>
            </select>
          </div>
          <div class="col-lg-3 col-md-6 col-sm-6 col-6 mt-1">
            <select
              class="form-select form-select-sm"
              v-model="status"
              @change="
                page = 0;
                get_supply();
              "
            >
              <option value="">барчаси</option>
              <option value="true">қабул қилинди</option>
              <option value="false">қабул қилинмади</option>
            </select>
          </div>
          <div class="col-lg-3 col-md-6 col-sm-6 col-6 mt-1">
            <div class="dropdown">
              <button
                class="btn btn-light btn-sm dropdown-toggle"
                type="button"
                id="select_bank_building_proche"
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
                    <li @click="select_building(0, 'барчаси')">
                      <a class="dropdown-item">барчаси</a>
                    </li>
                    <li
                      v-for="item in buildings"
                      :key="item"
                      @click="
                        select_building(item.Buildings.id, item.Buildings.name)
                      "
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
                          :disabled="page_building == pages_building"
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
      <div class="table-responsive smeta mt-3">
        <table class="table table-sm table-hover">
          <thead class="">
            <tr>
              <th style="width: 10%">№</th>
              <th style="width: 15%">Махсулот</th>
              <th style="width: 10%">Ҳажм</th>
              <th style="width: 10%">Ўлчов бирлиги</th>
              <th style="width: 10%">Сана</th>
              <th style="width: 10%">Сотувчи корхона</th>
              <th style="width: 10%">Объект</th>
              <th style="width: 15%">Сумма</th>
              <th style="width: 10%">
                <select
                  class="form-select form-select-sm"
                  v-model="type"
                  @change="
                    page = 0;
                    get_supply();
                  "
                >
                  <option value="">барчаси</option>
                  <option value="proche">проче</option>
                  <option value="smeta">смета</option>
                  <option value="tarkib">таркиб</option>
                </select>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, inc) in supplies || []" :key="item">
              <td>
                {{ inc + 1 }}
              </td>
              <td>{{ item.product }}</td>
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
                {{ item.market }}(<a
                  class="text-decoration-none text-dark"
                  :href="`tel:+998${item.market_phone}`"
                >
                  +998 {{ item.market_phone }} </a
                >)
              </td>
              <td>{{ item.building }}</td>
              <td>
                <Format_numbers :number="item.Supplies.price" />
                <span class="mx-1"> сўм </span>
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
        <Data_notfound v-if="supplies == ''" />
      </div>
      <nav
        aria-label="Page navigation example"
        class="mt-2"
        v-if="supplies != ''"
      >
        <ul class="pagination pagination-sm justify-content-end">
          <li class="page-item">
            <select
              class="form-control form-control-sm form-select mx-1"
              v-model="limit"
              @change="get_supply()"
            >
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </li>
          <li class="page-item">
            <button type="button" class="page-link" @click="get_supply()">
              <i class="fa-solid fa-rotate"></i>
            </button>
          </li>
          <li class="page-item">
            <button
              class="page-link"
              @click="page--, get_supply()"
              :disabled="page == 0"
            >
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
              @click="page++, get_supply()"
              :disabled="page == pages"
            >
              <i class="fa-solid fa-angle-right text-dark"></i>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import Header_item from "@/components/header/header_item.vue";
import Format_numbers from "@/utils/format/format_numbers.vue";
import Data_notfound from "@/utils/notfound/data_notfound.vue";
import Select_data from "@/utils/select_data/select_data.vue";
import {
  building_get,
  get_supplies,
  markets_get,
  proche_s_get,
  smeta_request_get,
} from "@/utils/request/request";
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
      market_id: 0,
      status: "",
      paid_status: "false",
      building_id: 0,
      type: "",
      from_time: "",
      to_time: "",
      page: 0,
      limit: 25,
      pages: null,
      supplies: [],
      text_market: "маҳсулот сотувчи",
      page_market: 0,
      pages_market: null,
      limit_market: 25,
      search_market: "",
      markets: [],
      page_building: 0,
      pages_building: null,
      limit_building: 25,
      search_building: "",
      buildings: [],
      text_building: "объектлар",
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
    limit_market(e) {
      this.page_market = 0;
      this.get_markets(this.page_market, e, this.search_market);
    },
    page_market(e) {
      this.get_markets(e, this.limit_market, this.search_market);
    },
    search_market(e) {
      this.page_market = 0;
      this.get_markets(this.page_market, this.limit_market, e);
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
      this.buildings_get(this.page_building, this.limit_building, e);
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
    get_supply() {
      this.$store.dispatch("setLoading", { isLoading: true });
      get_supplies(
        this.market_id,
        this.status,
        this.paid_status,
        this.building_id,
        this.type,
        this.from_time,
        this.to_time,
        this.page,
        this.limit,
        0,
        "",
        this.user_id
      )
        .then((res) => {
          res.data.data.forEach((element) => {
            if (element.Supplies.paid_status == false) {
              let num =
                element.Supplies.quantity * element.Supplies.price -
                element.sum_paid_money;
              element.total_price = num;
            }
          });

          this.supplies = res.data.data;
          this.pages = res.data.pages;
          this.$store.dispatch("setLoading", { isLoading: false });
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
        });
    },
    get_markets(page_market, limit_market, search_market) {
      this.$store.dispatch("setLoading", { isLoading: true });

      markets_get(page_market, limit_market, search_market)
        .then((res) => {
          this.markets = res.data.data;
          this.pages_market = res.data.pages;
          this.$store.dispatch("setLoading", { isLoading: false });
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
        });
    },
    select(id, name, phone) {
      this.market_id = id;
      this.page = 0;
      this.get_supply();
      if (phone) {
        this.text_market = name + " +998 " + phone;
        document.getElementById("select_bank_market").click();
      } else {
        this.text_market = name;
        document.getElementById("select_bank_market").click();
      }
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
    select_building(id, name) {
      this.building_id = id;
      this.page = 0;
      this.get_supply();
      this.text_building = name;
      document.getElementById("select_bank_building_proche").click();
    },
    time() {
      this.page = 0;
      this.get_supply();
    },
    reset() {
      this.from_time = "";
      this.to_time = "";
      this.page = 0;
      this.get_supply();
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
#pills-proche .table-responsive {
  max-height: 62vh;
  min-height: 62vh;
}

#pills-smeta .table-responsive {
  max-height: 57vh;
  min-height: 57vh;
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
