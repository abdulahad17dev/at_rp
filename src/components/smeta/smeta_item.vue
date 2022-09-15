<template>
  <div class="table-responsive mt-3" style="overflow: auto" v-if="data != ''">
    <table class="table table-sm table-hover table-bordered smeta">
      <tbody v-for="item in data" :key="item">
        <tr v-if="!item.Smeta.grafik_id" class="bg-dark text-white text-center">
          <td colspan="11">{{ item.Smeta.name }}</td>
        </tr>
        <tr
          v-if="
            !type.find((e) => {
              return e == item.Smeta.type;
            }) && item.Smeta.grafik_id
          "
          class="text-center"
        >
          <td colspan="11">{{ item.Smeta.name }}</td>
        </tr>
        <tr v-if="item.Smeta.type == 'grafik'" class="grafik">
          <td style="width: 5%">{{ item.Smeta.shnk }}</td>
          <td style="width: 20%">{{ item.Smeta.name }}</td>
          <td style="width: 5%">{{ item.Smeta.olchov_birligi }}</td>
          <td style="width: 10%">{{ item.Smeta.quantity }}</td>
          <td style="width: 10%">{{ item.Smeta.allotted_time_for_worker }}</td>
          <td style="width: 10%">{{ item.Smeta.allotted_time_for_machine }}</td>
          <td style="width: 10%">
            <span v-if="item.Smeta.alotted_price">{{
              item.Smeta.alotted_price
            }}</span>
            <span v-else>0</span> сўм
          </td>
          <td style="width: 5%">{{ item.Smeta.muddat }} кун</td>
          <td style="width: 10%">
            {{
              new Date(item.Smeta.start_date)
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
          <td style="width: 10%">
            {{
              new Date(item.Smeta.end_date)
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
          <td style="width: 5%">
            <button
              v-if="
                item.Smeta.status !== 'removed' &&
                item.Smeta.status !== 'finished' &&
                role == 'pto'
              "
              class="btn btn-danger btn-sm"
              @click="$emit('remove_smeta', item.Smeta.id)"
              id="remove_smeta"
            >
              <i class="fa-solid fa-circle-xmark"></i>
            </button>
            <span
              v-if="item.Smeta.status == 'removed'"
              class="badge rounded-pill bg-danger"
              >ўчирилган</span
            ><span
              v-else-if="item.Smeta.status == 'finished'"
              class="badge rounded-pill bg-success"
              >якунланган</span
            >
          </td>
        </tr>
        <tr
          v-if="item.Smeta.type == 'allotted_time_for_worker'"
          class="allotted_time_for_worker"
        >
          <td></td>
          <td>{{ item.Smeta.name }}</td>
          <td>{{ item.Smeta.olchov_birligi }}</td>
          <td>{{ item.Smeta.norm }}</td>
          <td>{{ item.Smeta.quantity }}</td>
          <td colspan="6">
            <span v-if="item.Smeta.alotted_price">
              {{ item.Smeta.alotted_price }}
            </span>
            <span v-else>0</span> сўм
          </td>
        </tr>
        <tr
          v-if="item.Smeta.type == 'allotted_time_for_machine'"
          class="allotted_time_for_machine"
        >
          <td></td>
          <td>{{ item.Smeta.name }}</td>
          <td>{{ item.Smeta.olchov_birligi }}</td>
          <td>{{ item.Smeta.norm }}</td>
          <td>{{ item.Smeta.quantity }}</td>
          <td colspan="6">
            <span v-if="item.Smeta.alotted_price">
              {{ item.Smeta.alotted_price }}
            </span>
            <span v-else>0</span> сўм
          </td>
        </tr>
        <tr v-if="item.Smeta.type == 'product'" class="product">
          <td></td>
          <td>{{ item.product_name }}</td>
          <td>{{ item.product_olchov_birligi }}</td>
          <td>{{ item.Smeta.norm }}</td>
          <td>{{ item.Smeta.quantity }}</td>
          <td colspan="6">
            <span v-if="item.Smeta.alotted_price">
              {{ item.Smeta.alotted_price }}
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

<style lang="scss" scoped>
table.smeta {
  min-width: 2000px;
  width: 100%;
  zoom: 65%;
}

.table-responsive {
  max-height: 68vh;
}

@media (max-width: 500px) {
  .table-responsive {
    max-height: 100vh;
  }
}
</style>
