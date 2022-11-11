<template>
  <!-- Modal -->
  <div class="modal fade" id="accept_moneys">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Тасдиқлаш</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            id="accept_money"
          ></button>
        </div>
        <form @submit.prevent="$emit('accept', body)">
          <div class="modal-body">
            <div class="row gap-2">
              <div class="col-10 mx-auto">
                <label>Пул ювувчилар: </label>
                <div class="dropdown">
                  <button
                    class="btn btn-light btn-sm dropdown-toggle"
                    type="button"
                    id="accept_money_text"
                    data-bs-toggle="dropdown"
                    data-bs-auto-close="outside"
                    aria-expanded="false"
                    @click="
                      launderers.length
                        ? ''
                        : get_launderers(page, limit, search)
                    "
                  >
                    {{ text }}
                  </button>
                  <ul class="dropdown-menu border-top-0" aria-labelledby="bank">
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
                          v-for="item in launderers"
                          :key="item"
                          @click="select(item.id, item.name)"
                        >
                          <a class="dropdown-item">{{ item.name }}</a>
                        </li>
                      </ul>
                    </li>
                    <li v-if="launderers != ''">
                      <hr class="dropdown-divider m-0" />
                    </li>
                    <li>
                      <nav
                        aria-label="Page navigation example"
                        class="mt-2"
                        v-if="launderers != ''"
                      >
                        <ul
                          class="pagination pagination-sm justify-content-end"
                        >
                          <li class="page-item">
                            <button
                              type="button"
                              class="page-link"
                              @click="get_launderers(page, limit, search)"
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
                              :disabled="page == pages - 1"
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
                <label for="percent">Пул ювувчига ўтказилаётган фоиз: </label>
                <div class="input-group input-group-sm">
                  <input
                    type="number"
                    id="percent"
                    class="form-control"
                    placeholder="Фоиз"
                    v-model="body.percent"
                    min="0.5"
                    max="100"
                    step="any"
                    required
                  />
                  <span class="input-group-text bg-white">%</span>
                </div>
              </div>
              <div class="col-10 mx-auto">
                <label for="comment">Изох: </label>
                <textarea
                  id="comment"
                  class="form-control form-control-sm"
                  v-model="body.comment"
                  placeholder="Изох"
                  required
                ></textarea>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="submit"
              class="btn btn-outline-primary btn-sm"
              id="accept_m_disabled"
              :disabled="
                !body.money_laundered_id || !body.percent || !body.comment
              "
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
import { money_launderers_get } from "@/utils/request/request";
import { catchError } from "@/utils/request/handle_api_err";
export default {
  name: "AcceptMoneyInCashier",
  data() {
    return {
      body: {
        money_laundered_id: null,
        percent: null,
        comment: "",
      },
      page: 0,
      pages: null,
      limit: 25,
      search: "",
      launderers: [],
      text: "пул ювувчилар",
    };
  },
  watch: {
    id(e) {
      this.to.from_ = e;
    },
    limit(e) {
      this.page = 0;
      this.get_launderers(this.page, e, this.search);
    },
    page(e) {
      this.get_launderers(e, this.limit, this.search);
    },
    search(e) {
      this.page = 0;
      if (e.length > 0) {
        this.get_launderers(this.page, this.limit, this.search);
      } else if (e.length == 0) {
        this.get_launderers(this.page, this.limit, this.search);
        this.page = 0;
      }
    },
  },
  methods: {
    get_launderers(page, limit, search) {
      this.$store.dispatch("setLoading", { isLoading: true });

      money_launderers_get(page, limit, search)
        .then((res) => {
          this.launderers = res.data.data;
          this.pages = res.data.pages;
          this.$store.dispatch("setLoading", { isLoading: false });
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
        });
    },
    select(id, name) {
      this.body.money_laundered_id = id;
      this.text = name;
      document.getElementById("accept_money_text").click();
    },
  },
};
</script>

<!-- <style lang="scss" scoped>
</style> -->
