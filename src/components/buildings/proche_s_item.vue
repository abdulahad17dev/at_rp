<template>
  <div class="table-responsive m-2">
    <table class="table table-sm table-hover table-bordered">
      <thead class="">
        <tr>
          <th style="width: 10%">#ИД</th>
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
        <tr v-for="item in data || []" :key="item">
          <td style="width: 10%">{{ item.id }}</td>
          <td style="width: 20%">{{ item.name }}</td>
          <td style="width: 20%">{{ item.quantity }}</td>
          <td style="width: 20%">{{ item.olchov_birligi }}</td>
          <td style="width: 20%">
            {{
              new Date(item.time)
                .toLocaleDateString("en-us", {
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  hour12: false,
                })
                .slice(0, 16)
            }}
          </td>
          <td style="width: 20%">{{ item.comment }}</td>
          <td>
            <button
              v-if="item.status == 'adminda_proche'"
              class="btn btn-sm btn-danger"
              @click="$emit('remove', item.id)"
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
export default {
  name: "ProcheSorovItem",
  props: ["data"],
};
</script>

<style lang="scss" scoped>
table {
  min-width: 1150px;
  width: 100%;
}

.table-responsive {
  max-height: 62vh;
}

th select {
  width: 170px;
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
}
</style>
