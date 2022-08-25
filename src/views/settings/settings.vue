<template>
  <div class="row">
    <div class="col"></div>
    <div class="col">
      <h4 class="card-title text-center mb-3">
        <span :class="this.$route.meta.icon"></span>
        {{ this.$route.meta.title }}
      </h4>
    </div>
    <div class="col">
      <button class="btn btn-dark btn-sm float-end" @click="logout">
        <i class="fa-solid fa-arrow-right-from-bracket"></i>
      </button>
    </div>
  </div>
  <hr class="" />

  <Dark_mode />

  <currentuser class="my-2" />
</template>

<script>
import currentuser from "./currentuser.vue";
import Dark_mode from "./dark_mode.vue";
export default {
  components: { currentuser, Dark_mode },
  name: "SettingsItem",
  methods: {
    logout() {
      this.$router.push("/");
      console.clear();
      localStorage.removeItem("role");
      localStorage.removeItem("access_token");
    },
  },
};
</script>

<!-- <style>
</style> -->
