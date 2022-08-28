<template>
  <!-- Modal -->
  <div class="modal fade" id="building_put">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ data.name }} маълумотларини таҳрирлаш</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            id="buildings_put"
          ></button>
        </div>
        <form @submit.prevent="$emit('put', data)">
          <div class="modal-body">
            <div class="row gap-2">
              <div class="col-10 mx-auto">
                <label for="name"> Номи: </label>
                <input
                  type="text"
                  id="name"
                  class="form-control form-control-sm"
                  v-model="data.name"
                  required
                  placeholder="Номи"
                />
              </div>
              <div class="col-10 mx-auto">
                <label for="budget">
                  Бюджет:
                  <span class="text-primary"
                    >{{ new Intl.NumberFormat().format(data.budget) }} сўм</span
                  ></label
                >
                <div class="input-group input-group-sm">
                  <input
                    type="number"
                    id="budget"
                    class="form-control form-control-sm"
                    v-model="data.budget"
                    required
                    step="any"
                    placeholder="Бюджет"
                    min="1"
                  />
                  <span class="input-group-text bg-white">сўм</span>
                </div>
              </div>
              <div class="col-10 mx-auto">
                <label for="address"> Манзил: </label>
                <input
                  type="text"
                  id="address"
                  class="form-control form-control-sm"
                  v-model="data.address"
                  required
                  placeholder="Манзил"
                />
              </div>
              <div class="col-10 mx-auto">
                <label for="start_date"> Бошлаш санаси: </label>
                <input
                  type="date"
                  id="start_date"
                  class="form-control form-control-sm"
                  v-model="data.start_date"
                  required
                />
              </div>
              <div class="col-10 mx-auto">
                <label for="end_date"> Тугаш санаси: </label>
                <input
                  type="date"
                  id="end_date"
                  class="form-control form-control-sm"
                  v-model="data.end_date"
                  required
                />
              </div>
              <div class="col-10 mx-auto">
                <label for="map_long"> Узунлик: </label>
                <input
                  type="text"
                  id="map_long"
                  class="form-control form-control-sm"
                  v-model="data.map_long"
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
                  v-model="data.map_lat"
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
              id="building_disabled_put"
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
  name: "UserPutItem",
  props: ["object"],
  computed: {
    data() {
      return this.object;
    },
  },
};
</script>

<!-- <style>
</style> -->
