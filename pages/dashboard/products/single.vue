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
              <p style="font-size: 15px; font-weight: bold">{{ index }}</p>
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
          <h3 style="display: flex; align-items: center">
            Add a Product to your catalogue
          </h3>
          <p style="padding-left: 19px; padding-bottom: 10px">
            Product added here will be added to a common database and vendors
            can use these as templates when adding their products
          </p>
          <!-- <button class="btn btn-red" style="display: flex;align-items: center;">
            <i data-feather="upload"></i>
            <p class="padding-left-10 white-text">Upload New</p>
          </button>-->
        </div>

        <div class="row">
          <div class="col s24">
            <div class="col s24 m8 l6">
              <label>Category</label>
              <select @change="getSubcategories" v-model="category_selected">
                <option v-for="p in category" :key="p.id" :value="p.id">
                  {{ p.name }}
                </option>
              </select>
            </div>
            <div class="col s24 m8 l6">
              <label>SubCategory</label>
              <select
                @change="getsubCategoryDetails"
                v-model="subcategory_selected"
              >
                <option v-for="p in subcategory" :key="p.id" :value="p.id">
                  {{ p.name }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div
        class="holder"
        v-show="subcategory_selected != undefined && subcategory_selected != 0"
      >
        <h3 class>Submit Product</h3>
        <div
          style="
            display: flex;
            justify-content: space-between;
            align-items: center;
          "
        >
          <div style="padding-left: 19px; padding-bottom: 10px" class>
            <button
              class="btn btn-primary"
              @click="addProduct"
              :disabled="slugify == ''"
            >
              Add Product
            </button>
          </div>
          <!-- <div class="toggle-button-cover">
          <div class="button-cover">
            <div class="button r" id="button-3">
              <input type="checkbox" class="checkbox" />
              <div class="knobs"></div>
              <div class="layer"></div>
            </div>
          </div>
          </div>-->
        </div>
        OR
        <div
          style="
            display: flex;
            justify-content: space-between;
            align-items: center;
          "
        >
          <div style="padding-left: 19px; padding-bottom: 10px" class>
            <label>Fetch Data from Flipkart.com</label>
            <input type="text" v-model="url" />
          </div>
          <button class="btn btn-primary" @click="fetchProduct">Fetch</button>
        </div>
      </div>

      <div
        class="holder no-pad"
        v-show="subcategory_selected != undefined && subcategory_selected != 0"
      >
        <div class="element-tab-view">
          <input type="radio" id="tab1" name="tab" checked />
          <label for="tab1"> <i class="fa fa-code"></i> Basic </label>
          <input type="radio" id="tab2" name="tab" />
          <label for="tab2"> <i class="fa fa-history"></i> Descriptions </label>
          <input type="radio" id="tab3" name="tab" />
          <label for="tab3"> <i class="fa fa-pencil"></i> Images </label>
          <input type="radio" id="tab4" name="tab" />
          <label for="tab4">
            <i class="fa fa-share-alt"></i> Specifications
          </label>
          <input type="radio" id="tab5" name="tab" />
          <label for="tab5"> <i class="fa fa-share-alt"></i> Shipping </label>
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
                  <div class="col s24 m16">
                    <div class="col s24">
                      <div class="form-group">
                        <label for="exampleInputEmail1">
                          Product Name
                          <span class="red-text">*</span>
                        </label>
                        <input
                          type="text"
                          @input="slugifyTitle"
                          v-model="product_name"
                          class="form-control"
                          placeholder="Redmi 7A ( 32GB , 2 GB ) Black"
                        />
                      </div>
                    </div>
                    <div class="col s24">
                      <div class="form-group">
                        <div
                          style="
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                          "
                        >
                          <label style="display: flex" for="exampleInputEmail1">
                            Product Slug
                            <span class="red-text">*</span>
                          </label>
                          <div
                            v-if="!editSlug"
                            @click="allowSlugField(1)"
                            class="link_tag"
                          >
                            Edit
                          </div>
                          <div
                            v-if="editSlug"
                            @click="allowSlugField(0)"
                            class="link_tag"
                          >
                            Save
                          </div>
                        </div>
                        <input
                          v-model="slugify"
                          :disabled="editSlug == 0"
                          class="form-control"
                          placeholder="redmi-7a-32gb-2-gb-black"
                        />
                      </div>
                    </div>
                    <div class="col s24 m12">
                      <div class="form-group">
                        <label for="exampleInputEmail1">
                          Brand
                          <span class="red-text">*</span>
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="brand"
                          placeholder="Xiaomi"
                        />
                      </div>
                    </div>

                    <div class="col s24 m12">
                      <div class="form-group">
                        <label for="exampleInputEmail1">Manufacturer</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="manufacturer"
                          placeholder="Xiaomi"
                        />
                      </div>
                    </div>
                    <div class="col s24 m12">
                      <div class="form-group">
                        <label for="exampleInputEmail1">Original Price</label>
                        <input
                          type="number"
                          class="form-control"
                          v-model="mrp"
                          placeholder="0"
                        />
                      </div>
                    </div>
                    <div class="col s24 m12">
                      <div class="form-group">
                        <label for="exampleInputEmail1">Selling Price</label>
                        <input
                          type="number"
                          class="form-control"
                          v-model="price"
                          placeholder="0"
                        />
                      </div>
                    </div>
                    <div class="col s24 m16" v-show="false">
                      <div class="form-group">
                        <label for="exampleInputEmail1">Suggested Price</label>
                        <input
                          type="number"
                          class="form-control"
                          v-model="suggested_price"
                          placeholder="0"
                        />
                      </div>
                    </div>

                    <div class="col s24">
                      <div class="form-group">
                        <label for="exampleInputEmail1"
                          >Search Terms (SEO)</label
                        >
                        <input
                          type="text"
                          v-model="seo"
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
                          v-model="product_id"
                          aria-describedby="emailHelp"
                          placeholder="UPC, EAN, GCID, GTIN, ASIN"
                        />
                      </div>
                    </div>
                    <div class="col s24 m8">
                      <div class="form-group">
                        <label for="exampleInputEmail1">Product ID Type</label>
                        <select v-model="product_id_type">
                          <option
                            v-for="p in product_id_list"
                            :key="p.id"
                            :value="p.id"
                          >
                            {{ p.name }}
                          </option>
                        </select>
                      </div>
                    </div>
                    <div class="col s24 m16">
                      <div class="form-group">
                        <label for="exampleInputEmail1">SKU</label>
                        <input type="text" class="form-control" v-model="sku" />
                      </div>
                    </div>
                    <div class="col s24 m8">
                      <div class="form-group">
                        <label for="exampleInputEmail1">Stock Quantity</label>
                        <input
                          type="number"
                          v-model="stock"
                          class="form-control"
                          placeholder
                        />
                      </div>
                    </div>

                    <div class="col s24">
                      <div class="form-group">
                        <label for="exampleInputEmail1"
                          >Return Window (Days) (Set 0 if return not
                          allowed)</label
                        >
                        <input
                          type="number"
                          @input="changeText"
                          v-model="return_window"
                          class="form-control"
                          placeholder
                        />
                      </div>
                    </div>
                    <div class="col s24" v-if="return_window != 0">
                      <div class="form-group">
                        <label for="exampleInputEmail1"
                          >Return Policy Terms</label
                        >
                        <textarea
                          style="height: 130px"
                          type="number"
                          v-model="return_policy"
                          class="form-control"
                          placeholder
                        ></textarea>
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
                    style="
                      padding-left: 19px;
                      padding-bottom: 10px;
                      color: #e91e63;
                    "
                  >
                    These informations cannot be changed by the Vendors
                  </p>
                </div>

                <div class="row">
                  <div class="col s24">
                    <div class="col s24">
                      <div class="form-group">
                        <label for="exampleInputEmail1"
                          >Write a Short Description about the product</label
                        >
                        <textarea
                          v-model="desc"
                          style="height: 160px"
                        ></textarea>
                      </div>
                    </div>
                    <div class="col s24">
                      <div class="form-group">
                        <label for="exampleInputEmail1"
                          >Add Bullet Points (Upto 9)</label
                        >
                        <div
                          style="display: flex; align-items: center"
                          v-for="(p, index) in bullet_points"
                          :key="p.length"
                        >
                          <input
                            type="text"
                            class="form-control"
                            v-model="p.value"
                          />
                          <div
                            style="color: red"
                            class="pointer"
                            @click="removeBullets(index)"
                          >
                            Remove
                          </div>
                        </div>
                        <div class="link_tag" @click="addMoreBullets">
                          + Add More points
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="content images" id="c3">
              <div class="bg-white">
                <!-- <h3 class>Images</h3> -->
                <p style="padding-left: 19px; padding-bottom: 10px">
                  Upload Images. (Max 10)
                </p>
                <div style="padding-left: 19px; padding-bottom: 10px" class>
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
                <!-- <h3>Specifications</h3> -->
                <div v-if="specs == ''">
                  <p style="padding-left: 19px; padding-bottom: 10px">
                    Specifications not added. Go to
                    <nuxt-link
                      :to="
                        '/dashboard/templates/specification/' +
                        this.subcategory_selected
                      "
                      >Specifications</nuxt-link
                    >and add them
                  </p>
                </div>
                <div v-if="specs != ''">
                  <!-- <p style="padding-left: 19px;padding-bottom: 10px;">
                    You can edit
                    <nuxt-link
                      :to="'/dashboard/templates/specification/' + this.subcategory_selected"
                    >Specifications</nuxt-link>here
                  </p> -->
                </div>
                <!-- <p>Please Complete the specification section</p> -->
                <div v-if="specs != ''">
                  <div>
                    <div
                      class="white"
                      style="
                        margin: 10px 0;
                        width: 100%;
                        border: 1px solid #e6e6e6;
                        box-shadow: rgba(0, 0, 0, 0.03) 0px 2px 2px,
                          rgba(0, 0, 0, 0.03) 0px 1px 0px;
                      "
                    >
                      <div
                        class="section toolbar"
                        style="
                          display: flex;
                          justify-content: space-between;
                          border-bottom: 1px solid #e6e6e6;
                        "
                      >
                        <div
                          class="container"
                          style="display: flex; justify-content: space-between"
                        >
                          <div class="add-section" @click="add_section">
                            + Add Section
                          </div>
                          <!-- <div class="add-section grey">Reset to Default</div> -->
                        </div>
                      </div>
                      <div>
                        <div
                          class="spec-section white container"
                          id="templateHolder"
                        >
                          <div
                            v-for="(p, index) in data"
                            :key="p.id"
                            class="input_fields_wrap drag-list"
                            id="h"
                          >
                            <div
                              style="
                                display: flex;
                                justify-content: space-between;
                              "
                            >
                              <div
                                class="add_field_button"
                                @click="add_field(index)"
                              >
                                Add More Fields
                              </div>
                              <div
                                class="remove-section"
                                @click="remove_section(index)"
                              >
                                Remove Section
                              </div>
                            </div>
                            <br />
                            <input
                              type="text"
                              v-model="p.name"
                              class="header-data input"
                              placeholder="Header"
                              style="display: inline-block"
                            />
                            <div class="row">
                              <div
                                v-for="(q, index1) in p['sub']"
                                :key="q.id"
                                class="col s24"
                              >
                                <input
                                  class="input"
                                  placeholder="Field"
                                  id="data"
                                  v-model="q.name"
                                  type="text"
                                  style="display: inline-block; width: 35%"
                                />

                              
                                <input
                                  class="input"
                                  placeholder="Field"
                                  id="data"
                                  v-model="q.value"
                                  type="text"
                                  style="display: inline-block; width: 35%"
                                />

                                <select
                                  v-model="q.type"
                                  v-if="false"
                                  style="display: inline-block; width: 15%"
                                >
                                  <option value="1">Text</option>
                                  <option value="2">Dropdown</option>
                                  <option value="3">Mixed</option>
                                </select>

                                <select
                                  v-if="q.type == 2 || q.type == 3"
                                  style="display: inline-block; width: 20%"
                                >
                                  <option
                                    v-for="r in q.dropdown_items"
                                    :key="r.id"
                                    :value="r.type"
                                  >
                                    {{ r.name }}
                                  </option>
                                </select>

                                <div
                                  v-if="q.type == 2 || q.type == 3"
                                  @click="openDropdownPanel(index, index1)"
                                  class="right add_field_button"
                                  style="
                                    display: inline-block;
                                    text-decoration: none;
                                    font-size: 12px;
                                  "
                                >
                                  + Add
                                </div>

                                <div
                                  @click="remove_field(index, index1)"
                                  class="remove_field right"
                                  style="display: inline-block; font-size: 12px"
                                >
                                  Remove
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- <button class="btn" @click="saveSpecs">Save</button> -->
                  </div>
                </div>
              </div>
            </div>
            <div class="content shipping" id="c5">
              <div class="bg-white">
                <!-- <h3>Shipping Details</h3> -->
                <p
                  style="
                    padding-left: 19px;
                    padding-bottom: 10px;
                    color: #e91e63;
                  "
                >
                  Shipping Information Based on ShipRocket
                </p>
                <div class="row">
                  <div class="col s24">
                    <div class="col s24 m16">
                      <div class="form-group small">
                        <label for="exampleInputEmail1"
                          >Length (Length in cms. More than 0.5 cm)</label
                        >
                        <input
                          type="number"
                          v-model="length"
                          class="form-control"
                          placeholder
                        />
                        <span class="input_span_right">cms</span>
                      </div>
                    </div>
                    <div class="col s24 m16">
                      <div class="form-group small">
                        <label for="exampleInputEmail1"
                          >Breadth (Breadth in cms. More than 0.5 cm)</label
                        >
                        <input
                          type="number"
                          v-model="breadth"
                          class="form-control"
                          placeholder
                        />
                        <span class="input_span_right">cms</span>
                      </div>
                    </div>
                    <div class="col s24 m16">
                      <div class="form-group small">
                        <label for="exampleInputEmail1"
                          >Height (Height in cms. More than 0.5 cm)</label
                        >
                        <input
                          type="number"
                          v-model="height"
                          class="form-control"
                          placeholder
                        />
                        <span class="input_span_right">cms</span>
                      </div>
                    </div>
                    <div class="col s24 m16">
                      <div class="form-group small">
                        <label for="exampleInputEmail1"
                          >Weight (Weight in kgs. More than 0)</label
                        >
                        <input
                          type="number"
                          v-model="weight"
                          class="form-control"
                          placeholder
                        />
                        <span class="input_span_right">kgs</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- <hr class="break" /> -->

        <!-- <hr class="break">


        <div class="column-padding">
          <h3 style="display: flex;align-items: center;">Stock Management</h3>
          <p style="padding-left: 19px;padding-bottom: 10px;color:#E91E63"
          >These informations cannot be changed by the Vendors</p>
        </div>

        <div class="row">
          <div class="col s24">
            <div class="col s24">
              <div class="form-group">
                <label for="exampleInputEmail1">Write a Short Description about the product</label>
                <textarea style="height:160px"></textarea>
              </div>
            </div>
            <div class="col s24">
              <div class="form-group">
                <label for="exampleInputEmail1">Add Bullet Points (Upto 9)</label>
                <div style="display: flex; align-items:center" v-for="(p, index) in bullet_points" :key="p.length">
                  <input
                  type="text"
                  class="form-control"
                  v-model="p.value"
                />
                <div style="color: red" class="pointer" @click="removeBullets(index)">Remove</div>
                </div>
                <div class="link_tag" @click="addMoreBullets">Add More points</div>
              </div>
            </div>
          </div>
        </div>-->
      </div>
      <!-- <div class="holder" v-show="subcategory_selected != undefined && subcategory_selected != 0">

      </div>-->
      <!-- <div class="holder" v-if="subcategory_selected != undefined && subcategory_selected != 0">
        
      </div>-->
    </div>
  </div>
</template>

<script>
export default {
  name: "my-component",
  data() {
    return {
      category: [],
      subcategory: [],
      images: [],
      baseurl: process.env.BASE_URL,
      category_selected: 0,
      editSlug: 0,
      data: {},
      url: "",
      product_name: "",
      subcategory_selected: undefined,
      brand: [],
      product_id: "",
      product_id_type: "",
      slugify: "",
      error: {},
      showDropdown: false,
      brand: "",
      manufacturer: "",
      seo: "",
      desc: "",
      bullet_points: [],
      product_id_list: [
        {
          id: 1,
          name: "UPC",
        },
        {
          id: 2,
          name: "EAN",
        },
        {
          id: 3,
          name: "GCID",
        },
        {
          id: 4,
          name: "GTIN",
        },
        {
          id: 5,
          name: "ASIN",
        },
      ],
      product_id_type: 1,
      specs: [],
      brand_selected: 0,
      columns: [
        {
          label: "Category",
          field: "name",
        },
        {
          label: "Age",
          field: "age",
          type: "number",
        },
        {
          label: "Created On",
          field: "createdAt",
          type: "date",
          dateInputFormat: "yyyy-MM-dd",
          dateOutputFormat: "MMM Do yy",
        },
        {
          label: "Action",
          field: "details",
        },
      ],
      rows: [
        {
          id: 1,
          name: "Mobile",
          age: 20,
          createdAt: "2011-10-31",
          details: "<p>asa</p>",
        },
      ],
      vs: this,
      suggested_price: 0,
      length: 0,
      breadth: 0,
      height: 0,
      weight: 0,

      //seller

      sku: "",
      mrp: 0,
      price: 0,
      return_policy: "",
      return_window: 0,
      stock: 0,
    };
  },
  mounted() {
    this.$store.dispatch("getCategory").then((res) => {
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
        Authorization: "Bearer " + vm.$cookies.get("access_token"),
        "Cache-Control": null,
        "X-Requested-With": null,
      },
      renameFilename: function (filename) {
        console.log(filename);
        console.log(
          vm.product_name + "_" + new Date().getTime() + "_" + filename
        );
        return vm.product_name + "_" + new Date().getTime() + "_" + filename;
      },
    });
    this.myDropzone.on("sending", function (file, xhr, formData) {
      var filenames = [];
      console.log("success");
      $(".dz-preview .dz-filename").each(function () {
        filenames.push($(this).find("span").text());
      });
      formData.append("filenames", filenames);
    });
    /* Add Files Script*/
    this.myDropzone.on("successmultiple", function (file, message) {
      console.log("success");
      console.log(file, message);
      console.log(file);
      message.filenames.forEach((file, index) => {
        vm.images.push(file.filename);
      });
    });
    this.myDropzone.on("error", function (data) {
      $("#msg").html(
        '<div class="alert alert-danger">There is some thing wrong, Please try again!</div>'
      );
    });
    this.myDropzone.on("complete", function (file) {
      //   myDropzone.removeFile(file)
    });
    this.myDropzone.on("removedfile", function (file) {
      //   myDropzone.removeFile(file)
      console.log(file);
      vm.images = vm.images.filter((v) => v != "static/products/" + file.name);
    });
    this.myDropzone.on("addedfile", function (file) {
      console.log("added file");
      console.log(this.files.length);
      console.log(this.options.maxFiles);
      while (this.files.length > this.options.maxFiles) {
        this.removeFile(this.files[10]);
      }
    });
    $("#add_file").on("click", function () {
      console.log("success");
      this.myDropzone.processQueue();
    });
    this.vs.myDropzone.disable();
  },
  watch: {
    product_name: function (newVal, oldVal) {
      // watch it
      console.log("Prop changed: ", newVal, " | was: ", oldVal);
      if (newVal != "") {
        this.vs.myDropzone.enable();
      } else {
        this.vs.myDropzone.disable();
      }
    },
  },
  methods: {
    getSubcategories: function () {
      this.$store
        .dispatch("getsubCategory", this.category_selected)
        .then((res) => {
          console.log(res);
          console.log("________________");
          this.subcategory_selected = 0;
          console.log(this.subcategory_selected);
          this.subcategory = res.data;
        });
    },
    addProduct: function () {
      var payload = new FormData();
      payload.append("product_name", this.product_name);
      payload.append("product_id", this.product_id);
      payload.append("product_id_type", this.product_id_type);
      payload.append("slug", this.slugify);
      payload.append("description", this.desc);
      payload.append("images", JSON.stringify(this.images));
      payload.append("category", this.category_selected);
      payload.append("subcategory", this.subcategory_selected);
      payload.append("brand", this.brand);
      payload.append("manufacturer", this.manufacturer);
      payload.append("seo", this.seo);
      payload.append("suggested_price", this.suggested_price);
      payload.append("length", this.length);
      payload.append("breadth", this.breadth);
      payload.append("height", this.height);
      payload.append("weight", this.weight);
      payload.append("bullet_points", JSON.stringify(this.bullet_points));
      payload.append("specs", JSON.stringify(this.data));

      this.$store
        .dispatch("addProduct", payload)
        .then((res) => {
          console.log(res);

          this.seller_addProduct(res.data);

          //   this.$router.push("/dashboard/products/all");
        })
        .catch((error) => {
          console.log(error);
          this.error = error.response.data;
          this.openDropdownPanel();
        });
    },

    seller_addProduct: function (res) {
      var payload = new FormData();
      payload.append("product_name", this.product_name);
      payload.append("product_id", res["id"]);
      payload.append("sku", this.sku);
      payload.append("mrp", this.mrp);
      payload.append("price", this.price);
      payload.append("status", 1);
      payload.append("stock", this.stock);
      payload.append("return_text", this.return_policy);
      payload.append("return_days", this.return_window);

      this.$store.dispatch("addSellerProduct", payload).then((res) => {
        console.log(res);
        this.$router.push("/dashboard/products/all_single");
      });
    },

    getsubCategoryDetails: function () {
      if (this.subcategory_selected != undefined) {
        this.$store
          .dispatch("getsubCategoryDetails", this.subcategory_selected)
          .then((res) => {
            console.log(res);
            console.log("response");
            this.specs = [];
            if (res.data.specs.length != 0) {
              this.specs = JSON.parse(res.data.specs);
            }
          })
          .catch((err) => {
            console.log("error in request", err);
          });
      }
    },
    addMoreBullets: function () {
      if (this.bullet_points.length < 9) {
        this.bullet_points.push({ value: "" });
      }
    },
    changeText: function () {
      this.return_policy =
        "Returns are just acknowledged inside " +
        this.return_window +
        " (" +
        this.inWords(this.return_window) +
        ") days of the date of procurement. To be qualified for an arrival, your thing must be unused and in a similar condition that you got it. On the off chance that the item is gotten by seller in unused and perfect condition and in its unique bundling without tearing out the Tag, seller will discount your buy.";
    },
    inWords: function (num) {
      console.log(num);

      var a = [
        "",
        "one ",
        "two ",
        "three ",
        "four ",
        "five ",
        "six ",
        "seven ",
        "eight ",
        "nine ",
        "ten ",
        "eleven ",
        "twelve ",
        "thirteen ",
        "fourteen ",
        "fifteen ",
        "sixteen ",
        "seventeen ",
        "eighteen ",
        "nineteen ",
      ];
      var b = [
        "",
        "",
        "twenty",
        "thirty",
        "forty",
        "fifty",
        "sixty",
        "seventy",
        "eighty",
        "ninety",
      ];

      if ((num = num.toString()).length > 9) return "overflow";
      var n = ("000000000" + num)
        .substr(-9)
        .match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
      if (!n) return;
      var str = "";
      str +=
        n[1] != 0
          ? (a[Number(n[1])] || b[n[1][0]] + " " + a[n[1][1]]) + "crore "
          : "";
      str +=
        n[2] != 0
          ? (a[Number(n[2])] || b[n[2][0]] + " " + a[n[2][1]]) + "lakh "
          : "";
      str +=
        n[3] != 0
          ? (a[Number(n[3])] || b[n[3][0]] + " " + a[n[3][1]]) + "thousand "
          : "";
      str +=
        n[4] != 0
          ? (a[Number(n[4])] || b[n[4][0]] + " " + a[n[4][1]]) + "hundred "
          : "";
      str +=
        n[5] != 0
          ? (str != "" ? "and " : "") +
            (a[Number(n[5])] || b[n[5][0]] + " " + a[n[5][1]])
          : "";
      return str;
    },
    makeid: function (length) {
      var result = "";
      var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return new Date().getTime() + result;
    },
    removeBullets: function (index) {
      this.bullet_points.splice(index, 1);
    },
    slugifyTitle: function () {
      this.slugify = this.product_name
        .toLowerCase()
        .replace(/[^\w ]+/g, "")
        .replace(/ +/g, "-");
    },
    allowSlugField: function (val) {
      console.log(val);

      this.editSlug = val;
    },
    openDropdownPanel: function () {
      this.showDropdown = true;
    },
    closeSubCatModel: function () {
      this.showDropdown = false;
    },
    fetchProduct: function () {
      var payload = new FormData();

      payload.append("URL", this.url);

      this.$store.dispatch("scrapper", payload).then((res) => {
        var data = res.data.result;

        this.product_name = data.product_name;
        this.slugify = data.slug;
        this.mrp = data.mrp;
        this.price = data.price;
        this.price = data.price;
        this.sku = data.sku;
        this.desc = data.description.replace(/  |\r\n|\n|\r/gm, "");
        this.specs = data.specs;
        this.data = data.specs;
        this.stock = data.stock;
        this.suggested_price = data.mrp;
        this.bullet_points = this.bullet_points.concat(data.bullet_points);

        var payload = new FormData();

        payload.append("filename", this.slugify + "_flipkart");
        payload.append("url", JSON.stringify(data.images));

        this.$store.dispatch("uploadImageFromURL", payload).then((res) => {
          for (var i = 0; i < res.data.filenames.length; i++) {
            this.images.push(res.data.filenames[i].filename);
            var mockFile = { name: data.images[i] };
            this.myDropzone.options.addedfile.call(this.myDropzone, mockFile);
            this.myDropzone.options.thumbnail.call(
              this.myDropzone,
              mockFile,
              this.baseurl +
                "/backend/api/products/image/200/40/" +
                res.data.filenames[i].filename
            );
            this.myDropzone.files.push(mockFile);
            mockFile.previewElement.classList.add("dz-complete");
          }
        });
      });
    },
    add_section: function () {
      var id = this.makeid(5);
      var a = {
        name: "",
        id: this.makeid(5),
        sub: {},
      };
      console.log(this.data);
      // this.data.push(a);
      this.$set(this.data, id, a);
      this.add_field(id);

      // this.data[this.makeid(5)] = a
    },
    remove_field: function (section, index) {
      // this.field += 1;
      console.log(section, index);
      // this.data[section]["sub"].splice(index, 1);
      this.$delete(this.data[section].sub, index);
    },
    remove_section: function (index) {
      this.$delete(this.data, index);
    },

    addInput: function () {
      this.input.push({ name: "" });
    },
    remove_input: function (index) {
      this.input.splice(index, 1);
    },
    add_field: function (index) {
      console.log(index);
      // this.field += 1;
      console.log(index);
      var a = {
        name: "",
        type: "1",
        id: this.makeid(5),
        dropdown_items: [],
      };

      this.$set(this.data[index].sub, this.makeid(5), a);
    },
    saveSpecs: function () {
      var payload = {
        id: this.category,
        specs: JSON.stringify(this.data),
      };

      this.$store
        .dispatch("saveSpecs", payload)
        .then((res) => {
          console.log(res);
          console.log("response");
          this.$router.push("/dashboard/templates/specification");
        })
        .catch((err) => {
          console.log("error in request", err);
        });
    },
  },
};
</script>


<style scoped>
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
