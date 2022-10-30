<template>
  <div class="table-responsive mt-3">
    <table class="table table-sm table-hover">
      <thead class="">
        <tr>
          <th>№</th>
          <th>Исм</th>
          <th>Баланс</th>
          <th>Телефон рақам</th>
          <td></td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, inc) in data || []" :key="item">
          <td>{{ inc + 1 }}</td>
          <td>{{ item.name }}</td>
          <td :class="item.balance >= 0 ? 'text-success' : 'text-danger'">
            <Format_numbers :number="item.balance" />
            сўм
          </td>
          <td>
            <a
              :href="`tel:+998${item.phone}`"
              class="text-decoration-none text-dark"
            >
              +998 {{ format_phone(item.phone) }}</a
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
              class="btn btn-sm btn-secondary"
            >
              <i class="fa-solid fa-clock-rotate-left"></i>
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
    <Data_notfound v-if="data == ''" />
  </div>
</template>

<script>
import Format_numbers from "@/utils/format/format_numbers.vue";
import Data_notfound from "@/utils/notfound/data_notfound.vue";
export default {
  name: "MoneyLaundererItems",
  props: ["data"],
  emits: ["item", "get_l_id"],
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
  components: { Data_notfound, Format_numbers },
};
</script>

<style lang="scss" scoped>
table {
  min-width: 700px;
  width: 100%;
}

.table-responsive {
  max-height: 70vh;
}

@media (max-width: 500px) {
  .table-responsive {
    max-height: 95vh;
  }
}
</style>
