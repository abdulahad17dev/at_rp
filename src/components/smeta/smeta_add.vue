<template>
  <!-- Modal -->
  <div class="modal fade" id="smeta_add">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Смета юклаш</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            id="smetas_add"
          ></button>
        </div>
        <form @submit.prevent="$emit('add', data)">
          <div class="modal-body">
            <div class="row gap-2">
              <div class="col-10 mx-auto">
                <input
                  type="file"
                  name="file-6[]"
                  id="file-6"
                  class="inputfile inputfile-5"
                  data-multiple-caption="{count} files selected"
                  multiple
                  hidden
                  @change="upload()"
                  ref="file"
                />
                <label for="file-6"
                  ><figure>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="17"
                      viewBox="0 0 20 17"
                    >
                      <path
                        d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"
                      />
                    </svg>
                  </figure>
                  <span id="file_name"></span
                ></label>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="submit"
              class="btn btn-outline-primary btn-sm"
              id="smeta_disabled"
              :disabled="!data.file"
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
export default {
  name: "SmetaAddItem",
  data() {
    return {
      data: {
        file: "",
      },
    };
  },
  methods: {
    upload() {
      this.data.file = this.$refs.file.files[0];
      document.getElementById("file_name").innerHTML =
        this.$refs.file.files[0].name;
    },
  },
  mounted() {},
};
</script>

<style lang="scss">
.inputfile-5 + label {
  color: #31be7d;
  display: block;
  justify-content: center;
  text-align: center;
}

.inputfile-5:focus + label,
.inputfile-5.has-focus + label,
.inputfile-5 + label:hover {
  color: #1f6e43;
}

.inputfile-5 + label figure {
  width: 100px;
  height: 135px;
  background-color: #31be7d;
  display: block;
  position: relative;
  padding: 30px;
  margin: 0 auto 10px;
}

.inputfile-5:focus + label figure,
.inputfile-5.has-focus + label figure,
.inputfile-5 + label:hover figure {
  background-color: #1f6e43;
}

.inputfile-5 + label figure::before,
.inputfile-5 + label figure::after {
  width: 0;
  height: 0;
  content: "";
  position: absolute;
  top: 0;
  right: 0;
}

.inputfile-5 + label figure::before {
  border-top: 20px solid #dfc8ca;
  border-left: 20px solid transparent;
}

.inputfile-5 + label figure::after {
  border-bottom: 20px solid #1f6e43;
  border-right: 20px solid transparent;
}

.inputfile-5:focus + label figure::after,
.inputfile-5.has-focus + label figure::after,
.inputfile-5 + label:hover figure::after {
  border-bottom-color: #31be7d;
}

.inputfile-5 + label svg {
  width: 100%;
  height: 100%;
  fill: #f1e5e6;
}
</style>
