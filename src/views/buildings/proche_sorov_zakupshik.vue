<template>
  <Header_item />

  <div class="table-responsive m-2">
    <table class="table table-sm table-hover table-bordered">
      <thead class="">
        <tr>
          <th style="width: 7%">#ИД</th>
          <th style="width: 15%">Номи</th>
          <th style="width: 15%">Ҳажм</th>
          <th style="width: 15%">Ўлчов бирлиги</th>
          <th style="width: 15%">Сана</th>
          <th style="width: 15%">Изох</th>
          <th style="width: 8%"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in product_requests || []" :key="item">
          <td>{{ item.id }}</td>
          <td>
            {{ item.name }}
          </td>
          <td>
            {{ item.quantity }}
          </td>
          <td>{{ item.olchov_birligi }}</td>
          <td>
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
          <td>{{ item.comment }}</td>
          <td>
            <button
              class="btn btn-sm btn-success"
              @click="select_item(item.id, item.name)"
              data-bs-toggle="modal"
              data-bs-target="#accept_request"
            >
              <i class="fa-solid fa-circle-check text-white"></i>
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

  <Accept_request :item="item" @accept_request="accept_request" />
</template>

<script>
import Header_item from "@/components/header/header_item.vue";
import { proche_s_get, proche_s_put } from "@/utils/request/request";
import Data_notfound from "@/utils/notfound/data_notfound.vue";
import { catchError, success } from "@/utils/request/handle_api_err";
import Accept_request from "@/components/buildings/accept_request.vue";
export default {
  name: "ProcheSorovZakupshik",
  data() {
    return {
      limit: 25,
      page: 0,
      pages: null,
      product_requests: [],
      building_id: this.$route.query.id,
      status: "zakupshikda_proche",
      item: {},
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
    select_item(id, name) {
      this.item = {
        id: id,
        name: name,
      };
    },
    accept_request(e) {
      document.getElementById(`accept_request_disabled`).disabled = true;
      this.$store.dispatch("setLoading", { isLoading: true });
      proche_s_put(
        e.proche_sorov_id,
        e.status,
        e.taminotchi_id,
        e.quantity,
        e.name
      )
        .then((res) => {
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById(`accpet_request_close`).click();
          document.getElementById(`accept_request_disabled`).disabled = false;
          success(res).then(() => {
            this.get_proche_s(
              this.page,
              this.limit,
              this.building_id,
              this.status
            );
          });
          e.taminotchi_id = null;
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
          e.taminotchi_id = null;
        });
    },
  },
  created() {
    this.get_proche_s(this.page, this.limit, this.building_id, this.status);
  },
  components: { Header_item, Data_notfound, Accept_request },
};
</script>

<style lang="scss" scoped>
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
