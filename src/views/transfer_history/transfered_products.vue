<template>
  <Header_item />
  <ul
    class="nav nav-pills nav-justified nav-fill mb-3"
    id="pills-tab"
    role="tablist"
  >
    <li class="nav-item mx-1" role="presentation">
      <button
        class="btn btn-sm btn-light w-100 active"
        id="pills-home-tab"
        data-bs-toggle="pill"
        data-bs-target="#pills-home"
        type="button"
        role="tab"
        aria-controls="pills-home"
        aria-selected="true"
      >
        Базага жўнатилган материаллар
      </button>
    </li>
    <li class="nav-item mx-1" role="presentation">
      <button
        class="btn btn-sm btn-light w-100"
        id="pills-profile-tab"
        data-bs-toggle="pill"
        data-bs-target="#pills-profile"
        type="button"
        role="tab"
        aria-controls="pills-profile"
        aria-selected="false"
      >
        Базадан қабул қилинган материаллар
      </button>
    </li>
  </ul>
  <div class="tab-content" id="pills-tabContent">
    <div
      class="tab-pane fade show active"
      id="pills-home"
      role="tabpanel"
      aria-labelledby="pills-home-tab"
    >
      ...
    </div>
    <div
      class="tab-pane fade"
      id="pills-profile"
      role="tabpanel"
      aria-labelledby="pills-profile-tab"
    >
      ...
    </div>
  </div>
</template>

<script>
import Header_item from "@/components/header/header_item.vue";
export default {
  components: { Header_item },
  name: "TransferedProducts",
  data() {
    return {
      products_share: [],
      sh_status2: "to_main_warehouse",
      sh_type: "proche",
      sh_from: 0,
      sh_to: 0,
      sh_status: 0,
      sh_search: 0,
      sh_page: 0,
      sh_limit: 25,
      sh_pages: null,
      products_accept: [],
    };
  },
};
</script>

<style lang="scss" scoped>
@media (max-width: 500px) {
  ul.nav {
    zoom: 70%;
  }
}
</style>
