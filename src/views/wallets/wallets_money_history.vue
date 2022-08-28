<template>
  <Header_item />

  <h4 class="text-center text-primary">
    <b>{{ name }}</b>
  </h4>

  <Transfer_from_w_history />
  <Transfer_to_w_history />
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
    };
  },
};
</script>

<!-- <style lang="scss" scoped>
</style> -->
