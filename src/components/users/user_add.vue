<template>
  <!-- Modal -->
  <div class="modal fade" id="user_add">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Ҳодим қўшиш</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            id="user_add"
          ></button>
        </div>
        <form @submit.prevent="$emit('add', data)">
          <div class="modal-body">
            <div class="row gap-2">
              <div class="col-10 mx-auto">
                <label for="ism1"> Исм: </label>
                <input
                  type="text"
                  id="ism1"
                  class="form-control form-control-sm"
                  v-model="data.name"
                  required
                  placeholder="Исм"
                />
              </div>
              <div class="col-10 mx-auto">
                <label for="tel1"> Телефон рақам: </label>
                <div class="input-group input-group-sm">
                  <span class="input-group-text bg-white">+998</span>
                  <input
                    type="tel"
                    id="tel1"
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
                <label for="username1"> Логин: </label>
                <input
                  type="text"
                  id="username1"
                  class="form-control form-control-sm"
                  v-model="data.username"
                  required
                  placeholder="Логин"
                />
              </div>
              <div class="col-10 mx-auto">
                <label for="password1"> Парол: </label>
                <input
                  type="password"
                  id="password1"
                  class="form-control form-control-sm"
                  v-model="data.password"
                  required
                  placeholder="Парол"
                  autocomplete="on"
                />
              </div>
              <div class="col-10 mx-auto">
                <label for="role1"> Ихтисослиги: </label>
                <select
                  id="role1"
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
                </select>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="submit"
              class="btn btn-outline-primary btn-sm"
              id="user_disabled"
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
  name: "UserAddItem",
  data() {
    return {
      data: {
        id: 0,
        name: "",
        username: "",
        password: "",
        role: "",
        phone: null,
        status: "true",
      },
    };
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
