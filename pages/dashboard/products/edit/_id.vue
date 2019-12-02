<template>
  <div class="navbar-spacing padding-top-30">
    <div class="specification">
      <div class="holder">
        <div class="column-padding header-bottom">
          <h3 style="display: flex;align-items: center;">
            Add a Product to your catalogue
          </h3>
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
                <img
                  class="product-image"
                  :src="baseurl +  '/media/products/' + images[0]"
                />
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

      <div class="holder">
        <div class="column-padding">
          <h3 style="display: flex;align-items: center;">Basic Details</h3>
          <p style="padding-left: 19px;padding-bottom: 10px;color:#E91E63">
            These informations cannot be changed by the Vendors
          </p>
        </div>

        <div class="row">
          <div class="col s24">
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
            <div class="col s24 m8">
              <div class="form-group">
                <label for="exampleInputEmail1">Product ID Type</label>
                <select v-model="selected.product_id_type">
                  <option
                    v-for="p in product_id_list"
                    :key="p.id"
                    :value="p.id"
                    >{{ p.name }}</option
                  >
                </select>
              </div>
            </div>
            <div class="col s24">
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
            <div class="col s24">
              <div class="form-group">
                <div
                  style="display: flex;justify-content: space-between;align-items: center;"
                >
                  <label style="display:flex" for="exampleInputEmail1"
                    >Product Slug</label
                  >
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
                  v-model="selected.slug"
                  :disabled="editSlug == 0"
                  class="form-control"
                  placeholder="redmi-7a-32gb-2-gb-black"
                />
              </div>
            </div>
            <div class="col s24 m12">
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
            <div class="col s24 m12">
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
            <div class="col s24">
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
          </div>
        </div>

        <hr class="break" />

        <div class="column-padding">
          <h3 style="display: flex;align-items: center;">
            Descriptions & Bullet Points
          </h3>
          <p style="padding-left: 19px;padding-bottom: 10px;color:#E91E63">
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
                  v-model="selected.description"
                  style="height:160px"
                ></textarea>
              </div>
            </div>
            <div class="col s24">
              <div class="form-group">
                <label for="exampleInputEmail1"
                  >Add Bullet Points (Upto 9)</label
                >
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
      <div class="holder" v-show="subcategory_selected != undefined">
        <h3 class>Images</h3>
        <p style="padding-left: 19px;padding-bottom: 10px;">
          Upload Images. (Max 10)
        </p>
        <div style="padding-left: 19px;padding-bottom: 10px;" class>
          <div class="dropzone dz-clickable" id="myDrop">
            <div class="dz-default dz-message" data-dz-message>
              <span>Drop files here to upload</span>
            </div>
          </div>
        </div>
      </div>
      <div class="holder" v-if="subcategory_selected != undefined">
        <h3>Specifications</h3>
        <div v-if="selected.specs == ''">
          <p style="padding-left: 19px;padding-bottom: 10px;">
            Specifications not added. Go to
            <nuxt-link
              :to="
                '/dashboard/templates/specification/' +
                  this.subcategory_selected
              "
              >Specifications
            </nuxt-link>
            and add them
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
                <div
                  class="col s24"
                  v-for="(q, index1) in p['sub']"
                  :key="q.id"
                >
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
                        >
                        <option
                          v-for="r in q.dropdown_items"
                          :key="r.id"
                          :value="r.name"
                          >{{ r.name }}</option
                        >
                      </select>
                    </div>

                    <div style="display: flex;" v-if="q.type == 3">
                      <input type="text" :class="q.id" v-model="q.value" />
                      <select
                        v-model="q.dropdown"
                        :class="q.id"
                        style="display: inline-block; width: 30% "
                      >
                        >
                        <option
                          v-for="r in q.dropdown_items"
                          :key="r.id"
                          :value="r.name"
                          >{{ r.name }}</option
                        >
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="holder" v-if="selected.slug != ''">
        <h3 class>Submit Product</h3>
        <div style="padding-left: 19px;padding-bottom: 10px;" class>
          <button class="btn" @click="updateProduct">Update Product</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      product_id: this.$route.params.id,
      selected: [],

      images: [],
      bullet_points: [],
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
      subcategory_selected: [],
      baseurl: process.env.baseUrl
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
      if(!file.upload){
        vm.images = vm.images.filter(v => v != file.name);

      }else{

        vm.images = vm.images.filter(v => v != file.upload.filename);
      }
    });
    this.myDropzone.on("addedfile", function(file) {
      console.log("added file");
      console.log(this.files.length )
      console.log(this.options.maxFiles )
       while (this.files.length > this.options.maxFiles) {
            this.removeFile(this.files[10]);
        }
    });

    this.$store
      .dispatch("getSingleProduct", this.$route.params.id)
      .then(res => {
        console.log(res);
        this.selected = res.data;
        this.images = JSON.parse(this.selected.images);
        this.subcategory_selected = this.selected.subcategory;
        this.bullet_points = JSON.parse(this.selected.bullet_points);
        this.selected.specs = JSON.parse(this.selected.specs);

        this.getsubCategoryDetails();

        this.specs = JSON.parse(this.selected.subcategory.specs);



        for (var i = 0; i < this.images.length; i++) {
          // this.myDropzone.emit("addedfile", "https://www.wenslink.com/media/products/" + this.images[i]);
          var mockFile = { name: this.images[i] };
          this.myDropzone.options.addedfile.call(this.myDropzone, mockFile);
          this.myDropzone.options.thumbnail.call(
            this.myDropzone,
            mockFile,
            this.baseurl + "/media/products/" + this.images[i]
          );
          this.myDropzone.files.push( mockFile);
          mockFile.previewElement.classList.add("dz-complete");
        }


        console.log(this.myDropzone.getAcceptedFiles())

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
  methods: {
    updateProduct: function() {
      var payload = new FormData();
      payload.append("id", this.$route.params.id);
      payload.append("product_name", this.selected.product_name);
      payload.append("product_id", this.selected.product_id);
      payload.append("product_id_type", this.selected.product_id_type);
      payload.append("slug", this.selected.slugify);
      payload.append("description", this.selected.description);
      payload.append("images", JSON.stringify(this.images));
      payload.append("category", this.selected.category_selected);
      payload.append("subcategory", this.vsubcategory_selected);
      payload.append("brand", this.selected.brand);
      payload.append("manufacturer", this.selected.manufacturer);
      payload.append("seo", this.selected.seo);
      payload.append("bullet_points", JSON.stringify(this.bullet_points));
      payload.append("specs", JSON.stringify(this.specs));

      this.$store
        .dispatch("updateProduct", {
          payload: payload,
          id: this.$route.params.id
        })
        .then(res => {
          console.log(res);
          this.$router.push("/dashboard/products/all");
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
    getsubCategoryDetails: function() {
      if (this.subcategory_selected != undefined) {
        this.$store
          .dispatch("getsubCategoryDetails", this.subcategory_selected.id)
          .then(res => {
            console.log(res);
            console.log("response");
            this.specs = [];

            if (res.data.specs.length != 0) {
              this.specs = JSON.parse(res.data.specs);
            }
          })
          .catch(err => {
            console.log("error in request", err);
          });
      }
    },
    allowSlugField: function(val) {
      console.log(val);

      this.editSlug = val;
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
  object-fit: cover;
}
</style>
