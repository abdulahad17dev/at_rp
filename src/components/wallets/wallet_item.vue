<template>
  <div class="table-responsive mt-3" v-if="data != ''">
    <table class="table table-sm table-hover table-bordered">
      <thead class="">
        <tr>
          <th>#ИД</th>
          <th>Исм</th>
          <th>Баланс</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in data || []" :key="item">
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.balance }}</td>
          <td>
            <button
              class="btn btn-sm btn-warning"
              @click="$emit('item', item)"
              data-bs-toggle="modal"
              data-bs-target="#wallet_put"
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
  name: "WalletItem",
  props: ["data"],
  emits: ["item"],
};
</script>

<style lang="scss" scoped>
table {
  min-width: 500px;
  width: 100%;
}
</style>
