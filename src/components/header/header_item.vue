<template>
  <div class="row">
    <div class="col">
      <router-link
        v-if="this.$route.name != 'menu'"
        :to="{ name: 'menu' }"
        class="btn btn-dark btn-sm float-start"
      >
        <i class="fa-solid fa-home"></i>
      </router-link>
    </div>
    <div class="col">
      <h4 class="card-title text-center mb-3">
        <span :class="this.$route.meta.icon"></span>
        {{ this.$route.meta.title }}
      </h4>
    </div>
    <div class="col"></div>
  </div>
  <hr class="" />
</template>

<script>
export default {
  name: "PageHeaderItem",
};
</script>

<!-- <style lang="scss">

</style> -->
