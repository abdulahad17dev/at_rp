<template>
  <div
    class="btn-group btn-group-sm mx-1"
    role="group"
    aria-label="Download data"
  >
    <button
      type="button"
      class="btn btn-outline-success"
      @click="download_excel(data_id)"
    >
      <i class="fa-regular fa-file-excel"></i>
    </button>
    <!-- <button
      type="button"
      class="btn btn-outline-primary"
      @click="download_word(data_id)"
    >
      <i class="fa-regular fa-file-word"></i>
    </button> -->
    <button
      type="button"
      class="btn btn-outline-danger"
      @click="download_pdf(data_id)"
    >
      <i class="fa-regular fa-file-pdf"></i>
    </button>
  </div>
</template>

<script>
import html2pdf from "html2pdf.js";
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
    // download_word(e) {
    //   console.log(e);
    // },
    download_pdf(e) {
      html2pdf(document.getElementById(e), {
        filename: "document.pdf",
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

<!-- <style lang="scss" scoped>
</style> -->
