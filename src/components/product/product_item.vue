<template>
  <div class="table-responsive product mt-3">
    <table class="table table-sm table-hover table_products">
      <thead class="">
        <tr>
          <th style="width: 10%">№</th>
          <th style="width: 40%">Номи</th>
          <th style="width: 40%">Ўлчов бирлиги</th>
          <th style="width: 10%">Таркиб қўшиш</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, idx) in data" :key="item">
          <td>{{ idx + 1 }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.olchov_birligi }}</td>
          <td>
            <button
              class="btn btn-primary btn-sm"
              data-bs-toggle="modal"
              data-bs-target="#product_composition"
              @click="select_id(item.id, item)"
            >
              <i class="fa-solid fa-circle-plus"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div
    class="modal fade"
    id="product_composition"
    tabindex="-1"
    aria-labelledby="product_composition"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content border-0">
        <div class="modal-header">
          <h5 class="modal-title" id="product_composition">
            <b class="text-primary">{{ product_item.name }}</b>
            <b> 1 {{ product_item.olchov_birligi }}</b> нинг таркиби
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="add">
            <div class="row">
              <div class="col">
                <input
                  type="text"
                  class="form-control form-control-sm"
                  placeholder="Таркиб номи"
                  v-model="body.name"
                  required
                />
              </div>
              <div class="col">
                <input
                  step="any"
                  type="number"
                  class="form-control form-control-sm"
                  placeholder="Ҳажми"
                  v-model="body.quantity"
                  required
                  min="0.5"
                />
              </div>
              <div class="col">
                <input
                  type="text"
                  class="form-control form-control-sm"
                  placeholder="Ўлчов бирлиги"
                  v-model="body.olchov_birligi"
                  required
                />
              </div>
              <div class="col">
                <button
                  class="btn btn-primary btn-sm w-100"
                  type="submit"
                  id="composition_disabled"
                >
                  <i class="fa-solid fa-circle-check"></i> қўшиш
                </button>
              </div>
            </div>
          </form>

          <div class="table-responsive mt-3 table_product_composition">
            <table class="table table-sm table-hover product_c">
              <thead>
                <tr>
                  <th>№</th>
                  <th>Номи</th>
                  <th>Ҳажми</th>
                  <th>Ўлчов бирлиги</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, idx) in product_composition" :key="item">
                  <td style="width: 10%">{{ idx + 1 }}</td>
                  <td style="width: 20%">{{ item.name }}</td>
                  <td style="width: 20%">
                    <Format_numbers :number="item.quantity" />
                  </td>
                  <td style="width: 20%">{{ item.olchov_birligi }}</td>
                  <td style="width: 10%">
                    <button
                      class="btn btn-danger btn-sm"
                      @click="remove(item.id)"
                      id="remove"
                    >
                      <i class="fa-solid fa-circle-xmark"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Format_numbers from "@/utils/format/format_numbers.vue";
import { catchError, success } from "@/utils/request/handle_api_err";
import {
  product_composition_add,
  product_composition_get,
  product_composition_remove,
} from "@/utils/request/request";
export default {
  name: "ProductItems",
  props: { data: Array },
  emits: ["get_composition"],
  data() {
    return {
      body: {
        product_id: null,
        name: "",
        quantity: null,
        olchov_birligi: "",
      },
      product_id: null,
      product_composition: [],
      product_item: {},
    };
  },
  methods: {
    select_id(e, item) {
      this.$store.dispatch("setLoading", { isLoading: true });
      this.body.product_id = e;
      this.product_id = e;
      this.product_item = item;
      product_composition_get(e)
        .then((res) => {
          this.product_composition = res.data;
          this.$store.dispatch("setLoading", { isLoading: false });
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
        });
    },
    add() {
      document.getElementById("composition_disabled").disabled = true;
      this.$store.dispatch("setLoading", { isLoading: true });
      product_composition_add(this.body)
        .then((res) => {
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("composition_disabled").disabled = false;
          success(res);
          this.select_id(this.product_id, this.product_item);
          this.body.name = "";
          this.body.quantity = null;
          this.body.olchov_birligi = "";
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("composition_disabled").disabled = false;
        });
    },
    remove(e) {
      this.$store.dispatch("setLoading", { isLoading: true });
      document.getElementById("remove").disabled = true;
      product_composition_remove(e)
        .then((res) => {
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("remove").disabled = false;
          success(res);
          this.select_id(this.product_id, this.product_item);
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("remove").disabled = false;
        });
    },
  },
  components: { Format_numbers },
};
</script>

<style lang="scss" scoped>
table.table_products {
  width: 100%;
  table-layout: fixed;
}
table.product_c {
  min-width: 760px;
  width: 100%;
}

div.table_product_composition {
  max-height: 66vh;
}

div.product {
  max-height: 70vh;
}

@media (max-width: 500px) {
  div.table_product_composition {
    max-height: 90vh;
  }

  div.product {
    max-height: 98vh;
  }
}
</style>
