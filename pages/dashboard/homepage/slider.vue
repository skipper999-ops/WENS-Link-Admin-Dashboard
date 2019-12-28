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

          <!-- <div class="form-control">
            <label>URL</label>
            <input type="text" style="width:70%" />
          </div> -->

          <!-- <div class="form-control">
            <label>Status</label>
            <select v-model="status" style="width:70%">
              <option value="0">Inactive</option>
              <option value="1">Active</option>
            </select>
          </div> -->
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
          <button class="btn btn-red white-text" @click="openDropdownPanel">
            Add Banner
          </button>
        </div>

        <div class="row">
          <vue-good-table
            :columns="columns"
            :rows="allBanners"
            :line-numbers="true"
          >
            <template slot="table-row" slot-scope="props">
              <span v-if="props.column.field === 'action'">
                <button
                  type="button"
                  @click="viewBanner(props.row.image)"
                  class="btn btn-primary"
                >
                  View Banner
                </button>
                <button
                  type="button"
                  @click="deleteBanner(props.row.id)"
                  class="btn btn-primary"
                >
                  Delete
                </button>
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
    showDropdown: false,
    columns: [
      {
        label: "Title",
        field: "name"
      },
      {
        label: "Description",
        field: "description"
      },
      // {
      //   label: "Banner",
      //   field: "image"
      // },
      // {
      //   label: "Path",
      //   field: "url"
      // },
      // {
      //   label: "Status",
      //   field: "status"
      // },
      {
        label: "Action",
        field: "action"
      }
    ],
    name: "",
    description: "",
    status: 1,
    image: ""
  }),

  mounted() {
    this.getAllBanner();

    var vm = this;
    Dropzone.autoDiscover = false;
    this.myDropzone = new Dropzone("div#myDrop", {
      paramName: "file",
      autoProcessQueue: true,
      parallelUploads: 1,
      maxFiles: 1,
      maxFilesize: 5, // MB
      acceptedFiles: ".png, .jpeg, .jpg",
      url: vm.$store.state.api.bannerImageUpload,
      headers: {
        "Cache-Control": null,
        "X-Requested-With": null
      },
      renameFilename: function(filename) {
        console.log(filename);
        console.log("zzzzzzzzzzzzzzz");
        return new Date().getTime() + "_" + filename;
      }
    });
    this.myDropzone.on("sending", function(file, xhr, formData) {
      var filenames = [];
      console.log("success");
      $(".dz-preview .dz-filename").each(function() {
        filenames.push(
          $(this)
            .find("span")
            .text()
        );
      });
      formData.append("filenames", filenames);
    });
    /* Add Files Script*/
    this.myDropzone.on("success", function(file, message) {
      console.log("success");
      console.log(file, message);
      console.log(file);
      message.filenames.forEach((file, index) => {
        vm.image = file.filename;
      });
    });
    this.myDropzone.on("error", function(data) {
      $("#msg").html(
        '<div class="alert alert-danger">There is some thing wrong, Please try again!</div>'
      );
    });
    this.myDropzone.on("complete", function(file) {
      //   myDropzone.removeFile(file)
    });
    this.myDropzone.on("removedfile", function(file) {
      //   myDropzone.removeFile(file)
      console.log(file);
      vm.image = ""
    });
    this.myDropzone.on("addedfile", function(file) {
      console.log("added file");
      console.log(this.files.length);
      console.log(this.options.maxFiles);
      while (this.files.length > this.options.maxFiles) {
        this.removeFile(this.files[0]);
      }
    });
    $("#add_file").on("click", function() {
      console.log("success");
      this.myDropzone.processQueue();
    });
  },
  methods: {
    getAllBanner: function() {
      this.$store.dispatch("getAllBanner").then(res => {
        console.log(res);
        this.allBanners = JSON.parse(JSON.stringify(res.data));
      });
    },
    addBanner: function() {

      var payload = {
        name: this.name,
        description: this.description,
        status: this.status,
        image: this.image
      }

      this.$store.dispatch("addBanner", payload).then(res => {
        console.log(res);
        this.getAllBanner();
        this.closeDropdownPanel()
      });
    },
    viewBanner: function(id) {
      window.open(process.env.baseUrl + "/media/banners/" + id)
    },
    deleteBanner: function(id){
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
       this.name = ""
      this.description = ""
      this.myDropzone.removeAllFiles()
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
