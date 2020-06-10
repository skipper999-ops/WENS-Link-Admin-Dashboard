<template>
  <div class="navbar-spacing padding-top-30">
    <div v-if="showDropdown" class="popup">
      <div class="popup-main">
        <div class="popup-title">
          <h3>Error</h3>
        </div>
        <div class="popup-body">
          <div>
            <div v-for="(p, index) in error" :key="p.id">
              <p style="font-size:15px;font-weight: bold">{{ index }}</p>
              <p style="margin-bottom: 15px">{{ p[0] }}</p>
            </div>
          </div>
        </div>
        <div class="popup-action">
          <div class="pointer" @click="closeSubCatModel">Cancel</div>
        </div>
      </div>
    </div>

    <div class="specification">
      <div class="holder">
        <div class="column-padding header-bottom">
          <h3 style="display: flex;align-items: center;">Add a Product to your catalogue</h3>
          <p style="padding-left: 19px;padding-bottom: 10px;">
            Product added here will be added to a common database and vendors
            can use these as templates when adding their products
          </p>
          <!-- <button class="btn btn-red" style="display: flex;align-items: center;">
            <i data-feather="upload"></i>
            <p class="padding-left-10 white-text">Upload New</p>
          </button>-->
        </div>

        <div class="holder" v-if="selected.length != 0">
          <div class="product-detail-row">
            <div class="header-row">{{ selected.product_name }}</div>
            <div class="detail-row">
              <div class="column-left">
                <img class="product-image" :src="baseurl + '/backend/api/products/image/200/40/' + images[0]" />
              </div>
              <div class="column-right">
                <span>
                  <b>Item Name (aka Title):</b>
                  {{ selected.product_name }}
                </span>
                <span>
                  <b>Product ID:</b>
                  {{ selected.product_id }}
                </span>
                <span>
                  <b>Brand:</b>
                  {{ selected.brand }}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <p>No Product Found</p>
        </div>
      </div>

      <div class="holder" v-if="selected.slug != ''">
        <h3 class>Submit Product</h3>
        <div style="padding-left: 19px;padding-bottom: 10px;" class>
          <button
            class="btn btn-primary"
            @click="updateProduct"
            :disabled="selected.slug == ''"
          >Update Product</button>
        </div>
      </div>

      <div
        class="holder no-pad"
        v-show="subcategory_selected != undefined && subcategory_selected != 0"
      >
        <div class="element-tab-view">
          <input type="radio" id="tab1" name="tab" checked />
          <label for="tab1">
            <i class="fa fa-code"></i> Basic
          </label>
          <input type="radio" id="tab2" name="tab" />
          <label for="tab2">
            <i class="fa fa-history"></i> Descriptions
          </label>
          <input type="radio" id="tab3" name="tab" />
          <label for="tab3">
            <i class="fa fa-pencil"></i> Images
          </label>
          <input type="radio" id="tab4" name="tab" />
          <label for="tab4">
            <i class="fa fa-share-alt"></i> Specifications
          </label>
          <input type="radio" id="tab5" name="tab" />
          <label for="tab5">
            <i class="fa fa-share-alt"></i> Shipping
          </label>
          <div class="line"></div>
          <div class="content-container">
            <div class="content basic" id="c1">
              <div class="bg-white">
                <div class="column-padding">
                  <!-- <h3 style="display: flex;align-items: center;">Basic Details</h3> -->
                  <!-- <p
                    style="padding-left: 19px;padding-bottom: 10px;color:#E91E63"
                  >These informations cannot be changed by the Vendors</p>-->
                </div>

                <div class="row">
                  <div class="col s24">
                    <div class="col s24 m8 l6">
                      <label>Category</label>
                      <select @change="getSubcategories" v-model="category_selected">
                        <option v-for="p in category" :key="p.id" :value="p.id">
                          {{
                          p.name
                          }}
                        </option>
                      </select>
                    </div>
                    <div class="col s24 m8 l6">
                      <label>SubCategory</label>
                      <select v-model="subcategory_selected">
                        <option v-for="p in subcategory" :key="p.id" :value="p.id">
                          {{
                          p.name
                          }}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col s24">
                    <div class="col s24 m16">
                      <div class="form-group">
                        <label for="exampleInputEmail1">Product Name</label>
                        <input
                          type="text"
                          @input="slugifyTitle"
                          v-model="selected.product_name"
                          class="form-control"
                          placeholder="Redmi 7A ( 32GB , 2 GB ) Black"
                        />
                      </div>
                    </div>
                    <div class="col s24 m16">
                      <div class="form-group">
                        <div
                          style="display: flex;justify-content: space-between;align-items: center;"
                        >
                          <label style="display:flex" for="exampleInputEmail1">Product Slug</label>
                          <div v-if="!editSlug" @click="allowSlugField(1)" class="link_tag">Edit</div>
                          <div v-if="editSlug" @click="allowSlugField(0)" class="link_tag">Save</div>
                        </div>
                        <input
                          v-model="selected.slug"
                          :disabled="editSlug == 0"
                          class="form-control"
                          placeholder="redmi-7a-32gb-2-gb-black"
                        />
                      </div>
                    </div>
                    <div class="col s24 m16">
                      <div class="form-group">
                        <label for="exampleInputEmail1">Brand</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="selected.brand"
                          placeholder="Xiaomi"
                        />
                      </div>
                    </div>
                    <div class="col s24 m16">
                      <div class="form-group">
                        <label for="exampleInputEmail1">Suggested Price</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="suggested_price"
                          placeholder="0"
                        />
                      </div>
                    </div>
                    <div class="col s24 m16">
                      <div class="form-group">
                        <label for="exampleInputEmail1">Manufacturer</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="selected.manufacturer"
                          placeholder="Xiaomi"
                        />
                      </div>
                    </div>
                    <div class="col s24 m16">
                      <div class="form-group">
                        <label for="exampleInputEmail1">Search Terms (SEO)</label>
                        <input
                          type="text"
                          v-model="selected.seo"
                          class="form-control"
                          placeholder="Terms that will describe this product"
                        />
                      </div>
                    </div>
                    <div class="col s24 m16">
                      <div class="form-group">
                        <label for="exampleInputEmail1">Product ID</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="selected.product_id"
                          aria-describedby="emailHelp"
                          placeholder="UPC, EAN, GCID, GTIN, ASIN"
                        />
                      </div>
                    </div>
                    <div class="col s24 m16">
                      <div class="form-group">
                        <label for="exampleInputEmail1">Product ID Type</label>
                        <select v-model="selected.product_id_type">
                          <option
                            v-for="p in product_id_list"
                            :key="p.id"
                            :value="p.id"
                          >{{ p.name }}</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="content description" id="c2">
              <div class="bg-white">
                <div class="column-padding">
                  <!-- <h3 style="display: flex;align-items: center;">Descriptions & Bullet Points</h3> -->
                  <p
                    style="padding-left: 19px;padding-bottom: 10px;color:#E91E63"
                  >These informations cannot be changed by the Vendors</p>
                </div>

                <div class="row">
                  <div class="col s24">
                    <div class="col s24">
                      <div class="form-group">
                        <label for="exampleInputEmail1">Write a Short Description about the product</label>
                        <textarea v-model="selected.description" style="height:160px"></textarea>
                      </div>
                    </div>
                    <div class="col s24">
                      <div class="form-group">
                        <label for="exampleInputEmail1">Add Bullet Points (Upto 9)</label>
                        <div
                          style="display: flex; align-items:center"
                          v-for="(p, index) in bullet_points"
                          :key="p.length"
                        >
                          <input type="text" class="form-control" v-model="p.value" />
                          <div
                            style="color: red"
                            class="pointer"
                            @click="removeBullets(index)"
                          >Remove</div>
                        </div>
                        <div class="link_tag" @click="addMoreBullets">+ Add More points</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="content images" id="c3">
              <div class="bg-white">
                <!-- <h3 class>Images</h3> -->
                <p style="padding-left: 19px;padding-bottom: 10px;">Upload Images. (Max 10)</p>
                <div style="padding-left: 19px;padding-bottom: 10px;" class>
                  <div class="dropzone dz-clickable" id="myDrop">
                    <div class="dz-default dz-message" data-dz-message>
                      <span>Drop files here to upload</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="content" id="c4">
              <div class="bg-white">
                <div v-if="selected.specs == ''">
                  <p style="padding-left: 19px;padding-bottom: 10px;">
                    Specifications not added. Go to
                    <nuxt-link
                      :to="
                '/dashboard/templates/specification/' +
                  this.subcategory_selected
              "
                    >Specifications</nuxt-link>and add them
                  </p>
                </div>
                <!-- <p>Please Complete the specification section</p> -->
                <div v-if="specs != '{}'">
                  <div
                    v-for="(p, index) in specs"
                    :key="p.id"
                    class="input_fields_wrap drag-list"
                    id="h"
                  >
                    <h3>{{ p.name }}</h3>
                    <div class="row">
                      <div class="col s12">
                        <div class="col s24" v-for="(q, index1) in p['sub']" :key="q.id">
                          <div class="form-group">
                            <label>{{ q.name }}</label>

                            <div v-if="q.type == 1">
                              <input type="text" :id="q.id" v-model="q.value" />
                            </div>

                            <div style="display: flex;" v-if="q.type == 2">
                              <select
                                v-model="q.value"
                                :id="q.id"
                                style="display: inline-block; width: 100% "
                              >
                                <option :value="undefined">Not Selected</option>

                                <option
                                  v-for="r in q.dropdown_items"
                                  :key="r.id"
                                  :value="r.name"
                                >{{ r.name }}</option>
                              </select>
                            </div>

                            <div style="display: flex;" v-if="q.type == 3">
                              <input type="text" :class="q.id" v-model="q.value" />
                              <select
                                v-model="q.dropdown"
                                :class="q.id"
                                style="display: inline-block; width: 40%"
                              >
                                <option :value="undefined">Not Selected</option>
                                <option
                                  v-for="r in q.dropdown_items"
                                  :key="r.id"
                                  :value="r.name"
                                >{{ r.name }}</option>
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
            <div class="content shipping" id="c5">
              <div class="bg-white">
                <!-- <h3>Shipping Details</h3> -->
                <p
                  style="padding-left: 19px;padding-bottom: 10px;color:#E91E63"
                >Shipping Information Based on ShipRocket</p>
                <div class="row">
                  <div class="col s24">
                    <div class="col s24 m16">
                      <div class="form-group small">
                        <label for="exampleInputEmail1">Length (Length in cms. More than 0.5 cm)</label>
                        <input type="number" v-model="length" class="form-control" placeholder />
                        <span class="input_span_right">cms</span>
                      </div>
                    </div>
                    <div class="col s24 m16">
                      <div class="form-group small">
                        <label for="exampleInputEmail1">Breadth (Breadth in cms. More than 0.5 cm)</label>
                        <input type="number" v-model="breadth" class="form-control" placeholder />
                        <span class="input_span_right">cms</span>
                      </div>
                    </div>
                    <div class="col s24 m16">
                      <div class="form-group small">
                        <label for="exampleInputEmail1">Height (Height in cms. More than 0.5 cm)</label>
                        <input type="number" v-model="height" class="form-control" placeholder />
                        <span class="input_span_right">cms</span>
                      </div>
                    </div>
                    <div class="col s24 m16">
                      <div class="form-group small">
                        <label for="exampleInputEmail1">Weight (Weight in kgs. More than 0)</label>
                        <input type="number" v-model="weight" class="form-control" placeholder />
                        <span class="input_span_right">kgs</span>
                      </div>
                    </div>
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
  data() {
    return {
      category: [],
      subcategory: [],
      product_id: this.$cookies.get("product_edit"),
      selected: [],
      subcategory_selected: 0,
      category_selected: 0,
      images: [],
      product_name: "",
      bullet_points: [],
      error: {},
      showDropdown: false,
      slugify: "",
      editSlug: 0,
      not_similar: 0,
      product_id_list: [
        {
          id: 1,
          name: "UPC"
        },
        {
          id: 2,
          name: "EAN"
        },
        {
          id: 3,
          name: "GCID"
        },
        {
          id: 4,
          name: "GTIN"
        },
        {
          id: 5,
          name: "ASIN"
        }
      ],
      specs: [],
      vs: this,
      baseurl: process.env.BASE_URL,
      length: 0,
      suggested_price: 0,
      breadth: 0,
      height: 0,
      weight: 0
    };
  },

  mounted() {
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
        Authorization: "Bearer " + vm.$cookies.get("access_token"),
        "Cache-Control": null,
        "X-Requested-With": null
      },
      renameFilename: function(filename) {
        console.log(filename);
        console.log(
          vm.product_name + "_" + new Date().getTime() + "_" + filename
        );
        return vm.product_name + "_" + new Date().getTime() + "_" + filename;
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
    this.myDropzone.on("successmultiple", function(file, message) {
      console.log("success");
      console.log(file, message);
      console.log(file);
      message.filenames.forEach((file, index) => {
        vm.images.push(file.filename);
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
      if (!file.upload) {
        vm.images = vm.images.filter(v => v != file.name);
      } else {
        vm.images = vm.images.filter(v => v != file.upload.filename);
      }
    });
    this.myDropzone.on("addedfile", function(file) {
      console.log("added file");
      console.log(this.files.length);
      console.log(this.options.maxFiles);
      while (this.files.length > this.options.maxFiles) {
        this.removeFile(this.files[10]);
      }
    });

    this.$store.dispatch("getSingleProduct", this.product_id).then(res => {
      console.log(res);
      this.selected = res.data;
      this.images = JSON.parse(this.selected.images);
      this.subcategory_selected = this.selected.subcategory.id;
      this.product_name = this.selected.product_name;
      this.category_selected = this.selected.category.id;
      this.length = this.selected.length;
      this.breadth = this.selected.breadth;
      this.height = this.selected.height;
      this.weight = this.selected.weight;
      this.bullet_points = JSON.parse(this.selected.bullet_points);
      this.selected.specs = JSON.parse(this.selected.specs);

      this.specs = JSON.parse(this.selected.subcategory.specs);

      for (var i = 0; i < this.images.length; i++) {
        var mockFile = { name: this.images[i] };
        this.myDropzone.options.addedfile.call(this.myDropzone, mockFile);
        this.myDropzone.options.thumbnail.call(
          this.myDropzone,
          mockFile,
          this.baseurl + '/backend/api/products/image/200/40/' + this.images[i]
        );
        this.myDropzone.files.push(mockFile);
        mockFile.previewElement.classList.add("dz-complete");
      }

      console.log(this.myDropzone.getAcceptedFiles());

      this.$store.dispatch("getCategory").then(res => {
        console.log(res);
        this.category = res.data;
        this.getSubcategories();
      });

      setTimeout(function() {
        for (let key1 in vm.selected.specs) {
          var specs = vm.selected.specs;

          var template_specs = vm.specs;

          if (template_specs.hasOwnProperty(key1)) {
            console.log(specs);

            for (let key2 in specs[key1].sub) {
              console.log(key1);
              var sub = vm.specs[key1].sub;

              if (sub.hasOwnProperty(key2)) {
                if (specs[key1].sub[key2].type == 3) {
                  vm.$set(
                    vm.specs[key1].sub[key2],
                    "dropdown",
                    specs[key1].sub[key2].dropdown
                  );
                  vm.$set(
                    vm.specs[key1].sub[key2],
                    "value",
                    specs[key1].sub[key2].value
                  );
                } else {
                  vm.$set(
                    vm.specs[key1].sub[key2],
                    "value",
                    specs[key1].sub[key2].value
                  );
                  console.log(this.specs);
                }
              }
            }
          }
        }
      }, 100);
    });
  },
  watch: {
    product_name: function(newVal, oldVal) {
      // watch it
      console.log("Prop changed: ", newVal, " | was: ", oldVal);
      if (newVal != "") {
        this.vs.myDropzone.enable();
      } else {
        this.vs.myDropzone.disable();
      }
    }
  },
  methods: {
    updateProduct: function() {
      var payload = new FormData();
      payload.append("id", this.product_id);
      payload.append("product_name", this.product_name);
      payload.append("product_id", this.selected.product_id);
      payload.append("product_id_type", this.selected.product_id_type);
      payload.append("slug", this.selected.slug);
      payload.append("description", this.selected.description);
      payload.append("images", JSON.stringify(this.images));
      payload.append("category", this.category_selected);
      payload.append("subcategory", this.subcategory_selected);
      payload.append("brand", this.selected.brand);
      payload.append("manufacturer", this.selected.manufacturer);
      payload.append("seo", this.selected.seo);
      payload.append("suggested_price", this.suggested_price);
      payload.append("length", this.length);
      payload.append("breadth", this.breadth);
      payload.append("height", this.height);
      payload.append("weight", this.weight);
      payload.append("bullet_points", JSON.stringify(this.bullet_points));
      payload.append("specs", JSON.stringify(this.specs));

      this.$store
        .dispatch("updateProduct", {
          payload: payload,
          id: this.product_id
        })
        .then(res => {
          console.log(res);
          this.$router.push("/dashboard/products/all");
        })
        .catch(error => {
          this.error = error.response.data;
          this.openDropdownPanel();
        });
    },

    slugifyTitle: function() {
      console.log("Sdsd");
      this.selected.slug = this.selected.product_name
        .toLowerCase()
        .replace(/[^\w ]+/g, "")
        .replace(/ +/g, "-");
    },
    addMoreBullets: function() {
      if (this.bullet_points.length < 9) {
        this.bullet_points.push({ value: "" });
      }
    },
    removeBullets: function(index) {
      this.bullet_points.splice(index, 1);
    },
    getSubcategories: function() {
      this.$store
        .dispatch("getsubCategory", this.category_selected)
        .then(res => {
          console.log(res);
          console.log("________________");
          this.subcategory = res.data;
        });
    },

    allowSlugField: function(val) {
      console.log(val);

      this.editSlug = val;
    },
    openDropdownPanel: function() {
      this.showDropdown = true;
    },
    closeSubCatModel: function() {
      this.showDropdown = false;
    }
  }
};
</script>

<style scoped>
.product-detail-row {
  border: 1px solid #e7e7e7;
}

@media (max-width: 75em) {
  .product-detail-row {
    margin: 3%;
  }
}

@media (min-width: 75em) {
  .product-detail-row {
  }
}

.header-row {
  background-color: #f7f7f7;
  padding: 1rem;
  font-weight: 700;
  font-size: 0.9rem;
  display: block;
}

.detail-row {
  display: flex;
}

.column-left {
  flex: 1;
}

.column-right {
  flex: 1;
  padding: 1rem;
}

.column-right span {
  display: block;
  font-size: 1.2rem;
  line-height: 30px;
}

.column-right span a {
  text-decoration: none;
  cursor: pointer;
  font-weight: 700;
  color: #0066c0;
}

.column-right span a:hover {
  color: orange;
}

.product-image {
  width: 220px;
  height: 200px;
  padding: 2rem 1rem;
  object-fit: contain;
}

select,
input,
textarea {
  height: 35px;
  font-family: "Regular";
  margin: 0 10px 10px 0;
  border-radius: 0;
  outline: none;
  width: 100%;
  resize: vertical;
  font-size: 1rem;
  padding: 0.6rem 1rem;
  box-shadow: none;
  border: 1px solid rgb(169, 169, 169);
  transition: all 0.3s;
}

h3 {
  font-size: 20px;
  padding-left: 19px;
  padding-bottom: 10px;
}

h4 {
  font-size: 25px;

  padding-left: 19px;
  padding-bottom: 10px;
}

.holder {
  margin-bottom: 20px;
}

label {
  font-size: 15px;
  font-weight: 500;
  line-height: 30px;
  font-family: "Bold";
}

/* .form-group{
  display: flex;
    justify-content: space-between;
    align-items: baseline;
} */

.form-group {
  display: flex;
  flex-direction: column;
}

::-webkit-input-placeholder {
  /* Edge */
  color: #afafaf;
}

:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: #afafaf;
}

