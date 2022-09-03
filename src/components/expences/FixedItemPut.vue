<template>
  <div
    class="modal fade"
    id="fixed_expense_put"
    tabindex="-1"
    aria-labelledby="fixed_expense_put"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content border-0">
        <div class="modal-header">
          <h5 class="modal-title">{{ body.name }} маълумотларини таҳрирлаш</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            id="expense_p_close"
          ></button>
        </div>
        <form @submit.prevent="$emit('put', body)">
          <div class="modal-body">
            <div class="row gap-2">
              <div class="col-10 mx-auto">
                <label for="expense_name">Чиқим номи: </label>
                <input
                  id="expense_name"
                  type="text"
                  class="form-control form-control-sm"
                  placeholder="Доимий чиқим номи"
                  v-model="body.name"
                  required
                />
              </div>
              <div class="col-10 mx-auto">
                <label for="expense_role">Рухсат этилган ихтисослик</label>
                <select
                  id="expense_role"
                  class="form-control form-control-sm"
                  v-model="body.allowed_user_role"
                  required
                >
                  <option value="taminotchi">таминотчи</option>
                  <option value="kassir">кассир</option>
                  <option value="bugalter">бугалтер</option>
                </select>
              </div>
              <div class="col-10 mx-auto">
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio1"
                    value="option1"
                    @click="
                      (limit_of_expense = true),
                        (body.limit_of_expense = int != 0 ? int : null)
                    "
                    required
                    :checked="limit_of_expense == true"
                  />
                  <label class="form-check-label" for="inlineRadio1"
                    >Лимит</label
                  >
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio2"
                    value="option2"
                    @click="
                      (body.limit_of_expense = 0), (limit_of_expense = false)
                    "
                    :checked="limit_of_expense == false"
                    required
                  />
                  <label class="form-check-label" for="inlineRadio2"
                    >Безлимит</label
                  >
                </div>
                <div
                  class="input-group input-group-sm mt-1"
                  v-if="limit_of_expense"
                >
                  <input
                    type="number"
                    class="form-control"
                    placeholder="Лимит"
                    v-model="body.limit_of_expense"
                    required
                    @keyup="input"
                    min="1"
                  />
                  <span class="input-group-text bg-white"> сўм </span>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="submit"
              class="btn btn-outline-primary btn-sm"
              id="fixed_e_disabled"
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
  name: "FixedItemPut",
  props: ["item"],
  data() {
    return {
      limit_of_expense: false,
      int: null,
    };
  },
  watch: {
    item(e) {
      this.int = e.limit_of_expense;
      if (e.limit_of_expense > 0) {
        this.limit_of_expense = true;
      } else {
        this.limit_of_expense = false;
      }
    },
  },
  methods: {
    input(e) {
      this.int = e.target.value;
    },
  },
  computed: {
    body() {
      return this.item;
    },
  },
};
</script>

<!-- <style lang="scss" scoped>
</style> -->
