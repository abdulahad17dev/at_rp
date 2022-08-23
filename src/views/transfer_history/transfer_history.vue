<template>
  <Header_item />

  <h4 class="card-title text-center">
    <span class="text-primary"> {{ this.$route.query.name }} </span> ҳисоби
  </h4>

  <Accept_money />
  <Transfer_money_from />
  <Transfer_money_to />
  <Transfer_to_cashier />
  <Transfer_f_expense />
  <Transfer_v_expense />
</template>

<script>
import Header_item from "@/components/header/header_item.vue";
import Accept_money from "../../components/transfer/accept_money.vue";
import Transfer_money_from from "@/components/transfer/transfer_money_from.vue";
import Transfer_money_to from "@/components/transfer/transfer_money_to.vue";
import Transfer_to_cashier from "@/components/transfer/transfer_to_cashier.vue";
import Transfer_f_expense from "@/components/transfer/transfer_f_expense.vue";
import Transfer_v_expense from "@/components/transfer/transfer_v_expense.vue";
export default {
  components: {
    Header_item,
    Accept_money,
    Transfer_money_from,
    Transfer_money_to,
    Transfer_to_cashier,
    Transfer_f_expense,
    Transfer_v_expense,
  },
};
</script>

<!-- <style lang="scss" scoped>
</style> -->
