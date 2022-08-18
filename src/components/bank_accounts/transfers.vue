<template>
  <!-- Modal -->
  <div class="modal fade" id="transfer_me_add">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            <b class="text-primary">{{ name }}</b> ҳисобига пул қабул қилиш
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            id="transfer_add"
          ></button>
        </div>
        <form @submit.prevent="$emit('transfer_me', data)">
          <div class="modal-body">
            <div class="row gap-2">
              <div class="col-10 mx-auto">
                <label for="balance"> Сумма: </label>
                <div class="input-group input-group-sm">
                  <input
                    id="balance"
                    type="number"
                    step="any"
                    class="form-control"
                    v-model="data.money"
                    min="1"
                    required
                  />
                  <span class="input-group-text bg-white">сўм</span>
                </div>
              </div>
              <div class="col-10 mx-auto">
                <label for="comment"> Изох: </label>
                <textarea
                  id="comment"
                  class="form-control"
                  v-model="data.comment"
                  required
                ></textarea>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="submit"
              class="btn btn-outline-primary btn-sm"
              id="transfer_disabled"
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

  <div class="modal fade" id="transfer_to_add">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            <b class="text-primary">{{ name }}</b> ҳисобидан пул ўтказиш
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            id="transfer_to"
          ></button>
        </div>
        <form @submit.prevent="$emit('transfer_to', to)">
          <div class="modal-body">
            <div class="row gap-2">
              <div class="col-10 mx-auto">
                <label for="balance"> Сумма: </label>
                <div class="input-group input-group-sm">
                  <input
                    id="balance"
                    type="number"
                    step="any"
                    class="form-control"
                    v-model="to.money"
                    required
                    min="1"
                  />
                  <span class="input-group-text bg-white">сўм</span>
                </div>
              </div>
              <div class="col-10 mx-auto">
                <label for="to"> Ҳисоблар: </label>
                <select
                  id="to"
                  class="form-select form-select-sm"
                  v-model="to.to_"
                  required
                >
                  <option :value="item.id" v-for="item in items" :key="item">
                    {{ item.name }}
                  </option>
                </select>
              </div>
              <div class="col-10 mx-auto">
                <label for="comment"> Изох: </label>
                <textarea
                  id="comment"
                  class="form-control"
                  v-model="to.comment"
                  required
                ></textarea>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="submit"
              class="btn btn-outline-primary btn-sm"
              id="transfer_to_disabled"
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
  name: "TransferItem",
  props: ["items", "id", "name"],
  emits: ["transfer_to", "transfer_me"],
  watch: {
    id(e) {
      this.data.to_ = e;
      this.to.from_ = e;
      this.data.money = null;
      this.data.comment = "";
      this.to.money = null;
      this.to.comment = "";
      this.to.to_ = null;
    },
  },
  data() {
    return {
      data: {
        money: null,
        from_: 0,
        to_: null,
        comment: "",
      },
      to: {
        money: null,
        from_: null,
        to_: null,
        comment: "",
      },
    };
  },
};
</script>

<!-- <style lang="scss" scoped>
</style> -->
