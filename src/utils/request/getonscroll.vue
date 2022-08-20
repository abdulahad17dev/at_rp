<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />

    <div class="main">
      <ul>
        <li v-for="item in base" :key="item">
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { base } from "@/base";
export default {
  name: "HomeView",
  emits: ["setloading"],
  data() {
    return {
      base: base,
    };
  },
  created() {
    this.$emit("setloading", false);
  },
  mounted() {
    let div = document.querySelector(".main");
    let lastScrollTop = 0;
    div.onscroll = () => {
      console.log(div.clientHeight, div.scrollTop);
      if (div.scrollTop < lastScrollTop) {
        // upscroll
        return;
      }
      lastScrollTop = div.scrollTop <= 0 ? 0 : div.scrollTop;
      if (div.scrollTop + div.offsetHeight >= div.scrollHeight) {
        console.log("End");
        // this.base.push(
        //   { id: 3, number: 5, name: "Maxmud", last: "Abdo" },
        // );
        this.base = this.base.concat(this.base);
      }
    };
  },
};
</script>

<style scoped>
.main {
  width: 30%;
  max-height: 30vh;
  background: gray;
  overflow: auto;
}

ul {
  list-style: none;
}
</style>