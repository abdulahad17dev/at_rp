<template>
  <div class="table-responsive m-1 mt-2">
    <table class="table table-sm table-hover table-bordered">
      <thead>
        <tr>
          <th style="width: 10%">#ИД</th>
          <th style="width: 25%">Номи</th>
          <th style="width: 25%">Лимит сумма</th>
          <th style="width: 25%">Ихтисослик</th>
          <th style="width: 4%"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in data" :key="item">
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>
            {{ new Intl.NumberFormat().format(item.limit_of_expense) }} сўм
          </td>
          <td>{{ item.allowed_user_role }}</td>
          <td>
            <button
              class="btn btn-warning btn-sm"
              @click="$emit('get_item', item)"
              data-bs-toggle="modal"
              data-bs-target="#fixed_expense_put"
            >
              <i class="fa-solid fa-edit text-white"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <Data_notfound v-if="data == ''" />
  </div>
</template>

<script>
import Data_notfound from "@/utils/notfound/data_notfound.vue";
export default {
  name: "FixedExpenses",
  props: ["data"],
  components: { Data_notfound },
};
</script>

<style lang="scss" scoped>
.table-responsive {
  max-height: 58vh;
  min-height: 58vh;
}

@media (max-width: 634px) {
  .table-responsive {
    max-height: 52vh;
    min-height: 52vh;
  }
}

table {
  width: 100%;
  min-width: 900px;
}
</style>
