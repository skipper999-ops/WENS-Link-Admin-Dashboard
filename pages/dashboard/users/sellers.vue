<template>
  <div class="navbar-spacing padding-top-30">
    <div class="specification">
      <div class="holder">
        <div
          class="column-padding header-bottom"
          style="display: flex; justify-content: space-between"
        >
          <h3 style="display: flex;align-items: center;">All Sellers</h3>
          <!-- <button class="btn btn-red" style="display: flex;align-items: center;">
            <i data-feather="upload"></i>
            <p class="padding-left-10 white-text">Upload New</p>
          </button>-->
        </div>

        <div class="row">
          <vue-good-table :columns="columns" :rows="allproducts">
            <template slot="table-row" slot-scope="props">
              <span v-if="props.column.field === 'details1'">
                <button type="button" @click="deleteProduct(props.row.id)" class="btn btn-primary">Delete</button>
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
          label: "Name",
          field: "name"
        },
        {
          label: "Phone Number",
          field: "phone_number"
        },
        {
          label: "Email",
          field: "email"
        },
        {
          label: "Verified",
          field: "isVerified"
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
      allproducts: []
    };
  },
  mounted(){
    this.getAllProducts()
  },
  methods: {
    getAllProducts: function() {
      this.$store.dispatch("getAllSeller").then(res => {
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