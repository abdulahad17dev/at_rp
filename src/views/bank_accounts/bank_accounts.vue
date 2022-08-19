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
          data-bs-target="#bank_account_add"
        >
          <i class="fa-solid fa-circle-plus"></i>
        </button>
      </div>
    </div>
  </div>

  <Bank_items
    :data="bank_accounts"
    @get="bank_accounts_get(page, limit, search)"
  />

  <Data_notfound v-if="bank_accounts == ''" />

  <nav
    aria-label="Page navigation example"
    class="mt-2"
    v-if="bank_accounts != ''"
  >
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

  <Bank_add @add="add" />
</template>

<script>
import Header_item from "@/components/header/header_item.vue";
import Bank_items from "../../components/bank_accounts/bank_items.vue";
import { bank_account_add, bank_account_get } from "@/utils/request/request";
import { catchError, success } from "@/utils/request/handle_api_err";
import Data_notfound from "@/utils/notfound/data_notfound.vue";
import Bank_add from "@/components/bank_accounts/bank_add.vue";
export default {
  components: {
    Header_item,
    Bank_items,
    Data_notfound,
    Bank_add,
  },
  name: "BankAccounts",
  data() {
    return {
      limit: 25,
      page: 0,
      pages: null,
      bank_accounts: [],
      search: "",
      item: {},
    };
  },
  watch: {
    limit(e) {
      this.page = 0;
      this.bank_accounts_get(this.page, e, this.search);
    },
    page(e) {
      this.bank_accounts_get(e, this.limit, this.search);
      document.getElementById("scroll").scrollTop = 0;
    },
    search(e) {
      if (e.length > 0) {
        this.bank_accounts_get(this.page, this.limit, this.search);
      } else if (e.length == 0) {
        this.bank_accounts_get(this.page, this.limit, this.search);
        this.page = 0;
      }
    },
  },
  methods: {
    bank_accounts_get(page, limit, search) {
      this.$store.dispatch("setLoading", { isLoading: true });

      bank_account_get(page, limit, search)
        .then((res) => {
          this.bank_accounts = res.data.data;
          this.pages = res.data.pages;
          this.$store.dispatch("setLoading", { isLoading: false });
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
        });
    },
    add(e) {
      document.getElementById("bank_disabled").disabled = true;
      this.$store.dispatch("setLoading", { isLoading: true });
      bank_account_add(e)
        .then((res) => {
          this.bank_accounts_get(this.page, this.limit, this.search);
          success(res);
          document.getElementById("bank_add").click();
          document.getElementById("bank_disabled").disabled = false;
          e.name = "";
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("bank_disabled").disabled = false;
        });
    },
  },
  beforeMount() {
    this.bank_accounts_get(this.page, this.limit, this.search);
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

@media (max-width: 520px) {
  .row {
    display: block;
  }
  .row .col .input-group {
    width: 600px;
  }
  .row .col select {
    width: 100%;
  }
}
</style>
