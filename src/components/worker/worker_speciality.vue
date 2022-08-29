<template>
  <!-- Modal -->
  <div class="modal fade" id="worker_speciality_add">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            {{ item.name }} га ихтисослик қўшиш
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            id="worker_s_close"
          ></button>
        </div>
        <form @submit.prevent="$emit('add_speciality', body)">
          <div class="modal-body">
            <div class="row gap-2">
              <div class="col-10 mx-auto">
                <label for="name_speciality"> Номи: </label>
                <input
                  type="text"
                  id="name_speciality"
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
              id="worker_s_disabled"
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
  name: "WorkerAdd",
  props: ["item"],
  watch: {
    item(e) {
      this.body.worker_id = e.id;
    },
  },
  data() {
    return {
      body: {
        specialty: "",
        worker_id: null,
      },
    };
  },
};
</script>

<!-- <style lang="scss" scoped>
</style> -->
