<template>
  <!-- Modal -->
  <div class="modal fade" id="money_launderer_add">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Пул ювувчи қўшиш</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            id="money_l_add"
          ></button>
        </div>
        <form @submit.prevent="$emit('add', body)">
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
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="submit"
              class="btn btn-outline-primary btn-sm"
              id="money_l_disabled"
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
  name: "MoneyLaundererAdd",
  data() {
    return {
      body: {
        name: "",
        phone: null,
      },
    };
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
