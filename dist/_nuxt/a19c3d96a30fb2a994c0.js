(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{233:function(t,e,o){"use strict";(function(t){e.a={name:"Catalogue",data:function(){return{columns:[{label:"ID",field:"id"},{label:"Product Name",field:"product_id.product_name",width:"400px"},{label:"Image",field:"image"},{label:"Original MRP",field:"stock"},{label:"Original MRP",field:"stock"},{label:"Stock Count",field:"stock"},{label:"Brand",field:"product_id.brand"},{label:"Category",field:"product_id.category.name"},{label:"Action",field:"details",width:"200px"}],rows:[{id:1,name:"Mobile",age:20,createdAt:"2011-10-31",details:"<p>asa</p>"}],allproducts:[],baseurl:t.env.baseUrl,next:"",prev:"",limit:10,offset:0,pagination_buttons:0,center_buttons:[],max_count:0,max_count_value:0,query:"",pageNum:1,maxPages:1,maxPerPage:9}},mounted:function(){this.offset_count()},watch:{query:function(a,b){console.log(a,b)}},methods:{clearQuery:function(){this.query="",this.limit=10,this.offset=0,this.getAllCatalogueProducts()},paginationClicked:function(t){this.pageNum=t,this.getMealsPagination()},offset_count:function(){this.limit,this.offset;this.getAllCatalogueProducts()},getAllCatalogueProducts:function(){var t=this,e=this.limit,o=this.offset,l=this.query;this.$store.dispatch("allProducts__single",{limit:e,offset:o,query:l}).then((function(e){try{if(0==t.limit){t.allproducts=JSON.parse(JSON.stringify(e.data)),t.max_count=e.data.count,t.maxPages=e.data.count;for(var i=0;i<t.allproducts.length;i++)t.allproducts[i].product_id.images=JSON.parse(t.allproducts[i].product_id.images)}else{console.log(e),t.allproducts=JSON.parse(JSON.stringify(e.data.results)),t.max_count=e.data.count;for(i=0;i<t.allproducts.length;i++)t.allproducts[i].product_id.images=JSON.parse(t.allproducts[i].product_id.images);console.log(t.allproducts),t.pagination_buttons=Math.ceil((e.data.count-t.offset)/t.limit),t.center_buttons=[],t.center_buttons.push(Math.ceil(t.pagination_buttons/2)-1),t.center_buttons.push(Math.ceil(t.pagination_buttons/2)),t.center_buttons.push(Math.ceil(t.pagination_buttons/2)+1),t.max_count_value=parseInt(t.max_count/t.limit)*t.limit}}catch(t){}}))},deleteProduct:function(t){var e=this;this.$store.dispatch("deleteProduct",t).then((function(t){console.log(t),e.getAllCatalogueProducts()}))},editProduct:function(t){console.log(t),this.$cookies.set("product_edit",t,{path:"/",maxAge:604800}),this.$router.push("/dashboard/products/edit/single")},next_page:function(){this.offset=this.offset+this.limit,this.offset>this.max_count&&(this.offset=parseInt(this.max_count/this.limit)*this.limit);this.limit,this.offset;this.getAllCatalogueProducts()},prev_page:function(){this.offset=this.offset-this.limit,this.offset<0&&(this.offset=0);this.limit,this.offset;this.getAllCatalogueProducts()},change_limit:function(){this.offset=0,this.limit=parseInt(this.limit);parseInt(this.limit),this.offset;this.getAllCatalogueProducts()}}}}).call(this,o(71))},234:function(t,e,o){var content=o(279);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(22).default)("0d86857b",content,!0,{sourceMap:!1})},278:function(t,e,o){"use strict";var l=o(234);o.n(l).a},279:function(t,e,o){(e=o(21)(!1)).push([t.i,".pagination_buttons{display:flex;padding:10px;justify-content:space-between}.btn{padding:9px 12px}body{background:#f2f2f2;font-family:Open Sans,sans-serif}.search{width:100%;position:relative;display:flex}.searchTerm{width:100%;border:3px solid #00b4cc;border-right:none;padding:5px;height:20px;border-radius:5px 0 0 5px;outline:none;color:#9dbfaf}.searchTerm:focus{color:#000}.searchButton{height:36px;border:1px solid #00b4cc;background:#00b4cc;text-align:center;color:#fff;border-radius:0 5px 5px 0;cursor:pointer;font-size:14px}",""]),t.exports=e},347:function(t,e,o){"use strict";o.r(e);var l=o(233).a,n=(o(278),o(14)),component=Object(n.a)(l,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"navbar-spacing padding-top-30"},[o("div",{staticClass:"specification"},[o("div",{staticClass:"holder"},[o("div",{staticClass:"column-padding header-bottom",staticStyle:{display:"flex","justify-content":"space-between"}},[o("h3",{staticStyle:{display:"flex","align-items":"center"}},[t._v("All Products")]),t._v(" "),o("div",{staticClass:"wrap"},[o("div",{staticClass:"search"},[o("input",{directives:[{name:"model",rawName:"v-model",value:t.query,expression:"query"}],staticClass:"searchTerm",attrs:{type:"text",placeholder:"Search..."},domProps:{value:t.query},on:{input:function(e){e.target.composing||(t.query=e.target.value)}}}),t._v(" "),o("button",{staticClass:"searchButton",attrs:{type:"submit"},on:{click:t.getAllCatalogueProducts}},[t._v("Search")])]),t._v(" "),""!=t.query?o("a",{staticStyle:{display:"flex","justify-content":"flex-end"},on:{click:t.clearQuery}},[t._v("Clear")]):t._e()])]),t._v(" "),o("div",{staticClass:"row"},[o("vue-good-table",{attrs:{columns:t.columns,rows:t.allproducts},scopedSlots:t._u([{key:"table-row",fn:function(e){return["id"===e.column.field?o("span",[o("p",[t._v(t._s(t.offset+e.row.originalIndex+1))])]):"image"===e.column.field?o("span",[o("img",{staticStyle:{width:"40px",height:"40px","object-fit":"contain"},attrs:{src:t.baseurl+"/backend/api/products/image/40/40/"+e.row.product_id.images[0]}})]):"details"===e.column.field?o("span",{staticStyle:{display:"flex"}},[o("button",{staticClass:"btn btn-primary",staticStyle:{"margin-right":"10px"},attrs:{type:"button"},on:{click:function(o){return t.editProduct(e.row.id)}}},[t._v("Edit")]),t._v(" "),o("button",{staticClass:"btn btn-red white-text",attrs:{type:"button"},on:{click:function(o){return t.deleteProduct(e.row.id)}}},[t._v("Delete")])]):o("span",[t._v(t._s(e.formattedRow[e.column.field]))])]}}])}),t._v(" "),o("div",{staticClass:"pagination_buttons"},[o("div",{staticClass:"limit"},[o("select",{directives:[{name:"model",rawName:"v-model",value:t.limit,expression:"limit"}],on:{change:[function(e){var o=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){return"_value"in t?t._value:t.value}));t.limit=e.target.multiple?o:o[0]},t.change_limit]}},[o("option",[t._v("3")]),t._v(" "),o("option",[t._v("10")]),t._v(" "),o("option",[t._v("25")]),t._v(" "),o("option",[t._v("50")]),t._v(" "),o("option",[t._v("100")]),t._v(" "),o("option",{attrs:{value:"0"}},[t._v("All")])]),t._v(" "),0!=t.limit?o("p",[t._v("Page "+t._s(t.offset/t.limit+1))]):t._e()]),t._v(" "),o("div",{staticClass:"pagin"},[0!=t.offset?o("div",{staticClass:"btn btn-success",on:{click:t.prev_page}},[t._v("Prev")]):t._e(),t._v(" "),t.offset!=t.max_count_value?o("div",{staticClass:"btn btn-success",on:{click:t.next_page}},[t._v("Next")]):t._e()])])],1)])])])}),[],!1,null,null,null);e.default=component.exports}}]);