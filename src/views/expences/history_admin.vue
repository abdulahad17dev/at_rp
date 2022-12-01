<template>
  <Header_item />
</template>

<script>
import Header_item from "@/components/header/header_item.vue";
import { get_fixed_history } from "@/utils/request/request";
import { catchError } from "@/utils/request/handle_api_err";

export default {
  name: "FixedExpenseHistory",
  components: { Header_item },
  data() {
    return {
      fixed_history: [],
      limit: 25,
      page: 0,
      pages: null,
      from: 0,
      from_time: "",
      to_time: "",
      to: Number(this.$route.query.id),
      user_id: 0,
    };
  },
  watch: {
    limit(e) {
      this.page = 0;
      this.fixed_history_get(
        this.page,
        e,
        this.from,
        this.to,
        this.user_id,
        this.from_time,
        this.to_time
      );
    },
    page(e) {
      this.fixed_history_get(
        e,
        this.limit,
        this.from,
        this.to,
        this.user_id,
        this.from_time,
        this.to_time
      );
    },
  },
  methods: {
    fixed_history_get() {
      this.$store.dispatch("setLoading", { isLoading: true });
      get_fixed_history(
        this.page,
        this.limit,
        this.from,
        this.to,
        this.user_id,
        this.from_time,
        this.to_time
      )
        .then((res) => {
          this.fixed_history = res.data.data;
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
    this.fixed_history_get();
  },
};
</script>

<!-- <style lang="scss" scoped>
</style> -->
