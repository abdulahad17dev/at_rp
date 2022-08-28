<template>
  <Header_item />

  <h4 class="text-center text-primary">
    <b>{{ name }}</b>
  </h4>

  <Money_from_l_history />

  <Money_to_l_history />
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
    };
  },
};
</script>

<!-- <style lang="scss" scoped>
</style> -->
