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
                <!-- <button type="button" @click="deleteProduct(props.row.id)" class="btn btn-primary">Delete</button> -->
              </span>
              <span v-else-if="props.column.field === 'payment_method'">
                <p v-if="props.row.payment_method == 0">Placed</p>
                <p v-else-if="props.row.payment_method == 1">Credit / Debit Card</p>
                <p v-else-if="props.row.payment_method == 2">Net Banking</p>
                <p v-else-if="props.row.payment_method == 3">Wallet</p>
                <p v-else-if="props.row.payment_method == 4">Cash on Delivery</p>
                <p v-else style="color:red">Order Error. Please contact admin</p>
              </span>
              <span v-else-if="props.column.field === 'delivery_status'">
                <p v-if="props.row.delivery_status == 0">Placed</p>
                <p v-else-if="props.row.delivery_status == 1">Delivered</p>
                <p v-else-if="props.row.delivery_status == 2">Cancelled By Seller</p>
                <p v-else-if="props.row.delivery_status == 3">Cancelled By Buyer</p>
                <p v-else style="color:red">Order Error. Please contact admin</p>
              </span>
              <span v-else-if="props.column.field === 'created_date'">
                <p>{{props.row.created_date.split('T')[0]}} {{props.row.created_date.split('T')[1].split('.')[0]}}</p>
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
  data: () => ({
    allOrder: [],
    columns: [
      {
        label: "Order Id",
        field: "order_id"
      },
      {
        label: "Invoice Id",
        field: "invoice_id"
      },
      {
        label: "Product Name",
        field: "product_name",
        width: "300px"
      },
      {
        label: "Price",
        field: "product_price"
      },
      {
        label: "Delivery Status",
        field: "delivery_status"
      },
      {
        label: "Payment Details",
        field: "payment_detail"
      },
      {
        label: "Payment Method",
        field: "payment_method",
        width: "150px"
      },
      {
        label: "RazorPay Order Id",
        field: "razor_order_id"
      },
      {
        label: "RazorPay Payment Id",
        field: "razorpay_payment_id"
      },
      {
        label: "RazorPay Order Id",
        field: "razorpay_payment_id"
      },
      {
        label: "RazorPay Signature",
        field: "razorpay_signature"
      },
      {
        label: "RazorPay Signature",
        field: "razorpay_signature"
      },
      {
        label: "Delivery Status",
        field: "razor_order_id"
      },
      {
        label: "Created Date",
        field: "created_date",
        width: "150px"
      },
      {
        label: "Action",
        field: "action"
      },
    ]
  }),

  mounted() {
    this.getAllOrder();
  },
  methods: {
    getAllOrder: function() {
      this.$store.dispatch("getAllOrder").then(res => {
        console.log(res);
        this.allOrder = JSON.parse(JSON.stringify(res.data));
      });
    }
  }
};
</script>
