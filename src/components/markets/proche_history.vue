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
              id="select_bank_market"
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
          <select class="form-select form-select-sm" v-model="status">
            <option value="">барчаси</option>
            <option value="true">қабул қилинди</option>
            <option value="false">қабул қилинмади</option>
          </select>
        </div>
      </div>
    </form>
    <div class="table-responsive mt-3">
      <table class="table table-sm table-hover">
        <thead class="">
          <tr>
            <th style="width: 15%">
              <input
                class="form-check-input"
                type="checkbox"
                v-model="checkAll"
                v-if="paid_status == 'false' && requests.length"
              />
              №
            </th>
            <th style="width: 15%">Махсулот</th>
            <th style="width: 10%">Ҳажм</th>
            <th style="width: 15%">Ўлчов бирлиги</th>
            <th style="width: 10%">Сана</th>
            <th style="width: 10%">Счётга ўтказиш</th>
            <th>Сумма</th>
            <th>
              <select class="form-select form-select-sm" v-model="type">
                <option value="proche">барчаси</option>
                <option value="naxt_proche">нахт</option>
                <option value="qarz_proche">қарз</option>
                <option value="shot_proche">счёт</option>
              </select>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, inc) in requests || []" :key="item">
            <td class="td_grafik">
              <input
                class="form-check-input"
                type="checkbox"
                :value="item"
                v-model="checked"
                v-if="
                  (paid_status == 'false' &&
                    item.Supplies.paid_status == false &&
                    item.Supplies.type == 'qarz_proche') ||
                  (paid_status == 'false' &&
                    item.Supplies.paid_status == false &&
                    item.Supplies.type == 'qarz_tarkib')
                "
              />
              {{ inc + 1 }}
              <button
                class="btn btn-sm"
                data-bs-toggle="modal"
                data-bs-target="#get_paid_moneys"
                @click="get_paid_moneys(item.Supplies.id)"
              >
                <i
                  class="fa-solid fa-circle-question product"
                  style="font-size: 17px"
                ></i>
              </button>
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
              <div
                class="form-check form-switch"
                v-if="
                  item.Supplies.type == 'qarz_proche' &&
                  item.Supplies.paid_status == false
                "
              >
                <input
                  class="form-check-input"
                  type="checkbox"
                  role="switch"
                  :id="'flexSwitch' + item.Supplies.id"
                  :checked="item.Supplies.by_b_a"
                  @change="share_to_b_a(item.Supplies.id, item.Supplies.by_b_a)"
                />
                <label
                  class="form-check-label"
                  :for="'flexSwitch' + item.Supplies.id"
                ></label>
              </div>
            </td>
            <td>
              <div
                v-if="
                  item.Supplies.paid_status == false &&
                  item.Supplies.type == 'qarz_proche'
                "
                :luboy="'input' + item.Supplies.id"
              >
                <b v-if="item.total_price > 0">
                  {{ new Intl.NumberFormat().format(item.total_price) }}
                </b>
                <div class="input-group input-group-sm">
                  <input
                    id="price"
                    type="number"
                    step="any"
                    class="form-control"
                    v-model="item.total_price"
                    @change="valid($event, item)"
                  />
                  <span class="input-group-text bg-white">сўм</span>
                </div>
              </div>
              <span class="d-flex" v-else>
                <Format_numbers :number="item.Supplies.price" />
                <span class="mx-1"> сўм </span>
              </span>
            </td>
            <td>
              <button
                class="btn btn-sm btn-primary"
                v-if="
                  item.Supplies.paid_status == false &&
                  item.Supplies.type == 'qarz_proche' &&
                  !checked.length
                "
                @click="pay(item)"
                id="pay_supply_d"
                :luboy="'button' + item.Supplies.id"
              >
                <i class="fa-solid fa-money-bill-transfer"></i>
              </button>
              <button
                class="btn btn-sm btn-danger mx-1"
                v-if="item.Supplies.status == false"
                @click="remove(item.Supplies.id)"
                id="remove_supplies"
              >
                <i class="fa-solid fa-circle-xmark"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <Data_notfound v-if="requests == ''" />
    </div>

    <div class="row mt-2" v-if="checked.length">
      <div class="col-12">
        <button
          class="btn btn-sm btn-outline-success w-100"
          @click="pay(item)"
          id="pay_supply_d"
          :disabled="disabled"
        >
          <i class="fa-solid fa-circle-check"></i> тўлаш
        </button>
      </div>
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
    id="get_paid_moneys"
    tabindex="-1"
    aria-labelledby="get_paid_moneys_label"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <p class="modal-title" id="get_paid_moneys_label">Тўловлар тарихи</p>
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
</template>

