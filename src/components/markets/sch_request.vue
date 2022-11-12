<template>
  <div class="request">
    <div class="table-responsive mt-3">
      <table class="table table-sm table-hover">
        <thead class="">
          <tr>
            <th style="width: 7%">№</th>
            <th style="width: 15%">Махсулот</th>
            <th style="width: 15%">Ҳажм</th>
            <th style="width: 15%">Ўлчов бирлиги</th>
            <th style="width: 15%">Сана</th>
            <th style="width: 15%">Жами сумма</th>
            <th style="width: 8%">
              <select class="form-select form-select-sm" v-model="type">
                <option value="">барчаси</option>
                <option value="proche">проче</option>
                <option value="smeta">смета</option>
                <option value="tarkib">таркиб</option>
              </select>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, inc) in shot_requests || []" :key="item">
            <td class="td_grafik">
              {{ inc + 1 }}
              <span
                class="fa-solid fa-circle product rounded-circle"
                style="font-size: 17px"
                :class="
                  date < item.Supplies_by_bank_account.time &&
                  date_sort(item.Supplies_by_bank_account.time) > 5
                    ? 'bg-success text-success'
                    : date < item.Supplies_by_bank_account.time &&
                      date_sort(item.Supplies_by_bank_account.time) <= 5 &&
                      date_sort(item.Supplies_by_bank_account.time) >= 3
                    ? 'bg-warning text-warning'
                    : 'bg-danger text-danger'
                "
              >
              </span>
              <button
                class="btn btn-sm"
                data-bs-toggle="modal"
                data-bs-target="#get_quantity_shot"
                @click="
                  get_quantity(
                    item.Supplies_by_bank_account.related_id,
                    item.Supplies_by_bank_account.id
                  );
                  name = item.product;
                "
              >
                <i
                  class="fa-solid fa-circle-question product"
                  style="font-size: 17px"
                ></i>
              </button>
            </td>
            <td>
              {{
                item.Supplies_by_bank_account.type == "tarkib"
                  ? item.product +
                    ":" +
                    item.Supplies_by_bank_account.product_composition
                  : item.product
              }}
            </td>
            <td>
              <Format_numbers
                :number="item.Supplies_by_bank_account.quantity"
              />
              <span class="d-flex">
                олинган ҳажм:
                <Format_numbers :number="item.sum_supply_quantity" />
              </span>
            </td>
            <td>{{ item.Supplies_by_bank_account.olchov_birligi }}</td>
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
            <td>
              <button
                class="btn btn-sm btn-success"
                @click="get_item(item.Supplies_by_bank_account)"
                data-bs-toggle="modal"
                data-bs-target="#accept_shot_request"
              >
                <i class="fa-solid fa-circle-check text-white"></i>
              </button>
              <button
                class="btn btn-sm btn-danger mx-1"
                v-if="item.Supplies_by_bank_account.status == false"
                @click="remove(item.Supplies_by_bank_account.id)"
                id="remove_supply_smetaa"
              >
                <i class="fa-solid fa-circle-xmark"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <Data_notfound v-if="shot_requests == ''" />
    </div>

    <nav
      aria-label="Page navigation example"
      class="mt-2"
      v-if="shot_requests != ''"
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
              get_shot_r(
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
    id="accept_shot_request"
    tabindex="-1"
    aria-labelledby="accept_shot_requestLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="accept_shot_requestLabel">қабул қилиш</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            id="supply__take_shot"
          ></button>
        </div>
        <form @submit.prevent="take">
          <div class="modal-body">
            <div class="row gap-2">
              <div class="col-10 mx-auto">
                <label for="quantity"> Ҳажм: ({{ quantity }})</label>
                <div class="input-group input-group-sm">
                  <input
                    type="number"
                    id="quantity"
                    class="form-control form-control-sm"
                    v-model="body.quantity"
                    placeholder="Ҳажм"
                    step="any"
                    min="0"
                    :max="quantity"
                    required
                  />
                  <span class="input-group-text bg-white">{{ olchov }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="submit"
              class="btn btn-outline-primary btn-sm"
              id="supply_disabled_shot"
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

  <!-- Modal -->
  <div
    class="modal fade"
    id="get_quantity_shot"
    tabindex="-1"
    aria-labelledby="get_quantity_shot_label"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <p class="modal-title" id="get_quantity_shot_label">{{ name }}</p>
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
                          id="remove_suppliesss"
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
                      @click="get_quantity(related_id, id)"
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
import {
  get_market_expenses,
  get_supplies,
  remove_supply,
  remove_supply_by_b_a,
  shot_request,
  take_supply_b_a,
} from "@/utils/request/request";
import {
  catchError,
  position_err,
  success,
} from "@/utils/request/handle_api_err";
import Data_notfound from "@/utils/notfound/data_notfound.vue";
import Format_numbers from "@/utils/format/format_numbers.vue";
export default {
  name: "ShotRequest",
  data() {
    return {
      shot_requests: [],
      pages: null,
      market_id: 0,
      status: "false",
      paid_status: "",
      building_id: 0,
      type: "",
      from_time: "",
      to_time: "",
      page: 0,
      limit: 25,
      body: {
        related_id: 0,
        product_composition: "",
        sup_by_b_a_id: 0,
        quantity: 0,
        price: 0,
        market_phone: 0,
        type: "",
        didox_link: "",
        map_long: "",
        map_lat: "",
        building_id: 0,
      },
      quantity: "",
      id: null,
      related_id: null,
      quantity_pages: null,
      quantity_page: 0,
      quantity_limit: 25,
      quantities: [],
      name: "",
      m_pages: null,
      m_page: 0,
      m_limit: 25,
      m_status: "",
      paid_moneys: [],
      olchov: "",

      date: new Date().toISOString().slice(0, 10),
    };
  },
  watch: {
    limit(e) {
      this.page = 0;
      this.get_shot_r(
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
    page(e) {
      this.get_shot_r(
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
    type(e) {
      this.page = 0;
      this.get_shot_r(
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
    quantity_limit() {
      this.quantity_page = 0;
      this.get_quantity(this.related_id, this.id);
    },
    quantity_page() {
      this.get_quantity(this.related_id, this.id);
    },
    m_limit() {
      this.m_page = 0;
      this.get_paid_moneys(this.id);
    },
    m_status() {
      this.m_page = 0;
      this.get_quantity(this.related_id, this.id);
    },
    m_page() {
      this.get_paid_moneys(this.id);
    },
  },
  methods: {
    get_shot_r(
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
          this.shot_requests = res.data.data;
          this.pages = res.data.pages;
          this.$store.dispatch("setLoading", { isLoading: false });
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
        });
    },
    get_item(e) {
      this.olchov = e.olchov_birligi;
      this.body = {
        related_id: e.related_id,
        product_composition: e.product_composition,
        sup_by_b_a_id: e.id,
        quantity: null,
        price: 0,
        market_phone: 0,
        type: e.type,
        didox_link: "",
        map_long: "",
        map_lat: "",
        building_id: e.building_id,
      };

      const success = (position) => {
        this.body.map_lat = position.coords.latitude;
        this.body.map_long = position.coords.longitude;
      };

      const error = (err) => {
        position_err(err);
        this.body.map_lat = 0;
        this.body.map_long = 0;
      };

      navigator.geolocation.getCurrentPosition(success, error);
      this.quantity = e.quantity;
    },
    take() {
      this.$store.dispatch("setLoading", { isLoading: true });
      document.getElementById("supply_disabled_shot").disabled = true;
      take_supply_b_a(this.body)
        .then((res) => {
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("supply__take_shot").click();
          document.getElementById("supply_disabled_shot").disabled = false;
          success(res).then(() => {
            this.get_shot_r(
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

            this.body = {
              related_id: null,
              product_composition: "",
              sup_by_b_a_id: 0,
              quantity: null,
              price: null,
              market_phone: null,
              type: "",
              didox_link: "",
              map_long: "",
              map_lat: "",
              building_id: null,
            };
          });
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("supply_disabled_shot").disabled = false;
        });
    },
    remove(e) {
      document.getElementById("remove_supply_smetaa").disabled = true;
      this.$store.dispatch("setLoading", { isLoading: true });
      remove_supply_by_b_a(e)
        .then((res) => {
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("remove_supply_smetaa").disabled = false;
          success(res).then(() => {
            this.get_shot_r(
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
          document.getElementById("remove_supply_smetaa").disabled = false;
        });
    },
    get_quantity(related_id, id) {
      this.related_id = related_id;
      this.id = id;
      this.$store.dispatch("setLoading", { isLoading: true });
      get_supplies(
        0,
        this.m_status,
        "",
        0,
        "shot",
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
      get_market_expenses(0, 0, e, 0, "", this.m_page, this.m_limit)
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
      document.getElementById("remove_suppliesss").disabled = true;
      this.$store.dispatch("setLoading", { isLoading: true });
      remove_supply(e)
        .then((res) => {
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("remove_suppliesss").disabled = false;
          success(res).then(() => {
            this.get_quantity(this.related_id, this.id);
            this.get_shot_r(
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
          document.getElementById("remove_suppliesss").disabled = false;
        });
    },
    date_sort(e) {
      let date1 = new Date(e);
      let date2 = new Date(this.date);

      const diffTime = Math.abs(date1 - date2);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      return Number(diffDays);
    },
  },
  created() {
    this.get_shot_r(
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
  max-height: 92vh;
  min-height: 92vh;
}
@media (max-width: 500px) {
  .mt-3.table-responsive {
    max-height: 123vh;
    min-height: 123vh;
  }
  .modal-body .table-responsive {
    max-height: 79vh;
    min-height: 79vh;
  }
}
.mt-3.table-responsive table {
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
</style>
