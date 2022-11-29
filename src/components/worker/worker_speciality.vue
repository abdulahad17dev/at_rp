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
            data-mdb-dismiss="modal"
            aria-label="Close"
            id="worker_s_close"
          ></button>
        </div>
        <form @submit.prevent="$emit('add_speciality', body)">
          <div class="modal-body">
            <div class="row gap-2">
              <div class="col-10 mx-auto">
                <label for="name_speciality"> Ишчи тури: </label>
                <select
                  id="name_speciality"
                  class="form-select form-select-sm"
                  @click="get_worker_types(page, limit, search)"
                  v-model="body.specialty_type_id"
                >
                  <option :value="item.id" v-for="item in types" :key="item">
                    {{ item.specialty }}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="submit"
              class="btn btn-outline-primary btn-sm"
              id="worker_s_disabled"
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
import { worker_type_get } from "@/utils/request/request";
import { catchError } from "@/utils/request/handle_api_err";
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
        specialty_type_id: null,
        worker_id: null,
      },
      page: 0,
      pages: null,
      limit: 100,
      search: "",
      types: [],
    };
  },
  methods: {
    get_worker_types(page, limit, search) {
      this.$store.dispatch("setLoading", { isLoading: true });
      worker_type_get(page, limit, search)
        .then((res) => {
          this.types = res.data.data;
          this.pages = res.data.pages;
          this.$store.dispatch("setLoading", { isLoading: false });
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
        });
    },
  },
};
</script>

<!-- <style lang="scss" scoped>
</style> -->
