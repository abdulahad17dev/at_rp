<template>
  <div class="app" v-if="this.$route.name !== 'login'">
    <div class="scroll" id="scroll">
      <div class="container-fluid">
        <div class="content-app">
          <div class="card shadow mt-3 mb-3 border-0">
            <div class="card-body zoom">
              <slot />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Router_back
    v-if="this.$route.name !== 'menu' && this.$route.name !== 'login'"
  />

  <login v-if="this.$route.name == 'login'" />
</template>

<script>
import Login from "../template/login/Login.vue";
import Router_back from "../../views/settings/router_back.vue";
export default {
  components: { Login, Router_back },
  data() {
    return {
      nightMode: localStorage.getItem("nightMode"),
    };
  },
  created() {
    this.nightMode = JSON.parse(localStorage.getItem("nightMode"));

    if (this.nightMode == true) {
      localStorage.setItem("nightMode", this.nightMode);
      document.querySelector("#app").classList.remove("dark");
    } else {
      localStorage.setItem("nightMode", this.nightMode);
      document.querySelector("#app").classList.add("dark");
    }
  },
};
</script>

<style lang="scss">
@import url(./../../main.scss);
@import url(./../style/dark.scss);
</style>
