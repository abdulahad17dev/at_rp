<template>
  <div class="page-loader2">
    <div id="loader2">
      <img :src="img_action" alt="notfound" width="200" height="200" />
    </div>
  </div>
</template>

<script>
import { link } from "../request/handle_api_err";
export default {
  name: "Isloading2Item",
  computed: {
    img_action() {
      return link + "frontend_animate2.gif";
    },
  },
};
</script>

<style lang="scss">
.page-loader2 {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  backdrop-filter: blur(3px);
  z-index: 1111;
  background: #ffffff;
}
#loader2 {
  position: absolute;
  z-index: 1;
}
</style>
