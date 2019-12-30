<template>
  <div class="navbar-spacing padding-top-30">
    <div v-if="showDropdown" class="popup">
      <div class="popup-main">
        <div class="popup-title">
          <h3>URL Builder</h3>
          <textarea
            id="myInput"
            v-model="created_url_1"
            type="text"
            style="width:70%">
          </textarea>
          <div class="tooltip">
            <div class="add-section" @click="myFunction" @mouseout="outFunc">
              <span class="tooltiptext" id="myTooltip">Copy to clipboard</span>
              Copy URL
            </div>
          </div>
          <!-- <p @click="createURL">Create URL</p> -->
          
          <a  class="add-section" target="_blank" :href="baseurl + created_url_1">View Result</a>
          <!-- <div class="add_dropdown pointer" @click="addInput">+</div> -->
        </div>
        <div class="popup-body">
          <div>
            <div class="row">
              <div class="col s24" style="padding:0">
                <div class="col s24 m8 l6" style="padding:0">
                  <label>Category</label>
                  <select
                    @change="getSubcategories"
                    v-model="category_selected"
                  >
                    <option
                      v-for="p in allCategories"
                      :key="p.id"
                      :value="p.id"
                      >{{ p.name }}</option
                    >
                  </select>
                </div>
                <div class="col s24 m8 l6">
                  <label>SubCategory</label>
                  <select
                    @change="getsubCategoryDetails"
                    v-model="subcategory_selected"
                  >
                    <option
                      v-for="p in subcategory"
                      :key="p.id"
                      :value="p.id"
                      >{{ p.name }}</option
                    >
                  </select>
                </div>
              </div>
            </div>

            <div class="tesdt" v-if="subcategory_selected_name != 0">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tbody>
                  <tr>
                    <td>
                      <table
                        width="100%"
                        border="0"
                        cellspacing="2"
                        cellpadding="0"
                        class="product-spec"
                      >
                        <tbody>
                          <tr>
                            <th width="20%" style="text-align:left" colspan="">
                              General Options
                            </th>
                            <th></th>
                            <th></th>
                          </tr>
                          <tr>
                            <td>Limit (Required)</td>
                            <td>
                              <input
                                v-model="limit"
                                @input="createURL"
                                required
                                type="number"
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>Search Query</td>
                            <td>
                              <input
                                type="text"
                                v-model="searchQuery"
                                @input="createURL"
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>Brand</td>
                            <td>
                              <input
                                v-model="brand"
                                @input="createURL"
                                type="text"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>

              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tbody>
                  <tr v-for="(p, index) in specs" :key="p.id">
                    <td>
                      <table
                        width="100%"
                        border="0"
                        cellspacing="2"
                        cellpadding="0"
                        class="product-spec"
                      >
                        <tbody>
                          <tr>
                            <th width="20%" style="text-align:left" colspan="">
                              {{ p.name }}
                            </th>
                            <th></th>
                            <th></th>
                          </tr>
                          <tr v-for="(q, index1) in p['sub']" :key="q.id">
                            <td>{{ q.name }}</td>
                            <td>
                              <input
                                v-model="q.filter_value"
                                @input="createURL"
                                type="text"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="popup-action">
          <div class="pointer" @click="closeDropdownPanel">Close</div>
        </div>
      </div>
    </div>

    <div class="specification">
      <div class="holder">
        <h3>{{ subCat }}</h3>
        <div style="display: flex;justify-content: space-between">
          <div class="add-section" @click="add_menu" style="width: 100px">
            + Add Section
          </div>

          <div @click="url_builder" class="add-section" style="width: 100px">
            + URL Builder
          </div>

          <div class="add-section" @click="saveSubmenu" style="width: 50">
            Save
          </div>
        </div>

        <div class="row" v-for="(i, index) in data" :key="i.title">
          <h3>Column {{ index + 1 }}</h3>
          <div
            class="white col s24"
            style="margin: 10px 0;border:1px solid #e6e6e6; box-shadow: rgba(0, 0, 0, 0.03) 0px 2px 2px, rgba(0, 0, 0, 0.03) 0px 1px 0px"
          >
            <div
              class="section toolbar"
              style="display: flex;justify-content: space-between;border-bottom: 1px solid #e6e6e6"
            >
              <div
                class="container"
                style="display: flex;justify-content: space-between;"
              >
                <div class="add-section" @click="add_section(index)">
                  + Add Section
                </div>
                <div class="remove-section" @click="remove_section(index)">
                  Remove Section
                </div>
                <!-- <div class="add-section grey">Reset to Default</div> -->
              </div>
            </div>
            <div>
              <div class="spec-section white container" id="templateHolder">
                <div
                  v-for="(p, _index) in data[index]"
                  :key="p.id"
                  class="input_fields_wrap drag-list"
                  id="h"
                >
                  <div style="display:flex;justify-content:space-between">
                    <div class="">
                      <!-- Add More Fields -->
                    </div>
                    <div
                      class="remove-section"
                      @click="remove_menu(index, _index)"
                    >
                      Remove Menu
                    </div>
                  </div>
                  <br />
                  <input
                    type="text"
                    v-model="p.title"
                    class="header-data input"
                    placeholder="Header"
                    style="display: inline-block;"
                  />
                  <div>
                    <input
                      class="input"
                      v-model="p.url"
                      placeholder="URL"
                      id="data"
                      type="text"
                      style="display: inline-block; width: 100%"
                    />
                    <select
                      v-model="p.type"
                      style="display: inline-block; width: 50%;min-width: 100px "
                    >
                      <option value="0">Menu</option>
                      <option value="1">Heading</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  data() {
    return {
      showDropdown: false,
      subCat: "",
      input: [{ name: "" }],
      dropdown_title: "false",
      category: this.$cookies.get("submenu_edit"),
      data: [],
      specs: {},
      created_url: process.env.baseUrl + "/backend/api/products/search",
      baseurl: process.env.baseUrl + "/backend/api/products/search",
      subcategory: [],
      subcategory_selected: 0,
      subcategory_selected_name: "",
      category_selected: 0,
      allCategories: [],
      searchQuery: "",
      created_url_1: "",
      limit: 10,
      brand: ""
    };
  },

  methods: {
    myFunction() {
      var copyText = document.getElementById("myInput");
      copyText.select();
      copyText.setSelectionRange(0, 99999);
      document.execCommand("copy");

      var tooltip = document.getElementById("myTooltip");
      tooltip.innerHTML = "Copied: " + copyText.value;
    },

    outFunc() {
      var tooltip = document.getElementById("myTooltip");
      tooltip.innerHTML = "Copy to clipboard";
    },
    makeid: function(length) {
      var result = "";
      var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return new Date().getTime() + result;
    },
    url_builder: function() {
      this.showDropdown = true;
    },
    add_section: function(id) {
      var a = {
        title: "",
        url: "",
        type: 0
      };
      var temp = [];
      console.log(id);
      this.data[id].push(a);
    },
    createURL: function() {
      console.log("create url");
      // console.log()

      var a = {};

      for (let key1 in this.specs) {
        var specs = this.specs;

        var template_specs = this.specs;
        console.log(specs);

        if (template_specs.hasOwnProperty(key1)) {
          console.log(specs);

          for (let key2 in specs[key1].sub) {
            console.log(key1);
            var sub = this.specs[key1].sub;

            if (sub.hasOwnProperty(key2)) {
              // if (sub.hasOwnProperty("filter_value")) {
              //   b = [];
              //   print("name");

              //   if (specs[key]["sub"][key1]["name"] in k.keys()) {
              //     print(specs[key]["sub"][key1]["name"]);
              //     b = k[specs[key]["sub"][key1]["name"]];
              //   } else {
              //     k[specs[key]["sub"][key1]["name"]] = [];

              //     b.append(specs[key]["sub"][key1]["value"]);
              //     print(specs[key]["sub"][key1]["name"]);
              //     k[specs[key]["sub"][key1]["name"]] = b;
              //   }
              // }
              if (
                sub[key2].hasOwnProperty("filter_value") &&
                sub[key2].filter_value != ""
              ) {
                a[sub[key2].name.toLowerCase()] = sub[
                  key2
                ].filter_value.replace(/ /g, "");
              }
            }
          }
        }
      }
      console.log(a);

      // var b = {}
      // var c = []

      // for(var key in a){
      //   console.log(key)
      //   b[key] = a[key].split(',')
      //   for(var key1 in b){
      //     console.log(b[key1])
      //     for(key2 in b[key1]){

      //     }
      //   }
      //   console.log(b)
      //

      var paramsString = "";
      var searchParams = new URLSearchParams(paramsString);

      if (this.searchQuery != "") {
        searchParams.append("q", this.searchQuery.toLowerCase());
      }

      if (this.limit != "") {
        searchParams.append("limit", this.limit);
      }

      if (this.brand != "") {
        searchParams.append("brand", this.brand.toLowerCase());
      }

      for (var k in a) {
        var t = a[k].split(",");
        console.log(t);

        for (var i = 0; i < t.length; i++) {
          searchParams.append("filters", k.replace(/^\s+|\s+$/g,'') + "=" + t[i]);
        }

        this.created_url_1 =
          "/" +
          this.subcategory_selected_name
            .replace(/[\s.;,?&%0-9]/g, "-")
            .toLowerCase() +
          "?"
        }
      this.created_url_1 =  "?" + decodeURIComponent(searchParams.toString());
    },
    searchString: function() {
      // console.log(this.searchQuery)
      // this.created_url ="/" + this.subcategory_selected_name + "?offset=0&q=" + this.searchQuery;
      // // if(this.searchQuery != ""){
      // //   this.created_url ="/" + this.subcategory_selected_name + "?offset=0&q=" + this.searchQuery;
      // // }else{
      // //   this.created_url ="/" + this.subcategory_selected_name + "?offset=0";
      // // }
    },

    appendFilter: function(id) {
      console.log(id);
    },
    appendParam: function(id) {
      // console.log(id)
      // if(this.searchQuery != ""){
      //   this.created_url ="/" + this.subcategory_selected_name + "?offset=0&q=" + this.searchQuery;
      // }else{
      //   this.created_url ="/" + this.subcategory_selected_name + "?offset=0";
      // }
    },

    add_menu: function() {
      var a = {
        title: "",
        url: "",
        type: 0
      };
      var temp = [];
      temp.push(a);
      this.data.push(temp);
    },
    remove_section: function(index) {
      this.data.splice(index, 1);
    },
    remove_menu: function(section, index) {
      // this.$delete(this.data, index);
      console.log(section, index);
      this.data[section].splice(index, 1);
    },
    openDropdownPanel: function(section, index) {
      this.input = this.data[section]["sub"][index]["dropdown_items"];
      this.showDropdown = true;
    },
    closeDropdownPanel: function() {
      this.showDropdown = false;
    },
    addInput: function() {
      this.input.push({ name: "" });
    },
    remove_input: function(index) {
      this.input.splice(index, 1);
    },
    getCategory: function() {
      this.$store
        .dispatch("getCategory")
        .then(res => {
          console.log("response");
          this.allCategories = res.data;
        })
        .catch(err => {
          console.log("error in request", err);
        });
    },
    saveSubmenu: function() {
      console.log(JSON.stringify(this.data));

      var payload = {
        id: this.category,
        submenu: JSON.stringify(this.data)
      };

      this.$store
        .dispatch("saveSubmenu", payload)
        .then(res => {
          console.log(res);
          console.log("response");
          this.$router.push("/dashboard/templates/navmenu");
        })
        .catch(err => {
          console.log("error in request", err);
        });
    },
    getSubcategories: function() {
      this.$store
        .dispatch("getsubCategory", this.category_selected)
        .then(res => {
          console.log(res);
          console.log("________________");
          this.subcategory_selected = 0;
          this.subcategory_selected_name = "";
          console.log(this.subcategory_selected);
          this.subcategory = res.data;
        });
    },
    getsubCategoryDetails: function() {
      if (this.subcategory_selected != undefined) {
        this.$store
          .dispatch("getsubCategoryDetails", this.subcategory_selected)
          .then(res => {
            console.log(res);
            console.log("response");
            this.specs = [];
            if (res.data.specs.length != 0) {
              this.specs = JSON.parse(res.data.specs);
            }

            console.log(res.data.name);
            this.subcategory_selected_name = res.data.name.toLowerCase();
            this.createURL()
          })
          .catch(err => {
            console.log("error in request", err);
          });
      }
    }
  },

  mounted() {
    this.getCategory();
  }
};
</script>

