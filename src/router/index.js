import { createRouter, createWebHistory } from "vue-router";
import login from "./../utils/template/login/Login.vue";
import users from "../views/users/users.vue";
import building from "../views/buildings/buildings.vue";
import product from "../views/product/product.vue";
import smeta from "../views/smeta/smeta.vue";
import bank_acoounts from "../views/bank_accounts/bank_accounts.vue";
import transfers_history from "../views/transfer_history/transfer_history.vue";
import expences from "../views/expences/expences.vue";
import menu from "./../utils/main/menu.vue";
import notfound from "./../utils/notfound/notfound.vue";
import settings from "../views/settings/settings.vue";

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
      icon: "fas fa-home",
    },
    component: menu,
  },
  // settings
  {
    path: "/settings",
    name: "settings",
    meta: {
      requiresAuth: true,
      title: "Созламалар",
      icon: "fa-solid fa-screwdriver-wrench",
    },
    component: settings,
  },
  // buildings
  {
    path: "/buildings",
    name: "buildings",
    meta: {
      requiresAuth: true,
      title: "Обйектлар",
      icon: "fa-solid fa-building",
      role: ["pto", "admin", "prorap"],
    },
    component: building,
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
      role: ["bugalter"],
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
      role: ["bugalter"],
    },
    component: transfers_history,
  },
  // expences
  {
    path: "/expenses",
    name: "expences",
    meta: {
      requiresAuth: true,
      title: "Чиқимлар",
      icon: "fa-solid fa-box",
      role: ["bugalter"],
    },
    component: expences,
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
