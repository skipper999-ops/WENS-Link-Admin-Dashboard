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
            <label>Banner Image</label>
            <div class="dropzone dz-clickable" id="myDrop">
              <div class="dz-default dz-message" data-dz-message>
                <span>Drop files here to upload</span>
              </div>
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
          <!-- <div class="pointer" @click="addBanner">Save</div>
          <div class="pointer" @click="closeDropdownPanel">Cancel</div> -->
        </div>
      </div>
    </div>
    <div class="holder">
      <div class="row">
        <div class="col s24">
          <div class="padding-bottom-15" style="display: flex;justify-content: space-between;">
            <h3>Homepage Carousels</h3>
            <!-- <div class="btn btn-success" @click="navbarOrderUpdate">Save</div> -->
            <button class="btn btn-red white-text" @click="createCarousel">Add Carousel</button>
          </div>
        </div>
        <div class="col s24">
          <draggable
            class="dragArea list-group"
            :list="final_category"
            :clone="clone"
            :group="{ name: 'people', pull: pullFunction }"
            @start="start"
          >
            <div
              class="list-group-item"
              v-for="element in final_category"
              :key="element.id"
            >{{ element.name }}</div>
          </draggable>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const message = [
  "vue.draggable",
  "draggable",
  "component",
  "for",
  "vue.js 2.0",
  "based",
  "on",
  "Sortablejs"
];

import draggable from "vuedraggable";
let idGlobal = 8;
export default {
  mounted() {
    feather.replace({ color: "black" });
    this.getCategory();
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      };
    }
  },
  components: {
    draggable
  },
  layout: "empty",
  data() {
    return {
      enabled: true,
      showDropdown: false,
      exampleList: ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"],
      list: message.map((name, index) => {
        return { name, order: index + 1 };
      }),
      drag: false,
      final_category: [],
      category: [],
      name: "",
      description: "",
      status: 1,
      image: "",
      url: ""
    };
  },
  methods: {
    createCarousel: function() {
      this.$router.push("/dashboard/homepage/new/create");
    },
    getCategory: function() {
      this.$store.dispatch("getCategory").then(res => {
        console.log(res);
        this.category = JSON.parse(JSON.stringify(res.data));

        this.navbarOrder();
      });
    },
    navbarOrder: function() {
      this.$store.dispatch("WebsiteNav").then(res => {
        if (res.data.length != 0) {
          this.final_category = JSON.parse(res.data[0].value);
          this.category = this.category.filter(
            v => !this.containsObject(v, this.final_category)
          );
        }
      });
    },
    navbarOrderUpdate: function() {
      var payload = {
        key: "WebsiteNav",
        value: JSON.stringify(this.final_category)
      };
      this.$store.dispatch("WebsiteNavUpdate", payload).then(res => {
        console.log(res.data);
        this.navbarOrder();
      });
    },
    containsObject: function(obj, list) {
      var i;
      for (i = 0; i < list.length; i++) {
        console.log(JSON.stringify(obj));
        console.log(JSON.stringify(list[i]));
        if (JSON.stringify(list[i]) === JSON.stringify(obj)) {
          return true;
        }
      }
      return false;
    },
    removeAt(idx) {
      this.list.splice(idx, 1);
    },
    add: function() {
      id++;
      this.list.push({ name: "Juan " + id, id, text: "" });
    },
    clone({ name }) {
      return { name, id: idGlobal++ };
    },
    pullFunction() {
      return this.controlOnStart ? "clone" : true;
    },
    start({ originalEvent }) {
      this.controlOnStart = originalEvent.ctrlKey;
    },
    openDropdownPanel: function() {
      this.showDropdown = true;
    },
    closeDropdownPanel: function() {
      this.showDropdown = false;
      this.name = "";
      this.description = "";
      this.myDropzone.removeAllFiles();
    }
  }
};
</script>
<style scoped>
.button {
  margin-top: 35px;
}
.handle {
  float: left;
  padding-top: 8px;
  padding-bottom: 8px;
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
  padding: 0.75rem 1.25rem;
  margin-bottom: -1px;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.125);
  cursor: move !important;
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
</style>
