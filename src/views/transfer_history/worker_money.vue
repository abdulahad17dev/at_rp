<template>
  <Header_item />
  <div v-if="foremans.length">
    <div class="content_tabs">
      <div class="item_tabs" v-for="item in foremans" :key="item">
        <button
          :class="
            building_id == item.id ? 'btn-primary' : 'btn-outline-primary '
          "
          class="btn btn-block btn-sm"
          @click="
            building_id = item.id;
            get_workers();
          "
        >
          {{ item.building }}
        </button>
      </div>
    </div>

    <div v-if="tab_content">
      <div class="table-responsive mt-3">
        <table class="table table-sm table-hover">
          <thead class="">
            <tr>
              <th style="width: 10%">№</th>
              <th style="width: 20%">Исм</th>
              <th style="width: 15%">Телефон рақам</th>
              <th style="width: 20%">Ихтисослик</th>
              <th style="width: 15%">Рейтинг</th>
              <th style="width: 10%">Баланс</th>
              <th style="width: 10%">Иш ҳаққи</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, inc) in workers" :key="item">
              <td>{{ inc + 1 }}</td>
              <td>{{ item.Workers.name }}</td>
              <td>
                <a
                  :href="`tel:+998${item.Workers.phone}`"
                  class="text-decoration-none text-dark"
                >
                  +998 {{ format_phone(item.Workers.phone) }}</a
                >
              </td>
              <td>
                <span
                  class="badge rounded-pill bg-danger mx-1"
                  v-for="worker_item in item.Workers.specialties"
                  :key="worker_item"
                >
                  {{ worker_item.specialty_type.specialty }}</span
                >
              </td>
              <td data-exclude="true">
                <label class="rating-label">
                  <input
                    class="rating"
                    max="5"
                    oninput="this.style.setProperty('--value', `${this.valueAsNumber}`)"
                    step="0.1"
                    :style="'--value:' + item.Workers.rating"
                    type="range"
                    disabled
                  />
                </label>
              </td>
              <td>
                {{ Intl.NumberFormat().format(item.Workers.balance) }} сўм
              </td>
              <td>{{ Intl.NumberFormat().format(item.work_balance) }} сўм</td>
            </tr>
          </tbody>
        </table>
      </div>

      <Data_notfound v-if="workers == ''" />

      <nav
        aria-label="Page navigation example"
        class="mt-2"
        v-if="workers != ''"
      >
        <ul class="pagination pagination-sm justify-content-end">
          <li class="page-item">
            <button
              type="button"
              class="page-link"
              @click="get_workers(page, limit, search)"
            >
              <i class="fa-solid fa-rotate"></i>
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
            <button class="page-link" @click="page++" :disabled="page == pages">
              <i class="fa-solid fa-angle-right text-dark"></i>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  </div>
  <div v-if="info">
    <h6 class="text-center text-danger">
      <b> Ушбу прорап хеч қайси обектга бириктирилмаган </b>
    </h6>
  </div>
</template>

<script>
import Header_item from "@/components/header/header_item.vue";
import { foreman_get, workers_get } from "@/utils/request/request";
import { catchError } from "@/utils/request/handle_api_err";
import Data_notfound from "@/utils/notfound/data_notfound.vue";

