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
      <select
        class="form-control form-control-sm mx-2 form-select"
        v-model="role"
      >
        <option value="">барчаси</option>
        <option value="admin">админ</option>
        <option value="omborchi">омборчи</option>
        <option value="taminotchi">таминотчи</option>
        <option value="prorap">прорап</option>
        <option value="pto">пто</option>
        <option value="kassir">кассир</option>
        <option value="bugalter">бугалтер</option>
        <option value="ish_yurituvchi">иш_юритувчи</option>
        <option value="bazachi">базачи</option>
        <option value="zakupshik">закупшик</option>
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
          data-bs-target="#user_add"
        >
          <i class="fa-solid fa-user-plus"></i>
        </button>
      </div>
    </div>
  </div>

  <User_item :data="users" @get_users="get_users(page, limit, search)" />
  <Data_notfound v-if="users == ''" />

  <nav aria-label="Page navigation example" class="mt-2" v-if="users != ''">
    <ul class="pagination justify-content-end">
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

  <User_add @add="add" />
</template>

<script>
import { user_add, user_get } from "@/utils/request/request";
import { catchError, success } from "@/utils/request/handle_api_err";
import User_item from "@/components/users/user_item.vue";
import User_add from "../../components/users/user_add.vue";
import Data_notfound from "@/utils/notfound/data_notfound.vue";
import Header_item from "@/components/header/header_item.vue";
export default {
  name: "UsersPage",
  data() {
    return {
      limit: 25,
      page: 0,
      pages: null,
      users: [],
      search: "",
      role: "",
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
    add(e) {
      document.getElementById("user_disabled").disabled = true;
      this.$store.dispatch("setLoading", { isLoading: true });
      user_add(e)
        .then((res) => {
          success(res);
          document.getElementById("user_add").click();
          this.$store.dispatch("setLoading", { isLoading: false });
          this.get_users(this.page, this.limit, this.search, this.role);
          document.getElementById("user_disabled").disabled = false;
          e.name = "";
          e.username = "";
          e.password = "";
          e.role = "";
          e.phone = null;
          e.status = "true";
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("user_disabled").disabled = false;
        });
    },
  },
  beforeMount() {
    this.get_users(this.page, this.limit, this.search, this.role);
  },
  components: { User_item, User_add, Data_notfound, Header_item },
};
</script>

<style lang="scss" scoped>
.col select {
  width: 80px;
  height: 30px;
}

.col select:last-child {
  height: 30px;
  width: 130px;
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
