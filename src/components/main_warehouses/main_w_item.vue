<template>
  <div class="table-responsive mt-3" v-if="role != 'admin'">
    <table class="table table-sm table-hover" id="select_main_w_data">
      <thead class="">
        <tr>
          <th>№</th>
          <th>Номи</th>
          <th>Телефон рақам</th>
          <th>Манзил</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, inc) in data || []" :key="item">
          <td>{{ inc + 1 }}</td>
          <td>{{ item.name }}</td>
          <td>
            <a
              :href="`tel:+998${item.phone}`"
              class="text-decoration-none text-dark"
            >
              +998 {{ format_phone(item.phone) }}</a
            >
          </td>
          <td>{{ item.address }}</td>
          <td data-exclude="true">
            <button
              v-if="role != 'admin'"
              class="btn btn-sm btn-warning"
              @click="$emit('item', item)"
              data-mdb-toggle="modal"
              data-mdb-target="#main_warehouse_put"
            >
              <i class="fa fa-edit text-white"></i>
            </button>
            <router-link
              :to="{
                name: 'main_warehouse_product',
                query: { id: item.id, name: item.name },
              }"
              class="btn btn-sm btn-primary mx-1"
            >
              <i class="fa-solid fa-right-long"></i>
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="row cards mt-2" v-else>
    <div
      class="col-md-4 col-lg-3 col-sm-6 mt-1"
      v-for="item in data"
      :key="item"
    >
      <div class="card">
        <div class="card-body">
          <div class="row">
            <div class="col-9">
              <h6>
                <b>
                  <i class="fa-solid fa-warehouse float-start"></i>
                  <span class="mx-1">{{ item.name }}</span>
                </b>
              </h6>
              <h6>
                <b>
                  <i class="fa-sharp fa-solid fa-location-dot float-start"></i>
                  <span class="mx-2">{{ item.address }}</span>
                </b>
              </h6>
              <h6 class="text-primary">
                <b class="text-dark">
                  <i class="fa-solid fa-phone"></i>
                  <a
                    :href="`tel:+998${item.phone}`"
                    class="text-decoration-none text-dark"
                  >
                    +998 {{ format_phone(item.phone) }}</a
                  ></b
                >
              </h6>
            </div>
            <div class="col-3">
              <router-link
                :to="{
                  name: 'main_warehouse_product',
                  query: { id: item.id, name: item.name },
                }"
                class="btn btn-sm dark_btn mx-1"
                ><i class="fa-solid fa-circle-right"></i>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MainWarehouseItem",
  props: ["data"],
  emits: ["get", "item"],
  data() {
    return {
      role: localStorage.getItem("role"),
    };
  },
  methods: {
    format_phone(number) {
      return String(
        "(" +
          String(number).substr(0, 2) +
          ") " +
          String(number).substr(2, 3) +
          " " +
          String(number).substr(5, 2) +
          " " +
          String(number).substr(7, 2)
      );
    },
  },
};
</script>

<style lang="scss" scoped>
table {
  table-layout: fixed;
  width: 100%;
}

.table-responsive {
  max-height: 66vh;
}

@media (max-width: 500px) {
  .table-responsive {
    max-height: 85vh;
  }
}

.col-3 {
  align-items: center;
  display: flex;
}

.card {
  transition: all 0.1s ease-out;
}

.row .card {
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.11), 0 2px 6px rgb(79, 102, 127, 0.48);
}

.card:hover {
  transform: translateY(-4px) scale(1.005) translateZ(0);
}
</style>
