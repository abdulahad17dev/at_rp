<template>
  <div
    class="modal fade"
    id="accept_request_smeta"
    tabindex="-1"
    aria-labelledby="accept_request_smeta"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <p class="modal-title" id="accept_request_smeta">
            {{ smeta_item.smeta_name }} ни тасдиқлаш
          </p>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            id="accpet_request_smeta_close"
          ></button>
        </div>
        <form @submit.prevent="$emit('accept_request', body)">
          <div class="modal-body">
            <div class="row gap-2">
              <div class="col-10 mx-auto">
                <label for="request_text_smeta">Таминотчилар: </label>
                <div class="dropdown">
                  <button
                    class="btn btn-light btn-sm dropdown-toggle"
                    type="button"
                    id="request_text_smeta"
                    data-bs-toggle="dropdown"
                    data-bs-auto-close="outside"
                    aria-expanded="false"
                    @click="
                      users.length ? '' : get_users(page, limit, search, role)
                    "
                  >
                    {{ text }}
                  </button>
                  <ul
                    class="dropdown-menu border-top-0"
                    aria-labelledby="users"
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
                          v-for="item in users"
                          :key="item"
                          @click="select(item.id, item.name)"
                        >
                          <a class="dropdown-item">{{ item.name }}</a>
                        </li>
                      </ul>
                    </li>
                    <li v-if="users != ''">
                      <hr class="dropdown-divider m-0" />
                    </li>
                    <li>
                      <nav
                        aria-label="Page navigation example"
                        class="mt-2"
                        v-if="users != ''"
                      >
                        <ul
                          class="pagination pagination-sm justify-content-end"
                        >
                          <li class="page-item">
                            <button
                              type="button"
                              class="page-link"
                              @click="get_users(page, limit, search)"
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
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="submit"
              class="btn btn-outline-primary btn-sm"
              id="accept_request_smeta_disabled"
              :disabled="!body.taminotchi_id"
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
import { catchError } from "@/utils/request/handle_api_err";
import { user_get } from "@/utils/request/request";
export default {
  name: "AcceptRequestZakupshik",
  props: ["smeta_item"],
  data() {
    return {
      page: 0,
      pages: null,
      limit: 25,
      search: "",
      role: "taminotchi",
      users: [],
      text: "таминотчилар",
      body: {
        taminotchi_id: null,
        smeta_id: null,
      },
    };
  },
  watch: {
    smeta_item(e) {
      this.body.smeta_id = e.smeta_id;
    },
    limit(e) {
      this.page = 0;
      this.get_users(this.page, e, this.search, this.role);
    },
    page(e) {
      this.get_users(e, this.limit, this.search, this.role);
      document.getElementById("scroll").scrollTop = 0;
    },
    search(e) {
      this.page = 0;
      if (e.length > 0) {
        this.get_users(this.page, this.limit, this.search, this.role);
      } else if (e.length == 0) {
        this.get_users(this.page, this.limit, this.search, this.role);
        this.page = 0;
      }
    },
  },
  methods: {
    get_users(page, limit, search, role) {
      this.$store.dispatch("setLoading", { isLoading: true });

      user_get(page, limit, search, role)
        .then((res) => {
          this.users = res.data.data;
          this.pages = res.data.pages;
          this.$store.dispatch("setLoading", { isLoading: false });
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
        });
    },
    select(id, name) {
      this.body.taminotchi_id = id;
      this.text = name;
      document.getElementById("request_text_smeta").click();
    },
  },
};
</script>

<!-- <style lang="scss" scoped>
</style> -->
