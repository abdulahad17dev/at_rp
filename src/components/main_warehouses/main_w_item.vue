<template>
  <div class="table-responsive mt-3">
    <table class="table table-sm table-hover">
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
          <td>
            <button
              v-if="role != 'admin'"
              class="btn btn-sm btn-warning"
              @click="$emit('item', item)"
              data-bs-toggle="modal"
              data-bs-target="#main_warehouse_put"
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
</style>
