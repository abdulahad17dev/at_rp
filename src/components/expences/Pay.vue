<template>
  <!-- Modal -->
  <div
    class="modal fade"
    id="fixed_expense"
    tabindex="-1"
    aria-labelledby="fixed_expenses"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content border-0">
        <ul
          class="nav nav-pills m-2 nav-justified"
          id="pills-tab"
          role="tablist"
        >
          <li class="nav-item" role="presentation">
            <button
              class="nav-link btn btn-sm active"
              id="pills-home-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-home"
              type="button"
              role="tab"
              aria-controls="pills-home"
              aria-selected="true"
            >
              Чиқим турини қўшиш
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button
              class="nav-link btn btn-sm"
              id="pills-profile-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-profile"
              type="button"
              role="tab"
              aria-controls="pills-profile"
              aria-selected="false"
            >
              Чиқим турлари
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
            <form @submit.prevent="$emit('add_fixed_expense', body)">
              <div class="modal-body">
                <div class="row gap-2">
                  <div class="col-10 mx-auto">
                    <input
                      type="text"
                      class="form-control form-control-sm"
                      placeholder="Доимий чиқим номи"
                      v-model="body.name"
                      required
                    />
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="submit"
                  class="btn btn-outline-primary btn-sm"
                  id="fixed_expense_disabled"
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
          <div
            class="tab-pane fade mb-2"
            id="pills-profile"
            role="tabpanel"
            aria-labelledby="pills-profile-tab"
          >
            <div class="modal-body">
              <div class="row gap-2">
                <div class="col-10 mx-auto" v-for="item in data" :key="item">
                  <form @submit.prevent="$emit('edit', item)">
                    <div class="input-group input-group-sm">
                      <input
                        type="text"
                        class="form-control"
                        v-model="item.name"
                        required
                      />
                      <div class="input-group-prepend">
                        <button
                          class="btn btn-sm btn-warning"
                          :id="'disabled' + item.id"
                          type="submit"
                        >
                          <i class="fa-solid fa-edit text-white"></i>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-outline-danger btn-sm"
                data-bs-dismiss="modal"
              >
                <i class="fa-solid fa-circle-xmark"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div
    class="modal fade"
    id="pay_for_fixed_expense"
    tabindex="-1"
    aria-labelledby="pay_for_expneses"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="pay_for_expneses">Доимий чиқим</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            id="pay_f"
          ></button>
        </div>
        <form @submit.prevent="$emit('pay_f_expense', pay_body)">
          <div class="modal-body">
            <div class="row gap-2">
              <div class="col-10 mx-auto">
                <label for="from">Банк ҳисоб: </label>
                <select
                  id="from"
                  class="form-control form-control-sm"
                  v-model="pay_body.from_"
                  required
                >
                  <option :value="item.id" v-for="item in accounts" :key="item">
                    {{ item.name }}
                  </option>
                </select>
              </div>
              <div class="col-10 mx-auto">
                <label for="to">Чиқим тури: </label>
                <select
                  id="to"
                  class="form-control form-control-sm"
                  v-model="pay_body.to_"
                  required
                >
                  <option :value="item.id" v-for="item in data" :key="item">
                    {{ item.name }}
                  </option>
                </select>
              </div>
              <div class="col-10 mx-auto">
                <label for="summa">Сумма: </label>
                <div class="input-group input-group-sm">
                  <input
                    type="number"
                    class="form-control"
                    id="summa"
                    v-model="pay_body.money"
                    required
                    min="1"
                  />
                  <span class="input-group-text bg-white">сўм</span>
                </div>
              </div>
              <div class="col-10 mx-auto">
                <label for="comment">Изох: </label>
                <textarea
                  id="comment"
                  class="form-control form-control-sm"
                  v-model="pay_body.comment"
                ></textarea>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="submit"
              class="btn btn-outline-primary btn-sm"
              id="pay_f_e_disabled"
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

  <div
    class="modal fade"
    id="pay_for_variable_expense"
    tabindex="-1"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Доимий чиқим</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            id="pay_v"
          ></button>
        </div>
        <form @submit.prevent="$emit('pay_v_expense', pay2_body)">
          <div class="modal-body">
            <div class="row gap-2">
              <div class="col-10 mx-auto">
                <label for="from">Банк ҳисоб: </label>
                <select
                  id="from"
                  class="form-control form-control-sm"
                  v-model="pay2_body.from_"
                  required
                >
                  <option :value="item.id" v-for="item in accounts" :key="item">
                    {{ item.name }}
                  </option>
                </select>
              </div>
              <div class="col-10 mx-auto">
                <label for="summa">Сумма: </label>
                <div class="input-group input-group-sm">
                  <input
                    type="number"
                    class="form-control"
                    id="summa"
                    v-model="pay2_body.money"
                    required
                    min="1"
                  />
                  <span class="input-group-text bg-white">сўм</span>
                </div>
              </div>
              <div class="col-10 mx-auto">
                <label for="comment">Изох: </label>
                <textarea
                  id="comment"
                  class="form-control form-control-sm"
                  v-model="pay2_body.comment"
                ></textarea>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="submit"
              class="btn btn-outline-primary btn-sm"
              id="pay_v_e_disabled"
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
  name: "PayExpenses",
  props: ["data", "accounts"],
  data() {
    return {
      body: {
        name: "",
      },
      pay_body: {
        money: null,
        from_: null,
        to_: null,
        comment: "",
      },
      pay2_body: {
        money: null,
        from_: null,
        to_: 0,
        comment: "",
      },
    };
  },
};
</script>

<style lang="scss" scoped>
#pills-profile .modal-body {
  max-height: 70vh;
  overflow: auto;
}
</style>