<script>
import {
  get_market_expenses,
  get_supplies,
  markets_get,
  pay_for_supply,
  remove_supply,
  share_supply_to_b_a,
  take_back_money_from_supply_expense,
} from "@/utils/request/request";
import { catchError, success } from "@/utils/request/handle_api_err";
import Data_notfound from "@/utils/notfound/data_notfound.vue";
import Format_numbers from "@/utils/format/format_numbers.vue";
export default {
  name: "ProcheHistory",
  data() {
    return {
      requests: [],
      pages: null,
      market_id: 0,
      status: "",
      paid_status: "",
      building_id: 0,
      type: "proche",
      from_time: "",
      to_time: "",
      page: 0,
      limit: 25,
      text_market: "таминотчилар",
      page_market: 0,
      pages_market: null,
      limit_market: 25,
      search_market: "",
      markets: [],
      checked: [],
      total_price: null,
      body: {
        money: null,
        from_: 0,
        to_: 0,
        for_: null,
        comment: "",
      },
      disabled: false,
      id: null,
      m_pages: null,
      m_page: 0,
      m_limit: 25,
      paid_moneys: [],
    };
  },
  watch: {
    page(e) {
      this.checked = [];
      this.page = 0;
      this.get_supply(
        this.market_id,
        this.type,
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
      this.checked = [];
      this.page = 0;
      this.get_supply(
        this.market_id,
        this.type,
        this.paid_status,
        this.building_id,
        this.type,
        this.from_time,
        this.to_time,
        this.page,
        e
      );
    },
    status(e) {
      this.checked = [];
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
    market_id(e) {
      this.checked = [];

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
    paid_status(e) {
      this.checked = [];

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
    type(e) {
      this.checked = [];

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
    m_limit() {
      this.m_page = 0;
      this.get_paid_moneys(this.id);
    },
    m_page() {
      this.get_paid_moneys(this.id);
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
      get_supplies(
        market_id,
        status,
        paid_status,
        building_id,
        type,
        from_time,
        to_time,
        page,
        limit,
        0,
        ""
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
    select(id, name, phone) {
      this.market_id = id;
      if (phone) {
        this.text_market = name + " +998 " + phone;
        document.getElementById("select_bank_market").click();
      } else {
        this.text_market = name;
        document.getElementById("select_bank_market").click();
      }
    },
    remove(e) {
      document.getElementById("remove_supplies").disabled = true;
      this.$store.dispatch("setLoading", { isLoading: true });
      remove_supply(e)
        .then((res) => {
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("remove_supplies").disabled = false;
          success(res).then(() => {
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
          });
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("remove_supplies").disabled = false;
        });
    },
    share_to_b_a(e, status) {
      document.getElementById("flexSwitch" + e).disabled = true;
      this.$store.dispatch("setLoading", { isLoading: true });
      status = !status;
      share_supply_to_b_a(e, status)
        .then((res) => {
          this.$store.dispatch("setLoading", { isLoading: false });
          success(res).then(() => {
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
            document.getElementById("flexSwitch" + e).disabled = false;
          });
        })
        .catch((err) => {
          catchError(err);
          document.getElementById("flexSwitch" + e).disabled = false;
          this.$store.dispatch("setLoading", { isLoading: false });
        });
    },
    pay(e) {
      this.body = {
        money: null,
        from_: 0,
        to_: 0,
        for_: null,
        comment: "",
      };

      if (this.checked.length) {
        var total_price = 0;
        this.checked.forEach((element) => {
          total_price += element.Supplies.price;
        });
        this.total_price = total_price;
      } else {
        this.body.for_ = e.Supplies.id;
        this.body.money = e.total_price;
      }

      let array = [];
      var arr = this.checked.map((el) => ({
        money: el.total_price,
        from_: 0,
        to_: 0,
        for_: el.Supplies.id,
        comment: "",
      }));

      array = arr;

      document.getElementById("pay_supply_d").disabled = true;
      this.$store.dispatch("setLoading", { isLoading: true });
      pay_for_supply(this.checked.length ? array : Array(this.body))
        .then((res) => {
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("pay_supply_d").disabled = false;
          success(res).then(() => {
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

            this.body = {
              money: null,
              from_: 0,
              to_: Number(this.$route.query.id),
              for_: null,
              comment: "",
            };
            this.checked = [];
          });
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("pay_supply_d").disabled = false;
        });
    },
    valid(e, item) {
      if (e.target.value <= 0) {
        document
          .querySelector(`[luboy="input${item.Supplies.id}"]`)
          .classList.add("error");

        document.querySelector(`[luboy="button${item.Supplies.id}"]`)
          ? document
              .querySelector(`[luboy="button${item.Supplies.id}"]`)
              .setAttribute("disabled", "true")
          : false;

        this.disabled = true;
      } else {
        document
          .querySelector(`[luboy="input${item.Supplies.id}"]`)
          .classList.remove("error");

        document.querySelector(`[luboy="button${item.Supplies.id}"]`)
          ? document
              .querySelector(`[luboy="button${item.Supplies.id}"]`)
              .removeAttribute("disabled")
          : false;

        this.disabled = false;
      }
    },
    get_paid_moneys(e) {
      this.id = e;
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
    remove_paid_m(e) {
      document.getElementById("remove_paid_money").disabled = true;
      this.$store.dispatch("setLoading", { isLoading: true });
      take_back_money_from_supply_expense(e)
        .then((res) => {
          this.$store.dispatch("setLoading", { isLoading: false });
          success(res).then(() => {
            this.get_paid_moneys(this.id);
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
            document.getElementById("remove_paid_money").disabled = false;
          });
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("remove_paid_money").disabled = false;
        });
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
  computed: {
    checkAll: {
      get: function () {
        return this.requests
          ? this.checked.length == this.requests.length
          : false;
      },
      set: function (value) {
        var checked = [];
        if (value) {
          this.requests.forEach(function (requests) {
            checked.push(requests);
          });
        }
        this.checked = checked;
      },
    },
  },
  components: { Data_notfound, Format_numbers },
};
</script>

<style lang="scss" scoped>
.request {
  zoom: 75%;
}
.mt-3.table-responsive {
  max-height: 80vh;
  min-height: 80vh;
}
.modal-body .table-responsive {
  max-height: 67vh;
  min-height: 67vh;
}
@media (max-width: 500px) {
  .mt-3.table-responsive {
    max-height: 112vh;
    min-height: 112vh;
  }
  .modal-body .table-responsive {
    max-height: 79vh;
    min-height: 79vh;
  }
}

.error {
  border: 1px solid red;
  border-radius: 0.2rem;
}
.error input {
  border-right: 1px solid red;
  border-radius: 0.2rem;
}

.mt-3.table-responsive table {
  min-width: 1350px;
  width: 100%;
}
.modal-body .table-responsive table {
  min-width: 900px;
  width: 100%;
  zoom: 75%;
}
</style>
