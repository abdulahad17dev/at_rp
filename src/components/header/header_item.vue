<template>
  <h4 class="card-title text-center mb-3">
    <span :class="this.$route.meta.icon"></span>
    {{ this.$route.meta.title }}
  </h4>
  <hr class="" />
</template>

<script>
export default {
  name: "PageHeaderItem",
};
</script>

<!-- <style lang="scss">

</style> -->
