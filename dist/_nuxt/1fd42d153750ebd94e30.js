(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{246:function(t,e,o){var content=o(296);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(22).default)("6fb840d9",content,!0,{sourceMap:!1})},295:function(t,e,o){"use strict";var l=o(246);o.n(l).a},296:function(t,e,o){(e=o(21)(!1)).push([t.i,'.carousel-card[data-v-e150a3a4],.carousel-card.add[data-v-e150a3a4]{border:1px dashed #e0e0e0;border-radius:2px;padding:10px}.carousel-card.add[data-v-e150a3a4]{height:311px;display:flex;justify-content:center;align-items:center;cursor:pointer}.carousel-card.add>p[data-v-e150a3a4]{font-size:15px;font-weight:700}.viewed_image img[data-v-e150a3a4]{height:200px;width:100%;-o-object-fit:contain;object-fit:contain}.offer-title[data-v-e150a3a4]{font-weight:700;font-size:15px;padding:5px 0}.offer-text[data-v-e150a3a4]{color:green;padding:5px 0}.offer-subtitle[data-v-e150a3a4]{padding:5px 0;color:#333}.text-center[data-v-e150a3a4]{text-align:center}.card-view-row>.col[data-v-e150a3a4]:nth-child(4n){padding-right:0}.card-view-row>.col[data-v-e150a3a4]:nth-child(4n+1){padding-left:0}.card-view-row>.col[data-v-e150a3a4]{padding-bottom:20px}.popup[data-v-e150a3a4]{position:fixed;left:0;z-index:99}.popup[data-v-e150a3a4],.popup-main[data-v-e150a3a4]{top:0;right:0;bottom:0}.popup-main[data-v-e150a3a4]{background-color:#fff;margin:auto;position:absolute;max-width:400px;height:460px;left:260px;z-index:1;border-radius:5px}.popup-body[data-v-e150a3a4]{height:300px;overflow:auto;padding:30px}.popup-title[data-v-e150a3a4]{padding:30px 30px 16px;border-bottom:1px solid rgba(0,0,0,.14118)}.popup-action[data-v-e150a3a4]{position:absolute;bottom:0;width:100%;display:flex;justify-content:space-around;padding:25px;box-shadow:0 -7px 10px 0 rgba(0,0,0,.05098)}.popup[data-v-e150a3a4]:after{background-color:rgba(0,0,0,.83);margin:auto;position:absolute;content:"";left:0;right:0;top:0;bottom:0}input[data-v-e150a3a4],select[data-v-e150a3a4]{height:35px;margin:0 10px 10px 0;border-radius:0;outline:none;width:100%;font-size:1rem;padding:.6rem 1rem;box-shadow:none;transition:all .3s}',""]),t.exports=e},328:function(t,e,o){"use strict";o.r(e);var l=o(37),n={data:function(){var t;return t={allCarouselDetails:[],editingCarouselDetails:{},title:"",baseurl:"https://www.wenslink.com",showDropdown:!1,editDropdown:!1,origin:"https://www.wenslink.com/search"},Object(l.a)(t,"title",""),Object(l.a)(t,"detailtitle",""),Object(l.a)(t,"offer_text",""),Object(l.a)(t,"subtitle",""),Object(l.a)(t,"img",""),Object(l.a)(t,"url",""),t},mounted:function(){var t=this;this.gethomepagecarouseldetails(),this.$store.dispatch("gethomepagecarousel").then((function(e){console.log(e),t.title=e.data.title}))},methods:{handleFileUpload:function(){this.img=this.$refs.fileInput.files[0]},gethomepagecarouseldetails:function(){var t=this;this.$store.dispatch("gethomepagecarouseldetails").then((function(e){console.log(e),t.allCarouselDetails=e.data}))},addCarouselDetail:function(){var t=this,e=new FormData;e.append("home_carousel",this.$cookies.get("customizeCarousel")),e.append("title",this.detailtitle),e.append("offer_text",this.offer_text),e.append("subtitle",this.subtitle),e.append("url",this.url),e.append("img",this.img),this.$store.dispatch("gethomepagecarouseldetailscreate",e).then((function(e){console.log(e),t.gethomepagecarouseldetails(),t.closeDropdownPanel()}))},openDropdownPanel:function(){this.showDropdown=!0},closeDropdownPanel:function(){this.showDropdown=!1,this.detailtitle="",this.offer_text="",this.subtitle="",this.img="",this.url=""},deleteCarouselDetail:function(t){var e=this;this.$store.dispatch("deletehomepagecarousel",t).then((function(t){e.gethomepagecarouseldetails(),e.editDropdown=!1}))},editCarouselDetail:function(t){this.editingCarouselDetails=this.allCarouselDetails.filter((function(e){return e.id===t}))[0],this.editDropdown=!0,console.log(this.$refs.fileInput.files.length)},saveCarouselDetail:function(t){var e=this,o=new FormData;o.append("title",this.editingCarouselDetails.title),o.append("offer_text",this.editingCarouselDetails.offer_text),o.append("subtitle",this.editingCarouselDetails.subtitle),o.append("url",this.editingCarouselDetails.url),1==this.$refs.fileInput.files.length&&o.append("img",this.$refs.fileInput.files[0]);t=this.editingCarouselDetails.id;console.log(o),this.$store.dispatch("edithomepagecarousel",{payload:o,id:t}).then((function(t){e.gethomepagecarouseldetails(),e.editDropdown=!1}))}}},r=(o(295),o(14)),component=Object(r.a)(n,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"navbar-spacing padding-top-30"},[o("div",{directives:[{name:"show",rawName:"v-show",value:t.showDropdown,expression:"showDropdown"}],staticClass:"popup"},[o("div",{staticClass:"popup-main"},[t._m(0),t._v(" "),o("div",{staticClass:"popup-body"},[o("div",{staticClass:"form-control"},[o("label",[t._v("Title")]),t._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:t.detailtitle,expression:"detailtitle"}],staticStyle:{width:"70%"},attrs:{type:"text"},domProps:{value:t.detailtitle},on:{input:function(e){e.target.composing||(t.detailtitle=e.target.value)}}})]),t._v(" "),o("div",{staticClass:"form-control"},[o("label",[t._v("offer_text")]),t._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:t.offer_text,expression:"offer_text"}],staticStyle:{width:"70%"},attrs:{type:"text"},domProps:{value:t.offer_text},on:{input:function(e){e.target.composing||(t.offer_text=e.target.value)}}})]),t._v(" "),o("div",{staticClass:"form-control"},[o("label",[t._v("Sub-Title")]),t._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:t.subtitle,expression:"subtitle"}],staticStyle:{width:"70%"},attrs:{type:"text"},domProps:{value:t.subtitle},on:{input:function(e){e.target.composing||(t.subtitle=e.target.value)}}})]),t._v(" "),o("div",{staticClass:"form-control"},[o("label",[t._v("Image")]),t._v(" "),o("input",{ref:"fileInput",staticStyle:{width:"70%"},attrs:{type:"file"}})]),t._v(" "),o("div",{staticClass:"form-control"},[o("label",[t._v("url")]),t._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:t.url,expression:"url"}],staticStyle:{width:"70%"},attrs:{type:"text"},domProps:{value:t.url},on:{input:function(e){e.target.composing||(t.url=e.target.value)}}})])]),t._v(" "),o("div",{staticClass:"popup-action"},[o("div",{staticClass:"pointer",on:{click:t.addCarouselDetail}},[t._v("Save")]),t._v(" "),o("div",{staticClass:"pointer",on:{click:t.closeDropdownPanel}},[t._v("Cancel")])])])]),t._v(" "),o("div",{directives:[{name:"show",rawName:"v-show",value:t.editDropdown,expression:"editDropdown"}],staticClass:"popup"},[o("div",{staticClass:"popup-main"},[t._m(1),t._v(" "),o("div",{staticClass:"popup-body"},[o("div",{staticClass:"form-control"},[o("label",[t._v("Title")]),t._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:t.editingCarouselDetails.title,expression:"editingCarouselDetails.title"}],staticStyle:{width:"70%"},attrs:{type:"text"},domProps:{value:t.editingCarouselDetails.title},on:{input:function(e){e.target.composing||t.$set(t.editingCarouselDetails,"title",e.target.value)}}})]),t._v(" "),o("div",{staticClass:"form-control"},[o("label",[t._v("offer_text")]),t._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:t.editingCarouselDetails.offer_text,expression:"editingCarouselDetails.offer_text"}],staticStyle:{width:"70%"},attrs:{type:"text"},domProps:{value:t.editingCarouselDetails.offer_text},on:{input:function(e){e.target.composing||t.$set(t.editingCarouselDetails,"offer_text",e.target.value)}}})]),t._v(" "),o("div",{staticClass:"form-control"},[o("label",[t._v("Sub-Title")]),t._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:t.editingCarouselDetails.subtitle,expression:"editingCarouselDetails.subtitle"}],staticStyle:{width:"70%"},attrs:{type:"text"},domProps:{value:t.editingCarouselDetails.subtitle},on:{input:function(e){e.target.composing||t.$set(t.editingCarouselDetails,"subtitle",e.target.value)}}})]),t._v(" "),o("div",{staticClass:"form-control"},[o("label",[t._v("Image")]),t._v(" "),o("img",{staticStyle:{"object-fit":"contain",height:"100px"},attrs:{src:t.editingCarouselDetails.img},on:{error:t.setFallbackImageUrl}}),t._v(" "),o("input",{ref:"fileInput",staticStyle:{width:"70%"},attrs:{type:"file"},on:{change:function(e){return t.handleFileUpload()}}})]),t._v(" "),o("div",{staticClass:"form-control"},[o("label",[t._v("url")]),t._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:t.editingCarouselDetails.url,expression:"editingCarouselDetails.url"}],staticStyle:{width:"70%"},attrs:{type:"text"},domProps:{value:t.editingCarouselDetails.url},on:{input:function(e){e.target.composing||t.$set(t.editingCarouselDetails,"url",e.target.value)}}})])]),t._v(" "),o("div",{staticClass:"popup-action"},[o("div",{staticClass:"pointer",on:{click:t.saveCarouselDetail}},[t._v("Save")]),t._v(" "),o("div",{staticClass:"pointer",on:{click:function(e){t.editDropdown=!1}}},[t._v("Cancel")])])])]),t._v(" "),o("div",{staticClass:"holder"},[o("div",{staticClass:"row"},[o("div",{staticClass:"col s24"},[o("div",{staticClass:"padding-bottom-15",staticStyle:{display:"flex","justify-content":"space-between"}},[o("h3",[t._v(t._s(t.title))])])]),t._v(" "),o("div",{staticClass:"col s24"},[o("div",{staticClass:"padding-top-15"},[o("div",{staticClass:"row card-view-row"},[t._l(t.allCarouselDetails,(function(p){return o("div",{key:p.id,staticClass:"col s8 l6"},[o("div",{staticClass:"carousel-card"},[o("div",{staticClass:"viewed_image"},[o("img",{attrs:{src:p.img},on:{error:t.setFallbackImageUrl}})]),t._v(" "),o("div",{staticClass:"viewed_content text-center"},[o("div",{staticClass:"viewed_name"},[o("p",{staticClass:"offer-title clamp1"},[t._v(t._s(p.title))]),t._v(" "),o("p",{staticClass:"offer-text clamp1"},[t._v(t._s(p.offer_text))]),t._v(" "),o("p",{staticClass:"offer-subtitle clamp1"},[t._v(t._s(p.subtitle))]),t._v(" "),o("a",{staticClass:"offer-subtitle clamp2",staticStyle:{"text-decoration":"none",color:"#3f51b5","margin-bottom":"10px"},attrs:{target:"_blank",href:t.origin+p.url}},[t._v(t._s(t.origin)+t._s(p.url))]),t._v(" "),o("button",{staticClass:"btn btn-primary",attrs:{type:"button"},on:{click:function(e){return t.editCarouselDetail(p.id)}}},[t._v("Edit")]),t._v(" "),o("button",{staticClass:"btn btn-red white-text",attrs:{type:"button"},on:{click:function(e){return t.deleteCarouselDetail(p.id)}}},[t._v("Delete")])]),t._v(" "),o("div",{staticClass:"viewed_price"})])])])})),t._v(" "),o("div",{staticClass:"col s8 l6"},[o("div",{staticClass:"carousel-card add",on:{click:t.openDropdownPanel}},[o("p",[t._v("+ Add")])])])],2)])])])])])}),[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"popup-title"},[e("h3",[this._v("Add Carousel Item")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"popup-title"},[e("h3",[this._v("Edit Carousel Item")])])}],!1,null,"e150a3a4",null);e.default=component.exports}}]);