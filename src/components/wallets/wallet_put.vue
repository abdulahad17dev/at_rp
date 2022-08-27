<template>
  <!-- Modal -->
  <div class="modal fade" id="wallet_put">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            {{ body.name }}ни таҳрирлаш
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            id="wallet_put"
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
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="submit"
              class="btn btn-outline-primary btn-sm"
              id="wallet_disabled2"
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
  name: "WalletPut",
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
