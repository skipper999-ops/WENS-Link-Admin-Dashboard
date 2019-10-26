<template>
  <div class="navbar-spacing padding-top-30">
    <div class="specification">
      <div class="holder">
        <div
          class="column-padding header-bottom"
          style="display: flex; justify-content: space-between"
        >
          <h3 style="display: flex;align-items: center;">Add New Product</h3>
          <!-- <button class="btn btn-red" style="display: flex;align-items: center;">
            <i data-feather="upload"></i>
            <p class="padding-left-10 white-text">Upload New</p>
          </button>-->
        </div>

        <div class="row">
          <div class="col s24">
            <div class="col s8">
              <label>Select Category</label>
              <select @change="getSubcategories" v-model="category_selected">
                <option v-for="p in category" :key="p.id" :value="p.id">{{p.name}}</option>
              </select>
            </div>
            <div class="col s8">
              <label>Select SubCategory</label>
              <select @change="getBrand" v-model="subcategory_selected">
                <option v-for="p in subcategory" :key="p.id" :value="p.id">{{p.name}}</option>
              </select>
            </div>
            <div class="col s8">
              <label>Select Brand</label>
              <select v-model="brand_selected">
                <option v-for="p in brand" :key="p.id" :value="p.id">{{p.name}}</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div class="holder">
        <div
          class="column-padding"
          style="display: flex; justify-content: space-between"
        >
          <h3 style="display: flex;align-items: center;">Basic Details</h3>
          <!-- <button class="btn btn-red" style="display: flex;align-items: center;">
            <i data-feather="upload"></i>
            <p class="padding-left-10 white-text">Upload New</p>
          </button>-->
        </div>

        <div class="row">
          <div class="col s24">
            <div class="col s24">
              <div class="form-group">
                <label for="exampleInputEmail1">Product Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="product_name"
                  aria-describedby="emailHelp"
                  placeholder="Add Product Name"
                />
              </div>
            </div>
            <div class="col s24">
              <div class="form-group">
                <label for="exampleInputEmail1">MRP</label>
                <input
                  type="text"
                  class="form-control"
                  id="product_name"
                  aria-describedby="emailHelp"
                  placeholder="Add Product Name"
                />
              </div>
            </div>
            <div class="col s24">
              <div class="form-group">
                <label for="exampleInputEmail1">Product Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="product_name"
                  aria-describedby="emailHelp"
                  placeholder="Add Product Name"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="holder">
        <h3 class>Images</h3>
        <p style="padding-left: 19px;padding-bottom: 10px;">Upload Images. (Max 10)</p>
        <div style="padding-left: 19px;padding-bottom: 10px;" class>
          <div class="dropzone dz-clickable" id="myDrop">
            <div class="dz-default dz-message" data-dz-message>
              <span>Drop files here to upload</span>
            </div>
          </div>
        </div>
      </div>
      <div class="holder">
         <h3>Specifications</h3>
         <!-- <p>Please Complete the specification section</p> -->
        <div v-for="(p, index) in specs" :key="p.id" class="input_fields_wrap drag-list" id="h">
          <h3>{{p.name}}</h3>
          <div class="row">
            <div class="col s12">
              <div class="col s24" v-for="(q, index1) in p['sub']" :key="q.id">
                <div class="form-group">
                  <label>{{q.name}}</label>

                  <div v-if="q.value == 1">
                    <input type="text" />
                  </div>

                  <div style="display: flex;" v-if="q.value == 2">
                    <select style="display: inline-block; width: 100% "
                    >
                      >
                      <option v-for="r in q.dropdown_items" :key="r.id" :value="r.value">{{r.name}}</option>
                    </select>
                  </div>

                  <div style="display: flex;" v-if="q.value == 3">
                    <input type="text"/>
                    <select style="display: inline-block; width: 30% ">
                      >
                      <option v-for="r in q.dropdown_items" :key="r.id" :value="r.value">{{r.name}}</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "my-component",
  data() {
    return {
      category: [],
      images: [],
      category_selected: 0,
      subcategory: [],
      subcategory_selected: 0,
      brand: [],
      specs: [
        {
          name: "Header 1",
          sub: [
            {
              name: "data 1",
              value: "3",
              dropdown_items: [{ name: "11", value: 1 }, { name: "ssss" }]
            },
            {
              name: "data 2",
              value: "2",
              dropdown_items: [{ name: "11", value: 1 }, { name: "222" }]
            },
            {
              name: "data 3",
              value: 1,
              dropdown_items: [{ name: "", value: 1 }]
            }
          ]
        },
        {
          name: "Header 2",
          sub: [
            {
              name: "data 1",
              value: "1",
              dropdown_items: [{ name: "", value: 1 }]
            },
            {
              name: "data 2",
              value: "2",
              dropdown_items: [{ name: "qqq", value: 1 }, { name: "www" }]
            },
            {
              name: "data 3",
              value: "3",
              dropdown_items: [{ name: "sssss", value: 1 }, { name: "ggggg" }]
            }
          ]
        }
      ],
      brand_selected: 0,
      columns: [
        {
          label: "Category",
          field: "name"
        },
        {
          label: "Age",
          field: "age",
          type: "number"
        },
        {
          label: "Created On",
          field: "createdAt",
          type: "date",
          dateInputFormat: "yyyy-MM-dd",
          dateOutputFormat: "MMM Do yy"
        },
        {
          label: "Action",
          field: "details"
        }
      ],
      rows: [
        {
          id: 1,
          name: "Mobile",
          age: 20,
          createdAt: "2011-10-31",
          details: "<p>asa</p>"
        }
      ]
    };
  },
  mounted() {
    this.$store.dispatch("getCategory").then(res => {
      console.log(res);
      this.category = res.data;
    });

    var vm = this;
    Dropzone.autoDiscover = false;
    this.myDropzone = new Dropzone("div#myDrop", {
      paramName: "file", // The name that will be used to transfer the file
      addRemoveLinks: true,
      uploadMultiple: true,
      autoProcessQueue: true,
      parallelUploads: 10,
      maxFiles: 10,
      maxFilesize: 5, // MB
      acceptedFiles: ".png, .jpeg, .jpg",
      url: vm.$store.state.api.imageUpload,
      headers: {
        // remove Cache-Control and X-Requested-With
        // to be sent along with the request
        "Cache-Control": null,
        "X-Requested-With": null
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
      console.log(message);
      vm.images.push(message.filename);
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
      vm.images = vm.images.filter(v => v != "static/products/" + file.name);
    });
    this.myDropzone.on("addedfile", function(file) {
      console.log("added file");
    });
    $("#add_file").on("click", function() {
      console.log("success");
      this.myDropzone.processQueue();
    });
  },
  methods: {
    getSubcategories: function() {
      this.$store
        .dispatch("getsubCategory", this.category_selected)
        .then(res => {
          console.log(res);
          this.subcategory = res.data;
        });
    },
    getBrand: function() {
      this.$store.dispatch("getBrand", this.subcategory_selected).then(res => {
        console.log(res);
        this.brand = res.data;
        
          this.getsubCategoryDetails()
      });
    },
    addProduct: function() {
      var payload = new FormData();
      payload.append("product_name", $("#product_name").val());
      payload.append("description", $("#description").val());
      payload.append("images", JSON.stringify(this.images));
      payload.append("category", this.category_selected);
      payload.append("subcategory", this.subcategory_selected);
      payload.append("brand", this.brand_selected);
      payload.append("price", $("#price").val());
      payload.append("discount", $("#discount").val());
      payload.append("seller_id", localStorage.getItem("currentUserID"));
      if (this.isActive == true) {
        payload.append("status", 1);
      } else {
        payload.append("status", 0);
      }
      this.$store.dispatch("addProduct", payload).then(res => {
        console.log(res);
        this.$router.push("/products/all");
      });
    },
        getsubCategoryDetails: function() {
      this.$store
        .dispatch("getsubCategoryDetails", this.subcategory_selected)
        .then(res => {
          console.log(res);
          console.log("response");
          if(res.data.specs.length != 0){
            this.specs = JSON.parse(res.data.specs)
          }
        })
        .catch(err => {
          console.log("error in request", err);
        });
    },
  }
};
</script>


<style>
select,
input {
  height: 35px;
  margin: 0 10px 10px 0;
  border-radius: 0;
  outline: none;
  width: 100%;
  font-size: 1rem;
  padding: 0.6rem 1rem;
  box-shadow: none;
  border: 1px solid rgb(169, 169, 169);
  transition: all 0.3s;
}

h3{
      font-size: 20px;
    padding-left: 19px;
    padding-bottom: 10px;
}

h4{
  font-size: 25px;
  
      padding-left: 19px;
    padding-bottom: 10px;
}

.holder{
  margin-bottom: 20px;
}

label {
    font-size: 15px;
    font-weight: 500;
    line-height: 30px;
}

/* .form-group{
  display: flex;
    justify-content: space-between;
    align-items: baseline;
} */
</style>