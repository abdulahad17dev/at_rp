<template>
  <a href="#" class="btn btn-sm btn-primary" @click="get_position">
    <i class="fa-solid fa-location-dot"></i>
  </a>
</template>

<script>
import { position_err } from "../request/handle_api_err";
export default {
  name: "RouteMap",
  props: ["lat", "long"],
  methods: {
    get_position() {
      const success = (position) => {
        console.log(position.coords.latitude);
        console.log(position.coords.longitude);
        window.open(
          `https://www.google.com/maps/dir/${position.coords.latitude},${position.coords.longitude}/${this.lat},${this.long}/@${position.coords.latitude},${position.coords.longitude},12.5z`,
          `_blank`
        );
      };

      const error = (err) => {
        position_err(err);
      };

      navigator.geolocation.getCurrentPosition(success, error);
    },
  },
};
</script>

<!-- <style lang="scss" scoped>
</style> -->
