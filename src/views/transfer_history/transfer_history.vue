<template>
  <Header_item />

  <h4 class="card-title text-center">
    <span class="text-primary"> {{ this.$route.query.name }} </span> ҳисоби
  </h4>

  <ul
    class="nav nav-pills nav-fill nav-justified mb-3 row"
    id="pills-tab"
    role="tablist"
  >
    <li class="nav-item" role="presentation">
      <button
        class="btn btn-sm btn-light w-100"
        id="pills-home-tab"
        data-bs-toggle="pill"
        data-bs-target="#pills-home"
        type="button"
        role="tab"
        aria-controls="pills-home"
        aria-selected="true"
        @click="accept_money = true"
      >
        ҳисоб рақамига қабул қилинган пуллар
      </button>
    </li>
    <li class="nav-item" role="presentation">
      <button
        class="btn btn-sm btn-light w-100"
        id="pills-profile-tab"
        data-bs-toggle="pill"
        data-bs-target="#pills-profile"
        type="button"
        role="tab"
        aria-controls="pills-profile"
        aria-selected="false"
        @click="transfer_money_from = true"
      >
        ҳисоб рақамидан ўтказилган пуллар
      </button>
    </li>
    <li class="nav-item" role="presentation">
      <button
        class="btn btn-sm btn-light w-100"
        id="pills-contact-tab"
        data-bs-toggle="pill"
        data-bs-target="#pills-contact"
        type="button"
        role="tab"
        aria-controls="pills-contact"
        aria-selected="false"
        @click="transfer_money_to = true"
      >
        ҳисоб рақамига ўтказилган пуллар
      </button>
    </li>
  </ul>
  <u
    class="nav nav-pills nav-fill nav-justified mb-3 row"
    id="pills-tab"
    role="tablist"
  >
    <li class="nav-item" role="presentation">
      <button
        class="btn btn-sm btn-light w-100"
        id="pills-home-tab2"
        data-bs-toggle="pill"
        data-bs-target="#pills-home2"
        type="button"
        role="tab"
        aria-controls="pills-home2"
        aria-selected="true"
        @click="transfer_to_cashier = true"
      >
        кассирга ўтказилган пуллар
      </button>
    </li>
    <li class="nav-item" role="presentation">
      <button
        class="btn btn-sm btn-light w-100"
        id="pills-profile-tab2"
        data-bs-toggle="pill"
        data-bs-target="#pills-profile2"
        type="button"
        role="tab"
        aria-controls="pills-profile2"
        aria-selected="false"
        @click="transfer_f_expense = true"
      >
        доимий чиқим тарихи
      </button>
    </li>
    <li class="nav-item" role="presentation">
      <button
        class="btn btn-sm btn-light w-100"
        id="pills-contact-tab2"
        data-bs-toggle="pill"
        data-bs-target="#pills-contact2"
        type="button"
        role="tab"
        aria-controls="pills-contact2"
        aria-selected="false"
        @click="transfer_v_expense = true"
      >
        бир марталик чиқим тарихи
      </button>
    </li>
  </u>
  <div class="tab-content" id="pills-tabContent">
    <div
      class="tab-pane fade"
      id="pills-home"
      role="tabpanel"
      aria-labelledby="pills-home-tab"
    >
      <Accept_money v-if="accept_money == true" />
    </div>
    <div
      class="tab-pane fade"
      id="pills-profile"
      role="tabpanel"
      aria-labelledby="pills-profile-tab"
    >
      <Transfer_money_from v-if="transfer_money_from == true" />
    </div>
    <div
      class="tab-pane fade"
      id="pills-contact"
      role="tabpanel"
      aria-labelledby="pills-contact-tab"
    >
      <Transfer_money_to v-if="transfer_money_to == true" />
    </div>
    <div
      class="tab-pane fade"
      id="pills-home2"
      role="tabpanel"
      aria-labelledby="pills-home-tab2"
    >
      <Transfer_to_cashier v-if="transfer_to_cashier == true" />
    </div>
    <div
      class="tab-pane fade"
      id="pills-profile2"
      role="tabpanel"
      aria-labelledby="pills-profile-tab2"
    >
      <Transfer_f_expense v-if="transfer_f_expense == true" />
    </div>
    <div
      class="tab-pane fade"
      id="pills-contact2"
      role="tabpanel"
      aria-labelledby="pills-contact-tab2"
    >
      <Transfer_v_expense v-if="transfer_v_expense == true" />
    </div>
  </div>
</template>

<script>
import Header_item from "@/components/header/header_item.vue";
import Accept_money from "../../components/transfer/accept_money.vue";
import Transfer_money_from from "@/components/transfer/transfer_money_from.vue";
import Transfer_money_to from "@/components/transfer/transfer_money_to.vue";
import Transfer_to_cashier from "@/components/transfer/transfer_to_cashier.vue";
import Transfer_f_expense from "@/components/transfer/transfer_f_expense.vue";
import Transfer_v_expense from "@/components/transfer/transfer_v_expense.vue";
export default {
  data() {
    return {
      accept_money: false,
      transfer_money_from: false,
      transfer_money_to: false,
      transfer_to_cashier: false,
      transfer_f_expense: false,
      transfer_v_expense: false,
    };
  },
  components: {
    Header_item,
    Accept_money,
    Transfer_money_from,
    Transfer_money_to,
    Transfer_to_cashier,
    Transfer_f_expense,
    Transfer_v_expense,
  },
};
</script>

<style lang="scss" scoped>
button.active {
  background: #6c757d !important;
  color: #fff;
}
</style>
