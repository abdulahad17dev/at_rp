<template>
  <div class="row row_building" v-if="role == 'admin'">
    <div
      class="col-md-4 col-sm-6 col-lg-4 col-xxl-4 my-1"
      v-for="(item, inc) in data"
      :key="item"
    >
      <div
        class="card"
        :class="
          item.smeta_work_end_date != null
            ? date < item.smeta_work_end_date &&
              date_sort(item.smeta_work_end_date) > 5
              ? 'success'
              : date < item.smeta_work_end_date &&
                date_sort(item.smeta_work_end_date) <= 5 &&
                date_sort(item.smeta_work_end_date) >= 3
              ? 'warning'
              : 'danger'
            : 'dark'
        "
      >
        <div class="card-body text-center">
          <span class="float-start badge bg-primary">{{ inc + 1 }}</span>
          <h5 class="card-title text-center mb-0">
            <span class="descinline">
              {{ shorttext(item.Buildings.name) }}
            </span>
            <span class="descempty"> {{ item.Buildings.name }} </span>
            <span
              class="text-primary"
              style="cursor: pointer"
              @click="toggler($event)"
              v-if="item.Buildings.name.length > 15"
            >
              яна</span
            >
          </h5>
          <hr
            class="mt-2 mb-2"
            :class="
              item.smeta_work_end_date != null
                ? date < item.smeta_work_end_date &&
                  date_sort(item.smeta_work_end_date) > 5
                  ? 'success'
                  : date < item.smeta_work_end_date &&
                    date_sort(item.smeta_work_end_date) <= 5 &&
                    date_sort(item.smeta_work_end_date) >= 3
                  ? 'warning'
                  : 'danger'
                : 'dark'
            "
          />
          <h6><b>Манзил: </b> {{ item.Buildings.address }}</h6>
          <h6>
            <b>Бошлаш санаси: </b>
            {{
              new Date(item.Buildings.start_date)
                .toLocaleDateString({
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                })
                .slice(0, 10)
            }}
          </h6>
          <h6>
            <b>Тугаш санаси: </b>
            {{
              new Date(item.Buildings.end_date)
                .toLocaleDateString({
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                })
                .slice(0, 10)
            }}
          </h6>
          <span
            class="badge rounded-pill bg-warning"
            v-if="item.Buildings.status == 'wait'"
            >кутилмоқда</span
          >
          <span
            class="badge rounded-pill bg-primary"
            v-else-if="item.Buildings.status == 'start'"
            >қурилмоқда</span
          >
          <span
            class="badge rounded-pill bg-success"
            v-else-if="item.Buildings.status == 'end'"
            >якунланди</span
          >
          <hr
            class="mt-2 mb-2"
            :class="
              item.smeta_work_end_date != null
                ? date < item.smeta_work_end_date &&
                  date_sort(item.smeta_work_end_date) > 5
                  ? 'success'
                  : date < item.smeta_work_end_date &&
                    date_sort(item.smeta_work_end_date) <= 5 &&
                    date_sort(item.smeta_work_end_date) >= 3
                  ? 'warning'
                  : 'danger'
                : 'dark'
            "
          />
          <div class="d-flex justify-content-center zoom">
            <button
              class="btn btn-sm btn-primary mx-1"
              data-bs-toggle="modal"
              data-bs-target="#foremans_warehousemans"
              @click="select_id(item.Buildings.id, item.Buildings.name, 1)"
            >
              <i class="fa-solid fa-users"></i>
            </button>
            <a
              target="_blank"
              :href="`https://www.google.com/maps/@${item.Buildings.map_lat},${item.Buildings.map_long},8z`"
              class="btn btn-sm btn-primary mx-1"
            >
              <i class="fa-solid fa-location-dot"></i>
            </a>

            <router-link
              :to="{
                name: 'building',
                query: { id: item.Buildings.id, name: item.Buildings.name },
              }"
              class="btn btn-sm btn-primary mx-1"
            >
              <i class="fa-solid fa-right-long"></i>
            </router-link>
            <router-link
              :to="{
                name: 'warehouse_product',
                query: { id: item.Buildings.id, name: item.Buildings.name },
              }"
              class="btn btn-sm btn-primary mx-1"
            >
              <i class="fa-solid fa-box"></i>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="row row_building" v-else-if="role == 'pto'">
    <div
      class="col-md-4 col-sm-6 col-lg-4 col-xxl-4 my-1"
      v-for="(item, inc) in data"
      :key="item"
    >
      <div
        class="card"
        :class="
          item.smeta_work_end_date != null
            ? date < item.smeta_work_end_date &&
              date_sort(item.smeta_work_end_date) > 5
              ? 'success'
              : date < item.smeta_work_end_date &&
                date_sort(item.smeta_work_end_date) <= 5 &&
                date_sort(item.smeta_work_end_date) >= 3
              ? 'warning'
              : 'danger'
            : 'dark'
        "
      >
        <div class="card-body text-center">
          <span class="float-start badge bg-primary">{{ inc + 1 }}</span>
          <h5 class="card-title text-center mb-0">
            <span class="descinline">
              {{ shorttext(item.Buildings.name) }}
            </span>
            <span class="descempty"> {{ item.Buildings.name }} </span>
            <span
              class="text-primary"
              style="cursor: pointer"
              @click="toggler($event)"
              v-if="item.Buildings.name.length > 15"
            >
              яна</span
            >
          </h5>
          <hr
            class="mt-2 mb-2"
            :class="
              item.smeta_work_end_date != null
                ? date < item.smeta_work_end_date &&
                  date_sort(item.smeta_work_end_date) > 5
                  ? 'success'
                  : date < item.smeta_work_end_date &&
                    date_sort(item.smeta_work_end_date) <= 5 &&
                    date_sort(item.smeta_work_end_date) >= 3
                  ? 'warning'
                  : 'danger'
                : 'dark'
            "
          />
          <h6><b>Манзил: </b> {{ item.Buildings.address }}</h6>
          <h6>
            <b>Бошлаш санаси: </b>
            {{
              new Date(item.Buildings.start_date)
                .toLocaleDateString({
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                })
                .slice(0, 10)
            }}
          </h6>
          <h6>
            <b>Тугаш санаси: </b>
            {{
              new Date(item.Buildings.end_date)
                .toLocaleDateString({
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                })
                .slice(0, 10)
            }}
          </h6>
          <span
            class="badge rounded-pill bg-warning"
            v-if="item.Buildings.status == 'wait'"
            >кутилмоқда</span
          >
          <span
            class="badge rounded-pill bg-primary"
            v-else-if="item.Buildings.status == 'start'"
            >қурилмоқда</span
          >
          <span
            class="badge rounded-pill bg-success"
            v-else-if="item.Buildings.status == 'end'"
            >якунланди</span
          >
          <hr
            class="mt-2 mb-2"
            :class="
              item.smeta_work_end_date != null
                ? date < item.smeta_work_end_date &&
                  date_sort(item.smeta_work_end_date) > 5
                  ? 'success'
                  : date < item.smeta_work_end_date &&
                    date_sort(item.smeta_work_end_date) <= 5 &&
                    date_sort(item.smeta_work_end_date) >= 3
                  ? 'warning'
                  : 'danger'
                : 'dark'
            "
          />
          <div class="d-flex justify-content-center zoom">
            <div class="coll mx-1">
              <router-link
                :to="{
                  name: 'smeta',
                  query: { id: item.Buildings.id, name: item.Buildings.name },
                }"
                class="btn btn-sm btn-primary"
              >
                <i class="fa-solid fa-right-long"></i>
              </router-link>
            </div>
            <div class="coll mx-1">
              <router-link
                :to="{
                  name: 'building_works',
                  query: { id: item.Buildings.id, name: item.Buildings.name },
                }"
                class="btn btn-sm btn-primary"
              >
                <i class="fa-solid fa-clipboard-list"></i>
              </router-link>
            </div>
            <div class="coll mx-1">
              <button
                class="btn btn-sm btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#foremans_warehousemans"
                @click="select_id(item.Buildings.id, item.Buildings.name, 1)"
              >
                <i class="fa-solid fa-users"></i>
              </button>
            </div>
            <div class="coll mx-1">
              <router-link
                :to="{
                  name: 'building_products',
                  query: { id: item.Buildings.id, name: item.Buildings.name },
                }"
                class="btn btn-sm btn-primary"
              >
                <i class="fa-solid fa-box"></i>
              </router-link>
            </div>
            <div class="coll mx-1">
              <button
                class="btn btn-sm btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#building_document"
                @click="select_id(item.Buildings.id, item.Buildings.name, 2)"
              >
                <i class="fa-solid fa-file-arrow-up"></i>
              </button>
            </div>
            <div class="coll mx-1">
              <a
                target="_blank"
                :href="`https://www.google.com/maps/@${item.Buildings.map_lat},${item.Buildings.map_long},8z`"
                class="btn btn-sm btn-primary"
              >
                <i class="fa-solid fa-location-dot"></i>
              </a>
            </div>

            <div class="coll mx-1" v-if="item.Buildings.status == 'start'">
              <button class="btn btn-sm btn-success" @click="finish(item)">
                <i class="fa-solid fa-flag-checkered"></i>
              </button>
            </div>
            <div class="coll mx-1" v-else-if="item.Buildings.status == 'end'">
              <button class="btn btn-sm btn-primary" @click="start(item)">
                <i class="fa-solid fa-play"></i>
              </button>
            </div>

            <div class="coll mx-1" v-if="item.Buildings.status == 'wait'">
              <button class="btn btn-sm btn-primary" @click="start(item)">
                <i class="fa-solid fa-play"></i>
              </button>
            </div>
            <div class="coll mx-1" v-if="item.Buildings.status == 'wait'">
              <button
                class="btn btn-sm btn-warning"
                data-bs-toggle="modal"
                data-bs-target="#building_put"
                @click="items(item)"
              >
                <i class="fa fa-edit text-white"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="table-responsive mt-3" v-else>
    <table class="table table-sm table-hover building">
      <thead class="">
        <tr>
          <th>№</th>
          <th>Номи</th>
          <th>Манзил</th>
          <th>Бошлаш санаси</th>
          <th>Тугаш санаси</th>
          <th>Статус</th>
          <th></th>
        </tr>
      </thead>
      <tbody v-if="role == 'prorap' || role == 'omborchi'">
        <tr v-for="(item, inc) in data" :key="item">
          <td>{{ inc + 1 }}</td>
          <td>
            <p style="min-width: 250px; width: 250px">
              {{ item.Buildings.name }}
            </p>
          </td>
          <td>{{ item.Buildings.address }}</td>
          <td>
            {{
              new Date(item.Buildings.start_date)
                .toLocaleDateString({
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                })
                .slice(0, 10)
            }}
          </td>
          <td>
            {{
              new Date(item.Buildings.end_date)
                .toLocaleDateString({
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                })
                .slice(0, 10)
            }}
          </td>
          <td>
            <span
              class="badge rounded-pill bg-warning"
              v-if="item.Buildings.status == 'wait'"
              >кутилмоқда</span
            >
            <span
              class="badge rounded-pill bg-primary"
              v-else-if="item.Buildings.status == 'start'"
              >қурилмоқда</span
            >
            <span
              class="badge rounded-pill bg-success"
              v-else-if="item.Buildings.status == 'end'"
              >якунланди</span
            >
          </td>
          <td>
            <button
              class="btn btn-sm btn-warning mx-1"
              data-bs-toggle="modal"
              data-bs-target="#building_put"
              @click="items(item.Buildings.building)"
              v-if="item.Buildings.status == 'wait' && role == 'pto'"
            >
              <i class="fa fa-edit text-white"></i>
            </button>

            <button
              class="btn btn-sm btn-success mx-1"
              v-else-if="item.Buildings.status == 'start' && role == 'pto'"
              @click="finish(item.Buildings.building)"
            >
              <i class="fa-solid fa-flag-checkered"></i>
            </button>
            <button
              class="btn btn-sm btn-primary mx-1"
              data-bs-toggle="modal"
              data-bs-target="#foremans_warehousemans"
              @click="select_id(item.Buildings.id)"
              v-if="role == 'admin' || role == 'pto'"
            >
              <i class="fa-solid fa-users"></i>
            </button>
            <a
              target="_blank"
              :href="`https://www.google.com/maps/@${item.Buildings.map_lat},${item.Buildings.map_long},8z`"
              class="btn btn-sm btn-primary mx-1"
            >
              <i class="fa-solid fa-location-dot"></i>
            </a>
            <router-link
              :to="{
                name: 'smeta',
                query: { id: item.Buildings.id, name: item.Buildings.id },
              }"
              class="btn btn-sm btn-primary mx-1"
            >
              <i class="fa-solid fa-right-long"></i>
            </router-link>
            <!-- <router-link
              v-if="item.Buildings.status == 'start'"
              :to="{
                name: 'proche_sorovlar',
                query: { id: item.Buildings.id },
              }"
              class="btn btn-sm btn-primary mx-1"
            >
              <i class="fa-solid fa-rectangle-list"></i>
            </router-link> -->
            <button
              class="btn btn-sm btn-primary mx-1 d-block mt-1"
              v-if="item.Buildings.status == 'wait' && role == 'pto'"
              @click="start(item.Buildings.building)"
            >
              бошлаш
            </button>
            <router-link
              :to="{ name: 'workers', query: { id: item.Buildings.id } }"
              class="btn btn-sm btn-primary mx-1"
              v-if="role == 'prorap'"
            >
              <i class="fa-solid fa-users"></i>
            </router-link>
          </td>
        </tr>
      </tbody>
      <tbody v-else-if="role == 'operator'">
        <tr v-for="(item, inc) in data" :key="item">
          <td>{{ inc + 1 }}</td>
          <td>
            <p style="min-width: 250px; width: 250px">
              {{ item.Buildings.name }}
            </p>
          </td>
          <td>{{ item.Buildings.address }}</td>
          <td>
            {{
              new Date(item.Buildings.start_date)
                .toLocaleDateString({
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                })
                .slice(0, 10)
            }}
          </td>
          <td>
            {{
              new Date(item.Buildings.end_date)
                .toLocaleDateString({
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                })
                .slice(0, 10)
            }}
          </td>
          <td>
            <span
              class="badge rounded-pill bg-warning"
              v-if="item.Buildings.status == 'wait'"
              >кутилмоқда</span
            >
            <span
              class="badge rounded-pill bg-primary"
              v-else-if="item.Buildings.status == 'start'"
              >қурилмоқда</span
            >
            <span
              class="badge rounded-pill bg-success"
              v-else-if="item.Buildings.status == 'end'"
              >якунланди</span
            >
          </td>
          <td>
            <a
              target="_blank"
              :href="`https://www.google.com/maps/@${item.Buildings.map_lat},${item.Buildings.map_long},8z`"
              class="btn btn-sm btn-primary mx-1"
            >
              <i class="fa-solid fa-location-dot"></i>
            </a>

            <router-link
              v-if="item.Buildings.status == 'start'"
              :to="{
                path: '/buildings/product_request',
                query: { id: item.Buildings.id },
              }"
              class="btn btn-sm btn-primary mx-1"
            >
              <i class="fa-solid fa-rectangle-list"></i>
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <Building_put :object="item" @put="put" />

  <Building_documents
    v-if="role == 'pto'"
    :id="building_id"
    :name="building_name"
    @document_add="document_add"
    :data="documents"
    @remove="remove"
  />

  <!-- Modal -->

  <div
    class="modal fade"
    id="foremans_warehousemans"
    tabindex="-1"
    aria-labelledby="foremans_warehousemans"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header border-bottom-0">
          <button
            type="button"
            class="btn-close float-end"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col">
              <Foreman
                :building_id="building_id"
                :data="foremans"
                @get="select_id"
              />
            </div>
            <div class="col">
              <Warehouseman
                :building_id="building_id"
                :data="warehousemans"
                @get="get_warehousemans"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  building_d_add,
  building_d_get,
  building_d_remove,
  building_put,
  foreman_get,
  warehouseman_get,
} from "@/utils/request/request";
import Building_put from "./building_put.vue";
import { catchError, success } from "@/utils/request/handle_api_err";
import Swal from "sweetalert2";
import Foreman from "../foremans_warehousemans/foreman.vue";
import Warehouseman from "../foremans_warehousemans/warehouseman.vue";
import Building_documents from "./building_documents.vue";
export default {
  name: "BuildingItem",
  props: { data: Array },
  emits: ["get_buildings"],
  data() {
    return {
      item: {},
      foremans: [],
      warehousemans: [],
      building_id: null,
      building_name: "",
      role: localStorage.getItem("role"),
      documents: [],
      date: new Date().toISOString().slice(0, 10),
    };
  },
  methods: {
    items(e) {
      this.item = {
        id: e.id,
        name: e.name,
        address: e.address,
        budget: e.budget,
        start_date: e.start_date,
        end_date: e.end_date,
        map_long: e.map_long,
        map_lat: e.map_lat,
        status: e.status,
      };
    },
    put(e) {
      this.$store.dispatch("setLoading", { isLoading: true });
      document.getElementById("building_disabled_put").disabled = true;
      building_put(e)
        .then((res) => {
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("buildings_put").click();
          document.getElementById("building_disabled_put").disabled = false;
          success(res).then(() => {
            this.$emit("get_buildings");
          });
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("building_disabled_put").disabled = false;
        });
    },
    start(e) {
      if (e.status == "end") {
        this.$store.dispatch("setLoading", { isLoading: true });
        e.status = "start";
        building_put(e)
          .then((res) => {
            this.$store.dispatch("setLoading", { isLoading: false });
            success(res).then(() => {
              this.$emit("get_buildings");
            });
          })
          .catch((err) => {
            catchError(err);
            this.$store.dispatch("setLoading", { isLoading: false });
          });
      } else {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 10000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "warning",
          width: 600,
          title:
            "Обект қурилиши бошланганидан сўнг унинг маълумотларини ўзгартириб бўлмайди",
          showCancelButton: true,
          showConfirmButton: true,
          confirmButtonText: "<i class='fa-solid fa-circle-check'></i>",
          cancelButtonText: "<i class='fa-solid fa-circle-xmark'></i>",
          confirmButtonColor: "#0D6EFD",
          cancelButtonColor: "#DC3545",
        }).then((result) => {
          if (result.isConfirmed) {
            this.$store.dispatch("setLoading", { isLoading: true });
            e.status = "start";
            building_put(e)
              .then((res) => {
                this.$store.dispatch("setLoading", { isLoading: false });
                success(res).then(() => {
                  this.$emit("get_buildings");
                });
              })
              .catch((err) => {
                catchError(err);
                this.$store.dispatch("setLoading", { isLoading: false });
              });
          } else {
            result;
          }
        });
      }
    },
    finish(e) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 10000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: "warning",
        width: 600,
        title: "Объектни ростанҳам якунламоқчимисиз",
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: "<i class='fa-solid fa-circle-check'></i>",
        cancelButtonText: "<i class='fa-solid fa-circle-xmark'></i>",
        confirmButtonColor: "#0D6EFD",
        cancelButtonColor: "#DC3545",
      }).then((result) => {
        if (result.isConfirmed) {
          this.$store.dispatch("setLoading", { isLoading: true });
          e.status = "end";
          building_put(e)
            .then((res) => {
              this.$store.dispatch("setLoading", { isLoading: false });
              success(res).then(() => {
                this.$emit("get_buildings");
              });
            })
            .catch((err) => {
              catchError(err);
              this.$store.dispatch("setLoading", { isLoading: false });
            });
        } else {
          result;
        }
      });
    },
    select_id(id, name, nm) {
      this.building_id = id;
      this.building_name = name;
      if (nm == 1) {
        this.$store.dispatch("setLoading", { isLoading: true });
        foreman_get(id)
          .then((res) => {
            this.foremans = res.data;
            this.$store.dispatch("setLoading", { isLoading: false });
            this.get_warehousemans(id);
          })
          .catch((err) => {
            catchError(err);
            this.$store.dispatch("setLoading", { isLoading: false });
          });
      } else {
        this.$store.dispatch("setLoading", { isLoading: true });
        building_d_get(id)
          .then((res) => {
            this.documents = res.data;
            this.$store.dispatch("setLoading", { isLoading: false });
          })
          .catch((err) => {
            catchError(err);
            this.$store.dispatch("setLoading", { isLoading: false });
          });
      }
    },
    get_warehousemans(e) {
      this.$store.dispatch("setLoading", { isLoading: true });
      warehouseman_get(e)
        .then((res) => {
          this.warehousemans = res.data;
          this.$store.dispatch("setLoading", { isLoading: false });
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
        });
    },
    document_add(e) {
      document.getElementById("document_button").disabled = true;
      this.$store.dispatch("setLoading", { isLoading: true });
      building_d_add(e, this.building_id)
        .then((res) => {
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("document_button").disabled = false;
          success(res).then(() => {
            this.select_id(this.building_id, this.building_name, 2);
            e.file = "";
            e.comment = "";
            document.getElementById("txt").innerHTML = "файл юклаш";
          });
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("txt").innerHTML = "файл юклаш";
          e.file = "";
          e.comment = "";
        });
    },
    remove(e) {
      document.getElementById("remove_document").disabled = true;
      this.$store.dispatch("setLoading", { isLoading: true });
      building_d_remove(e)
        .then((res) => {
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("remove_document").disabled = false;
          success(res).then(() => {
            this.select_id(this.building_id, this.building_name, 2);
          });
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("remove_document").disabled = false;
        });
    },
    toggler(e) {
      if (e.target.innerText == " яна") {
        e.target.innerText = "ёпиш";
        e.target.parentElement.children[0].className = "";
        e.target.parentElement.children[0].className = "descempty";
        e.target.parentElement.children[1].className = "";
        e.target.parentElement.children[1].className = "descinline";
      } else {
        e.target.innerText = " яна";
        e.target.parentElement.children[0].className = "descinline";
        e.target.parentElement.children[1].className = "descempty";
      }
    },
    date_sort(e) {
      let date1 = new Date(e);
      let date2 = new Date(this.date);

      const diffTime = Math.abs(date1 - date2);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      return Number(diffDays);
    },
  },
  computed: {
    shorttext() {
      return (v) => {
        return v.substring(0, 15);
      };
    },
  },
  components: { Building_put, Foreman, Warehouseman, Building_documents },
};
</script>

