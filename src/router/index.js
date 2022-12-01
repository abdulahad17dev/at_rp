import { createRouter, createWebHistory } from "vue-router";
import login from "./../utils/template/login/Login.vue";
import users from "../views/users/users.vue";
import building from "../views/buildings/buildings.vue";
import building_inner from "../views/buildings/building_inner_page.vue";
import workers from "../views/buildings/workers.vue";
import worker_types from "../views/buildings/worker_types.vue";
import proche_sorovlar from "../views/buildings/proche_sorovlar.vue";
import proche_sorov_zakupshik from "../views/buildings/proche_sorov_zakupshik.vue";
import product from "../views/product/product.vue";
import smeta from "../views/smeta/smeta.vue";
import bank_acoounts from "../views/bank_accounts/bank_accounts.vue";
import transfers_history from "../views/transfer_history/transfer_history.vue";
import transfers_to_users from "../views/transfer_history/money_to_users_from_cashier.vue";
import transfer_money_to_cashier from "../views/transfer_history/transfer_from_user_to_cashier.vue";
import expences from "../views/expences/expences.vue";
import main_warehouses from "../views/main_warehouses/main_warehouses.vue";
import money_launderers from "../views/money_launderers/money_launderers.vue";
import money_laundered_history from "../views/money_launderers/money_from_money_launderer.vue";
import wallets from "../views/wallets/wallets.vue";
import wallets_history from "../views/wallets/wallets_money_history.vue";
import markets from "../views/markets/markets.vue";
import money_from_bugalter from "../views/transfer_history/money_from_bugalter.vue";
import supply_history from "../views/markets/supply_history.vue";
import supply_request from "../views/schot_request/supply_request.vue";
import supply_accept from "../views/markets/supply_in_warehouse.vue";
import transfered_products from "../views/transfer_history/transfered_products.vue";
import transfered_products_main_w from "../views/transfer_history/transfered_product_main_w.vue";
import building_products from "../views/product/building_product.vue";
import main_warehouse_product from "../views/product/product_in_main_w.vue";
import building_works from "../views/buildings/building_works.vue";
import warehouse_product from "../views/product/warehouse_product_admin.vue";
import work_info from "../views/buildings/building_info.vue";
import fixed_expense_history from "../views/expences/history_admin.vue";
import menu from "./../utils/main/menu.vue";
import notfound from "./../utils/notfound/notfound.vue";

const role = localStorage.getItem("role");

