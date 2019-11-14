<template>
  <div class="navbar-spacing padding-top-30">
    <div class="specification">
      <div class="holder">
        <div
          class="column-padding header-bottom"
          style="display: flex; justify-content: space-between"
        >
          <h3 style="display: flex;align-items: center;padding-left: 0;padding-bottom: 0;">Product Approval Requests</h3>
          <!-- <button class="btn btn-red" style="display: flex;align-items: center;">
            <i data-feather="upload"></i>
            <p class="padding-left-10 white-text">Upload New</p>
          </button>-->
        </div>

        <div class="row">
          <vue-good-table :columns="columns" :rows="allproducts">
               <template slot="table-row" slot-scope="props">
              <span v-if="props.column.field === 'status'">

                <button type="button"  v-if="props.row.status == 0" @click="deleteProduct(props.row.id)" class="btn btn-primary">APPROVE</button>
                <button type="button"  v-if="props.row.status == 0" @click="deleteProduct(props.row.id)" class="btn btn-primary">REJECT</button>
                <button type="button"  v-if="props.row.status == 1" @click="deleteProduct(props.row.id)" class="btn btn-primary">APPROVED</button>
                <button type="button"  v-if="props.row.status == 2" @click="deleteProduct(props.row.id)" class="btn btn-primary">REJECTED</button>
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
  name: "my-component",
  data() {
    return {
       columns: [
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
      allproducts: []
    };
  },
  mounted(){
    this.getAllProducts()
  },
  methods: {
    getAllProducts: function() {
      this.$store.dispatch("allProductsRequests").then(res => {
        console.log(res);
        this.allproducts = JSON.parse(JSON.stringify(res.data));
      });
    },
    deleteProduct: function(id) {
      this.$store.dispatch("deleteProduct", id).then(res => {
        console.log(res);
        this.getAllProducts();
      });
    }
  }
};
</script>


<style>
</style>