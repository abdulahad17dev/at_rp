<template>
  <Header_item />
  <ul
    class="nav nav-pills nav-fill nav-justified mb-3"
    id="pills-tab"
    role="tablist"
  >
    <li class="nav-item" role="presentation">
      <button
        class="btn btn-sm btn-light w-100"
        id="pills-home-tab"
        data-bs-toggle="pill"
        data-bs-target="#pills-home"
        type="button"
        role="tab"
        aria-controls="pills-home"
        aria-selected="true"
        @click="users = true"
      >
        Таминотчилар
      </button>
    </li>
    <li class="nav-item" role="presentation">
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
        Таминот олиш
      </button>
    </li>
  </ul>
  <div class="tab-content" id="pills-tabContent">
    <div
      class="tab-pane fade"
      id="pills-home"
      role="tabpanel"
      aria-labelledby="pills-home-tab"
    >
      <Suppliers v-if="users === true" />
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
import Suppliers from "../../components/markets/suppliers.vue";
export default {
  name: "MarketItem",
  data() {
    return {
      users: "",
    };
  },
  components: { Header_item, Suppliers },
};
</script>

<style lang="scss" scoped>
button.active {
  background: #6c757d !important;
  color: #fff;
}
</style>
