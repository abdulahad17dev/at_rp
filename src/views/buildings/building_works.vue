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
        @click="
          (confirm_body.type = 'smeta_work'), (recheck_body.type = 'smeta_work')
        "
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
              );
          (confirm_body.type = 'other_work'),
            (recheck_body.type = 'other_work');
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
        <table class="table table-sm table-hover smeta work">
          <thead>
            <tr>
              <th style="width: 5%">ШНК</th>
              <th style="width: 20%">Номи</th>
              <th style="width: 5%">Ўлчов бирлиги</th>
              <th style="width: 10%">Ҳажм</th>
              <th style="width: 10%">Ишчи учун ажратилган вақт</th>
              <th style="width: 10%">Машина учун ажратилган вақт</th>
              <th style="width: 10%">Сумма</th>
              <th style="width: 5%">Муддат</th>
              <th style="width: 10%">Бошлаш сана</th>
              <th style="width: 10%">Тугаш сана</th>
              <th style="width: 5%"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in smeta_works" :key="item">
              <td>{{ item.Smeta.shnk }}</td>
              <td>{{ item.Smeta.name }}</td>
              <td>{{ item.Smeta.olchov_birligi }}</td>
              <td>
                {{ new Intl.NumberFormat().format(item.Smeta.quantity) }}
              </td>
              <td>
                {{ item.Smeta.allotted_time_for_worker }}
              </td>
              <td>
                {{ item.Smeta.allotted_time_for_machine }}
              </td>
              <td>
                <span v-if="item.Smeta.alotted_price">{{
                  item.Smeta.alotted_price
                }}</span>
                <span v-else>0</span> сўм
              </td>
              <td>{{ item.Smeta.muddat }} кун</td>
              <td>
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
              <td>
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
              <td>
                <button
                  class="btn btn-sm btn-success"
                  v-if="item.Smeta.status == 'wait'"
                  @click="work_id = item.Smeta.id"
                  data-bs-toggle="modal"
                  data-bs-target="#confirm_modal"
                >
                  <i class="fa-solid fa-circle-check"></i>
                </button>
                <button
                  class="btn btn-sm btn-primary mx-1"
                  v-if="
                    item.Smeta.status == 'wait' ||
                    item.Smeta.status == 're-check'
                  "
                  @click="work_id = item.Smeta.id"
                  data-bs-toggle="modal"
                  data-bs-target="#recheck_modal"
                >
                  <i class="fa-solid fa-rotate"></i>
                </button>
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
      <div class="table-responsive mt-3">
        <table class="table table-sm table-hover smeta other_work">
          <thead>
            <tr>
              <th style="width: 20%">Номи</th>
              <th style="width: 20%">Ўлчов бирлиги</th>
              <th style="width: 20%">Ҳажм</th>
              <th style="width: 20%">Сана</th>
              <th style="width: 20%"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in other_works" :key="item">
              <td>{{ item.Other_works.name }}</td>
              <td>{{ item.Other_works.olchov_birligi }}</td>
              <td>{{ item.Other_works.quantity }}</td>
              <td>
                {{
                  new Date(item.Other_works.time)
                    .toLocaleDateString("en-us", {
                      year: "numeric",
                      month: "numeric",
                      day: "numeric",
                    })
                    .slice(0, 10)
                }}
              </td>
              <td>
                <button
                  class="btn btn-sm btn-success"
                  v-if="item.Other_works.status == 'wait'"
                  @click="work_id = item.Other_works.id"
                  data-bs-toggle="modal"
                  data-bs-target="#confirm_modal"
                >
                  <i class="fa-solid fa-circle-check"></i>
                </button>
                <button
                  class="btn btn-sm btn-primary mx-1"
                  v-if="
                    item.Other_works.status == 'wait' ||
                    item.Other_works.status == 're-check'
                  "
                  @click="work_id = item.Other_works.id"
                  data-bs-toggle="modal"
                  data-bs-target="#recheck_modal"
                >
                  <i class="fa-solid fa-rotate"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <Data_notfound v-if="other_works == ''" />
      </div>
      <nav
        aria-label="Page navigation example"
        class="mt-2"
        v-if="other_works != ''"
      >
        <ul class="pagination pagination-sm justify-content-end">
          <li class="page-item">
            <button
              type="button"
              class="page-link"
              @click="
                get_other_work(
                  other_search,
                  other_building_id,
                  other_status,
                  other_user_id,
                  other_page,
                  other_limit
                )
              "
            >
              <i class="fa-solid fa-rotate"></i>
            </button>
          </li>
          <li class="page-item">
            <button
              class="page-link"
              @click="other_page = 0"
              :disabled="other_page == 0"
            >
              <i class="fa-solid fa-angles-left text-dark"></i>
            </button>
          </li>
          <li class="page-item">
            <button
              class="page-link"
              @click="other_page--"
              :disabled="other_page == 0"
            >
              <i class="fa-solid fa-angle-left text-dark"></i>
            </button>
          </li>
          <li class="page-item">
            <button class="page-link text-dark" disabled>
              {{ other_page + 1 }}
            </button>
          </li>
          <li class="page-item">
            <button
              class="page-link"
              @click="other_page++"
              :disabled="other_page == other_pages - 1"
            >
              <i class="fa-solid fa-angle-right text-dark"></i>
            </button>
          </li>
          <li class="page-item">
            <button
              class="page-link"
              @click="other_page = other_pages - 1"
              :disabled="other_page == other_pages - 1"
            >
              <i class="fa-solid fa-angles-right text-dark"></i>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  </div>

  <div
    class="modal fade"
    id="confirm_modal"
    tabindex="-1"
    aria-labelledby="confirm_modalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="confirm_modalLabel">Тасдиқлаш</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            id="close"
          ></button>
        </div>
        <form @submit.prevent="confirm">
          <div class="modal-body">
            <div class="row gap-2">
              <div class="col-10 mx-auto">
                <div class="form-group">
                  <label for="file">Файл юклаш: </label>
                  <input
                    type="file"
                    class="form-control form-control-sm"
                    id="file"
                  />
                </div>
              </div>
              <div class="col-10 mx-auto">
                <div class="form-group">
                  <label for="comment">Изох: </label>
                  <textarea
                    v-model="confirm_body.comment"
                    class="form-control form-control-sm"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="submit"
              class="btn btn-outline-primary btn-sm"
              id="confirm_d"
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
  <div
    class="modal fade"
    id="recheck_modal"
    tabindex="-1"
    aria-labelledby="recheck_modalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="recheck_modalLabel">Қайта текширув</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            id="close2"
          ></button>
        </div>
        <form @submit.prevent="recheck">
          <div class="modal-body">
            <div class="row gap-2">
              <div class="col-10 mx-auto">
                <div class="form-group">
                  <label for="file">Файл юклаш: </label>
                  <input
                    type="file"
                    class="form-control form-control-sm"
                    id="file2"
                  />
                </div>
              </div>
              <div class="col-10 mx-auto">
                <div class="form-group">
                  <label for="date">Қайта текширув санаси: </label>
                  <input
                    type="date"
                    id="date"
                    class="form-control form-control-sm"
                    v-model="recheck_body.time_to_recheck"
                    required
                  />
                </div>
              </div>
              <div class="col-10 mx-auto">
                <div class="form-group">
                  <label for="comment">Изох: </label>
                  <textarea
                    required
                    v-model="recheck_body.comment"
                    class="form-control form-control-sm"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="submit"
              class="btn btn-outline-primary btn-sm"
              id="recheck_d"
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
import Header_item from "@/components/header/header_item.vue";
import {
  other_works,
  smeta_get,
  work_confirmation,
} from "@/utils/request/request";
import { catchError, success } from "@/utils/request/handle_api_err";
import Data_notfound from "@/utils/notfound/data_notfound.vue";

