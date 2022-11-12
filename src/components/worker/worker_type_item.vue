<template>
  <div class="container-fluid">
    <div class="row mt-2">
      <div
        class="col-md-4 col-lg-3 col-sm-6 mt-1"
        v-for="item in worker_types"
        :key="item"
      >
        <div class="card shadow-sm">
          <div class="card-body">
            <div class="row">
              <div class="col-9">
                <h5>
                  <b>
                    {{ item.specialty }}
                  </b>
                </h5>
              </div>
              <div class="col-3">
                <button
                  class="btn btn-sm btn-danger float-end"
                  @click="$emit('remove', item.id)"
                >
                  <i class="fa-solid fa-trash"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "WorkerTypeItem",
  props: ["worker_types"],
};
</script>

<style lang="scss" scoped>
.col-md-4 {
  margin: 0px 0px !important;
  padding: 4px 4px !important;
}

.container-fluid {
  max-height: 68vh;
}
</style>
