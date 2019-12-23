<template>
  <div>
    <div class="padding-top-20">
      <nav class="topnav box-shadow padding-left-10 padding-right-10 row">
        <div
          class="flex align-item col"
          style="width:100%; justify-content: space-between;"
        >
          <div>
            <div class="visible-xs visible-sm">
              <a @click="openSidenav" class="pointer">
                <i data-feather="menu"></i>
              </a>
            </div>
            <div class="visible-xs visible-sm">
              <p
                class="white-text hide-on-large-only"
                style="line-height:64px;font-family:'Bold'; font-size: 17px;white-space: nowrap;"
              >
                WENSLink Admin Dashboard
              </p>
            </div>
          </div>
          <div
            class="flex align-item col right hide-on-med-and-down"
            style="height:100%; justify-content:flex-end"
          >
            <div style="position:relative;margin-right:15px">
              <span
                class="feather-icon-badge bg-primary text-white h-5 w-5 absolute rounded-full text-xs flex items-center justify-center"
                style="top: 5px; right: 0px;position:absolute;border-radius:50px;width:20px;height:20px"
                >5</span
              >
            </div>
            <div class="flex align-item">
              <div style="padding-right:10px;line-height: 20px;">
                <p class="font-12 white-text">{{ username }}</p>
                <p class="font-10 white-text">{{ company_name }}</p>
              </div>
              <div>
                <img
                  src="~static/files/user.svg"
                  style="border-radius: 50px;width: 45px;height: 100%;"
                />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>

    <perfect-scrollbar
      id="mySidenav"
      class="sidenav hidden-xs hidden-sm padding-bottom-30"
    >
      <div
        style="cursor:pointer; text-align:right;padding-right:20px"
        class="hide-on-large-only"
        @click="closeSidenav"
      >
        <i data-feather="x"></i>
      </div>
      <div class="flex align-item">
        <img src="~static/files/logo.png" class="sideNav__Logo" />
      </div>
      <p style="font-family:bold">WENSLink Admin Dashboard</p>
      <p></p>
      <div class="navbar__parent">
        <nuxt-link to="/dashboard/index">
          <i data-feather="grid"></i>
          <span>Dashboard</span>
        </nuxt-link>
      </div>
      <p>Homepage</p>
      <div class="navbar__parent">
        <nuxt-link to="/dashboard/homepage/navigation">
          <i data-feather="menu"></i>
          <span>Navigation Menu</span>
        </nuxt-link>
      </div>
      <div class="navbar__parent">
        <nuxt-link to="/dashboard/homepage/slider">
          <i data-feather="code"></i>
          <span>Main Slider</span>
        </nuxt-link>
      </div>
      <div class="navbar__parent">
        <nuxt-link to="/dashboard/homepage/carousel">
          <i data-feather="layers"></i>
          <span>Carousels</span>
        </nuxt-link>
      </div>
      <p>Product</p>
      <div class="navbar__parent">
        <nuxt-link to="/dashboard/products/new">
          <i data-feather="plus-square"></i>
          <span>New</span>
        </nuxt-link>
      </div>
      <div class="navbar__parent">
        <nuxt-link to="/dashboard/products/all">
          <i data-feather="users"></i>
          <span>Catalogue</span>
        </nuxt-link>
      </div>
      <div class="navbar__parent">
        <nuxt-link to="/dashboard/products/requests">
          <i data-feather="package"></i>
          <span>Approval</span>
        </nuxt-link>
      </div>
      <p>Sales</p>
      <div class="navbar__parent">
        <nuxt-link to="/dashboard/orders/all">
          <i data-feather="package"></i>
          <span>Orders</span>
        </nuxt-link>
      </div>
      <div class="navbar__parent">
        <nuxt-link to="/dashboard/shipping/all">
          <i data-feather="truck"></i>
          <span>Shipping</span>
        </nuxt-link>
      </div>
      <p>Users</p>
      <div class="navbar__parent">
        <nuxt-link to="/dashboard/users/subadmins">
          <i data-feather="users"></i>
          <span>Sub Admins</span>
        </nuxt-link>
      </div>
      <div class="navbar__parent">
        <nuxt-link to="/dashboard/users/sellers">
          <i data-feather="users"></i>
          <span>Sellers</span>
        </nuxt-link>
      </div>
      <p>Templates</p>
      <div class="navbar__parent">
        <nuxt-link to="/dashboard/templates/category">
          <i data-feather="hash"></i>
          <span>Category</span>
        </nuxt-link>
      </div>
      <div class="navbar__parent">
        <nuxt-link to="/dashboard/templates/subcategory">
          <i data-feather="hash"></i>
          <span>Sub Category</span>
        </nuxt-link>
      </div>
      <div class="navbar__parent">
        <nuxt-link to="/dashboard/templates/specification">
          <i data-feather="hash"></i>
          <span>Specification</span>
        </nuxt-link>
      </div>
      <div class="navbar__parent">
        <nuxt-link to="/dashboard/templates/commission">
          <i data-feather="hash"></i>
          <span>Commission Rate</span>
        </nuxt-link>
      </div>
      <p></p>
      <div class="navbar__parent">
        <div @click="logout" class="logout">
          <i data-feather="log-out"></i>
          <span>Logout</span>
        </div>
      </div>
    </perfect-scrollbar>
  </div>

  <!-- <div id="parentx">

    
    <vs-sidebar parent="body" default-index="1"  color="primary" class="sidebarx" spacer v-model="active">

      <div class="header-sidebar" slot="header">
        <vs-avatar  size="70px" src="https://randomuser.me/api/portraits/men/85.jpg"/>

        <h4>
          My Name
          <vs-button color="primary" icon="more_horiz" type="flat"></vs-button>
        </h4>

      </div>

      <vs-sidebar-item index="1" icon="question_answer">
        Dashboard
      </vs-sidebar-item>

      <vs-sidebar-item index="2" icon="gavel">
        History
      </vs-sidebar-item>

      <vs-divider icon="person" position="left">
        User
      </vs-divider>

      <vs-sidebar-item index="3" icon="verified_user">
        Configurations
      </vs-sidebar-item>
      <vs-sidebar-item index="4" icon="account_box">
        Profile
      </vs-sidebar-item>
      <vs-sidebar-item index="5" >
        Card
      </vs-sidebar-item>

      <div class="footer-sidebar" slot="footer">
        <vs-button icon="reply" color="danger" type="flat">log out</vs-button>
        <vs-button icon="settings" color="primary" type="border"></vs-button>
      </div>

    </vs-sidebar>


  <div class="navbar-spacing padding-top-20">
    <nav class="topnav box-shadow padding-left-10 padding-right-10 row">
      <div class="flex align-item col" style="height:100%">
        <div>

          <a  @click="active=!active">
            <i data-feather="menu"></i>
          </a>
        </div>
        <div>
          <nuxt-link to="/dashboard/parcels/pending">
            <i data-feather="package"></i>
          </nuxt-link>
        </div>
        <div>
          <nuxt-link to="/dashboard/general/customers">
            <i data-feather="users"></i>
          </nuxt-link>
        </div>
        <div>
          <nuxt-link to="/dashboard/general/finance">
            <i data-feather="briefcase"></i>
          </nuxt-link>
        </div>
        <div>
          <nuxt-link to="/dashboard/general/messages">
            <i data-feather="message-square"></i>
          </nuxt-link>
        </div>
        <div>
          <nuxt-link to="/dashboard/admins/all">
            <i data-feather="user"></i>
          </nuxt-link>
        </div>
      </div>
      
      <div class="flex align-item col right" style="height:100%; justify-content:flex-end">
        <div style="position:relative;margin-right:15px">
          <span class="feather-icon-badge bg-primary text-white h-5 w-5 absolute rounded-full text-xs flex items-center justify-center" style="top: 5px; right: 0px;position:absolute;border-radius:50px;width:20px;height:20px">5</span>
          <nuxt-link to="/dashboard/general/messages">
            <i data-feather="message-square"></i>
          </nuxt-link>
        </div>
        <div class="flex align-item">
          <div style="padding-right:10px">
            <p class="font-12">Admin Name</p>
            <p class="font-10">Email to be added</p>
          </div>
          <div>
            <img src="https://via.placeholder.com/40" style="border-radius: 50px">
          </div>
        </div>
      </div>
    </nav>
  </div>





  </div>-->
