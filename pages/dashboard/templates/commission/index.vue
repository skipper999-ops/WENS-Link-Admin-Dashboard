<template>
  <div class="navbar-spacing padding-top-30">
    <div v-if="showDropdown1" class="popup">
      <div class="popup-main">
        <div class="popup-title">
          <h3>Add Commission Data</h3>
        </div>
        <div class="popup-body">
          <div>
            <div style="display: flex;flex-direction: column;">
              <label>Select Sub Category</label>
              <select
                v-model="selected_category"
                @change="sub_select"
                style="width:70%"
              >
                <option v-for="p in category" :key="p.id" :value="p.id">{{
                  p.name
                }}</option>
              </select>
            </div>

            <div v-if="selected_category">
              <div style="display: flex;flex-direction: column;">
                <label>Market place Commission (%)</label>
                <input
                  v-model="market_commission"
                  type="text"
                  style="width:70%"
                />
              </div>

              <div style="display: flex;flex-direction: column;">
                <label>GST on Commission (%)</label>
                <input max="100" min="0" v-model="gst_commission" type="number" style="width:70%" />
              </div>

              <div style="display: flex;flex-direction: column;">
                <label>Marketplace Payment Fee (%)</label>
                <input max="100" min="0"  v-model="payment_fee" type="number" style="width:70%" />
              </div>

              <div style="display: flex;flex-direction: column;">
                <label>GST on Payment Fee (%)</label>
                <input max="100" min="0" 
                  v-model="gst_payment_fee"
                  type="number"
                  style="width:70%"
                />
              </div>

              <div style="display: flex;flex-direction: column;">
                <label>GST on Item</label>
                <p style="width:70%">{{ 1000 * (gst_commission / 100) }}</p>
              </div>

            </div>
          </div>
        </div>
        <div class="popup-action">
          <div class="pointer" @click="addCommission">Save</div>
          <div class="pointer" @click="closeSubCatModel">Cancel</div>
        </div>
      </div>
    </div>

    <div class="holder">
      <div
        class="column-padding header-bottom"
        style="display: flex; justify-content: space-between"
      >
        <h3 style="display: flex;align-items: center;">Commission Rate</h3>
        <button
          @click="openSubCatModel"
          class="btn btn-red"
          style="display: flex;align-items: center;"
        >
          <p class="white-text">+ Add New</p>
        </button>
      </div>

      <div class="row">
        <vue-good-table :columns="sub_columns" :rows="subcategory">
          <template slot="table-row" slot-scope="props">
            <span v-if="props.column.field === 'details'">
              <button
                type="button"
                @click="EditCommission(props.row.id)"
                class="btn btn-primary"
              >
                Edit
              </button>
            </span>
            <span v-if="props.column.field === 'gst_item'">
              <p style="width:70%">{{ 1000 * (props.row.gst_commission / 100) }}</p>
            </span>
            <span v-else>{{ props.formattedRow[props.column.field] }}</span>
          </template>
        </vue-good-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    allproducts: [],
    newCategory: "",
    selected_category: 0,
    sub_Category: "",
    category: [],
    category_selected: 0,
    subcategory: [],
    showDropdown: false,
    subcategory_selected: 0,
    brand: [],
    market_commission: 0,
    gst_commission: 0,
    payment_fee: 0,
    gst_payment_fee: 1.8,
    gst_item: 153,
    shipping: 55,
    brand_selected: 0,
    showDropdown1: false,
    sub_columns: [
      {
        label: "Sub Category",
        field: "name"
      },
      {
        label: "Category",
        field: "category_name"
      },
      {
        label: "Market Commission (%)",
        field: "market_commission"
      },
      {
        label: "Gst on Commission (%)",
        field: "gst_commission"
      },
      {
        label: "Marketplace Payment Fee (%)",
        field: "payment_fee"
      },
      {
        label: "GST on Payment Fee (%)",
        field: "gst_payment_fee"
      },
      {
        label: "Gst on Item (₹)",
        field: "gst_item"
      },
      {
        label: "Action",
        field: "details"
      }
    ],
    rows: []
  }),

  mounted() {
    this.getCategory();
    this.getSubcategories();
    // this.getBrand();
  },
  methods: {
    getCategory: function() {
      this.$store.dispatch("getsubCategory", 0).then(res => {
        console.log(res);
        this.category = JSON.parse(JSON.stringify(res.data));
      });
    },
    EditCommission: function(id) {
      this.openSubCatModel()
      this.selected_category = id
        this.sub_select()
    },
    addSubCategory: function() {
      this.closeSubCatModel();

      var payload = {
        category: this.selected_category,
        name: this.sub_Category
      };

      this.$store.dispatch("addSubCategory", payload).then(res => {
        console.log(res);
        this.sub_Category = "";
        this.getSubcategories();
        // this.category = JSON.parse(JSON.stringify(res.data));
      });
    },
    sub_select: function() {

      var a = this.subcategory.filter(v => v.subcategory == this.selected_category);

      console.log(a);

      if (a.length != 0) {
        this.market_commission = a[0].market_commission;
        this.gst_commission = a[0].gst_commission;
        this.payment_fee = a[0].payment_fee;
        this.gst_payment_fee = a[0].gst_payment_fee;
        this.gst_item = 1000 * (this.gst_commission / 100);
        this.shipping = a[0].shipping;
      } else {
        this.market_commission = 0;
        this.gst_commission = 0;
        this.payment_fee = 0;
        this.gst_payment_fee = 0;
        this.gst_item = 1000 * (this.gst_commission / 100);
        this.shipping = 55;
      }
    },
    getSubcategories: function() {
      this.$store
        .dispatch("commissionList", this.category_selected)
        .then(res => {
          console.log(res);
          this.subcategory = res.data;

          // for (var i = 0; i < this.subcategory.length; i++) {
          //   this.subcategory[i].category_id = this.category.filter(
          //     v => v.id === this.subcategory[i].category     )["name"];
          // }
        });
    },
    addCommission: function() {

      
      var a = this.subcategory.filter(v => v.subcategory == this.selected_category);


      console.log(id)

      var payload = {
        subcategory: this.selected_category,
        market_commission: this.market_commission,
        gst_commission: this.gst_commission,
        payment_fee: this.payment_fee,
        gst_payment_fee: this.gst_payment_fee,
        gst_item: this.gst_item,
        shipping: this.shipping
      };

      if (a.length == 0) {
        this.$store
          .dispatch("commissionListtask", { id, payload })
          .then(res => {
            console.log(res);
            this.getSubcategories();
            this.closeSubCatModel()
            this.selected_category = 0
          });
      } else {
        var id = a[0].c_id;
        this.$store
          .dispatch("commissionListtaskEdit", { id, payload })
          .then(res => {
            console.log(res);
            this.getSubcategories()
            this.closeSubCatModel()
             this.selected_category = 0
          });
      }
    },
    getBrand: function() {
      this.$store.dispatch("getBrand", this.subcategory_selected).then(res => {
        console.log(res);
        this.brand = res.data;
      });
    },
    deleteCategory: function(id) {
      this.$store.dispatch("deleteCategory", id).then(res => {
        console.log(res);
        this.getCategory();
        this.getSubcategories();
        this.getBrand();
      });
    },
    deleteSubCategory: function(id) {
      this.$store.dispatch("deleteSubCategory", id).then(res => {
        console.log(res);
        this.getSubcategories();
        this.getBrand();
      });
    },
    deleteBrand: function(id) {
      this.$store.dispatch("deleteBrand", id).then(res => {
        console.log(res);
        this.getBrand();
      });
    },
    openDropdownPanel: function() {
      this.showDropdown = true;
      this.sub_Category = "";
      this.selected_category = 0;
    },
    openSubCatModel: function() {
      this.showDropdown1 = true;
    },
    closeDropdownPanel: function() {
      this.showDropdown = false;
      this.newCategory = "";
    },
    closeSubCatModel: function() {
      this.showDropdown1 = false;
    }
  }
};
</script>

<style scoped>
.popup {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
}

.popup-main {
  background-color: white;
  margin: auto;
  position: absolute;
  max-width: 400px;
  height: 700px;
  left: 260px;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1;
  border-radius: 5px;
}

.popup-body {
  height: 552px;
  overflow: auto;
  padding: 30px;
}

.popup-title {
  padding: 30px 30px 16px;
  border-bottom: 1px solid #00000024;
}
.popup-action {
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
  padding: 25px;
  box-shadow: 0px -7px 10px 0px #0000000d;
}

.popup:after {
  background-color: rgba(0, 0, 0, 0.83);
  margin: auto;
  position: absolute;
  content: "";
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
</style>
