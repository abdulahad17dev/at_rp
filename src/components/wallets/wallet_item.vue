<template>
  <div class="table-responsive mt-3">
    <table class="table table-sm table-hover">
      <thead class="">
        <tr>
          <th style="width: 10%">№</th>
          <th style="width: 30%">Исм</th>
          <th style="width: 30%">Баланс</th>
          <th style="width: 30%"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, inc) in data || []" :key="item">
          <td>{{ inc + 1 }}</td>
          <td>{{ item.name }}</td>
          <td>
            <Format_numbers :number="item.balance" />
            сўм
          </td>
          <td>
            <button
              class="btn btn-sm btn-warning"
              @click="$emit('item', item)"
              data-bs-toggle="modal"
              data-bs-target="#wallet_put"
            >
              <i class="fa fa-edit text-white"></i>
            </button>
            <button
              class="btn btn-sm btn-primary mx-1"
              @click="$emit('get_w_id', item.id, item.name)"
              data-bs-toggle="modal"
              data-bs-target="#take_money_wallet"
            >
              <i class="fa-solid fa-money-bill-transfer text-white"></i>
            </button>
            <router-link
              :to="{
                name: 'wallet_transfer_history',
                query: { id: item.id, name: item.name },
              }"
              class="btn btn-sm btn-secondary"
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
import Format_numbers from "@/utils/format/format_numbers.vue";

export default {
  name: "WalletItem",
  props: ["data"],
  emits: ["item", "get_w_id"],
  components: { Format_numbers },
};
</script>

<style lang="scss" scoped>
table {
  min-width: 600px;
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
