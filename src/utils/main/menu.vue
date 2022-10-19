<template>
  <Header_item />

  <div class="row">
    <div
      class="col-md-4 col-lg-3 col-sm-6 my-1"
      v-for="item in routes.filter((item) => {
        return item.role.find((roleItem) => {
          return roleItem == role;
        });
      })"
      :key="item"
    >
      <router-link :to="item.to" class="text-decoration-none">
        <div class="card shadow border-0">
          <div class="card-body text-center">
            <i :class="item.icon"></i>
            <hr />
            <strong>{{ item.title }}</strong>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import Header_item from "@/components/header/header_item.vue";
export default {
  name: "MenuItem",
  data() {
    return {
      role: localStorage.getItem("role"),
      routes: [
        {
          to: "/users",
          icon: "fa-solid fa-users fa-2x",
          title: "Ҳодимлар",
          role: ["admin"],
        },
        {
          to: "/buildings",
          icon: "fa-solid fa-building fa-2x",
          title: "Объектлар",
          role: ["pto", "admin", "prorap", "operator"],
        },
        {
          to: "/products",
          icon: "fa-solid fa-box fa-2x",
          title: "Маҳсулотлар",
          role: ["pto"],
        },
        {
          to: "/bank_accounts",
          icon: "fa-solid fa-wallet fa-2x",
          title: "Банк ҳисоблари",
          role: ["bugalter"],
        },
        {
          to: "/expenses",
          icon: "fa-solid fa-box fa-2x",
          title: "Чиқимлар",
          role: ["bugalter", "admin", "taminotchi", "kassir"],
        },
        {
          to: "/main_warehouses",
          icon: "fa-solid fa-users-line fa-2x",
          title: "Базалар",
          role: ["bazachi"],
        },
        {
          to: "/money_launderers",
          icon: "fa-solid fa-hand-holding-dollar fa-2x",
          title: "Пул ювувчилар",
          role: ["kassir"],
        },
        {
          to: "/wallets",
          icon: "fa-solid fa-wallet fa-2x",
          title: "Ҳамён",
          role: ["kassir"],
        },
        {
          to: "/markets",
          icon: "fa-solid fa-shop fa-2x",
          title: "Таминот",
          role: ["taminotchi"],
        },
        {
          to: "/money_from_bugalter",
          icon: "fa-solid fa-money-bill-transfer fa-2x",
          title: "Бугалтер ўтказган пуллар",
          role: ["kassir"],
        },
        {
          to: "/transfer_money_to_users",
          icon: "fa-solid fa-users fa-2x",
          title: "Ҳодимлар",
          role: ["kassir"],
        },
        {
          to: "/transfer_money_to_cashier",
          icon: "fa-solid fa-users fa-2x",
          title: "Пул ўтказмалари",
          role: ["taminotchi", "prorap"],
        },
        {
          to: "/product_request_zakupshik",
          icon: "fa-solid fa-rectangle-list fa-2x",
          title: "Олиниши керак бўлган материаллар",
          role: ["zakupshik"],
        },
        {
          to: "/worker_types",
          icon: "fa-solid fa-box fa-2x",
          title: "Ишчи турлари",
          role: ["operator"],
        },
        {
          to: "/supply_request",
          icon: "fa-solid fa-box fa-2x",
          title: "Омбордаги материаллар",
          role: ["bugalter"],
        },
        {
          to: "/supply_accept",
          icon: "fa-solid fa-box fa-2x",
          title: "Омбордаги материаллар",
          role: ["omborchi"],
        },
        {
          to: "/settings",
          icon: "fa-solid fa-screwdriver-wrench fa-2x",
          title: "Созламалар",
          role: [`${localStorage.getItem("role")}`],
        },
      ],
    };
  },
  components: { Header_item },
};
</script>

<style lang="scss">
.card-body {
  color: #2c3e50;
}
</style>
