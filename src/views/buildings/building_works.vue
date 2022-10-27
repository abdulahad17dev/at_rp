<template>
  <Header_item :name="this.$route.query.name" />
  <ul
    class="nav nav-pills nav-justified nav-fill mb-3"
    id="pills-tab"
    role="tablist"
  >
    <li class="nav-item mx-1" role="presentation">
      <button
        class="btn btn-sm btn-light w-100 active"
        id="pills-home-tab"
        data-bs-toggle="pill"
        data-bs-target="#pills-home"
        type="button"
        role="tab"
        aria-controls="pills-home"
        aria-selected="true"
      >
        сметадаги ишлар
      </button>
    </li>
    <li class="nav-item mx-1" role="presentation">
      <button
        class="btn btn-sm btn-light w-100"
        id="pills-profile-tab"
        data-bs-toggle="pill"
        data-bs-target="#pills-profile"
        type="button"
        role="tab"
        aria-controls="pills-profile"
        aria-selected="false"
        @click="
          other_works.length
            ? ''
            : get_other_work(
                other_search,
                other_building_id,
                other_status,
                other_user_id,
                other_page,
                other_limit
              )
        "
      >
        сметадан ташқари ишлар
      </button>
    </li>
  </ul>
  <div class="tab-content" id="pills-tabContent">
    <div
      class="tab-pane fade show active"
      id="pills-home"
      role="tabpanel"
      aria-labelledby="pills-home-tab"
    >
      <div class="row">
        <div class="col mt-1 d-flex align-items-center">
          <span>Лимит</span>
          <select
            class="form-control form-control-sm mx-2 form-select smeta_sort"
            v-model="smeta_limit"
          >
            <option value="100">100</option>
            <option value="250">250</option>
            <option value="500">500</option>
          </select>
          <select
            class="form-control form-control-sm mx-2 form-select smeta_sort"
            v-model="smeta_status"
          >
            <option value="">барчаси</option>
            <option value="wait">кутиш</option>
            <option value="re-check">қайта-текширув</option>
            <option value="confirmed">тасдиқланган</option>
          </select>
        </div>
        <div class="col mt-2 d-flex align-items-center justify-content-end">
          <span>Қидириш: </span>
          <div class="input-group input-group-sm mx-2">
            <input
              type="search"
              v-model="smeta_search"
              class="form-control form-control-sm"
            />
          </div>
        </div>
      </div>
      <div class="table-responsive mt-3" style="overflow: auto">
        <table
          class="table table-sm table-hover smeta"
          v-if="smeta_works != ''"
        >
          <tbody v-for="item in smeta_works" :key="item">
            <tr
              v-if="!item.Smeta.grafik_id"
              class="bg-dark text-white text-center"
            >
              <td colspan="11">{{ item.Smeta.name }}</td>
            </tr>
            <tr
              v-if="
                !types.find((e) => {
                  return e == item.Smeta.type;
                }) && item.Smeta.grafik_id
              "
              class="text-center"
            >
              <td colspan="11">{{ item.Smeta.name }}</td>
            </tr>
            <tr v-if="item.Smeta.type == 'grafik'" class="grafik">
              <td style="width: 5%">{{ item.Smeta.shnk }}</td>
              <td style="width: 20%">{{ item.Smeta.name }}</td>
              <td style="width: 5%">{{ item.Smeta.olchov_birligi }}</td>
              <td style="width: 10%">
                {{ new Intl.NumberFormat().format(item.Smeta.quantity) }}
              </td>
              <td style="width: 10%">
                {{ item.Smeta.allotted_time_for_worker }}
              </td>
              <td style="width: 10%">
                {{ item.Smeta.allotted_time_for_machine }}
              </td>
              <td style="width: 10%">
                <span v-if="item.Smeta.alotted_price">{{
                  item.Smeta.alotted_price
                }}</span>
                <span v-else>0</span> сўм
              </td>
              <td style="width: 5%">{{ item.Smeta.muddat }} кун</td>
              <td style="width: 10%">
                {{
                  new Date(item.Smeta.start_date)
                    .toLocaleDateString("en-us", {
                      year: "numeric",
                      month: "numeric",
                      day: "numeric",
                    })
                    .slice(0, 10)
                }}
              </td>
              <td style="width: 10%">
                {{
                  new Date(item.Smeta.end_date)
                    .toLocaleDateString("en-us", {
                      year: "numeric",
                      month: "numeric",
                      day: "numeric",
                    })
                    .slice(0, 10)
                }}
              </td>
              <td style="width: 5%">
                <button
                  v-if="
                    item.Smeta.status !== 'removed' &&
                    item.Smeta.status !== 'finished' &&
                    role == 'pto'
                  "
                  class="btn btn-danger btn-sm"
                  @click="$emit('remove_smeta', item.Smeta.id)"
                  id="remove_smeta"
                >
                  <i class="fa-solid fa-circle-xmark"></i>
                </button>
                <span
                  v-if="item.Smeta.status == 'removed'"
                  class="badge rounded-pill bg-danger"
                  >ўчирилган</span
                ><span
                  v-else-if="item.Smeta.status == 'finished'"
                  class="badge rounded-pill bg-success"
                  >якунланган</span
                >
              </td>
            </tr>
            <tr
              v-if="item.Smeta.type == 'allotted_time_for_worker'"
              class="allotted_time_for_worker"
            >
              <td></td>
              <td>{{ item.Smeta.name }}</td>
              <td>{{ item.Smeta.olchov_birligi }}</td>
              <td>{{ item.Smeta.norm }}</td>
              <td>{{ new Intl.NumberFormat().format(item.Smeta.quantity) }}</td>
              <td colspan="6">
                <span v-if="item.Smeta.alotted_price">
                  {{ item.Smeta.alotted_price }}
                </span>
                <span v-else>0</span> сўм
              </td>
            </tr>
            <tr
              v-if="item.Smeta.type == 'allotted_time_for_machine'"
              class="allotted_time_for_machine"
            >
              <td></td>
              <td>{{ item.Smeta.name }}</td>
              <td>{{ item.Smeta.olchov_birligi }}</td>
              <td>{{ item.Smeta.norm }}</td>
              <td>{{ new Intl.NumberFormat().format(item.Smeta.quantity) }}</td>
              <td colspan="6">
                <span v-if="item.Smeta.alotted_price">
                  {{ item.Smeta.alotted_price }}
                </span>
                <span v-else>0</span> сўм
              </td>
            </tr>
            <tr v-if="item.Smeta.type == 'product'" class="product">
              <td></td>
              <td>{{ item.product_name }}</td>
              <td>{{ item.product_olchov_birligi }}</td>
              <td>{{ item.Smeta.norm }}</td>
              <td>{{ new Intl.NumberFormat().format(item.Smeta.quantity) }}</td>
              <td colspan="6">
                <span v-if="item.Smeta.alotted_price">
                  {{ item.Smeta.alotted_price }}
                </span>
                <span v-else>0</span> сўм
              </td>
            </tr>
          </tbody>
        </table>
        <Data_notfound v-if="smeta_works == ''" />
      </div>

      <nav
        aria-label="Page navigation example"
        class="mt-2"
        v-if="smeta_works != ''"
      >
        <ul class="pagination pagination-sm justify-content-end">
          <li class="page-item">
            <button
              type="button"
              class="page-link"
              @click="
                get_smeta_work(
                  smeta_page,
                  smeta_limit,
                  smeta_search,
                  smeta_type,
                  smeta_status,
                  smeta_building_id
                )
              "
            >
              <i class="fa-solid fa-rotate"></i>
            </button>
          </li>
          <li class="page-item">
            <button
              class="page-link"
              @click="smeta_page = 0"
              :disabled="smeta_page == 0"
            >
              <i class="fa-solid fa-angles-left text-dark"></i>
            </button>
          </li>
          <li class="page-item">
            <button
              class="page-link"
              @click="smeta_page--"
              :disabled="smeta_page == 0"
            >
              <i class="fa-solid fa-angle-left text-dark"></i>
            </button>
          </li>
          <li class="page-item">
            <button class="page-link text-dark" disabled>
              {{ smeta_page + 1 }}
            </button>
          </li>
          <li class="page-item">
            <button
              class="page-link"
              @click="smeta_page++"
              :disabled="smeta_page == smeta_pages - 1"
            >
              <i class="fa-solid fa-angle-right text-dark"></i>
            </button>
          </li>
          <li class="page-item">
            <button
              class="page-link"
              @click="smeta_page = smeta_pages - 1"
              :disabled="smeta_page == smeta_pages - 1"
            >
              <i class="fa-solid fa-angles-right text-dark"></i>
            </button>
          </li>
        </ul>
      </nav>
    </div>
    <div
      class="tab-pane fade"
      id="pills-profile"
      role="tabpanel"
      aria-labelledby="pills-profile-tab"
    >
      <div class="row">
        <div class="col mt-1 d-flex align-items-center">
          <span>Лимит</span>
          <select
            class="form-control form-control-sm mx-2 form-select smeta_sort"
            v-model="other_limit"
          >
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
          <select
            class="form-control form-control-sm mx-2 form-select smeta_sort"
            v-model="other_status"
          >
            <option value="">барчаси</option>
            <option value="wait">кутиш</option>
            <option value="re-check">қайта-текширув</option>
            <option value="confirmed">тасдиқланган</option>
          </select>
        </div>
        <div class="col mt-2 d-flex align-items-center justify-content-end">
          <span>Қидириш: </span>
          <div class="input-group input-group-sm mx-2">
            <input
              type="search"
              v-model="other_search"
              class="form-control form-control-sm"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header_item from "@/components/header/header_item.vue";
