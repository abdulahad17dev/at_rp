<template>
  <button class="btn btn-dark rounded-circle back btn-lg" @click="back()">
    <i class="fa-solid fa-arrow-left"></i>
  </button>
  <button
    class="btn btn-dark rounded-circle to_up btn-lg"
    id="top"
    @click="up()"
  >
    <i class="fa-solid fa-arrow-up"></i>
  </button>
</template>

<script>
export default {
  name: "RouterBack",
  methods: {
    back() {
      this.$router.go(-1);
    },
    up() {
      let scroll_div = document.getElementById("scroll");

      scroll_div.scrollTop = 0;
    },
  },
  mounted() {
    let scroll_div = document.getElementById("scroll");
    let btn = document.getElementById("top");

    scroll_div.addEventListener("scroll", () => {
      if (scroll_div.scrollTop > 600) {
        btn.style.display = "block";
      } else {
        btn.style.display = "none";
      }
    });
  },
};
</script>

<style lang="scss">
.back {
  position: fixed;
  bottom: 10px;
  left: 10px;
}

.to_up {
  position: fixed;
  bottom: 10px;
  right: 10px;
}

#top {
  display: none;
}
</style>
