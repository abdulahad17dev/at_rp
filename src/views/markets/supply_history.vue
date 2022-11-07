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
          <div class="btn-group w-100">
            <button
              class="btn btn-light btn-sm dropdown-toggle"
              type="button"
              id="dropdownMenuClickableInside"
              data-bs-toggle="dropdown"
              data-bs-auto-close="outside"
              aria-expanded="false"
            >
              {{ status_text }}
            </button>
            <ul
              class="dropdown-menu"
              aria-labelledby="dropdownMenuClickableInside"
            >
              <li v-for="item in types" :key="item">
                <a
                  class="dropdown-item d-flex"
                  href="#"
                  @click="item.children ? '' : sort(item.type, item.title)"
                  ><p
                    @click="!item.children ? '' : sort(item.type, item.title)"
                    class="m-0"
                    style="width: 90%"
                  >
                    {{ item.title }}
                  </p>
                  <i
                    v-if="item.children"
                    class="fa-solid fa-angle-down text-right btn btn-sm"
                    data-bs-toggle="collapse"
                    :data-bs-target="`#collapse${item.type}`"
                    aria-expanded="false"
                    :aria-controls="`collapse${item.type}`"
                  ></i>
                </a>
                <div
                  class="collapse"
                  :id="`collapse${item.type}`"
                  v-if="item.children"
                >
                  <li
                    v-for="child in item.children"
                    :key="child"
                    @click="sort(child.type, item.title)"
                  >
                    <a href="#" class="dropdown-item ml-4">{{ child.title }}</a>
                  </li>
                </div>
              </li>
            </ul>
          </div>
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
              <Format_numbers :number="item.Supplies.quantity" />
            </td>
            <td>{{ item.Supplies.olchov_birligi }}</td>
            <td>
              {{
                new Date(item.Supplies.time)
                  .toLocaleDateString({
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
                v-if="item.Supplies.paid_status == false"
                :luboy="'input' + item.Supplies.id"
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
              <span class="d-flex" v-else>
                <Format_numbers :number="item.Supplies.price" />
                <span class="mx-1"> сўм </span>
              </span>
            </td>
            <td>
              <button
                class="btn btn-sm btn-primary"
                v-if="item.Supplies.paid_status == false && !checked.length"
                @click="pay(item)"
                id="pay_supply_d"
                :luboy="'button' + item.Supplies.id"
              >
                <i class="fa-solid fa-money-bill-transfer"></i>
              </button>
              <button
                class="btn btn-sm btn-danger mx-1"
                v-if="item.Supplies.status == false && !checked.length"
                @click="remove(item.Supplies.id)"
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
import {
  get_supplies,
  pay_for_supply,
  remove_supply,
} from "@/utils/request/request";
import { catchError, success } from "@/utils/request/handle_api_err";
import Data_notfound from "@/utils/notfound/data_notfound.vue";
import Header_item from "@/components/header/header_item.vue";
import Format_numbers from "@/utils/format/format_numbers.vue";
export default {
  name: "SupplyHistory",
  data() {
    return {
      requests: [],
      pages: null,
      market_id: this.$route.query.id,
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
        from_: 0,
        to_: this.$route.query.id,
        for_: null,
        comment: "",
      },
      disabled: false,
      types: [
        {
          type: "proche",
          title: "проче",
          children: [
            { type: "naxt_proche", title: "нахт проче" },
            { type: "qarz_proche", title: "қарз проче" },
            { type: "shot_proche", title: "счёт проче" },
          ],
        },
        {
          type: "smeta",
          title: "смета",
          children: [
            { type: "naxt_smeta", title: "нахт смета" },
            { type: "qarz_smeta", title: "қарз смета" },
            { type: "shot_smeta", title: "счёт смета" },
          ],
        },
        {
          type: "tarkib",
          title: "таркиб",
          children: [
            { type: "naxt_tarkib", title: "нахт таркиб" },
            { type: "qarz_tarkib", title: "қарз таркиб" },
            { type: "shot_tarkib", title: "счёт таркиб" },
          ],
        },
        { type: "naxt", title: "нахт " },
        { type: "qarz", title: "қарз" },
        { type: "shot", title: "счёт" },
      ],
      status_text: "статус",
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
      get_supplies(
        market_id,
        status,
        paid_status,
        building_id,
        type,
        from_time,
        to_time,
        page,
        limit,
        0,
        ""
      )
        .then((res) => {
          res.data.data.forEach((element) => {
            if (element.Supplies.paid_status == false) {
              let num =
                element.Supplies.quantity * element.Supplies.price -
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
    pay(e) {
      this.body = {
        money: null,
        from_: 0,
        to_: Number(this.$route.query.id),
        for_: null,
        comment: "",
      };

      if (this.checked.length) {
        var total_price = 0;
        this.checked.forEach((element) => {
          total_price += element.Supplies.price;
        });
        this.total_price = total_price;
      } else {
        this.body.for_ = e.Supplies.id;
        this.body.money = e.total_price;
      }

      let array = [];
      var arr = this.checked.map((el) => ({
        money: el.total_price,
        from_: 0,
        to_: this.$route.query.id,
        for_: el.Supplies.id,
        comment: "",
      }));

      array = arr;

      document.getElementById("pay_supply_d").disabled = true;
      this.$store.dispatch("setLoading", { isLoading: true });
      pay_for_supply(this.checked.length ? array : Array(this.body))
        .then((res) => {
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("pay_supply_d").disabled = false;
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
              from_: 0,
              to_: Number(this.$route.query.id),
              for_: null,
              comment: "",
            };
            this.checked = [];
          });
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
          document.getElementById("pay_supply_d").disabled = false;
        });
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
    remove(e) {
      document.getElementById("remove_supply").disabled = true;
      this.$store.dispatch("setLoading", { isLoading: true });
      remove_supply(e)
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
    sort(e, title) {
      this.status_text = title;
      this.type = e;
      document.getElementById("dropdownMenuClickableInside").click();
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
  components: { Data_notfound, Header_item, Format_numbers },
};
</script>

<style lang="scss" scoped>
.request {
  zoom: 75%;
}
.table-responsive {
  max-height: 92vh;
  min-height: 92vh;
}
@media (max-width: 500px) {
  .table-responsive {
    max-height: 130vh;
    min-height: 130vh;
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
