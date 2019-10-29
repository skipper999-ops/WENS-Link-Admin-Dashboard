<template>
  <div class="navbar-spacing padding-top-30">

    <div v-if="showDropdown" class="popup">
      <div class="popup-main">
        <div class="popup-title">
          <h3>Add Category</h3>
        </div>
        <div class="popup-body">
          <div>
            <input v-model="newCategory" type="text" style="width:70%" />
          </div>
        </div>
        <div class="popup-action">
          <div class="pointer" @click="addCategory">Save</div>
          <div class="pointer" @click="closeDropdownPanel">Cancel</div>
        </div>
      </div>
    </div>


    <div class="holder">
      <div
        class="column-padding header-bottom"
        style="display: flex; justify-content: space-between"
      >
        <h3 style="display: flex;align-items: center;">All Categories</h3>
        <button class="btn btn-red" style="display: flex;align-items: center;">
          <p class="white-text"  @click="openDropdownPanel">+ Add New</p>
        </button>
      </div>

      <div class="row">
        <vue-good-table :columns="columns" :rows="category">
          <template slot="table-row" slot-scope="props">
            <span v-if="props.column.field === 'details'">
              <button type="button" @click="deleteCategory(props.row.id)" class="btn btn-primary">Delete</button>
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
    category: [],
    category_selected: 0,
    subcategory: [],
    showDropdown: false,
    subcategory_selected: 0,
    brand: [],
    brand_selected: 0,
    columns: [
      {
        label: "Category",
        field: "name"
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
    this.getBrand();
  },
  methods: {
    getCategory: function() {
      this.$store.dispatch("getCategory").then(res => {
        console.log(res);
        this.category = JSON.parse(JSON.stringify(res.data));
      });
    },
    addCategory: function() {

      this.closeDropdownPanel();

      var payload = new FormData();
     
      payload.append('name', this.newCategory)

      this.$store.dispatch("addCategory", payload).then(res => {
        console.log(res);
        this.getCategory();
        // this.category = JSON.parse(JSON.stringify(res.data));
      });
    },
    getSubcategories: function() {
      this.$store
        .dispatch("getsubCategory", this.category_selected)
        .then(res => {
          console.log(res);
          this.subcategory = res.data;
        });
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
    },
    closeDropdownPanel: function() {
      this.showDropdown = false;
    },
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
  height: 260px;
  left: 260px;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1;
  border-radius: 5px;
}

.popup-body {
  height: 300px;
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
