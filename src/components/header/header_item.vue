<template>
  <router-link
    v-if="this.$route.name != 'menu'"
    :to="{ name: 'menu' }"
    class="btn btn-dark btn-sm flex-start"
  >
    <i class="fa-solid fa-home"></i>
  </router-link>
  <h5 class="card-title text-center mb-3">
    <span :class="this.$route.meta.icon"></span>
    {{ this.$route.meta.title }}
    <br />
    <h6 v-if="balance">
      Менинг балансим:
      <b> {{ new Intl.NumberFormat().format(balance) }} </b> сўм
    </h6>
  </h5>
  <hr class="" />
</template>

<script>
export default {
  name: "PageHeaderItem",
  props: ["balance"],
};
</script>

<style lang="scss">
@media (max-width: 772px) {
  .row {
    zoom: 75%;
  }
}

.flex-start {
  position: absolute;
  z-index: 10;
}
</style>
