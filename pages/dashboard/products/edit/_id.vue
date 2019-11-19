<template>
    <div class="navbar-spacing padding-top-30">
       <div class="specification">
      <div class="holder">
        <div class="column-padding header-bottom">
          <h3 style="display: flex;align-items: center;">Add a Product to your catalogue</h3>
          <p
            style="padding-left: 19px;padding-bottom: 10px;"
          >Product added here will be added to a common database and vendors can use these as templates when adding their products</p>
          <!-- <button class="btn btn-red" style="display: flex;align-items: center;">
            <i data-feather="upload"></i>
            <p class="padding-left-10 white-text">Upload New</p>
          </button>-->
        </div>

        <div class="holder" v-if="selected.length != 0">
         <div class="product-detail-row">
          <div class="header-row">{{selected.product_name}}</div>
          <div class="detail-row">
            <div class="column-left">
              <img class="product-image" :src="'http://127.0.0.1:8000/media/products/' + selected.images[0]" />
            </div>
            <div class="column-right">
              <span>
                <b>Item Name (aka Title):</b>
                {{selected.product_name}}
              </span>
              <span>
                <b>Product ID:</b>
                {{selected.product_id}}
              </span>
              <span>
                <b>Brand:</b>
                {{selected.brand}}
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
          <p
            style="padding-left: 19px;padding-bottom: 10px;color:#E91E63"
          >These informations cannot be changed by the Vendors</p>
        </div>

        <div class="row">
          <div class="col s24">
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
                  <option v-for="p in product_id_list" :key="p.id" :value="p.id">{{p.name}}</option>
                </select>
              </div>
            </div>
            <div class="col s24">
              <div class="form-group">
                <label for="exampleInputEmail1">Product Name</label>
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
                <div style="display: flex;justify-content: space-between;align-items: center;">
                  <label style="display:flex" for="exampleInputEmail1">Product Slug</label>
                  <div v-if="!editSlug" @click="allowSlugField(1)" class="link_tag">Edit</div>
                  <div v-if="editSlug" @click="allowSlugField(0)" class="link_tag">Save</div>
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
                <label for="exampleInputEmail1">Brand</label>
                <input type="text" class="form-control" v-model="brand" placeholder="Xiaomi" />
              </div>
            </div>
            <div class="col s24 m12">
              <div class="form-group">
                <label for="exampleInputEmail1">Manufacturer</label>
                <input type="text" class="form-control" v-model="manufacturer" placeholder="Xiaomi" />
              </div>
            </div>
            <div class="col s24">
              <div class="form-group">
                <label for="exampleInputEmail1">Search Terms (SEO)</label>
                <input
                  type="text"
                  v-model="seo"
                  class="form-control"
                  placeholder="Terms that will describe this product"
                />
              </div>
            </div>
          </div>
        </div>

        <hr class="break" />

        <div class="column-padding">
          <h3 style="display: flex;align-items: center;">Descriptions & Bullet Points</h3>
          <p
            style="padding-left: 19px;padding-bottom: 10px;color:#E91E63"
          >These informations cannot be changed by the Vendors</p>
        </div>

        <div class="row">
          <div class="col s24">
            <div class="col s24">
              <div class="form-group">
                <label for="exampleInputEmail1">Write a Short Description about the product</label>
                <textarea v-model="desc" style="height:160px"></textarea>
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
                  <div style="color: red" class="pointer" @click="removeBullets(index)">Remove</div>
                </div>
                <div class="link_tag" @click="addMoreBullets">+ Add More points</div>
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
        <p style="padding-left: 19px;padding-bottom: 10px;">Upload Images. (Max 10)</p>
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
        <div v-if="specs == ''">
          <p style="padding-left: 19px;padding-bottom: 10px;">
            Specifications not added. Go to
            <nuxt-link
              :to="'/dashboard/templates/specification/' + this.subcategory_selected"
            >Specifications </nuxt-link> and add them
          </p>
        </div>
        <div v-if="specs != ''">
          <p style="padding-left: 19px;padding-bottom: 10px;">
            You can edit
            <nuxt-link
              :to="'/dashboard/templates/specification/' + this.subcategory_selected"
            >Specifications</nuxt-link> here
          </p>
        </div>
        <!-- <p>Please Complete the specification section</p> -->
        <div v-if="specs != ''">
          <div v-for="(p, index) in specs" :key="p.id" class="input_fields_wrap drag-list" id="h">
            <h3>{{p.name}}</h3>
            <div class="row">
              <div class="col s12">
                <div class="col s24" v-for="(q, index1) in p['sub']" :key="q.id">
                  <div class="form-group">
                    <label>{{q.name}}</label>

                    <div v-if="q.type == 1">
                      <input type="text" />
                    </div>

                    <div style="display: flex;" v-if="q.type == 2">
                      <select v-model="q.value" style="display: inline-block; width: 100% ">
                        >
                        <option
                          v-for="r in q.dropdown_items"
                          :key="r.id"
                          :value="r.name"
                        >{{r.name}}</option>
                      </select>
                    </div>

                    <div style="display: flex;" v-if="q.type == 3">
                      <input type="text" v-model="q.value" />
                      <select v-model="q.dropdown" style="display: inline-block; width: 30% ">
                        >
                        <option
                          v-for="r in q.dropdown_items"
                          :key="r.id"
                          :value="r.name"
                        >{{r.name}}</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="holder" v-if="slugify != ''">
        <h3 class>Submit Product</h3>
        <div style="padding-left: 19px;padding-bottom: 10px;" class>
          <button class="btn" @click="addProduct">Add Product</button>
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
      selected: []
    };
  },

  mounted(){

  this.$store.dispatch("getSingleProduct", this.$route.params.id).then(res => {
        console.log(res);
        this.selected = res.data
        this.selected.images = JSON.parse(this.selected.images)
      });


  }


    
}
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

.product-image{
        width: 220px;
    height: 200PX;
    padding: 2rem 1rem;
    object-fit: cover;
}
</style>