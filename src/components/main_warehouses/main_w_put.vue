<template>
  <!-- Modal -->
  <div class="modal fade" id="main_warehouse_put">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Ҳодим қўшиш</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            id="main_w_put"
          ></button>
        </div>
        <form @submit.prevent="$emit('put', body)">
          <div class="modal-body">
            <div class="row gap-2">
              <div class="col-10 mx-auto">
                <label for="name"> Исм: </label>
                <input
                  type="text"
                  id="name"
                  class="form-control form-control-sm"
                  v-model="body.name"
                  required
                  placeholder="Исм"
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
              id="main_w_disabled2"
            >
              <i class="fas fa-circle-check"></i>
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
  name: "MainWareHousePut",
  props: ["item"],
  computed: {
    body() {
      return this.item;
    },
  },
};
</script>

<!-- <style lang="scss" scoped>
</style> -->
