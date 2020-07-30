<template>
  <div class="navbar-spacing padding-top-30">
    <div v-if="isURLBuilderVisible" class="popup">
      <div class="popup-main">
        <URL></URL>
        <div class="popup-action">
          <div class="pointer" @click="isURLBuilderVisible = false">Close</div>
        </div>
      </div>
    </div>
    <!-- <div v-if="showDropdown1" class="popup">
      <div class="popup-main">
        <URL></URL>
        <div class="popup-action">
          <div class="pointer" @click="showDropdown1 = false">Close</div>
        </div>
      </div>
    </div>-->
    <div v-show="showDropdown" class="popup">
      <div class="popup-main">
        <div class="popup-title">
          <div style="display:flex;justify-content:space-between;align-items:center">
            <h3>Add Sections</h3>
            <button
              type="button"
              @click="isURLBuilderVisible = true"
              class="btn btn-primary btn-small"
            >URL Builder</button>
          </div>
        </div>
        <div class="popup-body">
          <div class="form-control">
            <label>Title</label>
            <input v-model="title" type="text" style="width:70%" />
          </div>

          <div class="form-control">
            <label>Carousel Type</label>
            <select v-model="carousel_type" style="width:70%">
              <option value="1">Single Image Category</option>
              <option value="2">Multiple Products</option>
              <option value="3">Single Category</option>
            </select>
          </div>

          <div class="form-control" v-show="carousel_type != 3">
            <label>Image</label>
            <input type="file" ref="fileInputAdd" style="width:70%" />
          </div>

          <div class="form-control">
            <label>Sub-Title</label>
            <input v-model="subtitle" type="text" style="width:70%" />
          </div>

          <div class="form-control" v-if="carousel_type != 2">
            <label>URL</label>
            <input type="text" v-model="url" style="width:70%" />
          </div>
        </div>
        <div class="popup-action">
          <div class="pointer" @click="addCarousels">Save</div>
          <div class="pointer" @click="closeDropdownPanel">Cancel</div>
        </div>
      </div>
    </div>

    <div v-show="editDropdown" class="popup">
      <div class="popup-main">
        <div class="popup-title">
          <h3>Edit Section</h3>
          <button
            type="button"
            @click="isURLBuilderVisible = true"
            class="btn btn-primary btn-small"
          >URL Builder</button>
        </div>
        <div class="popup-body">
          <div class="form-control">
            <label>Title</label>
            <input v-model="editingCarousel.title" type="text" style="width:70%" />
          </div>
          <!-- 
          <div class="form-control">
            <label>Carousel Type</label>
            <select v-model="editingCarousel.carousel_type" style="width:70%">
              <option value="1">Single Category</option>
              <option value="2">Multiple Products</option>
            </select>
          </div>-->

          <div class="form-control">
            <label>Image</label>
            <input type="file" ref="fileInput" style="width:70%" />
          </div>

          <div class="form-control">
            <label>Sub-Title</label>
            <input v-model="editingCarousel.subtitle" type="text" style="width:70%" />
          </div>

          <div class="form-control" v-if="editingCarousel.carousel_type != 2">
            <label>URL</label>
            <input type="text" v-model="editingCarousel.url" style="width:70%" />
          </div>
        </div>
        <div class="popup-action">
          <div class="pointer" @click="saveCarousel">Save</div>
          <div class="pointer" @click="editDropdown = false">Cancel</div>
        </div>
      </div>
    </div>

    <div class="specification">
      <div class="holder">
        <div
          class="column-padding header-bottom"
          style="display: flex; justify-content: space-between"
        >
          <div>
            <h3>All Homepage Sections</h3>
            <p>Here you can add clickable homepage image sections</p>
          </div>
          <button class="btn btn-red white-text" @click="openDropdownPanel">Add Sections</button>
        </div>

        <div class="row">
          <vue-good-table :columns="columns" :rows="allCarousels" :line-numbers="true">
            <template slot="table-row" slot-scope="props">
              <span v-if="props.column.field === 'action'">
                <button
                  type="button"
                  v-if="props.row.carousel_type == 2"
                  @click="customizeCarousel(props.row.id)"
                  class="btn btn-success"
                >Customize</button>
                <button
                  type="button"
                  @click="editCarousel(props.row.id)"
                  class="btn btn-primary"
                >Edit</button>
              </span>
              <span v-else-if="props.column.field === 'carousel_type'">
                <p v-if="props.row.carousel_type == 2">{{props.row.carousel_type}} ( Grouped )</p>
                <p v-else>{{props.row.carousel_type}} ( Single Category Products )</p>
              </span>
              <span v-else-if="props.column.field === 'img'">
                <a
                  v-if="props.row.img != null"
                  target="_blank"
                  :href="props.row.img"
                >{{props.row.img}}</a>
                <p v-else>Not Applicable</p>
              </span>
              <span v-else-if="props.column.field === 'url'">
                <a
                  v-if="props.row.carousel_type == 1"
                  target="_blank"
                  :href="props.row.url"
                >{{props.row.url}}</a>
                <p v-else>Not Applicable</p>
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
import URL from "@/components/Url_Builder";

