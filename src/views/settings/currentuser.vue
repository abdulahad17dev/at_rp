<template>
  <button
    class="btn btn-dark btn-floating mx-1"
    data-mdb-toggle="modal"
    data-mdb-target="#user_profile"
    @click="get"
  >
    <i class="fa-solid fa-user"></i>
  </button>
  <div
    class="modal fade"
    id="user_profile"
    tabindex="-1"
    aria-labelledby="user_profileLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="user_profileLabel">
            Фойдаланувчи маълумотлари
          </h5>
          <button
            type="button"
            class="btn-close"
            data-mdb-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="put()" id="user_profile_submit">
            <div class="row m-2">
              <div class="col-12 mx-auto">
                <label>Исм: </label>
                <input
                  type="text"
                  class="form-control"
                  v-model="user.name"
                  required
                />
              </div>
              <div class="col-12 mx-auto">
                <label>Телефон рақам: </label>
                <div class="input-group">
                  <span class="input-group-text bg-white">+998</span>
                  <input
                    type="tel"
                    maxlength="9"
                    minlength="9"
                    class="form-control"
                    v-model="user.phone"
                    required
                    @keypress="onlyNumber"
                  />
                </div>
              </div>
              <div class="col-12 mx-auto">
                <label>Логин: </label>
                <input
                  type="text"
                  class="form-control"
                  v-model="user.username"
                  required
                />
              </div>
              <div class="col-12 mx-auto">
                <label>Парол: </label>
                <div class="input-group flex-nowrap">
                  <input
                    :type="type"
                    class="form-control"
                    v-model="user.password"
                  />
                  <div
                    class="input-group-text"
                    style="cursor: pointer; width: 45px; text-align: center"
                    @click="toggle"
                  >
                    <span v-if="type == 'password'">
                      <i class="fa-regular fa-eye"></i>
                    </span>
                    <span v-else>
                      <i class="fa-regular fa-eye-slash"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-mdb-dismiss="modal"
          >
            Қайтиш
          </button>
          <button
            type="submit"
            class="btn btn-primary"
            form="user_profile_submit"
            id="disabled"
            :disabled="
              user.name == disabled.name &&
              user.phone == disabled.phone &&
              user.username == disabled.username &&
              user.password == disabled.password
            "
          >
            Сақлаш
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { current_user, user_put } from "@/utils/request/request";
import { catchError, success } from "@/utils/request/handle_api_err";
export default {
  name: "CurrentUserItem",
  data() {
    return {
      user: {},
      disabled: {},
      type: "password",
      icon: "fa-regular fa-eye",
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
          this.disabled = {
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
      document.getElementById("disabled").disabled = true;

      user_put(this.user)
        .then((res) => {
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("disabled").disabled = false;
          success(res);
          this.get();
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("disabled").disabled = false;
        });
    },
    onlyNumber($event) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
        $event.preventDefault();
      }
    },
    toggle() {
      this.type = this.type === "password" ? "text" : "password";
    },
  },
};
</script>

<style scoped lang="scss">
@media (max-width: 700px) {
  .row {
    display: block;
  }
  .col-5 {
    width: 100%;
  }
}
</style>
