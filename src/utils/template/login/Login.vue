<template>
  <div class="content login">
    <div class="container">
      <div class="row">
        <div class="col-md-6 d-flex justify-content-center">
          <img
            src="https://constructionproject.crud.uz/uploaded_files/frontend_login_bg.gif"
            alt="Image"
            class="img-fluid"
            style="display: block; margin: auto"
          />
        </div>
        <div class="col-md-6 contents">
          <div class="row justify-content-center">
            <div class="col-md-8">
              <div class="mb-4 text-center">
                <h3>Хуш келибсиз !</h3>
                <p class="mb-4">Кириш учун ушбу формани тўлдиринг.</p>
              </div>
              <form @submit.prevent="login">
                <div class="form-group first field--not-empty">
                  <label for="username">Логин</label>
                  <div class="input-group flex-nowrap">
                    <input
                      type="text"
                      class="form-control"
                      id="username"
                      placeholder="Логин"
                      v-model="username"
                      autocomplete="off"
                      required
                    />
                    <div
                      class="input-group-text"
                      style="
                        width: 45px;
                        color: #2c3e50 !important;
                        background: white !important;
                      "
                    >
                      <i class="fa-solid fa-at"></i>
                    </div>
                  </div>
                </div>
                <div class="form-group last mb-4 field--not-empty">
                  <label for="password">Парол</label>
                  <div class="input-group flex-nowrap">
                    <input
                      :type="type"
                      class="form-control"
                      id="password"
                      placeholder="Парол"
                      v-model="password"
                      autocomplete="off"
                      required
                    />
                    <div
                      class="input-group-text"
                      style="
                        cursor: pointer;
                        width: 45px;
                        text-align: center;
                        color: #2c3e50 !important;
                        background: white !important;
                      "
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
                <!-- <div class="d-flex mb-5 align-items-center">
                  <label class="control control--checkbox mb-0"
                    ><span class="caption">Remember me</span>
                    <input type="checkbox" checked="checked" />
                    <div class="control__indicator"></div>
                  </label>
                  <span class="ml-auto"
                    ><a href="#" class="forgot-pass">Forgot Password</a></span
                  >
                </div> -->
                <button
                  type="submit"
                  id="login_button"
                  class="btn btn-block btn-primary"
                  :disabled="!username || !password"
                >
                  <i class="fa-solid fa-arrow-right-to-bracket"></i>
                  Кириш
                  <div
                    class="spinner-border spinner-border-sm mx-1"
                    role="status"
                    v-if="loading"
                  >
                    <span class="visually-hidden">Loading...</span>
                  </div>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { catchError } from "@/utils/request/handle_api_err";
import { login } from "./../../request/request";
export default {
  name: "LoginItem",
  data() {
    return {
      username: "",
      password: "",
      loading: false,
      type: "password",
      icon: "fa-regular fa-eye",
    };
  },
  methods: {
    login() {
      this.loading = true;
      document.getElementById("login_button").disabled = true;
      let params = new URLSearchParams();
      params.append("username", this.username);
      params.append("password", this.password);
      login(params)
        .then((res) => {
          localStorage.setItem("access_token", res.data.access_token);
          localStorage.setItem("role", res.data.role);
          localStorage.setItem("user_id", res.data.id);
          window.location.href = "/menu";
        })
        .finally(() => {
          this.loading = false;
          document.getElementById("login_button").disabled = false;
        })
        .catch((err) => {
          catchError(err);
          document.getElementById("login_button").disabled = false;
        });
    },
    toggle() {
      this.type = this.type === "password" ? "text" : "password";
    },
  },
  mounted() {
    console.clear();
    localStorage.removeItem("role");
    localStorage.removeItem("access_token");
    document.getElementById("username").focus();
  },
};
</script>

<style lang="scss">
.content {
  overflow-y: auto;
  height: 100vh;
}

.container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.contents .row {
  margin: 4rem 0;
}

@media (max-width: 768px) {
  .contents .row {
    margin: 0 0;
  }
}

input#username,
input#password {
  color: #2c3e50 !important;
  background-color: #fff !important;
}
</style>
