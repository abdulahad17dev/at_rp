<template>
  <button
    type="button"
    class="btn btn-dark btn-floating mx-1 position-relative"
    data-mdb-toggle="modal"
    data-mdb-target="#notification"
  >
    <span
      v-if="count > 0"
      style="position: absolute"
      class="top-0 start-100 translate-middle badge rounded-pill badge-danger"
    >
      {{ count >= 99 ? "99+" : count }}
      <span class="visually-hidden">unread messages</span>
    </span>
    <i class="fa-solid fa-bell fa-shake" v-if="count > 0"></i>
    <i class="fa-solid fa-bell" v-else></i>
  </button>
  <div
    class="modal fade"
    id="notification"
    tabindex="-1"
    aria-labelledby="notification"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <button
            type="button"
            class="btn-close"
            data-mdb-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <ul class="nav nav-tabs nav-justified" id="pills-tab" role="tablist">
            <li class="nav-item mx-1" role="presentation">
              <a
                class="nav-link active"
                id="product-tab"
                data-mdb-toggle="pill"
                data-mdb-target="#product"
                type="button"
                role="tab"
                aria-controls="product"
                aria-selected="true"
              >
                Қабул қилинмаган материаллар
              </a>
            </li>
            <li class="nav-item mx-1" role="presentation">
              <a
                class="nav-link"
                id="supplies-tab"
                data-mdb-toggle="pill"
                data-mdb-target="#supplies"
                type="button"
                role="tab"
                aria-controls="supplies"
                aria-selected="false"
                >Олиниши керак бўлган таъминотлар
              </a>
            </li>
            <li class="nav-item mx-1" role="presentation">
              <a
                class="nav-link"
                id="product2-tab"
                data-mdb-toggle="pill"
                data-mdb-target="#product2"
                type="button"
                role="tab"
                aria-controls="product2"
                aria-selected="true"
              >
                Бажарилиши керак бўлган ишлар
              </a>
            </li>
            <li class="nav-item mx-1" role="presentation">
              <a
                class="nav-link"
                id="supplies2-tab"
                data-mdb-toggle="pill"
                data-mdb-target="#supplies2"
                type="button"
                role="tab"
                aria-controls="supplies2"
                aria-selected="false"
                >Тақсимланиши керак бўлган материаллар
              </a>
            </li>
          </ul>
          <div class="tab-content" id="pills-tabContent">
            <div
              class="tab-pane fade show active"
              id="product"
              role="tabpanel"
              aria-labelledby="product-tab"
            >
              <div class="d-flex flex-row-reverse mt-2 m-1">
                <select
                  class="form-control form-control-sm w-25"
                  v-model="filter_request_1_2"
                >
                  <option value="supply">Таъминотлар</option>
                  <option value="product">Материаллар</option>
                </select>
              </div>
              <div v-if="filter_request_1_2 == 'supply'">
                <div class="table-responsive mt-2">
                  <table
                    class="table table-sm table-hover"
                    id="supply_in_warehouse"
                  >
                    <thead>
                      <tr>
                        <th style="width: 5%">№</th>
                        <th style="width: 10%">Махсулот</th>
                        <th style="width: 10%">Ҳажм</th>
                        <th style="width: 10%">Ўлчов бирлиги</th>
                        <th style="width: 10%">Сана</th>
                        <th style="width: 10%">Объект</th>
                        <th style="width: 10%">Таминотчи</th>
                        <th style="width: 10%">Омборчи</th>
                        <th style="width: 10%">Тури</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, inc) in request1" :key="item">
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
                          {{ item.building }}
                        </td>
                        <td>
                          {{ item.taminotchi }}
                        </td>
                        <td>
                          {{
                            item.Supplies.status == true
                              ? item.warehouseman
                              : ""
                          }}
                        </td>
                        <td>
                          {{
                            item.Supplies.type == "shot_proche"
                              ? "проче"
                              : "" || item.Supplies.type == "naxt_proche"
                              ? "проче"
                              : "" || item.Supplies.type == "qarz_proche"
                              ? "проче"
                              : "" || item.Supplies.type == "shot_smeta"
                              ? "смета"
                              : "" || item.Supplies.type == "naxt_smeta"
                              ? "смета"
                              : "" || item.Supplies.type == "qarz_smeta"
                              ? "смета"
                              : "" || item.Supplies.type == "shot_tarkib"
                              ? "таркиб"
                              : "" || item.Supplies.type == "naxt_tarkib"
                              ? "таркиб"
                              : "" || item.Supplies.type == "qarz_tarkib"
                              ? "таркиб"
                              : ""
                          }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <Data_notfound v-if="request1 == ''" />
                </div>
                <nav
                  aria-label="Page navigation example"
                  class="mt-2"
                  v-if="request1 != ''"
                >
                  <ul class="pagination pagination-sm justify-content-end">
                    <li class="page-item">
                      <select
                        class="form-control form-control-sm form-select mx-1"
                        v-model="request_limit1"
                        @change="get_request('request1')"
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
                        @click="get_request('request1')"
                      >
                        <i class="fa-solid fa-rotate"></i>
                      </button>
                    </li>
                    <li class="page-item">
                      <button
                        class="page-link"
                        @click="
                          request_page1--;
                          get_request('request1');
                        "
                        :disabled="request_page1 == 0"
                      >
                        <i class="fa-solid fa-angle-left text-dark"></i>
                      </button>
                    </li>
                    <li class="page-item">
                      <button class="page-link text-dark" disabled>
                        {{ request_page1 + 1 }}
                      </button>
                    </li>
                    <li class="page-item">
                      <button
                        class="page-link"
                        @click="
                          request_page1++;
                          get_request('request1');
                        "
                        :disabled="request_page1 == request_pages1"
                      >
                        <i class="fa-solid fa-angle-right text-dark"></i>
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
              <div v-else>
                <div class="table-responsive mt-2">
                  <table
                    class="table table-sm table-hover"
                    id="transfered_product1"
                  >
                    <thead>
                      <tr>
                        <th style="width: 10%">№</th>
                        <th style="width: 20%">Материаллар</th>
                        <th style="width: 20%">Ҳажм</th>
                        <th style="width: 20%">Ўлчов бирлиги</th>
                        <th style="width: 10%">Сана</th>
                        <th style="width: 20%">Объект</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, inc) in request2" :key="item">
                        <td>{{ inc + 1 }}</td>
                        <td>{{ item.product }}</td>
                        <td>{{ item.sum_quantity }}</td>
                        <td>{{ item.olchov_birligi }}</td>
                        <td>
                          {{
                            new Date(item.Product_transfers.time)
                              .toLocaleDateString({
                                year: "numeric",
                                month: "numeric",
                                day: "numeric",
                              })
                              .slice(0, 10)
                          }}
                        </td>
                        <td>{{ item.for_to }}</td>
                      </tr>
                    </tbody>
                  </table>
                  <Data_notfound v-if="request2 == ''" />
                </div>

                <nav
                  aria-label="Page navigation example"
                  class="mt-2"
                  v-if="request2 != ''"
                >
                  <ul class="pagination pagination-sm justify-content-end">
                    <li class="page-item">
                      <select
                        class="form-control form-control-sm form-select mx-1"
                        v-model="request_limit2"
                        @change="get_request('request2')"
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
                        @click="get_request('request2')"
                      >
                        <i class="fa-solid fa-rotate"></i>
                      </button>
                    </li>
                    <li class="page-item">
                      <button
                        class="page-link"
                        @click="
                          request_page2--;
                          get_request('request2');
                        "
                        :disabled="request_page2 == 0"
                      >
                        <i class="fa-solid fa-angle-left text-dark"></i>
                      </button>
                    </li>
                    <li class="page-item">
                      <button class="page-link text-dark" disabled>
                        {{ request_page2 + 1 }}
                      </button>
                    </li>
                    <li class="page-item">
                      <button
                        class="page-link"
                        @click="
                          request_page2++;
                          get_request('request2');
                        "
                        :disabled="request_page2 == request_pages2"
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
              id="supplies"
              role="tabpanel"
              aria-labelledby="supplies-tab"
            >
              <div class="d-flex flex-row-reverse mt-2 m-1">
                <select
                  class="form-control form-control-sm w-25"
                  v-model="filter_request_3_4"
                >
                  <option value="proche">Проче</option>
                  <option value="smeta">Смета</option>
                </select>
              </div>
              <div class="request" v-if="filter_request_3_4 == 'proche'">
                <div class="table-responsive mt-3">
                  <table
                    class="table table-sm table-hover"
                    id="select_proche_request_data2"
                  >
                    <thead class="">
                      <tr>
                        <th>№</th>
                        <th>Номи</th>
                        <th>Ҳажм</th>
                        <th>Ўлчов бирлиги</th>
                        <th>Сана</th>
                        <th>Изох</th>
                        <th>Объект</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, inc) in request3" :key="item">
                        <td>
                          {{ inc + 1 }}
                        </td>
                        <td>
                          {{ item.Proche_sorovlar.name }}
                        </td>
                        <td>
                          <Format_numbers
                            :number="item.Proche_sorovlar.quantity"
                          />
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
                      </tr>
                    </tbody>
                  </table>
                  <Data_notfound v-if="request3 == ''" />
                </div>

                <nav
                  aria-label="Page navigation example"
                  class="mt-2"
                  v-if="request3 != ''"
                >
                  <ul class="pagination pagination-sm justify-content-end">
                    <li class="page-item">
                      <select
                        class="form-control form-control-sm form-select mx-1"
                        v-model="request_limit3"
                        @change="get_request('request3')"
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
                        @click="get_request('request3')"
                      >
                        <i class="fa-solid fa-rotate"></i>
                      </button>
                    </li>
                    <li class="page-item">
                      <button
                        class="page-link"
                        @click="
                          request_page3--;
                          get_request('request3');
                        "
                        :disabled="request_page3 == 0"
                      >
                        <i class="fa-solid fa-angle-left text-dark"></i>
                      </button>
                    </li>
                    <li class="page-item">
                      <button class="page-link text-dark" disabled>
                        {{ request_page3 + 1 }}
                      </button>
                    </li>
                    <li class="page-item">
                      <button
                        class="page-link"
                        @click="
                          request_page3++;
                          get_request('request3');
                        "
                        :disabled="request_page3 == request_page3"
                      >
                        <i class="fa-solid fa-angle-right text-dark"></i>
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
              <div class="request" v-else>
                <div class="table-responsive mt-3">
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
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, inc) in request4" :key="item">
                        <td>
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
                      </tr>
                    </tbody>
                  </table>
                  <Data_notfound v-if="request4 == ''" />
                </div>

                <nav
                  aria-label="Page navigation example"
                  class="mt-2"
                  v-if="request4 != ''"
                >
                  <ul class="pagination pagination-sm justify-content-end mb-0">
                    <li class="page-item">
                      <select
                        class="form-control form-control-sm form-select mx-1"
                        v-model="request_limit4"
                        @change="get_request('request4')"
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
                        @click="get_request('request4')"
                      >
                        <i class="fa-solid fa-rotate"></i>
                      </button>
                    </li>
                    <li class="page-item">
                      <button
                        class="page-link"
                        @click="
                          request_page4--;
                          get_request('request4');
                        "
                        :disabled="request_page4 == 0"
                      >
                        <i class="fa-solid fa-angle-left text-dark"></i>
                      </button>
                    </li>
                    <li class="page-item">
                      <button class="page-link text-dark" disabled>
                        {{ request_page4 + 1 }}
                      </button>
                    </li>
                    <li class="page-item">
                      <button
                        class="page-link"
                        @click="
                          request_page4++;
                          get_request('request4');
                        "
                        :disabled="request_page4 == request_pages4"
                      >
                        <i class="fa-solid fa-angle-right text-dark"></i>
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
            <div
              class="tab-pane fade show"
              id="product2"
              role="tabpanel"
              aria-labelledby="product2-tab"
            >
              <div class="d-flex flex-row-reverse mt-2 m-1">
                <select
                  class="form-control form-control-sm w-25"
                  v-model="filter_request_5_6"
                >
                  <option value="wait">Муддати якунланаётган ишлар</option>
                  <option value="re-check">Тасдиқланиши керак бўлган</option>
                </select>
              </div>
              <div v-if="filter_request_5_6 == 'wait'">
                <div class="table-responsive mt-3" style="overflow: auto">
                  <table
                    class="table table-sm table-hover smeta work"
                    style="min-width: 1200px"
                  >
                    <thead>
                      <tr>
                        <th style="width: 5%">ШНК</th>
                        <th style="width: 15%">Номи</th>
                        <th style="width: 10%">Ўлчов бирлиги</th>
                        <th style="width: 15%">Ҳажм</th>
                        <th style="width: 10%">Ишчи учун ажратилган вақт</th>
                        <th style="width: 10%">Машина учун ажратилган вақт</th>
                        <th style="width: 10%">Ажратилган сумма</th>
                        <th style="width: 5%">Муддат</th>
                        <th style="width: 10%">Изох</th>
                        <th style="width: 10%">Сана</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in filtering_request_5" :key="item">
                        <td>{{ item.Smeta.shnk }}</td>
                        <td>{{ item.Smeta.name }}</td>
                        <td>{{ item.Smeta.olchov_birligi }}</td>
                        <td>
                          <span class="d-flex">
                            <Format_numbers
                              :number="item.Smeta.quantity"
                              class="mx-1"
                            />/
                            {{
                              item.completed_quantity
                                ? item.completed_quantity
                                : 0
                            }}
                          </span>
                        </td>
                        <td>
                          <Format_numbers
                            :number="item.Smeta.allotted_time_for_worker"
                          />
                        </td>
                        <td>
                          <Format_numbers
                            :number="item.Smeta.allotted_time_for_machine"
                          />
                        </td>
                        <td>
                          <span v-if="item.Smeta.allotted_price" class="d-flex">
                            <Format_numbers
                              :number="item.Smeta.allotted_price"
                              class="mx-1"
                            />
                            сўм
                          </span>
                          <span v-else>бириктирилмаган</span>
                        </td>
                        <td>{{ item.Smeta.muddat }} кун</td>
                        <td>
                          {{ item.Smeta.comment }}
                          <hr class="m-0" />
                          {{ item.Smeta.comment_prorap }}
                        </td>
                        <td>
                          {{
                            new Date(item.Smeta.start_date)
                              .toLocaleDateString({
                                year: "numeric",
                                month: "numeric",
                                day: "numeric",
                              })
                              .slice(0, 10) +
                            " | " +
                            new Date(item.Smeta.end_date)
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
                  <Data_notfound v-if="request5 == ''" />
                </div>
                <nav
                  aria-label="Page navigation example"
                  class="mt-2"
                  v-if="request5 != ''"
                >
                  <ul class="pagination pagination-sm justify-content-end mb-0">
                    <li class="page-item">
                      <select
                        class="form-control form-control-sm form-select mx-1"
                        v-model="request_limit5"
                        @change="get_request('request5')"
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
                        @click="get_request('request5')"
                      >
                        <i class="fa-solid fa-rotate"></i>
                      </button>
                    </li>
                    <li class="page-item">
                      <button
                        class="page-link"
                        @click="
                          request_page5--;
                          get_request('request5');
                        "
                        :disabled="request_page5 == 0"
                      >
                        <i class="fa-solid fa-angle-left text-dark"></i>
                      </button>
                    </li>
                    <li class="page-item">
                      <button class="page-link text-dark" disabled>
                        {{ request_page5 + 1 }}
                      </button>
                    </li>
                    <li class="page-item">
                      <button
                        class="page-link"
                        @click="
                          request_page5++;
                          get_request('request5');
                        "
                        :disabled="request_page5 == request_pages5"
                      >
                        <i class="fa-solid fa-angle-right text-dark"></i>
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
              <div v-else>
                <div class="table-responsive mt-3" style="overflow: auto">
                  <table
                    class="table table-sm table-hover smeta work"
                    style="min-width: 1200px"
                  >
                    <thead>
                      <tr>
                        <th style="width: 5%">ШНК</th>
                        <th style="width: 15%">Номи</th>
                        <th style="width: 10%">Ўлчов бирлиги</th>
                        <th style="width: 15%">Ҳажм</th>
                        <th style="width: 10%">Ишчи учун ажратилган вақт</th>
                        <th style="width: 10%">Машина учун ажратилган вақт</th>
                        <th style="width: 10%">Ажратилган сумма</th>
                        <th style="width: 5%">Муддат</th>
                        <th style="width: 10%">Изох</th>
                        <th style="width: 10%">Сана</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in request6" :key="item">
                        <td>{{ item.Smeta.shnk }}</td>
                        <td>{{ item.Smeta.name }}</td>
                        <td>{{ item.Smeta.olchov_birligi }}</td>
                        <td>
                          <span class="d-flex">
                            <Format_numbers
                              :number="item.Smeta.quantity"
                              class="mx-1"
                            />/
                            {{
                              item.completed_quantity
                                ? item.completed_quantity
                                : 0
                            }}
                          </span>
                        </td>
                        <td>
                          <Format_numbers
                            :number="item.Smeta.allotted_time_for_worker"
                          />
                        </td>
                        <td>
                          <Format_numbers
                            :number="item.Smeta.allotted_time_for_machine"
                          />
                        </td>
                        <td>
                          <span v-if="item.Smeta.allotted_price" class="d-flex">
                            <Format_numbers
                              :number="item.Smeta.allotted_price"
                              class="mx-1"
                            />
                            сўм
                          </span>
                          <span v-else>бириктирилмаган</span>
                        </td>
                        <td>{{ item.Smeta.muddat }} кун</td>
                        <td>
                          {{ item.Smeta.comment }}
                          <hr class="m-0" />
                          {{ item.Smeta.comment_prorap }}
                        </td>
                        <td>
                          {{
                            new Date(item.Smeta.start_date)
                              .toLocaleDateString({
                                year: "numeric",
                                month: "numeric",
                                day: "numeric",
                              })
                              .slice(0, 10) +
                            " | " +
                            new Date(item.Smeta.end_date)
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
                  <Data_notfound v-if="request6 == ''" />
                </div>
                <nav
                  aria-label="Page navigation example"
                  class="mt-2"
                  v-if="request6 != ''"
                >
                  <ul class="pagination pagination-sm justify-content-end mb-0">
                    <li class="page-item">
                      <select
                        class="form-control form-control-sm form-select mx-1"
                        v-model="request_limit6"
                        @change="get_request('request6')"
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
                        @click="get_request('request6')"
                      >
                        <i class="fa-solid fa-rotate"></i>
                      </button>
                    </li>
                    <li class="page-item">
                      <button
                        class="page-link"
                        @click="
                          request_page6--;
                          get_request('request6');
                        "
                        :disabled="request_page6 == 0"
                      >
                        <i class="fa-solid fa-angle-left text-dark"></i>
                      </button>
                    </li>
                    <li class="page-item">
                      <button class="page-link text-dark" disabled>
                        {{ request_page6 + 1 }}
                      </button>
                    </li>
                    <li class="page-item">
                      <button
                        class="page-link"
                        @click="
                          request_page6++;
                          get_request('request6');
                        "
                        :disabled="request_page6 == request_pages6"
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
              id="supplies2"
              role="tabpanel"
              aria-labelledby="supplies2-tab"
            >
              <div class="d-flex flex-row-reverse mt-2 m-1">
                <select
                  class="form-control form-control-sm w-25"
                  v-model="filter_request_7_8"
                >
                  <option value="proche">Проче</option>
                  <option value="smeta">Смета</option>
                </select>
              </div>
              <div v-if="filter_request_7_8 == 'proche'">
                <div class="table-responsive mt-2">
                  <table
                    class="table table-sm table-hover"
                    id="proche_sorov_zakupshik"
                  >
                    <thead class="">
                      <tr>
                        <th>№</th>
                        <th>Номи</th>
                        <th>Ҳажм</th>
                        <th>Ўлчов бирлиги</th>
                        <th>Сана</th>
                        <th>Изох</th>
                        <th>Объект</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, inc) in request7" :key="item">
                        <td>
                          {{ inc + 1 }}
                        </td>
                        <td>
                          {{ item.Proche_sorovlar.name }}
                        </td>
                        <td>
                          <Format_numbers
                            :number="item.Proche_sorovlar.quantity"
                          />
                        </td>
                        <td>
                          {{ item.Proche_sorovlar.olchov_birligi }}
                        </td>
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
                        <td>
                          {{ item.Proche_sorovlar.comment }}
                        </td>
                        <td>{{ item.building }}</td>
                      </tr>
                    </tbody>
                  </table>
                  <Data_notfound v-if="request7 == ''" />
                </div>
                <nav
                  aria-label="Page navigation example"
                  class="mt-2"
                  v-if="request7 != ''"
                >
                  <ul class="pagination pagination-sm justify-content-end mb-0">
                    <li class="page-item">
                      <select
                        class="form-control form-control-sm form-select mx-1"
                        v-model="request_limit7"
                        @change="get_request('request7')"
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
                        @click="get_request('request7')"
                      >
                        <i class="fa-solid fa-rotate"></i>
                      </button>
                    </li>
                    <li class="page-item">
                      <button
                        class="page-link"
                        @click="
                          request_page7--;
                          get_request('request7');
                        "
                        :disabled="request_page7 == 0"
                      >
                        <i class="fa-solid fa-angle-left text-dark"></i>
                      </button>
                    </li>
                    <li class="page-item">
                      <button class="page-link text-dark" disabled>
                        {{ request_page7 + 1 }}
                      </button>
                    </li>
                    <li class="page-item">
                      <button
                        class="page-link"
                        @click="
                          request_page7++;
                          get_request('request7');
                        "
                        :disabled="request_page7 == request_pages7"
                      >
                        <i class="fa-solid fa-angle-right text-dark"></i>
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
              <div v-else>
                <div class="table-responsive mt-2">
                  <table class="table table-sm table-hover">
                    <thead>
                      <tr>
                        <td style="width: 10%">№</td>
                        <td style="width: 20%">Номи</td>
                        <td style="width: 20%">Ўлчов бирлиги</td>
                        <td style="width: 20%">Ҳажм</td>
                        <th style="width: 10%">Бошланиш санаси</th>
                        <td style="width: 10%">Объект</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, inc) in request8" :key="item">
                        <td>
                          {{ inc + 1 }}
                        </td>
                        <td>{{ item.product_name }}</td>
                        <td>{{ item.product_olchov_birligi }}</td>
                        <td>
                          <Format_numbers :number="item.Smeta.quantity" />
                        </td>
                        <td>
                          {{
                            new Date(item.grafik.start_date)
                              .toLocaleDateString({
                                year: "numeric",
                                month: "numeric",
                                day: "numeric",
                              })
                              .slice(0, 10)
                          }}
                        </td>
                        <td>{{ item.building }}</td>
                      </tr>
                    </tbody>
                  </table>
                  <Data_notfound v-if="request8 == ''" />
                </div>
                <nav
                  aria-label="Page navigation example"
                  class="mt-2"
                  v-if="request8 != ''"
                >
                  <ul class="pagination pagination-sm justify-content-end mb-0">
                    <li class="page-item">
                      <select
                        class="form-control form-control-sm form-select mx-1"
                        v-model="request_limit8"
                        @change="get_request('request8')"
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
                        @click="get_request('request8')"
                      >
                        <i class="fa-solid fa-rotate"></i>
                      </button>
                    </li>
                    <li class="page-item">
                      <button
                        class="page-link"
                        @click="
                          request_page8--;
                          get_request('request8');
                        "
                        :disabled="request_page8 == 0"
                      >
                        <i class="fa-solid fa-angle-left text-dark"></i>
                      </button>
                    </li>
                    <li class="page-item">
                      <button class="page-link text-dark" disabled>
                        {{ request_page8 + 1 }}
                      </button>
                    </li>
                    <li class="page-item">
                      <button
                        class="page-link"
                        @click="
                          request_page8++;
                          get_request('request8');
                        "
                        :disabled="request_page8 == request_pages8"
                      >
                        <i class="fa-solid fa-angle-right text-dark"></i>
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
  </div>
</template>

<script>
import Data_notfound from "@/utils/notfound/data_notfound.vue";
import {
  get_supplies,
  proche_s_get,
  smeta_get,
  smeta_request_get,
  transfered_products,
} from "@/utils/request/request";
import { catchError } from "@/utils/request/handle_api_err";
import Format_numbers from "@/utils/format/format_numbers.vue";

export default {
  name: "NotificationItem",
  data() {
    return {
      date: new Date().toISOString().slice(0, 10),
      request1: [],
      request_pages1: null,
      request_page1: 0,
      request_limit1: 25,
      request2: [],
      request_pages2: null,
      request_page2: 0,
      request_limit2: 25,
      filter_request_1_2: "supply",
      request3: [],
      request_pages3: null,
      request_page3: 0,
      request_limit3: 25,
      request4: [],
      request_pages4: null,
      request_page4: 0,
      request_limit4: 25,
      filter_request_3_4: "proche",
      request5: [],
      request_pages5: null,
      request_page5: 0,
      request_limit5: 25,
      request6: [],
      request_pages6: null,
      request_page6: 0,
      request_limit6: 25,
      filter_request_5_6: "wait",
      request_pages7: null,
      request_page7: 0,
      request_limit7: 25,
      request8: [],
      request7: [],
      request_pages8: null,
      request_page8: 0,
      request_limit8: 25,
      filter_request_7_8: "proche",
    };
  },
  methods: {
    get_request(e) {
      if (e == "request1") {
        get_supplies(
          0,
          false,
          "",
          0,
          "",
          "",
          "",
          this.request_page1,
          this.request_limit1,
          0,
          ""
        )
          .then((res) => {
            this.request1 = res.data.data;
            this.request_pages1 = res.data.pages;
          })
          .catch((err) => {
            catchError(err);
          });
      } else if (e == "request2") {
        transfered_products(
          "to_warehouse",
          "",
          0,
          0,
          false,
          "",
          this.request_page2,
          this.request_limit2
        )
          .then((res) => {
            this.request2 = res.data.data;

            this.request_pages2 = res.data.pages;
          })
          .catch((err) => {
            catchError(err);
          });
      } else if (e == "request3") {
        proche_s_get(
          this.request_page3,
          this.request_limit3,
          0,
          "taminotchida_proche",
          0,
          ""
        )
          .then((res) => {
            this.request3 = res.data.data;

            this.request_pages3 = res.data.pages;
          })
          .catch((err) => {
            catchError(err);
          });
      } else if (e == "request4") {
        smeta_request_get(
          this.request_page4,
          this.request_limit4,
          "",
          "wait",
          0,
          0
        )
          .then((res) => {
            this.request4 = res.data.data;

            this.request_pages4 = res.data.pages;
          })
          .catch((err) => {
            catchError(err);
          });
      } else if (e == "request5") {
        smeta_get(
          this.request_page5,
          this.request_limit5,
          "",
          "grafik",
          "wait",
          0,
          0
        )
          .then((res) => {
            this.request5 = res.data.data;

            this.request_pages5 = res.data.pages;
          })
          .catch((err) => {
            catchError(err);
          });
      } else if (e == "request6") {
        smeta_get(
          this.request_page6,
          this.request_limit6,
          "",
          "grafik",
          "re-check",
          0,
          0
        )
          .then((res) => {
            this.request6 = res.data.data;

            this.request_pages6 = res.data.pages;
          })
          .catch((err) => {
            catchError(err);
          });
      } else if (e == "request7") {
        proche_s_get(
          this.request_page7,
          this.request_limit7,
          0,
          "zakupshikda_proche",
          0,
          ""
        )
          .then((res) => {
            this.request7 = res.data.data;
            this.request_pages7 = res.data.pages;
          })
          .catch((err) => {
            catchError(err);
          });
      } else if (e == "request8") {
        smeta_request_get(
          this.request_page8,
          this.request_limit8,
          "",
          " ",
          0,
          0
        )
          .then((res) => {
            this.request8 = res.data.data;
            this.request_pages8 = res.data.pages;
          })
          .catch((err) => {
            catchError(err);
          });
      }
    },
  },
  created() {
    this.get_request("request1");
    this.get_request("request2");
    this.get_request("request3");
    this.get_request("request4");
    this.get_request("request5");
    this.get_request("request6");
    this.get_request("request7");
    this.get_request("request8");
    setInterval(() => {
      this.get_request("request1");
      this.get_request("request2");
      this.get_request("request3");
      this.get_request("request4");
      this.get_request("request5");
      this.get_request("request6");
      this.get_request("request7");
      this.get_request("request8");
    }, 60000);
  },
  computed: {
    filtering_request_5() {
      return this.request5.filter((e) => {
        let date1 = new Date(e.Smeta.end_date);
        let date2 = new Date(this.date);
        const diffTime = date1 - date2;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        console.log(diffDays);
        return diffDays <= 3;
      });
    },
    filtering_request_8() {
      return this.request8.filter((e) => {
        let date1 = new Date(e.Smeta.end_date);
        let date2 = new Date(this.date);
        const diffTime = date1 - date2;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        console.log(diffDays);
        return diffDays <= 3;
      });
    },
    count() {
      return 0;
    },
  },
  components: { Data_notfound, Format_numbers },
};
</script>

<!-- <style lang="scss" scoped>
</style> -->
