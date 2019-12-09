<template>
  <div class="navbar-spacing padding-top-30">
    <div v-if="showDropdown1" class="popup">
      <div class="popup-main">
        <div class="popup-title">
          <h3>Add Sub Admin</h3>
        </div>
        <div class="popup-body">
          <div>
            <div>
              <div style="display: flex;flex-direction: column;">
                <label>Name</label>
                <input v-model="subadmin_name" type="text" style="width:70%" />
              </div>
              <div style="display: flex;flex-direction: column;">
                <label>Phone Number</label>
                <input v-model="subadmin_phone" type="text" style="width:70%" />
              </div>
              <div style="display: flex;flex-direction: column;">
                <label>Email</label>
                <input
                  autocomplete="off"
                  v-model="subadmin_email"
                  type="email"
                  style="width:70%"
                />
              </div>
              <div style="display: flex;flex-direction: column;">
                <label>Password</label>
                <input
                  autocomplete="off"
                  v-model="subadmin_password"
                  type="password"
                  style="width:70%"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="popup-action">
          <div class="pointer" @click="addsubadmin">Add</div>
          <div class="pointer" @click="closeSubCatModel">Cancel</div>
        </div>
      </div>
    </div>

    <div class="holder">
      <div
        class="column-padding header-bottom"
        style="display: flex; justify-content: space-between"
      >
        <h3 style="display: flex;align-items: center;">All Sub Admins</h3>
        <button
          @click="openSubCatModel"
          class="btn btn-red"
          style="display: flex;align-items: center;"
        >
          <p class="white-text">+ Add New</p>
        </button>
      </div>

      <div class="row">
        <vue-good-table :columns="columns" :rows="subadmins">
          <template slot="table-row" slot-scope="props">
            <span v-if="props.column.field === 'details'">
              <button
                v-if="props.row.status != 0"
                type="button"
                @click="changeStatus(props.row.id, 0)"
                class="btn btn-primary"
              >
                Delete
              </button>
              <button
                v-if="props.row.status != 1"
                type="button"
                @click="changeStatus(props.row.id, 1)"
                class="btn btn-primary"
              >
                Active
              </button>
              <button
                v-if="props.row.status != 2"
                type="button"
                @click="changeStatus(props.row.id, 2)"
                class="btn btn-primary"
              >
                Suspend
              </button>
            </span>
            <span v-else-if="props.column.field === 'status'">
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
</template>

<script>
export default {
  data: () => ({
    subadmins: [],
    subadmin_name: "",
    subadmin_phone: "",
    subadmin_email: "",
    subadmin_password: "",
    showDropdown1: false,
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
    rows: []
  }),

  mounted() {
    this.getAllSubAdmin();
    // this.getBrand();
  },
  methods: {
    getAllSubAdmin: function() {
      this.$store.dispatch("getAllSubAdmin").then(res => {
        console.log(res);
        this.subadmins = JSON.parse(JSON.stringify(res.data.users));
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
          this.getAllSubAdmin();
        });
    },
    EditCommission: function(id) {
      this.openSubCatModel();
      this.selected_category = id;
      this.sub_select();
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
        // this.category = JSON.parse(JSON.stringify(res.data));
      });
    },
    addsubadmin: function() {

      var payload = {
        name: this.subadmin_name,
        email: this.subadmin_email,
        password: this.subadmin_password,
        phone_number: this.subadmin_phone
      };

      this.$store.dispatch("addSubAdmin", payload ).then(res => {
        console.log(res);
          this.closeSubCatModel();
          this.getAllSubAdmin();
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
        this.getBrand();
      });
    },
    deleteSubCategory: function(id) {
      this.$store.dispatch("deleteSubCategory", id).then(res => {
        console.log(res);
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
      this.subadmin_name = "";
      this.subadmin_phone = "";
      this.subadmin_email = "";
      this.subadmin_password = "";
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
