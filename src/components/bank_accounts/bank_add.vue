<template>
  <!-- Modal -->
  <div class="modal fade" id="bank_account_add">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Ҳисоб қўшиш</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            id="bank_add"
          ></button>
        </div>
        <form @submit.prevent="$emit('add', data)">
          <div class="modal-body">
            <div class="row gap-2">
              <div class="col-10 mx-auto">
                <label for="nomi"> Номи: </label>
                <input
                  type="text"
                  id="nomi"
                  class="form-control form-control-sm"
                  v-model="data.name"
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
              id="bank_disabled"
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
  name: "BankAddItem",
  data() {
    return {
      data: {
        name: "",
      },
    };
  },
};
</script>

<!-- <style lang="scss" scoped>
</style> -->
