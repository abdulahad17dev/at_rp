<template>
  <div class="table-responsive mt-3">
    <table class="table table-sm table-hover table-bordered">
      <thead class="">
        <tr>
          <th>#ИД</th>
          <th>Исм</th>
          <th>Телефон рақам</th>
          <th>Адресс</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in data || []" :key="item">
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>
            <a
              :href="`tel:+998${item.phone}`"
              class="text-decoration-none text-dark"
            >
              +998 {{ item.phone }}</a
            >
          </td>
          <td>{{ item.address }}</td>
          <td>
            <button
              class="btn btn-sm btn-warning"
              @click="$emit('item', item)"
              data-bs-toggle="modal"
              data-bs-target="#main_warehouse_put"
            >
              <i class="fa fa-edit text-white"></i>
            </button>
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
};
</script>

<style lang="scss" scoped>
table {
  min-width: 700px;
  width: 100%;
}
</style>
