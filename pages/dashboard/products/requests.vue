<template>
  <div class="navbar-spacing padding-top-30">
    <div class="specification">
      <div class="holder">
        <div
          class="column-padding header-bottom"
          style="display: flex; justify-content: space-between"
        >
          <h3
            style="display: flex;align-items: center;padding-left: 0;padding-bottom: 0;"
          >Product Approval Requests</h3>

          <div class="wrap">
            <div class="search">
              <input type="text" v-model="query" class="searchTerm" placeholder="Search..." />
              <button type="submit" @click="getAllProducts" class="searchButton">Search</button>
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
                      '/media/products/' +
                      props.row.product_id['images'][0]
                  "
                />
              </span>
              <span v-else-if="props.column.field === 'status'">
                <p v-if="props.row.status == 1" style="color: #009688; font-weight: bold;">APPROVED</p>
                <p v-if="props.row.status == 2" style="color: #F44336; font-weight: bold;">REJECTED</p>
                <p v-if="props.row.status == 0">PENDING</p>
              </span>
              <span v-else-if="props.column.field === 'approved_by'">
                <p v-if="props.row.approved_by">{{props.row.approved_by['name']}}</p>
              </span>
              <span v-else-if="props.column.field === 'approved_date'">
                <p>{{ props.row.approved_date.split("T")[0] }} {{ props.row.approved_date.split("T")[1].split(".")[0] }}</p>
              </span>
              <span v-else-if="props.column.field === 'action'">
                <div class="dropdown">
                  <div class="dd-button" @mousedown="close_dropdown">Actions</div>
                  <!-- <input type="checkbox" class="dd-input" /> -->
                  <ul class="dd-menu">
                    <li
                      v-if="props.row.status == 0 || props.row.status == 2"
                      @click="
                      changeProductStatus(
                        props.row.id,
                        props.row.product_id.product_name,
                        props.row.seller_id.phone_number,
                        props.row.sku,
                        1
                      )
                    "
                    >Approve</li>
                    <li
                      v-if="props.row.status == 0 || props.row.status == 1"
                      @click="
                      changeProductStatus(
                        props.row.id,
                        props.row.product_id.product_name,
                        props.row.seller_id.phone_number,
                        props.row.sku,
                        2
                      )
                    "
                    >REJECT</li>
                  </ul>
                </div>

                <!-- <div v-if="props.row.seller_id != null">
                  <button
                    type="button"
                    v-if="props.row.status == 0 || props.row.status == 2"
                    @click="
                      changeProductStatus(
                        props.row.id,
                        props.row.product_id.product_name,
                        props.row.seller_id.phone_number,
                        props.row.sku,
                        1
                      )
                    "
                    class="btn btn-success white-text"
                  >APPROVE</button>
                  <button
                    type="button"
                    v-if="props.row.status == 0 || props.row.status == 1"
                    @click="
                      changeProductStatus(
                        props.row.id,
                        props.row.product_id.product_name,
                        props.row.seller_id.phone_number,
                        props.row.sku,
                        2
                      )
                    "
                    class="btn btn-red white-text"
                  >REJECT</button>
                </div>-->
                <!-- <div v-else>
                  <p>Seller Not Available</p>
                </div>-->
              </span>
              <span v-else>{{ props.formattedRow[props.column.field] }}</span>
            </template>
          </vue-good-table>
          <div class="pagination_buttons">
            <div class="limit">
              <select v-model="limit" @change="change_limit">
                <option>10</option>
                <option>25</option>
                <option>50</option>
                <option>100</option>
              </select>
              <p>Page {{ offset / limit + 1 }}</p>
            </div>
            <div class="pagin">
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
export default {
  name: "my-component",
  data() {
    return {
      columns: [
        {
          label: "ID",
          field: "id"
        },
        {
          label: "Seller Name",
          field: "seller_id.name"
        },
        {
          label: "Seller Phone",
          field: "seller_id.phone_number"
        },
        {
          label: "Image",
          field: "image"
        },
        {
          label: "Product Name",
          field: "product_id.product_name",
          width: "200px"
        },
        {
          label: "Brand",
          field: "product_id.brand"
        },
        {
          label: "Category",
          field: "product_id.category.name"
        },
        {
          label: "Status",
          field: "status"
        },
        {
          label: "Approved By",
          field: "approved_by"
        },
        {
          label: "Approved At",
          field: "approved_date",
          width: "200px"
        },
        {
          label: "Action",
          field: "action"
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
      baseurl: process.env.BASE_URL,
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
    this.fitTableToScreen();
    window.addEventListener("resize", this.onResize);
  },
  methods: {
    clearQuery: function() {
      this.query = "";
      this.limit = 10;
      this.offset = 0;
      this.getAllProducts();
    },
    offset_count: function() {
      var limit = this.limit;
      var offset = this.offset;
      this.getAllProducts();
    },
    getAllProducts: function() {
      var limit = this.limit;
      var offset = this.offset;
      var query = this.query;
      this.$store
        .dispatch("allProductsRequests", { limit, offset, query })
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
              console.log(this.allproducts);
              this.max_count = res.data.count;
              for (var i = 0; i < this.allproducts.length; i++) {
                this.allproducts[i].images = JSON.parse(
                  this.allproducts[i].product_id.images
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

              console.log("this.max_count");
              console.log(this.max_count);

              this.max_count_value =
                parseInt(this.max_count / this.limit) * this.limit;
            }
          } catch (error) {
            console.log(error);
            console.log("errr");
          }
        });
    },

    getAllProducts_back: function() {
      var limit = this.limit;
      var offset = this.offset;
      this.$store
        .dispatch("allProductsRequests", { limit, offset })
        .then(res => {
          console.log(res);
          this.allproducts = JSON.parse(JSON.stringify(res.data.results));

          for (var i = 0; i < this.allproducts.length; i++) {
            this.allproducts[i]["product_id"].images = JSON.parse(
              this.allproducts[i]["product_id"].images
            );
          }
        });
    },
    deleteProduct: function(id) {
      this.$store.dispatch("deleteProduct", id).then(res => {
        console.log(res);
        this.getAllProducts();
      });
    },
    changeProductStatus: function(id, product_name, number, sku, status) {
      console.log("product_name");
      console.log(product_name);
      var payload = {
        id: id,
        product_name: product_name,
        sku: sku,
        number: number,
        status: status
      };
      this.$store.dispatch("changeProductStatus", payload).then(res => {
        console.log(res);
        this.getAllProducts();
      });
    },
    next_page: function() {
      this.offset = this.offset + this.limit;
      if (this.offset > this.max_count) {
        this.offset = parseInt(this.max_count / this.limit) * this.limit;
      }
      var limit = this.limit;
      var offset = this.offset;
      this.getAllProducts();
    },
    prev_page: function() {
      this.offset = this.offset - this.limit;
      if (this.offset < 0) {
        this.offset = 0;
      }
      var limit = this.limit;
      var offset = this.offset;
      this.getAllProducts();
    },
    change_limit: function() {
      this.offset = 0;
      this.limit = parseInt(this.limit);
      var limit = parseInt(this.limit);
      var offset = this.offset;
      this.getAllProducts();
    },
    onResize(event) {
      this.fitTableToScreen();
      // console.log("window has been resized", event);
    },
    fitTableToScreen: function() {
      $(".vgt-responsive").height(
        window.innerHeight - $(".vgt-responsive").offset().top - 126
      );
    }
  }
};
</script>

<style></style>
