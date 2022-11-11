<template>
  <div>
    <h5 class="text-center">
      <b class="text-secondary"> {{ name }}</b>
    </h5>
    <ul class="nav nav-pills nav-fill mb-3" id="pills-tab" role="tablist">
      <li class="nav-item mx-1" role="presentation">
        <button
          class="btn btn-sm w-100 btn-light"
          id="pills-home-tab"
          data-bs-toggle="pill"
          data-bs-target="#pills-home"
          type="button"
          role="tab"
          aria-controls="pills-home"
          aria-selected="true"
          @click="smeta = true"
        >
          Смета
        </button>
      </li>
      <li class="nav-item mx-1" role="presentation">
        <button
          class="btn btn-sm w-100 btn-light"
          id="pills-profile-tab"
          data-bs-toggle="pill"
          data-bs-target="#pills-profile"
          type="button"
          role="tab"
          aria-controls="pills-profile"
          aria-selected="false"
          @click="proche_sorov = true"
        >
          Проче сўров
        </button>
      </li>
    </ul>
    <div class="tab-content" id="pills-tabContent">
      <div
        class="tab-pane fade show"
        id="pills-home"
        role="tabpanel"
        aria-labelledby="pills-home-tab"
      >
        <Smeta_admin v-if="smeta === true" />
      </div>
      <div
        class="tab-pane fade"
        id="pills-profile"
        role="tabpanel"
        aria-labelledby="pills-profile-tab"
      >
        <Proche_sorov_admin v-if="proche_sorov === true" />
      </div>
    </div>
  </div>
</template>

<script>
import Smeta_admin from "@/components/smeta/smeta_admin.vue";
import Proche_sorov_admin from "@/components/buildings/proche_sorov_admin.vue";
export default {
  name: "BuldingInner",
  data() {
    return {
      name: this.$route.query.name,
      smeta: "",
      proche_sorov: "",
    };
  },
  components: { Smeta_admin, Proche_sorov_admin },
};
</script>

<!-- <style lang="scss" scoped>
</style> -->
