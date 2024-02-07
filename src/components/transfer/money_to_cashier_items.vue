<template>
  <div class="table-responsive">
    <table class="table table-sm table-hover" id="money_to_cashier">
      <thead>
        <tr>
          <th style="width: 10%">№</th>
          <th style="width: 20%">Сумма</th>
          <th style="width: 20%">Сана</th>
          <th style="width: 20%">Изох</th>
          <th data-exclude="true">
            <div class="dropdown">
              <button
                class="btn btn-light btn-sm dropdown-toggle"
                type="button"
                id="user_text2"
                data-mdb-toggle="dropdown"
                data-bs-auto-close="outside"
                aria-expanded="false"
                @click="
                  users.length
                    ? ''
                    : get_users(page_user, limit_user, search_user, role)
                "
              >
                {{ text }}
              </button>
              <ul
                class="dropdown-menu border-top-0"
                aria-labelledby="user_text2"
              >
                <li>
                  <input
                    type="search"
                    class="form-control form-control-sm"
                    placeholder="қидириш ..."
                    v-model="search_user"
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
                    <ul class="pagination pagination-sm justify-content-end">
                      <li class="page-item">
                        <button
                          type="button"
                          class="page-link"
                          @click="
                            users_get(page_user, limit_user, search_user, role)
                          "
                        >
                          <i class="fa-solid fa-rotate"></i>
                        </button>
                      </li>
                      <li class="page-item">
                        <button
                          type="button"
                          class="page-link"
                          @click="page_user--"
                          :disabled="page_user == 0"
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
                          {{ page_user + 1 }}
                        </button>
                      </li>
                      <li class="page-item">
                        <button
                          type="button"
                          class="page-link"
                          @click="page_user++"
                          :disabled="page_user == pages_user - 1"
                        >
                          <i class="fa-solid fa-angle-right text-dark"></i>
                        </button>
                      </li>
                    </ul>
                  </nav>
                </li>
              </ul>
            </div>
          </th>
          <th style="width: 15%" data-exclude="true">
            <select
              class="form-control form-control-sm"
              @change="$emit('status', $event.target.value)"
            >
              <option value="false">қабул қилинганмаган</option>
              <option value="true">қабул қилинган</option>
            </select>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, inc) in transfer_cashier" :key="item">
          <td>{{ inc + 1 }}</td>
          <td>
            {{ new Intl.NumberFormat().format(item.Transfers.money) }} сўм
          </td>
          <td>
            {{
              new Date(item.Transfers.time)
                .toLocaleDateString({
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                })
                .slice(0, 10)
            }}
          </td>
          <td>{{ item.Transfers.comment }}</td>
          <td>
            <b class="text-primary">{{ item.user_for_to_ }}</b>
          </td>
          <td data-exclude="true">
            <button
              class="btn btn-sm btn-danger"
              v-if="item.Transfers.status == false"
              @click="$emit('remove', item.Transfers.id)"
              :id="item.Transfers.id"
            >
              <i class="fa-solid fa-circle-xmark"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <Data_notfound v-if="transfer_cashier == ''" />
  </div>
</template>

<script>
import Data_notfound from "@/utils/notfound/data_notfound.vue";
import { user_get } from "@/utils/request/request";
import { catchError } from "@/utils/request/handle_api_err";
export default {
  name: "MoneyToUserItems",
  props: ["transfer_cashier"],
  emits: ["status", "to", "remove"],
  data() {
    return {
      limit_user: 25,
      page_user: 0,
      pages_user: null,
      search_user: "",
      role: "kassir",
      users: [],
      text: "кассирлар",
    };
  },
  watch: {
    limit_user(e) {
      this.page_user = 0;
      this.get_users(this.page_user, e, this.search_user, this.role);
    },
    page_user(e) {
      this.get_users(e, this.limit_user, this.search_user, this.role);
    },
    search_user(e) {
      this.page_user = 0;
      if (e.length > 0) {
        this.get_users(
          this.page_user,
          this.limit_user,
          this.search_user,
          this.role
        );
      } else if (e.length == 0) {
        this.get_users(
          this.page_user,
          this.limit_user,
          this.search_user,
          this.role
        );
        this.page_user = 0;
      }
    },
  },
  methods: {
    get_users(page, limit, search, role) {
      this.$store.dispatch("setLoading", { isLoading: true });

      user_get(page, limit, search, role)
        .then((res) => {
          this.users = res.data.data;
          this.pages_user = res.data.pages;
          this.$store.dispatch("setLoading", { isLoading: false });
        })
        .catch((err) => {
          catchError(err);
          this.$store.dispatch("setLoading", { isLoading: false });
        });
    },
    select(id, name) {
      this.$emit("to", id);
      this.text = name;
      document.getElementById("user_text2").click();
    },
  },
  components: { Data_notfound },
};
</script>

<style lang="scss" scoped>
table {
  width: 100%;
  min-width: 1100px;
}

.table-responsive {
  min-height: 63vh;
  max-height: 63vh;
}

@media (max-width: 500px) {
  .table-responsive {
    min-height: 120vh;
    max-height: 120vh;
  }
}
</style>
