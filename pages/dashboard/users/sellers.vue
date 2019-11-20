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
              <span v-if="props.column.field === 'details'">
                <button v-if="props.row.status != 0" type="button" @click="changeStatus(props.row.id , 0)" class="btn btn-primary">Delete</button>
                <button v-if="props.row.status != 1" type="button" @click="changeStatus(props.row.id , 1)" class="btn btn-primary">Active</button>
                <button v-if="props.row.status != 2" type="button" @click="changeStatus(props.row.id , 2)" class="btn btn-primary">Suspend</button>
              </span>
              <span v-if="props.column.field === 'status'">
                <p v-if="props.row.status == 0">Deleted</p>
                <p v-if="props.row.status == 1">Active</p>
                <p v-if="props.row.status == 2">Suspended</p>
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
          label: "Status",
          field: "status"
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
    changeStatus: function(id, status) {
      this.$store.dispatch("changeUserStatus", {
        id: id,
        status: status
      }).then(res => {
        console.log(res);
        this.getAllProducts();
      });
    }
  }
};
</script>


<style>
</style>