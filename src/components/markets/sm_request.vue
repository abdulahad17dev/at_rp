<template>
  <div class="">
    <div class="request">
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
      <div class="table-responsive smeta mt-3">
        <table class="table table-sm table-hover">
          <thead class="">
            <tr>
              <td style="width: 10%">
                <input
                  class="form-check-input"
                  type="checkbox"
                  v-model="checkAll"
                  v-if="remove_check"
                />
                №
              </td>
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
              <!-- <td style="width: 10%">
                <select class="form-select form-select-sm" v-model="status">
                  <option value=" ">қаъбул қилинмаганлар</option>
                  <option value="wait">қаъбул қилинганлар</option>
                </select>
              </td> -->
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, inc) in smeta" :key="item" class="product">
              <td class="td_grafik">
                <input
                  class="form-check-input"
                  type="checkbox"
                  :value="item"
                  v-model="checked"
                  v-if="search2 == item.product_name"
                />
                {{ inc + 1 }}
                <button
                  class="btn btn-sm"
                  @click="get_grafik(item)"
                  data-bs-toggle="modal"
                  data-bs-target="#smeta_grafik"
                >
                  <i
                    class="fa-solid fa-circle-question product"
                    style="font-size: 17px"
                  ></i>
                </button>
              </td>
              <td>{{ item.product_name }}</td>
              <td>{{ item.product_olchov_birligi }}</td>
              <td>{{ item.Smeta.norm }}</td>
              <td
                style="cursor: pointer; user-select: none"
                @dblclick="sort_name(item.product_name)"
                @click="show_quantity(inc)"
              >
                <span>
                  {{
                    new Intl.NumberFormat().format(item.Smeta.quantity) +
                    " (олинган ҳажм: " +
                    (item.sum_supply_by_b_a_quantity +
                      item.sum_supply_quantity) +
                    ")"
                  }}
                </span>
                <span
                  class="text-primary"
                  style="display: none"
                  :id="`show_smeta_${inc}`"
                >
                  <p class="mb-0">
                    счётдан олинган:
                    {{
                      new Intl.NumberFormat().format(
                        item.sum_supply_by_b_a_quantity
                      )
                    }}
                  </p>
                  <p class="mb-0">
                    олинган:
                    {{
                      new Intl.NumberFormat().format(item.sum_supply_quantity)
                    }}
                  </p>
                </span>
              </td>
              <td>
                <button
                  v-if="search2 != item.product_name"
                  class="btn btn-sm btn-success"
                  @click="get_item(item)"
                  data-bs-toggle="modal"
                  data-bs-target="#accept_smeta"
                >
                  <i class="fa-solid fa-circle-check text-white"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <Data_notfound v-if="smeta == ''" />
      </div>

      <div class="row mt-2" v-if="remove_check">
        <div class="col-6">
          <button
            class="btn btn-sm btn-outline-success w-100"
            data-bs-toggle="modal"
            data-bs-target="#accept_smeta"
            :disabled="!checked.length"
            @click="get_item(item)"
          >
            <i class="fa-solid fa-circle-check"></i> тасдиқлаш
          </button>
        </div>
        <div class="col-6">
          <button
            class="btn btn-sm btn-outline-danger w-100"
            @click="search2 = ''"
          >
            <i class="fa-solid fa-circle-xmark"></i> бекор қилиш
          </button>
        </div>
      </div>

      <nav aria-label="Page navigation example" class="mt-2" v-if="smeta != ''">
        <ul class="pagination pagination-sm justify-content-end mb-0">
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

    <!-- Modal -->
    <div
      class="modal fade"
      id="smeta_grafik"
      tabindex="-1"
      aria-labelledby="smeta_grafik_labek"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <p class="modal-title" id="smeta_grafik_labek">
              {{ product_name }} ни графиклиги ва таркиби
            </p>
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
              id="pills-tabs"
              role="tablist"
            >
              <li class="nav-item" role="presentation">
                <button
                  class="btn btn-light btn-sm w-100 active"
                  id="grafik-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#grafik"
                  type="button"
                  role="tab"
                  aria-controls="grafik"
                  aria-selected="true"
                >
                  Графиклиги
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button
                  class="btn btn-light btn-sm w-100"
                  id="composition-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#composition"
                  type="button"
                  role="tab"
                  aria-controls="composition"
                  aria-selected="false"
                >
                  Таркиби
                </button>
              </li>
            </ul>
            <div class="tab-content" id="pills-tabsContent">
              <div
                class="tab-pane fade show active"
                id="grafik"
                role="tabpanel"
                aria-labelledby="grafik-tab"
              >
                <div class="table-responsive">
                  <table class="table table-sm table-hover">
                    <tbody style="font-size: 12px">
                      <tr>
                        <td scope="col">Номи</td>
                        <td>{{ item.name }}</td>
                      </tr>
                      <tr>
                        <td scope="col">Ҳажм</td>
                        <td>
                          {{ new Intl.NumberFormat().format(item.quantity) }}
                          {{ item.olchov_birligi }}
                        </td>
                      </tr>
                      <tr>
                        <td scope="col">ШНК</td>
                        <td>{{ item.shnk }}</td>
                      </tr>
                      <tr>
                        <td scope="col">Нарх</td>
                        <td>{{ item.allotted_price }} сўм</td>
                      </tr>
                      <tr>
                        <td scope="col">Муддат</td>
                        <td>{{ item.muddat }}</td>
                      </tr>
                      <tr>
                        <td scope="col">Бошланиш санаси</td>
                        <td>
                          {{
                            new Date(item.start_date)
                              .toLocaleDateString("en-us", {
                                year: "numeric",
                                month: "numeric",
                                day: "numeric",
                                hour: "numeric",
                                minute: "numeric",
                                hour12: false,
                              })
                              .slice(0, 16)
                          }}
                        </td>
                      </tr>
                      <tr>
                        <td scope="col">Тугаш санаси</td>
                        <td>
                          {{
                            new Date(item.end_date)
                              .toLocaleDateString("en-us", {
                                year: "numeric",
                                month: "numeric",
                                day: "numeric",
                                hour: "numeric",
                                minute: "numeric",
                                hour12: false,
                              })
                              .slice(0, 16)
                          }}
                        </td>
                      </tr>
                      <tr>
                        <td scope="col">Норма</td>
                        <td>{{ item.norm }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div
                class="tab-pane fade"
                id="composition"
                role="tabpanel"
                aria-labelledby="composition-tab"
              >
                <div class="table-responsive composition">
                  <table class="table table-sm table-hover product_table">
                    <thead>
                      <tr>
                        <th style="width: 8%">№</th>
                        <th style="width: 30%">Номи</th>
                        <th style="width: 22%">Ҳажм</th>
                        <th style="width: 30%">Ўлчов бирлиги</th>
                        <th style="width: 10%"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(item, inc) in product_composition"
                        :key="item"
                      >
                        <td>{{ inc + 1 }}</td>
                        <td>{{ item.name }}</td>
                        <td>
                          {{ new Intl.NumberFormat().format(item.quantity) }}
                        </td>
                        <td>{{ item.olchov_birligi }}</td>
                        <td>
                          <button
                            class="btn btn-sm btn-success"
                            data-bs-target="#productaccept"
                            data-bs-toggle="modal"
                            data-bs-dismiss="modal"
                            @click="get_product_item(item)"
                          >
                            <i class="fa-solid fa-circle-check"></i>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div
      class="modal fade"
      id="accept_smeta"
      tabindex="-1"
      aria-labelledby="accept_smetaLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <p class="modal-title" id="accept_smetaLabel">
              {{ smeta_name }}ни қабул қилиш
            </p>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              id="supply_take"
            ></button>
          </div>
          <form @submit.prevent="take">
            <div class="modal-body">
              <div class="row gap-2">
                <div class="col-10 mx-auto">
                  <label for="quantity">
                    Ҳажм:
                    <b class="text-primary"> {{ total_quantity }} </b></label
                  >
                  <div class="input-group input-group-sm">
                    <input
                      type="number"
                      id="quantity"
                      class="form-control"
                      v-model="body.quantity"
                      placeholder="Ҳажм"
                      step="any"
                      min="1"
                      required
                    />
                    <span class="input-group-text bg-white">{{
                      smeta_olchov_birligi
                    }}</span>
                  </div>
                </div>
                <div class="col-10 mx-auto">
                  <label for="price">
                    Нарх:
                    <span class="text-primary"
                      >{{
                        new Intl.NumberFormat().format(body.price)
                      }}
                      сўм</span
                    ></label
                  >
                  <div class="input-group input-group-sm">
                    <input
                      id="price"
                      type="number"
                      step="any"
                      class="form-control"
                      v-model="body.price"
                      min="1"
                      placeholder="Нарх"
                      required
                    />
                    <span class="input-group-text bg-white">сўм</span>
                  </div>
                </div>
                <div class="col-10 mx-auto">
                  <label for="market_phone"> Телефон рақам: </label>
                  <div class="input-group input-group-sm">
                    <span class="input-group-text bg-white">+998</span>
                    <input
                      type="tel"
                      id="market_phone"
                      class="form-control form-control-sm"
                      v-model="body.market_phone"
                      required
                      placeholder="Телефон рақам"
                      maxlength="9"
                      minlength="9"
                      @keypress="onlyNumber"
                    />
                  </div>
                </div>
                <div class="col-10 mx-auto" v-if="body.type == 'smeta'">
                  <label for="didox_link"> Дидох линк: </label>
                  <input
                    type="text"
                    id="didox_link"
                    class="form-control form-control-sm"
                    v-model="body.didox_link"
                    required
                    placeholder="Дидох линк"
                  />
                </div>
                <div class="col-10 mx-auto">
                  <label for="type"> Тўлов тури: </label>
                  <select
                    id="type"
                    class="form-control form-control-sm"
                    v-model="body.type"
                    required
                  >
                    <option value="naxt_smeta">нахт</option>
                    <option value="qarz_smeta">қарз</option>
                    <option value="smeta">счёт</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="submit"
                class="btn btn-outline-primary btn-sm"
                id="supply_s_disabled"
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
      id="productaccept"
      tabindex="-1"
      aria-labelledby="productacceptL"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <p class="modal-title" id="productacceptL">
              {{ body2.product_composition }}ни қабул қилиш
            </p>
            <button
              type="button"
              class="btn-close"
              id="supply_take_product"
              data-bs-target="#smeta_grafik"
              data-bs-toggle="modal"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <form @submit.prevent="take_product">
            <div class="modal-body">
              <div class="row gap-2">
                <div class="col-10 mx-auto">
                  <label for="quantity2"> Ҳажм: </label>
                  <input
                    type="number"
                    id="quantity"
                    class="form-control form-control-sm"
                    v-model="body2.quantity"
                    placeholder="Ҳажм"
                    min="1"
                    step="any"
                    required
                  />
                </div>
                <div class="col-10 mx-auto">
                  <label for="price2">
                    Нарх:
                    <span class="text-primary"
                      >{{
                        new Intl.NumberFormat().format(body2.price)
                      }}
                      сўм</span
                    ></label
                  >
                  <div class="input-group input-group-sm">
                    <input
                      id="price"
                      type="number"
                      step="any"
                      class="form-control"
                      v-model="body2.price"
                      min="1"
                      placeholder="Нарх"
                      required
                    />
                    <span class="input-group-text bg-white">сўм</span>
                  </div>
                </div>
                <div class="col-10 mx-auto">
                  <label for="market_phone2"> Телефон рақам: </label>
                  <div class="input-group input-group-sm">
                    <span class="input-group-text bg-white">+998</span>
                    <input
                      type="tel"
                      id="market_phone"
                      class="form-control form-control-sm"
                      v-model="body2.market_phone"
                      required
                      placeholder="Телефон рақам"
                      maxlength="9"
                      minlength="9"
                      @keypress="onlyNumber"
                    />
                  </div>
                </div>
                <div class="col-10 mx-auto" v-if="body2.type == 'tarkib'">
                  <label for="didox_link2"> Дидох линк: </label>
                  <input
                    type="text"
                    id="didox_link"
                    class="form-control form-control-sm"
                    v-model="body2.didox_link"
                    required
                    placeholder="Дидох линк"
                  />
                </div>
                <div class="col-10 mx-auto">
                  <label for="type2"> Тўлов тури: </label>
                  <select
                    id="type"
                    class="form-control form-control-sm"
                    v-model="body2.type"
                    required
                  >
                    <option value="naxt_tarkib">нахт</option>
                    <option value="qarz_tarkib">қарз</option>
                    <option value="tarkib">счёт</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="submit"
                class="btn btn-outline-primary btn-sm"
                id="supply_p_disabled"
              >
                <i class="fa-solid fa-circle-check"></i>
              </button>
              <button
                type="button"
                class="btn btn-outline-danger btn-sm"
                data-bs-target="#smeta_grafik"
                data-bs-toggle="modal"
                data-bs-dismiss="modal"
              >
                <i class="fa-solid fa-circle-xmark"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  building_get,
  product_composition_get,
  smeta_request_get,
  take_product_request,
  take_supply_smeta,
} from "@/utils/request/request";
import {
  catchError,
  position_err,
  success,
} from "@/utils/request/handle_api_err";
import Data_notfound from "@/utils/notfound/data_notfound.vue";
export default {
  name: "Sm_request",
  data() {
    return {
      smeta: [],
      pages: null,
      limit: 100,
      page: 0,
      search: "",
      search2: "",
      building_id: 0,
      user_id: 0,
      status: "wait",
      item: {},
      product_name: "",
      page_building: 0,
      pages_building: null,
      limit_building: 25,
      search_building: "",
      buildings: [],
      text_building: "объектлар",
      body: {
        related_id: null,
        product_composition: "",
        sup_by_b_a_id: 0,
        quantity: null,
        price: null,
        market_phone: null,
        didox_link: "",
        type: "",
        map_long: "",
        map_lat: "",
        building_id: null,
      },
      smeta_name: "",
      smeta_olchov_birligi: "",
      remove_check: false,
      checked: [],
      total_quantity: null,
      product_composition: [],
      body2: {
        related_id: null,
        product_composition: "",
        sup_by_b_a_id: 0,
        quantity: null,
        price: null,
        market_phone: null,
        didox_link: "",
        type: "",
        map_long: "",
        map_lat: "",
        building_id: null,
      },
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
    search2(e) {
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
    get_grafik(item) {
      const success = (position) => {
        this.body2.map_lat = position.coords.latitude;
        this.body2.map_long = position.coords.longitude;
      };

      const error = (err) => {
        position_err(err);
        this.body2.map_lat = 0;
        this.body2.map_long = 0;
      };

      navigator.geolocation.getCurrentPosition(success, error);
      this.body2.related_id = item.Smeta.id;
      this.body2.building_id = item.Smeta.building_id;
      this.item = item.grafik;
      this.product_name = item.product_name;
      this.$store.dispatch("setLoading", { isLoading: true });
      product_composition_get(item.Smeta.product_id)
        .then((res) => {
          this.product_composition = res.data;
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
    get_item(e) {
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

      if (this.search2) {
        this.smeta_name = this.checked[0].product_name;
        var total_quantity = 0;
        this.checked.forEach((element) => {
          total_quantity += element.Smeta.quantity;
        });
        this.total_quantity = total_quantity;
        this.smeta_olchov_birligi = this.checked[0].product_olchov_birligi;
      } else {
        this.smeta_name = e.product_name;
        this.smeta_olchov_birligi = e.product_olchov_birligi;
        this.total_quantity = e.Smeta.quantity;
        this.body.building_id = e.Smeta.building_id;
        this.body.related_id = e.Smeta.id;
      }
    },
    onlyNumber($event) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
        $event.preventDefault();
      }
    },
    take() {
      let array = [];
      var arr = this.checked.map((e) => ({
        related_id: e.Smeta.id,
        product_composition: this.body.product_composition,
        sup_by_b_a_id: this.body.sup_by_b_a_id,
        quantity: this.body.quantity,
        price: this.body.price,
        market_phone: this.body.market_phone,
        didox_link: this.body.didox_link,
        type: this.body.type,
        map_long: this.body.map_long,
        map_lat: this.body.map_lat,
        building_id: e.Smeta.building_id,
      }));

      array = arr;
      document.getElementById("supply_s_disabled").disabled = true;
      this.$store.dispatch("setLoading", { isLoading: true });
      take_supply_smeta(this.checked.length ? array : Array(this.body))
        .then((res) => {
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("supply_take").click();
          document.getElementById("supply_s_disabled").disabled = false;
          success(res).then(() => {
            this.get_smeta(
              this.page,
              this.limit,
              this.search,
              this.status,
              this.building_id,
              this.user_id
            );
            this.search2 = "";
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
          document.getElementById("supply_s_disabled").disabled = false;
        });
    },
    sort_name(e) {
      if (e != null) {
        this.checked = [];
        this.remove_check = true;
        this.search2 = e;
      }
    },
    get_product_item(e) {
      this.body2.product_composition = "";
      this.body2.sup_by_b_a_id = 0;
      this.body2.quantity = null;
      this.body2.price = null;
      this.body2.market_phone = null;
      this.body2.type = "";
      this.body2.didox_link = "";
      this.body2.product_composition = e.name;
    },
    take_product() {
      document.getElementById("supply_p_disabled").disabled = true;
      this.$store.dispatch("setLoading", { isLoading: true });
      take_product_request(this.body2)
        .then((res) => {
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("supply_take_product").click();
          document.getElementById("supply_p_disabled").disabled = false;
          success(res).then(() => {
            this.get_smeta(
              this.page,
              this.limit,
              this.search,
              this.status,
              this.building_id,
              this.user_id
            );
            this.body2.product_composition = "";
            this.body2.sup_by_b_a_id = 0;
            this.body2.quantity = null;
            this.body2.price = null;
            this.body2.market_phone = null;
            this.body2.type = "";
            this.body2.didox_link = "";
          });
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("supply_p_disabled").disabled = false;
        });
    },
    show_quantity(e) {
      let show = document.getElementById(`show_smeta_${e}`);
      if (show.style.display == "none") {
        show.style.display = "block";
      } else {
        show.style.display = "none";
      }
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
  computed: {
    checkAll: {
      get: function () {
        return this.smeta ? this.checked.length == this.smeta.length : false;
      },
      set: function (value) {
        var checked = [];
        if (value) {
          this.smeta.forEach(function (smeta) {
            checked.push(smeta);
          });
        }
        this.checked = checked;
      },
    },
  },
  components: { Data_notfound },
};
</script>

<style lang="scss" scoped>
.smeta table {
  min-width: 1180px;
  width: 100%;
}

.table-responsive.smeta {
  max-height: 86vh;
  min-height: 86vh;
}

#composition .composition {
  max-height: 70vh;
}

.request {
  zoom: 75%;
}

td.td_grafik {
  cursor: pointer;
}

.td_grafik button:focus {
  box-shadow: none;
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
  .table-responsive.smeta {
    max-height: 113vh;
    min-height: 113vh;
  }

  #composition .composition {
    max-height: 100vh;
  }
}
</style>
