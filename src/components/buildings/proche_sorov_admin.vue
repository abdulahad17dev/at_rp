<template>
  <div class="table-responsive">
    <table class="table table-sm table-bordered">
      <thead class="">
        <tr>
          <th style="width: 10%">#ИД</th>
          <th style="width: 12%">Сана</th>
          <th style="width: 20%">Номи</th>
          <th style="width: 20%">Ҳажм</th>
          <th style="width: 20%">Ўлчов бирлиги</th>
          <th style="width: 28%">Изох</th>
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
        <tr v-for="(item, inc) in product_requests || []" :key="item">
          <td>{{ item.Proche_sorovlar.id }}</td>
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
          <td>
            <form
              @submit.prevent="accept(item.Proche_sorovlar.id, true, item)"
              :id="`form${inc}`"
            >
              <input
                v-if="item.Proche_sorovlar.status == 'adminda_proche'"
                type="text"
                :form="`form${inc}`"
                class="form-control form-control-sm"
                v-model="item.Proche_sorovlar.name"
                :data-name="inc"
                @dblclick="enable('data-name', inc)"
                @focusout="disable('data-name', inc)"
                readonly
                required
              />
              <span v-else>{{ item.Proche_sorovlar.name }}</span>
            </form>
          </td>
          <td>
            <input
              v-if="item.Proche_sorovlar.status == 'adminda_proche'"
              type="number"
              :form="`form${inc}`"
              class="form-control form-control-sm"
              step="any"
              v-model="item.Proche_sorovlar.quantity"
              :data-quantity="inc"
              @dblclick="enable('data-quantity', inc)"
              @focusout="disable('data-quantity', inc)"
              readonly
              required
            />

            <span v-else>{{ item.Proche_sorovlar.quantity }}</span>
          </td>
          <td>
            <input
              v-if="item.Proche_sorovlar.status == 'adminda_proche'"
              type="text"
              :form="`form${inc}`"
              class="form-control form-control-sm"
              v-model="item.Proche_sorovlar.olchov_birligi"
              :data-olchov_birligi="inc"
              @dblclick="enable('data-olchov_birligi', inc)"
              @focusout="disable('data-olchov_birligi', inc)"
              readonly
              required
            />

            <span v-else>
              {{ item.Proche_sorovlar.olchov_birligi }}
            </span>
          </td>
          <td>
            <textarea
              v-if="item.Proche_sorovlar.status == 'adminda_proche'"
              :form="`form${inc}`"
              class="form-control form-control-sm"
              v-model="item.Proche_sorovlar.comment"
              :data-comment="inc"
              @dblclick="enable('data-comment', inc)"
              @focusout="disable('data-comment', inc)"
              readonly
              required
            ></textarea>

            <span v-else>
              {{ item.Proche_sorovlar.comment }}
            </span>
          </td>

          <td>
            <button
              class="btn btn-sm btn-success"
              :id="`accept_proche${item.Proche_sorovlar.id}`"
              v-if="item.Proche_sorovlar.status == 'adminda_proche'"
              :form="`form${inc}`"
              :disabled="
                !item.Proche_sorovlar.name ||
                !item.Proche_sorovlar.quantity ||
                !item.Proche_sorovlar.comment ||
                !item.Proche_sorovlar.olchov_birligi
              "
            >
              <i class="fa-solid fa-circle-check text-white"></i>
            </button>
            <button
              class="btn btn-sm btn-danger mx-1"
              :id="`remove_proche${item.Proche_sorovlar.id}`"
              v-if="item.Proche_sorovlar.status == 'adminda_proche'"
              @click="remove(item.Proche_sorovlar.id, false)"
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
      body: {
        name: "",
        quantity: 0,
        olchov_birligi: "",
        comment: "",
        building_id: 0,
      },
      utils: "",
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
    accept(id, status, item) {
      this.body = {
        name: item.name,
        quantity: item.quantity,
        olchov_birligi: item.olchov_birligi,
        comment: item.comment,
        building_id: 0,
      };
      document.getElementById(`accept_proche${id}`).disabled = true;
      this.$store.dispatch("setLoading", { isLoading: true });
      proche_s_put(id, status, 0, this.body)
        .then((res) => {
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById(`accept_proche${id}`).disabled = false;
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
          document.getElementById(`accept_proche${id}`).disabled = false;
        });
    },
    remove(id, status) {
      document.getElementById(`remove_proche${id}`).disabled = true;
      this.$store.dispatch("setLoading", { isLoading: true });
      proche_s_put(id, status, 0, this.body)
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
    enable(attr, id) {
      document.querySelector(`[${attr}="${id}"]`).removeAttribute("readonly");
    },
    disable(attr, id) {
      document
        .querySelector(`[${attr}="${id}"]`)
        .setAttribute("readonly", true);
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
