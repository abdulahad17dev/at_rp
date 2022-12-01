<template>
  <Header_item :name="name" />
  <div>
    <ul class="nav nav-tabs nav-fill mb-3" id="pills-tab" role="tablist">
      <li class="nav-item mx-1" role="presentation">
        <a
          class="nav-link"
          id="pills-home-tab"
          data-mdb-toggle="pill"
          data-mdb-target="#pills-home"
          type="button"
          role="tab"
          aria-controls="pills-home"
          aria-selected="true"
          @click="smeta = true"
        >
          Смета
        </a>
      </li>
      <li class="nav-item mx-1" role="presentation">
        <a
          class="nav-link"
          id="pills-profile-tab"
          data-mdb-toggle="pill"
          data-mdb-target="#pills-profile"
          type="button"
          role="tab"
          aria-controls="pills-profile"
          aria-selected="false"
          @click="proche_sorov = true"
        >
          Проче сўров
        </a>
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
import Header_item from "@/components/header/header_item.vue";
export default {
  name: "BuldingInner",
  data() {
    return {
      name: this.$route.query.name,
      smeta: "",
      proche_sorov: "",
    };
  },
  components: { Smeta_admin, Proche_sorov_admin, Header_item },
};
</script>

<!-- <style lang="scss" scoped>
</style> -->
