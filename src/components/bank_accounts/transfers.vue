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
            data-mdb-dismiss="modal"
            aria-label="Close"
            id="transfer_add"
          ></button>
        </div>
        <form @submit.prevent="$emit('transfer_me', data)">
          <div class="modal-body">
            <div class="row gap-2">
              <div class="col-10 mx-auto">
                <label for="balance">
                  Сумма:
                  <span class="text-primary"
                    >{{ new Intl.NumberFormat().format(data.money) }} сўм</span
                  ></label
                >
                <div class="input-group input-group-sm">
                  <input
                    id="balance"
                    type="number"
                    step="any"
                    class="form-control"
                    v-model="data.money"
                    min="0"
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
            data-mdb-dismiss="modal"
            aria-label="Close"
            id="transfer_to"
          ></button>
        </div>
        <ul class="nav nav-tabs nav-justified" id="pills-tab" role="tablist">
          <li class="nav-item" role="presentation">
            <a
              class="nav-link active"
              id="pills-home-tab"
              data-mdb-toggle="pill"
              data-mdb-target="#pills-home"
              type="button"
              role="tab"
              aria-controls="pills-home"
              aria-selected="true"
            >
              ҳисоб рақамига пул ўтказиш
            </a>
          </li>
          <li class="nav-item" role="presentation">
            <a
              class="nav-link"
              id="pills-profile-tab"
              data-mdb-toggle="pill"
              data-mdb-target="#pills-profile"
              type="button"
              role="tab"
              aria-controls="pills-profile"
              aria-selected="false"
            >
              кассирга пул ўтказиш
            </a>
          </li>
        </ul>
        <div class="tab-content" id="pills-tabContent">
          <div
            class="tab-pane fade show active"
            id="pills-home"
            role="tabpanel"
            aria-labelledby="pills-home-tab"
          >
            <Transfer_bank_account_body @transfer_to="transfer_to" :id="id" />
          </div>
          <div
            class="tab-pane fade"
            id="pills-profile"
            role="tabpanel"
            aria-labelledby="pills-profile-tab"
          >
            <Transfer_cashier_body
              @transfer_to_cashier="transfer_to_cashier"
              :id="id"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Transfer_bank_account_body from "../transfer/transfer_bank_account_body.vue";
import Transfer_cashier_body from "../transfer/transfer_cashier_body.vue";
export default {
  name: "TransferItem",
  props: ["id", "name"],
  emits: ["transfer_to", "transfer_me", "transfer_to_cashier"],
  watch: {
    id(e) {
      this.data.to_ = e;
      this.data.money = null;
      this.data.comment = "";
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
    };
  },
  methods: {
    transfer_to(e) {
      this.$emit("transfer_to", e);
    },
    transfer_to_cashier(e) {
      this.$emit("transfer_to_cashier", e);
    },
  },
  components: { Transfer_bank_account_body, Transfer_cashier_body },
};
</script>

<!-- <style lang="scss" scoped>
</style> -->
