<template>
  <div class="row">
    <div class="col mt-1 d-flex align-items-center">
      <span>Лимит</span>
      <select
        class="form-control form-control-sm mx-2 form-select"
        v-model="limit"
      >
        <option value="25" selected>25</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
    </div>
    <div class="col mt-2 d-flex align-items-center justify-content-end">
      <span>Қидириш: </span>
      <div class="input-group input-group-sm mx-2">
        <input
          type="search"
          v-model="item"
          class="form-control form-control-sm"
        />
      </div>
    </div>
  </div>

  <div class="table-responsive mt-3">
    <table class="table table-sm table-hover">
      <thead class="">
        <tr>
          <th style="width: 10%">№</th>
          <th style="width: 20%">Материал</th>
          <th style="width: 10%">Ўлчов бирлиги</th>
          <th style="width: 10%">Сарфланган ҳажм</th>
          <th style="width: 10%">Сана</th>
          <th style="width: 20%">Прорап</th>
          <th style="width: 20%">Иш</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, inc) in products || []" :key="item">
          <td>{{ inc + 1 }}</td>
          <td>
            {{
              item.item.split("//=>//", 4)[3] == "smeta"
                ? item.item.split("//=>//", 4)[0]
                : item.item.split("//=>//", 4)[3] == "tarkib"
                ? item.item.split("//=>//", 4)[0] +
                  ":" +
                  item.item.split("//=>//", 4)[1]
                : item.item.split("//=>//", 4)[1]
            }}
          </td>
          <td>{{ item.item.split("//=>//", 4)[2] }}</td>
          <td>
            <Format_numbers :number="item.sum_quantity" />
          </td>
          <td>
            {{
              new Date(item.Spent_items_to_work.time)
                .toLocaleDateString({
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                })
                .slice(0, 10)
            }}
          </td>
          <td>{{ item.user }}</td>
          <td>{{ item.work.split("=>", 2)[0] }}</td>
        </tr>
      </tbody>
    </table>
    <data_notfound v-if="products == ''" />
  </div>

  <nav aria-label="Page navigation example" class="mt-2" v-if="products != ''">
    <ul class="pagination pagination-sm justify-content-end">
      <li class="page-item">
        <button type="button" class="page-link" @click="get_spent_products()">
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
import { get_spent_products_to_work } from "@/utils/request/request";
import { catchError } from "@/utils/request/handle_api_err";
import data_notfound from "@/utils/notfound/data_notfound.vue";
import Format_numbers from "@/utils/format/format_numbers.vue";
export default {
  components: { data_notfound, Format_numbers },
  name: "SpentProducts",
  data() {
    return {
      page: 0,
      pages: null,
      limit: 25,
      item: "",
      products: [],
    };
  },
  watch: {
    limit() {
      this.page = 0;
      this.get_spent_products();
    },
    page() {
      this.get_spent_products();
      document.getElementById("scroll").scrollTop = 0;
    },
    item() {
      this.page = 0;
      this.get_spent_products();
    },
  },
  methods: {
    get_spent_products() {
      this.$store.dispatch("setLoading", { isLoading: true });

      get_spent_products_to_work(0, "", 0, this.item, this.page, this.limit)
        .then((res) => {
          this.products = res.data.data;
          this.pages = res.data.pages;
          this.$store.dispatch("setLoading", { isLoading: false });
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
        });
    },
  },
  created() {
    this.get_spent_products();
  },
};
</script>

<style lang="scss" scoped>
.col select {
  width: 80px;
  height: 30px;
}
.col .input-group {
  width: 200px;
}

@media (max-width: 509px) {
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

table {
  min-width: 1150px;
  width: 100%;
}

.table-responsive {
  max-height: 65vh;
}

@media (max-width: 500px) {
  .table-responsive {
    max-height: 89vh;
  }
}
</style>
