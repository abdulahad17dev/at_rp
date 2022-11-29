<template>
  <!-- Modal -->
  <div class="modal fade" id="user_put">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ data.name }} маълумотларини таҳрирлаш</h5>
          <button
            type="button"
            class="btn-close"
            data-mdb-dismiss="modal"
            aria-label="Close"
            id="user_put"
          ></button>
        </div>
        <form @submit.prevent="$emit('put', data)">
          <div class="modal-body">
            <div class="row gap-2">
              <div class="col-10 mx-auto">
                <label for="ism"> Исм: </label>
                <input
                  type="text"
                  id="ism"
                  class="form-control form-control-sm"
                  v-model="data.name"
                  required
                  placeholder="Исм"
                />
              </div>
              <div class="col-10 mx-auto">
                <label for="tel"> Телефон рақам: </label>
                <div class="input-group input-group-sm">
                  <span class="input-group-text bg-white">+998</span>
                  <input
                    type="tel"
                    id="tel"
                    class="form-control form-control-sm"
                    v-model="data.phone"
                    required
                    placeholder="Телефон рақам"
                    maxlength="9"
                    minlength="9"
                    @keypress="onlyNumber"
                  />
                </div>
              </div>
              <div class="col-10 mx-auto">
                <label for="username"> Логин: </label>
                <input
                  type="text"
                  id="username"
                  class="form-control form-control-sm"
                  v-model="data.username"
                  required
                  placeholder="Логин"
                />
              </div>
              <div class="col-10 mx-auto">
                <label for="password"> Парол: </label>
                <input
                  type="password"
                  id="password"
                  class="form-control form-control-sm"
                  v-model="data.password"
                  placeholder="Парол"
                  autocomplete="on"
                />
              </div>
              <div class="col-10 mx-auto" v-if="user_id != data.id">
                <label for="role"> Ихтисослиги: </label>
                <select
                  id="role"
                  class="form-control form-control-sm"
                  v-model="data.role"
                  required
                >
                  <option value="admin">админ</option>
                  <option value="omborchi">омборчи</option>
                  <option value="taminotchi">таминотчи</option>
                  <option value="prorap">прорап</option>
                  <option value="pto">пто</option>
                  <option value="kassir">кассир</option>
                  <option value="bugalter">бугалтер</option>
                  <option value="ish_yurituvchi">иш_юритувчи</option>
                  <option value="bazachi">базачи</option>
                  <option value="zakupshik">закупшик</option>
                  <option value="operator">оператор</option>
                </select>
              </div>

              <div class="col-10 mx-auto" v-if="user_id != data.id">
                <label for="status"> Статус: </label>
                <select
                  id="status"
                  class="form-control form-control-sm"
                  v-model="data.status"
                  required
                >
                  <option value="true">фаол</option>
                  <option value="false">нофаол</option>
                </select>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="submit"
              class="btn btn-outline-primary btn-sm"
              id="user_disabled_put"
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
  name: "UserPutItem",
  props: ["object"],
  data() {
    return {
      user_id: localStorage.getItem("user_id"),
    };
  },
  computed: {
    data() {
      return this.object;
    },
  },
  methods: {
    onlyNumber($event) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
        $event.preventDefault();
      }
    },
  },
};
</script>

<!-- <style>
</style> -->
