(window.webpackJsonp=window.webpackJsonp||[]).push([[27],{247:function(t,e,o){var content=o(295);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(22).default)("3955d455",content,!0,{sourceMap:!1})},294:function(t,e,o){"use strict";var n=o(247);o.n(n).a},295:function(t,e,o){(e=o(21)(!1)).push([t.i,'.popup[data-v-faa0d030]{position:fixed;left:0;z-index:99}.popup[data-v-faa0d030],.popup-main[data-v-faa0d030]{top:0;right:0;bottom:0}.popup-main[data-v-faa0d030]{background-color:#fff;margin:auto;position:absolute;max-width:400px;height:290px;left:260px;z-index:1;border-radius:5px}.popup-body[data-v-faa0d030]{height:300px;overflow:auto;padding:30px}.popup-title[data-v-faa0d030]{padding:30px 30px 16px;border-bottom:1px solid rgba(0,0,0,.14118)}.popup-action[data-v-faa0d030]{position:absolute;bottom:0;width:100%;display:flex;justify-content:space-around;padding:25px;box-shadow:0 -7px 10px 0 rgba(0,0,0,.05098)}.popup[data-v-faa0d030]:after{background-color:rgba(0,0,0,.83);margin:auto;position:absolute;content:"";left:0;right:0;top:0;bottom:0}',""]),t.exports=e},327:function(t,e,o){"use strict";o.r(e);var n={data:function(){return{allproducts:[],newCategory:"",selected_category:0,sub_Category:"",category:[],editingCategoryID:0,category_selected:0,subcategory:[],showDropdown:!1,subcategory_selected:0,brand:[],editingCategory:"",showEditDropdown:!1,brand_selected:0,showDropdown1:!1,columns:[{label:"Category",field:"name"},{label:"Action",field:"details"}],sub_columns:[{label:"Sub Category",field:"name"},{label:"Category",field:"name"},{label:"Action",field:"details"}],rows:[]}},mounted:function(){this.getCategory()},methods:{editFilter:function(t){this.$cookies.set("submenu_edit",t,{path:"/",maxAge:604800}),this.$router.push("/dashboard/templates/navmenu/edit")},getCategory:function(){var t=this;this.$store.dispatch("getCategory").then((function(e){console.log(e),t.category=JSON.parse(JSON.stringify(e.data)),t.closeDropdownPanel()}))},addCategory:function(){var t=this,e=new FormData;e.append("name",this.newCategory),this.$store.dispatch("addCategory",e).then((function(e){console.log(e),t.getCategory(),t.newCategory="",t.closeDropdownPanel()}))},addSubCategory:function(){var t=this;this.closeSubCatModel();var e={category:this.selected_category,name:this.sub_Category};this.$store.dispatch("addSubCategory",e).then((function(e){console.log(e),t.getSubcategories()}))},getSubcategories:function(){var t=this;this.$store.dispatch("getsubCategory",this.category_selected).then((function(e){console.log(e),t.subcategory=e.data}))},getBrand:function(){var t=this;this.$store.dispatch("getBrand",this.subcategory_selected).then((function(e){console.log(e),t.brand=e.data}))},deleteCategory:function(t){var e=this;this.$store.dispatch("deleteCategory",t).then((function(t){console.log(t),e.getCategory(),e.getSubcategories(),e.getBrand()}))},editCategory:function(){var t=this;this.$store.dispatch("editCategory",{id:this.editingCategoryID,payload:{name:this.editingCategory}}).then((function(e){console.log(e),t.getCategory(),t.getSubcategories(),t.getBrand()}))},deleteSubCategory:function(t){var e=this;this.$store.dispatch("deleteSubCategory",t).then((function(t){console.log(t),e.getSubcategories(),e.getBrand()}))},deleteBrand:function(t){var e=this;this.$store.dispatch("deleteBrand",t).then((function(t){console.log(t),e.getBrand()}))},openEditCategory:function(t){this.editingCategoryID=t,this.showEditDropdown=!0},openDropdownPanel:function(){this.showDropdown=!0},openSubCatModel:function(){this.showDropdown1=!0},closeDropdownPanel:function(){this.showDropdown=!1,this.showEditDropdown=!1,this.newCategory="",this.editingCategory=""},closeSubCatModel:function(){this.showDropdown1=!1}}},r=(o(294),o(14)),component=Object(r.a)(n,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"navbar-spacing padding-top-30"},[t.showDropdown?o("div",{staticClass:"popup"},[o("div",{staticClass:"popup-main"},[t._m(0),t._v(" "),o("div",{staticClass:"popup-body"},[o("div",[o("input",{directives:[{name:"model",rawName:"v-model",value:t.newCategory,expression:"newCategory"}],staticStyle:{width:"70%"},attrs:{type:"text"},domProps:{value:t.newCategory},on:{input:function(e){e.target.composing||(t.newCategory=e.target.value)}}})])]),t._v(" "),o("div",{staticClass:"popup-action"},[o("div",{staticClass:"pointer",on:{click:t.addCategory}},[t._v("Save")]),t._v(" "),o("div",{staticClass:"pointer",on:{click:t.closeDropdownPanel}},[t._v("Cancel")])])])]):t._e(),t._v(" "),t.showEditDropdown?o("div",{staticClass:"popup"},[o("div",{staticClass:"popup-main"},[t._m(1),t._v(" "),o("div",{staticClass:"popup-body"},[o("div",[o("input",{directives:[{name:"model",rawName:"v-model",value:t.editingCategory,expression:"editingCategory"}],staticStyle:{width:"70%"},attrs:{type:"text"},domProps:{value:t.editingCategory},on:{input:function(e){e.target.composing||(t.editingCategory=e.target.value)}}})])]),t._v(" "),o("div",{staticClass:"popup-action"},[o("div",{staticClass:"pointer",on:{click:t.editCategory}},[t._v("Save")]),t._v(" "),o("div",{staticClass:"pointer",on:{click:t.closeDropdownPanel}},[t._v("Cancel")])])])]):t._e(),t._v(" "),t.showDropdown1?o("div",{staticClass:"popup"},[o("div",{staticClass:"popup-main"},[t._m(2),t._v(" "),o("div",{staticClass:"popup-body"},[o("div",[o("select",{directives:[{name:"model",rawName:"v-model",value:t.selected_category,expression:"selected_category"}],staticStyle:{width:"70%"},on:{change:function(e){var o=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){return"_value"in t?t._value:t.value}));t.selected_category=e.target.multiple?o:o[0]}}},t._l(t.category,(function(p){return o("option",{key:p.id,domProps:{value:p.id}},[t._v(t._s(p.name))])})),0),t._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:t.sub_Category,expression:"sub_Category"}],staticStyle:{width:"70%"},attrs:{type:"text"},domProps:{value:t.sub_Category},on:{input:function(e){e.target.composing||(t.sub_Category=e.target.value)}}})])]),t._v(" "),o("div",{staticClass:"popup-action"},[o("div",{staticClass:"pointer",on:{click:t.addSubCategory}},[t._v("Save")]),t._v(" "),o("div",{staticClass:"pointer",on:{click:t.closeSubCatModel}},[t._v("Cancel")])])])]):t._e(),t._v(" "),o("div",{staticClass:"holder"},[o("div",{staticClass:"column-padding header-bottom",staticStyle:{display:"flex","justify-content":"space-between"}},[o("h3",{staticStyle:{display:"flex","align-items":"center"}},[t._v("Navigation Menu")]),t._v(" "),o("button",{staticClass:"btn btn-red",staticStyle:{display:"flex","align-items":"center"},on:{click:t.openDropdownPanel}},[o("p",{staticClass:"white-text"},[t._v("+ Add New")])])]),t._v(" "),o("div",{staticClass:"row"},[o("vue-good-table",{attrs:{columns:t.columns,rows:t.category},scopedSlots:t._u([{key:"table-row",fn:function(e){return["details"===e.column.field?o("span",[o("button",{staticClass:"btn btn-primary",attrs:{type:"button"},on:{click:function(o){return t.editFilter(e.row.id)}}},[t._v("Edit")]),t._v(" "),o("button",{staticClass:"btn btn-primary",attrs:{type:"button"},on:{click:function(o){return t.deleteCategory(e.row.id)}}},[t._v("Delete")])]):o("span",[t._v(t._s(e.formattedRow[e.column.field]))])]}}])})],1)])])}),[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"popup-title"},[e("h3",[this._v("Add Category")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"popup-title"},[e("h3",[this._v("Edit Category")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"popup-title"},[e("h3",[this._v("Add Sub Category")])])}],!1,null,"faa0d030",null);e.default=component.exports}}]);