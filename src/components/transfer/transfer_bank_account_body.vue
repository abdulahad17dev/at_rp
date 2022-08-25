<template>
  <form @submit.prevent="$emit('transfer_to', to)">
    <div class="modal-body">
      <div class="row gap-2">
        <div class="col-10 mx-auto">
          <label for="balance">
            Сумма:
            <span class="text-primary"
              >{{ new Intl.NumberFormat().format(to.money) }} сўм
            </span></label
          >
          <div class="input-group input-group-sm">
            <input
              id="balance"
              type="number"
              step="any"
              class="form-control"
              v-model="to.money"
              required
              min="1"
            />
            <span class="input-group-text bg-white">сўм</span>
          </div>
        </div>
        <div class="col-10 mx-auto">
          <label>Ҳисоблар</label>
          <div class="dropdown">
            <button
              class="btn btn-light btn-sm dropdown-toggle"
              type="button"
              id="bank_account_text"
              data-bs-toggle="dropdown"
              data-bs-auto-close="outside"
              aria-expanded="false"
              @click="
                bank_accounts.length
                  ? ''
                  : bank_accounts_get(
                      page_account,
                      limit_account,
                      search_account
                    )
              "
            >
              {{ text_account }}
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
                  v-model="search_account"
                />
              </li>
              <li>
                <ul class="dropdown-items">
                  <li
                    v-for="item in bank_accounts"
                    :key="item"
                    @click="select(item.id, item.name)"
                  >
                    <a class="dropdown-item">{{ item.name }}</a>
                  </li>
                </ul>
              </li>
              <li v-if="bank_accounts != ''">
                <hr class="dropdown-divider m-0" />
              </li>
              <li>
                <nav
                  aria-label="Page navigation example"
                  class="mt-2"
                  v-if="bank_accounts != ''"
                >
                  <ul class="pagination pagination-sm justify-content-end">
                    <li class="page-item">
                      <button
                        class="page-link"
                        @click="page_account--"
                        :disabled="page_account == 0"
                      >
                        <i class="fa-solid fa-angle-left text-dark"></i>
                      </button>
                    </li>
                    <li class="page-item">
                      <button class="page-link text-dark" disabled>
                        {{ page_account + 1 }}
                      </button>
                    </li>
                    <li class="page-item">
                      <button
                        class="page-link"
                        @click="page_account++"
                        :disabled="page_account == pages_account - 1"
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
          <label for="comment"> Изох: </label>
          <textarea
            id="comment"
            class="form-control"
            v-model="to.comment"
            required
          ></textarea>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button
        type="submit"
        class="btn btn-outline-primary btn-sm"
        id="transfer_to_disabled"
        :disabled="!to.money || !to.from_ || !to.comment"
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
</template>

<script>
import { bank_account_get } from "@/utils/request/request";
import { catchError } from "@/utils/request/handle_api_err";
export default {
  name: "TransferBankAccountBody",
  props: ["id"],
  data() {
    return {
      to: {
        money: null,
        from_: null,
        to_: null,
        comment: "",
      },
      page_account: 0,
      pages_account: null,
      limit_account: 25,
      search_account: "",
      bank_accounts: [],
      text_account: "ҳисоб рақамлар",
    };
  },
  watch: {
    id(e) {
      this.to.from_ = e;
    },
    limit_account(e) {
      this.page_account = 0;
      this.bank_accounts_get(this.page_account, e, this.search_account);
    },
    page_account(e) {
      this.bank_accounts_get(e, this.limit_account, this.search_account);
      document.getElementById("scroll").scrollTop = 0;
    },
    search_account(e) {
      if (e.length > 0) {
        this.bank_accounts_get(
          this.page_account,
          this.limit_account,
          this.search_account
        );
      } else if (e.length == 0) {
        this.bank_accounts_get(
          this.page_account,
          this.limit_account,
          this.search_account
        );
        this.page_account = 0;
      }
    },
  },
  methods: {
    bank_accounts_get(page_account, limit_account, search_account) {
      this.$store.dispatch("setLoading", { isLoading: true });

      bank_account_get(page_account, limit_account, search_account)
        .then((res) => {
          this.bank_accounts = res.data.data;
          this.pages_account = res.data.pages;
          this.$store.dispatch("setLoading", { isLoading: false });
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
        });
    },
    select(id, name) {
      this.to.to_ = id;
      this.text_account = name;
      document.getElementById("bank_account_text").click();
    },
  },
};
</script>

<!-- <style lang="scss" scoped>
</style> -->
