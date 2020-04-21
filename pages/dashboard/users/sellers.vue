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
          <vue-good-table :columns="columns" :rows="allproducts" :line-numbers="true">
            <template slot="table-row" slot-scope="props">
              <span v-if="props.column.field === 'details'">
                <div class="dropdown">
                  <div class="dd-button" @mousedown="close_dropdown">Actions</div>
                  <!-- <input type="checkbox" class="dd-input" /> -->
                  <ul class="dd-menu">
                    <li v-if="props.row.status != 2" @click="changeStatus(props.row.id , 2)">Suspend</li>
                    <li v-if="props.row.status != 1" @click="changeStatus(props.row.id , 1)">Active</li>
                    <li  v-if="props.row.status != 0" @click="loginAsVendor(props.row.phone_number)">Login as Seller</li>
                    <li v-if="props.row.status != 0" class="btn-danger red-text" @click="changeStatus(props.row.id , 0)">Delete</li>
                    <!-- <li class="divider"></li>
                    <li>
                      <a href="http://rane.io">Link to Rane.io</a>
                    </li>-->
                  </ul>
                </div>

                <!-- <button
                  type="button"
                  v-if="props.row.status != 0"
                  @click="changeStatus(props.row.id , 0)"
                  class="btn btn-primary"
                >Delete</button>
                <button
                  type="button"
                  v-if="props.row.status != 1"
                  @click="changeStatus(props.row.id , 1)"
                  class="btn btn-primary"
                >Active</button>
                <button
                  type="button"
                  v-if="props.row.status != 2"
                  @click="changeStatus(props.row.id , 2)"
                  class="btn btn-primary"
                >Suspend</button>
                <button
                  type="button"
                  @click="loginAsVendor(props.row.phone_number)"
                  class="btn btn-primary"
                >Login</button>-->
              </span>
              <span v-else-if="props.column.field === 'status'">
                <p v-if="props.row.status == 0">Deleted</p>
                <p style="color: green;font-family:bold" v-if="props.row.status == 1">Active</p>
                <p v-if="props.row.status == 2">Suspended</p>
              </span>
              <span v-else-if="props.column.field === 'name'">
                <p>{{ props.row.name | capitalize}}</p>
              </span>
              <span v-else-if="props.column.field === 'payment_mode'">
                <p v-if="props.row.payment_mode == 'Test'">Inactive</p>
                <p style="color: green;font-weight:bold" v-if="props.row.payment_mode == 'Live'"
                >Active</p>
                <p v-if="props.row.payment_mode == 'free'">Free</p>
              </span>
              <span v-else-if="props.column.field === 'password'">
                <button
                  v-if="props.row.status != 2"
                  type="button"
                  @click="passwordChange(props.row.id)"
                  class="btn btn-primary"
                >Send SMS</button>
              </span>
              <span v-else-if="props.column.field === 'invoice'">
                <button
                  type="button"
                  @click="openInvoice(props.row.id)"
                  class="btn btn-primary"
                  v-if="props.row.payment_mode == 'Live'"
                >Invoice</button>
              </span>
              <span v-else-if="props.column.field === 'addressline1'">
                <div v-if="props.row.addressline1 != ''">
                  <p>
                    {{props.row.addressline1 | capitalize}},
                    {{props.row.addressline2 | capitalize}},
                    {{props.row.city | capitalize}}
                  </p>
                  <p>
                    {{props.row.state | capitalize}},
                    {{props.row.country | capitalize}}
                  </p>
                </div>
                <p v-else class="red-text bold">Incomplete</p>
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
          field: "name",
          width: "200px"
        },
        {
          label: "Phone Number",
          field: "phone_number",
          width: "200px"
        },
        {
          label: "Email",
          field: "email"
        },
        {
          label: "Company Name",
          field: "company_name",
          formatFn: this.capitalize
        },
        {
          label: "Store Name",
          field: "store",
          width: "200px"
        },
        {
          label: "GSTIN",
          field: "gstin"
        },
        {
          label: "Products",
          field: "product_count",
          width: "100px"
        },
        {
          label: "Address",
          field: "addressline1",
          width: "300px"
        },
        {
          label: "Payment Mode",
          field: "payment_mode",
          width: "150px"
        },
        {
          label: "View Invoice",
          field: "invoice",
          width: "150px"
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
        }
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
  filters: {
    capitalize: function(value) {
      if (!value) return "";
      console.log(value)
      return value.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
    }
  },
  mounted() {
    this.getAllProducts();
    this.fitTableToScreen();
    window.addEventListener("resize", this.onResize);
  },
  beforeDestroy() {
    // Unregister the event listener before destroying this Vue instance
    window.removeEventListener("resize", this.onResize);
  },
  methods: {
    getAllProducts: function() {
      this.$store.dispatch("getAllSeller").then(res => {
        console.log(res);
        this.allproducts = JSON.parse(JSON.stringify(res.data.users));
        //  $(".vgt-responsive tbody").height(window.innerHeight - $(".vgt-responsive").offset().top - 126);
      });
    },
    changeStatus: function(id, status) {
      this.$store
        .dispatch("changeUserStatus", {
          id: id,
          status: status
        })
        .then(res => {
          console.log(res);
          this.getAllProducts();
        });
    },
    openInvoice: function(id) {
      console.log(id);

      localStorage.setItem("invoice_id", id);

      window.open(
        "/admin/dashboard/invoices/",
        "popUpWindow",
        "height=800,width=800,left=100,top=100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes"
      );
    },
    loginAsVendor: function(phone_number) {
      console.log(phone_number)
      var payload = new FormData();

      payload.append("phone_number", phone_number);
      payload.append("password", "admin@wenslink");

      this.$store.dispatch("loginAsVendor", payload).then(res => {
        if (res.data.step < 5) {
          window.open(
            "https://seller.wenslink.com/adminlogin?token=" + res.data.access
          );
        } else {
          window.open(
            "https://seller.wenslink.com/vendors/adminlogin?token=" +
              res.data.access
          );
        }
      });
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


<style>
.btn-success {
  background-color: #4caf50;
  color: white;
}

/* Dropdown */

.dropdown {
  display: inline-block;
  position: relative;
}

.dd-button {
  display: inline-block;
  border: 1px solid gray;
  border-radius: 4px;
  padding: 10px 30px 10px 20px;
  background-color: #ffffff;
  cursor: pointer;
  white-space: nowrap;
}

.dd-button:after {
  content: "";
  position: absolute;
  top: 50%;
  right: 15px;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid black;
}

.dd-button:hover {
  background-color: #eeeeee;
}

.dd-input {
  display: none;
}

.dd-menu {
  position: absolute;
  top: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 0;
  margin: 2px 0 0 0;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  list-style-type: none;
  z-index: 9;
  right: 0;
}

.dd-menu {
  display: none;
}

.dd-input:checked + .dd-menu {
  display: block;
}

.dd-menu li {
  padding: 10px 20px;
  cursor: pointer;
  white-space: nowrap;
}

.dd-menu li:hover {
  background-color: #f6f6f6;
}

.dd-menu li a {
  display: block;
  margin: -10px -20px;
  padding: 10px 20px;
}

.dd-menu li.divider {
  padding: 0;
  border-bottom: 1px solid #cccccc;
}

/* table {
    width: 300px;
    overflow-x: scroll;
    display: block;
}
thead, tbody {
    display: block;
}
tbody {
    overflow-y: scroll;
    overflow-x: hidden;
    height: 140px;
}
td, th {
    min-width: 100px;
} */

table.vgt-table {
  border: 0;
}
</style>