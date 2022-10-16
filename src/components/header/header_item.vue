<template>
  <router-link
    v-if="this.$route.name != 'menu'"
    :to="{ name: 'menu' }"
    class="btn btn-dark btn-sm flex-start back_home"
  >
    <i class="fa-solid fa-home"></i>
  </router-link>
  <h5
    class="card-title text-center mb-3"
    :style="this.$route.name != 'menu' ? 'margin-top: -30px' : ''"
  >
    <span :class="this.$route.meta.icon"></span>
    {{ this.$route.meta.title }}

    <br />
    <h6
      class="text-center text-danger"
      v-if="
        (!data.length && role == 'prorap') ||
        (!data.length && role == 'omborchi')
      "
    >
      <b> Сиз бирор бир обйектга бириктирилмагансиз </b>
    </h6>
    <h6 v-if="balance || balance == 0">
      Менинг балансим:
      <b> {{ new Intl.NumberFormat().format(balance) }} </b> сўм
    </h6>
  </h5>
  <hr class="" />
</template>

<script>
export default {
  name: "PageHeaderItem",
  props: ["balance", "data"],
  data() {
    return {
      role: localStorage.getItem("role"),
    };
  },
};
</script>

<style lang="scss" scoped>
@media (max-width: 772px) {
  h5,
  .btn {
    zoom: 70%;
  }
}
</style>
