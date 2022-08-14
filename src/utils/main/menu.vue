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
          title: "Обйектлар",
          role: ["pto", "admin", "prorap"],
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
          to: "/expences",
          icon: "fa-solid fa-box fa-2x",
          title: "Чиқимлар",
          role: ["bugalter"],
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
