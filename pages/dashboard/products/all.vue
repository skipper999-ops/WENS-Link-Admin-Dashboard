<template>
  <div class="navbar-spacing padding-top-30">
    <div class="specification">
      <div class="holder">
        <div
          class="column-padding header-bottom"
          style="display: flex; justify-content: space-between"
        >
          <h3 style="display: flex;align-items: center;">All Products</h3>

          <div class="wrap">
            <div class="search">
              <input type="text" v-model="query" class="searchTerm" placeholder="Search..." />
              <button type="submit" @click="getAllCatalogueProducts" class="searchButton">Search</button>
            </div>
            <a
              v-if="query != ''"
              @click="clearQuery"
              style="display: flex;justify-content: flex-end;"
            >Clear</a>
          </div>

          <!-- <button class="btn btn-red" style="display: flex;align-items: center;">
            <i data-feather="upload"></i>
            <p class="padding-left-10 white-text">Upload New</p>
          </button>-->
        </div>

        <div class="row">
          <vue-good-table :columns="columns" :rows="allproducts">
            <template slot="table-row" slot-scope="props">
              <span v-if="props.column.field === 'id'">
                <p>{{ offset + props.row["originalIndex"] + 1 }}</p>
              </span>
              <span v-else-if="props.column.field === 'image'">
                <img
                  style="width: 40px; height: 40px; object-fit:contain"
                  :src="
                    baseurl +
                      '/backend/api/products/image/40/40/' +
                      props.row.images[0]
                  "
                />
              </span>
              <span v-else-if="props.column.field === 'details'" style="display: flex;">
                <button
                  style="margin-right: 10px"
                  type="button"
                  @click="editProduct(props.row.id)"
                  class="btn btn-primary"
                >Edit</button>
                <button
                  type="button"
                  @click="deleteProduct(props.row.id)"
                  class="btn btn-red white-text"
                >Delete</button>
              </span>
              <span v-else>{{ props.formattedRow[props.column.field] }}</span>
            </template>
          </vue-good-table>
          <div class="pagination_buttons">
            <div class="limit">
              <select v-model="limit" @change="change_limit">
                <option>3</option>
                <option>10</option>
                <option>25</option>
                <option>50</option>
                <option>100</option>
                <option value="0">All</option>
              </select>
              <p v-if="limit != 0">Page {{ offset / limit + 1 }}</p>
            </div>
            <div class="pagin">
              <!-- <paginate
                :page-count="maxPages"
                :click-handler="paginationClicked"
                :prev-text="'Prev'"
                ref="paginate"
                :next-text="'Next'"
                :container-class="'pagination'"
                :margin-pages="2"
                :page-range="4"
                :page-class="'page-item'"
                :page-link-class="'page-link-item'"
                :prev-class="'prev-item'"
                :prev-link-class="'prev-link-item'"
                :next-class="'next-item'"
                :next-link-class="'next-link-item'"
                :break-view-class="'break-view'"
                :break-view-link-class="'break-view-link'"
              ></paginate> -->

              <div class="btn btn-success" @click="prev_page" v-if="offset != 0">Prev</div>
              <!-- <div class="btn btn-success" v-for="p in center_buttons" :key="p">
                  {{p}}
              </div>-->
              <div class="btn btn-success" @click="next_page" v-if="offset != max_count_value">Next</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Catalogue",
  data() {
    return {
      columns: [
        {
          label: "ID",
          field: "id"
        },
        {
          label: "Image",
          field: "image"
        },
        {
          label: "Product Name",
          field: "product_name",
          width: "400px"
        },
        {
          label: "Brand",
          field: "brand"
        },
        {
          label: "Category",
          field: "category.name"
        },
        {
          label: "Action",
          field: "details",
          width: "200px"
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
      ],
      allproducts: [],
      baseurl: process.env.baseUrl,
      next: "",
      prev: "",
      limit: 10,
      offset: 0,
      pagination_buttons: 0,
      center_buttons: [],
      max_count: 0,
      max_count_value: 0,
      query: "",
      pageNum: 1,
      maxPages: 1,
      maxPerPage: 9
    };
  },
  mounted() {
    this.offset_count();
  },
  watch: {
    query: function(a, b) {
      console.log(a, b);
    }
  },
  computed: {
    ...mapState(["getAllProducts"])
  },

  methods: {
    clearQuery: function() {
      this.query = "";
      this.limit = 10;
      this.offset = 0;
      this.getAllCatalogueProducts();
    },
    paginationClicked(pageNum) {
      //console.log(pageNum);
      this.pageNum = pageNum;
      this.getMealsPagination();

      // this.meals = this
    },
    offset_count: function() {
      var limit = this.limit;
      var offset = this.offset;
      this.getAllCatalogueProducts();
    },
    getAllCatalogueProducts: function() {
      var limit = this.limit;
      var offset = this.offset;
      var query = this.query;
      this.$store
        .dispatch("allProducts", { limit, offset, query })
        .then(res => {
          try {
            if (this.limit == 0) {
              this.allproducts = JSON.parse(JSON.stringify(res.data));
              this.max_count = res.data.count;
              this.maxPages = res.data.count;
              for (var i = 0; i < this.allproducts.length; i++) {
                this.allproducts[i].images = JSON.parse(
                  this.allproducts[i].images
                );
              }
            } else {
              console.log(res);
              this.allproducts = JSON.parse(JSON.stringify(res.data.results));
              this.max_count = res.data.count;
              for (var i = 0; i < this.allproducts.length; i++) {
                this.allproducts[i].images = JSON.parse(
                  this.allproducts[i].images
                );
              }

              this.pagination_buttons = Math.ceil(
                (res.data.count - this.offset) / this.limit
              );

              this.center_buttons = [];

              this.center_buttons.push(
                Math.ceil(this.pagination_buttons / 2) - 1
              );
              this.center_buttons.push(Math.ceil(this.pagination_buttons / 2));
              this.center_buttons.push(
                Math.ceil(this.pagination_buttons / 2) + 1
              );

              this.max_count_value =
                parseInt(this.max_count / this.limit) * this.limit;
            }
          } catch {}
        });
    },
    deleteProduct: function(id) {
      this.$store.dispatch("deleteProduct", id).then(res => {
        console.log(res);
        this.getAllCatalogueProducts();
      });
    },
    editProduct: function(id) {
      console.log(id);

      this.$cookies.set("product_edit", id, {
        path: "/",
        // httpOnly : true,
        // secure: true,
        maxAge: 60 * 60 * 24 * 7
      });
      this.$router.push("/dashboard/products/edit/");
      //  this.$store.dispatch("getSingleProduct", id).then(res => {
      //   console.log(res);
      // });
    },
    next_page: function() {
      this.offset = this.offset + this.limit;
      if (this.offset > this.max_count) {
        this.offset = parseInt(this.max_count / this.limit) * this.limit;
      }
      var limit = this.limit;
      var offset = this.offset;
      this.getAllCatalogueProducts();
    },
    prev_page: function() {
      this.offset = this.offset - this.limit;
      if (this.offset < 0) {
        this.offset = 0;
      }
      var limit = this.limit;
      var offset = this.offset;
      this.getAllCatalogueProducts();
    },
    change_limit: function() {
      this.offset = 0;
      this.limit = parseInt(this.limit);
      var limit = parseInt(this.limit);
      var offset = this.offset;
      this.getAllCatalogueProducts();
    }
  }
};
</script>

<style>
.pagination_buttons {
  display: flex;
  padding: 10px;
  justify-content: space-between;
}

.btn {
  padding: 9px 12px;
}

@import url(https://fonts.googleapis.com/css?family=Open+Sans);

body {
  background: #f2f2f2;
  font-family: "Open Sans", sans-serif;
}

.search {
  width: 100%;
  position: relative;
  display: flex;
}

.searchTerm {
  width: 100%;
  border: 3px solid #00b4cc;
  border-right: none;
  padding: 5px;
  height: 20px;
  border-radius: 5px 0 0 5px;
  outline: none;
  color: #9dbfaf;
}

.searchTerm:focus {
  color: #000;
}

.searchButton {
  /* width: 40px; */
  height: 36px;
  border: 1px solid #00b4cc;
  background: #00b4cc;
  text-align: center;
  color: #fff;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
  font-size: 14px;
}
</style>
