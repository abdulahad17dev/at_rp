<template>
  <div class="table-responsive mt-3" style="overflow: auto" v-if="data != ''">
    <table class="table table-sm table-hover table-bordered smeta">
      <tbody v-for="item in data" :key="item">
        <tr v-if="!item.grafik_id" class="bg-dark text-white text-center">
          <td colspan="11">{{ item.name }}</td>
        </tr>
        <tr
          v-if="
            !type.find((e) => {
              return e == item.type;
            }) && item.grafik_id
          "
          class="text-center"
        >
          <td colspan="11">{{ item.name }}</td>
        </tr>
        <tr v-if="item.type == 'grafik'" style="color: #cc00cc">
          <td style="width: 5%">{{ item.shnk }}</td>
          <td style="width: 20%">{{ item.name }}</td>
          <td style="width: 5%">{{ item.olchov_birligi }}</td>
          <td style="width: 10%">{{ item.quantity }}</td>
          <td style="width: 10%">{{ item.allotted_time_for_worker }}</td>
          <td style="width: 10%">{{ item.allotted_time_for_machine }}</td>
          <td style="width: 10%">
            <span v-if="item.alotted_price">{{ item.alotted_price }}</span>
            <span v-else>0</span> сўм
          </td>
          <td style="width: 5%">{{ item.muddat }} кун</td>
          <td style="width: 10%">
            {{ new Date(item.start_date).toLocaleDateString() }}
          </td>
          <td style="width: 10%">
            {{ new Date(item.end_date).toLocaleDateString() }}
          </td>
          <td style="width: 5%">
            <button
              v-if="
                item.status !== 'removed' &&
                item.status !== 'finished' &&
                role == 'pto'
              "
              class="btn btn-danger btn-sm"
              @click="$emit('remove_smeta', item.id)"
              id="remove_smeta"
            >
              <i class="fa-solid fa-circle-xmark"></i>
            </button>
            <span
              v-if="item.status == 'removed'"
              class="badge rounded-pill bg-danger"
              >ўчирилган</span
            ><span
              v-else-if="item.status == 'finished'"
              class="badge rounded-pill bg-success"
              >якунланган</span
            >
          </td>
        </tr>
        <tr
          v-if="item.type == 'allotted_time_for_worker'"
          style="color: #660066"
        >
          <td></td>
          <td>{{ item.name }}</td>
          <td>{{ item.olchov_birligi }}</td>
          <td>{{ item.norm }}</td>
          <td>{{ item.quantity }}</td>
          <td colspan="6">
            <span v-if="item.alotted_price">
              {{ item.alotted_price }}
            </span>
            <span v-else>0</span> сўм
          </td>
        </tr>
        <tr
          v-if="item.type == 'allotted_time_for_machine'"
          style="color: #003300"
        >
          <td></td>
          <td>{{ item.name }}</td>
          <td>{{ item.olchov_birligi }}</td>
          <td>{{ item.norm }}</td>
          <td>{{ item.quantity }}</td>
          <td colspan="6">
            <span v-if="item.alotted_price">
              {{ item.alotted_price }}
            </span>
            <span v-else>0</span> сўм
          </td>
        </tr>
        <tr v-if="item.type == 'product'" style="color: #000080">
          <td></td>
          <td>{{ item.product.name }}</td>
          <td>{{ item.product.olchov_birligi }}</td>
          <td>{{ item.norm }}</td>
          <td>{{ item.quantity }}</td>
          <td colspan="6">
            <span v-if="item.alotted_price">
              {{ item.alotted_price }}
            </span>
            <span v-else>0</span> сўм
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "SmetaItems",
  props: { data: Array },
  data() {
    return {
      type: [
        "grafik",
        "allotted_time_for_worker",
        "allotted_time_for_machine",
        "product",
      ],
      role: localStorage.getItem("role"),
    };
  },
};
</script>

<style lang="scss">
// .table-sm > :not(caption) > * > * {
// padding: 0 !important;
// }
table.smeta {
  min-width: 2000px;
  width: 100%;
  zoom: 65%;
}
</style>
