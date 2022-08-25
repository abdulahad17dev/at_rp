<template>
  <details>
    <summary><strong>Тизим</strong></summary>
    <div class="row gap-2 mode" @click="nightMode = !nightMode">
      <div class="col-5 mx-auto">
        <h5 class="my-3">тунги режим</h5>
      </div>
      <div class="col-5 mx-auto">
        <div class="toggle-wrapper float-end">
          <label class="toggle">
            <input
              type="checkbox"
              @change="nightMode = !nightMode"
              id="checked"
            />
            <span class="toggler round">
              <span id="sun">☀️</span>
              <span id="moon">🌙</span>
            </span>
          </label>
        </div>
      </div>
    </div>
  </details>
</template>

<script>
export default {
  name: "DarkMode",
  data() {
    return {
      nightMode: localStorage.getItem("nightMode"),
    };
  },
  watch: {
    nightMode() {
      if (this.nightMode == true) {
        localStorage.setItem("nightMode", JSON.stringify(this.nightMode));
        document.querySelector("#app").classList.remove("dark");
        document.querySelector("#checked").checked = false;
      } else {
        localStorage.setItem("nightMode", JSON.stringify(this.nightMode));
        document.querySelector("#app").classList.add("dark");
        document.querySelector("#checked").checked = true;
      }
    },
  },
  created() {
    this.nightMode = JSON.parse(localStorage.getItem("nightMode"));
  },
};
</script>

<style lang="scss" scoped>
details .mode {
  cursor: pointer;
}

.toggle {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
  margin: 10px;
}
.toggle input {
  opacity: 0;
  width: 0;
  height: 0;
}
.toggler {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #212529;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}
.toggler:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background: #fff;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}
input:focus + toggler {
  box-shadow: 0 0 2px #2196f3;
}
input:checked + .toggler:before {
  -webkit-transform: translateX(31px);
  -ms-transform: translateX(31px);
  transform: translateX(31px);
}
.toggler.round {
  border-radius: 34px;
  width: 65px;
}
.toggler.round:before {
  border-radius: 50%;
}
#sun {
  float: left;
  padding-top: -3px;
  padding-left: 4px;
  font-size: 1.3rem;
}
#moon {
  float: right;
  padding-top: -3px;
  padding-right: 3px;
  font-size: 1.3rem;
}
</style>
