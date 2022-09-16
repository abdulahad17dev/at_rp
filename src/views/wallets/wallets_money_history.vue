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
        class="btn btn-light btn-sm shadow-sm w-100"
        id="pills-home-tab"
        data-bs-toggle="pill"
        data-bs-target="#pills-home"
        type="button"
        role="tab"
        aria-controls="pills-home"
        aria-selected="true"
        @click="transfer_from_w_history = true"
      >
        олинган пуллар
      </button>
    </li>
    <li class="nav-item mx-1" role="presentation">
      <button
        class="btn btn-light btn-sm shadow-sm w-100"
        id="pills-profile-tab"
        data-bs-toggle="pill"
        data-bs-target="#pills-profile"
        type="button"
        role="tab"
        aria-controls="pills-profile"
        aria-selected="false"
        @click="transfer_to_w_history = true"
      >
        берилган пуллар
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
      <Transfer_from_w_history v-if="transfer_from_w_history == true" />
    </div>
    <div
      class="tab-pane fade"
      id="pills-profile"
      role="tabpanel"
      aria-labelledby="pills-profile-tab"
    >
      <Transfer_to_w_history v-if="transfer_to_w_history == true" />
    </div>
  </div>
</template>

<script>
import Header_item from "@/components/header/header_item.vue";
import Transfer_from_w_history from "@/components/wallets/transfer_from_w_history.vue";
import Transfer_to_w_history from "@/components/wallets/transfer_to_w_history.vue";
export default {
  name: "WalletsTransferHistory",
  components: { Header_item, Transfer_from_w_history, Transfer_to_w_history },
  data() {
    return {
      name: this.$route.query.name,
      transfer_from_w_history: false,
      transfer_to_w_history: false,
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
