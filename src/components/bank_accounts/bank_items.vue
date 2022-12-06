<template>
  <div
    class="table-responsive mt-3"
    v-if="role != 'admin'"
    id="bank_account_data"
  >
    <table class="table table-sm table-hover" id="select_bank_account_data">
      <thead>
        <tr>
          <th style="width: 10%">№</th>
          <th style="width: 30%">Номи</th>
          <th style="width: 30%">Баланс</th>
          <th style="width: 30%"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, inc) in data" :key="item">
          <td>{{ inc + 1 }}</td>
          <td>{{ item.Bank_accounts.name }}</td>
          <td>
            <span class="d-flex">
              <Format_numbers :number="item.Bank_accounts.balance" />
              <span class="mx-1"> сўм </span>
            </span>
          </td>
          <td data-exclude="true">
            <button
              v-if="role != 'admin'"
              class="btn btn-primary btn-sm mx-1"
              @click="select_id(item.Bank_accounts.id, item.Bank_accounts.name)"
              data-mdb-toggle="modal"
              data-mdb-target="#transfer_me_add"
            >
              <i class="fa-solid fa-money-bill"></i>
            </button>
            <button
              v-if="role != 'admin'"
              class="btn btn-primary btn-sm mx-1"
              @click="select_id(item.Bank_accounts.id, item.Bank_accounts.name)"
              data-mdb-toggle="modal"
              data-mdb-target="#transfer_to_add"
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
              v-if="role != 'admin'"
              class="btn btn-warning btn-sm mx-1"
              data-mdb-toggle="modal"
              data-mdb-target="#bank_account_put"
              @click="send_data(item.Bank_accounts)"
            >
              <i class="fa-solid fa-edit text-white"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="row cards mt-2" v-else>
    <div
      class="col-md-4 col-lg-3 col-sm-6 mt-1"
      v-for="item in data"
      :key="item"
    >
      <div class="card">
        <div class="card-body">
          <div class="row">
            <div class="col-9">
              <h5>
                <b>
                  {{ item.Bank_accounts.name }}
                </b>
              </h5>
              <h6 class="text-primary">
                <b>
                  Баланс:
                  <Format_numbers :number="item.Bank_accounts.balance" /> сўм
                </b>
              </h6>
            </div>
            <div class="col-3">
              <router-link
                :to="{
                  name: 'transfers_history',
                  query: {
                    id: item.Bank_accounts.id,
                    name: item.Bank_accounts.name,
                  },
                }"
                class="btn btn-sm mx-1 dark_btn"
              >
                <i class="fa-solid fa-clock-rotate-left"></i>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
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
      role: localStorage.getItem("role"),
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
          success(res);
          this.$emit("get");
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
          success(res);
          this.$emit("get");
          e.money = null;
          e.from_ = 0;
          e.to_ = this.id;
          e.comment = "";
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
          success(res);
          this.$emit("get");
          e.money = null;
          e.from_ = this.id;
          e.to_ = null;
          e.comment = "";
          document.getElementById("bank_account_text").innerHTML =
            "ҳисоб рақамлар";
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
          success(res);
          this.$emit("get");
          e.money = null;
          e.from_ = this.id;
          e.to_ = null;
          e.comment = "";
          document.getElementById("cashier_text").innerHTML = "кассирлар";
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
  table-layout: fixed;
  width: 100%;
  min-width: 900px;
}

.table-responsive,
.row.cards {
  max-height: 70vh;
}

@media (max-width: 500px) {
  .table-responsive {
    max-height: 95vh;
  }
}

.col-3 {
  align-items: center;
  display: flex;
}

.card {
  transition: all 0.1s ease-out;
}

.row .card {
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.11), 0 2px 6px rgb(79, 102, 127, 0.48);
}

.card:hover {
  transform: translateY(-4px) scale(1.005) translateZ(0);
}
</style>
