<template>
  <Header_item />

  <ul
    class="nav nav-tabs nav-fill nav-justified mb-1"
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
        Таъминот тарихи
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
        @click="paid_moneys.length ? '' : get_paid_moneys()"
      >
        Тўловлар тарихи
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
      <div class="row p-0 m-0">
        <div class="col p-0 m-0">
          <ul
            class="nav nav-tabs nav-fill nav-justified mb-3"
            id="pills-tab"
            role="tablist"
          >
            <li class="nav-item mx-1" role="presentation">
              <a
                class="nav-link active"
                id="pills-naxt-tab"
                data-mdb-toggle="pill"
                data-mdb-target="#pills-naxt"
                type="button"
                role="tab"
                aria-controls="pills-naxt"
                aria-selected="true"
              >
                Нахт тўлов орқали
              </a>
            </li>
            <li class="nav-item mx-1" role="presentation">
              <a
                class="nav-link"
                id="pills-shot-tab"
                data-mdb-toggle="pill"
                data-mdb-target="#pills-shot"
                type="button"
                role="tab"
                aria-controls="pills-shot"
                aria-selected="false"
                @click="
                  sh_requests.length
                    ? ''
                    : get_supply_shot(
                        sh_market_id,
                        sh_status,
                        sh_paid_status,
                        sh_building_id,
                        sh_type,
                        sh_from_time,
                        sh_to_time,
                        sh_page,
                        sh_limit
                      )
                "
              >
                Ҳисоб рақам орқали
              </a>
            </li>
          </ul>
        </div>
        <div class="col p-0 m-0 remove_in_display"></div>
      </div>
      <div class="tab-content" id="pills-tabContent">
        <div
          class="tab-pane fade show active"
          id="pills-naxt"
          role="tabpanel"
          aria-labelledby="pills-naxt-tab"
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
                  <div class="btn-group w-100">
                    <button
                      class="btn btn-light btn-sm dropdown-toggle"
                      type="button"
                      id="dropdownMenuClickableInside"
                      data-mdb-toggle="dropdown"
                      data-bs-auto-close="outside"
                      aria-expanded="false"
                    >
                      {{ status_text }}
                    </button>
                    <ul
                      class="dropdown-menu"
                      aria-labelledby="dropdownMenuClickableInside"
                    >
                      <li v-for="item in types" :key="item">
                        <a
                          class="dropdown-item d-flex"
                          href="#"
                          @click="
                            item.children ? '' : sort(item.type, item.title)
                          "
                          ><p
                            @click="
                              !item.children ? '' : sort(item.type, item.title)
                            "
                            class="m-0"
                            style="width: 90%"
                          >
                            {{ item.title }}
                          </p>
                          <i
                            v-if="item.children"
                            class="fa-solid fa-angle-down text-right btn btn-sm"
                            data-mdb-toggle="collapse"
                            :data-mdb-target="`#collapse${item.type}`"
                            aria-expanded="false"
                            :aria-controls="`collapse${item.type}`"
                          ></i>
                        </a>
                        <div
                          class="collapse"
                          :id="`collapse${item.type}`"
                          v-if="item.children"
                        >
                          <li
                            v-for="child in item.children"
                            :key="child"
                            @click="sort(child.type, item.title)"
                          >
                            <a href="#" class="dropdown-item ml-4">{{
                              child.title
                            }}</a>
                          </li>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="col">
                  <select
                    class="form-select form-select-sm"
                    v-model="paid_status"
                  >
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
              <table class="table table-sm table-hover" id="supply_history1">
                <thead class="">
                  <tr>
                    <th style="width: 10%">№</th>
                    <th style="width: 20%">Махсулот</th>
                    <th style="width: 20%">Ҳажм</th>
                    <th style="width: 20%">Ўлчов бирлиги</th>
                    <th style="width: 10%">Сана</th>
                    <th style="width: 20%">Сумма</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, inc) in requests || []" :key="item">
                    <td>
                      {{ inc + 1 }}
                    </td>
                    <td>
                      {{
                        item.Supplies.type == "qarz_tarkib" ||
                        item.Supplies.type == "naxt_tarkib" ||
                        item.Supplies.type == "shot_tarkib"
                          ? item.product +
                            ":" +
                            item.Supplies.product_composition
                          : item.product
                      }}
                    </td>
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
                      <span class="d-flex">
                        <Format_numbers :number="item.Supplies.price" />
                        <span class="mx-1"> сўм </span>
                      </span>
                      <hr class="m-0 w-50" />
                      <span class="d-flex">
                        <Format_numbers
                          :number="item.Supplies.price * item.Supplies.quantity"
                        />
                        <span class="mx-1"> сўм </span>
                      </span>
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
                <li>
                  <Select_data :id="'supply_history1'" />
                </li>
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
                  <button
                    class="page-link"
                    @click="page = 0"
                    :disabled="page == 0"
                  >
                    <i class="fa-solid fa-angles-left text-dark"></i>
                  </button>
                </li>
                <li class="page-item">
                  <button
                    class="page-link"
                    @click="page--"
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
          id="pills-shot"
          role="tabpanel"
          aria-labelledby="pills-shot-tab"
        >
          <div class="request">
            <form @submit.prevent="sh_time">
              <div class="row">
                <div class="col">
                  <input
                    type="date"
                    class="form-control form-control-sm"
                    v-model="sh_from_time"
                    required
                  />
                </div>
                <div class="col">
                  <input
                    type="date"
                    class="form-control form-control-sm"
                    v-model="sh_to_time"
                    required
                  />
                </div>
                <div class="col">
                  <div class="btn-group w-100">
                    <button
                      class="btn btn-outline-primary btn-sm w-80"
                      :disabled="sh_from_time == '' || sh_to_time == ''"
                    >
                      <i class="fa-solid fa-search"></i>
                    </button>
                    <button
                      class="btn btn-outline-danger btn-sm w-20"
                      @click="sh_reset"
                      v-if="sh_from_time && sh_to_time"
                    >
                      <i class="fa-solid fa-circle-xmark"></i>
                    </button>
                  </div>
                </div>
              </div>
              <div class="row my-1">
                <div class="col">
                  <select class="form-select form-select-sm" v-model="sh_type">
                    <option value="proche">проче</option>
                    <option value="smeta">смета</option>
                    <option value="tarkib">таркиб</option>
                  </select>
                </div>
                <div class="col">
                  <select
                    class="form-select form-select-sm"
                    v-model="sh_paid_status"
                  >
                    <option value="">барчаси</option>
                    <option value="true">тўланди</option>
                    <option value="false">тўланмади</option>
                  </select>
                </div>
                <div class="col">
                  <select
                    class="form-select form-select-sm"
                    v-model="sh_status"
                  >
                    <option value="">барчаси</option>
                    <option value="true">қабул қилинди</option>
                    <option value="false">қабул қилинмади</option>
                  </select>
                </div>
              </div>
            </form>
            <div class="table-responsive mt-3">
              <table class="table table-sm table-hover" id="supply_history2">
                <thead class="">
                  <tr>
                    <th style="width: 10%">№</th>
                    <th style="width: 20%">Махсулот</th>
                    <th style="width: 20%">Ҳажм</th>
                    <th style="width: 20%">Ўлчов бирлиги</th>
                    <th style="width: 10%">Сана</th>
                    <th style="width: 20%">Сумма</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, inc) in sh_requests || []" :key="item">
                    <td>
                      {{ inc + 1 }}
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
                    <td>
                      <span class="d-flex">
                        <Format_numbers
                          :number="item.Supplies_by_bank_account.total_price"
                        />
                        <span class="mx-1"> сўм </span>
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <Data_notfound v-if="sh_requests == ''" />
            </div>

            <nav
              aria-label="Page navigation example"
              class="mt-2"
              v-if="sh_requests != ''"
            >
              <ul class="pagination pagination-sm justify-content-end">
                <li>
                  <Select_data :id="'supply_history2'" />
                </li>
                <li class="page-item">
                  <select
                    class="form-control form-control-sm form-select mx-1"
                    v-model="sh_limit"
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
                      get_supplysh_(
                        sh_market_id,
                        sh_status,
                        sh_paid_status,
                        sh_building_id,
                        sh_type,
                        sh_from_time,
                        sh_to_time,
                        sh_page,
                        sh_limit
                      )
                    "
                  >
                    <i class="fa-solid fa-rotate"></i>
                  </button>
                </li>
                <li class="page-item">
                  <button
                    class="page-link"
                    @click="sh_page = 0"
                    :disabled="sh_page == 0"
                  >
                    <i class="fa-solid fa-angles-left text-dark"></i>
                  </button>
                </li>
                <li class="page-item">
                  <button
                    class="page-link"
                    @click="sh_page--"
                    :disabled="sh_page == 0"
                  >
                    <i class="fa-solid fa-angle-left text-dark"></i>
                  </button>
                </li>
                <li class="page-item">
                  <button class="page-link text-dark" disabled>
                    {{ sh_page + 1 }}
                  </button>
                </li>
                <li class="page-item">
                  <button
                    class="page-link"
                    @click="sh_page++"
                    :disabled="sh_page == sh_pages - 1"
                  >
                    <i class="fa-solid fa-angle-right text-dark"></i>
                  </button>
                </li>
                <li class="page-item">
                  <button
                    class="page-link"
                    @click="sh_page = sh_pages - 1"
                    :disabled="sh_page == sh_pages - 1"
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
    <div
      class="tab-pane fade"
      id="pills-profile"
      role="tabpanel"
      aria-labelledby="pills-profile-tab"
    >
      <div class="request">
        <div class="table-responsive">
          <table class="table table-sm table-hover" id="supply_history3">
            <thead>
              <tr>
                <th style="width: 10%">Т/р</th>
                <th style="width: 20%">Сумма</th>
                <th style="width: 20%">Сана</th>
                <th style="width: 20%">Ходим</th>
                <th style="width: 20%">Ҳисоб рақам</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, inc) in paid_moneys" :key="item">
                <td class="td_grafik" data-exclude="true">
                  {{ inc + 1 }}
                  <button
                    class="btn btn-sm info"
                    data-mdb-toggle="modal"
                    data-mdb-target="#product_name"
                    @click="product = item.product"
                  >
                    <i
                      class="fa-solid fa-circle-question product"
                      style="font-size: 17px"
                    ></i>
                  </button>
                </td>
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
            <li>
              <Select_data :id="'supply_history3'" />
            </li>
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

  <!-- Modal -->
  <div
    class="modal fade"
    id="product_name"
    tabindex="-1"
    aria-labelledby="product_name_label"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="product_name_label">Таъминот</h5>
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
              <tbody style="font-size: 12px">
                <tr>
                  <td scope="col">Номи</td>
                  <td>{{ product?.name }}</td>
                </tr>
                <tr>
                  <td scope="col">Ўлчов бирлиги</td>
                  <td>{{ product?.olchov }}</td>
                </tr>
                <tr>
                  <td scope="col">Ҳажм</td>
                  <td>{{ product?.quantity }}</td>
                </tr>
                <tr>
                  <td scope="col">Сана</td>
                  <td>
                    {{
                      new Date(product?.time)
                        .toLocaleDateString({
                          year: "numeric",
                          month: "numeric",
                          day: "numeric",
                        })
                        .slice(0, 10)
                    }}
                  </td>
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
import {
  get_market_expenses,
  get_supplies,
  shot_request,
} from "@/utils/request/request";
import { catchError } from "@/utils/request/handle_api_err";
import Data_notfound from "@/utils/notfound/data_notfound.vue";
import Header_item from "@/components/header/header_item.vue";
import Format_numbers from "@/utils/format/format_numbers.vue";
import Select_data from "@/utils/select_data/select_data.vue";
export default {
  name: "SupplyHistory",
  data() {
    return {
      requests: [],
      pages: null,
      market_id: this.$route.query.id,
      status: "",
      paid_status: "",
      building_id: 0,
      type: "proche",
      from_time: "",
      to_time: "",
      page: 0,
      limit: 25,
      types: [
        {
          type: "proche",
          title: "проче",
          children: [
            { type: "naxt_proche", title: "нахт проче" },
            { type: "qarz_proche", title: "қарз проче" },
            { type: "shot_proche", title: "счёт проче" },
          ],
        },
        {
          type: "smeta",
          title: "смета",
          children: [
            { type: "naxt_smeta", title: "нахт смета" },
            { type: "qarz_smeta", title: "қарз смета" },
            { type: "shot_smeta", title: "счёт смета" },
          ],
        },
        {
          type: "tarkib",
          title: "таркиб",
          children: [
            { type: "naxt_tarkib", title: "нахт таркиб" },
            { type: "qarz_tarkib", title: "қарз таркиб" },
            { type: "shot_tarkib", title: "счёт таркиб" },
          ],
        },
        { type: "naxt", title: "нахт " },
        { type: "qarz", title: "қарз" },
        { type: "shot", title: "счёт" },
      ],
      status_text: "статус",
      // shot
      sh_requests: [],
      sh_pages: null,
      sh_market_id: this.$route.query.id,
      sh_status: "",
      sh_paid_status: "",
      sh_building_id: 0,
      sh_type: "proche",
      sh_from_time: "",
      sh_to_time: "",
      sh_page: 0,
      sh_limit: 25,
      m_pages: null,
      m_page: 0,
      m_limit: 25,
      paid_moneys: [],
      product: null,
    };
  },
  watch: {
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
      this.status = "";
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
    sh_type(e) {
      this.sh_page = 0;
      this.get_supply_shot(
        this.sh_market_id,
        this.sh_status,
        this.sh_paid_status,
        this.sh_building_id,
        e,
        this.sh_from_time,
        this.sh_to_time,
        this.sh_page,
        this.sh_limit
      );
    },
    sh_status(e) {
      this.sh_page = 0;
      this.get_supply_shot(
        this.sh_market_id,
        e,
        this.sh_paid_status,
        this.sh_building_id,
        this.sh_type,
        this.sh_from_time,
        this.sh_to_time,
        this.sh_page,
        this.sh_limit
      );
    },
    sh_paid_status(e) {
      this.sh_page = 0;
      this.get_supply_shot(
        this.sh_market_id,
        this.sh_status,
        e,
        this.sh_building_id,
        this.sh_type,
        this.sh_from_time,
        this.sh_to_time,
        this.sh_page,
        this.sh_limit
      );
    },
    m_limit() {
      this.m_page = 0;
      this.get_paid_moneys();
    },
    m_page() {
      this.get_paid_moneys();
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
          this.requests = res.data.data;
          this.pages = res.data.pages;

          this.$store.dispatch("setLoading", { isLoading: false });
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
        });
    },
    get_supply_shot(
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
          this.sh_requests = res.data.data;
          this.sh_pages = res.data.pages;
          this.$store.dispatch("setLoading", { isLoading: false });
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
        });
    },
    time() {
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
        this.limit
      );
    },
    reset() {
      this.from_time = "";
      this.to_time = "";
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
        this.limit
      );
    },
    sh_time() {
      this.sh_page = 0;
      this.get_supply_shot(
        this.sh_market_id,
        this.sh_status,
        this.sh_paid_status,
        this.sh_building_id,
        this.sh_type,
        this.sh_from_time,
        this.sh_to_time,
        this.sh_page,
        this.sh_limit
      );
    },
    sh_reset() {
      this.sh_from_time = "";
      this.sh_to_time = "";
      this.sh_page = 0;
      this.get_supply_shot(
        this.sh_market_id,
        this.sh_status,
        this.sh_paid_status,
        this.sh_building_id,
        this.sh_type,
        this.sh_from_time,
        this.sh_to_time,
        this.sh_page,
        this.sh_limit
      );
    },
    sort(e, title) {
      this.status_text = title;
      this.type = e;
      document.getElementById("dropdownMenuClickableInside").click();
    },
    get_paid_moneys() {
      this.$store.dispatch("setLoading", { isLoading: true });
      get_market_expenses(
        0,
        this.$route.query.id,
        0,
        0,
        "",
        this.m_page,
        this.m_limit
      )
        .then((res) => {
          res.data.data.forEach((element) => {
            if (element.Expenses.type == "market_expense_shot") {
              if (
                element.Supplies_by_bank_account?.type == "proche" ||
                element.Supplies_by_bank_account?.type == "smeta"
              ) {
                element.product = {
                  name: element.supply_by_b_a_product,
                  olchov: element.Supplies_by_bank_account?.olchov_birligi,
                  quantity: element.Supplies_by_bank_account?.quantity,
                  time: element.Supplies_by_bank_account?.time,
                };
              } else {
                element.product = {
                  name:
                    element.supply_by_b_a_product +
                    ":" +
                    element.Supplies_by_bank_account?.product_composition,
                  olchov: element.Supplies_by_bank_account?.olchov_birligi,
                  quantity: element.Supplies_by_bank_account?.quantity,
                  time: element.Supplies_by_bank_account?.time,
                };
              }
            } else {
              if (
                element.Supplies?.type == "qarz_proche" ||
                element.Supplies?.type == "naxt_proche" ||
                element.Supplies?.type == "shot_proche" ||
                element.Supplies?.type == "qarz_smeta" ||
                element.Supplies?.type == "naxt_smeta" ||
                element.Supplies?.type == "shot_smeta"
              ) {
                element.product = {
                  name: element.supply_product,
                  olchov: element.Supplies?.olchov_birligi,
                  quantity: element.Supplies?.quantity,
                  time: element.Supplies?.time,
                };
              } else {
                element.product = {
                  name:
                    element.supply_product +
                    ":" +
                    element.Supplies?.product_composition,
                  olchov: element.Supplies?.olchov_birligi,
                  quantity: element.Supplies?.quantity,
                  time: element.Supplies?.time,
                };
              }
            }
          });
          this.m_pages = res.data.pages;
          this.paid_moneys = res.data.data;
          this.$store.dispatch("setLoading", { isLoading: false });
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
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
  components: { Data_notfound, Header_item, Format_numbers, Select_data },
};
</script>

<style lang="scss" scoped>
.request {
  zoom: 75%;
}
#pills-profile-tab .table-responsive {
  max-height: 87vh;
}
#pills-profile .table-responsive {
  max-height: 98vh;
}

@media (max-width: 500px) {
  #pills-profile-tab .table-responsive {
    max-height: 124vh;
  }
  #pills-profile .table-responsive {
    max-height: 134vh;
  }
}

@media (max-width: 635px) {
  .remove_in_display {
    display: none;
  }
}
#pills-profile-tab table {
  min-width: 1000px;
  width: 100%;
}
#pills-profile table {
  min-width: 900px;
  width: 100%;
}
</style>