</template>

<script>
// import feather from 'feather-icons'

export default {
  data: () => ({
    active: false,
    currentUserEmail: "",
    pickup_count: 0,
    message_count: 0
  }),

  computed: {
    // active : $store.state.sidenavStatus
    username() {
      return this.$store.state.username;
    },
    company_name() {
      return this.$store.state.company_name;
    }
  },

  mounted() {
    feather.replace({ color: "white" });

    var vm = this;

    this.currentUserEmail = localStorage.getItem("currentUserEmail");

    $(".navbar__parent").click(function() {
      vm.closeSidenav();
    });

    if (this.$cookies.get("username") != undefined) {
      this.$store.commit("username", this.$cookies.get("username"));
      this.$store.commit("company_name", this.$cookies.get("company_name"));
    } else {
      console.log("cookieNot");
      this.$store.commit("username", 0);
      this.$store.commit("company_name", 0);
    }
  },
  methods: {
    openSidenav: function() {
      $("#mySidenav").addClass("open");
      $("body").addClass("overflow");
    },
    closeSidenav: function() {
      $("#mySidenav").removeClass("open");
      $("body").removeClass("overflow");
    },
    logout: function() {
      this.$cookies.removeAll();

      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
.navbar__parent {
  padding: 0 15px;
}

.sideNav__Logo {
  width: 100%;
  object-fit: contain;
  height: 80px;
}

p {
  margin: 0;
}

.sidenav {
  height: 100%;
  width: 260px;
  position: fixed;
  z-index: 950;
  top: 0;
  left: 0;
  background-color: #0c1013;
  transition: all 0.5s;
  padding-top: 10px;
  /* box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.5); */
  overflow: auto;
  padding-bottom: 60px;
}

.sidenav p {
  padding: 32px 8px 17px 30px;
  text-decoration: none;
  font-size: 14px;
  color: #ffffff;
  display: block;
  transition: 0.3s;
}

.sidenav a {
  padding: 10px 15px 10px 15px;
  text-decoration: none;
  font-size: 13px;
  color: rgb(194, 205, 220);
  display: block;
  transition: 0.3s;
  width: 100%;
  display: flex;
  align-items: center;
}

.sidenav span {
  padding-left: 10px;
}

.sidenav a:hover {
  color: #4caf50;
}

.sidenav .closebtn {
  position: absolute;
  top: 0;
  right: 25px;
  font-size: 36px;
  margin-left: 50px;
}

@media screen and (max-height: 450px) {
  .sidenav {
    padding-top: 15px;
  }
  .sidenav a {
    font-size: 18px;
  }
}

@media screen and (max-width: 991px) {
  .sidenav {
    transform: translate3d(-260px, 0, 0);
  }
  .sidenav.open {
    transform: translate3d(0, 0, 0);
  }
}

.breadcrumb {
  background-color: #0c1013;
}

p {
  margin: 0;
}

.topnav {
  height: 62px;
  background-color: #0c1013;
}

.topnav a {
  float: left;
  color: #f2f2f2;
  text-align: center;
  padding: 20px 10px;
  text-decoration: none;
  font-size: 17px;
  height: 62px;
}

.topnav a:hover {
  color: red;
}

.topnav a.active {
  background-color: #4caf50;
  color: white;
}

.notification {
  background-color: #ff9800;
  border-radius: 50%;
  height: 20px;
  width: 20px;
  margin-left: 10px;
  text-align: center;
  padding: 0 !important;
  font-size: 12px;
  color: white;
  line-height: 20px;
  font-weight: bold;
}

.sidenav .nuxt-link-exact-active,
.sidenav .nuxt-link-active {
  color: white !important;
  background-color: rgb(76, 175, 80) !important;
  box-shadow: 0px 6px 19px 0px rgba(76, 175, 80, 0.7) !important;
  border-radius: 4px;
}

svg {
  width: 20px;
}

.flex {
  display: flex;
}

.align-item {
  align-items: center;
}

.logout {
  padding: 10px 15px 10px 15px;
  cursor: pointer;
  text-decoration: none;
  font-size: 13px;
  color: rgb(194, 205, 220);
  display: block;
  -webkit-transition: 0.3s;
  transition: 0.3s;
  width: 100%;
  display: -webkit-box;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
}
</style>
