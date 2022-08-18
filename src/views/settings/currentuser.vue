<template>
  <details open>
    <summary><strong>Шахсий маълумотлар</strong></summary>
    <form @submit.prevent="put()">
      <div class="row gap-2 m-3">
        <div class="col-5 mx-auto">
          <label>Исм: </label>
          <input
            type="text"
            class="form-control form-control-sm"
            v-model="user.name"
            required
          />
        </div>
        <div class="col-5 mx-auto">
          <label>Телефон рақам: </label>
          <div class="input-group">
            <span class="input-group-text bg-white">+998</span>
            <input
              type="tel"
              maxlength="9"
              minlength="9"
              class="form-control form-control-sm"
              v-model="user.phone"
              required
            />
          </div>
        </div>
        <div class="col-5 mx-auto">
          <label>Логин: </label>
          <input
            type="text"
            class="form-control form-control-sm"
            v-model="user.username"
            required
          />
        </div>
        <div class="col-5 mx-auto">
          <label>Парол: </label>
          <input
            type="text"
            class="form-control form-control-sm"
            v-model="user.password"
          />
        </div>
        <div class="col-5 mx-auto mt-4">
          <button
            class="btn btn-primary btn-sm btn-block w-100"
            type="submit"
            id="current_user"
          >
            сақлаш
          </button>
        </div>
        <div class="col-5 mx-auto"></div>
      </div>
    </form>
  </details>
</template>

<script>
import { current_user, user_put } from "@/utils/request/request";
import { catchError, success } from "@/utils/request/handle_api_err";
export default {
  name: "CurrentUserItem",
  data() {
    return {
      user: {},
    };
  },
  methods: {
    get() {
      this.$store.dispatch("setLoading", { isLoading: true });

      current_user()
        .then((res) => {
          this.user = {
            id: res.data.id,
            name: res.data.name,
            username: res.data.username,
            password: "",
            role: res.data.role,
            phone: res.data.phone,
            status: true,
          };
          this.$store.dispatch("setLoading", { isLoading: false });
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
        });
    },
    put() {
      this.$store.dispatch("setLoading", { isLoading: true });
      document.getElementById("current_user").disabled = true;

      user_put(this.user)
        .then((res) => {
          document.getElementById("current_user").disabled = false;
          success(res).then(() => {
            this.get();
          });
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("current_user").disabled = false;
        });
    },
  },
  beforeMount() {
    this.get();
  },
};
</script>

<style>
summary {
  display: flex;
  justify-content: space-between;
  align-items: center;
  list-style: none;
  padding: 10px;
  outline: none !important;
}

details {
  border: 2px solid rgb(0, 0, 0, 0.2);
}

details[open] summary {
  border-bottom: 2px solid rgb(0, 0, 0, 0.2);
}
</style>
