<template>
  <div class="table-responsive">
    <table class="table table-sm" id="table-responsive">
      <thead class="">
        <tr>
          <th>
            <input
              class="form-check-input"
              type="checkbox"
              v-model="checkAll"
              v-if="status == 'adminda_proche' && product_requests.length"
            />
            №
          </th>
          <th>Сана</th>
          <th>Номи</th>
          <th>Ҳажм</th>
          <th>Ўлчов бирлиги</th>
          <th>Изох</th>
          <th>
            <select
              class="form-control form-control-sm form-select"
              v-model="status"
            >
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
          <td>
            <input
              class="form-check-input"
              type="checkbox"
              :value="item"
              v-model="checked"
              v-if="status == 'adminda_proche'"
            />
            {{ inc + 1 }}
          </td>
          <td>
            {{
              new Date(item.Proche_sorovlar.time)
                .toLocaleDateString({
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                })
                .slice(0, 10)
            }}
          </td>
          <td>
            <form
              @submit.prevent="
                accept(item.Proche_sorovlar.id, item.Proche_sorovlar)
              "
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

            <span v-else>
              <Format_numbers :number="item.Proche_sorovlar.quantity" />
            </span>
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
              class="btn btn-sm btn-danger mx-1"
              :id="`remove_proche${item.Proche_sorovlar.id}`"
              v-if="
                (item.Proche_sorovlar.status == 'adminda_proche' &&
                  !checked.length) ||
                (item.Proche_sorovlar.status == 'taminotchida_proche' &&
                  !checked.length) ||
                (item.Proche_sorovlar.status == 'zakupshikda_proche' &&
                  !checked.length)
              "
              @click="
                remove(item.Proche_sorovlar.id, false, item.Proche_sorovlar)
              "
            >
              <i class="fa-solid fa-circle-xmark text-white"></i>
            </button>
            <button
              class="btn btn-sm btn-success"
              :id="`accept_proche${item.Proche_sorovlar.id}`"
              v-if="
                item.Proche_sorovlar.status == 'adminda_proche' &&
                !checked.length
              "
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
          </td>
        </tr>
      </tbody>
    </table>
    <Data_notfound v-if="product_requests == ''" />
  </div>

  <div class="row mt-2" v-if="checked.length">
    <div class="col-12">
      <button
        class="btn btn-sm btn-outline-success w-100"
        @click="accept()"
        id="accept_proche"
        :disabled="
          checked.find((e) => {
            return (
              !e.Proche_sorovlar.name ||
              !e.Proche_sorovlar.quantity ||
              !e.Proche_sorovlar.comment ||
              !e.Proche_sorovlar.olchov_birligi
            );
          })
            ? true
            : false
        "
      >
        <i class="fa-solid fa-circle-check"></i> қабул қилиш
      </button>
    </div>
  </div>

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
import Format_numbers from "@/utils/format/format_numbers.vue";
export default {
  name: "ProcheSorovAdmin",
  components: { Data_notfound, Format_numbers },
  data() {
    return {
      limit: 25,
      page: 0,
      pages: null,
      product_requests: [],
      building_id: this.$route.query.id,
      status: "adminda_proche",
      search: "",
      user_id: 0,
      body: {
        id: null,
        name: "",
        quantity: 0,
        olchov_birligi: "",
        comment: "",
        building_id: 0,
      },
      utils: "",
      checked: [],
      total_price: null,
      filter: false,
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
    },
    status(e) {
      this.page = 0;
      this.get_proche_s(
        this.page,
        this.limit,
        this.building_id,
        e,
        this.user_id,
        this.search
      );
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
    accept(id, item) {
      let array = [];
      if (this.checked.length) {
        var arr = this.checked.map((el) => ({
          id: el.Proche_sorovlar.id,
          name: el.Proche_sorovlar.name,
          quantity: el.Proche_sorovlar.quantity,
          olchov_birligi: el.Proche_sorovlar.olchov_birligi,
          comment: el.Proche_sorovlar.comment,
          building_id: 0,
        }));

        array = arr;
      } else {
        this.body = {
          id: id,
          name: item.name,
          quantity: item.quantity,
          olchov_birligi: item.olchov_birligi,
          comment: item.comment,
          building_id: 0,
        };
      }

      this.$store.dispatch("setLoading", { isLoading: true });
      proche_s_put(true, 0, this.checked.length ? array : Array(this.body))
        .then((res) => {
          this.$store.dispatch("setLoading", { isLoading: false });
          this.checked = [];
          success(res);
          this.get_proche_s(
            this.page,
            this.limit,
            this.building_id,
            this.status,
            this.user_id,
            this.search
          );
          this.body = {
            name: "",
            quantity: 0,
            olchov_birligi: "",
            comment: "",
            building_id: 0,
          };
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
        });
    },
    remove(id, status, item) {
      this.body = {
        id: id,
        name: item.name,
        quantity: item.quantity,
        olchov_birligi: item.olchov_birligi,
        comment: item.comment,
        building_id: 0,
      };
      document.getElementById(`remove_proche${id}`).disabled = true;
      this.$store.dispatch("setLoading", { isLoading: true });
      proche_s_put(status, 0, Array(this.body))
        .then((res) => {
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById(`remove_proche${id}`).disabled = false;
          success(res);
          this.get_proche_s(
            this.page,
            this.limit,
            this.building_id,
            this.status,
            this.user_id,
            this.search
          );
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
    this.get_proche_s(
      this.page,
      this.limit,
      this.building_id,
      this.status,
      this.user_id,
      this.search
    );
  },
  computed: {
    checkAll: {
      get: function () {
        return this.product_requests
          ? this.checked.length == this.product_requests.length
          : false;
      },
      set: function (value) {
        var checked = [];
        if (value) {
          this.product_requests.forEach(function (requests) {
            checked.push(requests);
          });
        }
        this.checked = checked;
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.table-responsive {
  max-height: 72vh;
  min-height: 72vh;
}

@media (max-width: 500px) {
  .table-responsive {
    max-height: 100vh;
    min-height: 100vh;
  }
  table {
    zoom: 65%;
  }
}

@media (max-width: 400px) {
  .table-responsive {
    max-height: 100vh;
  }
  table {
    min-width: 900px;
  }
}

table {
  table-layout: fixed;
  width: 100%;
  min-width: 1000px;
}

table thead {
  transition: all 0.5s ease-in;
}

.input-group button:focus {
  box-shadow: none;
}
</style>
