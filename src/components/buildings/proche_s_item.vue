<template>
  <div class="table-responsive m-2">
    <table class="table table-sm table-hover">
      <thead class="">
        <tr>
          <th style="width: 10%">№</th>
          <th style="width: 20%">Номи</th>
          <th style="width: 20%">Ҳажм</th>
          <th style="width: 20%">Ўлчов бирлиги</th>
          <th style="width: 20%">Сана</th>
          <th style="width: 20%">Изох</th>
          <th>
            <select
              class="form-control form-control-sm form-select"
              @change="$emit('status', $event.target.value)"
            >
              <option value="" selected>барчаси</option>
              <option value="adminda_proche">админда</option>
              <option value="zakupshikda_proche">закупшикда</option>
              <option value="taminotchida_proche">таминотчида</option>
              <option value="taminotchida_proche_qabul_qilindi">
                қабул қилинди
              </option>
              <option value="rejected_proche">руҳсат этилмаган</option>
            </select>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, inc) in data || []" :key="item">
          <td style="width: 10%">
            {{ inc + 1 }}
          </td>
          <td style="width: 20%">
            {{ item.Proche_sorovlar.name }}
          </td>
          <td style="width: 20%">
            <Format_numbers :number="item.Proche_sorovlar.quantity" />
          </td>
          <td style="width: 20%">
            {{ item.Proche_sorovlar.olchov_birligi }}
          </td>
          <td style="width: 20%">
            {{
              new Date(item.Proche_sorovlar.time)
                .toLocaleDateString("en-us", {
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                })
                .slice(0, 10)
            }}
          </td>
          <td style="width: 20%">
            {{ item.Proche_sorovlar.comment }}
          </td>
          <td>
            <button
              v-if="item.Proche_sorovlar.status == 'adminda_proche'"
              class="btn btn-sm btn-danger"
              @click="$emit('remove', item.Proche_sorovlar.id)"
              id="remove_proche"
            >
              <i class="fa-solid fa-circle-xmark text-white"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Format_numbers from "@/utils/format/format_numbers.vue";

export default {
  name: "ProcheSorovItem",
  props: ["data"],
  components: { Format_numbers },
};
</script>

<style lang="scss" scoped>
table {
  min-width: 1150px;
  width: 100%;
}

.table-responsive {
  max-height: 65vh;
}

th select {
  width: 170px;
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
}

@media (max-width: 992px) {
  .table-responsive {
    max-height: 52vh;
  }
}

@media (max-width: 500px) {
  .table-responsive {
    max-height: 74vh;
  }
}
</style>