<style>
.add-section,
.add_field_button {
  background: #2196f3;
  color: white;
  padding: 7px;
  border-radius: 2px;
  cursor: pointer;
  font-size: 12px;
}

.remove-section,
.remove_field {
  background: #f44336;
  margin-left: 10px;
  color: white;
  padding: 7px;
  border-radius: 2px;
  cursor: pointer;
  font-size: 12px;
}

input[type="input"],
input[type="number"],
.spec-section select {
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

.input_fields_wrap {
  padding: 15px 0 0;
}

.input_fields_wrap:not(:last-child) {
  border-bottom: 1px dashed #e6e6e6;
}

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
  max-width: 1000px;
  height: 642px;
  left: 260px;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1;
  border-radius: 5px;
}

.popup-body {
  height: 400px;
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

.add_dropdown {
  background-color: #4caf50;
  width: 40px;
  height: 40px;
  color: white;
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  box-shadow: 0px 6px 4px rgba(76, 175, 80, 0.25098);
  position: absolute;
  right: 40px;
}

.pointer {
  cursor: pointer;
}

.tooltip {
  position: relative;
  display: inline-block;
}

.tooltip .tooltiptext {
  visibility: hidden;
  width: 140px;
  background-color: #555;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px;
  position: absolute;
  z-index: 1;
  bottom: 150%;
  left: 50%;
  margin-left: -75px;
  opacity: 0;
  transition: opacity 0.3s;
}

.tooltip .tooltiptext::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #555 transparent transparent transparent;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
}
</style>
