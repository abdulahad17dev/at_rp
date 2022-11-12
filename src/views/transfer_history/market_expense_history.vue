<template>
  <div class="table-responsive">
    <table class="table table-sm table-hover">
      <thead>
        <tr>
          <th style="width: 10%">Т/р</th>
          <th style="width: 10%">Сумма</th>
          <th style="width: 10%">Сана</th>
          <th style="width: 20%">Ходим</th>
          <th style="width: 20%">Маҳсулот сотувчи корхона</th>
          <th style="width: 20%">Материал</th>
          <th>
            <select class="form-select form-select-sm" v-model="type">
              <option value="market_expense_shot">
                ҳисоб рақамидан олинган таминот
              </option>
              <option value="market_expense_shot_supply">
                қарзга олинган таминот
              </option>
            </select>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, inc) in paid_moneys" :key="item">
          <td>{{ inc + 1 }}</td>
          <td>
            <Format_numbers :number="item.Expenses.money" />
            сўм
          </td>
          <td>
            {{
              new Date(item.Expenses.time)
                .toLocaleDateString({
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                })
                .slice(0, 10)
            }}
          </td>
          <td>{{ item.user }}</td>
          <td>
            {{ item.Markets.name }}(<a
              class="text-decoration-none text-dark"
              :href="`tel:+998${item.Markets.phone}`"
            >
              +998 {{ item.Markets.phone }} </a
            >)
          </td>
          <td>
            {{
              item.Expenses.type == "market_expense_shot"
                ? item.Supplies_by_bank_account?.type == "tarkib"
                  ? item.supply_by_b_a_product +
                    ":" +
                    item.Supplies_by_bank_account?.product_composition
                  : item.supply_by_b_a_product
                : item.Supplies?.type == "qarz_tarkib"
                ? item.supply_product + ":" + item.Supplies?.product_composition
                : item.supply_product
            }}
          </td>
          <td></td>
        </tr>
      </tbody>
      <tfoot v-if="total_price > 0">
        <tr>
          <td colspan="7" class="text-center">
            <b> Жами сумма: <Format_numbers :number="total_price" /> сўм </b>
          </td>
        </tr>
      </tfoot>
    </table>
    <Data_notfound v-if="!paid_moneys.length" />
  </div>

  <nav
    aria-label="Page navigation example"
    class="mt-2"
    v-if="paid_moneys.length"
  >
    <ul class="pagination pagination-sm justify-content-end">
      <li class="page-item">
        <select
          class="form-control form-control-sm form-select mx-1"
          v-model="limit"
        >
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </li>
      <li class="page-item">
        <button type="button" class="page-link" @click="get_paid_moneys()">
          <i class="fa-solid fa-rotate"></i>
        </button>
      </li>
      <li class="page-item">
        <button class="page-link" @click="page = 0" :disabled="page == 0">
          <i class="fa-solid fa-angles-left text-dark"></i>
        </button>
      </li>
      <li class="page-item">
        <button class="page-link" @click="page--" :disabled="page == 0">
          <i class="fa-solid fa-angle-left text-dark"></i>
        </button>
      </li>
      <li class="page-item">
        <button class="page-link text-dark" disabled>
          {{ page + 1 }}
        </button>
      </li>
      <li class="page-item">
        <button class="page-link" @click="page++" :disabled="page == pages - 1">
          <i class="fa-solid fa-angle-right text-dark"></i>
        </button>
      </li>
      <li class="page-item">
        <button
          class="page-link"
          @click="page = pages - 1"
          :disabled="page == pages - 1"
        >
          <i class="fa-solid fa-angles-right text-dark"></i>
        </button>
      </li>
    </ul>
  </nav>
</template>

<script>
import { get_market_expenses } from "@/utils/request/request";
import { catchError } from "@/utils/request/handle_api_err";
import Data_notfound from "@/utils/notfound/data_notfound.vue";
import Format_numbers from "@/utils/format/format_numbers.vue";
export default {
  data() {
    return {
      to: 0,
      type: "market_expense_shot",
      pages: null,
      page: 0,
      limit: 25,
      paid_moneys: [],
      total_price: null,
    };
  },
  watch: {
    limit() {
      this.page = 0;
      this.get_paid_moneys();
    },
    type() {
      this.page = 0;
      this.get_paid_moneys();
    },
    to() {
      this.page = 0;
      this.get_paid_moneys();
    },
    page() {
      this.get_paid_moneys();
    },
  },
  methods: {
    get_paid_moneys() {
      this.$store.dispatch("setLoading", { isLoading: true });
      get_market_expenses(
        this.$route.query.id,
        0,
        this.to,
        0,
        this.type,
        this.page,
        this.limit
      )
        .then((res) => {
          this.total_price = null;
          res.data.data.forEach((element) => {
            this.total_price += element.Expenses.money;
          });
          this.pages = res.data.pages;
          this.paid_moneys = res.data.data;
          this.$store.dispatch("setLoading", { isLoading: false });
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
        });
    },
  },
  created() {
    this.get_paid_moneys();
  },
  components: { Data_notfound, Format_numbers },
};
</script>

<style lang="scss" scoped>
.table-responsive {
  max-height: 450px;
}

@media (max-width: 480px) {
  .table-responsive {
    max-height: 550px;
  }
}

table {
  width: 100%;
  min-width: 900px;
}
</style>
