<template>
  <button
    type="button"
    class="btn btn-dark btn-floating mx-1 position-relative"
    data-mdb-toggle="modal"
    data-mdb-target="#notification"
  >
    <span
      style="position: absolute"
      class="top-0 start-100 translate-middle badge rounded-pill badge-danger"
    >
      99+
      <span class="visually-hidden">unread messages</span>
    </span>
    <i class="fa-solid fa-bell fa-shake"></i>
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
              <div class="table-responsive mt-3">
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
                    <tr v-for="(item, inc) in request1 || []" :key="item">
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
                          item.Supplies.status == true ? item.warehouseman : ""
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
                      @change="get_request1()"
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
                      @click="get_request1()"
                    >
                      <i class="fa-solid fa-rotate"></i>
                    </button>
                  </li>
                  <li class="page-item">
                    <button
                      class="page-link"
                      @click="
                        request_page1--;
                        get_request1();
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
                        get_request1();
                      "
                      :disabled="request_page1 == request_pages1"
                    >
                      <i class="fa-solid fa-angle-right text-dark"></i>
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
            <div
              class="tab-pane fade"
              id="supplies"
              role="tabpanel"
              aria-labelledby="supplies-tab"
            >
              2
            </div>
            <div
              class="tab-pane fade show"
              id="product2"
              role="tabpanel"
              aria-labelledby="product2-tab"
            >
              3
            </div>
            <div
              class="tab-pane fade"
              id="supplies2"
              role="tabpanel"
              aria-labelledby="supplies2-tab"
            >
              4
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Data_notfound from "@/utils/notfound/data_notfound.vue";
import { get_supplies } from "@/utils/request/request";
import { catchError } from "@/utils/request/handle_api_err";
import Format_numbers from "@/utils/format/format_numbers.vue";

export default {
  name: "NotificationItem",
  data() {
    return {
      request1: [],
      request_pages1: null,
      request_page1: 0,
      request_limit1: 25,
    };
  },
  watch: {},
  methods: {
    get_request1() {
      this.$store.dispatch("setLoading", { isLoading: true });
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
          this.$store.dispatch("setLoading", { isLoading: false });
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
        });
    },
  },
  created() {
    this.get_request1();
    setTimeout(() => {
      this.get_request1();
    }, 60000);
  },
  components: { Data_notfound, Format_numbers },
};
</script>

<!-- <style lang="scss" scoped>
</style> -->
