<template>
  <div class="shadow-sm rounded">
    <form @submit.prevent="$emit('add', body)">
      <div class="row m-1">
        <div class="col-lg col-sm-6 col-md-6 my-1">
          <label for="body_name">Номи:</label>
          <input
            type="text"
            id="body_name"
            class="form-control form-control-sm"
            placeholder="Номи"
            v-model="body.name"
            required
          />
        </div>
        <div class="col-lg col-sm-6 col-md-6 my-1">
          <label for="body_quantity">Ҳажми:</label>
          <input
            type="number"
            id="body_quantity"
            class="form-control form-control-sm"
            step="any"
            placeholder="Ҳажми"
            v-model="body.quantity"
            required
          />
        </div>
        <div class="col-lg col-sm-6 col-md-6 my-1">
          <label for="body_olchov_birligi">Ўлчов бирлиги:</label>
          <input
            type="text"
            id="body_olchov_birligi"
            class="form-control form-control-sm"
            placeholder="Ўлчов бирлиги"
            v-model="body.olchov_birligi"
            required
          />
        </div>
        <div class="col-lg col-sm-6 col-md-6 my-1">
          <label for="body_comment">Изох:</label>
          <textarea
            type="text"
            id="body_comment"
            class="form-control form-control-sm"
            placeholder="Изох"
            v-model="body.comment"
            required
          />
        </div>
        <div class="col-lg col-sm-12 col-md-12 my-1">
          <label class="d-sm-none d-md-none d-lg-block d-none">ㅤ</label>
          <button
            class="btn btn-primary btn-sm w-100"
            type="submit"
            :disabled="
              !body.name ||
              !body.quantity ||
              !body.olchov_birligi ||
              !body.comment ||
              !body.building_id
            "
            id="proche_sorov_disabled"
          >
            <i class="fa-solid fa-circle-check"></i>
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "ProcheSorovAdd",
  emits: ["add"],
  data() {
    return {
      body: {
        name: "",
        quantity: null,
        olchov_birligi: "",
        comment: "",
        building_id: this.$route.query.id,
      },
    };
  },
};
</script>

<style lang="scss" scoped>
@media (max-width: 576px) {
  .row .col-sm-6 {
    width: 50%;
  }
}
</style>
