<template>
  <div class="table-responsive m-2">
    <table class="table table-sm table-hover table-bordered">
      <thead class="">
        <tr>
          <th style="width: 10%">#ИД</th>
          <th style="width: 20%">Номи</th>
          <th style="width: 20%">Ҳажм</th>
          <th style="width: 20%">Ўлчов бирлиги</th>
          <th style="width: 20%">Сана</th>
          <th style="width: 20%">Изох</th>
          <th>
            <select
              class="form-control form-control-sm form-select"
              v-model="status"
            >
              <option value="" selected>барчаси</option>
              <option value="adminda_proche">админда</option>
              <option value="zakupshikda_proche">закупшикда</option>
              <option value="taminotchida_proche">таминотчида</option>
              <option value="taminotchida_proche_qabul_qilindi">
                қабул қилинди
              </option>
              <option value="rejected_proche">руҳсат этилмаган</option>
            </select>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in product_requests || []" :key="item">
          <td style="width: 10%">{{ item.id }}</td>
          <td style="width: 20%">
            <div class="input-group" v-if="item.status == 'adminda_proche'">
              <input
                type="text"
                class="form-control form-control-sm"
                :id="`name${item.id}`"
                step="any"
                :disabled="proche_name != item.id"
                v-model="item.name"
                required
              />
              <button
                v-if="proche_name != item.id"
                class="btn btn-sm btn-warning"
                @click="update_name(item.id)"
                type="button"
              >
                <i class="fa-solid fa-edit text-white"></i>
              </button>
              <button
                v-else-if="proche_name == item.id"
                class="btn btn-sm btn-danger"
                @click="remove_name(item.id)"
                type="button"
              >
                <i class="fa-solid fa-circle-xmark text-white"></i>
              </button>
            </div>
            <span v-else>{{ item.name }}</span>
          </td>
          <td style="width: 20%">
            <form
              :id="`form${item.id}`"
              @submit.prevent="accept(item.id, item.quantity, true, item.name)"
            >
              <div class="input-group" v-if="item.status == 'adminda_proche'">
                <input
                  type="number"
                  class="form-control form-control-sm"
                  :id="`id${item.id}`"
                  step="any"
                  :disabled="proche_id != item.id"
                  v-model="item.quantity"
                  required
                  min="1"
                />
                <button
                  v-if="proche_id != item.id"
                  class="btn btn-sm btn-warning"
                  @click="update_quantity(item.id)"
                  type="button"
                >
                  <i class="fa-solid fa-edit text-white"></i>
                </button>
                <button
                  v-else-if="proche_id == item.id"
                  class="btn btn-sm btn-danger"
                  @click="remove_quantity(item.id)"
                  type="button"
                >
                  <i class="fa-solid fa-circle-xmark text-white"></i>
                </button>
              </div>
              <span v-else>{{ item.quantity }}</span>
            </form>
          </td>
          <td style="width: 20%">{{ item.olchov_birligi }}</td>
          <td style="width: 20%">
            {{
              new Date(item.time)
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
          <td style="width: 20%">{{ item.comment }}</td>
          <td>
            <button
              :form="`form${item.id}`"
              class="btn btn-sm btn-success"
              :id="`accept_proche${item.id}`"
              v-if="item.status == 'adminda_proche'"
            >
              <i class="fa-solid fa-circle-check text-white"></i>
            </button>
            <button
              class="btn btn-sm btn-danger mx-1"
              :id="`remove_proche${item.id}`"
              v-if="item.status == 'adminda_proche'"
              @click="remove(item.id, false)"
            >
              <i class="fa-solid fa-circle-xmark text-white"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <Data_notfound v-if="product_requests == ''" />

  <nav
    aria-label="Page navigation example"
    class="mt-2"
    v-if="product_requests != ''"
  >
    <ul class="pagination pagination-sm justify-content-end">
      <li class="page-item">
        <select
          class="form-control form-control-sm form-select mx-1"
          v-model="limit"
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
          @click="get_proche_s(page, limit, building_id, status)"
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
</template>

<script>
import Data_notfound from "@/utils/notfound/data_notfound.vue";
import { proche_s_get, proche_s_put } from "@/utils/request/request";
import { catchError, success } from "@/utils/request/handle_api_err";
export default {
  name: "ProcheSorovAdmin",
  components: { Data_notfound },
  data() {
    return {
      limit: 25,
      page: 0,
      pages: null,
      product_requests: [],
      building_id: this.$route.query.id,
      status: "adminda_proche",
      proche_id: null,
      proche_name: "",
    };
  },
  watch: {
    limit(e) {
      this.page = 0;
      this.get_proche_s(this.page, e, this.building_id, this.status);
    },
    page(e) {
      this.get_proche_s(e, this.limit, this.building_id, this.status);
      document.getElementById("scroll").scrollTop = 0;
    },
    status(e) {
      this.page = 0;
      this.get_proche_s(this.page, this.limit, this.building_id, e);
    },
  },
  methods: {
    get_proche_s(page, limit, building_id, status) {
      this.$store.dispatch("setLoading", { isLoading: true });

      proche_s_get(page, limit, building_id, status)
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
    update_quantity(id) {
      this.proche_id = id;
      document.getElementById(`id${id}`).disabled = false;
    },
    remove_quantity(id) {
      this.proche_id = null;
      document.getElementById(`id${id}`).disabled = true;
    },
    update_name(id) {
      this.proche_name = id;
      document.getElementById(`name${id}`).disabled = false;
    },
    remove_name(id) {
      this.proche_name = null;
      document.getElementById(`name${id}`).disabled = true;
    },
    accept(id, quantity, status, name) {
      document.getElementById(`remove_proche${id}`).disabled = true;
      this.$store.dispatch("setLoading", { isLoading: true });
      proche_s_put(id, status, 0, quantity, name)
        .then((res) => {
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById(`remove_proche${id}`).disabled = false;
          success(res).then(() => {
            this.get_proche_s(
              this.page,
              this.limit,
              this.building_id,
              this.status
            );
            this.proche_id = null;
            document.getElementById(`id${id}`).disabled = true;
          });
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById(`remove_proche${id}`).disabled = false;
        });
    },
    remove(id, status) {
      document.getElementById(`remove_proche${id}`).disabled = true;
      this.$store.dispatch("setLoading", { isLoading: true });
      proche_s_put(id, status, 0, 0, "")
        .then((res) => {
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById(`remove_proche${id}`).disabled = false;
          success(res).then(() => {
            this.get_proche_s(
              this.page,
              this.limit,
              this.building_id,
              this.status
            );
          });
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById(`remove_proche${id}`).disabled = false;
        });
    },
  },
  created() {
    this.get_proche_s(this.page, this.limit, this.building_id, this.status);
  },
};
</script>

<style lang="scss" scoped>
th select {
  width: 170px;
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
}

@media (max-width: 368px) {
  .row {
    display: block;
  }
  .row .col .input-group {
    width: 100%;
  }
  .row .col select {
    width: 100%;
  }
}

.table-responsive {
  max-height: 76vh;
}

@media (max-width: 500px) {
  .table-responsive {
    max-height: 105vh;
  }
}

table {
  min-width: 1150px;
  width: 100%;
}
</style>
