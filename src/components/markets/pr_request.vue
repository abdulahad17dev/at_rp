<template>
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
    <div class="table-responsive mt-3">
      <table class="table table-sm table-hover">
        <thead class="">
          <tr>
            <th style="width: 7%">№</th>
            <th style="width: 15%">Номи</th>
            <th style="width: 15%">Ҳажм</th>
            <th style="width: 15%">Ўлчов бирлиги</th>
            <th style="width: 15%">Сана</th>
            <th style="width: 15%">Изох</th>
            <th style="width: 8%">
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
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, inc) in product_requests || []" :key="item">
            <td>{{ inc + 1 }}</td>
            <td>
              {{ item.Proche_sorovlar.name }}
            </td>
            <td
              @click="show_quantity(inc)"
              style="cursor: pointer; user-select: none"
            >
              {{
                new Intl.NumberFormat().format(item.Proche_sorovlar.quantity) +
                " (олинган ҳажм: " +
                (item.sum_supply_by_b_a_quantity + item.sum_supply_quantity) +
                ")"
              }}
              <span
                class="text-primary"
                style="display: none"
                :id="`show_${inc}`"
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
                  {{ new Intl.NumberFormat().format(item.sum_supply_quantity) }}
                </p>
              </span>
            </td>
            <td>{{ item.Proche_sorovlar.olchov_birligi }}</td>
            <td>
              {{
                new Date(item.Proche_sorovlar.time)
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
            <td>{{ item.Proche_sorovlar.comment }}</td>
            <td>{{ item.building }}</td>
            <td>
              <button
                class="btn btn-sm btn-success"
                data-bs-toggle="modal"
                data-bs-target="#accept_proche_sorov"
                @click="get_item(item.Proche_sorovlar)"
              >
                <i class="fa-solid fa-circle-check text-white"></i>
              </button>
            </td>
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
        <li class="page-item">
          <button
            type="button"
            class="page-link"
            @click="
              get_proche_s(page, limit, building_id, status, user_id, search)
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
    id="accept_proche_sorov"
    tabindex="-1"
    aria-labelledby="accept_proche_sorovLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="accept_proche_sorovLabel">
            {{ proche_name }}ни қабул қилиш
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            id="supply_add"
          ></button>
        </div>
        <form @submit.prevent="take">
          <div class="modal-body">
            <div class="row gap-2">
              <div class="col-10 mx-auto">
                <label for="quantity"> Ҳажм: ({{ proche_quantity }})</label>
                <div class="input-group input-group-sm">
                  <input
                    type="number"
                    id="quantity"
                    step="any"
                    class="form-control"
                    v-model="body.quantity"
                    placeholder="Ҳажм"
                    min="1"
                    required
                  />
                  <span class="input-group-text bg-white">{{
                    proche_olchov_birligi
                  }}</span>
                </div>
              </div>
              <div class="col-10 mx-auto">
                <label for="price">
                  Нарх:
                  <span class="text-primary"
                    >{{ new Intl.NumberFormat().format(body.price) }} сўм</span
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
              <div class="col-10 mx-auto" v-if="body.type == 'proche'">
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
                  <option value="naxt_proche">нахт</option>
                  <option value="qarz_proche">қарз</option>
                  <option value="proche">счёт</option>
                </select>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="submit"
              class="btn btn-outline-primary btn-sm"
              id="supply_disabled"
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
</template>

<script>
import Data_notfound from "@/utils/notfound/data_notfound.vue";
import {
  building_get,
  proche_s_get,
  take_supply_proche,
} from "@/utils/request/request";
import {
  catchError,
  position_err,
  success,
} from "@/utils/request/handle_api_err";
export default {
  name: "Pr_request",
  data() {
    return {
      limit: 25,
      page: 0,
      pages: null,
      product_requests: [],
      building_id: 0,
      user_id: 0,
      search: "",
      status: "taminotchida_proche",
      page_building: 0,
      pages_building: null,
      limit_building: 25,
      search_building: "",
      buildings: [],
      text_building: "объектлар",
      proche_name: "",
      proche_olchov_birligi: "",
      proche_quantity: "",
      body: {
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
      },
    };
  },
  watch: {
    limit(e) {
      this.page = 0;
      this.get_proche_s(
        this.page,
        e,
        this.building_id,
        this.status,
        this.user_id,
        this.search
      );
    },
    page(e) {
      this.get_proche_s(
        e,
        this.limit,
        this.building_id,
        this.status,
        this.user_id,
        this.search
      );
      document.getElementById("scroll").scrollTop = 0;
    },
    search(e) {
      this.page = 0;
      if (e.length > 0) {
        this.get_proche_s(
          this.page,
          this.limit,
          this.building_id,
          this.status,
          this.user_id,
          this.search
        );
      } else if (e.length == 0) {
        this.get_proche_s(
          this.page,
          this.limit,
          this.building_id,
          this.status,
          this.user_id,
          this.search
        );
        this.page = 0;
      }
    },
    building_id(e) {
      this.page = 0;
      this.get_proche_s(
        this.page,
        this.limit,
        e,
        this.status,
        this.user_id,
        this.search
      );
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
    get_proche_s(page, limit, building_id, status, user_id, search) {
      this.$store.dispatch("setLoading", { isLoading: true });

      proche_s_get(page, limit, building_id, status, user_id, search)
        .then((res) => {
          this.product_requests = res.data.data;
          this.pages = res.data.pages;
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
      this.proche_name = e.name;
      this.proche_olchov_birligi = e.olchov_birligi;
      this.proche_quantity = e.quantity;
      this.body.building_id = e.building_id;
      this.body.related_id = e.id;
    },
    onlyNumber($event) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
        $event.preventDefault();
      }
    },
    take() {
      document.getElementById("supply_disabled").disabled = true;
      this.$store.dispatch("setLoading", { isLoading: true });
      take_supply_proche(this.body)
        .then((res) => {
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("supply_add").click();
          document.getElementById("supply_disabled").disabled = false;
          success(res).then(() => {
            this.get_proche_s(
              this.page,
              this.limit,
              this.building_id,
              this.status,
              this.user_id,
              this.search
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
          document.getElementById("supply_disabled").disabled = false;
        });
    },
    show_quantity(e) {
      let show = document.getElementById(`show_${e}`);
      if (show.style.display == "none") {
        show.style.display = "block";
      } else {
        show.style.display = "none";
      }
    },
  },
  created() {
    this.get_proche_s(
      this.page,
      this.limit,
      this.building_id,
      this.status,
      this.user_id,
      this.search
    );
  },
  components: { Data_notfound },
};
</script>

<style lang="scss" scoped>
.table-responsive {
  max-height: 87vh;
  min-height: 87vh;
}

.request {
  zoom: 75%;
}

@media (max-width: 500px) {
  .table-responsive {
    max-height: 115vh;
    min-height: 115vh;
  }
}
table {
  min-width: 1150px;
  width: 100%;
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
</style>