<style lang="scss" scoped>
table {
  min-width: 1000px;
  width: 100%;
}

.table-responsive {
  max-height: 66vh;
}

div.row_building {
  max-height: 70vh;
  overflow: auto;
}

@media (max-width: 500px) {
  .table-responsive {
    max-height: 85vh;
  }
}

.modal-content {
  border: none;
}

.modal-body {
  height: 85vh;
}

.descinline {
  display: inline;
}

.descempty {
  display: none;
}

.d-flex.justify-content-center.zoom {
  zoom: 93%;
}

hr {
  border: none;
  opacity: 1;
  border-radius: 50px;
}

hr.success {
  background: green;
  animation: success 0.8s infinite alternate linear;
}

hr.dark {
  background: black;
  animation: darker 0.8s infinite alternate linear;
}

hr.danger {
  background: red;
  animation: danger 0.8s infinite alternate linear;
}

hr.warning {
  background: #ffc107;
  animation: warning 0.8s infinite alternate linear;
}

.card.success {
  border: 1px solid green;
  animation: success 0.8s infinite alternate linear;
}

.card.dark {
  border: 1px solid black;
  animation: darker 0.8s infinite alternate linear;
}

.card.danger {
  border: 1px solid red;
  animation: danger 0.8s infinite alternate linear;
}

.card.warning {
  border: 1px solid #ffc107;
  animation: warning 0.8s infinite alternate linear;
}

@keyframes success {
  0% {
    box-shadow: 0 0 0 1.8px rgb(0, 128, 0, 0.4);
  }
}
@keyframes danger {
  0% {
    box-shadow: 0 0 0 1.8px rgb(255, 0, 0, 0.4);
  }
}
@keyframes warning {
  0% {
    box-shadow: 0 0 0 1.8px rgb(255, 193, 7, 0.4);
  }
}

@keyframes darker {
  0% {
    box-shadow: 0 0 0 1.8px rgb(0, 0, 0, 0.4);
  }
}

.zoom .coll:hover {
  transform: scale(1.2);
}

.zoom .coll {
  margin: 5px 0px;
  transition: all 0.1s linear;
}
</style>
