<template>
  <details class="my-2">
    <summary @click="variable_history_get(page, limit, from, user_id)">
      Бир марталик чиқим тарихи
    </summary>
    <div class="table-responsive">
      <table class="table table-sm table-hover">
        <thead>
          <tr>
            <th style="width: 5%">#ИД</th>
            <th style="width: 35%">Сумма</th>
            <th style="width: 20%">Сана</th>
            <th style="width: 30%">Изох</th>
            <th>
              <select
                class="form-control form-control-sm form-select mx-1"
                v-model="from"
              >
                <option value="0">барча хисоблар</option>
                <option :value="item.id" v-for="item in accounts" :key="item">
                  {{ item.name }}
                </option>
              </select>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in variable_history" :key="item">
            <td>{{ item.Expenses.id }}</td>
            <td>
              {{ new Intl.NumberFormat().format(item.Expenses.money) }} сўм
            </td>
            <td>{{ new Date(item.Expenses.time).toLocaleDateString() }}</td>
            <td>{{ item.Expenses.comment }}</td>
            <td>
              <b class="text-primary"> {{ item.name }}</b>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <Data_notfound v-if="variable_history == ''" />
    <nav
      aria-label="Page navigation example"
      class="mt-1"
      v-if="variable_history != ''"
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
          <button
            class="page-link"
            @click="page++"
            :disabled="page == pages - 1"
          >
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
  </details>

  <div
    class="modal fade"
    id="pay_for_variable_expense"
    tabindex="-1"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Бир марталик</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            id="pay_v"
          ></button>
        </div>
        <form @submit.prevent="pay_v_expense">
          <div class="modal-body">
            <div class="row gap-2">
              <div class="col-10 mx-auto">
                <label for="from">Банк ҳисоб: </label>
                <select
                  id="from"
                  class="form-control form-control-sm"
                  v-model="pay_body.from_"
                  required
                >
                  <option :value="item.id" v-for="item in accounts" :key="item">
                    {{ item.name }}
                  </option>
                </select>
              </div>
              <div class="col-10 mx-auto">
                <label for="summa"
                  >Сумма:
                  <span class="text-primary"
                    >{{
                      new Intl.NumberFormat().format(pay_body.money)
                    }}
                    сўм</span
                  ></label
                >
                <div class="input-group input-group-sm">
                  <input
                    type="number"
                    class="form-control"
                    id="summa"
                    v-model="pay_body.money"
                    required
                    min="1"
                  />
                  <span class="input-group-text bg-white">сўм</span>
                </div>
              </div>
              <div class="col-10 mx-auto">
                <label for="comment">Изох: </label>
                <textarea
                  id="comment"
                  class="form-control form-control-sm"
                  v-model="pay_body.comment"
                ></textarea>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="submit"
              class="btn btn-outline-primary btn-sm"
              id="pay_v_e_disabled"
            >
              <i class="fas fa-circle-check"></i>
            </button>
            <button
              type="button"
              class="btn btn-outline-danger btn-sm"
              data-bs-dismiss="modal"
            >
              <i class="fa-solid fa-circle-xmark"></i>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Data_notfound from "@/utils/notfound/data_notfound.vue";
import {
  get_variable_history,
  pay_for_variable_expense,
} from "@/utils/request/request";
import { catchError, success } from "@/utils/request/handle_api_err";
export default {
  name: "VariableItem",
  props: ["accounts"],
  data() {
    return {
      pay_body: {
        money: null,
        from_: null,
        to_: 0,
        comment: "",
      },
      limit: 25,
      page: 0,
      pages: null,
      variable_history: [],
      from: 0,
      user_id: 0,
    };
  },
  watch: {
    limit(e) {
      this.page = 0;
      this.variable_history_get(this.page, e, this.from, this.user_id);
    },
    page(e) {
      this.variable_history_get(e, this.limit, this.from, this.user_id);
      document.getElementById("scroll").scrollTop = 0;
    },
    from(e) {
      this.page = 0;
      this.variable_history_get(this.page, this.limit, e, this.user_id);
    },
  },
  methods: {
    pay_v_expense() {
      document.getElementById("pay_v_e_disabled").disabled = true;
      this.$store.dispatch("setLoading", { isLoading: true });
      pay_for_variable_expense(this.pay_body)
        .then((res) => {
          document.getElementById("pay_v").click();
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("pay_v_e_disabled").disabled = false;
          success(res).then(() => {
            this.variable_history_get(
              this.page,
              this.limit,
              this.from,
              this.user_id
            );
            this.pay_body.money = null;
            this.pay_body.from_ = null;
            this.pay_body.comment = "";
          });
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("pay_v_e_disabled").disabled = false;
        });
    },
    variable_history_get(page, limit, from, user_id) {
      this.$store.dispatch("setLoading", { isLoading: true });
      get_variable_history(page, limit, from, user_id)
        .then((res) => {
          this.variable_history = res.data.data;
          this.pages = res.data.pages;
          this.$store.dispatch("setLoading", { isLoading: false });
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
        });
    },
  },
  components: { Data_notfound },
};
</script>

<style lang="scss" scoped>
.page-item select {
  width: 80px;
  height: 30px;
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
}

th select {
  width: 170px;
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
}

.table-responsive {
  max-height: 400px;
}

table {
  width: 100%;
  min-width: 900px;
}
</style>
