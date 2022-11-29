<template>
  <Header_item />
  <ul class="nav nav-tabs nav-fill nav-justified" id="pills-tab" role="tablist">
    <li class="nav-item mx-1" role="presentation">
      <a
        class="nav-link active"
        id="pills-home-tab"
        data-mdb-toggle="pill"
        data-mdb-target="#pills-home"
        type="button"
        role="tab"
        aria-controls="pills-home"
        aria-selected="true"
      >
        Сотувчи корхоналар
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
        @click="market = true"
      >
        Таминот олиш
      </a>
    </li>
  </ul>
  <div class="tab-content" id="pills-tabContent">
    <div
      class="tab-pane fade active show"
      id="pills-home"
      role="tabpanel"
      aria-labelledby="pills-home-tab"
    >
      <Suppliers />
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
      users: true,
      market: false,
    };
  },
  components: { Header_item, Suppliers, Markets_inner },
};
</script>

<!-- <style lang="scss" scoped>
</style> -->
