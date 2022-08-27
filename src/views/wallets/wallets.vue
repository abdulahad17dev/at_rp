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
          class="btn btn-outline-secondary"
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#wallets_add"
        >
          <i class="fa-solid fa-circle-plus"></i>
        </button>
      </div>
    </div>
  </div>

  <Wallet_item :data="wallets" @item="item_get" />

  <Data_notfound v-if="wallets == ''" />

  <nav aria-label="Page navigation example" class="mt-2" v-if="wallets != ''">
    <ul class="pagination pagination-sm justify-content-end">
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

  <Wallet_add @add="add" />
  <Wallet_put :item="item" @put="put" />
</template>

<script>
import Header_item from "@/components/header/header_item.vue";
import Data_notfound from "@/utils/notfound/data_notfound.vue";
import { wallets_get, wallet_add, wallet_put } from "@/utils/request/request";
import { catchError, success } from "@/utils/request/handle_api_err";
import Wallet_item from "@/components/wallets/wallet_item.vue";
import Wallet_add from "@/components/wallets/wallet_add.vue";
import Wallet_put from "@/components/wallets/wallet_put.vue";
export default {
  name: "WalletsItem",
  components: {
    Header_item,
    Data_notfound,
    Wallet_item,
    Wallet_add,
    Wallet_put,
  },
  data() {
    return {
      limit: 25,
      page: 0,
      pages: null,
      wallets: [],
      search: "",
      item: {},
    };
  },
  watch: {
    limit(e) {
      this.page = 0;
      this.get_wallets(this.page, e, this.search);
    },
    page(e) {
      this.get_wallets(e, this.limit, this.search);
      document.getElementById("scroll").scrollTop = 0;
    },
    search(e) {
      if (e.length > 0) {
        this.get_wallets(this.page, this.limit, this.search);
      } else if (e.length == 0) {
        this.get_wallets(this.page, this.limit, this.search);
        this.page = 0;
      }
    },
  },
  methods: {
    get_wallets(page, limit, search) {
      this.$store.dispatch("setLoading", { isLoading: true });

      wallets_get(page, limit, search)
        .then((res) => {
          this.wallets = res.data.data;
          this.pages = res.data.pages;
          this.$store.dispatch("setLoading", { isLoading: false });
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
        });
    },
    add(e) {
      document.getElementById("wallet_disabled").disabled = true;
      this.$store.dispatch("setLoading", { isLoading: true });
      wallet_add(e)
        .then((res) => {
          document.getElementById("wallet_add").click();
          document.getElementById("wallet_disabled").disabled = false;
          success(res).then(() => {
            this.get_wallets(this.page, this.limit, this.search);
            e.name = "";
          });
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("wallet_disabled").disabled = false;
        });
    },
    item_get(e) {
      this.item = {
        id: e.id,
        name: e.name,
      };
    },
    put(e) {
      this.$store.dispatch("setLoading", { isLoading: true });
      document.getElementById("wallet_disabled2").disabled = true;
      wallet_put(e)
        .then((res) => {
          document.getElementById("wallet_put").click();
          document.getElementById("wallet_disabled2").disabled = false;
          success(res).then(() => {
            this.get_wallets(this.page, this.limit, this.search);
          });
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("wallet_disabled2").disabled = false;
        });
    },
  },
  created() {
    this.get_wallets(this.page, this.limit, this.search);
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
</style>
