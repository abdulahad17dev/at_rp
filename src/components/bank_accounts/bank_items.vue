<template>
  <div class="table-responsive mt-3" v-if="data != ''">
    <table class="table table-sm table-hover">
      <thead>
        <tr>
          <th style="width: 10%">№</th>
          <th style="width: 30%">Номи</th>
          <th style="width: 20%">Баланс</th>
          <th style="width: 20%"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, inc) in data" :key="item">
          <td>{{ inc + 1 }}</td>
          <td>{{ item.Bank_accounts.name }}</td>
          <td>
            <Format_numbers :number="item.Bank_accounts.balance" />
            сўм
          </td>
          <td>
            <button
              class="btn btn-primary btn-sm mx-1"
              @click="select_id(item.Bank_accounts.id, item.Bank_accounts.name)"
              data-bs-toggle="modal"
              data-bs-target="#transfer_me_add"
            >
              <i class="fa-solid fa-money-bill"></i>
            </button>
            <button
              class="btn btn-primary btn-sm mx-1"
              @click="select_id(item.Bank_accounts.id, item.Bank_accounts.name)"
              data-bs-toggle="modal"
              data-bs-target="#transfer_to_add"
            >
              <i class="fa-solid fa-money-bill-transfer"></i>
            </button>
            <router-link
              :to="{
                name: 'transfers_history',
                query: {
                  id: item.Bank_accounts.id,
                  name: item.Bank_accounts.name,
                },
              }"
              class="btn btn-secondary btn-sm mx-1"
            >
              <i class="fa-solid fa-clock-rotate-left"></i>
            </router-link>
            <button
              class="btn btn-warning btn-sm mx-1"
              data-bs-toggle="modal"
              data-bs-target="#bank_account_put"
              @click="send_data(item.Bank_accounts)"
            >
              <i class="fa-solid fa-edit text-white"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <Bank_item_put :item="item" @put="put" />
  <Transfers
    :id="id"
    :name="name"
    @transfer_me="transfer_me"
    @transfer_to="transfer_to"
    @transfer_to_cashier="transfer_to_cashier"
  />
</template>

<script>
import {
  bank_account_put,
  transfers,
  transfer_to_cashiers,
} from "@/utils/request/request";
import Bank_item_put from "./bank_item_put.vue";
import { catchError, success } from "@/utils/request/handle_api_err";
import Transfers from "./transfers.vue";
import Format_numbers from "@/utils/format/format_numbers.vue";
export default {
  name: "BankAccounsItem",
  props: { data: Array },
  emits: ["get"],
  data() {
    return {
      item: {},
      id: null,
      name: "",
    };
  },
  methods: {
    send_data(e) {
      this.item = {
        id: e.id,
        name: e.name,
      };
    },
    put(e) {
      this.$store.dispatch("setLoading", { isLoading: true });
      document.getElementById("bank_put_disabled").disabled = true;
      bank_account_put(e.id, e)
        .then((res) => {
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("bank_put").click();
          document.getElementById("bank_put_disabled").disabled = false;
          success(res).then(() => {
            this.$emit("get");
          });
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("bank_put_disabled").disabled = false;
        });
    },
    select_id(e, name) {
      this.id = e;
      this.name = name;
    },
    transfer_me(e) {
      document.getElementById("transfer_disabled").disabled = true;
      this.$store.dispatch("setLoading", { isLoading: true });
      transfers(e)
        .then((res) => {
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("transfer_add").click();
          document.getElementById("transfer_disabled").disabled = false;
          success(res).then(() => {
            this.$emit("get");
            e.money = null;
            e.from_ = 0;
            e.to_ = this.id;
            e.comment = "";
          });
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("transfer_disabled").disabled = false;
        });
    },
    transfer_to(e) {
      document.getElementById("transfer_to_disabled").disabled = true;
      this.$store.dispatch("setLoading", { isLoading: true });
      transfers(e)
        .then((res) => {
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("transfer_to").click();
          document.getElementById("transfer_to_disabled").disabled = false;
          success(res).then(() => {
            this.$emit("get");
            e.money = null;
            e.from_ = this.id;
            e.to_ = null;
            e.comment = "";
            document.getElementById("bank_account_text").innerHTML =
              "ҳисоб рақамлар";
          });
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("transfer_to_disabled").disabled = false;
        });
    },
    transfer_to_cashier(e) {
      document.getElementById("transfer_to_cashier").disabled = true;
      this.$store.dispatch("setLoading", { isLoading: true });
      transfer_to_cashiers(e)
        .then((res) => {
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("transfer_to").click();
          document.getElementById("transfer_to_cashier").disabled = false;
          success(res).then(() => {
            this.$emit("get");
            e.money = null;
            e.from_ = this.id;
            e.to_ = null;
            e.comment = "";
            document.getElementById("cashier_text").innerHTML = "кассирлар";
          });
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("transfer_to_cashier").disabled = false;
        });
    },
  },
  components: { Bank_item_put, Transfers, Format_numbers },
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
