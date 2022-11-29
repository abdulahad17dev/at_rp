<template>
  <div class="table-responsive m-1 mt-2">
    <table class="table table-sm table-hover">
      <thead>
        <tr>
          <th style="width: 10%">№</th>
          <th style="width: 25%">Номи</th>
          <th style="width: 25%">Лимит сумма</th>
          <th style="width: 25%">Ихтисослик</th>
          <th style="width: 4%"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, inc) in data" :key="item">
          <td>{{ inc + 1 }}</td>
          <td>{{ item.name }}</td>
          <td>
            {{ new Intl.NumberFormat().format(item.limit_of_expense) }} сўм
          </td>
          <td>{{ item.allowed_user_role }}</td>
          <td>
            <button
              class="btn btn-warning btn-sm"
              @click="$emit('get_item', item)"
              data-mdb-toggle="modal"
              data-mdb-target="#fixed_expense_put"
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
  max-height: 65vh;
  min-height: 65vh;
}

@media (max-width: 634px) {
  .table-responsive {
    max-height: 85vh;
    min-height: 85vh;
  }
}

table {
  width: 100%;
  min-width: 900px;
}
</style>
