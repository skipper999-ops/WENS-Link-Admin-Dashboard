<template>
  <div class="navbar-spacing padding-top-30">
    <div class="specification">
      <div class="holder">
        <div
          class="column-padding header-bottom"
          style="display: flex; justify-content: space-between"
        >
          <h3 style="display: flex;align-items: center;">All Products</h3>
          <!-- <button class="btn btn-red" style="display: flex;align-items: center;">
            <i data-feather="upload"></i>
            <p class="padding-left-10 white-text">Upload New</p>
          </button>-->
        </div>

        <div class="row">
          <vue-good-table
            :columns="columns"
            :rows="allproducts"
          >
            <template slot="table-row" slot-scope="props">
              <span v-if="props.column.field === 'id'">
               <p>{{offset + props.row['originalIndex'] + 1}}</p>
              </span>
              <span v-else-if="props.column.field === 'image'">
                <img
                  style="width: 40px; height: 40px; object-fit:contain"
                  :src="
                    baseurl +
                      '/backend/api/products/image/200/40/' +
                      props.row.images[0]
                  "
                />
              </span>
              <span
                v-else-if="props.column.field === 'details'"
                style="display: flex;"
              >
                <button
                  style="margin-right: 10px"
                  type="button"
                  @click="editProduct(props.row.id)"
                  class="btn btn-primary"
                >
                  Edit
                </button>
                <button
                  type="button"
                  @click="deleteProduct(props.row.id)"
                  class="btn btn-red white-text"
                >
                  Delete
                </button>
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
              <div
                class="btn btn-success"
                @click="prev_page"
                v-if="offset != 0"
              >
                Prev
              </div>
              <!-- <div class="btn btn-success" v-for="p in center_buttons" :key="p">
                  {{p}}
                </div> -->
              <div
                class="btn btn-success"
                @click="next_page"
                v-if="offset != max_count_value"
              >
                Next
              </div>
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
          field: "product_name"
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
      max_count_value: 0
    };
  },
  mounted() {
    this.offset_count();
  },
  computed: {
    ...mapState(["getAllProducts"])
  },

  methods: {
    offset_count: function() {
      var limit = this.limit;
      var offset = this.offset;
      this.getAllCatalogueProducts();
    },
    getAllCatalogueProducts: function() {
      var limit = this.limit;
      var offset = this.offset;
      this.$store.dispatch("allProducts", { limit, offset }).then(res => {
        try {
          if (this.limit == 0) {
            this.allproducts = JSON.parse(JSON.stringify(res.data));
            this.max_count = res.data.count;
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
</style>
