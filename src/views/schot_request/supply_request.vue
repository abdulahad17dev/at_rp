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
                    hour: "numeric",
                    minute: "numeric",
                    hour12: false,
                  })
                  .slice(0, 16)
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
                  @change="valid($event, item)"
                />
                <span class="input-group-text bg-white">сўм</span>
              </div>
              <span v-else>{{ item.Supplies_by_bank_account.price }} сўм</span>
            </td>
            <td>
              <button
                class="btn btn-sm btn-primary"
                v-if="
                  item.Supplies_by_bank_account.paid_status == false &&
                  !checked.length
                "
                @click="pay(item)"
                id="pay_supply_d"
                :luboy="'button' + item.Supplies_by_bank_account.id"
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
          @click="pay(item)"
          id="pay_supply_d"
          :disabled="disabled"
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
</template>

<script>
import Header_item from "@/components/header/header_item.vue";
import { shot_request } from "@/utils/request/request";
import { catchError } from "@/utils/request/handle_api_err";
import Data_notfound from "@/utils/notfound/data_notfound.vue";
export default {
  name: "SupplyRequest",
  data() {
    return {
      requests: [],
      pages: null,
      market_id: 27,
      status: "",
      paid_status: "false",
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
    };
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
    valid(e, item) {
      if (e.target.value <= 0) {
        document
          .querySelector(`[luboy="input${item.Supplies.id}"]`)
          .classList.add("error");

        document.querySelector(`[luboy="button${item.Supplies.id}"]`)
          ? document
              .querySelector(`[luboy="button${item.Supplies.id}"]`)
              .setAttribute("disabled", "true")
          : false;

        this.disabled = true;
      } else {
        document
          .querySelector(`[luboy="input${item.Supplies.id}"]`)
          .classList.remove("error");

        document.querySelector(`[luboy="button${item.Supplies.id}"]`)
          ? document
              .querySelector(`[luboy="button${item.Supplies.id}"]`)
              .removeAttribute("disabled")
          : false;

        this.disabled = false;
      }
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
