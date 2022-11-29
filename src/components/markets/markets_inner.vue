<template>
  <ul class="nav nav-tabs nav-fill mt-2 mb-3" id="pills-tab2" role="tablist">
    <li class="nav-item d-flex" role="presentation">
      <a
        class="nav-link w-100 shadow-sm active"
        id="pills-home-ps-tab"
        data-mdb-toggle="pill"
        data-mdb-target="#pills-home-ps"
        type="button"
        role="tab"
        aria-controls="pills-home-ps"
        aria-selected="true"
        @click="
          proche = true;
          proche_history = false;
        "
      >
        Проче сўров
      </a>
      <a
        class="nav-link"
        id="pills-home-ps-tab"
        data-mdb-toggle="pill"
        data-mdb-target="#pills-home-ps"
        type="button"
        role="tab"
        aria-controls="pills-home-ps"
        aria-selected="true"
        @click="
          proche_history = true;
          proche = false;
        "
      >
        <i class="fa-solid fa-clock-rotate-left"></i>
      </a>
    </li>
    <li class="nav-item d-flex" role="presentation">
      <a
        class="nav-link w-100 shadow-sm"
        id="pills-profile-smeta-tab"
        data-mdb-toggle="pill"
        data-mdb-target="#pills-profile-smeta"
        type="button"
        role="tab"
        aria-controls="pills-profile-smeta"
        aria-selected="false"
        @click="
          smeta = true;
          smeta_history = false;
        "
      >
        Смета
      </a>
      <a
        class="nav-link"
        id="pills-profile-smeta-tab"
        data-mdb-toggle="pill"
        data-mdb-target="#pills-profile-smeta"
        type="button"
        role="tab"
        aria-controls="pills-profile-smeta"
        aria-selected="false"
        @click="
          smeta_history = true;
          smeta = false;
        "
      >
        <i class="fa-solid fa-clock-rotate-left"></i>
      </a>
    </li>
    <li class="nav-item d-flex" role="presentation">
      <a
        class="nav-link w-100 shadow-sm"
        id="pills-contact-shot-tab"
        data-mdb-toggle="pill"
        data-mdb-target="#pills-contact-shot"
        type="button"
        role="tab"
        aria-controls="pills-contact-shot"
        aria-selected="false"
        @click="
          contact = true;
          contact_history = false;
        "
      >
        Счёт
      </a>
      <a
        class="nav-link"
        id="pills-contact-shot-tab"
        data-mdb-toggle="pill"
        data-mdb-target="#pills-contact-shot"
        type="button"
        role="tab"
        aria-controls="pills-contact-shot"
        aria-selected="false"
        @click="
          contact_history = true;
          contact = false;
        "
      >
        <i class="fa-solid fa-clock-rotate-left"></i>
      </a>
    </li>
  </ul>
  <div class="tab-content" id="pills-tab2Content">
    <div
      class="tab-pane fade show active"
      id="pills-home-ps"
      role="tabpanel"
      aria-labelledby="pills-home-ps-tab"
    >
      <Pr_request v-if="proche == true && proche_history == false" />
      <Proche_history v-if="proche == false && proche_history == true" />
    </div>
    <div
      class="tab-pane fade"
      id="pills-profile-smeta"
      role="tabpanel"
      aria-labelledby="pills-profile-smeta-tab"
    >
      <Sm_request v-if="smeta == true && smeta_history == false" />
      <Smeta_history v-if="smeta == false && smeta_history == true" />
    </div>
    <div
      class="tab-pane fade"
      id="pills-contact-shot"
      role="tabpanel"
      aria-labelledby="pills-contact-shot-tab"
    >
      <Sch_request v-if="contact == true && contact_history == false" />
      <Shot_history v-if="contact == false && contact_history == true" />
    </div>
  </div>
</template>

<script>
import Pr_request from "./pr_request.vue";
import Sm_request from "./sm_request.vue";
import Sch_request from "./sch_request.vue";
import Proche_history from "./proche_history.vue";
import Smeta_history from "./smeta_history.vue";
import Shot_history from "./shot_history.vue";
export default {
  name: "MarketIner",
  data() {
    return {
      proche: true,
      proche_history: false,
      smeta: false,
      smeta_history: false,
      contact: false,
      contact_history: false,
    };
  },
  components: {
    Pr_request,
    Sm_request,
    Sch_request,
    Proche_history,
    Smeta_history,
    Shot_history,
  },
};
</script>

<style lang="scss" scoped>
@media (max-width: 500px) {
  .nav {
    display: block;
  }
}

ul {
  zoom: 70%;
}
</style>
