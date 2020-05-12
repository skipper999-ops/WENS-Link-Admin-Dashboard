<template>
  <div class="navbar-spacing padding-top-30">
    <div class="specification">
      <div class="holder">
        <div
          class="column-padding header-bottom"
          style="display: flex; justify-content: space-between"
        >
          <h3 style="display: flex;align-items: center;">All Buyers</h3>
          <!-- <button class="btn btn-red" style="display: flex;align-items: center;">
            <i data-feather="upload"></i>
            <p class="padding-left-10 white-text">Upload New</p>
          </button>-->
        </div>

        <div class="row">
          <vue-good-table :columns="columns" :rows="allproducts" :line-numbers="true">
            <template slot="table-row" slot-scope="props">
              <span v-if="props.column.field === 'details'">
                <div class="dropdown">
                  <div class="dd-button" @mousedown="close_dropdown">Actions</div>
                  <!-- <input type="checkbox" class="dd-input" /> -->
                  <ul class="dd-menu">
                    <li v-if="props.row.status != 2" @click="changeStatus(props.row.id , 2)">Suspend</li>
                    <li v-if="props.row.status != 1" @click="changeStatus(props.row.id , 1)">Active</li>
                    <li v-if="props.row.status != 0" class="btn-danger red-text" @click="changeStatus(props.row.id , 0)">Delete</li>
                  </ul>
                </div>


              </span>
              <span v-else-if="props.column.field === 'status'">
                <p v-if="props.row.status == 0">Deleted</p>
                <p v-if="props.row.status == 1">Active</p>
                <p v-if="props.row.status == 2">Suspended</p>
              </span>
              <span v-else-if="props.column.field === 'payment_mode'">
                <p v-if="props.row.payment_mode == 'Test'">Inactive</p>
                <button type="button" class="btn btn-success" v-if="props.row.payment_mode == 'Live'">Active</button>
                <p v-if="props.row.payment_mode == 'free'">Free</p>
              </span>
              <span v-else-if="props.column.field === 'password'">
                <button v-if="props.row.status != 2" type="button" @click="passwordChange(props.row.id)" class="btn btn-primary">Send SMS</button>
              </span>
              <span v-else-if="props.column.field === 'invoice'">
                <button type="button" @click="openInvoice(props.row.id)" class="btn btn-primary">Invoice</button>
              </span>
              <span v-else-if="props.column.field === 'addressline1'">
                <p>{{props.row.addressline1}}</p>
                <p>{{props.row.addressline2}}</p>
                <p>{{props.row.city}}</p>
                <p>{{props.row.state}}</p>
                <p>{{props.row.country}}</p>
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
          label: "Status",
          field: "status"
        },
        {
          label: "Action",
          field: "details"
        },
        // {
        //   label: "Reset Password",
        //   field: "password"
        // }
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
    this.fitTableToScreen();
  },
  methods: {
    getAllProducts: function() {
      this.$store.dispatch("getAllCustomers").then(res => {
        console.log(res);
        this.allproducts = JSON.parse(JSON.stringify(res.data.users));
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
    },
    openInvoice: function(id){
      console.log(id)

        localStorage.setItem('invoice_id' , id)
        
        window.open('/admin/dashboard/invoices/' ,'popUpWindow','height=800,width=800,left=100,top=100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes');
    },
    loginAsVendor : function(phone_number){

      var payload = new FormData()

      payload.append('phone_number' , phone_number)
      payload.append('password' , 'admin@wenslink')

        this.$store.dispatch('loginAsVendor', payload).then(res =>{

          if(res.data.step < 5){
            
            window.open("https://seller.wenslink.com/adminlogin?token=" + res.data.access);

          }else{
            
            window.open("https://seller.wenslink.com/vendors/adminlogin?token=" + res.data.access);

          }



        })


    }
  }
};
</script>


<style>

.btn-success{
  background-color: #4caf50;
  color: white
}

</style>