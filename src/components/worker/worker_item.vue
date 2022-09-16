<template>
  <div class="table-responsive mt-3">
    <table class="table table-sm table-hover">
      <thead class="">
        <tr>
          <th style="width: 8%">#ИД</th>
          <th style="width: 15%">Исм</th>
          <th style="width: 15%">Баланс</th>
          <th style="width: 15%">Телефон рақам</th>
          <th style="width: 25%">Ихтисослик</th>
          <th style="width: 10%">Рейтинг</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in data || []" :key="item">
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td :class="item.balance >= 0 ? 'text-success' : 'text-danger'">
            {{ new Intl.NumberFormat().format(item.balance) }} сўм
          </td>
          <td>
            <a
              :href="`tel:+998${item.phone}`"
              class="text-decoration-none text-dark"
            >
              +998 {{ item.phone }}</a
            >
          </td>
          <td>
            <span
              @click="$emit('remove_specialty', worker_item.id)"
              class="badge rounded-pill bg-danger mx-1"
              v-for="worker_item in item.worker_specialties"
              :key="worker_item"
              ><i class="fa-solid fa-circle-xmark text-danger text-white"></i>
              {{ worker_item.specialty }}</span
            >
          </td>
          <td>
            <label class="rating-label">
              <input
                class="rating"
                max="5"
                oninput="this.style.setProperty('--value', `${this.valueAsNumber}`)"
                step="0.1"
                :style="'--value:' + item.rating"
                type="range"
                disabled
              />
            </label>
          </td>
          <td>
            <button
              class="btn btn-sm btn-warning"
              @click="$emit('item', item)"
              data-bs-toggle="modal"
              data-bs-target="#worker_put"
            >
              <i class="fa fa-edit text-white"></i>
            </button>
            <button
              class="btn btn-sm btn-primary mx-1"
              @click="$emit('item', item)"
              data-bs-toggle="modal"
              data-bs-target="#worker_speciality_add"
            >
              <i class="fa-solid fa-circle-plus text-white"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "WorkersItems",
  props: ["data"],
  emits: ["item", "remove_specialty"],
};
</script>

<style lang="scss" scoped>
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

td span {
  cursor: pointer;
}
</style>