::placeholder {
  color: #afafaf;
}

.link_tag {
  color: blue;
  cursor: pointer;
  text-decoration: underline;
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
  height: 290px;
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

select,
input,
textarea {
  height: 35px;
  font-family: "Regular";
  margin: 0 10px 10px 0;
  border-radius: 0;
  outline: none;
  width: 100%;
  resize: vertical;
  font-size: 1rem;
  padding: 0.6rem 1rem;
  box-shadow: none;
  border: 1px solid rgb(169, 169, 169);
  transition: all 0.3s;
}

h3 {
  font-size: 20px;
  padding-left: 19px;
  padding-bottom: 10px;
}

h4 {
  font-size: 25px;

  padding-left: 19px;
  padding-bottom: 10px;
}

.holder {
  margin-bottom: 20px;
}

label {
  font-size: 13px;
  font-weight: 500;
  line-height: 30px;
  font-family: "Bold";
  white-space: nowrap;
}

/* .form-group{
  display: flex;
    justify-content: space-between;
    align-items: baseline;
} */

.form-group {
  display: flex;
  flex-direction: column;
}

::-webkit-input-placeholder {
  /* Edge */
  color: #afafaf;
}

:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: #afafaf;
}

::placeholder {
  color: #afafaf;
}

.link_tag {
  color: blue;
  cursor: pointer;
  text-decoration: underline;
}

