<template>
  <!-- Modal -->
  <div class="modal fade" id="main_warehouse_add">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Базачи қўшиш</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            id="main_w_add"
          ></button>
        </div>
        <form @submit.prevent="$emit('add', body)">
          <div class="modal-body">
            <div class="row gap-2">
              <div class="col-10 mx-auto">
                <label for="name"> Номи: </label>
                <input
                  type="text"
                  id="name"
                  class="form-control form-control-sm"
                  v-model="body.name"
                  required
                  placeholder="Номи"
                />
              </div>
              <div class="col-10 mx-auto">
                <label for="phone"> Телефон рақам: </label>
                <div class="input-group input-group-sm">
                  <span class="input-group-text bg-white">+998</span>
                  <input
                    type="tel"
                    id="phone"
                    class="form-control form-control-sm"
                    v-model="body.phone"
                    required
                    placeholder="Телефон рақам"
                    maxlength="9"
                    minlength="9"
                    @keypress="onlyNumber"
                  />
                </div>
              </div>
              <div class="col-10 mx-auto">
                <label for="address"> Адресс: </label>
                <input
                  type="text"
                  id="address"
                  class="form-control form-control-sm"
                  v-model="body.address"
                  required
                  placeholder="Адресс"
                />
              </div>
              <div class="col-10 mx-auto">
                <label for="map_long"> Узунлик: </label>
                <input
                  type="text"
                  id="map_long"
                  class="form-control form-control-sm"
                  v-model="body.map_long"
                  required
                  placeholder="Узунлик"
                />
              </div>
              <div class="col-10 mx-auto">
                <label for="map_lat"> Кенглик: </label>
                <input
                  type="text"
                  id="map_lat"
                  class="form-control form-control-sm"
                  v-model="body.map_lat"
                  required
                  placeholder="Кенглик"
                />
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="submit"
              class="btn btn-outline-primary btn-sm"
              id="main_w_disabled"
            >
              <i class="fa-solid fa-circle-check"></i>
            </button>
            <button
              type="button"
              class="btn btn-outline-danger btn-sm"
              data-bs-dismiss="modal"
            >
              <i class="fa-solid fa-circle-xmark"></i>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MainWarehouseAdd",
  props: ["lat", "long"],
  data() {
    return {
      body: {
        name: "",
        phone: null,
        address: "",
        map_long: "",
        map_lat: "",
      },
    };
  },
  watch: {
    long(e) {
      this.body.map_long = "";
      this.body.map_long = e;
    },
    lat(e) {
      this.body.map_lat = "";
      this.body.map_lat = e;
    },
  },
  methods: {
    onlyNumber($event) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
        $event.preventDefault();
      }
    },
  },
};
</script>

<!-- <style lang="scss" scoped>
</style> -->
