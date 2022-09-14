<template>
  <Pr_request />
  <Sm_request />
</template>

<script>
import Pr_request from "./pr_request.vue";
import Sm_request from "./sm_request.vue";
export default {
  name: "MarketIner",
  components: { Pr_request, Sm_request },
};
</script>

<!-- <style lang="scss" scoped>
</style> -->