.element-tab-view {
  position: relative;
}

.element-tab-view > input {
  display: none;
}
.element-tab-view > input:checked + label {
  background: #fff;
  color: #4caf50;
}
.element-tab-view > input#tab1:checked ~ .line {
  left: 0%;
}
.element-tab-view > input#tab1:checked ~ .content-container #c1 {
  opacity: 1;
  z-index: 93;
}
.element-tab-view > input#tab2:checked ~ .line {
  left: 136.146px;
}
.element-tab-view > input#tab2:checked ~ .content-container #c2 {
  opacity: 1;
  z-index: 93;
}
.element-tab-view > input#tab3:checked ~ .line {
  left: 270.646px;
}
.element-tab-view > input#tab3:checked ~ .content-container #c3 {
  opacity: 1;
  z-index: 93;
}
.element-tab-view > input#tab4:checked ~ .line {
  left: 406.802px;
}
.element-tab-view > input#tab4:checked ~ .content-container #c4 {
  opacity: 1;
  z-index: 93;
}
.element-tab-view > input#tab5:checked ~ .line {
  left: 542.948px;
}
.element-tab-view > input#tab5:checked ~ .content-container #c5 {
  opacity: 1;
  z-index: 93;
}
.element-tab-view > label {
  display: inline-block;
  font-size: 14px;
  height: 60px;
  line-height: 60px;
  width: 130px;
  text-align: center;
  background: #fff;
  color: #555;
  position: relative;
  -webkit-transition: 0.25s background ease;
  transition: 0.25s background ease;
  cursor: pointer;
  font-family: "Regular";
}
.element-tab-view > label::after {
  content: "";
  height: 2px;
  width: 100%;
  position: absolute;
  display: block;
  background: #fff;
  bottom: 0;
  opacity: 0;
  left: 0;
  -webkit-transition: 0.25s ease;
  transition: 0.25s ease;
}
.element-tab-view > label:hover::after {
  opacity: 1;
}
.element-tab-view > .line {
  position: absolute;
  background: #4caf50;
  width: 130px;
  top: 56px;
  left: 0;
  -webkit-transition: 0.25s ease;
  transition: 0.25s ease;
  height: 3px;
  top: 57px;
  z-index: 99;
}
.element-tab-view > .content-container {
  background: #fff;
  position: relative;
  /* height: 100px; */
  font-size: 16px;
  border-top: 1px solid #dbdbdb;
}
.element-tab-view > .content-container .content {
  position: absolute;
  /* padding: 10px; */
  width: 100%;
  top: 0;
  opacity: 0;
  -webkit-transition: 0.25s ease;
  transition: 0.25s ease;
  color: #333;
}
.element-tab-view > .content-container .content h3 {
  font-weight: 200;
  margin: 10px 0;
}
.element-tab-view > .content-container .content p {
  margin: 10px 0;
}
.element-tab-view > .content-container .content p,
.element-tab-view > .content-container .content i {
  font-size: 13px;
}

