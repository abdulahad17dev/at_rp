<template>
  <Template>
    <router-view />
  </Template>

  <IsLoading v-if="isLoading" key="0" />
  <FileLoading v-if="isLoading2" key="0" />
</template>

<script>
import Template from "./utils/main/template.vue";
import IsLoading from "./utils/loading/IsLoading.vue";
import FileLoading from "./utils/loading/fileLoading.vue";
export default {
  components: { Template, IsLoading, FileLoading },
  computed: {
    isLoading() {
      return this.$store.state.isLoading.isLoading;
    },
    isLoading2() {
      return this.$store.state.isLoading2.isLoading2;
    },
  },
  watch: {
    $route(to) {
      document.title = to.meta.title;
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
body {
  overflow: hidden;
}

::-webkit-scrollbar {
  width: 5px;
  height: 5px;
  transition: 1s;
}

::-webkit-scrollbar-track {
  background: rgba(211, 211, 211, 0.8);
  border-radius: 15px;
  transition: 0.5s;
}

::-webkit-scrollbar-thumb {
  background: gray;
  border-radius: 5px;
  transition: 0.5s;
}
</style>
