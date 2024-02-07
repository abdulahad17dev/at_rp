<template>
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
        <option value="finished">якунланган</option>
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
      </div>
    </div>
  </div>

  <div
    class="table-responsive mt-3"
    id="table-responsive"
    style="overflow: auto"
  >
    <table
      class="table table-sm smeta"
      id="select_smeta_data"
      v-if="smeta != ''"
    >
      <tbody v-for="item in smeta" :key="item">
        <tr v-if="!item.Smeta.grafik_id" class="bg-dark text-white text-center">
          <td colspan="11">{{ item.Smeta.name }}</td>
        </tr>
        <tr
          v-if="
            !types.find((e) => {
              return e == item.Smeta.type;
            }) && item.Smeta.grafik_id
          "
          class="text-center"
        >
          <td colspan="11">{{ item.Smeta.name }}</td>
        </tr>
        <tr v-if="item.Smeta.type == 'grafik'" class="grafik">
          <td style="width: 5%">{{ item.Smeta.shnk }}</td>
          <td style="width: 20%">{{ item.Smeta.name }}</td>
          <td style="width: 5%">{{ item.Smeta.olchov_birligi }}</td>
          <td style="width: 10%">
            <Format_numbers :number="item.Smeta.quantity" />
          </td>
          <td style="width: 10%">
            <Format_numbers :number="item.Smeta.allotted_time_for_worker" />
          </td>
          <td style="width: 10%">
            <Format_numbers :number="item.Smeta.allotted_time_for_machine" />
          </td>
          <td style="width: 10%">
            <span v-if="item.Smeta.alotted_price">
              <Format_numbers :number="item.Smeta.alotted_price" />
            </span>
            <span v-else>0</span> сўм
          </td>
          <td style="width: 5%">{{ item.Smeta.muddat }} кун</td>
          <td style="width: 10%">
            {{
              new Date(item.Smeta.start_date)
                .toLocaleDateString({
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                })
                .slice(0, 10)
            }}
          </td>
          <td style="width: 10%">
            {{
              new Date(item.Smeta.end_date)
                .toLocaleDateString({
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                })
                .slice(0, 10)
            }}
          </td>
          <td style="width: 5%">
            <button
              v-if="
                item.Smeta.status !== 'removed' &&
                item.Smeta.status !== 'finished' &&
                role == 'pto'
              "
              class="btn btn-danger btn-sm"
              @click="$emit('remove_smeta', item.Smeta.id)"
              id="remove_smeta"
            >
              <i class="fa-solid fa-circle-xmark"></i>
            </button>
            <span
              v-if="item.Smeta.status == 'removed'"
              class="badge rounded-pill bg-danger"
              >ўчирилган</span
            ><span
              v-else-if="item.Smeta.status == 'finished'"
              class="badge rounded-pill bg-success"
              >якунланган</span
            >
          </td>
        </tr>
        <tr
          v-if="item.Smeta.type == 'allotted_time_for_worker'"
          class="allotted_time_for_worker"
        >
          <td></td>
          <td>{{ item.Smeta.name }}</td>
          <td>{{ item.Smeta.olchov_birligi }}</td>
          <td>
            <Format_numbers :number="item.Smeta.norm" />
          </td>
          <td>
            <Format_numbers :number="item.Smeta.quantity" />
          </td>
          <td colspan="6">
            <span v-if="item.Smeta.alotted_price">
              <Format_numbers :number="item.Smeta.alotted_price" />
            </span>
            <span v-else>0</span> сўм
          </td>
        </tr>
        <tr
          v-if="item.Smeta.type == 'allotted_time_for_machine'"
          class="allotted_time_for_machine"
        >
          <td></td>
          <td>{{ item.Smeta.name }}</td>
          <td>{{ item.Smeta.olchov_birligi }}</td>
          <td>
            <Format_numbers :number="item.Smeta.norm" />
          </td>
          <td>
            <Format_numbers :number="item.Smeta.quantity" />
          </td>
          <td colspan="6">
            <span v-if="item.Smeta.alotted_price">
              <Format_numbers :number="item.Smeta.alotted_price" />
            </span>
            <span v-else>0</span> сўм
          </td>
        </tr>
        <tr v-if="item.Smeta.type == 'product'" class="product">
          <td></td>
          <td>{{ item.product_name }}</td>
          <td>{{ item.product_olchov_birligi }}</td>
          <td>
            <Format_numbers :number="item.Smeta.norm" />
          </td>
          <td>
            <Format_numbers :number="item.Smeta.quantity" />
          </td>
          <td colspan="6">
            <span v-if="item.Smeta.alotted_price">
              <Format_numbers :number="item.Smeta.alotted_price" />
            </span>
            <span v-else>0</span> сўм
          </td>
        </tr>
      </tbody>
    </table>
    <Data_notfound v-if="smeta == ''" />
  </div>

  <nav aria-label="Page navigation example" class="mt-2" v-if="smeta != ''">
    <ul class="pagination pagination-sm justify-content-end">
      <li>
        <Select_data :id="'select_smeta_data'" />
      </li>
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
        <button class="page-link" @click="page--" :disabled="page == 0">
          <i class="fa-solid fa-angle-left text-dark"></i>
        </button>
      </li>
      <li class="page-item">
        <select class="form-control form-control-sm page_select" v-model="page">
          <option :value="item - 1" v-for="item in pages" :key="item">
            {{ item }}
          </option>
        </select>
      </li>
      <li class="page-item">
        <button class="page-link" @click="page++" :disabled="page == pages - 1">
          <i class="fa-solid fa-angle-right text-dark"></i>
        </button>
      </li>
    </ul>
  </nav>
</template>

<script>
import Data_notfound from "@/utils/notfound/data_notfound.vue";
import { smeta_get } from "@/utils/request/request";
import { catchError } from "@/utils/request/handle_api_err";
import Format_numbers from "@/utils/format/format_numbers.vue";
import Select_data from "@/utils/select_data/select_data.vue";
export default {
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
      types: [
        "grafik",
        "allotted_time_for_worker",
        "allotted_time_for_machine",
        "product",
      ],
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
      this.get_smeta(
        this.page,
        this.limit,
        e,
        this.type,
        this.status,
        this.building_id,
        this.order_by
      );
    },
    status(e) {
      this.page = 0;
      this.get_smeta(
        this.page,
        this.limit,
        this.search,
        this.type,
        e,
        this.building_id,
        this.order_by
      );
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
  },
  mounted() {
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
  components: { Data_notfound, Format_numbers, Select_data },
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

table.smeta {
  min-width: 2000px;
  width: 100%;
  zoom: 65%;
}

.table-responsive {
  max-height: 60vh;
}
@media (max-width: 500px) {
  .table-responsive {
    max-height: 90vh;
  }
}
</style>
