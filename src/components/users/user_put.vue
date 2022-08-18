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
            data-bs-dismiss="modal"
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
                  autocomplete="true"
                />
              </div>
              <div class="col-10 mx-auto">
                <label for="role"> Ихтисослиги: </label>
                <select
                  id="role"
                  class="form-control form-control-sm"
                  v-model="data.role"
                  required
                >
                  <option value="admin">admin</option>
                  <option value="omborchi">omborchi</option>
                  <option value="taminotchi">taminotchi</option>
                  <option value="prorap">prorap</option>
                  <option value="pto">pto</option>
                  <option value="kassir">kassir</option>
                  <option value="bugalter">bugalter</option>
                  <option value="ish_yurituvchi">ish_yurituvchi</option>
                  <option value="bazachi">bazachi</option>
                  <option value="zakupshik">zakupshik</option>
                </select>
              </div>

              <div class="col-10 mx-auto">
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
  name: "UserPutItem",
  props: ["object"],
  computed: {
    data() {
      return this.object;
    },
  },
};
</script>

<!-- <style>
</style> -->
