<template>
  <div>


          <div class="container" style="padding-bottom: 60px;">
    <div class="center-align">
      <h3 class="tax-invoice">TAX INVOICE</h3>
      <!-- <p class="logo_name">WENSLink</p> -->
    </div>
    <div style="display:flex; justify-content: space-between">
      <div class="bold-font">
        <img class="logo" style="width: 90px;" src="~static/files/logo.png" alt="logo">
      </div>
      <div class="">
        <div class="" style="text-align:right">
          <h6 class="address-para margin-0">WENSLink Pvt. Ltd.</h6>
          <p class="margin-0">Milan Path, 11 Bylane, House No. 13A</p>
          <p class=" margin-0">Zoo Road Tiliali</p>
          <p class="margin-0">Guwahati, Assam, 781024</p>
          <p class="margin-0">GSTIN:18AACCW4881E1Z4</p>
          <p class="margin-0">Toll Free: 1800-121-3578</p>
          <p class="margin-0">Email: sales@wenslink.com</p>
        </div>
      </div>
    </div>
    <div class="invoice-date">
      <h5 class="bold-font ">Tax Invoice - {{invoice.id}}</h5>
      <h5 class="margin-0 bold-font ">Invoice date : {{date}}</h5>
      <!-- <p class="margin-0">Due date:16/10/2019</p> -->
    </div>
    <div class="billing-ID">
      <!-- Billing Client ID:411434 -->
    </div>
    <div class="">
      <div class="bold-font">Invoiced To</div>
      <div class="">
        <h4 class="margin-0 padding-0 bold-font">{{invoice.company_name}}</h4>
        <!-- <h6 class="margin-0">ATTN: WENSLink</h6> -->
        <p class="margin-0">{{invoice.address1}}</p>
        <p class="margin-0">{{invoice.address2}}</p>
        <p class="margin-0">{{invoice.city}}, {{invoice.state}}, {{invoice.pincode}}</p>
        <p>{{invoice.country}}</p>
      </div>
      <div class="">
        <!-- <p class="margin-0">State Code:18</p> -->
        <p v-if="invoice.gstin != ''"> GSTIN:{{invoice.gstin}}</p>
        <p v-if="invoice.gstin == ''">Please Update your GSTIN to enable Dashboard Features</p>
      </div>
    </div>

    <div class="">
      <table>
        <thead>
          <tr class="hex-bg">
            <th class="center-align table-rborder">Transaction ID</th>
            <th class="center-align table-rborder">Description</th>
            <th class="center-align table-rborder">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="table-rborder center-align" style="line-height: 60px;">{{invoice.invoice_id}}</td>
            <td class="table-rborder center-align" style="line-height: 60px;">Seller Registration Fees</td>
            <td class="center-align" style="line-height: 60px;">Rs. 1000.00</td>
          </tr>
          <tr class="hex-bg">
            <td class="table-rborder"></td>
            <td class="table-rborder right-align bold-font table-pad">18.00% IGST</td>
            <td class="center-align">Rs. 180.00</td>
          </tr>
          <tr class="hex-bg">
            <td class="table-rborder"></td>
            <td class="table-rborder right-align bold-font table-pad">Transaction Charge</td>
            <td class="center-align">Rs. 30.00</td>
          </tr>
          <tr class="hex-bg">
            <td class="table-rborder"></td>
            <td class="table-rborder right-align bold-font table-pad" style="line-height: 60px;">Total Charge Including GST</td>
            <td class="center-align bold-font" style="line-height: 60px;">Rs. 1210.00</td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- <div class="">
      <h4>Payments</h4>
      <table>
        <tr class="hex-bg">
          <th class="table-rborder center-align">Transaction Date</th>
          <th class="table-rborder center-align">Gateway</th>
          <th class="table-rborder center-align">Transaction ID</th>
          <th class="center-align">Amount</th>
        </tr>
        <tr>
          <td class="table-rborder center-align">16/10/2019</td>
          <td class="table-rborder center-align">Credit Balance</td>
          <td class="table-rborder center-align">NA</td>
          <td class="center-align">Rs.0.00</td>
        </tr>
        <tr>
          <td class="table-rborder center-align">16/10/2019</td>
          <td class="table-rborder center-align">-</td>
          <td class="table-rborder center-align">315498</td>
          <td class="center-align">Rs.12744.00</td>
        </tr>
        <tr class="hex-bg">
          <td class="center-align"></td>
          <td class="center-align"></td>
          <th class="table-rborder right-align bold-font table-pad">Amount Payable</th>
          <th class="center-align">Rs.0.00</th>
        </tr>
      </table>
    </div> -->
    
    <div class="">
      <!-- <div class="">
        <p>All payments by transfer/cheque/ DD should be drawn locally in favour of BigFoot Retail Solutions Pvt. Ltd.</p>
      </div>
      <p>Bank and Other Commercial Details</p>
      <ul>
        <li>Account number: 75116037200</li>
        <li>Bank:Kotak Mahindra Bank:Saket, New Delhi</li>
        <li>RTGS/NEFT Code:KKBK0000187</li>
        <li>GSTIN No: 07AAECB7131Q1ZC | PAN Number: AAECB7131Q | CIN Number: U72900DL2011PTC225614</li>
      </ul> -->
      <p style="    font-size: 15px;
    margin-top: 40px;">Disclaimer: This is computer generated invoice no signature required.</p>

    </div>
      <div style="display: flex; align-items:center;
    justify-content: center; flex-direction: column;
    margin-top: 30px;">
    <button type="button" style="width: 90px" class="hide-print" @click="print">Print</button>
    <!-- <button type="button" @click="goToSeller" style="width: 180px;margin-top: 20px" class="hide-print btn btn-green">Go to Seller Dashboard</button> -->
  </div>

  </div>


    <!-- <div class="bg">
      <div class="card">
        <span class="card__success">
          <i class="ion-checkmark"></i>
        </span>

        <h1 class="card__msg">Payment Complete</h1>
        <h2 class="card__submsg">Welcome to WENSLink</h2>
        <nuxt-link to="/login">HOME</nuxt-link>
      </div>
      
    </div> -->
  </div>
