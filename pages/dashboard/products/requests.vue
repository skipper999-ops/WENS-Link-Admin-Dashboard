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
          >
            Product Approval Requests
          </h3>
          <!-- <button class="btn btn-red" style="display: flex;align-items: center;">
            <i data-feather="upload"></i>
            <p class="padding-left-10 white-text">Upload New</p>
          </button>-->
        </div>

        <div class="row">
          <vue-good-table
            :columns="columns"
            :rows="allproducts.slice().reverse()"
            :line-numbers="true"
          >
            <template slot="table-row" slot-scope="props">
              <span v-if="props.column.field === 'image'">
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
                <p
                  v-if="props.row.status == 1"
                  style="color: #009688; font-weight: bold;"
                >
                  APPROVED
                </p>
                <p
                  v-if="props.row.status == 2"
                  style="color: #F44336; font-weight: bold;"
                >
                  REJECTED
                </p>
                <p v-if="props.row.status == 0">
                  PENDING
                </p>
              </span>
              <span v-else-if="props.column.field === 'action'">
                <div v-if="props.row.seller_id != null">
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
                  >
                    APPROVE
                  </button>
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
                  >
                    REJECT
                  </button>
                </div>
                <div v-else>
                  <p>Seller Not Available</p>
                </div>
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
export default {
  name: "my-component",
  data() {
    return {
      columns: [
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
          field: "product_id.product_name"
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
  methods: {
    offset_count: function() {
      var limit = this.limit;
      var offset = this.offset;
      this.getAllProducts();
    },
    getAllProducts: function() {
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
      this.offset = this.offset + this.limit 
      if(this.offset > this.max_count){
          this.offset = parseInt(this.max_count / this.limit) * this.limit
        }
      var limit = this.limit
      var offset = this.offset
      this.getAllProducts()
    },
    prev_page: function() {
      this.offset = this.offset - this.limit 
        if(this.offset < 0){
          this.offset = 0
        }
      var limit = this.limit
      var offset = this.offset
      this.getAllProducts()
    },
    change_limit: function() {
      this.offset = 0
      this.limit = parseInt(this.limit)
      var limit = parseInt(this.limit)
      var offset = this.offset
      this.getAllProducts()
    },
  }
};
</script>

<style></style>
