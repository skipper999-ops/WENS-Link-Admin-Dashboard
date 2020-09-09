<template>
  <div class="navbar-spacing padding-top-30">
    <div class="specification">
      <div class="holder">
        <div
          class="column-padding header-bottom"
          style="display: flex; justify-content: space-between"
        >
          <h3>Orders</h3>
        </div>

        <div class="row">
          <vue-good-table :columns="columns" :rows="allOrder" :line-numbers="true">
            <template slot="table-row" slot-scope="props">
              <span v-if="props.column.field === 'action'">
                <div class="dropdown">
                  <div class="dd-button" @mousedown="close_dropdown">Actions</div>
                  <!-- <input type="checkbox" class="dd-input" /> -->
                  <ul class="dd-menu">
                    <li
                      @click="goToDetails(props.row.order_id)"
                    >View Details</li>
                    <li
                      v-if="props.row.delivery_status != 3"
                      @click="changeStatus(props.row.id , 3)"
                    >Mark as Processing</li>
                    <li
                      v-if="props.row.delivery_status != 4"
                      @click="changeStatus(props.row.id , 4)"
                    >Mark as Packed</li>
                    <li
                      v-if="props.row.delivery_status != 5"
                      @click="changeStatus(props.row.id , 5)"
                    >Mark as Shipped</li>
                    <li
                      v-if="props.row.delivery_status != 400"
                      @click="changeStatus(props.row.id , 400)"
                    >Mark as Cancel</li>
                    <li
                      v-if="props.row.delivery_status != 2"
                      @click="changeStatus(props.row.id , 2)"
                    >Mark as Delivered</li>
                  </ul>
                </div>
              </span>
              <span v-else-if="props.column.field === 'payment_method'">
                <p v-if="props.row.payment_method == 0">Placed</p>
                <p v-else-if="props.row.payment_method == 1">Credit / Debit Card</p>
                <p v-else-if="props.row.payment_method == 2">Net Banking</p>
                <p v-else-if="props.row.payment_method == 3">Wallet</p>
                <p v-else-if="props.row.payment_method == 4">Cash on Delivery</p>
                <p v-else style="color:red">Order Error. Please contact admin</p>
              </span>
              <span v-else-if="props.column.field === 'delivery_address'">
                <ul class="delivery_address">
                  <li v-for="(p ,i) in props.row.delivery_address" :key="p">
                    {{i}} : {{p}}
                  </li>
                </ul>
              </span>
              <span class="status" v-else-if="props.column.field === 'delivery_status'">
                <p v-if="props.row.delivery_status == 0">Pending</p>
                <p v-else-if="props.row.delivery_status == 1">Placed</p>
                <p v-else-if="props.row.delivery_status == 2">Delivered</p>
                <p v-else-if="props.row.delivery_status == 3">Processing</p>
                <p v-else-if="props.row.delivery_status == 4">Packed</p>
                <p v-else-if="props.row.delivery_status == 5">Shipped</p>
                <p v-else-if="props.row.delivery_status == 400">Cancelled By Seller</p>
                <p v-else-if="props.row.delivery_status == 401">Cancelled By Buyer</p>
                <p v-else style="color:red">Order Error. Please contact admin</p>
              </span>
              <span v-else-if="props.column.field === 'created_date'">
                <p>
                  {{ props.row.created_date.split("T")[0] }}
                  {{ props.row.created_date.split("T")[1].split(".")[0] }}
                </p>
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
  data: () => ({
    allOrder: [],
    columns: [
      {
        label: "Order Id",
        field: "order_id",
      },
      {
        label: "Invoice Id",
        field: "invoice_id",
      },
      {
        label: "Product Name",
        field: "product_name",
        width: "300px",
      },
      {
        label: "Price",
        field: "product_price",
        width: "100px",
      },
      {
        label: "Payment Method",
        field: "payment_method",
        width: "150px",
      },
      {
        label: "RazorPay Order Id",
        field: "razor_order_id",
        width: "100px",
      },
      {
        label: "RazorPay Payment Id",
        field: "razorpay_payment_id",
        width: "200px",
      },
      {
        label: "Created Date",
        field: "created_date",
        width: "150px",
      },
      {
        label: "Delivery Status",
        field: "delivery_status",
        width: "150px",
      },
      {
        label: "Action",
        field: "action",
      },
    ],
    next: "",
    prev: "",
    limit: 10,
    offset: 0,
    pagination_buttons: 0,
    center_buttons: [],
    max_count: 0,
    max_count_value: 0,
  }),

  mounted() {
    this.offset_count();
    this.fitTableToScreen();
    window.addEventListener("resize", this.onResize);
  },
  beforeDestroy() {
    // Unregister the event listener before destroying this Vue instance
    window.removeEventListener("resize", this.onResize);
  },
  methods: {
    offset_count: function () {
      var limit = this.limit;
      var offset = this.offset;
      this.getAllOrder();
    },
    getAllOrder: function () {
      this.$store.dispatch("getAllOrder").then((res) => {
        console.log(res);

        var that = this
        this.allOrder = JSON.parse(JSON.stringify(res.data));

        // this.allOrder.forEach(function (value, key) {
        //   for (const property in value) {
        //     if (property == "delivery_address") {
        //       that.allOrder[key]["delivery_address"] = JSON.parse(
        //         that.allOrder[key]["delivery_address"]
        //       )[0];
        //     }
        //   }
        // });
      });
    },
    changeStatus: function (id, status) {
      var payload = {
        id: id,
        delivery_status: status,
      };

      this.$store.dispatch("changeStatus", payload).then((res) => {
        alert("Status changed");
        this.offset_count();
      });
    },
    goToDetails: function (id) {

      this.$router.push({ path: `${id}`})
      
    },
    next_page: function () {
      this.offset = this.offset + this.limit;
      if (this.offset > this.max_count) {
        this.offset = parseInt(this.max_count / this.limit) * this.limit;
      }
      var limit = this.limit;
      var offset = this.offset;
      this.getAllProducts();
    },
    prev_page: function () {
      this.offset = this.offset - this.limit;
      if (this.offset < 0) {
        this.offset = 0;
      }
      var limit = this.limit;
      var offset = this.offset;
      this.getAllProducts();
    },
    change_limit: function () {
      this.offset = 0;
      this.limit = parseInt(this.limit);
      var limit = parseInt(this.limit);
      var offset = this.offset;
      this.getAllProducts();
    },
  },
};
</script>


<style scoped>
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

.status p {
  font-family: "Bold";
}


</style>