</template>


<script>
export default {
  data(){
    return{
      invoice: [],
      date: "",
    }
  },
  mounted(){
    document.title = 'WENSLink Seller Registration Invoice'


    window.onbeforeunload = function () {
      console.log("sdsdsdsd")
      localStorage.setItem('invoice_id', '0')
    };
    
    this.$store.dispatch('invoice_success' , localStorage.getItem('invoice_id')).then( res => {
      // console.log(res)
      this.invoice = res.data
      this.date = this.invoice['created_date'].split('T')[0].split('-').reverse().join('-')
    })

  },
  methods:{
    print: function(){
      document.title = 'WENSLink Seller Registration Invoice'
      window.print()
    },
    goToSeller: function(){

        window.location.href = "/vendors"

    }
  }
}
</script>


<style scoped>
.bg {
  background-color: #6c7bee;
  width: 480px;
  overflow: hidden;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 40px;
  font-family: 'Roboto';
  margin-top: 40px;
}
.card {
  background-color: #fff;
  width: 100%;
  float: left;
  margin-top: 40px;
  border-radius: 5px;
  box-sizing: border-box;
  padding: 80px 30px 25px 30px;
  text-align: center;
  position: relative;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}
.card__success {
  position: absolute;
  top: -50px;
  left: 145px;
  width: 100px;
  height: 100px;
  border-radius: 100%;
  background-color: #60c878;
  border: 5px solid #fff;
}
.card__success i {
  color: #fff;
  line-height: 100px;
  font-size: 45px;
}
.card__msg {
  text-transform: uppercase;
  color: #55585b;
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 5px;
}
.card__submsg {
  color: #959a9e;
  font-size: 16px;
  font-weight: 400;
  margin-top: 0px;
}
.card__body {
  background-color: #f8f6f6;
  border-radius: 4px;
  width: 100%;
  margin-top: 30px;
  float: left;
  box-sizing: border-box;
  padding: 30px;
}
.card__avatar {
  width: 50px;
  height: 50px;
  border-radius: 100%;
  display: inline-block;
  margin-right: 10px;
  position: relative;
  top: 7px;
}
.card__recipient-info {
  display: inline-block;
}
.card__recipient {
  color: #232528;
  text-align: left;
  margin-bottom: 5px;
  font-weight: 600;
}
.card__email {
  color: #838890;
  text-align: left;
  margin-top: 0px;
}
.card__price {
  color: #232528;
  font-size: 70px;
  margin-top: 25px;
  margin-bottom: 30px;
}
.card__price span {
  font-size: 60%;
}
.card__method {
  color: #d3cece;
  text-transform: uppercase;
  text-align: left;
  font-size: 11px;
  margin-bottom: 5px;
}
.card__payment {
  background-color: #fff;
  border-radius: 4px;
  width: 100%;
  height: 100px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
}
.card__credit-card {
  width: 50px;
  display: inline-block;
  margin-right: 15px;
}
.card__card-details {
  display: inline-block;
  text-align: left;
}
.card__card-type {
  text-transform: uppercase;
  color: #232528;
  font-weight: 600;
  font-size: 12px;
  margin-bottom: 3px;
}
.card__card-number {
  color: #838890;
  font-size: 12px;
  margin-top: 0px;
}
.card__tags {
  clear: both;
  padding-top: 15px;
}
.card__tag {
  text-transform: uppercase;
  background-color: #f8f6f6;
  box-sizing: border-box;
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 10px;
  color: #d3cece;
}











    h3 {
      font-weight: bold;
      text-align: center;
    }

    .bold-font {
      font-weight: bold;
    }

    .address-para {
      font-weight: bold;
      font-size: 1.1rem;
    }

    .center-align {
      text-align: center;
    }

    .right-align {
      text-align: right;
    }

    .margin-0 {
      margin: 0;
    }

    p {
      font-size: 0.9rem;
    }

    .top-right-address {
      margin-right: 9rem;
    }

    .tax-invoice {
      margin: 17px 0 30px;
    }

    .invoice-date {
      background-color: #edeff3!important;
      margin: 14px 0 5px;
      padding: 7px 3px;
      -webkit-print-color-adjust: exact;
    }

    .billing-ID {
      font-weight: bold;
      margin-bottom: 23px;
    }

    .hex-bg {
      background: #edeff3!important;
      -webkit-print-color-adjust: exact;
    }

    tbody,
    table {
      border: 1px solid #d4d4d4;
      width: 100%;
    }

    tr {
      border-bottom: 1px solid #dee2e6;
    }

    .table-rborder {
      border-right: 1px solid #d4d4d4;
      border-bottom: 1px solid #d4d4d4;
    }
    .table-pad{
      padding-right:7px;
    }
    @media print{
      body {
        -webkit-print-color-adjust:exact;
        color-adjust:exact;
    }
    
  }
  @page{
     size:A4; margin:8mm;
   }


.table > thead,
table > tbody {
  background-color: #fff;
}

th {
  color: black;
}

td {
  color: black;
}

.table > thead > tr > th,
.table > tbody > tr > td {
  padding: 15px !important;
}

table > tbody > tr > td:nth-child(even) {
  /* text-align: right; */
}

thead tr {
  border-bottom: 1px solid #cccccc;
}
</style>