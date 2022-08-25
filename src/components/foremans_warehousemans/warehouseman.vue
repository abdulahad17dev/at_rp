<template>
  <div class="card shadow border-0">
    <div class="card-body">
      <h6 class="card-title">Омборчилар рўйҳати</h6>
      <hr />
      <div class="d-flex" v-if="role_item == 'pto'">
        <div class="dropdown mx-1">
          <button
            class="btn btn-light btn-sm dropdown-toggle"
            type="button"
            id="dropdownMenu2"
            data-bs-toggle="dropdown"
            data-bs-auto-close="outside"
            aria-expanded="false"
            @click="
              users_omborchi.length
                ? ''
                : get_omborchi(page, limit, search, role)
            "
          >
            {{ text }}
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenu2">
            <li>
              <input
                type="search"
                class="form-control form-control-sm"
                placeholder="қидириш ..."
                v-model="search"
              />
            </li>
            <li>
              <ul class="dropdown-items">
                <li
                  v-for="item in users_omborchi"
                  :key="item"
                  @click="select(item.id, item.name)"
                >
                  <a class="dropdown-item">{{ item.name }}</a>
                </li>
              </ul>
            </li>
            <li v-if="users_omborchi != ''"><hr class="dropdown-divider" /></li>
            <li>
              <nav
                aria-label="Page navigation example"
                class="mt-2"
                v-if="users_omborchi != ''"
              >
                <ul class="pagination pagination-sm justify-content-end">
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
            </li>
          </ul>
        </div>
        <button
          class="btn btn-sm btn-primary"
          disabled="true"
          id="send_btn2"
          @click="add(building_id)"
        >
          <i class="fa-solid fa-circle-check"></i>
        </button>
      </div>
      <ul class="list-group list-group-flush mt-2">
        <li
          class="list-group-item list-group-item-action"
          v-for="item in data"
          :key="item"
        >
          <small>{{ item.user }}</small>
          <button
            class="btn btn-danger btn-sm float-end"
            v-if="role_item == 'pto'"
            @click="remove_warehouseman(item.id)"
            id="remove_warehouseman"
          >
            <i class="fa-solid fa-circle-xmark"></i>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {
  user_get,
  warehouseman_add,
  warehouseman_remove,
} from "@/utils/request/request";
import { catchError, success } from "@/utils/request/handle_api_err";
export default {
  name: "WarehousemanItem",
  props: { data: Array, building_id: Number },
  emits: ["get"],
  data() {
    return {
      limit: 100,
      page: 0,
      pages: null,
      users_omborchi: [],
      search: "",
      role: "omborchi",
      text: "омборчи танлаш",
      role_item: localStorage.getItem("role"),
      body: {
        user_id: null,
        building_id: null,
      },
    };
  },
  watch: {
    search(e) {
      if (e.length > 0) {
        this.get_omborchi(this.page, this.limit, this.search, this.role);
      } else if (e.length == 0) {
        this.get_omborchi(this.page, this.limit, this.search, this.role);
        this.page = 0;
      }
    },
    page(e) {
      this.get_omborchi(e, this.limit, this.search, this.role);
      document.getElementById("scroll").scrollTop = 0;
    },
  },
  methods: {
    get_omborchi(page, limit, search, role) {
      this.$store.dispatch("setLoading", { isLoading: true });

      user_get(page, limit, search, role)
        .then((res) => {
          this.users_omborchi = res.data.data;
          this.pages = res.data.pages;
          this.$store.dispatch("setLoading", { isLoading: false });
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
        });
    },
    select(id, name) {
      this.body.user_id = id;
      this.text = name;
      document.getElementById("send_btn2").disabled = false;
      document.getElementById("dropdownMenu2").click();
    },
    add(e) {
      this.body.building_id = e;
      document.getElementById("send_btn2").disabled = true;
      this.$store.dispatch("setLoading", { isLoading: true });
      warehouseman_add(this.body)
        .then((res) => {
          document.getElementById("send_btn2").disabled = true;
          success(res).then(() => {
            this.$emit("get", this.building_id, "", 1);
            this.body.user_id = null;
            this.text = "прорап танлаш";
          });
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("send_btn2").disabled = true;
          this.body.user_id = null;
          this.text = "прорап танлаш";
        });
    },
    remove_warehouseman(e) {
      document.getElementById("remove_warehouseman").disabled = true;
      this.$store.dispatch("setLoading", { isLoading: true });
      warehouseman_remove(e)
        .then((res) => {
          document.getElementById("remove_warehouseman").disabled = false;
          success(res).then(() => {
            this.$emit("get", this.building_id, "", 1);
          });
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("remove_warehouseman").disabled = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.dropdown-menu {
  padding: 0;
}
.dropdown-items {
  padding: 0;
  border-top: none;
  max-height: 192px;
  overflow: auto;
}

.dropdown-toggle {
  width: 100%;
}

.dropdown {
  width: 90%;
}

button.btn-success {
  width: 15%;
}

.dropdown-menu {
  width: 100%;
}

.list-group {
  padding: 0.2rem 0.5rem;
  max-height: 480px;
  overflow: auto;
}
</style>