export default {
  name: "BuildingWorks",
  components: { Header_item, Data_notfound },
  data() {
    return {
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
      work_id: null,
      confirm_body: {
        type: "smeta_work",
        status: true,
        file: "",
        comment: "",
        time_to_recheck: "",
        attached_price: "",
      },
      recheck_body: {
        type: "smeta_work",
        status: false,
        file: "",
        comment: "",
        time_to_recheck: "",
        attached_price: "",
      },
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
    confirm() {
      let file = document.getElementById("file").files[0];
      if (file) {
        this.confirm_body.file = file;
      } else {
        this.confirm_body.file = "";
      }
      let data = new FormData();
      data.append("type", this.confirm_body.type);
      data.append("status", this.confirm_body.status);
      data.append("file", this.confirm_body.file);
      data.append("comment", this.confirm_body.comment);
      data.append("time_to_recheck", this.confirm_body.time_to_recheck);
      data.append("attached_price", this.confirm_body.attached_price);
      document.getElementById("confirm_d").disabled = true;
      this.$store.dispatch("setLoading", { isLoading: true });
      work_confirmation(this.work_id, data)
        .then((res) => {
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("close").click();
          document.getElementById("confirm_d").disabled = false;
          success(res).then(() => {
            if (this.confirm_body.type == "smeta_work") {
              this.get_smeta_work(
                this.smeta_page,
                this.smeta_limit,
                this.smeta_search,
                this.smeta_type,
                this.smeta_status,
                this.smeta_building_id
              );
            } else {
              this.get_other_work(
                this.other_search,
                this.other_building_id,
                this.other_status,
                this.other_user_id,
                this.other_page,
                this.other_limit
              );
            }
          });
          this.confirm_body.comment = "";
          this.confirm_body.file = "";
          document.getElementById("file").value = null;
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("confirm_d").disabled = false;
        });
    },
    recheck() {
      let file = document.getElementById("file2").files[0];
      if (file) {
        this.recheck_body.file = file;
      } else {
        this.recheck_body.file = "";
      }
      let data = new FormData();
      data.append("type", this.recheck_body.type);
      data.append("status", this.recheck_body.status);
      data.append("file", this.recheck_body.file);
      data.append("comment", this.recheck_body.comment);
      data.append("time_to_recheck", this.recheck_body.time_to_recheck);
      data.append("attached_price", this.recheck_body.attached_price);
      document.getElementById("recheck_d").disabled = true;
      this.$store.dispatch("setLoading", { isLoading: true });
      work_confirmation(this.work_id, data)
        .then((res) => {
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("close2").click();
          document.getElementById("recheck_d").disabled = false;
          success(res).then(() => {
            if (this.confirm_body.type == "smeta_work") {
              this.get_smeta_work(
                this.smeta_page,
                this.smeta_limit,
                this.smeta_search,
                this.smeta_type,
                this.smeta_status,
                this.smeta_building_id
              );
            } else {
              this.get_other_work(
                this.other_search,
                this.other_building_id,
                this.other_status,
                this.other_user_id,
                this.other_page,
                this.other_limit
              );
            }
          });
          this.recheck_body.comment = "";
          this.recheck_body.file = "";
          document.getElementById("file2").value = null;
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("recheck_d").disabled = false;
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

table.work {
  min-width: 1900px;
  width: 100%;
  zoom: 75%;
}

table.other_work {
  min-width: 1000px;
  width: 100%;
  zoom: 75%;
}

.table-responsive {
  max-height: 60vh;
  min-height: 60vh;
}

@media (max-width: 500px) {
  .table-responsive {
    max-height: 78vh;
    min-height: 78vh;
  }
}
</style>