let routes = [
  // login
  {
    path: "/",
    name: "login",
    component: login,
    meta: { title: "Логин" },
  },
  // not found
  {
    path: "/:catchAll(.*)",
    name: "notFound",
    meta: { requiresAuth: false, title: "Сахифа Топилмади !", icon: "404" },
    component: notfound,
  },
  // users
  {
    path: "/users",
    name: "users",
    meta: {
      requiresAuth: true,
      title: "Ҳодимлар",
      icon: "fa-solid fa-users",
      role: ["admin"],
    },
    component: users,
  },
  // menu
  {
    path: "/menu",
    name: "menu",
    meta: {
      requiresAuth: true,
      title: "Бош меню",
      icon: "fa-solid fa-home",
    },
    component: menu,
  },
  // buildings
  {
    path: "/buildings",
    name: "buildings",
    meta: {
      requiresAuth: true,
      title: "Объектлар",
      icon: "fa-solid fa-building",
      role: ["pto", "admin", "prorap", "zakupshik", "operator"],
    },
    component: building,
  },
  {
    path: "/building",
    name: "building",
    meta: {
      requiresAuth: true,
      title: "Обйект",
      icon: "fa-solid fa-building",
      role: ["admin"],
    },
    component: building_inner,
  },
  {
    path: "/warehouse_product",
    name: "warehouse_product",
    meta: {
      requiresAuth: true,
      title: "Обйект материаллари",
      icon: "fa-solid fa-box",
      role: ["admin"],
    },
    component: warehouse_product,
  },
  // smeta
  {
    path: "/buildings/smeta",
    name: "smeta",
    meta: {
      requiresAuth: true,
      title: "Смета",
      icon: "fa-solid fa-clipboard-list",
      role: ["pto", "admin", "prorap"],
    },
    component: smeta,
  },
  // workers
  {
    path: "/buildings/workers",
    name: "workers",
    meta: {
      requiresAuth: true,
      title: "Усталар",
      icon: "fa-solid fa-users",
      role: ["prorap"],
    },
    component: workers,
  },
  // proche sorovlar
  {
    path: "/buildings/product_request",
    name: "proche_sorovlar",
    meta: {
      requiresAuth: true,
      title: "Проче сўровлар",
      icon: "fa-solid fa-rectangle-list",
      role: ["prorap", "operator"],
    },
    component: proche_sorovlar,
  },
  // proche sorovlar
  {
    path: "/product_request_zakupshik",
    name: "proche_sorov_zakupshik",
    meta: {
      requiresAuth: true,
      title: "Тақсимланиши керак бўлган материаллар",
      icon: "fa-solid fa-rectangle-list",
      role: ["zakupshik"],
    },
    component: proche_sorov_zakupshik,
  },
  // products
  {
    path: "/products",
    name: "products",
    meta: {
      requiresAuth: true,
      title: "Маҳсулотлар",
      icon: "fa-solid fa-box",
      role: ["pto"],
    },
    component: product,
  },
  // bank accounts
  {
    path: "/bank_accounts",
    name: "bank_acoounts",
    meta: {
      requiresAuth: true,
      title: "Банк ҳисоблари",
      icon: "fa-solid fa-wallet",
      role: ["bugalter", "admin"],
    },
    component: bank_acoounts,
  },
  // transfer history
  {
    path: "/transfers_history",
    name: "transfers_history",
    meta: {
      requiresAuth: true,
      title: "Ўтказмалар тарихи",
      icon: "fa-solid fa-clock-rotate-left",
      role: ["bugalter", "admin"],
    },
    component: transfers_history,
  },
  // transfer money to users from cashier
  {
    path: "/transfer_money_to_users",
    name: "transfer_money_to_users",
    meta: {
      requiresAuth: true,
      title: "Ҳодимга пул ўтказиш",
      icon: "fa-solid fa-users",
      role: ["kassir"],
    },
    component: transfers_to_users,
  },
  // transfer money to cashier from users
  {
    path: "/transfer_money_to_cashier",
    name: "transfer_money_to_cashier",
    meta: {
      requiresAuth: true,
      title: "Пул ўтказмалари",
      icon: "fa-solid fa-users",
      role: ["taminotchi", "prorap"],
    },
    component: transfer_money_to_cashier,
  },
  // expences
  {
    path: "/expenses",
    name: "expences",
    meta: {
      requiresAuth: true,
      title: "Чиқимлар",
      icon: "fa-solid fa-box",
      role: ["bugalter", "admin", "taminotchi", "kassir"],
    },
    component: expences,
  },
  // main warehouses
  {
    path: "/main_warehouses",
    name: "main_warehouses",
    meta: {
      requiresAuth: true,
      title: "Базалар",
      icon: "fa-solid fa-warehouse",
      role: ["bazachi", "admin"],
    },
    component: main_warehouses,
  },
  // money launderers
  {
    path: "/money_launderers",
    name: "money_launderers",
    meta: {
      requiresAuth: true,
      title: "Пул ювувчилар",
      icon: "fa-solid fa-hand-holding-dollar",
      role: ["kassir", "admin"],
    },
    component: money_launderers,
  },
  // wallets
  {
    path: "/wallets",
    name: "wallets",
    meta: {
      requiresAuth: true,
      title: "Ҳамён",
      icon: "fa-solid fa-wallet",
      role: ["kassir", "admin"],
    },
    component: wallets,
  },
  // wallets
  {
    path: "/markets",
    name: "markets",
    meta: {
      requiresAuth: true,
      title: "Таминот",
      icon: "fa-solid fa-shop",
      role: ["taminotchi"],
    },
    component: markets,
  },
  // money from bugalter
  {
    path: "/money_from_bugalter",
    name: "money_from_bugalter",
    meta: {
      requiresAuth: true,
      title: "Бугалтер ўтказган пуллар",
      icon: "fa-solid fa-money-bill-transfer",
      role: ["kassir"],
    },
    component: money_from_bugalter,
  },
  // money from money launderer history
  {
    path: "/money_launderer_history",
    name: "money_launderer_history",
    meta: {
      requiresAuth: true,
      title: "Ўтказмалар тарихи",
      icon: "fa-solid fa-clock-rotate-left",
      role: ["kassir", "admin"],
    },
    component: money_laundered_history,
  },
  // wallets transfer money history
  {
    path: "/wallet_transfer_history",
    name: "wallet_transfer_history",
    meta: {
      requiresAuth: true,
      title: "Ўтказмалар тарихи",
      icon: "fa-solid fa-clock-rotate-left",
      role: ["kassir", "admin"],
    },
    component: wallets_history,
  },
  {
    path: "/worker_types",
    name: "worker_types",
    meta: {
      requiresAuth: true,
      title: "Ишчи турлари",
      icon: "fa-solid fa-box",
      role: ["operator"],
    },
    component: worker_types,
  },
  {
    path: "/supply_history",
    name: "supply_history",
    meta: {
      requiresAuth: true,
      title: "Таминот тарихи",
      icon: "fa-solid fa-clock-rotate-left",
      role: ["taminotchi"],
    },
    component: supply_history,
  },
  {
    path: "/supply_request",
    name: "supply_request",
    meta: {
      requiresAuth: true,
      title: "Ҳисоб рақамидан пул тўлаш",
      icon: "fa-solid fa-box",
      role: ["bugalter"],
    },
    component: supply_request,
  },
  {
    path: "/supply_accept",
    name: "supply_accept",
    meta: {
      requiresAuth: true,
      title: "Омбордаги материаллар",
      icon: "fa-solid fa-box",
      role: ["omborchi"],
    },
    component: supply_accept,
  },
  {
    path: "/transfered_products",
    name: "transfered_products",
    meta: {
      requiresAuth: true,
      title: "Ўтказилган материаллар тарихи",
      icon: "fa-solid fa-clock-rotate-left",
      role: ["omborchi"],
    },
    component: transfered_products,
  },
  {
    path: "/transfered_products_main_w",
    name: "transfered_products_main_w",
    meta: {
      requiresAuth: true,
      title: "Ўтказилган материаллар тарихи",
      icon: "fa-solid fa-clock-rotate-left",
      role: ["bazachi"],
    },
    component: transfered_products_main_w,
  },
  {
    path: "/building_products",
    name: "building_products",
    meta: {
      requiresAuth: true,
      title: "Объект материаллари",
      icon: "fa-solid fa-box",
      role: ["pto"],
    },
    component: building_products,
  },
  {
    path: "/building_works",
    name: "building_works",
    meta: {
      requiresAuth: true,
      title: "Объект ишлари",
      icon: "fa-solid fa-clipboard-list",
      role: ["pto"],
    },
    component: building_works,
  },
  {
    path: "/work_info",
    name: "work_info",
    meta: {
      requiresAuth: true,
      title: "Бажарилган иш маълумотлари",
      icon: "fa-solid fa-clipboard-list",
      role: ["pto"],
    },
    component: work_info,
  },
  {
    path: "/main_warehouse_product",
    name: "main_warehouse_product",
    meta: {
      requiresAuth: true,
      title: "База материаллари",
      icon: "fa-solid fa-box",
      role: ["bazachi", "admin"],
    },
    component: main_warehouse_product,
  },
  {
    path: "/fixed_expense_history",
    name: "fixed_expense_history",
    meta: {
      requiresAuth: true,
      title: "Чиқим тарихи",
      icon: "fa-solid fa-clock-rotate-left",
      role: ["admin"],
    },
    component: fixed_expense_history,
  },
];

routes = routes.filter((item) => {
  if (item.meta.role) {
    return item.meta.role.find((roleItem) => {
      return roleItem == role;
    });
    // return item.meta.role == role;
  } else {
    return item;
  }
});

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem("access_token") !== null;

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!loggedIn) {
      next("/");
    }
  }
  next();
});

export default router;
