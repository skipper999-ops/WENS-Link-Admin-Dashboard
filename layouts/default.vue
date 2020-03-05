<template>
  <div>
    <client-only>
      <NavBar
        v-if="
          $nuxt.$route.name != 'index' &&
            $nuxt.$route.name != 'dashboard-invoices'
        "
      />
      <nuxt />
    </client-only>
  </div>
</template>

<script>
// import TopNav from '@/components/TopNav'
import NavBar from "@/components/NavBar";

export default {
  components: {
    NavBar
  },

  computed: {
    // active : $store.state.sidenavStatus
    username() {
      return this.$store.state.username;
    },
    loggedUserData() {
      console.log("jkhjhjhjhjhjhjhjhj");
      if (this.$cookies.get("access_token") != undefined) {
        console.log(
          this.parseJwt(this.$cookies.get("access_token"))["usertype"]
        );
        this.$store.commit(
          "usertype",
          this.parseJwt(this.$cookies.get("access_token"))["usertype"]
        );
        this.$store.commit(
          "loggedUserData",
          this.parseJwt(this.$cookies.get("access_token"))
        );
      } else {
        this.$router.push("/");
      }
      return this.$store.state.loggedUserData;
    }
  },

  mounted() {
    console.log($nuxt.$route.name);
    // document.body.classList.add('theme-dark')
    console.log(this.$cookies.get("access_token"))
     if (this.$cookies.get("access_token") != undefined) {
      console.log(this.parseJwt(this.$cookies.get("access_token"))['usertype']);
      this.$store.commit("usertype", this.parseJwt(this.$cookies.get("access_token"))['usertype']);
      this.$store.commit("loggedUserData", this.parseJwt(this.$cookies.get("access_token")));
    }else{
      this.$router.push("/")
    }
  }
};
</script>

<style>
@font-face {
  font-family: "Regular";
  src: url("~static/files/fonts/regular.woff") format("woff");
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: "Light";
  src: url("~static/files/fonts/light.woff") format("woff");
  font-weight: lighter;
  font-style: normal;
}

@font-face {
  font-family: "Bold";
  src: url("~static/files/fonts/bold.woff") format("woff");
  font-weight: normal;
  font-style: normal;
}
/* 
@font-face {
font-family: 'Semi';
src: url('~static/files/fonts/semi-bold.otf') format('opentype');
font-weight: normal;
font-style: normal;
} */

html {
  font-family: "Regular", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  font-size: 13px;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

html,
body {
  background-color: #f1f2f7;
  /* background-color: #ffffff; */
}

.neu {
  box-shadow: 9px 9px 16px rgb(163, 177, 198, 0.6),
    -9px -9px 16px rgba(255, 255, 255, 0.5) !important;
  background-color: #e0e5ec !important;
}

.overflow {
  overflow: hidden;
}


.btn-primary {
  background-color: #009688;
  color: white;
}

ul li{
  list-style : none;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.pagination_buttons {
  padding: 10px 0 !important;
}


table.vgt-table {
  font-size: 13px !important;
}

.vgt-table thead th{
  background-color: #f7fbff!important;
  background: #f7fbff!important
}

.vgt-inner-wrap {
  /* padding: 0 10px */
}

.vue-good-table-correction tr:last-child td{
  border-bottom: 0 solid #eaeaea !important;
}


.vgt-table.bordered td {
  border: none !important;
  border-bottom: 1px solid #eaeaea !important;
}

.vgt-table.bordered th {
  border: none !important;
}

.vgt-table th{
  padding: 0.75em 1.5em 0.75em .75em!important
}

table.vgt-table td{
  padding: 20px .75em .75em .75em
}

.apexcharts-svg {
  border-radius: 0 0 5px 5px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}

.feather-icon.black {
  color: black;
}


.analytics table.vgt-table {
  border: 0 solid #dcdfe6 !important;
}

.feather-icon.white {
  color: black;
}
/* 
.white-text{
  color:white
} */

.btn {
  font-family: "Regular";
}

h3 {
  font-family: "regular";
  font-size: 18px;
}

.padding-bottom-10 {
  padding-bottom: 10px;
}

::-moz-selection {
  /* Code for Firefox */
  color: #ffffff;
  background: #009688;
}

::selection {
  color: #ffffff;
  background: #009688;
}

.holder {
  width: 100%;
  padding: 20px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 3px 10px rgba(62, 85, 120, 0.07);
  margin: 0 auto;
  /* max-width: 1280px; */
}

@media only screen and (max-width: 991px) {
  .popup-main {
    left: 20px !important;
    right: 20px !important;
  }
}

@media only screen and (max-width: 600px) {
  .holder {
    padding: 20px;
  }
  .navbar-spacing {
    width: 100%;
  }
}

.pointer {
  cursor: pointer;
}

.break {
  border: 0;
  border-bottom: 1px dashed #d4d4d4;
  margin: 45px 0;
}

.dropzone .dz-preview .dz-image img {
  height: 120px;
  width: 120px;
  object-fit: cover;
}

select,
input[type="text"],
textarea {
  height: 35px;
  font-family: "Regular";
  margin: 0 10px 10px 0;
  border-radius: 0;
  outline: none;
  width: 100%;
  resize: vertical;
  font-size: 1rem;
  padding: 0.6rem 1rem;
  box-shadow: none;
  border: 1px solid rgb(169, 169, 169);
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
}

.capitalize{
  text-transform: capitalize
}
</style>
