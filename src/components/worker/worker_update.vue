<template>
  <!-- Modal -->
  <div class="modal fade" id="worker_put">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            {{ body.name }} маълумотларини таҳрирлаш
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            id="worker_put_close"
          ></button>
        </div>
        <form @submit.prevent="$emit('put', body)">
          <div class="modal-body">
            <div class="row gap-2">
              <div class="col-10 mx-auto">
                <label for="name_put"> Исм: </label>
                <input
                  type="text"
                  id="name_put"
                  class="form-control form-control-sm"
                  v-model="body.name"
                  required
                  placeholder="Исм"
                />
              </div>
              <div class="col-10 mx-auto">
                <label for="phone_put"> Телефон рақам: </label>
                <div class="input-group input-group-sm">
                  <span class="input-group-text bg-white">+998</span>
                  <input
                    type="tel"
                    id="phone_put"
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
              id="worker_disabled2"
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
  name: "WorkerPut",
  props: ["item"],
  computed: {
    body() {
      return this.item;
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