export default {
  name: "WorkerMoney",
  components: { Header_item, Data_notfound },
  data() {
    return {
      foremans: [],
      building_id: null,
      limit: 25,
      page: 0,
      pages: null,
      workers: [],
      info: false,
      tab_content: false,
    };
  },
  watch: {
    limit() {
      this.page = 0;
      this.get_workers();
    },
    page() {
      this.get_workers();
    },
  },
  methods: {
    get_foreman() {
      this.$store.dispatch("setLoading", { isLoading: true });
      foreman_get(0, this.$route.query.id)
        .then((res) => {
          if (res.data.length) {
            this.info = false;
          } else {
            this.info = true;
          }
          this.foremans = res.data;
          this.$store.dispatch("setLoading", { isLoading: false });
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
        });
    },
    get_workers() {
      this.tab_content = true;
      this.$store.dispatch("setLoading", { isLoading: true });

      workers_get(this.page, this.limit, "", this.building_id)
        .then((res) => {
          this.workers = res.data.data;
          this.pages = res.data.pages;
          this.$store.dispatch("setLoading", { isLoading: false });
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
        });
    },
    format_phone(number) {
      return String(
        "(" +
          String(number).substr(0, 2) +
          ") " +
          String(number).substr(2, 3) +
          " " +
          String(number).substr(5, 2) +
          " " +
          String(number).substr(7, 2)
      );
    },
  },
  created() {
    this.get_foreman();
  },
};
</script>

<style lang="scss" scoped>
.content_tabs {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
}

.content_tabs::-webkit-scrollbar {
  display: none;
}

.item_tabs {
  align-items: center;
  display: flex;
  flex: 0 0 250px;
  font-size: 40px;
  justify-content: center;
  scroll-snap-align: start;
  padding: 3px 5px;
}

table {
  min-width: 1250px;
  width: 100%;
}

.table-responsive {
  max-height: 66vh;
}

@media (max-width: 500px) {
  .table-responsive {
    max-height: 85vh;
  }
}

// rating

.rating {
  --dir: right;
  --fill: gold;
  --fillbg: rgba(100, 100, 100, 0.15);
  --star: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 17.25l-6.188 3.75 1.641-7.031-5.438-4.734 7.172-0.609 2.813-6.609 2.813 6.609 7.172 0.609-5.438 4.734 1.641 7.031z"/></svg>');
  --stars: 5;
  --starsize: 1.5rem;
  --symbol: var(--star);
  --value: 1;
  --w: calc(var(--stars) * var(--starsize));
  --x: calc(100% * (var(--value) / var(--stars)));
  block-size: var(--starsize);
  inline-size: var(--w);
  /* position: relative; */
  touch-action: manipulation;
  -webkit-appearance: none;
}
[dir="rtl"] .rating {
  --dir: left;
}
.rating::-moz-range-track {
  background: linear-gradient(
    to var(--dir),
    var(--fill) 0 var(--x),
    var(--fillbg) 0 var(--x)
  );
  block-size: 100%;
  mask: repeat left center/var(--starsize) var(--symbol);
}
.rating::-webkit-slider-runnable-track {
  background: linear-gradient(
    to var(--dir),
    var(--fill) 0 var(--x),
    var(--fillbg) 0 var(--x)
  );
  block-size: 100%;
  mask: repeat left center/var(--starsize) var(--symbol);
  -webkit-mask: repeat left center/var(--starsize) var(--symbol);
}
.rating::-moz-range-thumb {
  height: var(--starsize);
  opacity: 0;
  width: var(--starsize);
}
.rating::-webkit-slider-thumb {
  height: var(--starsize);
  opacity: 0;
  width: var(--starsize);
  -webkit-appearance: none;
}
.rating,
.rating-label {
  margin-bottom: 0px !important;
  /* display: block; */
  font-family: ui-sans-serif, system-ui, sans-serif;
}

/* NO JS */
.rating--nojs::-moz-range-track {
  background: var(--fillbg);
}
.rating--nojs::-moz-range-progress {
  background: var(--fill);
  block-size: 100%;
  mask: repeat left center/var(--starsize) var(--star);
}
.rating--nojs::-webkit-slider-runnable-track {
  background: var(--fillbg);
}
.rating--nojs::-webkit-slider-thumb {
  background-color: var(--fill);
  box-shadow: calc(0rem - var(--w)) 0 0 var(--w) var(--fill);
  opacity: 1;
  width: 1px;
}
[dir="rtl"] .rating--nojs::-webkit-slider-thumb {
  box-shadow: var(--w) 0 0 var(--w) var(--fill);
}
</style>
