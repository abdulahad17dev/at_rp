<template>
  <Header_item />

  <Accept_money />
  <Transfer_money />
</template>

<script>
import Header_item from "@/components/header/header_item.vue";
import Accept_money from "../../components/transfer/accept_money.vue";
import Transfer_money from "@/components/transfer/transfer_money.vue";
export default {
  components: { Header_item, Accept_money, Transfer_money },
};
</script>

<!-- <style lang="scss" scoped>
</style> -->
