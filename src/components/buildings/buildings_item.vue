<template>
  <div class="table-responsive mt-3" v-if="data != ''">
    <table class="table table-sm table-hover table-bordered building">
      <thead class="">
        <tr>
          <th>#ИД</th>
          <th>Номи</th>
          <th>Манзил</th>
          <th>Бошлаш санаси</th>
          <th>Тугаш санаси</th>
          <th>Статус</th>
          <th></th>
        </tr>
      </thead>
      <tbody v-if="role == 'prorap' || role == 'omborchi'">
        <tr v-for="item in data" :key="item">
          <td>{{ item.Buildings.id }}</td>
          <td>{{ item.Buildings.name }}</td>
          <td>{{ item.Buildings.address }}</td>
          <td>
            {{ new Date(item.Buildings.start_date).toLocaleDateString() }}
          </td>
          <td>{{ new Date(item.Buildings.end_date).toLocaleDateString() }}</td>
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
              @click="items(item.building)"
              v-if="item.Buildings.status == 'wait' && role == 'pto'"
            >
              <i class="fa fa-edit text-white"></i>
            </button>

            <button
              class="btn btn-sm btn-success mx-1"
              v-else-if="item.Buildings.status == 'start' && role == 'pto'"
              @click="finish(item.building)"
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
              :to="{ name: 'smeta', query: { id: item.Buildings.id } }"
              class="btn btn-sm btn-primary mx-1"
            >
              <i class="fa-solid fa-right-long"></i>
            </router-link>
            <button
              class="btn btn-sm btn-primary mx-1 d-block mt-1"
              v-if="item.Buildings.status == 'wait' && role == 'pto'"
              @click="start(item.building)"
            >
              бошлаш
            </button>
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr v-for="item in data" :key="item">
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.address }}</td>
          <td>{{ new Date(item.start_date).toLocaleDateString() }}</td>
          <td>{{ new Date(item.end_date).toLocaleDateString() }}</td>
          <td>
            <span
              class="badge rounded-pill bg-warning"
              v-if="item.status == 'wait'"
              >кутилмоқда</span
            >
            <span
              class="badge rounded-pill bg-primary"
              v-else-if="item.status == 'start'"
              >қурилмоқда</span
            >
            <span
              class="badge rounded-pill bg-success"
              v-else-if="item.status == 'end'"
              >якунланди</span
            >
          </td>
          <td>
            <button
              class="btn btn-sm btn-warning mx-1"
              data-bs-toggle="modal"
              data-bs-target="#building_put"
              @click="items(item)"
              v-if="item.status == 'wait' && role == 'pto'"
            >
              <i class="fa fa-edit text-white"></i>
            </button>

            <button
              class="btn btn-sm btn-success mx-1"
              v-else-if="item.status == 'start' && role == 'pto'"
              @click="finish(item)"
            >
              <i class="fa-solid fa-flag-checkered"></i>
            </button>
            <button
              class="btn btn-sm btn-primary mx-1"
              data-bs-toggle="modal"
              data-bs-target="#foremans_warehousemans"
              @click="select_id(item.id)"
              v-if="role == 'admin' || role == 'pto'"
            >
              <i class="fa-solid fa-users"></i>
            </button>
            <a
              target="_blank"
              :href="`https://www.google.com/maps/@${item.map_lat},${item.map_long},8z`"
              class="btn btn-sm btn-primary mx-1"
            >
              <i class="fa-solid fa-location-dot"></i>
            </a>
            <router-link
              :to="{ name: 'smeta', query: { id: item.id } }"
              class="btn btn-sm btn-primary mx-1"
            >
              <i class="fa-solid fa-right-long"></i>
            </router-link>
            <button
              class="btn btn-sm btn-primary mx-1 d-block mt-1"
              v-if="item.status == 'wait' && role == 'pto'"
              @click="start(item)"
            >
              бошлаш
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <Building_put :object="item" @put="put" />

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
  building_put,
  foreman_get,
  warehouseman_get,
} from "@/utils/request/request";
import Building_put from "./building_put.vue";
import { catchError, success } from "@/utils/request/handle_api_err";
import Swal from "sweetalert2";
import Foreman from "../foremans_warehousemans/foreman.vue";
import Warehouseman from "../foremans_warehousemans/warehouseman.vue";
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
      role: localStorage.getItem("role"),
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
          "Obyekt qurilishi boshlanganidan so'ng uning ma'lumotlarini o'zgartirib bo'lmaydi",
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
    finish(e) {
      this.$store.dispatch("setLoading", { isLoading: true });
      e.status = "end";
      building_put(e)
        .then((res) => {
          success(res).then(() => {
            this.$emit("get_buildings");
          });
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
        });
    },
    select_id(e) {
      this.building_id = e;
      this.$store.dispatch("setLoading", { isLoading: true });
      foreman_get(e)
        .then((res) => {
          this.foremans = res.data;
          this.$store.dispatch("setLoading", { isLoading: false });
          this.get_warehousemans(e);
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
        });
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
  },
  components: { Building_put, Foreman, Warehouseman },
};
</script>

<style lang="scss" scoped>
table {
  min-width: 1000px;
  width: 100%;
}

.modal-content {
  border: none;
}

.modal-body {
  height: 85vh;
}
</style>
