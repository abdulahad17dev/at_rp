<template>
  <Header_item />
  <ul
    class="nav nav-pills nav-fill nav-justified mb-3"
    id="pills-tab"
    role="tablist"
  >
    <li class="nav-item mx-1" role="presentation">
      <button
        class="btn btn-sm btn-light w-100 shadow-sm"
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
    <li class="nav-item mx-1" role="presentation">
      <button
        class="btn btn-sm btn-light w-100 shadow-sm"
        id="pills-profile-tab"
        data-bs-toggle="pill"
        data-bs-target="#pills-profile"
        type="button"
        role="tab"
        aria-controls="pills-profile"
        aria-selected="false"
        @click="market = true"
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
      <Suppliers v-if="users == true" />
    </div>
    <div
      class="tab-pane fade"
      id="pills-profile"
      role="tabpanel"
      aria-labelledby="pills-profile-tab"
    >
      <Markets_inner v-if="market == true" />
    </div>
  </div>
</template>

<script>
import Header_item from "@/components/header/header_item.vue";
import Suppliers from "../../components/markets/suppliers.vue";
import Markets_inner from "@/components/markets/markets_inner.vue";
export default {
  name: "MarketItems",
  data() {
    return {
      users: false,
      market: false,
    };
  },
  components: { Header_item, Suppliers, Markets_inner },
};
</script>

<style lang="scss" scoped>
button.active {
  background: #6c757d !important;
  color: #fff;
}
</style>
