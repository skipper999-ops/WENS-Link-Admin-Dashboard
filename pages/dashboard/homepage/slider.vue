<template>
  <div class="navbar-spacing padding-top-30">
    <div
      class="column-padding header-bottom"
      style="display: flex; justify-content: space-between;align-items:center"
    >
      <h3>Slider Banners</h3>
      <div>
      <button v-if="allBanners.length != 0" class="btn btn-success white-text" @click="SaveOrder">
        Save Order
      </button>
      <button class="btn btn-primary white-text" @click="openDropdownPanel">
        Add Banner
      </button>
    </div>
    </div>

    <div v-show="showDropdown" class="popup">
      <div class="popup-main">
        <div class="popup-title">
          <h3>Upload Banner</h3>
        </div>
        <div class="popup-body">
          <div class="form-control">
            <label>Banner Name</label>
            <input v-model="name" type="text" style="width: 70%" />
          </div>

          <div class="form-control">
            <label>Banner Description (Optional)</label>
            <input v-model="description" type="text" style="width: 70%" />
          </div>

          <div style="margin: 0 10px 10px 0">
            <label>Desktop Banner Image ( 1680 x 478 ) </label>

            <input
              type="file"
              ref="image"
              class="custom-file-input mainImage"
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
              class="custom-file-input mainImage"
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
            <input type="text" v-model="url" style="width: 70%" />
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

    <div v-show="editshowDropdown" class="popup">
      <div class="popup-main">
        <div class="popup-title">
          <h3>Edit Banner</h3>
        </div>
        <div class="popup-body">
          <div class="form-control">
            <label>Banner Name</label>
            <input v-model="editing.name" type="text" style="width: 70%" />
          </div>

          <div class="form-control">
            <label>Banner Description (Optional)</label>
            <input v-model="editing.description" type="text" style="width: 70%" />
          </div>

          <div style="margin: 0 10px 10px 0">
            <label>Desktop Banner Image ( 1680 x 478 ) </label>

            <input
              type="file"
              ref="image"
              class="custom-file-input mainImage"
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
              class="custom-file-input mainImage"
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
            <input type="text" v-model="editing.url" style="width: 70%" />
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
          <div class="pointer" @click="updateBanner">Save</div>
          <div class="pointer" @click="closeDropdownPanel">Cancel</div>
        </div>
      </div>
    </div>

    <div class="holder">
      <div class="row">
        <div class="col-6">
          <div
            class="grid-table"
            style="
              display: grid;
              grid-template-columns: repeat(4, minmax(0, 1fr));
              gap: 4rem;
              padding: 1rem 1.25rem;
            "
          >
            <div style="padding-left: 50px">Title</div>
            <div>Description</div>
            <div>URL</div>
            <div>Action</div>
          </div>
          <draggable
            handle=".handle"
            :list="allBanners"
            class="list-group"
            ghost-class="ghost"
            :move="checkMove"
            @start="dragging = true"
            @end="dragging = false"
          >
            <div
              class="list-group-item"
              style="
                display: grid;
                grid-template-columns: repeat(4, minmax(0, 1fr));
                gap: 4rem;
                align-items: center !important;
              "
              v-for="p in allBanners"
              :key="p.name"
            >
              <div>
                <menu-icon class="feather-icon black handle"></menu-icon>
                {{ p.name }}
              </div>
              <div style="word-break: break-word">{{ p.description }}</div>
              <div style="word-break: break-word">{{ p.url }}</div>
              <div>
                <button
                  type="button"
                  @click="viewBanner(p.image)"
                  class="btn btn-primary"
                >
                  View
                </button>
                <button
                  type="button"
                  @click="editBanner(p.id)"
                  class="btn btn-success"
                >
                  Edit
                </button>
                <button
                  type="button"
                  @click="deleteBanner(p.id)"
                  class="btn btn-red white-text"
                >
                  Delete
                </button>
              </div>
            </div>
          </draggable>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { MenuIcon } from "vue-feather-icons";
