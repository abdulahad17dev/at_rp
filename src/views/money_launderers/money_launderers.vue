<template>
  <Header_item />

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
          v-model="search"
          class="form-control form-control-sm"
        />
        <button
          v-if="role != 'admin'"
          class="btn btn-outline-secondary"
          type="button"
          data-mdb-toggle="modal"
          data-mdb-target="#money_launderer_add"
        >
          <i class="fa-solid fa-user-plus"></i>
        </button>
      </div>
    </div>
  </div>

  <Money_l_items
    :data="money_launderers"
    @item="item_get"
    @get_l_id="get_l_id"
  />

  <nav
    aria-label="Page navigation example"
    class="mt-2"
    v-if="money_launderers != ''"
  >
    <ul class="pagination pagination-sm justify-content-end">
      <li>
        <Select_data :id="'select_money_l_items_data'" />
      </li>
      <li class="page-item">
        <button
          type="button"
          class="page-link"
          @click="get_money_launderers(page, limit, search)"
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

  <Money_l_add @add="add" />
  <Money_l_update :item="item" @put="put" />
  <Take_money_to_launderer :id="l_id" :name="l_name" @take_money="take_money" />
</template>

<script>
import Header_item from "@/components/header/header_item.vue";
import { catchError, success } from "@/utils/request/handle_api_err";
import {
  money_launderers_add,
  money_launderers_get,
  money_launderers_put,
  take_money_to_launderer,
} from "@/utils/request/request";
import Money_l_items from "../../components/money_launderers/money_l_items.vue";
import Money_l_add from "@/components/money_launderers/money_l_add.vue";
import Money_l_update from "../../components/money_launderers/money_l_update.vue";
import Take_money_to_launderer from "@/components/money_launderers/take_money_to_launderer.vue";
import Select_data from "@/utils/select_data/select_data.vue";
export default {
  name: "MoneyLaunderers",
  components: {
    Header_item,
    Money_l_items,
    Money_l_add,
    Money_l_update,
    Take_money_to_launderer,
    Select_data,
  },
  data() {
    return {
      limit: 25,
      page: 0,
      pages: null,
      search: "",
      money_launderers: [],
      item: {},
      l_id: null,
      l_name: "",
      role: localStorage.getItem("role"),
    };
  },
  watch: {
    limit(e) {
      this.page = 0;
      this.get_money_launderers(this.page, e, this.search);
    },
    page(e) {
      this.get_money_launderers(e, this.limit, this.search);
    },
    search(e) {
      this.page = 0;
      if (e.length > 0) {
        this.get_money_launderers(this.page, this.limit, this.search);
      } else if (e.length == 0) {
        this.get_money_launderers(this.page, this.limit, this.search);
        this.page = 0;
      }
    },
  },
  methods: {
    get_money_launderers(page, limit, search) {
      this.$store.dispatch("setLoading", { isLoading: true });

      money_launderers_get(page, limit, search)
        .then((res) => {
          this.money_launderers = res.data.data;
          this.pages = res.data.pages;
          this.$store.dispatch("setLoading", { isLoading: false });
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
        });
    },
    add(e) {
      document.getElementById("money_l_disabled").disabled = true;
      this.$store.dispatch("setLoading", { isLoading: true });
      money_launderers_add(e)
        .then((res) => {
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("money_l_add").click();
          document.getElementById("money_l_disabled").disabled = false;
          success(res);
          this.get_money_launderers(this.page, this.limit, this.search);
          e.name = "";
          e.phone = null;
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("money_l_disabled").disabled = false;
        });
    },
    item_get(e) {
      this.item = {
        id: e.id,
        name: e.name,
        phone: e.phone,
      };
    },
    put(e) {
      this.$store.dispatch("setLoading", { isLoading: true });
      document.getElementById("money_l_disabled2").disabled = true;
      money_launderers_put(e)
        .then((res) => {
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("money_l_put").click();
          document.getElementById("money_l_disabled2").disabled = false;
          success(res);
          this.get_money_launderers(this.page, this.limit, this.search);
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("money_l_disabled2").disabled = false;
        });
    },
    get_l_id(id, name) {
      this.l_id = id;
      this.l_name = name;
    },
    take_money(e) {
      document.getElementById("take_m_disabled").disabled = true;
      this.$store.dispatch("setLoading", { isLoading: true });
      take_money_to_launderer(e)
        .then((res) => {
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("take_money_close").click();
          document.getElementById("take_m_disabled").disabled = false;
          success(res);
          this.get_money_launderers(this.page, this.limit, this.search);
          e.money = null;
          e.from_ = this.l_id;
          e.to_ = 0;
          e.comment = "";
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("take_m_disabled").disabled = false;
        });
    },
  },
  created() {
    this.get_money_launderers(this.page, this.limit, this.search);
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
  min-width: 700px;
  width: 100%;
}

.table-responsive {
  max-height: 70vh;
}

@media (max-width: 500px) {
  .table-responsive {
    max-height: 95vh;
  }
}
</style>
