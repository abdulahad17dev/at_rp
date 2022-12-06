<template>
  <div
    class="btn-group btn-group-sm mx-1"
    role="group"
    aria-label="Download data"
  >
    <button
      type="button"
      class="btn btn-outline-success"
      data-mdb-ripple-color="dark"
      @click="download_excel(data_id)"
    >
      <i class="fa-regular fa-file-excel"></i>
    </button>
  </div>
</template>

<script>
import TableToExcel from "@linways/table-to-excel";
export default {
  name: "SelectData",
  props: ["id"],
  methods: {
    download_excel(e) {
      TableToExcel.convert(document.getElementById(e), {
        name: "document.xlsx",
        sheet: {
          name: "Sheet 1",
        },
      });
    },
  },
  computed: {
    data_id() {
      return this.id;
    },
  },
};
</script>

<style lang="scss" scoped>
.btn-group button {
  padding: 5px 10px;
}
</style>
