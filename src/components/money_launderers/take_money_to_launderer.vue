<template>
  <!-- Modal -->
  <div class="modal fade" id="take_money">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            <b class="text-primary"> {{ name }} </b> дан пул олиш
          </h5>
          <button
            type="button"
            class="btn-close"
            data-mdb-dismiss="modal"
            aria-label="Close"
            id="take_money_close"
          ></button>
        </div>
        <form @submit.prevent="$emit('take_money', body)">
          <div class="modal-body">
            <div class="row gap-2">
              <div class="col-10 mx-auto">
                <label for="summa3">
                  Сумма:
                  <span class="text-primary"
                    >{{ new Intl.NumberFormat().format(body.money) }}
                    сўм
                  </span></label
                >
                <div class="input-group input-group-sm">
                  <input
                    id="summa3"
                    type="number"
                    step="any"
                    class="form-control form-control-sm"
                    v-model="body.money"
                    placeholder="Сумма"
                    required
                  />
                  <span class="input-group-text bg-white">сўм</span>
                </div>
              </div>
              <div class="col-10 mx-auto">
                <label for="comment4"> Изох: </label>
                <textarea
                  id="comment4"
                  class="form-control form-control-sm"
                  placeholder="Изох"
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
              id="take_m_disabled"
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
  name: "TakeMoneyToLaunderer",
  props: ["id", "name"],
  watch: {
    id(e) {
      this.body.from_ = e;
    },
  },
  data() {
    return {
      body: {
        money: null,
        from_: null,
        to_: 0,
        comment: "",
      },
    };
  },
};
</script>

<!-- <style lang="scss" scoped>
</style> -->
