<template>
  <form @submit.prevent="$emit('transfer_to_cashier', cashier)">
    <div class="modal-body">
      <div class="row gap-2">
        <div class="col-10 mx-auto">
          <label for="balance3">
            Сумма:
            <span class="text-primary"
              >{{ new Intl.NumberFormat().format(cashier.money) }} сўм</span
            ></label
          >
          <div class="input-group input-group-sm">
            <input
              id="balance3"
              type="number"
              step="any"
              class="form-control"
              v-model="cashier.money"
              required
              min="0"
            />
            <span class="input-group-text bg-white">сўм</span>
          </div>
        </div>
        <div class="col-10 mx-auto">
          <label for="to2"> Кассирлар: </label>
          <div class="dropdown">
            <button
              class="btn btn-light btn-sm dropdown-toggle"
              type="button"
              id="cashier_text"
              data-mdb-toggle="dropdown"
              data-bs-auto-close="outside"
              aria-expanded="false"
              @click="
                cashiers.length ? '' : get_cashier(page, limit, search, role)
              "
            >
              {{ text }}
            </button>
            <ul
              class="dropdown-menu border-top-0"
              aria-labelledby="bank_account"
            >
              <li>
                <input
                  type="search"
                  class="form-control form-control-sm"
                  placeholder="қидириш ..."
                  v-model="search"
                />
              </li>
              <li>
                <ul class="dropdown-items">
                  <li
                    v-for="item in cashiers"
                    :key="item"
                    @click="select(item.id, item.name)"
                  >
                    <a class="dropdown-item">{{ item.name }}</a>
                  </li>
                </ul>
              </li>
              <li v-if="cashiers != ''">
                <hr class="dropdown-divider m-0" />
              </li>
              <li>
                <nav
                  aria-label="Page navigation example"
                  class="mt-2"
                  v-if="cashiers != ''"
                >
                  <ul class="pagination pagination-sm justify-content-end">
                    <li class="page-item">
                      <button
                        type="button"
                        class="page-link"
                        @click="get_cashier(page, limit, search, role)"
                      >
                        <i class="fa-solid fa-rotate"></i>
                      </button>
                    </li>
                    <li class="page-item">
                      <button
                        type="button"
                        class="page-link"
                        @click="page--"
                        :disabled="page == 0"
                      >
                        <i class="fa-solid fa-angle-left text-dark"></i>
                      </button>
                    </li>
                    <li class="page-item">
                      <button
                        type="button"
                        class="page-link text-dark"
                        disabled
                      >
                        {{ page + 1 }}
                      </button>
                    </li>
                    <li class="page-item">
                      <button
                        type="button"
                        class="page-link"
                        @click="page++"
                        :disabled="page == pages"
                      >
                        <i class="fa-solid fa-angle-right text-dark"></i>
                      </button>
                    </li>
                  </ul>
                </nav>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-10 mx-auto">
          <label for="comment7"> Изох: </label>
          <textarea
            id="comment7"
            class="form-control"
            v-model="cashier.comment"
            required
          ></textarea>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button
        type="submit"
        class="btn btn-outline-primary btn-sm"
        id="transfer_to_cashier"
        :disabled="!cashier.money || !cashier.comment || !cashier.to_"
      >
        <i class="fa-solid fa-circle-check"></i>
      </button>
      <button
        type="button"
        class="btn btn-outline-danger btn-sm"
        data-mdb-dismiss="modal"
      >
        <i class="fa-solid fa-circle-xmark"></i>
      </button>
    </div>
  </form>
</template>

<script>
import { user_get } from "@/utils/request/request";
import { catchError } from "@/utils/request/handle_api_err";
export default {
  name: "TransferCashierBody",
  props: ["id"],
  data() {
    return {
      cashier: {
        money: null,
        from_: null,
        to_: null,
        comment: "",
      },
      limit: 25,
      page: 0,
      pages: null,
      search: "",
      cashiers: [],
      role: "kassir",
      text: "кассирлар",
    };
  },
  watch: {
    id(e) {
      this.cashier.from_ = e;
    },
    limit(e) {
      this.page = 0;
      this.get_cashier(this.page, e, this.search, this.role);
    },
    page(e) {
      this.get_cashier(e, this.limit, this.search, this.role);
    },
    search(e) {
      this.page = 0;
      if (e.length > 0) {
        this.get_cashier(this.page, this.limit, this.search, this.role);
      } else if (e.length == 0) {
        this.get_cashier(this.page, this.limit, this.search, this.role);
        this.page = 0;
      }
    },
  },
  methods: {
    get_cashier(page, limit, search, role) {
      this.$store.dispatch("setLoading", { isLoading: true });
      user_get(page, limit, search, role)
        .then((res) => {
          this.cashiers = res.data.data;
          this.pages = res.data.pages;
          this.$store.dispatch("setLoading", { isLoading: false });
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
        });
    },
    select(id, name) {
      this.cashier.to_ = id;
      this.text = name;
      document.getElementById("cashier_text").click();
    },
  },
};
</script>

<!-- <style lang="scss" scoped>
</style> -->
