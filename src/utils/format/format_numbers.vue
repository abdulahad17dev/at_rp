<template>
  <span v-if="number != null" class="position-relative">
    <span
      class="position-absolute badge bg-secondary"
      :id="`copied${id}`"
    ></span>
    <span @dblclick="format" v-if="format_num">
      {{
        Intl.NumberFormat("en-US", {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
          maximumSignificantDigits: number_format.length,
          minimumSignificantDigits: 1,
        }).format(number_format)
      }}
    </span>
    <span v-if="all_num" @dblclick="format">
      {{
        Intl.NumberFormat("en-US", {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
          maximumSignificantDigits: number.length,
          minimumSignificantDigits: 1,
        }).format(number)
      }}
    </span>
  </span>
  <span v-else>0</span>
</template>

<script>
export default {
  name: "FormatNumbers",
  props: ["number"],
  data() {
    return {
      all_num: false,
      format_num: true,
      copied: false,
      id: Math.floor(Math.random() * 100000000) + 1,
    };
  },
  watch: {
    all_num(e) {
      if (e == true)
        if (this.number_format == this.number) {
          this.all_num = false;
          this.format_num = true;
        }
    },
  },
  methods: {
    format() {
      if (this.number != 0) {
        if (this.all_num == false) {
          document.getElementById(`copied${this.id}`).innerHTML =
            "копия олинди";
          this.format_num = false;
          this.all_num = true;
          const textArea = document.createElement("input");
          textArea.value = String(this.number);
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          try {
            document.execCommand("copy");
          } catch (err) {
            console.error("Unable to copy to clipboard", err);
          }
          document.body.removeChild(textArea);
          setTimeout(() => {
            document.getElementById(`copied${this.id}`).innerHTML = "";
          }, 800);
        } else if (this.all_num == true) {
          document.getElementById(`copied${this.id}`).innerHTML = "";
          this.format_num = true;
          this.all_num = false;
        }
      }
    },
  },
  computed: {
    number_format() {
      var x = parseFloat(this.number).toFixed(2);
      return x;
    },
  },
};
</script>

<style lang="scss" scoped>
span {
  cursor: pointer;
  user-select: none;
}
span.badge {
  padding: 8px;
  font-size: 0.8em;
}
</style>
