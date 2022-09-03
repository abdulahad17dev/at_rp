<template>
  <div class="modal fade" id="pay_to_user">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            <b class="text-primary">{{ name }}</b> ҳисобига пул ўтказиш
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            id="pay_to_user_c"
          ></button>
        </div>
        <form @submit.prevent="$emit('transfer_to_user', body)">
          <div class="modal-body">
            <div class="row gap-2">
              <div class="col-10 mx-auto">
                <label for="balance">
                  Сумма:
                  <span class="text-primary"
                    >{{ new Intl.NumberFormat().format(body.money) }} сўм</span
                  ></label
                >
                <div class="input-group input-group-sm">
                  <input
                    id="balance"
                    type="number"
                    step="any"
                    class="form-control"
                    v-model="body.money"
                    required
                    min="1"
                  />
                  <span class="input-group-text bg-white">сўм</span>
                </div>
              </div>
              <div class="col-10 mx-auto">
                <label for="comment"> Изох: </label>
                <textarea
                  id="comment"
                  class="form-control"
                  v-model="body.comment"
                  required
                ></textarea>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="submit"
              class="btn btn-outline-primary btn-sm"
              id="pay_to_user_d"
              :disabled="!body.money || !body.comment"
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
  name: "PayToUserBody",
  props: ["id", "name"],
  data() {
    return {
      body: {
        money: null,
        from_: 0,
        to_: null,
        comment: "",
      },
    };
  },
  watch: {
    id(e) {
      this.body.to_ = e;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
