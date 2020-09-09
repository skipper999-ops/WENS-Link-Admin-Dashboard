<template>
  <div class="navbar-spacing padding-top-30">
    <nuxt-link
      to="/dashboard/orders/all"
      class="btn btn-primary"
      style="margin-bottom:20px;text-decoration:none"
    >Go Back</nuxt-link>

    <div class="specification">
      <div class="holder">
        <div class="column-padding header-bottom">
          <h4 style="padding: 0 0.75rem">Order Details: {{order_id}}</h4>
        </div>

        <div class="row">
          <div class="col s24 m12" style="padding-bottom: 55px">
            <h4 v-if="isGuest" style="padding-bottom: 10px">Guest User</h4>
            <h4 v-else style="padding-bottom: 10px">Registered User</h4>
            <h5 class="padding-bottom-15">Delivery Address</h5>
            <h6
              class="padding-bottom-10"
            >{{delivery_address.firstname}} {{delivery_address.lastname}}</h6>
            <p>{{delivery_address.building}}</p>
            <p>{{delivery_address.city}} - {{delivery_address.pincode}}, {{delivery_address.state}}</p>

            <p class="padding-top-15">
              <span class="bold">Phone number</span>
              {{delivery_address.mobilenumber}}
            </p>

            <p class="padding-top-15">
              <span class="bold">Ordered At:</span>
              {{ ordered_at }}
            </p>
          </div>
          <div class="col s24 m12">
            <h5 class="padding-bottom-15">Order Summary</h5>
            <div style="padding-bottom:10px">
              <p class="bold">Total Amount</p>
              <div>
                <p class="bold success" style="font-size: 25px">₹ {{ total_amount }}</p>
              </div>
            </div>
            <div style="display:flex">
              <p class="bold">Method:</p>
              <div style="padding-left: 5px">
                <p v-if="details.payment_method == 0">Placed</p>
                <p v-else-if="details.payment_method == 1">Credit / Debit Card</p>
                <p v-else-if="details.payment_method == 2">Net Banking</p>
                <p v-else-if="details.payment_method == 3">Wallet</p>
                <p v-else-if="details.payment_method == 4">Cash on Delivery</p>
                <p v-else style="color:red">Order Error. Please contact admin</p>
              </div>
            </div>
            <p>
              <span class="bold">Detail:</span>
              {{details.payment_detail}}
            </p>
            <p>
              <span class="bold">Quantity:</span>
              {{total_quantity}}
            </p>

            <h5 class="padding-bottom-15 margin-top-25">Razorpay Summary</h5>
            <p>
              <span class="bold">Order ID:</span>
              {{details.razor_order_id}}
            </p>
            <p>
              <span class="bold">Payment ID:</span>
              {{details.razorpay_payment_id}}
            </p>
            <p>
              <span class="bold">Order id:</span>
              {{details.razor_order_id}}
            </p>
            <p>
              <span class="bold">Signature:</span>
              {{details.razorpay_signature}}
            </p>
          </div>
        </div>
      </div>
      <div class="holder margin-top-25" v-for="p in products" :key="p.id">
        <div class="row">
          <div class="col s24 m12" style="padding-bottom: 55px">
            <div style="display: flex">
              <img
                class="img"
                :src="baseurl + '/backend/api/products/image/40/40/' + p.product_id.images[0]"
              />
              <div style="padding-left: 20px;display:flex;flex-direction:column">
                <a
                  class="link bold"
                  style="font-size: 15px;padding-bottom:10px"
                  target="_blank"
                  :href="p.slug"
                >{{p.product_name}}</a>
                <p>
                  Price:
                  <span class="bold">₹ {{p.product_price}}</span>
                </p>
                <p>Qty: <span class="bold">{{p.quantity}}</span></p>
              </div>
            </div>
          </div>
          <div class="col s12 m6">
            <h5 class="padding-bottom-15">Delivery Status</h5>
            <div class="delivery_status" style="display:flex">
              <p v-if="p.delivery_status == 0">Pending</p>
              <p v-else-if="p.delivery_status == 1">Placed</p>
              <p class="success" v-else-if="p.delivery_status == 2">Delivered</p>
              <p class="waiting" v-else-if="p.delivery_status == 3">Processing</p>
              <p v-else-if="p.delivery_status == 4">Packed</p>
              <p v-else-if="p.delivery_status == 5">Shipped</p>
              <p class="error" v-else-if="p.delivery_status == 400">Cancelled By Seller</p>
              <p class="error" v-else-if="p.delivery_status == 401">Cancelled By Buyer</p>
              <p v-else style="color:red">Order Error. Please contact admin</p>
            </div>
          </div>
          <div class="col s12 m6">
            <h5 class="padding-bottom-15">Update Status</h5>
            <div class="dropdown">
              <div class="dd-button" @mousedown="close_dropdown">Actions</div>
              <!-- <input type="checkbox" class="dd-input" /> -->
              <ul class="dd-menu">
                <li v-if="p.delivery_status != 3" @click="changeStatus(p.id , 3)">Mark as Processing</li>
                <li v-if="p.delivery_status != 4" @click="changeStatus(p.id , 4)">Mark as Packed</li>
                <li v-if="p.delivery_status != 5" @click="changeStatus(p.id , 5)">Mark as Shipped</li>
                <li v-if="p.delivery_status != 400" @click="changeStatus(p.id , 400)">Mark as Cancel</li>
                <li v-if="p.delivery_status != 2" @click="changeStatus(p.id , 2)">Mark as Delivered</li>
              </ul>
            </div>
          </div>
        </div>
        <!-- <div class="row">
          <div class="col s24 m12">
            <div style="display: flex">
              <img :src="baseurl + '/backend/api/products/image/40/40/' + p.product_id.images[0]" />
              <div style="padding-left: 20px;display:flex;flex-direction:column">
                <a
                  class="link bold"
                  style="font-size: 15px;padding-bottom:10px"
                  target="_blank"
                  :href="p.slug"
                >{{p.product_name}}</a>
                <p>
                  Price:
                  <span class="bold">₹{{p.product_price}}</span>
                </p>
                <span>Qty: {{p.quantity}}</span>
              </div>
            </div>
          </div>
          <div class="col s24 m12">
            <h5 class="padding-bottom-15">Summary</h5>
            <div style="display:flex">
              <p class="bold">Payment Method:</p>
              <div style="padding-left: 5px">
                <p v-if="details.payment_method == 0">Placed</p>
                <p v-else-if="details.payment_method == 1">Credit / Debit Card</p>
                <p v-else-if="details.payment_method == 2">Net Banking</p>
                <p v-else-if="details.payment_method == 3">Wallet</p>
                <p v-else-if="details.payment_method == 4">Cash on Delivery</p>
                <p v-else style="color:red">Order Error. Please contact admin</p>
              </div>
            </div>
            <p>
              <span class="bold">Payment Detail:</span>
              {{details.payment_detail}}
            </p>
          </div>
        </div>-->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Order-Details",
  data() {
    return {
      order_id: this.$route.params.orderid,
      details: {},
      delivery_address: {
        firstname: "",
        lastname: "",
      },
      products: [],
      baseurl: process.env.BASE_URL,
      total_amount: 0,
      ordered_at: "",
      total_quantity: 0,
      isGuest: false,
      steps: [
        {
          label: "Select Items",
          slot: "page1",
        },
        {
          label: "Add Constraints",
          slot: "page2",
        },
        {
          label: "Review",
          slot: "page3",
        },
        {
          label: "Apply",
          slot: "page4",
          options: {
            nextDisabled: true, // control whether next is disabled or not
          },
        },
      ],
    };
  },
  mounted() {
    this.getOrderDetails();
  },
  methods: {
    getOrderDetails: function () {
      this.$store.dispatch("getOrderDetails", this.order_id).then((res) => {
        if (res.data.length > 0) {
          this.products = res.data;
          this.details = res.data[0];
          if(res.data[0]['customer'] == null){
            this.isGuest = true
          }

          this.total_amount = this.sum(this.products, "product_price");

          this.total_quantity = this.sum(this.products, "quantity");

          this.ordered_at = `${this.details.created_date.split("T")[0]} ${
            this.details.created_date.split("T")[1].split(".")[0]
          }`;

          this.delivery_address = JSON.parse(this.details.delivery_address);
          if (this.products.length > 0) {
            for (var i = 0; i < this.products.length; i++) {
              this.products[i].product_id.images = JSON.parse(
                this.products[i].product_id.images
              );
            }
          }
        }
      });
    },
    changeStatus: function (id, status) {
      var payload = {
        id: id,
        delivery_status: status,
      };

      this.$store.dispatch("changeStatus", payload).then((res) => {
        alert("Status changed");
        this.getOrderDetails();
      });
    },
    sum: function (items, prop) {
      return items.reduce(function (a, b) {
        return a + parseFloat(b[prop]);
      }, 0);
    },
  },
};
</script>


<style scoped>
p {
  font-size: 15px;
  word-break: break-all;
  padding-bottom: 5px;
}

h4 {
  font-size: 18px;
}
h5 {
  font-size: 16px;
}
h6 {
  font-size: 14px;
}

.link {
  color: black;
  text-decoration: none;
}

img {
  height: 100%;
  object-fit: contain;
  width: 40px;
}

.success {
  color: #4caf50;
}

.waiting {
  color: #ffc107;
}

.error {
  color: #f44336;
}

.delivery_status {
  font-family: "Bold";
  font-size: 20px;
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
</style>