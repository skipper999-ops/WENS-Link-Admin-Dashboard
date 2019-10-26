<template>
  <div class="navbar-spacing padding-top-30">
    <div class="specification">
      <div class="holder">
        <div
          class="column-padding header-bottom"
          style="display: flex; justify-content: space-between"
        >
          <h3 style="display: flex;align-items: center;">Add New Product</h3>
          <!-- <button class="btn btn-red" style="display: flex;align-items: center;">
            <i data-feather="upload"></i>
            <p class="padding-left-10 white-text">Upload New</p>
          </button>-->
        </div>

        <div class="row">
          <div class="col s24">
            <div class="col s8">
              <label>Select Category</label>
              <select @change="getSubcategories" v-model="category_selected">
                <option v-for="p in category" :key="p.id" :value="p.id">{{p.name}}</option>
              </select>
            </div>
            <div class="col s8">
              <label>Select SubCategory</label>
              <select @change="getBrand" v-model="subcategory_selected">
                 <option v-for="p in subcategory" :key="p.id" :value="p.id">{{p.name}}</option>
              </select>
            </div>
            <div class="col s8">
              <label>Select Brand</label>
              <select v-model="brand_selected">
                 <option v-for="p in brand" :key="p.id" :value="p.id">{{p.name}}</option>
              </select>
            </div>
          </div>
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
      category: [],
      category_selected: 0,
      subcategory: [],
      subcategory_selected: 0,
      brand: [],
      brand_selected: 0,
      columns: [
        {
          label: "Category",
          field: "name"
        },
        {
          label: "Age",
          field: "age",
          type: "number"
        },
        {
          label: "Created On",
          field: "createdAt",
          type: "date",
          dateInputFormat: "yyyy-MM-dd",
          dateOutputFormat: "MMM Do yy"
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
      ]
    };
  },
  mounted() {
    this.$store.dispatch("getCategory").then(res => {
      console.log(res);
      this.category = res.data;
    });
  },
  methods: {
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
    }
  }
};
</script>


<style>
select {
  height: 35px;
  margin: 0 10px 10px 0;
  border-radius: 0;
  outline: none;
  width: 100%;
  font-size: 1rem;
  padding: 0.6rem 1rem;
  box-shadow: none;
  transition: all 0.3s;
}
</style>