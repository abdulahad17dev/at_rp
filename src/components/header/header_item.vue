<template>
  <div class="row">
    <div class="col">
      <button
        v-if="this.$route.name != 'menu'"
        class="btn btn-dark btn-floating"
        @click="$router.push('menu')"
      >
        <i class="fa-solid fa-home"></i>
      </button>
    </div>
    <div class="col">
      <h5 class="card-title text-center mb-0">
        <span :class="this.$route.meta.icon"></span>
        {{ this.$route.meta.title }}

        <br />
        <span class="text-primary">{{ name }}</span>
        <h6
          class="text-center text-danger"
          v-if="this.$route.name == 'buildings'"
        >
          <b
            v-if="
              (!data.length && role == 'prorap') ||
              (!data.length && role == 'omborchi')
            "
          >
            Сиз бирор бир обйектга бириктирилмагансиз
          </b>
        </h6>
        <h6 v-if="balance || balance == 0">
          Менинг балансим:
          <b> {{ new Intl.NumberFormat().format(balance) }} </b> сўм
        </h6>
      </h5>
    </div>
    <div class="col">
      <div class="float-end">
        <Dark_mode />
        <Currentuser />
        <button class="btn btn-dark btn-floating" @click="logout">
          <i class="fa-solid fa-arrow-right-from-bracket"></i>
        </button>
      </div>
    </div>
  </div>
  <hr class="" />
</template>

<script>
import Currentuser from "@/views/settings/currentuser.vue";
import Dark_mode from "@/views/settings/dark_mode.vue";
export default {
  components: { Dark_mode, Currentuser },
  name: "PageHeaderItem",
  props: ["balance", "data", "name"],
  data() {
    return {
      role: localStorage.getItem("role"),
    };
  },
  methods: {
    logout() {
      this.$router.push("/");
      console.clear();
      localStorage.removeItem("role");
      localStorage.removeItem("access_token");
    },
  },
};
</script>

<style lang="scss" scoped>
@media (max-width: 772px) {
  .row {
    zoom: 70%;
  }
}
</style>
