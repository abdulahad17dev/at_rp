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
        @click="history = true"
      >
        Нахт
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
        @click="history_schot = true"
      >
        Счёт
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
      <History v-if="history == true" />
    </div>
    <div
      class="tab-pane fade"
      id="pills-profile"
      role="tabpanel"
      aria-labelledby="pills-profile-tab"
    >
      <History_schot v-if="history_schot == true" />
    </div>
  </div>
</template>

<script>
import Header_item from "@/components/header/header_item.vue";
import History from "@/components/supply_history/history.vue";
import History_schot from "@/components/supply_history/history_schot.vue";
export default {
  name: "SupplyHistory",
  components: { Header_item, History, History_schot },
  data() {
    return {
      history: false,
      history_schot: false,
    };
  },
};
</script>

<!-- <style lang="scss" scoped>
</style> -->
