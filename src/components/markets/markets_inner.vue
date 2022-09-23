<template>
  <div class="container-fluid mb-2">
    <div class="row">
      <div class="col mx-1" style="padding: 0 0"></div>
      <div class="col mx-1" style="padding: 0 0">
        <ul
          class="nav nav-pills nav-fill nav-justified justify-content-end"
          id="pills-tab2"
          role="tablist"
        >
          <li class="nav-item" role="presentation">
            <button
              class="btn btn-sm btn-light w-100 shadow-sm active"
              id="pills-home-ps-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-home-ps"
              type="button"
              role="tab"
              aria-controls="pills-home-ps"
              aria-selected="true"
              @click="proche = true"
            >
              Проче сўров
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button
              class="btn btn-sm btn-light w-100 shadow-sm"
              id="pills-profile-smeta-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-profile-smeta"
              type="button"
              role="tab"
              aria-controls="pills-profile-smeta"
              aria-selected="false"
              @click="smeta = true"
            >
              Смета
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button
              class="btn btn-sm btn-light w-100 shadow-sm"
              id="pills-contact-shot-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-contact-shot"
              type="button"
              role="tab"
              aria-controls="pills-contact-shot"
              aria-selected="false"
              @click="contact = true"
            >
              Счёт
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div class="tab-content" id="pills-tab2Content">
    <div
      class="tab-pane fade show active"
      id="pills-home-ps"
      role="tabpanel"
      aria-labelledby="pills-home-ps-tab"
    >
      <Pr_request v-if="proche == true" />
    </div>
    <div
      class="tab-pane fade"
      id="pills-profile-smeta"
      role="tabpanel"
      aria-labelledby="pills-profile-smeta-tab"
    >
      <Sm_request v-if="smeta == true" />
    </div>
    <div
      class="tab-pane fade"
      id="pills-contact-shot"
      role="tabpanel"
      aria-labelledby="pills-contact-shot-tab"
    >
      <Sch_request v-if="contact == true" />
    </div>
  </div>
</template>

<script>
import Pr_request from "./pr_request.vue";
import Sm_request from "./sm_request.vue";
import Sch_request from "./sch_request.vue";
export default {
  name: "MarketIner",
  data() {
    return {
      proche: true,
      smeta: false,
      contact: false,
    };
  },
  components: { Pr_request, Sm_request, Sch_request },
};
</script>

<style lang="scss" scoped>
button.active {
  background: #6c757d !important;
  color: #fff;
}

@media (max-width: 500px) {
  .nav {
    display: block;
  }
}

ul {
  zoom: 70%;
}
</style>
