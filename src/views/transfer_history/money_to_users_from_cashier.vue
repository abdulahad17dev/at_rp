<template>
  <div>
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
        </div>
      </div>
    </div>

    <Money_to_users_item :data="users" @get_item="get_item" />

    <Data_notfound v-if="users == ''" />

    <nav aria-label="Page navigation example" class="mt-2" v-if="users != ''">
      <ul class="pagination pagination-sm justify-content-end">
        <li class="page-item">
          <button
            type="button"
            class="page-link"
            @click="get_users(page, limit, search, role)"
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
          <button
            class="page-link"
            @click="page++"
            :disabled="page == pages - 1"
          >
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

    <Pay_to_user_body
      :id="user.id"
      :name="user.name"
      @transfer_to_user="transfer_to_user"
    />
  </div>
</template>

<script>
import Header_item from "@/components/header/header_item.vue";
import { catchError, success } from "@/utils/request/handle_api_err";
import { transfer_money_to_users, user_get } from "@/utils/request/request";
import Data_notfound from "@/utils/notfound/data_notfound.vue";
import Money_to_users_item from "@/components/transfer/money_to_users_item.vue";
import Pay_to_user_body from "../../components/transfer/pay_to_user_body.vue";
export default {
  name: "MoneyToUsers",
  data() {
    return {
      limit: 25,
      page: 0,
      pages: null,
      users: [],
      search: "",
      role: "",
      user: {
        id: null,
        name: "",
      },
    };
  },
  watch: {
    limit(e) {
      this.page = 0;
      this.get_users(this.page, e, this.search, this.role);
    },
    page(e) {
      this.get_users(e, this.limit, this.search, this.role);
      document.getElementById("scroll").scrollTop = 0;
    },
    search(e) {
      if (e.length > 0) {
        this.get_users(this.page, this.limit, this.search, this.role);
      } else if (e.length == 0) {
        this.get_users(this.page, this.limit, this.search, this.role);
        this.page = 0;
      }
    },
    role(e) {
      if (e.length > 0) {
        this.get_users(this.page, this.limit, this.search, this.role);
      } else if (e.length == 0) {
        this.get_users(this.page, this.limit, this.search, this.role);
        this.page = 0;
      }
    },
  },
  methods: {
    get_users(page, limit, search, role) {
      this.$store.dispatch("setLoading", { isLoading: true });

      user_get(page, limit, search, role)
        .then((res) => {
          this.users = res.data.data;
          this.pages = res.data.pages;
          this.$store.dispatch("setLoading", { isLoading: false });
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
        });
    },
    get_item(e) {
      this.user = {
        id: e.id,
        name: e.name,
      };
    },
    transfer_to_user(e) {
      document.getElementById("pay_to_user_d").disabled = true;
      this.$store.dispatch("setLoading", { isLoading: true });
      transfer_money_to_users(e)
        .then((res) => {
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("pay_to_user_c").click();
          document.getElementById("pay_to_user_d").disabled = false;
          success(res).then(() => {
            this.get_users(this.page, this.limit, this.search, this.role);
            e.money = null;
            e.from_ = 0;
            e.to_ = this.user.id;
            e.comment = "";
          });
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("pay_to_user_d").disabled = false;
        });
    },
  },
  components: {
    Header_item,
    Data_notfound,
    Money_to_users_item,
    Pay_to_user_body,
  },
  created() {
    this.get_users(this.page, this.limit, this.search, this.role);
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

table {
  min-width: 700px;
  width: 100%;
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
</style>
