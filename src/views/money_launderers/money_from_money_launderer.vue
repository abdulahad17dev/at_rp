<template>
  <Header_item />

  <h4 class="text-center text-primary">
    <b>{{ name }}</b>
  </h4>

  <ul
    class="nav nav-pills nav-fill nav-justified mb-3"
    id="pills-tab"
    role="tablist"
  >
    <li class="nav-item mx-1" role="presentation">
      <button
        class="btn btn-light btn-sm w-100 shadow-sm"
        id="pills-home-tab"
        data-bs-toggle="pill"
        data-bs-target="#pills-home"
        type="button"
        role="tab"
        aria-controls="pills-home"
        aria-selected="true"
        @click="money_to_l_history = true"
      >
        қабул қилинган пуллар
      </button>
    </li>
    <li class="nav-item mx-1" role="presentation">
      <button
        class="btn btn-light btn-sm w-100 shadow-sm"
        id="pills-profile-tab"
        data-bs-toggle="pill"
        data-bs-target="#pills-profile"
        type="button"
        role="tab"
        aria-controls="pills-profile"
        aria-selected="false"
        @click="money_from_l_history = true"
      >
        ўтказилган пуллар
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
      <Money_to_l_history v-if="money_to_l_history == true" />
    </div>
    <div
      class="tab-pane fade"
      id="pills-profile"
      role="tabpanel"
      aria-labelledby="pills-profile-tab"
    >
      <Money_from_l_history v-if="money_from_l_history == true" />
    </div>
  </div>
</template>

<script>
import Header_item from "@/components/header/header_item.vue";
import Money_from_l_history from "@/components/money_launderers/money_from_l_history.vue";
import Money_to_l_history from "@/components/money_launderers/money_to_l_history.vue";
export default {
  name: "MoneyFromMoneyLaunderer",
  components: { Header_item, Money_from_l_history, Money_to_l_history },
  data() {
    return {
      name: this.$route.query.name,
      money_to_l_history: false,
      money_from_l_history: false,
    };
  },
};
</script>

<style lang="scss" scoped>
button.active {
  background: #6c757d !important;
  color: #fff;
}
</style>
