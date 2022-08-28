<template>
  <div class="table-responsive mt-3">
    <table class="table table-sm table-hover table-bordered">
      <thead class="">
        <tr>
          <th>#ИД</th>
          <th>Исм</th>
          <th>Баланс</th>
          <th>Телефон рақам</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in data || []" :key="item">
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td :class="item.balance >= 0 ? 'text-success' : 'text-danger'">
            {{ item.balance }} сўм
          </td>
          <td>
            <a
              :href="`tel:+998${item.phone}`"
              class="text-decoration-none text-dark"
            >
              +998 {{ item.phone }}</a
            >
          </td>
          <td>
            <button
              class="btn btn-sm btn-warning"
              @click="$emit('item', item)"
              data-bs-toggle="modal"
              data-bs-target="#money_launderer_put"
            >
              <i class="fa fa-edit text-white"></i>
            </button>
            <button
              class="btn btn-sm btn-primary mx-1"
              @click="$emit('get_l_id', item.id, item.name)"
              data-bs-toggle="modal"
              data-bs-target="#take_money"
            >
              <i class="fa-solid fa-money-bill-transfer text-white"></i>
            </button>
            <router-link
              :to="{
                name: 'money_launderer_history',
                query: { id: item.id, name: item.name },
              }"
              class="btn btn-sm btn-secondary mx-1"
            >
              <i class="fa-solid fa-clock-rotate-left"></i>
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "MoneyLaundererItems",
  props: ["data"],
  emits: ["item", "get_l_id"],
};
</script>

<style lang="scss" scoped>
table {
  min-width: 700px;
  width: 100%;
}
</style>