import { other_works, smeta_get } from "@/utils/request/request";
import { catchError } from "@/utils/request/handle_api_err";
import Data_notfound from "@/utils/notfound/data_notfound.vue";

export default {
  name: "BuildingWorks",
  components: { Header_item, Data_notfound },
  data() {
    return {
      types: [
        "grafik",
        "allotted_time_for_worker",
        "allotted_time_for_machine",
        "product",
      ],
      smeta_building_id: this.$route.query.id,
      smeta_limit: 100,
      smeta_page: 0,
      smeta_pages: null,
      smeta_search: "",
      smeta_status: "wait",
      smeta_type: "grafik",
      smeta_works: [],
      other_search: "",
      other_building_id: this.$route.query.id,
      other_status: "wait",
      other_user_id: 0,
      other_page: 0,
      other_limit: 25,
      other_pages: null,
      other_works: [],
    };
  },
  watch: {
    smeta_limit(e) {
      this.smeta_page = 0;
      this.get_smeta_work(
        this.smeta_page,
        e,
        this.smeta_search,
        this.smeta_type,
        this.smeta_status,
        this.smeta_building_id
      );
    },
    smeta_page(e) {
      this.get_smeta_work(
        e,
        this.smeta_limit,
        this.smeta_search,
        this.smeta_type,
        this.smeta_status,
        this.smeta_building_id
      );
      document.getElementById("scroll").scrollTop = 0;
    },
    smeta_search(e) {
      this.smeta_page = 0;
      this.get_smeta_work(
        this.smeta_page,
        this.smeta_limit,
        this.smeta_search,
        this.smeta_type,
        e,
        this.smeta_building_id
      );
    },
    smeta_status(e) {
      this.smeta_page = 0;
      this.get_smeta_work(
        this.smeta_page,
        this.smeta_limit,
        this.smeta_search,
        this.smeta_type,
        e,
        this.smeta_building_id
      );
    },
    other_search(e) {
      this.other_page = 0;
      this.get_other_work(
        e,
        this.other_building_id,
        this.other_status,
        this.other_user_id,
        this.other_page,
        this.other_limit
      );
    },
    other_status(e) {
      this.other_page = 0;
      this.get_other_work(
        this.other_search,
        this.other_building_id,
        e,
        this.other_user_id,
        this.other_page,
        this.other_limit
      );
    },
  },
  methods: {
    get_smeta_work(page, limit, search, type, status, building_id) {
      this.$store.dispatch("setLoading", { isLoading: true });
      smeta_get(page, limit, search, type, status, building_id)
        .then((res) => {
          this.smeta_works = res.data.data;
          this.smeta_pages = res.data.pages;
          this.$store.dispatch("setLoading", { isLoading: false });
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
        });
    },
    get_other_work(search, building_id, status, user_id, page, limit) {
      this.$store.dispatch("setLoading", { isLoading: true });
      other_works(search, building_id, status, user_id, page, limit)
        .then((res) => {
          this.other_works = res.data.data;
          this.other_pages = res.data.pages;
          this.$store.dispatch("setLoading", { isLoading: false });
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
        });
    },
  },
  created() {
    this.get_smeta_work(
      this.smeta_page,
      this.smeta_limit,
      this.smeta_search,
      this.smeta_type,
      this.smeta_status,
      this.smeta_building_id
    );
  },
};
</script>

<style lang="scss" scoped>
.col select {
  width: 80px;
  height: 30px;
}
.col select:last-child {
  width: 130px;
  height: 30px;
}

.col .input-group {
  width: 200px;
}

@media (max-width: 632px) {
  .row {
    display: block;
  }
  .row .col .input-group {
    width: 600px;
  }
  .row .col select {
    width: 50%;
  }
}

table {
  min-width: 2000px;
  width: 100%;
  zoom: 65%;
}

.table-responsive {
  max-height: 63vh;
  min-height: 63vh;
}

@media (max-width: 500px) {
  .table-responsive {
    max-height: 100vh;
  }
}
</style>
