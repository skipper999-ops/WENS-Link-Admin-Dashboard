(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{220:function(t,e,o){var content=o(249);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(19).default)("5e3c05ca",content,!0,{sourceMap:!1})},248:function(t,e,o){"use strict";var l=o(220);o.n(l).a},249:function(t,e,o){(e=o(18)(!1)).push([t.i,'.popup[data-v-2d46d334]{position:fixed;left:0;z-index:99}.popup[data-v-2d46d334],.popup-main[data-v-2d46d334]{top:0;right:0;bottom:0}.popup-main[data-v-2d46d334]{background-color:#fff;margin:auto;position:absolute;max-width:400px;height:460px;left:260px;z-index:1;border-radius:5px}.popup-body[data-v-2d46d334]{height:300px;overflow:auto;padding:30px}.popup-title[data-v-2d46d334]{padding:30px 30px 16px;border-bottom:1px solid rgba(0,0,0,.14118)}.popup-action[data-v-2d46d334]{position:absolute;bottom:0;width:100%;display:-webkit-box;display:flex;justify-content:space-around;padding:25px;box-shadow:0 -7px 10px 0 rgba(0,0,0,.05098)}.popup[data-v-2d46d334]:after{background-color:rgba(0,0,0,.83);margin:auto;position:absolute;content:"";left:0;right:0;top:0;bottom:0}input[data-v-2d46d334],select[data-v-2d46d334]{height:35px;margin:0 10px 10px 0;border-radius:0;outline:none;width:100%;font-size:1rem;padding:.6rem 1rem;box-shadow:none;-webkit-transition:all .3s;transition:all .3s}',""]),t.exports=e},305:function(t,e,o){"use strict";o.r(e);var l={data:function(){return{allCarousels:[],editingCarousel:{},origin:"https://wenslink.com/search",showDropdown:!1,showDropdown1:!1,editDropdown:!1,isURLBuilderVisible:!1,columns:[{label:"Title",field:"title",width:"250px"},{label:"Subtitle",field:"subtitle",width:"200px"},{label:"Image",field:"img",width:"100px"},{label:"URL",field:"url",width:"200px"},{label:"Action",field:"action",width:"250px"}],title:"",carousel_type:1,subtitle:"",url:"",img:""}},components:{URL:o(84).a},mounted:function(){this.GetAllCarousels()},methods:{handleFileUpload:function(){this.img=this.$refs.fileInput.files[0]},GetAllCarousels:function(){var t=this;this.$store.dispatch("GetAllCarousels").then((function(e){console.log(e),t.allCarousels=JSON.parse(JSON.stringify(e.data)).filter((function(t){return 1==t.carousel_type}))}))},addCarousels:function(){var t=this,e=new FormData;e.append("title",this.title),e.append("url",this.url),e.append("subtitle",this.subtitle),e.append("carousel_type",this.carousel_type),1==this.$refs.fileInputAdd.files.length&&e.append("img",this.$refs.fileInputAdd.files[0]),console.log(e),this.$store.dispatch("createcarousel",e).then((function(e){console.log(e),t.GetAllCarousels(),t.closeDropdownPanel()}))},saveCarousel:function(){var t=this,e=new FormData;e.append("title",this.editingCarousel.title),e.append("url",this.editingCarousel.url),e.append("subtitle",this.editingCarousel.subtitle),e.append("carousel_type",this.editingCarousel.carousel_type),1==this.$refs.fileInput.files.length&&e.append("img",this.$refs.fileInput.files[0]);var o=this.editingCarousel.id;console.log(e),this.$store.dispatch("edithomepagecarouseldetails",{payload:e,id:o}).then((function(e){console.log(e),t.GetAllCarousels(),t.editDropdown=!1}))},customizeCarousel:function(t){console.log(t),this.$cookies.set("customizeCarousel",t,{path:"/",maxAge:604800}),this.$router.push("/dashboard/homepage/new/create")},editCarousel:function(t){console.log(t),this.editingCarousel=this.allCarousels.filter((function(e){return e.id===t}))[0],this.editDropdown=!0},deleteBanner:function(t){var e=this;this.$store.dispatch("editDeleteBanner",t).then((function(t){console.log(t),e.getAllBanner()}))},openDropdownPanel:function(){this.showDropdown=!0},closeDropdownPanel:function(){this.showDropdown=!1,this.title="",this.subtitle="",this.url="",this.carousel_type=1}}},n=(o(248),o(14)),component=Object(n.a)(l,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"navbar-spacing padding-top-30"},[t.isURLBuilderVisible?o("div",{staticClass:"popup"},[o("div",{staticClass:"popup-main"},[o("URL"),t._v(" "),o("div",{staticClass:"popup-action"},[o("div",{staticClass:"pointer",on:{click:function(e){t.isURLBuilderVisible=!1}}},[t._v("Close")])])],1)]):t._e(),t._v(" "),o("div",{directives:[{name:"show",rawName:"v-show",value:t.showDropdown,expression:"showDropdown"}],staticClass:"popup"},[o("div",{staticClass:"popup-main"},[o("div",{staticClass:"popup-title"},[o("div",{staticStyle:{display:"flex","justify-content":"space-between","align-items":"center"}},[o("h3",[t._v("Add Sections")]),t._v(" "),o("button",{staticClass:"btn btn-primary btn-small",attrs:{type:"button"},on:{click:function(e){t.isURLBuilderVisible=!0}}},[t._v("URL Builder")])])]),t._v(" "),o("div",{staticClass:"popup-body"},[o("div",{staticClass:"form-control"},[o("label",[t._v("Title")]),t._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:t.title,expression:"title"}],staticStyle:{width:"70%"},attrs:{type:"text"},domProps:{value:t.title},on:{input:function(e){e.target.composing||(t.title=e.target.value)}}})]),t._v(" "),o("div",{staticClass:"form-control"},[o("label",[t._v("Image")]),t._v(" "),o("input",{ref:"fileInputAdd",staticStyle:{width:"70%"},attrs:{type:"file"}})]),t._v(" "),o("div",{staticClass:"form-control"},[o("label",[t._v("Sub-Title")]),t._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:t.subtitle,expression:"subtitle"}],staticStyle:{width:"70%"},attrs:{type:"text"},domProps:{value:t.subtitle},on:{input:function(e){e.target.composing||(t.subtitle=e.target.value)}}})]),t._v(" "),1==t.carousel_type?o("div",{staticClass:"form-control"},[o("label",[t._v("URL")]),t._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:t.url,expression:"url"}],staticStyle:{width:"70%"},attrs:{type:"text"},domProps:{value:t.url},on:{input:function(e){e.target.composing||(t.url=e.target.value)}}})]):t._e()]),t._v(" "),o("div",{staticClass:"popup-action"},[o("div",{staticClass:"pointer",on:{click:t.addCarousels}},[t._v("Save")]),t._v(" "),o("div",{staticClass:"pointer",on:{click:t.closeDropdownPanel}},[t._v("Cancel")])])])]),t._v(" "),o("div",{directives:[{name:"show",rawName:"v-show",value:t.editDropdown,expression:"editDropdown"}],staticClass:"popup"},[o("div",{staticClass:"popup-main"},[t._m(0),t._v(" "),o("div",{staticClass:"popup-body"},[o("div",{staticClass:"form-control"},[o("label",[t._v("Title")]),t._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:t.editingCarousel.title,expression:"editingCarousel.title"}],staticStyle:{width:"70%"},attrs:{type:"text"},domProps:{value:t.editingCarousel.title},on:{input:function(e){e.target.composing||t.$set(t.editingCarousel,"title",e.target.value)}}})]),t._v(" "),o("div",{staticClass:"form-control"},[o("label",[t._v("Image")]),t._v(" "),o("input",{ref:"fileInput",staticStyle:{width:"70%"},attrs:{type:"file"}})]),t._v(" "),o("div",{staticClass:"form-control"},[o("label",[t._v("Sub-Title")]),t._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:t.editingCarousel.subtitle,expression:"editingCarousel.subtitle"}],staticStyle:{width:"70%"},attrs:{type:"text"},domProps:{value:t.editingCarousel.subtitle},on:{input:function(e){e.target.composing||t.$set(t.editingCarousel,"subtitle",e.target.value)}}})]),t._v(" "),1==t.editingCarousel.carousel_type?o("div",{staticClass:"form-control"},[o("label",[t._v("URL")]),t._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:t.editingCarousel.url,expression:"editingCarousel.url"}],staticStyle:{width:"70%"},attrs:{type:"text"},domProps:{value:t.editingCarousel.url},on:{input:function(e){e.target.composing||t.$set(t.editingCarousel,"url",e.target.value)}}})]):t._e()]),t._v(" "),o("div",{staticClass:"popup-action"},[o("div",{staticClass:"pointer",on:{click:t.saveCarousel}},[t._v("Save")]),t._v(" "),o("div",{staticClass:"pointer",on:{click:function(e){t.editDropdown=!1}}},[t._v("Cancel")])])])]),t._v(" "),o("div",{staticClass:"specification"},[o("div",{staticClass:"holder"},[o("div",{staticClass:"column-padding header-bottom",staticStyle:{display:"flex","justify-content":"space-between"}},[t._m(1),t._v(" "),o("button",{staticClass:"btn btn-red white-text",on:{click:t.openDropdownPanel}},[t._v("Add Sections")])]),t._v(" "),o("div",{staticClass:"row"},[o("vue-good-table",{attrs:{columns:t.columns,rows:t.allCarousels,"line-numbers":!0},scopedSlots:t._u([{key:"table-row",fn:function(e){return["action"===e.column.field?o("span",[2==e.row.carousel_type?o("button",{staticClass:"btn btn-success",attrs:{type:"button"},on:{click:function(o){return t.customizeCarousel(e.row.id)}}},[t._v("Customize")]):t._e(),t._v(" "),o("button",{staticClass:"btn btn-primary",attrs:{type:"button"},on:{click:function(o){return t.editCarousel(e.row.id)}}},[t._v("Edit")])]):"carousel_type"===e.column.field?o("span",[2==e.row.carousel_type?o("p",[t._v(t._s(e.row.carousel_type)+" ( Grouped )")]):o("p",[t._v(t._s(e.row.carousel_type)+" ( Single Category Products )")])]):"img"===e.column.field?o("span",[null!=e.row.img?o("a",{attrs:{target:"_blank",href:e.row.img}},[t._v(t._s(e.row.img))]):o("p",[t._v("Not Applicable")])]):"url"===e.column.field?o("span",[1==e.row.carousel_type?o("a",{attrs:{target:"_blank",href:t.origin+e.row.url}},[t._v(t._s(t.origin)+t._s(e.row.url))]):o("p",[t._v("Not Applicable")])]):o("span",[t._v(t._s(e.formattedRow[e.column.field]))])]}}])})],1)])])])}),[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"popup-title"},[e("h3",[this._v("Edit Section")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("h3",[this._v("All Homepage Sections")]),this._v(" "),e("p",[this._v("Here you can add clickable homepage image sections")])])}],!1,null,"2d46d334",null);e.default=component.exports}}]);