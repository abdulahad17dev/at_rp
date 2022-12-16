<template>
  <div id="notfound">
    <img
      class="mt-3 mb-3"
      :src="img_action"
      width="250"
      height="250"
      alt="img_notfound"
    />
  </div>
</template>

<script>
import { link } from "../request/handle_api_err";
export default {
  name: "DataNotFound",
  computed: {
    img_action() {
      return link + "frontend_not_found.png";
    },
  },
};
</script>

<style lang="scss">
#notfound {
  display: flex;
  justify-content: center;
  text-align: center;
}
</style>
