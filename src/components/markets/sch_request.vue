<template>
  <div class="request"></div>
</template>

<script>
import { shot_request } from "@/utils/request/request";
import { catchError } from "@/utils/request/handle_api_err";
export default {
  name: "ShotRequest",
  data() {
    return {
      shot_requests: [],
      pages: null,
      market_id: 0,
      status: false,
      paid_status: false,
      building_id: 0,
      from_time: "",
      to_time: "",
      page: 0,
      limit: 25,
      page_building: 0,
      pages_building: null,
      limit_building: 25,
      search_building: "",
      buildings: [],
      text_building: "объектлар",
    };
  },
  methods: {
    get_shot_r(
      market_id,
      status,
      paid_status,
      building_id,
      from_time,
      to_time,
      page,
      limit
    ) {
      this.$store.dispatch("setLoading", { isLoading: true });

      shot_request(
        market_id,
        status,
        paid_status,
        building_id,
        from_time,
        to_time,
        page,
        limit
      )
        .then((res) => {
          this.shot_requests = res.data.data;
          this.pages = res.data.pages;
          this.$store.dispatch("setLoading", { isLoading: false });
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
        });
    },
  },
  created() {
    this.get_shot_r(
      this.market_id,
      this.status,
      this.paid_status,
      this.building_id,
      this.from_time,
      this.to_time,
      this.page,
      this.limit
    );
  },
};
</script>

<style lang="scss" scoped>
.request {
  zoom: 75%;
}
</style>