export default {
  data: () => ({
    allCarousels: [],
    editingCarousel: {},
    origin: process.env.BASE_URL + "/search",
    showDropdown: false,
    showDropdown1: false,
    editDropdown: false,
    isURLBuilderVisible: false,
    columns: [
      {
        label: "Title",
        field: "title",
        width: "250px"
      },
      {
        label: "Subtitle",
        field: "subtitle",
        width: "200px"
      },
      {
        label: "Image",
        field: "img",
        width: "100px"
      },
      {
        label: "URL",
        field: "url",
        width: "200px"
      },
      {
        label: "Action",
        field: "action",
        width: "250px"
      }
    ],
    title: "",
    carousel_type: 1,
    subtitle: "",
    url: "",
    img: ""
  }),

  components: {
    URL
  },

  mounted() {
    this.GetAllCarousels();
  },
  methods: {
    handleFileUpload: function() {
      this.img = this.$refs.fileInput.files[0];
    },
    GetAllCarousels: function() {
      this.$store.dispatch("GetAllCarousels").then(res => {
        console.log(res);
        this.allCarousels = JSON.parse(JSON.stringify(res.data));
        // .filter(
        //   v => v.carousel_type == 1
        // );
      });
    },
    addCarousels: function() {
      // var payload = {
      //   title: this.title,
      //   url: this.url,
      //   subtitle: this.subtitle,
      //   carousel_type: this.carousel_type
      // };

      // if (this.$refs.fileInput.files.length == 1) {
      //   payload.img = this.$refs.fileInput.files[0];
      // }

      var payload = new FormData();

      payload.append("title", this.title);
      payload.append("url", this.url);
      payload.append("subtitle", this.subtitle);
      payload.append("carousel_type", this.carousel_type);

      if (this.$refs.fileInputAdd.files.length == 1) {
        payload.append("img", this.$refs.fileInputAdd.files[0]);
      }

      console.log(payload);

      this.$store.dispatch("createcarousel", payload).then(res => {
        console.log(res);
        this.GetAllCarousels();
        this.closeDropdownPanel();
      });
    },
    saveCarousel: function() {
      // var payload = {
      //   title: this.editingCarousel.title,
      //   url: this.editingCarousel.url,
      //   subtitle: this.editingCarousel.subtitle,
      //   carousel_type: this.editingCarousel.carousel_type
      // };

      var payload = new FormData();

      payload.append("title", this.editingCarousel.title);
      payload.append("url", this.editingCarousel.url);
      payload.append("subtitle", this.editingCarousel.subtitle);
      payload.append("carousel_type", this.editingCarousel.carousel_type);

      if (this.$refs.fileInput.files.length == 1) {
        payload.append("img", this.$refs.fileInput.files[0]);
      }

      var id = this.editingCarousel.id;

      console.log(payload);

      this.$store
        .dispatch("edithomepagecarouseldetails", { payload, id })
        .then(res => {
          console.log(res);
          this.GetAllCarousels();
          this.editDropdown = false;
        });
    },
    customizeCarousel: function(id) {
      console.log(id);

      this.$cookies.set("customizeCarousel", id, {
        path: "/admin",
        // httpOnly : true,
        // secure: true,
        maxAge: 60 * 60 * 24 * 7
      });

      this.$router.push("/dashboard/homepage/new/create");
    },
    editCarousel: function(id) {
      console.log(id);
      this.editingCarousel = this.allCarousels.filter(v => v.id === id)[0];
      this.editDropdown = true;
    },
    deleteBanner: function(id) {
      this.$store.dispatch("editDeleteBanner", id).then(res => {
        console.log(res);
        this.getAllBanner();
      });
    },
    openDropdownPanel: function() {
      this.showDropdown = true;
    },
    closeDropdownPanel: function() {
      this.showDropdown = false;
      this.title = "";
      this.subtitle = "";
      this.url = "";
      this.carousel_type = 1;
    }
  }
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
</style>
