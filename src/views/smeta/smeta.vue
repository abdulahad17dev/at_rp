<template>
  <Header_item />

  <div class="row">
    <div class="col mt-1 d-flex align-items-center">
      <span>Лимит</span>
      <select
        class="form-control form-control-sm mx-2 form-select smeta_sort"
        v-model="limit"
      >
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
      <select
        class="form-control form-control-sm mx-2 form-select smeta_sort"
        v-model="status"
      >
        <option value="">барчаси</option>
        <option value="removed">ўчирилган</option>
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
          v-model="search"
          class="form-control form-control-sm"
        />
        <div class="" v-if="role == 'pto'">
          <button
            class="btn btn-danger btn-sm"
            @click="remove_all_smeta"
            v-if="smeta != ''"
          >
            <i class="fa-solid fa-trash-can"></i>
          </button>
          <button
            v-else
            class="btn btn-outline-secondary btn-sm"
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#smeta_add"
          >
            <i class="fa-solid fa-circle-plus"></i>
          </button>
        </div>
      </div>
    </div>
  </div>

  <Smeta_item :data="smeta" @remove_smeta="remove" />
  <Data_notfound v-if="smeta == ''" />

  <nav aria-label="Page navigation example" class="mt-2" v-if="smeta != ''">
    <ul class="pagination pagination-sm justify-content-end">
      <li class="page-item">
        <button
          type="button"
          class="page-link"
          @click="
            get_smeta(page, limit, search, type, status, building_id, order_by)
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
        <button class="page-link" @click="page++" :disabled="page == pages - 1">
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

  <Smeta_add @add="add" />
</template>

<script>
import Smeta_add from "@/components/smeta/smeta_add.vue";
import { smeta_add, smeta_get, smeta_remove } from "@/utils/request/request";
import { catchError, success } from "@/utils/request/handle_api_err";
import Smeta_item from "@/components/smeta/smeta_item.vue";
import Data_notfound from "@/utils/notfound/data_notfound.vue";
import Swal from "sweetalert2";
import Header_item from "@/components/header/header_item.vue";
export default {
  name: "SmetaItem",
  data() {
    return {
      building_id: this.$route.query.id,
      limit: 25,
      page: 0,
      pages: null,
      smeta: [],
      search: "",
      status: "",
      type: "",
      order_by: "",
      role: localStorage.getItem("role"),
    };
  },
  watch: {
    limit(e) {
      this.page = 0;
      this.get_smeta(
        this.page,
        e,
        this.search,
        this.type,
        this.status,
        this.building_id,
        this.order_by
      );
    },
    page(e) {
      this.get_smeta(
        e,
        this.limit,
        this.search,
        this.type,
        this.status,
        this.building_id,
        this.order_by
      );
    },
    search(e) {
      this.page = 0;
      if (e.length > 0) {
        this.get_smeta(
          this.page,
          this.limit,
          this.search,
          this.type,
          this.status,
          this.building_id,
          this.order_by
        );
      } else if (e.length == 0) {
        this.get_smeta(
          this.page,
          this.limit,
          this.search,
          this.type,
          this.status,
          this.building_id,
          this.order_by
        );
        this.page = 0;
      }
    },
    status(e) {
      if (e == "wait" || e == "re-check" || e == "confirmed") {
        this.type = "grafik";
      } else {
        this.type = "";
      }

      if (e.length > 0) {
        this.get_smeta(
          this.page,
          this.limit,
          this.search,
          this.type,
          this.status,
          this.building_id,
          this.order_by
        );
      } else if (e.length == 0) {
        this.get_smeta(
          this.page,
          this.limit,
          this.search,
          this.type,
          this.status,
          this.building_id,
          this.order_by
        );
        this.page = 0;
      }
    },
  },
  methods: {
    get_smeta(page, limit, search, type, status, building_id, order_by) {
      this.$store.dispatch("setLoading", { isLoading: true });
      smeta_get(page, limit, search, type, status, building_id, order_by)
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
    add(e) {
      document.getElementById("smetas_add").click();
      document.getElementById("smeta_disabled").disabled = true;
      this.$store.dispatch("setLoading2", { isLoading2: true });
      smeta_add(e, this.building_id)
        .then((res) => {
          this.$store.dispatch("setLoading2", { isLoading2: false });
          document.getElementById("smeta_disabled").disabled = false;
          success(res).then(() => {
            this.get_smeta(
              this.page,
              this.limit,
              this.search,
              this.type,
              this.status,
              this.building_id,
              this.order_by
            );
            e.file = "";
            document.getElementById("file-6").value = null;
            document.getElementById("file_name").innerHTML = "";
          });
        })
        .catch((err) => {
          catchError(err).then(() => {
            this.get_smeta(
              this.page,
              this.limit,
              this.search,
              this.type,
              this.status,
              this.building_id,
              this.order_by
            );
          });
          this.$store.dispatch("setLoading2", { isLoading2: false });
          document.getElementById("smeta_disabled").disabled = false;
          document.getElementById("file-6").value = null;
          document.getElementById("file_name").innerHTML = "";
        });
    },
    remove(id) {
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
        title: "Smeta o'chirilishiga rozimisiz !",
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: "<i class='fa-solid fa-circle-check'></i>",
        cancelButtonText: "<i class='fa-solid fa-circle-xmark'></i>",
        confirmButtonColor: "#0D6EFD",
        cancelButtonColor: "#DC3545",
      }).then((result) => {
        if (result.isConfirmed) {
          document.getElementById("remove_smeta").disabled = true;
          this.$store.dispatch("setLoading", { isLoading: true });
          smeta_remove(id, "smeta_id")
            .then((res) => {
              this.$store.dispatch("setLoading", { isLoading: false });

              success(res).then(() => {
                this.get_smeta(
                  this.page,
                  this.limit,
                  this.search,
                  this.type,
                  this.status,
                  this.building_id,
                  this.order_by
                );
              });
              document.getElementById("remove_smeta").disabled = false;
            })
            .catch((err) => {
              catchError(err);
              this.$store.dispatch("setLoading", { isLoading: false });
              document.getElementById("remove_smeta").disabled = false;
            });
        } else {
          result;
        }
      });
    },
    remove_all_smeta() {
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
        title: "Smeta o'chirilishiga rozimisiz !",
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: "<i class='fa-solid fa-circle-check'></i>",
        cancelButtonText: "<i class='fa-solid fa-circle-xmark'></i>",
        confirmButtonColor: "#0D6EFD",
        cancelButtonColor: "#DC3545",
      }).then((result) => {
        if (result.isConfirmed) {
          this.$store.dispatch("setLoading", { isLoading: true });
          smeta_remove(this.building_id, "building_id")
            .then((res) => {
              this.$store.dispatch("setLoading", { isLoading: false });
              success(res).then(() => {
                this.get_smeta(
                  this.page,
                  this.limit,
                  this.search,
                  this.type,
                  this.status,
                  this.building_id,
                  this.order_by
                );
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
  },
  created() {
    this.get_smeta(
      this.page,
      this.limit,
      this.search,
      this.type,
      this.status,
      this.building_id,
      this.order_by
    );
  },
  components: { Smeta_add, Smeta_item, Data_notfound, Header_item },
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
</style>
