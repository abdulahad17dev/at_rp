<template>
  <Header_item />

  <ul
    class="nav nav-tabs nav-fill nav-justified mb-3"
    id="pills-tab"
    role="tablist"
  >
    <li class="nav-item mx-1" role="presentation">
      <a
        class="nav-link active"
        id="pills-home-tab"
        data-mdb-toggle="pill"
        data-mdb-target="#pills-home"
        type="button"
        role="tab"
        aria-controls="pills-home"
        aria-selected="true"
      >
        Ҳисоб рақамидан олинган таминотлар
      </a>
    </li>
    <li class="nav-item mx-1" role="presentation">
      <a
        class="nav-link"
        id="pills-profile-tab"
        data-mdb-toggle="pill"
        data-mdb-target="#pills-profile"
        type="button"
        role="tab"
        aria-controls="pills-profile"
        aria-selected="false"
        @click="pay_for = true"
      >
        Қарзга олинган таминотлар
      </a>
    </li>
  </ul>
  <div class="tab-content" id="pills-tabContent">
    <div
      class="tab-pane fade show active"
      id="pills-home"
      role="tabpanel"
      aria-labelledby="pills-home-tab"
    >
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
              <select class="form-select form-select-sm" v-model="type">
                <option value="">барчаси</option>
                <option value="proche">проче</option>
                <option value="smeta">смета</option>
                <option value="tarkib">таркиб</option>
              </select>
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
                  id="select_bank_building"
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
                          select_building(
                            item.Buildings.id,
                            item.Buildings.name
                          )
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
          <div class="row">
            <div class="col">
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
                      <li @click="select_market(0, 'барчаси', '')">
                        <a class="dropdown-item">барчаси</a>
                      </li>
                      <li
                        v-for="item in markets"
                        :key="item"
                        @click="
                          select_market(
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
            <div class="col"></div>
            <div class="col"></div>
          </div>
        </form>
        <div class="table-responsive mt-3">
          <table class="table table-sm table-hover">
            <thead class="">
              <tr>
                <th style="width: 10%">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    v-model="checkAll"
                    v-if="paid_status == 'false' && requests.length"
                  />
                  №
                </th>
                <th style="width: 7%">Махсулот</th>
                <th style="width: 10%">Ҳажм</th>
                <th style="width: 10%">Ўлчов бирлиги</th>
                <th style="width: 5%">Сана</th>
                <th style="width: 10%">Объект</th>
                <th style="width: 10%">Дидох линк</th>
                <th style="width: 10%">Маҳсулот сотувчи корхона</th>
                <th style="width: 10%">Таминотчи</th>
                <th style="width: 10%">Сумма</th>
                <th style="width: 10%">Қолган сумма</th>
                <th style="width: 8%"></th>
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
                    v-if="paid_status == 'false'"
                  />
                  {{ inc + 1 }}
                  <button
                    class="btn btn-sm"
                    data-mdb-toggle="modal"
                    data-mdb-target="#get_paid_moneys"
                    @click="get_paid_moneys(item.Supplies_by_bank_account.id)"
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
                <td>{{ item.building }}</td>
                <td>
                  <a
                    :href="item.Supplies_by_bank_account.didox_link"
                    target="_blank"
                    rel="noopener noreferrer"
                    >{{ item.Supplies_by_bank_account.didox_link }}</a
                  >
                </td>
                <td>
                  {{ item.market }}(<a
                    class="text-decoration-none text-dark"
                    :href="`tel:+998${item.market_phone}`"
                  >
                    +998 {{ item.market_phone }} </a
                  >)
                </td>
                <td>{{ item.taminotchi }}</td>
                <td>
                  <span>
                    <Format_numbers
                      :number="item.Supplies_by_bank_account.total_price"
                    />
                    сўм</span
                  >
                </td>
                <td>
                  <div
                    class="input-group input-group-sm"
                    v-if="item.Supplies_by_bank_account.paid_status == false"
                    :luboy="'input' + item.Supplies_by_bank_account.id"
                  >
                    <input
                      type="number"
                      step="any"
                      class="form-control"
                      :disabled="checked.length"
                      v-model="item.total_price"
                      @change="valid($event, item.Supplies_by_bank_account)"
                    />
                    <span class="input-group-text bg-white">сўм</span>
                  </div>
                  <span v-else> 0 сўм</span>
                </td>
                <td>
                  <button
                    class="btn btn-sm btn-primary"
                    v-if="
                      item.Supplies_by_bank_account.paid_status == false &&
                      !checked.length
                    "
                    @click="get_item(item)"
                    id="pay_supply_d"
                    :luboy="'button' + item.Supplies_by_bank_account.id"
                    data-mdb-toggle="modal"
                    data-mdb-target="#pay_by_b_a"
                  >
                    <i class="fa-solid fa-money-bill-transfer"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <Data_notfound v-if="requests == ''" />
        </div>

        <div class="row mt-2" v-if="checked.length && paid_status == 'false'">
          <div class="col-12">
            <button
              class="btn btn-sm btn-outline-success w-100"
              @click="get_item(item)"
              id="pay_supply_d"
              :disabled="disabled"
              data-mdb-toggle="modal"
              data-mdb-target="#pay_by_b_a"
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
    </div>
    <div
      class="tab-pane fade"
      id="pills-profile"
      role="tabpanel"
      aria-labelledby="pills-profile-tab"
    >
      <Pay_for_b_a v-if="pay_for" />
    </div>
  </div>

  <!-- Modal -->
  <div
    class="modal fade"
    id="pay_by_b_a"
    tabindex="-1"
    aria-labelledby="pay_by_b_aLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="pay_by_b_aLabel">
            Пул тўлаш <br />
            <h6>
              <b class="text-primary" v-if="checked.length">
                жами сумма:
                {{ new Intl.NumberFormat().format(total_price) }} сўм
              </b>
            </h6>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-mdb-dismiss="modal"
            aria-label="Close"
            id="pay_bank_close"
          ></button>
        </div>
        <form @submit.prevent="pay">
          <div class="modal-body">
            <div class="row gap-2">
              <div class="col-10 mx-auto">
                <label for="from6">Банк ҳисоб: </label>
                <div class="dropdown">
                  <button
                    class="btn btn-light btn-sm dropdown-toggle"
                    type="button"
                    id="bank_account_text"
                    data-mdb-toggle="dropdown"
                    data-bs-auto-close="outside"
                    aria-expanded="false"
                    @click="
                      bank_accounts.length
                        ? ''
                        : bank_accounts_get(
                            page_account,
                            limit_account,
                            search_account
                          )
                    "
                  >
                    {{ text_account }}
                  </button>
                  <ul
                    class="dropdown-menu border-top-0"
                    aria-labelledby="bank_account"
                  >
                    <li>
                      <input
                        type="search"
                        class="form-control form-control-sm"
                        placeholder="қидириш ..."
                        v-model="search_account"
                      />
                    </li>
                    <li>
                      <ul class="dropdown-items">
                        <li
                          v-for="item in bank_accounts"
                          :key="item"
                          @click="
                            select(
                              item.Bank_accounts.id,
                              item.Bank_accounts.name
                            )
                          "
                        >
                          <a class="dropdown-item">{{
                            item.Bank_accounts.name
                          }}</a>
                        </li>
                      </ul>
                    </li>
                    <li v-if="bank_accounts != ''">
                      <hr class="dropdown-divider m-0" />
                    </li>
                    <li>
                      <nav
                        aria-label="Page navigation example"
                        class="mt-2"
                        v-if="bank_accounts != ''"
                      >
                        <ul
                          class="pagination pagination-sm justify-content-end"
                        >
                          <li class="page-item">
                            <button
                              type="button"
                              class="page-link"
                              @click="
                                bank_accounts_get(
                                  page_account,
                                  limit_account,
                                  search_account
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
                              @click="page_account--"
                              :disabled="page_account == 0"
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
                              {{ page_account + 1 }}
                            </button>
                          </li>
                          <li class="page-item">
                            <button
                              type="button"
                              class="page-link"
                              @click="page_account++"
                              :disabled="page_account == pages_account - 1"
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
              <div class="col-10 mx-auto">
                <label for="comment13">Изох: </label>
                <textarea
                  id="comment13"
                  class="form-control form-control-sm"
                  v-model="body.comment"
                ></textarea>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="submit"
              class="btn btn-outline-primary btn-sm"
              id="pay_bank_account_d"
              :disabled="!body.from_ || !body.comment"
            >
              <i class="fa-solid fa-circle-check"></i>
            </button>
            <button
              type="button"
              class="btn btn-outline-danger btn-sm"
              data-mdb-dismiss="modal"
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
            data-mdb-dismiss="modal"
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
                      v-if="item.Expenses.type == 'market_expense_shot'"
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
import Header_item from "@/components/header/header_item.vue";
import {
  bank_account_get,
  building_get,
  get_market_expenses,
  markets_get,
  pay_for_supply_by_b_a,
  shot_request,
  take_back_money_from_supply_by_b_a_expense,
} from "@/utils/request/request";
import { catchError, success } from "@/utils/request/handle_api_err";
import Data_notfound from "@/utils/notfound/data_notfound.vue";
import Format_numbers from "@/utils/format/format_numbers.vue";
import Pay_for_b_a from "./pay_for_b_a.vue";
export default {
  name: "SupplyRequest",
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
      checked: [],
      total_price: null,
      body: {
        money: null,
        from_: null,
        to_: this.$route.query.id,
        for_: null,
        comment: "",
      },
      disabled: false,
      page_account: 0,
      pages_account: null,
      limit_account: 25,
      search_account: "",
      text_account: "ҳисоб рақамлар",
      bank_accounts: [],
      pay_for: false,
      page_building: 0,
      pages_building: null,
      limit_building: 25,
      search_building: "",
      buildings: [],
      text_building: "объектлар",
      text_market: "маҳсулот сотувчи",
      page_market: 0,
      pages_market: null,
      limit_market: 25,
      search_market: "",
      markets: [],
      id: null,
      m_pages: null,
      m_page: 0,
      m_limit: 25,
      paid_moneys: [],
    };
  },
  watch: {
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
    building_id(e) {
      this.checked = [];
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
    limit_account(e) {
      this.page_account = 0;
      this.bank_accounts_get(this.page_account, e, this.search_account);
    },
    page_account(e) {
      this.bank_accounts_get(e, this.limit_account, this.search_account);
    },
    search_account(e) {
      this.page_account = 0;
      this.bank_accounts_get(this.page_account, this.limit_account, e);
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
          res.data.data.forEach((element) => {
            if (element.Supplies_by_bank_account.paid_status == false) {
              let num =
                element.Supplies_by_bank_account.total_price -
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
      this.checked = [];

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
      this.checked = [];

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
    get_item(e) {
      this.text_account = "ҳисоб рақамлар";
      this.body = {
        money: null,
        from_: null,
        to_: null,
        for_: null,
        comment: "",
      };

      if (this.checked.length) {
        var total_price = 0;
        this.checked.forEach((element) => {
          total_price +=
            element.Supplies_by_bank_account.total_price -
            element.sum_paid_money;
        });
        this.total_price = total_price;
      } else {
        this.body.for_ = e.Supplies_by_bank_account.id;
        this.body.money = e.total_price;
        this.body.to_ = e.Supplies_by_bank_account.market_id;
      }
    },
    pay() {
      let array = [];
      var arr = this.checked.map((el) => ({
        money: el.total_price,
        from_: this.body.from_,
        to_: el.Supplies_by_bank_account.market_id,
        for_: el.Supplies_by_bank_account.id,
        comment: this.body.comment,
      }));

      array = arr;

      document.getElementById("pay_bank_account_d").disabled = true;
      this.$store.dispatch("setLoading", { isLoading: true });
      pay_for_supply_by_b_a(this.checked.length ? array : Array(this.body))
        .then((res) => {
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("pay_bank_close").click();
          document.getElementById("pay_bank_account_d").disabled = false;
          success(res);
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
            from_: null,
            to_: null,
            for_: null,
            comment: "",
          };
          this.checked = [];
          this.text_account = "ҳисоб рақамлар";
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("pay_bank_account_d").disabled = false;
        });
    },
    valid(e, item) {
      if (e.target.value <= 0) {
        document
          .querySelector(`[luboy="input${item.id}"]`)
          .classList.add("error");

        document.querySelector(`[luboy="button${item.id}"]`)
          ? document
              .querySelector(`[luboy="button${item.id}"]`)
              .setAttribute("disabled", "true")
          : false;

        this.disabled = true;
      } else {
        document
          .querySelector(`[luboy="input${item.id}"]`)
          .classList.remove("error");

        document.querySelector(`[luboy="button${item.id}"]`)
          ? document
              .querySelector(`[luboy="button${item.id}"]`)
              .removeAttribute("disabled")
          : false;

        this.disabled = false;
      }
    },
    bank_accounts_get(page_account, limit_account, search_account) {
      this.$store.dispatch("setLoading", { isLoading: true });

      bank_account_get(page_account, limit_account, search_account)
        .then((res) => {
          this.bank_accounts = res.data.data;
          this.pages_account = res.data.pages;
          this.$store.dispatch("setLoading", { isLoading: false });
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
        });
    },
    select(id, name) {
      this.body.from_ = id;
      this.text_account = name;
      document.getElementById("bank_account_text").click();
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
      document.getElementById("select_bank_building").click();
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
    select_market(id, name, phone) {
      this.market_id = id;
      if (phone) {
        this.text_market = name + " +998 " + phone;
        document.getElementById("select_bank_market").click();
      } else {
        this.text_market = name;
        document.getElementById("select_bank_market").click();
      }
    },
    get_paid_moneys(e) {
      this.id = e;
      this.$store.dispatch("setLoading", { isLoading: true });
      get_market_expenses(
        0,
        0,
        e,
        0,
        "market_expense_shot",
        this.m_page,
        this.m_limit
      )
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
      take_back_money_from_supply_by_b_a_expense(e)
        .then((res) => {
          this.$store.dispatch("setLoading", { isLoading: false });
          success(res);
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
        this.requests.forEach((element) => {
          if (element.Supplies_by_bank_account.paid_status == false) {
            let num =
              element.Supplies_by_bank_account.total_price -
              element.sum_paid_money;
            element.total_price = num;
          }
        });
        return this.requests
          ? this.checked.length == this.requests.length
          : false;
      },
      set: function (value) {
        this.requests.forEach((element) => {
          if (element.Supplies_by_bank_account.paid_status == false) {
            let num =
              element.Supplies_by_bank_account.total_price -
              element.sum_paid_money;
            element.total_price = num;
          }
        });
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
  components: { Header_item, Data_notfound, Format_numbers, Pay_for_b_a },
};
</script>

<style lang="scss" scoped>
.request {
  zoom: 75%;
}
.mt-3.table-responsive {
  max-height: 78vh;
  min-height: 78vh;
}
.modal-body .table-responsive {
  max-height: 67vh;
  min-height: 67vh;
}
@media (max-width: 500px) {
  .mt-3.table-responsive {
    max-height: 118vh;
    min-height: 118vh;
  }
  .modal-body .table-responsive {
    max-height: 79vh;
    min-height: 79vh;
  }
}
.mt-3 table {
  min-width: 1450px;
  width: 100%;
}
.modal-body .table-responsive table {
  min-width: 900px;
  width: 100%;
  zoom: 75%;
}

.error {
  border: 1px solid red;
  border-radius: 0.2rem;
}
.error input {
  border-right: 1px solid red;
  border-radius: 0.2rem;
}
.dropdown-menu {
  transform: translate3d(0px, 32.8px, 0px) !important;
}
</style>
