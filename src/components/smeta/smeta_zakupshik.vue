<template>
  <div class="table-responsive mt-3">
    <table class="table table-sm table-hover table-bordered">
      <thead>
        <tr>
          <td>Т/р</td>
          <td>Номи</td>
          <td>Ўлчов бирлиги</td>
          <td>Норма</td>
          <td>Ҳажм</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, inc) in smeta" :key="item" class="product">
          <td
            class="td_grafik"
            data-bs-toggle="modal"
            data-bs-target="#smeta_grafik"
            @click="get_grafik(item)"
          >
            {{ inc + 1 }}
            <button class="btn btn-sm grafik">
              <i class="fa-solid fa-caret-down"></i>
            </button>
          </td>
          <td>{{ item.product_name }}</td>
          <td>{{ item.product_olchov_birligi }}</td>
          <td>{{ item.Smeta.norm }}</td>
          <td>{{ item.Smeta.quantity }}</td>
        </tr>
      </tbody>
    </table>
    <Data_notfound v-if="smeta == ''" />
  </div>

  <nav aria-label="Page navigation example" class="mt-2" v-if="smeta != ''">
    <ul class="pagination pagination-sm justify-content-end">
      <div class="page-item">
        <select
          class="form-control form-control-sm mx-2 form-select"
          v-model="limit"
        >
          <option value="100">100</option>
          <option value="500">500</option>
          <option value="1000">1000</option>
        </select>
      </div>
      <li class="page-item">
        <button
          type="button"
          class="page-link"
          @click="get_smeta(page, limit, search, status, building_id)"
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

  <!-- Modal -->
  <div
    class="modal fade"
    id="smeta_grafik"
    tabindex="-1"
    aria-labelledby="smeta_grafik_labek"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <p class="modal-title" id="smeta_grafik_labek">
            {{ product_name }} ни графиклиги
          </p>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <table class="table table-sm table-hover table-bordered">
            <tbody style="font-size: 12px">
              <tr>
                <td scope="col">Номи</td>
                <td>{{ item.name }}</td>
              </tr>
              <tr>
                <td scope="col">Ҳажм</td>
                <td>{{ item.quantity }} {{ item.olchov_birligi }}</td>
              </tr>
              <tr>
                <td scope="col">ШНК</td>
                <td>{{ item.shnk }}</td>
              </tr>
              <tr>
                <td scope="col">Нарх</td>
                <td>{{ item.allotted_price }} сўм</td>
              </tr>
              <tr>
                <td scope="col">Муддат</td>
                <td>{{ item.muddat }}</td>
              </tr>
              <tr>
                <td scope="col">Бошланиш санаси</td>
                <td>
                  {{
                    new Date(item.start_date)
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
              </tr>
              <tr>
                <td scope="col">Тугаш санаси</td>
                <td>
                  {{
                    new Date(item.end_date)
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
              </tr>
              <tr>
                <td scope="col">Норма</td>
                <td>{{ item.norm }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { smeta_request_get } from "@/utils/request/request";
import { catchError } from "@/utils/request/handle_api_err";
import Data_notfound from "@/utils/notfound/data_notfound.vue";
export default {
  name: "SmetaZakupshik",
  data() {
    return {
      smeta: [],
      pages: null,
      limit: 100,
      page: 0,
      search: "",
      building_id: 0,
      status: "wait",
      item: {},
      product_name: "",
    };
  },
  watch: {
    limit(e) {
      this.page = 0;
      this.get_smeta(this.page, e, this.search, this.status, this.building_id);
    },
    page(e) {
      this.get_smeta(e, this.limit, this.search, this.status, this.building_id);
      document.getElementById("scroll").scrollTop = 0;
    },
    search(e) {
      this.page = 0;
      if (e.length > 0) {
        this.get_smeta(
          this.page,
          this.limit,
          this.search,
          this.status,
          this.building_id
        );
      } else if (e.length == 0) {
        this.get_smeta(
          this.page,
          this.limit,
          this.search,
          this.status,
          this.building_id
        );
        this.page = 0;
      }
    },
  },
  methods: {
    get_smeta(page, limit, search, status, building_id) {
      this.$store.dispatch("setLoading", { isLoading: true });
      smeta_request_get(page, limit, search, status, building_id)
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
    get_grafik(item) {
      this.item = item.grafik;
      this.product_name = item.product_name;
    },
  },
  created() {
    this.get_smeta(
      this.page,
      this.limit,
      this.search,
      this.status,
      this.building_id
    );
  },
  components: { Data_notfound },
};
</script>

<style lang="scss" scoped>
.table-responsive table {
  min-width: 1100px;
  width: 100%;
  zoom: 75%;
}

.table-responsive {
  max-height: 70vh;
}

@media (max-width: 500px) {
  .table-responsive {
    max-height: 100vh;
  }
}

td.td_grafik {
  cursor: pointer;
}

button.grafik:focus {
  box-shadow: none;
}
</style>
