<template>
  <!-- Modal -->
  <div class="modal fade" id="wallets_add">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Ҳамён қўшиш</h5>
          <button
            type="button"
            class="btn-close"
            data-mdb-dismiss="modal"
            aria-label="Close"
            id="wallet_add"
          ></button>
        </div>
        <form @submit.prevent="$emit('add', body)">
          <div class="modal-body">
            <div class="row gap-2">
              <div class="col-10 mx-auto">
                <label for="name8"> Номи: </label>
                <input
                  type="text"
                  id="name8"
                  class="form-control form-control-sm"
                  v-model="body.name"
                  required
                  placeholder="Номи"
                />
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="submit"
              class="btn btn-outline-primary btn-sm"
              id="wallet_disabled"
            >
              <i class="fa-solid fa-circle-check"></i>
            </button>
            <button
              type="button"
              class="btn btn-outline-danger btn-sm"
              data-mdb-dismiss="modal"
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
  name: "WalletAdd",
  data() {
    return {
      body: {
        name: "",
      },
    };
  },
};
</script>

<!-- <style lang="scss" scoped>
</style> -->