.toggle-button-cover {
  display: table-cell;
  position: relative;
  width: 200px;
  /* height: 140px; */
  box-sizing: border-box;
}

.button-cover {
  /* height: 100px; */
  margin: 20px;
  background-color: #fff;
  /* box-shadow: 0 10px 20px -8px #c5d6d6; */
  border-radius: 4px;
}

/* .button-cover:before {
  counter-increment: button-counter;
  content: counter(button-counter);
  position: absolute;
  right: 0;
  bottom: 0;
  color: #d7e3e3;
  font-size: 12px;
  line-height: 1;
  padding: 5px;
} */

.button-cover,
.knobs,
.layer {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.button {
  position: relative;
  top: 50%;
  width: 74px;
  height: 36px;
  margin: -20px auto 0 auto;
  overflow: hidden;
}

.button.r,
.button.r .layer {
  border-radius: 100px;
}

.button.b2 {
  border-radius: 2px;
}

.checkbox {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  opacity: 0;
  cursor: pointer;
  z-index: 3;
}

.knobs {
  z-index: 2;
}

.layer {
  width: 100%;
  background-color: #efefef;
  transition: 0.3s ease all;
  z-index: 1;
}

/* Button 3 */
#button-3 .knobs:before {
  content: "";
  position: absolute;
  top: 4px;
  left: 4px;
  width: 30px;
  height: 30px;
  color: #fff;
  font-size: 10px;
  font-weight: bold;
  text-align: center;
  line-height: 1;
  padding: 11px 4px;
  background-color: #b5b5b5;
  border-radius: 50%;
  transition: 0.3s ease all, left 0.3s cubic-bezier(0.18, 0.89, 0.35, 1.15);
}

#button-3 .checkbox:active + .knobs:before {
  width: 46px;
  border-radius: 100px;
}

#button-3 .checkbox:checked:active + .knobs:before {
  margin-left: -26px;
}

#button-3 .checkbox:checked + .knobs:before {
  content: "";
  left: 42px;
  background-color: #2196f3;
}

#button-3 .checkbox:checked ~ .layer {
  background-color: #d4ecff;
}

.red-text {
  color: red;
}

@media (min-width: 767.98px) {
  .form-group.small {
    width: 180px;
  }
}

.input_span_right {
  position: absolute;
  right: 0;
  top: 31px;
  bottom: 0;
  /* margin: auto 0; */
  width: 72px;
  height: 33px;
  background-color: #2196f3;
  line-height: 33px;
  text-align: center;
  border-radius: 0;
  color: white;
}
</style>
