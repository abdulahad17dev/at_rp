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
        <a href="#" class="card wallet">
          <div class="overlay mt-4"></div>
          <div class="circle mt-4 mb-3">
            <i :class="item.icon"></i>
          </div>
          <strong class="str mb-4 text-center" id="title">{{
            item.title
          }}</strong>
        </a>
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
          icon: "fa-solid fa-warehouse fa-2x",
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
          title: "Тақсимланиши керак бўлган материаллар",
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
          title: "Ҳисоб рақамидан пул тўлаш",
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
  mounted() {
    let title = document.querySelectorAll("#title");
    title.forEach((element) => {
      let item = element.innerHTML;
      if (item.length > 25) {
        element.style.fontSize = "14px";
      } else {
        element.style.fontSize = "17px";
      }
    });
  },
  components: { Header_item },
};
</script>

<style lang="scss">
.card-body {
  color: #2c3e50;
}

.wallet {
  --bg-color: #2c3e50;
  --bg-color-light: #4e667f;
  --text-color-hover: #fff;
  --box-shadow-color: rgb(79, 102, 127, 0.48);
}

.card.wallet {
  min-height: 189.5px;
}

.card.wallet {
  background: #fff;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  box-shadow: 0 14px 26px rgba(0, 0, 0, 0.04);
  transition: all 0.3s ease-out;
  text-decoration: none;
  color: #fff;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.11), 0 2px 8px var(--box-shadow-color);
}

.card.wallet strong {
  color: #2c3e50;
}

.card.wallet:hover {
  transform: translateY(-5px) scale(1.005) translateZ(0);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.11), 0 4px 12px var(--box-shadow-color);
}

.card.wallet:hover .overlay {
  transform: scale(8) translateZ(0);
}

.card.wallet:hover .circle {
  border-color: var(--bg-color-light);
  background: var(--bg-color);
}

.card.wallet:hover .circle:after {
  background: var(--bg-color-light);
}

.card.wallet:hover .str {
  color: var(--text-color-hover);
}

.card.wallet:active {
  transform: scale(1) translateZ(0);
  box-shadow: 0 15px 24px rgba(0, 0, 0, 0.11),
    0 15px 24px var(--box-shadow-color);
}

.card.wallet .str {
  font-size: 17px;
  color: #4c5656;
  z-index: 1000;
  transition: color 0.3s ease-out;
}

.circle {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: #fff;
  border: 2px solid var(--bg-color);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 1;
  transition: all 0.3s ease-out;
}

.circle:after {
  content: "";
  width: 85px;
  height: 85px;
  display: block;
  position: absolute;
  background: var(--bg-color);
  border-radius: 50%;
  // top: 5px;
  // left: 5px;
  transition: opacity 0.3s ease-out;
}

.circle svg {
  z-index: 10000;
  transform: translateZ(0);
}

.overlay {
  width: 87px;
  position: absolute;
  height: 87px;
  border-radius: 50%;
  background: var(--bg-color);
  justify-content: center;
  top: 10px;
  z-index: 0;
  transition: transform 0.4s ease-out;
}
</style>
