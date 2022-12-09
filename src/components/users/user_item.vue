<template>
  <div class="table-responsive mt-3">
    <table class="table table-sm table-hover" id="user_item">
      <thead class="">
        <tr>
          <th>№</th>
          <th>Исм</th>
          <th>Телефон рақам</th>
          <th>Баланс</th>
          <th>Ихтисослиги</th>
          <th>Статус</th>
          <th data-exclude="true">Ўзгартириш</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, inc) in data || []" :key="item">
          <td>{{ inc + 1 }}</td>
          <td>{{ item.name }}</td>
          <td>
            <a
              :href="`tel:+998${item.phone}`"
              class="text-decoration-none text-dark"
            >
              +998 {{ format_phone(item.phone) }}</a
            >
          </td>
          <td>{{ Intl.NumberFormat("en-US").format(item.balance) }} сўм</td>
          <td>{{ item.role }}</td>
          <td>
            <span
              v-if="item.status == true"
              class="badge rounded-pill bg-success"
              >фаол</span
            >
            <span v-else class="badge rounded-pill bg-danger">нофаол</span>
          </td>
          <td data-exclude="true">
            <button
              class="btn btn-sm btn-warning"
              data-mdb-toggle="modal"
              data-mdb-target="#user_put"
              @click="items(item)"
            >
              <i class="fa fa-edit text-white"></i>
            </button>
            <router-link
              :to="{ name: 'cashier_history', query: { id: item.id } }"
              class="btn btn-sm btn-secondary mx-1"
              v-if="item.role == 'kassir'"
            >
              <i class="fa-solid fa-clock-rotate-left"></i>
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <User_put :object="item" @put="put" />
</template>

<script>
import { user_put } from "@/utils/request/request";
import User_put from "./user_put.vue";
import { catchError, success } from "@/utils/request/handle_api_err";
export default {
  name: "UserItem",
  props: { data: Array },
  emits: ["get_users"],
  components: { User_put },
  data() {
    return {
      item: {},
    };
  },
  methods: {
    items(e) {
      this.item = {
        id: e.id,
        name: e.name,
        username: e.username,
        password: "",
        role: e.role,
        phone: e.phone,
        status: e.status,
      };
    },
    put(e) {
      this.$store.dispatch("setLoading", { isLoading: true });
      document.getElementById("user_disabled_put").disabled = true;
      user_put(e)
        .then((res) => {
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("user_put").click();
          document.getElementById("user_disabled_put").disabled = false;
          success(res);
          this.$emit("get_users");
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("user_disabled_put").disabled = false;
        });
    },
    format_phone(number) {
      return String(
        "(" +
          String(number).substr(0, 2) +
          ") " +
          String(number).substr(2, 3) +
          " " +
          String(number).substr(5, 2) +
          " " +
          String(number).substr(7, 2)
      );
    },
  },
};
</script>

<style lang="scss" scoped>
table {
  min-width: 700px;
  width: 100%;
}

.table-responsive {
  max-height: 66vh;
}

@media (max-width: 500px) {
  .table-responsive {
    max-height: 85vh;
  }
}
</style>
