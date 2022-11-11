<template>
  <span>
    <span class="badge bg-secondary" :id="`copied${id}`">копия олинди</span>
    <span @dblclick="format" v-if="format_num">
      {{ Intl.NumberFormat().format(number_format) }}
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
  methods: {
    format() {
      if (this.all_num == false) {
        this.format_num = false;
        this.all_num = true;
        document.getElementById(`copied${this.id}`).style.transform =
          "scale(1)";
        // navigator.clipboard.writeText(this.number);
        const textArea = document.createElement("textarea");
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
          document.getElementById(`copied${this.id}`).style.transform =
            "scale(0)";
        }, 800);
      } else if (this.all_num == true) {
        this.format_num = true;
        this.all_num = false;
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
  // width: 60px;
  position: absolute;
  margin-top: -20px;
  padding: 10px;
  font-size: 1em;
  transform: scale(0);
}

div {
  position: relative;
}

* {
  transition: all 0.3s ease-in-out;
}
</style>
