<template>
  <div class="modal fade" id="worker_type_add">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Ишчи турини қўшиш</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            id="worker_t_add"
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
                  v-model="body.specialty"
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
              id="worker_t_disabled"
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
  name: "WorketTypeAdd",
  data() {
    return {
      body: {
        specialty: "",
      },
    };
  },
};
</script>

<!-- <style lang="scss" scoped>
</style> -->
