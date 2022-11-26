<template>
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
          <div class="dropdown">
            <button
              class="btn btn-light btn-sm dropdown-toggle"
              type="button"
              id="select_bank_market3"
              data-bs-toggle="dropdown"
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
                  <li @click="select(0, 'барчаси')">
                    <a class="dropdown-item">барчаси</a>
                  </li>
                  <li
                    v-for="item in markets"
                    :key="item"
                    @click="select(item.Markets.id, item.Markets.name)"
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
                          get_markets(page_market, limit_market, search_market)
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
                        :disabled="page_market == pages_market - 1"
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
        <div class="col">
          <select class="form-select form-select-sm" v-model="paid_status">
            <option value="">барчаси</option>
            <option value="true">тўланди</option>
            <option value="false">тўланмади</option>
          </select>
        </div>
        <div class="col">
          <div class="dropdown">
            <button
              class="btn btn-light btn-sm dropdown-toggle"
              type="button"
              id="select_bank_building_shot"
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
            <th style="width: 10%">№</th>
            <th style="width: 20%">Махсулот</th>
            <th style="width: 15%">Ҳажм</th>
            <th style="width: 10%">Ўлчов бирлиги</th>
            <th style="width: 10%">Сана</th>
            <th style="width: 10%">Сумма</th>
            <th style="width: 10%">Объект</th>
            <th>Сотувчи корхона</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, inc) in requests || []" :key="item">
            <td class="td_grafik">
              {{ inc + 1 }}
              <button
                class="btn btn-sm"
                @click="
                  get_quantity(
                    item.Supplies_by_bank_account.related_id,
                    item.Supplies_by_bank_account.id,
                    item.Supplies_by_bank_account.type
                  );
                  name = item.product;
                "
                data-bs-toggle="modal"
                data-bs-target="#shot_modal"
              >
                <i
                  class="fa-solid fa-circle-question product"
                  style="font-size: 17px"
                ></i>
              </button>
            </td>
            <td>{{ item.product }}</td>
            <td>
              <Format_numbers
                :number="item.Supplies_by_bank_account.quantity"
              />
            </td>
            <td>
              {{ item.Supplies_by_bank_account.olchov_birligi }}
            </td>
            <td>
              {{
                new Date(item.Supplies_by_bank_account.time)
                  .toLocaleDateString({
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                  })
                  .slice(0, 10)
              }}
            </td>
            <td>
              <span class="d-flex">
                <Format_numbers
                  :number="item.Supplies_by_bank_account.total_price"
                />
                <span class="mx-1"> сўм </span>
              </span>
            </td>
            <td>{{ item.building }}</td>
            <td>
              {{ item.market }}(<a
                class="text-decoration-none text-dark"
                :href="`tel:+998${item.market_phone}`"
              >
                +998 {{ item.market_phone }} </a
              >)
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
  <!-- Modal -->
  <div
    class="modal fade"
    id="shot_modal"
    tabindex="-1"
    aria-labelledby="shot_modal_label"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <p class="modal-title" id="shot_modal_label">{{ name }}</p>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <ul
            class="nav nav-pills nav-fill nav-justified mb-3"
            id="pills-tab"
            role="tablist"
          >
            <li class="nav-item mx-1" role="presentation">
              <button
                class="btn btn-sm btn-light w-100 active"
                id="pills-home-quantity2-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-home-quantity2"
                type="button"
                role="tab"
                aria-controls="pills-home-quantity2"
                aria-selected="true"
              >
                Таъминотлар тарихи
              </button>
            </li>
            <li class="nav-item mx-1" role="presentation">
              <button
                class="btn btn-sm btn-light w-100"
                id="pills-profile-sh-quantity2-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-profile-sh-quantity2"
                type="button"
                role="tab"
                aria-controls="pills-profile-sh-quantity2"
                aria-selected="false"
              >
                Тўловлар тарихи
              </button>
            </li>
          </ul>
          <div class="tab-content" id="pills-tabContent">
            <div
              class="tab-pane fade show active"
              id="pills-home-quantity2"
              role="tabpanel"
              aria-labelledby="pills-home-quantity2-tab"
            >
              <div class="table-responsive">
                <table class="table table-sm table-hover">
                  <thead>
                    <tr>
                      <th style="width: 10%">Т/р</th>
                      <th style="width: 15%">Ҳажм</th>
                      <th style="width: 20%">Ўлчов бирлиги</th>
                      <th style="width: 15%">Сана</th>
                      <th style="width: 20%">Маҳсулот сотувчи корхона</th>
                      <th>
                        <select
                          class="form-select form-select-sm"
                          v-model="m_status"
                        >
                          <option value="">барчаси</option>
                          <option value="true">қабул қилинди</option>
                          <option value="false">қабул қилинмади</option>
                        </select>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, inc) in quantities" :key="item">
                      <td>{{ inc + 1 }}</td>
                      <td>{{ item.Supplies.quantity }}</td>
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
                      <td>
                        <button
                          class="btn btn-sm btn-danger mx-1"
                          v-if="item.Supplies.status == false"
                          @click="remove_s(item.Supplies.id)"
                          id="remove_suppliess"
                        >
                          <i class="fa-solid fa-circle-xmark"></i>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <Data_notfound v-if="!quantities.length" />
              </div>

              <nav
                aria-label="Page navigation example"
                class="mt-2"
                v-if="quantities.length"
              >
                <ul class="pagination pagination-sm justify-content-end">
                  <li class="page-item">
                    <select
                      class="form-control form-control-sm form-select mx-1"
                      v-model="quantity_limit"
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
                      @click="get_quantity(related_id, id, quantity_type)"
                    >
                      <i class="fa-solid fa-rotate"></i>
                    </button>
                  </li>
                  <li class="page-item">
                    <button
                      class="page-link"
                      @click="quantity_page = 0"
                      :disabled="quantity_page == 0"
                    >
                      <i class="fa-solid fa-angles-left text-dark"></i>
                    </button>
                  </li>
                  <li class="page-item">
                    <button
                      class="page-link"
                      @click="quantity_page--"
                      :disabled="quantity_page == 0"
                    >
                      <i class="fa-solid fa-angle-left text-dark"></i>
                    </button>
                  </li>
                  <li class="page-item">
                    <button class="page-link text-dark" disabled>
                      {{ quantity_page + 1 }}
                    </button>
                  </li>
                  <li class="page-item">
                    <button
                      class="page-link"
                      @click="quantity_page++"
                      :disabled="quantity_page == quantity_pages - 1"
                    >
                      <i class="fa-solid fa-angle-right text-dark"></i>
                    </button>
                  </li>
                  <li class="page-item">
                    <button
                      class="page-link"
                      @click="quantity_page = quantity_pages - 1"
                      :disabled="quantity_page == quantity_pages - 1"
                    >
                      <i class="fa-solid fa-angles-right text-dark"></i>
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
            <div
              class="tab-pane fade"
              id="pills-profile-sh-quantity2"
              role="tabpanel"
              aria-labelledby="pills-profile-sh-quantity2-tab"
            >
              <div class="table-responsive">
                <table class="table table-sm table-hover">
                  <thead>
                    <tr>
                      <th style="width: 10%">Т/р</th>
                      <th style="width: 20%">Сумма</th>
                      <th style="width: 20%">Сана</th>
                      <th style="width: 20%">Ходим</th>
                      <th style="width: 20%">Ҳисоб рақам</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, inc) in paid_moneys" :key="item">
                      <td>{{ inc + 1 }}</td>
                      <td>
                        {{ Intl.NumberFormat().format(item.Expenses.money) }}
                        сўм
                      </td>
                      <td>
                        {{
                          new Date(item.Expenses.time)
                            .toLocaleDateString({
                              year: "numeric",
                              month: "numeric",
                              day: "numeric",
                            })
                            .slice(0, 10)
                        }}
                      </td>
                      <td>{{ item.user }}</td>
                      <td>
                        {{
                          item.Expenses.type == "market_expense_shot_supply" ||
                          item.Expenses.type == "market_expense_shot"
                            ? item.Bank_accounts.name
                            : ""
                        }}
                      </td>
                      <td>
                        <button
                          class="btn btn-sm btn-danger"
                          v-if="
                            item.Expenses.type == 'market_expense_naxt' &&
                            item.Supplies.type == 'qarz_proche'
                          "
                          @click="remove_paid_m(item.Expenses.id)"
                          id="remove_paid_money"
                        >
                          <i class="fa-solid fa-circle-xmark"></i>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <Data_notfound v-if="!paid_moneys.length" />
              </div>

              <nav
                aria-label="Page navigation example"
                class="mt-2"
                v-if="paid_moneys.length"
              >
                <ul class="pagination pagination-sm justify-content-end">
                  <li class="page-item">
                    <select
                      class="form-control form-control-sm form-select mx-1"
                      v-model="m_limit"
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
                      @click="get_paid_moneys(id)"
                    >
                      <i class="fa-solid fa-rotate"></i>
                    </button>
                  </li>
                  <li class="page-item">
                    <button
                      class="page-link"
                      @click="m_page = 0"
                      :disabled="m_page == 0"
                    >
                      <i class="fa-solid fa-angles-left text-dark"></i>
                    </button>
                  </li>
                  <li class="page-item">
                    <button
                      class="page-link"
                      @click="m_page--"
                      :disabled="m_page == 0"
                    >
                      <i class="fa-solid fa-angle-left text-dark"></i>
                    </button>
                  </li>
                  <li class="page-item">
                    <button class="page-link text-dark" disabled>
                      {{ m_page + 1 }}
                    </button>
                  </li>
                  <li class="page-item">
                    <button
                      class="page-link"
                      @click="m_page++"
                      :disabled="m_page == m_pages - 1"
                    >
                      <i class="fa-solid fa-angle-right text-dark"></i>
                    </button>
                  </li>
                  <li class="page-item">
                    <button
                      class="page-link"
                      @click="m_page = m_pages - 1"
                      :disabled="m_page == m_pages - 1"
                    >
                      <i class="fa-solid fa-angles-right text-dark"></i>
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Data_notfound from "@/utils/notfound/data_notfound.vue";
import {
  building_get,
  get_market_expenses,
  get_supplies,
  markets_get,
  remove_supply,
  shot_request,
} from "@/utils/request/request";
import { catchError, success } from "@/utils/request/handle_api_err";
import Format_numbers from "@/utils/format/format_numbers.vue";
export default {
  name: "ShotHistory",
  data() {
    return {
      requests: [],
      pages: null,
      market_id: 0,
      status: "true",
      paid_status: "",
      building_id: 0,
      type: "shot",
      from_time: "",
      to_time: "",
      page: 0,
      limit: 25,
      text_market: "маҳсулот сотувчи",
      page_market: 0,
      pages_market: null,
      limit_market: 25,
      search_market: "",
      markets: [],
      name: "",
      id: null,
      related_id: null,
      quantity_pages: null,
      quantity_page: 0,
      quantity_type: "",
      quantity_limit: 25,
      quantities: [],
      m_pages: null,
      m_page: 0,
      m_limit: 25,
      m_status: "",
      m_type: "market_expense_shot",
      paid_moneys: [],
      page_building: 0,
      pages_building: null,
      limit_building: 25,
      search_building: "",
      buildings: [],
      text_building: "объектлар",
    };
  },
  watch: {
    page(e) {
      this.page = 0;
      this.get_supply(
        this.market_id,
        this.status,
        this.paid_status,
        this.building_id,
        this.type,
        this.from_time,
        this.to_time,
        e,
        this.limit
      );
    },
    limit(e) {
      this.page = 0;
      this.get_supply(
        this.market_id,
        this.status,
        this.paid_status,
        this.building_id,
        this.type,
        this.from_time,
        this.to_time,
        this.page,
        e
      );
    },
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
    paid_status(e) {
      this.page = 0;
      this.get_supply(
        this.market_id,
        this.status,
        e,
        this.building_id,
        this.type,
        this.from_time,
        this.to_time,
        this.page,
        this.limit
      );
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
    market_id(e) {
      this.page = 0;
      this.get_supply(
        e,
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
    d_limit() {
      this.d_page = 0;
      this.get_dates(this.id);
    },
    d_page() {
      this.get_dates(this.id);
    },

    quantity_limit() {
      this.quantity_page = 0;
      this.get_quantity(this.related_id, this.id, this.quantity_type);
    },
    quantity_page() {
      this.get_quantity(this.related_id, this.id, this.quantity_type);
    },
    m_limit() {
      this.m_page = 0;
      this.get_paid_moneys(this.id);
    },
    m_status() {
      this.m_page = 0;
      this.get_quantity(this.related_id, this.id, this.quantity_type);
    },
    m_page() {
      this.get_paid_moneys(this.id);
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
      shot_request(
        market_id,
        status,
        paid_status,
        building_id,
        type,
        from_time,
        to_time,
        page,
        limit,
        0
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
    select(id, name) {
      this.market_id = id;
      this.text_market = name;
      document.getElementById("select_bank_market3").click();
    },
    get_quantity(related_id, id, type) {
      this.related_id = related_id;
      this.id = id;
      this.$store.dispatch("setLoading", { isLoading: true });
      get_supplies(
        0,
        this.m_status,
        "",
        0,
        "shot_" + type,
        "",
        "",
        this.quantity_page,
        this.quantity_limit,
        related_id,
        ""
      )
        .then((res) => {
          this.quantity_pages = res.data.pages;
          this.quantities = res.data.data;
          this.get_paid_moneys(id);
          this.$store.dispatch("setLoading", { isLoading: false });
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
        });
    },
    get_paid_moneys(e) {
      this.$store.dispatch("setLoading", { isLoading: true });
      get_market_expenses(0, 0, e, 0, this.m_type, this.m_page, this.m_limit)
        .then((res) => {
          this.m_pages = res.data.pages;
          this.paid_moneys = res.data.data;
          this.$store.dispatch("setLoading", { isLoading: false });
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
        });
    },
    remove_s(e) {
      document.getElementById("remove_suppliess").disabled = true;
      this.$store.dispatch("setLoading", { isLoading: true });
      remove_supply(e)
        .then((res) => {
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("remove_suppliess").disabled = false;
          success(res);
          this.get_quantity(this.related_id, this.id, this.quantity_type);
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
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("remove_suppliess").disabled = false;
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
    select_building(id, name) {
      this.building_id = id;
      this.text_building = name;
      document.getElementById("select_bank_building_shot").click();
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
  components: { Data_notfound, Format_numbers },
};
</script>

<style lang="scss" scoped>
.request {
  zoom: 75%;
}
.mt-3.table-responsive {
  max-height: 83vh;
  min-height: 83vh;
}

@media (max-width: 500px) {
  .mt-3.table-responsive {
    max-height: 110vh;
    min-height: 110vh;
  }
  .modal-body .table-responsive {
    max-height: 79vh;
    min-height: 79vh;
  }
}
.mt-3 table {
  min-width: 1150px;
  width: 100%;
}

.modal-body .table-responsive {
  max-height: 67vh;
  min-height: 67vh;
}

.modal-body .table-responsive table {
  min-width: 900px;
  width: 100%;
  zoom: 75%;
}

.dropdown-menu {
  transform: translate3d(0px, 32.8px, 0px) !important;
}
</style>