import draggable from "vuedraggable";
let id = 1;
export default {
  name: "simple",
  display: "Simple",
  order: 0,
  components: {
    draggable,
  },
  data() {
    return {
      allBanners: [],
      name: "",
      baseurl: process.env.BASE_URL,
      description: "",
      status: 1,
      image_mobile: "",
      image: "",
      image_mobile_preview: "",
      image_preview: "",
      url: "",
      origin: "",
      editshowDropdown: false,
      showDropdown: false,
      editing: {}
    };
  },
  mounted() {
    feather.replace({ color: "white" });
    this.getAllBanner('onload');
  },
  components: {
    MenuIcon,
  },
  methods: {
    add: function () {
      this.list.push({ name: "Juan " + id, id: id++ });
    },
    replace: function () {
      this.list = [{ name: "Edgard", id: id++ }];
    },
    checkMove: function (e) {
      window.console.log("Future index: " + e.draggedContext.futureIndex);
    },

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

    getAllBanner: function (type) {
      this.$store.dispatch("getAllBanner").then((res) => {
          this.allBanners = JSON.parse(JSON.stringify(res.data.body));
          if( type != 'onload' ){
            this.SaveOrder();
          }else{
            this.GetOrder()
          }
      });
    },

    editBanner: function (id) {
      this.editshowDropdown = true
      this.editing = this.allBanners.filter( v=> v.id == id )[0]
      console.log(this.editing)
      this.image_preview = `${this.baseurl}/${this.editing.image}`
      this.image_mobile_preview = `${this.baseurl}/${this.editing.image_mobile}`
    },

    openDropdownPanel: function () {
      this.showDropdown = true;
    },
    closeDropdownPanel: function () {
      this.showDropdown = false;
      this.editshowDropdown = false;
      this.name = "";
      this.description = "";
      this.image_mobile = "";
      this.image = "";
      this.image_mobile_preview = "";
      this.image_preview = "";
      this.url = "";
      this.editing = {};
      $(".mainImage").val('')
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
        this.getAllBanner();
        this.closeDropdownPanel();
      
      });
    },

    updateBanner: function () {
      var payload = new FormData();
      payload.append("name", this.editing.name);
      payload.append("description", this.editing.description);
      payload.append("status", this.editing.status);
      if( this.image != '' ){
        payload.append("image", this.image);
      }
      if( this.image != '' ){
        payload.append("image", this.image_mobile);
      }
      payload.append("image_mobile", this.image_mobile);
      payload.append("url", this.editing.url);

      var id = this.editing.id

      this.$store.dispatch("EditBanner", {payload , id}).then((res) => {
        console.log(res);
        this.getAllBanner();
        this.closeDropdownPanel();
      });
    },
    viewBanner: function (id) {
      window.open(process.env.BASE_URL + "/media/banners/" + id);
    },
    deleteBanner: function (id) {
      this.$store.dispatch("DeleteBanner", id).then((res) => {
        console.log(res);
        this.getAllBanner();
      });
    },
    SaveOrder: function () {
      var payload = {
        key: "SliderOrdering",
        value: JSON.stringify(this.allBanners)
      }

      this.$store.dispatch("sliderUpdate", payload).then((res) => {
        console.log(res);
        alert("Order Saved")
      });
    },
    GetOrder: function () {
      this.$store.dispatch("slider").then((res) => {
        console.log(res);
        console.log(JSON.parse(res.data[0].value))
      });
    },
  },
};
</script>
<style scoped>
.button {
  margin-top: 35px;
}
.handle {
  float: left;
  color: #607d8b;
  margin-right: 20px;
}
.close {
  float: right;
  padding-top: 8px;
  padding-bottom: 8px;
}
input {
  display: inline-block;
  width: 50%;
}
.text {
  margin: 20px;
}
.button {
  margin-top: 35px;
}
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.list-group {
  min-height: 39px;
  padding-bottom: 1px;
  border: 1px dashed #d2d2d2;
}
.list-group-item {
  position: relative;
  display: block;
  padding: 1rem 1.25rem;
  margin-bottom: -1px;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.125);
}
.handle {
  cursor: move !important;
}
.list-group-item i {
  cursor: pointer;
}

.sortable-chosen {
  background-color: #4caf50;
  color: white;
}

.grid-table {
  font-size: "12px";
  font-family: "bold";
}


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