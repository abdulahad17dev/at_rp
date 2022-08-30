<template>
  <!-- Modal -->
  <div class="modal fade" id="take_money_wallet">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            <b class="text-primary"> {{ name }} </b> дан пул олиш ва бериш
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            id="take_money_close"
          ></button>
        </div>
        <ul
          class="nav nav-pills nav-justified mb-3"
          id="pills-tab"
          role="tablist"
        >
          <li class="nav-item" role="presentation">
            <button
              class="btn btn-sm w-100 active"
              id="pills-home-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-home"
              type="button"
              role="tab"
              aria-controls="pills-home"
              aria-selected="true"
            >
              пул олиш
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button
              class="btn btn-sm w-100"
              id="pills-profile-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-profile"
              type="button"
              role="tab"
              aria-controls="pills-profile"
              aria-selected="false"
            >
              пул бериш
            </button>
          </li>
        </ul>
        <div class="tab-content" id="pills-tabContent">
          <div
            class="tab-pane fade show active"
            id="pills-home"
            role="tabpanel"
            aria-labelledby="pills-home-tab"
          >
            <form @submit.prevent="$emit('take_money', body)">
              <div class="modal-body">
                <div class="row gap-2">
                  <div class="col-10 mx-auto">
                    <label for="summa"> Сумма: </label>
                    <div class="input-group input-group-sm">
                      <input
                        id="summa"
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
                    <label for="comment"> Изох: </label>
                    <textarea
                      id="comment"
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
                  data-bs-dismiss="modal"
                >
                  <i class="fa-solid fa-circle-xmark"></i>
                </button>
              </div>
            </form>
          </div>
          <div
            class="tab-pane fade"
            id="pills-profile"
            role="tabpanel"
            aria-labelledby="pills-profile-tab"
          >
            <form @submit.prevent="$emit('give_money', give_money)">
              <div class="modal-body">
                <div class="row gap-2">
                  <div class="col-10 mx-auto">
                    <label for="summa2"> Сумма: </label>
                    <div class="input-group input-group-sm">
                      <input
                        id="summa2"
                        type="number"
                        step="any"
                        class="form-control form-control-sm"
                        v-model="give_money.money"
                        placeholder="Сумма"
                        required
                      />
                      <span class="input-group-text bg-white">сўм</span>
                    </div>
                  </div>
                  <div class="col-10 mx-auto">
                    <label for="comment2"> Изох: </label>
                    <textarea
                      id="comment2"
                      class="form-control form-control-sm"
                      placeholder="Изох"
                      v-model="give_money.comment"
                      required
                    ></textarea>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="submit"
                  class="btn btn-outline-primary btn-sm"
                  id="take_m_disabled2"
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
    </div>
  </div>
</template>

<script>
export default {
  name: "TakeMoneyToWallet",
  props: ["id", "name"],
  emits: ["take_money", "give_money"],
  watch: {
    id(e) {
      this.body.from_ = e;
      this.give_money.to_ = e;
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
      give_money: {
        money: null,
        from_: 0,
        to_: null,
        comment: "",
      },
    };
  },
};
</script>

<style lang="scss" scoped>
button.active {
  background: #6c757d !important;
  color: #fff;
}
</style>
