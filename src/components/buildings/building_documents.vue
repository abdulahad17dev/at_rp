<template>
  <div
    class="modal fade"
    id="building_document"
    tabindex="-1"
    aria-labelledby="building_documents"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="building_documents">
            {{ name }} ҳужжатлари
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="$emit('document_add', body)">
            <div class="row">
              <div class="col">
                <input
                  type="file"
                  id="file"
                  class="form-control form-control-sm"
                  hidden
                  required
                  @change="upload"
                />
                <button
                  class="btn btn-sm btn-outline-primary w-100"
                  type="button"
                  @click="file"
                >
                  <i class="fa-solid fa-file-arrow-up"></i>
                  <span id="txt" class="mx-1">{{ txt }}</span>
                </button>
              </div>
              <div class="col">
                <textarea
                  class="form-control form-control-sm"
                  rows="2"
                  required
                  v-model="body.comment"
                  placeholder="Изох"
                ></textarea>
              </div>
              <div class="col">
                <button
                  class="btn btn-sm btn-outline-success w-100"
                  type="submit"
                  :disabled="!body.file || !body.comment"
                  id="document_button"
                >
                  <i class="fa-solid fa-circle-check"></i>
                </button>
              </div>
            </div>
          </form>

          <div class="table-responsive my-2" v-if="data != ''">
            <table class="table table-sm table-hover">
              <thead>
                <tr>
                  <th>№</th>
                  <th>Файл</th>
                  <th>Изох</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, idx) in data" :key="item">
                  <td style="width: 10%">{{ idx + 1 }}</td>
                  <td style="width: 40%">{{ item.Building_documents.file }}</td>
                  <td style="width: 35%">
                    {{ item.Building_documents.comment }}
                  </td>
                  <td style="width: 15%">
                    <button
                      class="btn btn-sm btn-primary mx-1"
                      @click="download(item)"
                    >
                      <i class="fa-solid fa-download"></i>
                    </button>
                    <button
                      class="btn btn-sm btn-danger"
                      @click="$emit('remove', item.Building_documents.id)"
                      id="remove_document"
                    >
                      <i class="fa-solid fa-circle-xmark"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { link } from "@/utils/request/handle_api_err";
import axios from "axios";
export default {
  name: "BuildingDocuments",
  props: ["id", "name", "data"],
  data() {
    return {
      body: {
        file: "",
        comment: "",
      },
      txt: "файл юклаш",
    };
  },
  methods: {
    file() {
      document.getElementById("file").click();
    },
    upload(e) {
      this.body.file = e.target.files[0];
      this.txt = e.target.files[0].name.slice(0, 20);
    },
    forceFileDownload(response, item) {
      var headers = response.headers;
      var extension =
        link +
        item.Building_documents.file.substring(
          item.Building_documents.file.lastIndexOf(".") + 1
        );
      var blob = new Blob([response.data], { type: headers["content-type"] });
      var link_file = document.createComment("a");
      link_file.href = window.URL.createObjectURL(blob);
      link_file.download = `${item.Building_documents.file}.${extension}`;
      link_file.click();
      link_file.remove();
    },
    download(e) {
      axios({
        method: "get",
        url: link + e.Building_documents.file,
        responseType: "blob",
        Accept: "*/*",
      })
        .then((response) => {
          this.forceFileDownload(response, e);
        })
        .catch(() => {
          console.log("error occured");
        });
    },
  },
};
</script>

<style lang="scss" scoped>
table {
  min-width: 650px;
  width: 100%;
}

.table-responsive {
  max-height: 70vh;
}

@media (max-width: 500px) {
  .table-responsive {
    min-height: 90vh;
  }
}
</style>
