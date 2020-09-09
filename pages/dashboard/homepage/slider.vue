<template>
  <div class="navbar-spacing padding-top-30">
    <div v-show="showDropdown" class="popup">
      <div class="popup-main">
        <div class="popup-title">
          <h3>Upload Banner</h3>
        </div>
        <div class="popup-body">
          <div class="form-control">
            <label>Banner Name</label>
            <input v-model="name" type="text" style="width:70%" />
          </div>

          <div class="form-control">
            <label>Banner Description (Optional)</label>
            <input v-model="description" type="text" style="width:70%" />
          </div>

          <div style="margin: 0 10px 10px 0">
            <label>Desktop Banner Image ( 1680 x 478 ) </label>

            <input
              type="file"
              ref="image"
              class="custom-file-input"
              id="mainImage"
              accept="image/jpeg"
              @change="uploadImage"
            />

            <div class="preview">
              <img :src="image_preview" />
            </div>
          </div>

          <div style="margin: 0 10px 10px 0">
            <label>Mobile Banner Image ( 1200 x 640 )</label>
            <input
              type="file"
              class="custom-file-input"
              ref="image"
              id="mainImage"
              accept="image/jpeg"
              @change="uploadImageMobile"
            />

            <div class="preview">
              <img :src="image_mobile_preview" />
            </div>
          </div>

          <div class="form-control">
            <label>URL</label>
            <input type="text" v-model="url" style="width:70%" />
          </div>

          <!-- <div class="form-control">
            <label>Status</label>
            <select v-model="status" style="width:70%">
              <option value="0">Inactive</option>
              <option value="1">Active</option>
            </select>
          </div>-->
        </div>
        <div class="popup-action">
          <div class="pointer" @click="addBanner">Save</div>
          <div class="pointer" @click="closeDropdownPanel">Cancel</div>
        </div>
      </div>
    </div>

    <div class="specification">
      <div class="holder">
        <div
          class="column-padding header-bottom"
          style="display: flex; justify-content: space-between"
        >
          <h3>Main Banner Images</h3>
          <button class="btn btn-red white-text" @click="openDropdownPanel">Add Banner</button>
        </div>

        <div class="row">
          <vue-good-table :columns="columns" :rows="allBanners" :line-numbers="true">
            <template slot="table-row" slot-scope="props">
              <span v-if="props.column.field === 'action'">
                <button
                  type="button"
                  @click="viewBanner(props.row.image)"
                  class="btn btn-primary"
                >View Banner</button>
                <button
                  type="button"
                  @click="deleteBanner(props.row.id)"
                  class="btn btn-primary"
                >Delete</button>
              </span>
              <span v-if="props.column.field === 'url'">
                <a target="_blank" :href="origin + props.row.url">{{origin}}{{props.row.url}}</a>
              </span>
              <span v-else>{{ props.formattedRow[props.column.field] }}</span>
            </template>
          </vue-good-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    allBanners: [],
    origin: "",
    showDropdown: false,
    columns: [
      {
        label: "Title",
        field: "name",
      },
      {
        label: "Description",
        field: "description",
      },
      // {
      //   label: "Banner",
      //   field: "image"
      // },
      {
        label: "URL",
        field: "url",
      },
      // {
      //   label: "Status",
      //   field: "status"
      // },
      {
        label: "Action",
        field: "action",
      },
    ],
    name: "",
    description: "",
    status: 1,
    image_mobile: "",
    image: "",
    image_mobile_preview: "",
    image_preview: "",
    url: "",
  }),

  mounted() {
    this.getAllBanner();

    var vm = this;
  },
  methods: {
    uploadImage() {
      var target = event.target || event.srcElement;
      console.log(target, "changed.");
      console.log(event);
      if (target.value.length == 0) {
        console.log("Suspect Cancel was hit, no files selected.");
      } else {
        var tmppath = URL.createObjectURL(event.target.files[0]);
        console.log(tmppath);

        this.image = event.target.files[0];
        this.image_preview = tmppath;
      }
    },
    uploadImageMobile() {
      var target = event.target || event.srcElement;
      console.log(target, "changed.");
      console.log(event);
      if (target.value.length == 0) {
        console.log("Suspect Cancel was hit, no files selected.");
      } else {
        var tmppath = URL.createObjectURL(event.target.files[0]);
        console.log(tmppath);

        this.image_mobile = event.target.files[0];
        this.image_mobile_preview = tmppath;
      }
    },

    getAllBanner: function () {
      this.$store.dispatch("getAllBanner").then((res) => {
        console.log(res);
        try {
          this.allBanners = JSON.parse(JSON.stringify(res.data.body));
        } catch {}
      });
    },
    addBanner: function () {
      var payload = new FormData();
      payload.append("name", this.name);
      payload.append("description", this.description);
      payload.append("status", this.status);
      payload.append("image", this.image);
      payload.append("image_mobile", this.image_mobile);
      payload.append("url", this.url);

      this.$store.dispatch("addBanner", payload).then((res) => {
        console.log(res);
        this.getAllBanner();
        this.closeDropdownPanel();
      });
    },
    viewBanner: function (id) {
      window.open(process.env.BASE_URL + "/media/banners/" + id);
    },
    deleteBanner: function (id) {
      this.$store.dispatch("editDeleteBanner", id).then((res) => {
        console.log(res);
        this.getAllBanner();
      });
    },
    openDropdownPanel: function () {
      this.showDropdown = true;
    },
    closeDropdownPanel: function () {
      this.showDropdown = false;
      this.name = "";
      this.description = "";
      this.image_mobile = "";
      this.image = "";
      this.image_mobile_preview = "";
      this.image_preview = "";
      this.url = "";
      this.myDropzone.removeAllFiles();
    },
  },
};
</script>

<style scoped>
.popup {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
}

.popup-main {
  background-color: white;
  margin: auto;
  position: absolute;
  max-width: 400px;
  height: 460px;
  left: 260px;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1;
  border-radius: 5px;
}

.popup-body {
  height: 300px;
  overflow: auto;
  padding: 30px;
}

.popup-title {
  padding: 30px 30px 16px;
  border-bottom: 1px solid #00000024;
}
.popup-action {
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
  padding: 25px;
  box-shadow: 0px -7px 10px 0px #0000000d;
}

.popup:after {
  background-color: rgba(0, 0, 0, 0.83);
  margin: auto;
  position: absolute;
  content: "";
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}

input,
select {
  height: 35px;
  margin: 0 10px 10px 0;
  border-radius: 0;
  outline: none;
  width: 100%;
  font-size: 1rem;
  padding: 0.6rem 1rem;
  box-shadow: none;
  transition: all 0.3s;
}

.preview img {
  width: 100%;
  max-height: 200px;
}

.custom-file-input {
  color: transparent;
}
.custom-file-input::-webkit-file-upload-button {
  visibility: hidden;
}
.custom-file-input::before {
  content: "Select some files";
  color: black;
  display: inline-block;
  background: -webkit-linear-gradient(top, #f9f9f9, #e3e3e3);
  border: 1px solid #999;
  border-radius: 3px;
  padding: 5px 8px;
  outline: none;
  white-space: nowrap;
  -webkit-user-select: none;
  cursor: pointer;
  text-shadow: 1px 1px #fff;
  font-weight: 700;
  font-size: 10pt;
}
.custom-file-input:hover::before {
  border-color: black;
}
.custom-file-input:active {
  outline: 0;
}
.custom-file-input:active::before {
  background: -webkit-linear-gradient(top, #e3e3e3, #f9f9f9);
}
</style>
