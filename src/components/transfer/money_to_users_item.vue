<template>
  <div class="table-responsive mt-3">
    <table class="table table-sm table-hover table-bordered">
      <thead class="">
        <tr>
          <th>#ИД</th>
          <th>Исм</th>
          <th>Телефон рақам</th>
          <th>Баланс</th>
          <th>Ихтисослиги</th>
          <th></th>
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
          <td>{{ item.balance }} сўм</td>
          <td>{{ item.role }}</td>
          <td>
            <button
              class="btn btn-primary btn-sm"
              @click="$emit('get_item', item)"
              data-bs-toggle="modal"
              data-bs-target="#pay_to_user"
            >
              <i class="fa-solid fa-money-bill-transfer"></i>
            </button>
            <button class="btn btn-secondary btn-sm mx-1">
              <i class="fa-solid fa-clock-rotate-left"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "TransferMoneyToUsersItem",
  props: ["data"],
};
</script>

<style lang="scss" scoped>
table {
  min-width: 750px;
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
