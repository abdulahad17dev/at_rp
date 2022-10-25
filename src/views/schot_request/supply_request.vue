<template>
  <Header_item />
  <div class="request">
    <form @submit.prevent="time">
      <div class="row">
        <div class="col">
          <input
            type="date"
            class="form-control form-control-sm"
            v-model="from_time"
            required
          />
        </div>
        <div class="col">
          <input
            type="date"
            class="form-control form-control-sm"
            v-model="to_time"
            required
          />
        </div>
        <div class="col">
          <div class="btn-group w-100">
            <button
              class="btn btn-outline-primary btn-sm w-80"
              :disabled="from_time == '' || to_time == ''"
            >
              <i class="fa-solid fa-search"></i>
            </button>
            <button
              class="btn btn-outline-danger btn-sm w-20"
              @click="reset"
              v-if="from_time && to_time"
            >
              <i class="fa-solid fa-circle-xmark"></i>
            </button>
          </div>
        </div>
      </div>
      <div class="row my-1">
        <div class="col">
          <select class="form-select form-select-sm" v-model="type">
            <option value="proche">проче</option>
            <option value="smeta">смета</option>
            <option value="tarkib">таркиб</option>
          </select>
        </div>
        <div class="col">
          <select class="form-select form-select-sm" v-model="paid_status">
            <option value="">барчаси</option>
            <option value="true">тўланди</option>
            <option value="false">тўланмади</option>
          </select>
        </div>
        <div class="col">
          <select class="form-select form-select-sm" v-model="status">
            <option value="">барчаси</option>
            <option value="true">қабул қилинди</option>
            <option value="false">қабул қилинмади</option>
          </select>
        </div>
      </div>
    </form>
    <div class="table-responsive mt-3">
      <table class="table table-sm table-hover">
        <thead class="">
          <tr>
            <th style="width: 10%">
              <input
                class="form-check-input"
                type="checkbox"
                v-model="checkAll"
                v-if="paid_status == 'false' && requests.length"
              />
              №
            </th>
            <th style="width: 15%">Махсулот</th>
            <th style="width: 15%">Ҳажм</th>
            <th style="width: 15%">Ўлчов бирлиги</th>
            <th style="width: 15%">Сана</th>
            <th style="width: 15%">Сумма</th>
            <th style="width: 8%"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, inc) in requests || []" :key="item">
            <td>
              <input
                class="form-check-input"
                type="checkbox"
                :value="item"
                v-model="checked"
                v-if="paid_status == 'false'"
              />
              {{ inc + 1 }}
            </td>
            <td>{{ item.product }}</td>
            <td>
              {{
                new Intl.NumberFormat().format(
                  item.Supplies_by_bank_account.quantity
                )
              }}
            </td>
            <td>{{ item.Supplies_by_bank_account.olchov_birligi }}</td>
            <td>
              {{
                new Date(item.Supplies_by_bank_account.time)
                  .toLocaleDateString("en-us", {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                  })
                  .slice(0, 10)
              }}
            </td>
            <td>
              <div
                class="input-group input-group-sm"
                v-if="item.Supplies_by_bank_account.paid_status == false"
                :luboy="'input' + item.Supplies_by_bank_account.id"
              >
                <input
                  type="number"
                  step="any"
                  class="form-control"
                  v-model="item.total_price"
                  @change="valid($event, item.Supplies_by_bank_account)"
                />
                <span class="input-group-text bg-white">сўм</span>
              </div>
              <span v-else
                >{{ item.Supplies_by_bank_account.total_price }} сўм</span
              >
            </td>
            <td>
              <button
                class="btn btn-sm btn-primary"
                v-if="
                  item.Supplies_by_bank_account.paid_status == false &&
                  !checked.length
                "
                @click="get_item(item)"
                id="pay_supply_d"
                :luboy="'button' + item.Supplies_by_bank_account.id"
                data-bs-toggle="modal"
                data-bs-target="#pay_by_b_a"
              >
                <i class="fa-solid fa-money-bill-transfer"></i>
              </button>
              <button
                class="btn btn-sm btn-danger mx-1"
                v-if="
                  item.Supplies_by_bank_account.status == false &&
                  !checked.length
                "
                @click="remove(item.Supplies_by_bank_account.id)"
                id="remove_supply"
              >
                <i class="fa-solid fa-circle-xmark"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <Data_notfound v-if="requests == ''" />
    </div>

    <div class="row mt-2" v-if="checked.length">
      <div class="col-12">
        <button
          class="btn btn-sm btn-outline-success w-100"
          @click="get_item(item)"
          id="pay_supply_d"
          :disabled="disabled"
          data-bs-toggle="modal"
          data-bs-target="#pay_by_b_a"
        >
          <i class="fa-solid fa-circle-check"></i> тўлаш
        </button>
      </div>
    </div>

    <nav
      aria-label="Page navigation example"
      class="mt-2"
      v-if="requests != ''"
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
          <button
            type="button"
            class="page-link"
            @click="
              get_supply(
                market_id,
                status,
                paid_status,
                building_id,
                type,
                from_time,
                to_time,
                page,
                limit
              )
            "
          >
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
  </div>

  <!-- Modal -->
  <div
    class="modal fade"
    id="pay_by_b_a"
    tabindex="-1"
    aria-labelledby="pay_by_b_aLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="pay_by_b_aLabel">Пул тўлаш</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            id="pay_bank_close"
          ></button>
        </div>
        <form @submit.prevent="pay">
          <div class="modal-body">
            <div class="row gap-2">
              <div class="col-10 mx-auto">
                <label for="from">Банк ҳисоб: </label>
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
                          @click="
                            select(
                              item.Bank_accounts.id,
                              item.Bank_accounts.name
                            )
                          "
                        >
                          <a class="dropdown-item">{{
                            item.Bank_accounts.name
                          }}</a>
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
                        <ul
                          class="pagination pagination-sm justify-content-end"
                        >
                          <li class="page-item">
                            <button
                              type="button"
                              class="page-link"
                              @click="
                                bank_accounts_get(
                                  page_account,
                                  limit_account,
                                  search_account
                                )
                              "
                            >
                              <i class="fa-solid fa-rotate"></i>
                            </button>
                          </li>
                          <li class="page-item">
                            <button
                              type="button"
                              class="page-link"
                              @click="page_account--"
                              :disabled="page_account == 0"
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
                              {{ page_account + 1 }}
                            </button>
                          </li>
                          <li class="page-item">
                            <button
                              type="button"
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
                <label for="comment">Изох: </label>
                <textarea
                  id="comment"
                  class="form-control form-control-sm"
                  v-model="body.comment"
                ></textarea>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="submit"
              class="btn btn-outline-primary btn-sm"
              id="pay_bank_account_d"
              :disabled="!body.from_ || !body.comment"
            >
              <i class="fa-solid fa-circle-check"></i>
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
import Header_item from "@/components/header/header_item.vue";
import {
  bank_account_get,
  pay_for_supply_by_b_a,
  remove_supply_by_b_a,
  shot_request,
} from "@/utils/request/request";
import { catchError, success } from "@/utils/request/handle_api_err";
import Data_notfound from "@/utils/notfound/data_notfound.vue";
export default {
  name: "SupplyRequest",
  data() {
    return {
      requests: [],
      pages: null,
      market_id: 0,
      status: "",
      paid_status: "",
      building_id: 0,
      type: "proche",
      from_time: "",
      to_time: "",
      page: 0,
      limit: 25,
      checked: [],
      total_price: null,
      body: {
        money: null,
        from_: null,
        to_: this.$route.query.id,
        for_: null,
        comment: "",
      },
      disabled: false,
      page_account: 0,
      pages_account: null,
      limit_account: 25,
      search_account: "",
      text_account: "ҳисоб рақамлар",
      bank_accounts: [],
    };
  },
  watch: {
    type(e) {
      this.page = 0;
      this.get_supply(
        this.market_id,
        this.status,
        this.paid_status,
        this.building_id,
        e,
        this.from_time,
        this.to_time,
        this.page,
        this.limit
      );
    },
    status(e) {
      this.paid_status = "";
      this.page = 0;
      this.get_supply(
        this.market_id,
        e,
        this.paid_status,
        this.building_id,
        this.type,
        this.from_time,
        this.to_time,
        this.page,
        this.limit
      );
    },
    paid_status(e) {
      this.status = "";
      this.page = 0;
      this.get_supply(
        this.market_id,
        this.status,
        e,
        this.building_id,
        this.type,
        this.from_time,
        this.to_time,
        this.page,
        this.limit
      );
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
      this.page_account = 0;
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
    get_supply(
      market_id,
      status,
      paid_status,
      building_id,
      type,
      from_time,
      to_time,
      page,
      limit
    ) {
      this.$store.dispatch("setLoading", { isLoading: true });
      shot_request(
        market_id,
        status,
        paid_status,
        building_id,
        type,
        from_time,
        to_time,
        page,
        limit
      )
        .then((res) => {
          res.data.data.forEach((element) => {
            if (element.Supplies_by_bank_account.paid_status == false) {
              let num =
                element.Supplies_by_bank_account.total_price -
                element.sum_paid_money;
              element.total_price = num;
            }
          });

          this.requests = res.data.data;
          this.pages = res.data.pages;
          this.$store.dispatch("setLoading", { isLoading: false });
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
        });
    },
    time() {
      this.get_supply(
        this.market_id,
        this.status,
        this.paid_status,
        this.building_id,
        this.type,
        this.from_time,
        this.to_time,
        this.page,
        this.limit
      );
      this.page = 0;
    },
    reset() {
      this.from_time = "";
      this.to_time = "";
      this.get_supply(
        this.market_id,
        this.status,
        this.paid_status,
        this.building_id,
        this.type,
        this.from_time,
        this.to_time,
        this.page,
        this.limit
      );
      this.page = 0;
    },
    get_item(e) {
      this.text_account = "ҳисоб рақамлар";
      this.body = {
        money: null,
        from_: null,
        to_: null,
        for_: null,
        comment: "",
      };

      if (this.checked.length) {
        var total_price = 0;
        this.checked.forEach((element) => {
          total_price += element.Supplies_by_bank_account.price;
        });
        this.total_price = total_price;
      } else {
        this.body.for_ = e.Supplies_by_bank_account.id;
        this.body.money = e.total_price;
        this.body.to_ = e.Supplies_by_bank_account.market_id;
      }
    },
    pay() {
      let array = [];
      var arr = this.checked.map((el) => ({
        money: el.total_price,
        from_: this.body.from_,
        to_: el.Supplies_by_bank_account.market_id,
        for_: el.Supplies_by_bank_account.id,
        comment: this.body.comment,
      }));

      array = arr;

      document.getElementById("pay_bank_account_d").disabled = true;
      this.$store.dispatch("setLoading", { isLoading: true });
      pay_for_supply_by_b_a(this.checked.length ? array : Array(this.body))
        .then((res) => {
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("pay_bank_close").click();
          document.getElementById("pay_bank_account_d").disabled = false;
          success(res).then(() => {
            this.get_supply(
              this.market_id,
              this.status,
              this.paid_status,
              this.building_id,
              this.type,
              this.from_time,
              this.to_time,
              this.page,
              this.limit
            );

            this.body = {
              money: null,
              from_: null,
              to_: null,
              for_: null,
              comment: "",
            };
            this.checked = [];
            this.text_account = "ҳисоб рақамлар";
          });
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("pay_bank_account_d").disabled = false;
        });
    },
    valid(e, item) {
      if (e.target.value <= 0) {
        document
          .querySelector(`[luboy="input${item.id}"]`)
          .classList.add("error");

        document.querySelector(`[luboy="button${item.id}"]`)
          ? document
              .querySelector(`[luboy="button${item.id}"]`)
              .setAttribute("disabled", "true")
          : false;

        this.disabled = true;
      } else {
        document
          .querySelector(`[luboy="input${item.id}"]`)
          .classList.remove("error");

        document.querySelector(`[luboy="button${item.id}"]`)
          ? document
              .querySelector(`[luboy="button${item.id}"]`)
              .removeAttribute("disabled")
          : false;

        this.disabled = false;
      }
    },
    remove(e) {
      document.getElementById("remove_supply").disabled = true;
      this.$store.dispatch("setLoading", { isLoading: true });
      remove_supply_by_b_a(e)
        .then((res) => {
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("remove_supply").disabled = false;
          success(res).then(() => {
            this.get_supply(
              this.market_id,
              this.status,
              this.paid_status,
              this.building_id,
              this.type,
              this.from_time,
              this.to_time,
              this.page,
              this.limit
            );
          });
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("remove_supply").disabled = false;
        });
    },
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
      this.body.from_ = id;
      this.text_account = name;
      document.getElementById("bank_account_text").click();
    },
  },
  created() {
    this.get_supply(
      this.market_id,
      this.status,
      this.paid_status,
      this.building_id,
      this.type,
      this.from_time,
      this.to_time,
      this.page,
      this.limit
    );
  },
  computed: {
    checkAll: {
      get: function () {
        return this.requests
          ? this.checked.length == this.requests.length
          : false;
      },
      set: function (value) {
        var checked = [];
        if (value) {
          this.requests.forEach(function (requests) {
            checked.push(requests);
          });
        }
        this.checked = checked;
      },
    },
  },
  components: { Header_item, Data_notfound },
};
</script>

<style lang="scss" scoped>
.request {
  zoom: 75%;
}
.table-responsive {
  max-height: 90vh;
  min-height: 90vh;
}
@media (max-width: 500px) {
  .table-responsive {
    max-height: 133vh;
    min-height: 133vh;
  }
}
table {
  min-width: 1150px;
  width: 100%;
}

.error {
  border: 1px solid red;
  border-radius: 0.2rem;
}
.error input {
  border-right: 1px solid red;
  border-radius: 0.2rem;
}
</style>
