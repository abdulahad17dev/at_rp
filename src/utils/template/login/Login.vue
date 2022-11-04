<template>
  <div class="login">
    <div class="dark_img"></div>
    <div class="container login_container">
      <div class="row">
        <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div class="card login_card border-0 bg-lite shadow rounded-3 my-5">
            <div class="card-body p-4 p-sm-5">
              <div class="brand-logo d-flex justify-content-center">
                <img
                  class="img-responsive"
                  src="https://constructionproject.crud.uz/uploaded_files/frontend_background.jpg"
                  width="150"
                  alt=""
                />
              </div>
              <h4 class="card-title text-center mb-3 mt-2 fw-light fs-5">
                Хуш келибсиз !
              </h4>
              <form @submit.prevent="SignIn">
                <div class="form-floating mb-3">
                  <input
                    type="text"
                    class="form-control"
                    id="floatingInput"
                    placeholder="Логин"
                    v-model="username"
                    autocomplete="off"
                    required
                  />
                  <label for="floatingInput">Логин</label>
                </div>
                <div class="form-floating mb-3">
                  <input
                    type="password"
                    class="form-control"
                    id="floatingPassword"
                    placeholder="Парол"
                    v-model="password"
                    autocomplete="off"
                    required
                  />
                  <label for="floatingPassword">Парол</label>
                </div>

                <div class="d-grid">
                  <button
                    class="btn btn-dark btn-login text-uppercase fw-bold"
                    type="submit"
                    id="login_button"
                  >
                    Кириш
                  </button>
                </div>
                <hr class="my-4" />
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
    };
  },
  methods: {
    SignIn() {
      this.$store.dispatch("setLoading", { isLoading: true });
      document.getElementById("login_button").disabled = true;
      let params = new URLSearchParams();
      params.append("username", this.username);
      params.append("password", this.password);
      login(params)
        .then((res) => {
          localStorage.setItem("access_token", res.data.access_token);
          localStorage.setItem("role", res.data.role);
          localStorage.setItem("user_id", res.data.id);
          this.username = "";
          this.password = "";
          window.location.href = "/menu";
        })
        .finally(() => {
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("login_button").disabled = false;
        })
        .catch((err) => {
          catchError(err);
          document.getElementById("login_button").disabled = false;
        });
    },
  },
  mounted() {
    console.clear();
    localStorage.removeItem("role");
    localStorage.removeItem("access_token");
  },
};
</script>

<style lang="scss">
.login {
  background: url(https://constructionproject.crud.uz/uploaded_files/frontend_background.jpg);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
  position: relative;
}

.btn-login {
  font-size: 0.9rem;
  letter-spacing: 0.05rem;
}
.login_container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.login_card {
  opacity: 0.9;
  background-color: #f8f9fa !important;
}

.img-responsive {
  border-radius: 10px;
}

.dark_image {
  display: none;
}
</style>
