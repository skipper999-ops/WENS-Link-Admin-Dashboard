(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{219:function(e,t,o){"use strict";var n=o(8),l=o(220)(5),d=!0;"find"in[]&&Array(1).find((function(){d=!1})),n(n.P+n.F*d,"Array",{find:function(e){return l(this,e,arguments.length>1?arguments[1]:void 0)}}),o(88)("find")},220:function(e,t,o){var n=o(34),l=o(87),d=o(35),r=o(25),c=o(221);e.exports=function(e,t){var o=1==e,v=2==e,m=3==e,h=4==e,f=6==e,_=5==e||f,x=t||c;return function(t,c,y){for(var w,C,k=d(t),S=l(k),z=n(c,y,3),P=r(S.length),N=0,D=o?x(t,P):v?x(t,0):void 0;P>N;N++)if((_||N in S)&&(C=z(w=S[N],N,k),e))if(o)D[N]=C;else if(C)switch(e){case 3:return!0;case 5:return w;case 6:return N;case 2:D.push(w)}else if(h)return!1;return f?-1:m||h?h:D}}},221:function(e,t,o){var n=o(222);e.exports=function(e,t){return new(n(e))(t)}},222:function(e,t,o){var n=o(16),l=o(133),d=o(4)("species");e.exports=function(e){var t;return l(e)&&("function"!=typeof(t=e.constructor)||t!==Array&&!l(t.prototype)||(t=void 0),n(t)&&null===(t=t[d])&&(t=void 0)),void 0===t?Array:t}},235:function(e,t,o){"use strict";(function(e){o(33),o(134),o(15),o(219);t.a={data:function(){return{category:[],subcategory:[],product_id:this.$cookies.get("product_edit"),selected:[],subcategory_selected:0,category_selected:0,images:[],product_name:"",bullet_points:[],error:{},showDropdown:!1,slugify:"",editSlug:0,not_similar:0,product_id_list:[{id:1,name:"UPC"},{id:2,name:"EAN"},{id:3,name:"GCID"},{id:4,name:"GTIN"},{id:5,name:"ASIN"}],specs:[],vs:this,baseurl:e.env.baseUrl,length:0,suggested_price:0,breadth:0,height:0,weight:0}},mounted:function(){var e=this,t=this;Dropzone.autoDiscover=!1,this.myDropzone=new Dropzone("div#myDrop",{paramName:"file",addRemoveLinks:!0,uploadMultiple:!0,autoProcessQueue:!0,parallelUploads:10,maxFiles:10,maxFilesize:5,acceptedFiles:".png, .jpeg, .jpg",url:t.$store.state.api.imageUpload,headers:{Authorization:"Bearer "+t.$cookies.get("access_token"),"Cache-Control":null,"X-Requested-With":null},renameFilename:function(e){return console.log(e),console.log(t.product_name+"_"+(new Date).getTime()+"_"+e),t.product_name+"_"+(new Date).getTime()+"_"+e}}),this.myDropzone.on("sending",(function(e,t,o){var n=[];console.log("success"),$(".dz-preview .dz-filename").each((function(){n.push($(this).find("span").text())})),o.append("filenames",n)})),this.myDropzone.on("successmultiple",(function(e,o){console.log("success"),console.log(e,o),console.log(e),o.filenames.forEach((function(e,o){t.images.push(e.filename)}))})),this.myDropzone.on("error",(function(data){$("#msg").html('<div class="alert alert-danger">There is some thing wrong, Please try again!</div>')})),this.myDropzone.on("complete",(function(e){})),this.myDropzone.on("removedfile",(function(e){console.log(e),e.upload?t.images=t.images.filter((function(t){return t!=e.upload.filename})):t.images=t.images.filter((function(t){return t!=e.name}))})),this.myDropzone.on("addedfile",(function(e){for(console.log("added file"),console.log(this.files.length),console.log(this.options.maxFiles);this.files.length>this.options.maxFiles;)this.removeFile(this.files[10])})),this.$store.dispatch("getSingleProduct",this.product_id).then((function(o){console.log(o),e.selected=o.data,e.images=JSON.parse(e.selected.images),e.subcategory_selected=e.selected.subcategory.id,e.product_name=e.selected.product_name,e.category_selected=e.selected.category.id,e.length=e.selected.length,e.breadth=e.selected.breadth,e.height=e.selected.height,e.weight=e.selected.weight,e.bullet_points=JSON.parse(e.selected.bullet_points),e.selected.specs=JSON.parse(e.selected.specs),e.specs=JSON.parse(e.selected.subcategory.specs);for(var i=0;i<e.images.length;i++){var n={name:e.images[i]};e.myDropzone.options.addedfile.call(e.myDropzone,n),e.myDropzone.options.thumbnail.call(e.myDropzone,n,e.baseurl+"/backend/api/products/image/200/40/"+e.images[i]),e.myDropzone.files.push(n),n.previewElement.classList.add("dz-complete")}console.log(e.myDropzone.getAcceptedFiles()),e.$store.dispatch("getCategory").then((function(t){console.log(t),e.category=t.data,e.getSubcategories()})),setTimeout((function(){for(var e in t.selected.specs){var o=t.selected.specs;if(t.specs.hasOwnProperty(e))for(var n in console.log(o),o[e].sub){console.log(e),t.specs[e].sub.hasOwnProperty(n)&&(3==o[e].sub[n].type?(t.$set(t.specs[e].sub[n],"dropdown",o[e].sub[n].dropdown),t.$set(t.specs[e].sub[n],"value",o[e].sub[n].value)):(t.$set(t.specs[e].sub[n],"value",o[e].sub[n].value),console.log(this.specs)))}}}),100)}))},watch:{product_name:function(e,t){console.log("Prop changed: ",e," | was: ",t),""!=e?this.vs.myDropzone.enable():this.vs.myDropzone.disable()}},methods:{updateProduct:function(){var e=this,t=new FormData;t.append("id",this.product_id),t.append("product_name",this.product_name),t.append("product_id",this.selected.product_id),t.append("product_id_type",this.selected.product_id_type),t.append("slug",this.selected.slug),t.append("description",this.selected.description),t.append("images",JSON.stringify(this.images)),t.append("category",this.category_selected),t.append("subcategory",this.subcategory_selected),t.append("brand",this.selected.brand),t.append("manufacturer",this.selected.manufacturer),t.append("seo",this.selected.seo),t.append("suggested_price",this.suggested_price),t.append("length",this.length),t.append("breadth",this.breadth),t.append("height",this.height),t.append("weight",this.weight),t.append("bullet_points",JSON.stringify(this.bullet_points)),t.append("specs",JSON.stringify(this.specs)),this.$store.dispatch("updateProduct",{payload:t,id:this.product_id}).then((function(t){console.log(t),e.$router.push("/dashboard/products/all")})).catch((function(t){e.error=t.response.data,e.openDropdownPanel()}))},slugifyTitle:function(){console.log("Sdsd"),this.selected.slug=this.selected.product_name.toLowerCase().replace(/[^\w ]+/g,"").replace(/ +/g,"-")},addMoreBullets:function(){this.bullet_points.length<9&&this.bullet_points.push({value:""})},removeBullets:function(e){this.bullet_points.splice(e,1)},getSubcategories:function(){var e=this;this.$store.dispatch("getsubCategory",this.category_selected).then((function(t){console.log(t),console.log("________________"),e.subcategory=t.data}))},allowSlugField:function(e){console.log(e),this.editSlug=e},openDropdownPanel:function(){this.showDropdown=!0},closeSubCatModel:function(){this.showDropdown=!1}}}}).call(this,o(71))},236:function(e,t,o){var content=o(281);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,o(22).default)("2c86ec44",content,!0,{sourceMap:!1})},280:function(e,t,o){"use strict";var n=o(236);o.n(n).a},281:function(e,t,o){(t=o(21)(!1)).push([e.i,'.product-detail-row[data-v-54d12818]{border:1px solid #e7e7e7}@media (max-width:75em){.product-detail-row[data-v-54d12818]{margin:3%}}.header-row[data-v-54d12818]{background-color:#f7f7f7;padding:1rem;font-weight:700;font-size:.9rem;display:block}.detail-row[data-v-54d12818]{display:flex}.column-left[data-v-54d12818]{flex:1}.column-right[data-v-54d12818]{flex:1;padding:1rem}.column-right span[data-v-54d12818]{display:block;font-size:1.2rem;line-height:30px}.column-right span a[data-v-54d12818]{text-decoration:none;cursor:pointer;font-weight:700;color:#0066c0}.column-right span a[data-v-54d12818]:hover{color:orange}.product-image[data-v-54d12818]{width:220px;height:200px;padding:2rem 1rem;-o-object-fit:contain;object-fit:contain}label[data-v-54d12818]{font-size:15px}.popup[data-v-54d12818]{position:fixed;left:0;z-index:99}.popup[data-v-54d12818],.popup-main[data-v-54d12818]{top:0;right:0;bottom:0}.popup-main[data-v-54d12818]{background-color:#fff;margin:auto;position:absolute;max-width:400px;height:290px;left:260px;z-index:1;border-radius:5px}.popup-body[data-v-54d12818]{height:300px;overflow:auto;padding:30px}.popup-title[data-v-54d12818]{padding:30px 30px 16px;border-bottom:1px solid rgba(0,0,0,.14118)}.popup-action[data-v-54d12818]{position:absolute;bottom:0;width:100%;display:flex;justify-content:space-around;padding:25px;box-shadow:0 -7px 10px 0 rgba(0,0,0,.05098)}.popup[data-v-54d12818]:after{background-color:rgba(0,0,0,.83);margin:auto;position:absolute;content:"";left:0;right:0;top:0;bottom:0}input[data-v-54d12818],select[data-v-54d12818],textarea[data-v-54d12818]{height:35px;font-family:Regular;margin:0 10px 10px 0;border-radius:0;outline:none;width:100%;resize:vertical;font-size:1rem;padding:.6rem 1rem;box-shadow:none;border:1px solid #a9a9a9;transition:all .3s}h3[data-v-54d12818]{font-size:20px}h3[data-v-54d12818],h4[data-v-54d12818]{padding-left:19px;padding-bottom:10px}h4[data-v-54d12818]{font-size:25px}.holder[data-v-54d12818]{margin-bottom:20px}label[data-v-54d12818]{font-size:13px;font-weight:500;line-height:30px;font-family:Bold;white-space:nowrap}.form-group[data-v-54d12818]{display:flex;flex-direction:column}[data-v-54d12818]::-webkit-input-placeholder{color:#afafaf}[data-v-54d12818]:-ms-input-placeholder{color:#afafaf}[data-v-54d12818]::-moz-placeholder{color:#afafaf}[data-v-54d12818]::-ms-input-placeholder{color:#afafaf}[data-v-54d12818]::placeholder{color:#afafaf}.link_tag[data-v-54d12818]{color:#00f;cursor:pointer;text-decoration:underline}.element-tab-view[data-v-54d12818]{position:relative}.element-tab-view>input[data-v-54d12818]{display:none}.element-tab-view>input:checked+label[data-v-54d12818]{background:#fff;color:#4caf50}.element-tab-view>input#tab1:checked~.line[data-v-54d12818]{left:0}.element-tab-view>input#tab1:checked~.content-container #c1[data-v-54d12818]{opacity:1;z-index:93}.element-tab-view>input#tab2:checked~.line[data-v-54d12818]{left:136.146px}.element-tab-view>input#tab2:checked~.content-container #c2[data-v-54d12818]{opacity:1;z-index:93}.element-tab-view>input#tab3:checked~.line[data-v-54d12818]{left:270.646px}.element-tab-view>input#tab3:checked~.content-container #c3[data-v-54d12818]{opacity:1;z-index:93}.element-tab-view>input#tab4:checked~.line[data-v-54d12818]{left:406.802px}.element-tab-view>input#tab4:checked~.content-container #c4[data-v-54d12818]{opacity:1;z-index:93}.element-tab-view>input#tab5:checked~.line[data-v-54d12818]{left:542.948px}.element-tab-view>input#tab5:checked~.content-container #c5[data-v-54d12818]{opacity:1;z-index:93}.element-tab-view>label[data-v-54d12818]{display:inline-block;font-size:14px;height:60px;line-height:60px;width:130px;text-align:center;background:#fff;color:#555;position:relative;transition:background .25s ease;cursor:pointer;font-family:Regular}.element-tab-view>label[data-v-54d12818]:after{content:"";height:2px;width:100%;position:absolute;display:block;background:#fff;bottom:0;opacity:0;left:0;transition:.25s ease}.element-tab-view>label[data-v-54d12818]:hover:after{opacity:1}.element-tab-view>.line[data-v-54d12818]{position:absolute;background:#4caf50;width:130px;top:56px;left:0;transition:.25s ease;height:3px;top:57px;z-index:99}.element-tab-view>.content-container[data-v-54d12818]{background:#fff;position:relative;font-size:16px;border-top:1px solid #dbdbdb}.element-tab-view>.content-container .content[data-v-54d12818]{position:absolute;width:100%;top:0;opacity:0;transition:.25s ease;color:#333}.element-tab-view>.content-container .content h3[data-v-54d12818]{font-weight:200;margin:10px 0}.element-tab-view>.content-container .content p[data-v-54d12818]{margin:10px 0}.element-tab-view>.content-container .content i[data-v-54d12818],.element-tab-view>.content-container .content p[data-v-54d12818]{font-size:13px}.toggle-button-cover[data-v-54d12818]{display:table-cell;position:relative;width:200px;box-sizing:border-box}.button-cover[data-v-54d12818]{margin:20px;background-color:#fff;border-radius:4px}.button-cover[data-v-54d12818],.knobs[data-v-54d12818],.layer[data-v-54d12818]{position:absolute;top:0;right:0;bottom:0;left:0}.button[data-v-54d12818]{position:relative;top:50%;width:74px;height:36px;margin:-20px auto 0;overflow:hidden}.button.r[data-v-54d12818],.button.r .layer[data-v-54d12818]{border-radius:100px}.button.b2[data-v-54d12818]{border-radius:2px}.checkbox[data-v-54d12818]{position:relative;width:100%;height:100%;padding:0;margin:0;opacity:0;cursor:pointer;z-index:3}.knobs[data-v-54d12818]{z-index:2}.layer[data-v-54d12818]{width:100%;background-color:#efefef;transition:all .3s ease;z-index:1}#button-3 .knobs[data-v-54d12818]:before{content:"";position:absolute;top:4px;left:4px;width:30px;height:30px;color:#fff;font-size:10px;font-weight:700;text-align:center;line-height:1;padding:11px 4px;background-color:#b5b5b5;border-radius:50%;transition:all .3s ease,left .3s cubic-bezier(.18,.89,.35,1.15)}#button-3 .checkbox:active+.knobs[data-v-54d12818]:before{width:46px;border-radius:100px}#button-3 .checkbox:checked:active+.knobs[data-v-54d12818]:before{margin-left:-26px}#button-3 .checkbox:checked+.knobs[data-v-54d12818]:before{content:"";left:42px;background-color:#2196f3}#button-3 .checkbox:checked~.layer[data-v-54d12818]{background-color:#d4ecff}.red-text[data-v-54d12818]{color:red}@media (min-width:767.98px){.form-group.small[data-v-54d12818]{width:180px}}.input_span_right[data-v-54d12818]{position:absolute;right:0;top:31px;bottom:0;width:72px;height:33px;background-color:#2196f3;line-height:33px;text-align:center;border-radius:0;color:#fff}',""]),e.exports=t},344:function(e,t,o){"use strict";o.r(t);var n=o(235).a,l=(o(280),o(14)),component=Object(l.a)(n,(function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"navbar-spacing padding-top-30"},[e.showDropdown?o("div",{staticClass:"popup"},[o("div",{staticClass:"popup-main"},[e._m(0),e._v(" "),o("div",{staticClass:"popup-body"},[o("div",e._l(e.error,(function(p,t){return o("div",{key:p.id},[o("p",{staticStyle:{"font-size":"15px","font-weight":"bold"}},[e._v(e._s(t))]),e._v(" "),o("p",{staticStyle:{"margin-bottom":"15px"}},[e._v(e._s(p[0]))])])})),0)]),e._v(" "),o("div",{staticClass:"popup-action"},[o("div",{staticClass:"pointer",on:{click:e.closeSubCatModel}},[e._v("Cancel")])])])]):e._e(),e._v(" "),o("div",{staticClass:"specification"},[o("div",{staticClass:"holder"},[e._m(1),e._v(" "),0!=e.selected.length?o("div",{staticClass:"holder"},[o("div",{staticClass:"product-detail-row"},[o("div",{staticClass:"header-row"},[e._v(e._s(e.selected.product_name))]),e._v(" "),o("div",{staticClass:"detail-row"},[o("div",{staticClass:"column-left"},[o("img",{staticClass:"product-image",attrs:{src:e.baseurl+"/backend/api/products/image/200/40/"+e.images[0]}})]),e._v(" "),o("div",{staticClass:"column-right"},[o("span",[o("b",[e._v("Item Name (aka Title):")]),e._v("\n                "+e._s(e.selected.product_name)+"\n              ")]),e._v(" "),o("span",[o("b",[e._v("Product ID:")]),e._v("\n                "+e._s(e.selected.product_id)+"\n              ")]),e._v(" "),o("span",[o("b",[e._v("Brand:")]),e._v("\n                "+e._s(e.selected.brand)+"\n              ")])])])])]):o("div",[o("p",[e._v("No Product Found")])])]),e._v(" "),""!=e.selected.slug?o("div",{staticClass:"holder"},[o("h3",{},[e._v("Submit Product")]),e._v(" "),o("div",{staticStyle:{"padding-left":"19px","padding-bottom":"10px"}},[o("button",{staticClass:"btn btn-primary",attrs:{disabled:""==e.selected.slug},on:{click:e.updateProduct}},[e._v("Update Product")])])]):e._e(),e._v(" "),o("div",{directives:[{name:"show",rawName:"v-show",value:null!=e.subcategory_selected&&0!=e.subcategory_selected,expression:"subcategory_selected != undefined && subcategory_selected != 0"}],staticClass:"holder no-pad"},[o("div",{staticClass:"element-tab-view"},[o("input",{attrs:{type:"radio",id:"tab1",name:"tab",checked:""}}),e._v(" "),e._m(2),e._v(" "),o("input",{attrs:{type:"radio",id:"tab2",name:"tab"}}),e._v(" "),e._m(3),e._v(" "),o("input",{attrs:{type:"radio",id:"tab3",name:"tab"}}),e._v(" "),e._m(4),e._v(" "),o("input",{attrs:{type:"radio",id:"tab4",name:"tab"}}),e._v(" "),e._m(5),e._v(" "),o("input",{attrs:{type:"radio",id:"tab5",name:"tab"}}),e._v(" "),e._m(6),e._v(" "),o("div",{staticClass:"line"}),e._v(" "),o("div",{staticClass:"content-container"},[o("div",{staticClass:"content basic",attrs:{id:"c1"}},[o("div",{staticClass:"bg-white"},[o("div",{staticClass:"column-padding"}),e._v(" "),o("div",{staticClass:"row"},[o("div",{staticClass:"col s24"},[o("div",{staticClass:"col s24 m8 l6"},[o("label",[e._v("Category")]),e._v(" "),o("select",{directives:[{name:"model",rawName:"v-model",value:e.category_selected,expression:"category_selected"}],on:{change:[function(t){var o=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){return"_value"in e?e._value:e.value}));e.category_selected=t.target.multiple?o:o[0]},e.getSubcategories]}},e._l(e.category,(function(p){return o("option",{key:p.id,domProps:{value:p.id}},[e._v("\n                        "+e._s(p.name)+"\n                      ")])})),0)]),e._v(" "),o("div",{staticClass:"col s24 m8 l6"},[o("label",[e._v("SubCategory")]),e._v(" "),o("select",{directives:[{name:"model",rawName:"v-model",value:e.subcategory_selected,expression:"subcategory_selected"}],on:{change:function(t){var o=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){return"_value"in e?e._value:e.value}));e.subcategory_selected=t.target.multiple?o:o[0]}}},e._l(e.subcategory,(function(p){return o("option",{key:p.id,domProps:{value:p.id}},[e._v("\n                        "+e._s(p.name)+"\n                      ")])})),0)])])]),e._v(" "),o("div",{staticClass:"row"},[o("div",{staticClass:"col s24"},[o("div",{staticClass:"col s24 m16"},[o("div",{staticClass:"form-group"},[o("label",{attrs:{for:"exampleInputEmail1"}},[e._v("Product Name")]),e._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:e.selected.product_name,expression:"selected.product_name"}],staticClass:"form-control",attrs:{type:"text",placeholder:"Redmi 7A ( 32GB , 2 GB ) Black"},domProps:{value:e.selected.product_name},on:{input:[function(t){t.target.composing||e.$set(e.selected,"product_name",t.target.value)},e.slugifyTitle]}})])]),e._v(" "),o("div",{staticClass:"col s24 m16"},[o("div",{staticClass:"form-group"},[o("div",{staticStyle:{display:"flex","justify-content":"space-between","align-items":"center"}},[o("label",{staticStyle:{display:"flex"},attrs:{for:"exampleInputEmail1"}},[e._v("Product Slug")]),e._v(" "),e.editSlug?e._e():o("div",{staticClass:"link_tag",on:{click:function(t){return e.allowSlugField(1)}}},[e._v("Edit")]),e._v(" "),e.editSlug?o("div",{staticClass:"link_tag",on:{click:function(t){return e.allowSlugField(0)}}},[e._v("Save")]):e._e()]),e._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:e.selected.slug,expression:"selected.slug"}],staticClass:"form-control",attrs:{disabled:0==e.editSlug,placeholder:"redmi-7a-32gb-2-gb-black"},domProps:{value:e.selected.slug},on:{input:function(t){t.target.composing||e.$set(e.selected,"slug",t.target.value)}}})])]),e._v(" "),o("div",{staticClass:"col s24 m16"},[o("div",{staticClass:"form-group"},[o("label",{attrs:{for:"exampleInputEmail1"}},[e._v("Brand")]),e._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:e.selected.brand,expression:"selected.brand"}],staticClass:"form-control",attrs:{type:"text",placeholder:"Xiaomi"},domProps:{value:e.selected.brand},on:{input:function(t){t.target.composing||e.$set(e.selected,"brand",t.target.value)}}})])]),e._v(" "),o("div",{staticClass:"col s24 m16"},[o("div",{staticClass:"form-group"},[o("label",{attrs:{for:"exampleInputEmail1"}},[e._v("Suggested Price")]),e._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:e.suggested_price,expression:"suggested_price"}],staticClass:"form-control",attrs:{type:"text",placeholder:"0"},domProps:{value:e.suggested_price},on:{input:function(t){t.target.composing||(e.suggested_price=t.target.value)}}})])]),e._v(" "),o("div",{staticClass:"col s24 m16"},[o("div",{staticClass:"form-group"},[o("label",{attrs:{for:"exampleInputEmail1"}},[e._v("Manufacturer")]),e._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:e.selected.manufacturer,expression:"selected.manufacturer"}],staticClass:"form-control",attrs:{type:"text",placeholder:"Xiaomi"},domProps:{value:e.selected.manufacturer},on:{input:function(t){t.target.composing||e.$set(e.selected,"manufacturer",t.target.value)}}})])]),e._v(" "),o("div",{staticClass:"col s24 m16"},[o("div",{staticClass:"form-group"},[o("label",{attrs:{for:"exampleInputEmail1"}},[e._v("Search Terms (SEO)")]),e._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:e.selected.seo,expression:"selected.seo"}],staticClass:"form-control",attrs:{type:"text",placeholder:"Terms that will describe this product"},domProps:{value:e.selected.seo},on:{input:function(t){t.target.composing||e.$set(e.selected,"seo",t.target.value)}}})])]),e._v(" "),o("div",{staticClass:"col s24 m16"},[o("div",{staticClass:"form-group"},[o("label",{attrs:{for:"exampleInputEmail1"}},[e._v("Product ID")]),e._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:e.selected.product_id,expression:"selected.product_id"}],staticClass:"form-control",attrs:{type:"text","aria-describedby":"emailHelp",placeholder:"UPC, EAN, GCID, GTIN, ASIN"},domProps:{value:e.selected.product_id},on:{input:function(t){t.target.composing||e.$set(e.selected,"product_id",t.target.value)}}})])]),e._v(" "),o("div",{staticClass:"col s24 m16"},[o("div",{staticClass:"form-group"},[o("label",{attrs:{for:"exampleInputEmail1"}},[e._v("Product ID Type")]),e._v(" "),o("select",{directives:[{name:"model",rawName:"v-model",value:e.selected.product_id_type,expression:"selected.product_id_type"}],on:{change:function(t){var o=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){return"_value"in e?e._value:e.value}));e.$set(e.selected,"product_id_type",t.target.multiple?o:o[0])}}},e._l(e.product_id_list,(function(p){return o("option",{key:p.id,domProps:{value:p.id}},[e._v(e._s(p.name))])})),0)])])])])])]),e._v(" "),o("div",{staticClass:"content description",attrs:{id:"c2"}},[o("div",{staticClass:"bg-white"},[e._m(7),e._v(" "),o("div",{staticClass:"row"},[o("div",{staticClass:"col s24"},[o("div",{staticClass:"col s24"},[o("div",{staticClass:"form-group"},[o("label",{attrs:{for:"exampleInputEmail1"}},[e._v("Write a Short Description about the product")]),e._v(" "),o("textarea",{directives:[{name:"model",rawName:"v-model",value:e.selected.description,expression:"selected.description"}],staticStyle:{height:"160px"},domProps:{value:e.selected.description},on:{input:function(t){t.target.composing||e.$set(e.selected,"description",t.target.value)}}})])]),e._v(" "),o("div",{staticClass:"col s24"},[o("div",{staticClass:"form-group"},[o("label",{attrs:{for:"exampleInputEmail1"}},[e._v("Add Bullet Points (Upto 9)")]),e._v(" "),e._l(e.bullet_points,(function(p,t){return o("div",{key:p.length,staticStyle:{display:"flex","align-items":"center"}},[o("input",{directives:[{name:"model",rawName:"v-model",value:p.value,expression:"p.value"}],staticClass:"form-control",attrs:{type:"text"},domProps:{value:p.value},on:{input:function(t){t.target.composing||e.$set(p,"value",t.target.value)}}}),e._v(" "),o("div",{staticClass:"pointer",staticStyle:{color:"red"},on:{click:function(o){return e.removeBullets(t)}}},[e._v("Remove")])])})),e._v(" "),o("div",{staticClass:"link_tag",on:{click:e.addMoreBullets}},[e._v("+ Add More points")])],2)])])])])]),e._v(" "),e._m(8),e._v(" "),o("div",{staticClass:"content",attrs:{id:"c4"}},[o("div",{staticClass:"bg-white"},[""==e.selected.specs?o("div",[o("p",{staticStyle:{"padding-left":"19px","padding-bottom":"10px"}},[e._v("\n                  Specifications not added. Go to\n                  "),o("nuxt-link",{attrs:{to:"/dashboard/templates/specification/"+this.subcategory_selected}},[e._v("Specifications")]),e._v("and add them\n                ")],1)]):e._e(),e._v(" "),"{}"!=e.specs?o("div",e._l(e.specs,(function(p,t){return o("div",{key:p.id,staticClass:"input_fields_wrap drag-list",attrs:{id:"h"}},[o("h3",[e._v(e._s(p.name))]),e._v(" "),o("div",{staticClass:"row"},[o("div",{staticClass:"col s12"},e._l(p.sub,(function(q,t){return o("div",{key:q.id,staticClass:"col s24"},[o("div",{staticClass:"form-group"},[o("label",[e._v(e._s(q.name))]),e._v(" "),1==q.type?o("div",[o("input",{directives:[{name:"model",rawName:"v-model",value:q.value,expression:"q.value"}],attrs:{type:"text",id:q.id},domProps:{value:q.value},on:{input:function(t){t.target.composing||e.$set(q,"value",t.target.value)}}})]):e._e(),e._v(" "),2==q.type?o("div",{staticStyle:{display:"flex"}},[o("select",{directives:[{name:"model",rawName:"v-model",value:q.value,expression:"q.value"}],staticStyle:{display:"inline-block",width:"100%"},attrs:{id:q.id},on:{change:function(t){var o=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){return"_value"in e?e._value:e.value}));e.$set(q,"value",t.target.multiple?o:o[0])}}},[o("option",{domProps:{value:void 0}},[e._v("Not Selected")]),e._v(" "),e._l(q.dropdown_items,(function(t){return o("option",{key:t.id,domProps:{value:t.name}},[e._v(e._s(t.name))])}))],2)]):e._e(),e._v(" "),3==q.type?o("div",{staticStyle:{display:"flex"}},[o("input",{directives:[{name:"model",rawName:"v-model",value:q.value,expression:"q.value"}],class:q.id,attrs:{type:"text"},domProps:{value:q.value},on:{input:function(t){t.target.composing||e.$set(q,"value",t.target.value)}}}),e._v(" "),o("select",{directives:[{name:"model",rawName:"v-model",value:q.dropdown,expression:"q.dropdown"}],class:q.id,staticStyle:{display:"inline-block",width:"40%"},on:{change:function(t){var o=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){return"_value"in e?e._value:e.value}));e.$set(q,"dropdown",t.target.multiple?o:o[0])}}},[o("option",{domProps:{value:void 0}},[e._v("Not Selected")]),e._v(" "),e._l(q.dropdown_items,(function(t){return o("option",{key:t.id,domProps:{value:t.name}},[e._v(e._s(t.name))])}))],2)]):e._e()])])})),0)])])})),0):e._e()])]),e._v(" "),o("div",{staticClass:"content shipping",attrs:{id:"c5"}},[o("div",{staticClass:"bg-white"},[o("p",{staticStyle:{"padding-left":"19px","padding-bottom":"10px",color:"#E91E63"}},[e._v("Shipping Information Based on ShipRocket")]),e._v(" "),o("div",{staticClass:"row"},[o("div",{staticClass:"col s24"},[o("div",{staticClass:"col s24 m16"},[o("div",{staticClass:"form-group small"},[o("label",{attrs:{for:"exampleInputEmail1"}},[e._v("Length (Length in cms. More than 0.5 cm)")]),e._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:e.length,expression:"length"}],staticClass:"form-control",attrs:{type:"number",placeholder:""},domProps:{value:e.length},on:{input:function(t){t.target.composing||(e.length=t.target.value)}}}),e._v(" "),o("span",{staticClass:"input_span_right"},[e._v("cms")])])]),e._v(" "),o("div",{staticClass:"col s24 m16"},[o("div",{staticClass:"form-group small"},[o("label",{attrs:{for:"exampleInputEmail1"}},[e._v("Breadth (Breadth in cms. More than 0.5 cm)")]),e._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:e.breadth,expression:"breadth"}],staticClass:"form-control",attrs:{type:"number",placeholder:""},domProps:{value:e.breadth},on:{input:function(t){t.target.composing||(e.breadth=t.target.value)}}}),e._v(" "),o("span",{staticClass:"input_span_right"},[e._v("cms")])])]),e._v(" "),o("div",{staticClass:"col s24 m16"},[o("div",{staticClass:"form-group small"},[o("label",{attrs:{for:"exampleInputEmail1"}},[e._v("Height (Height in cms. More than 0.5 cm)")]),e._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:e.height,expression:"height"}],staticClass:"form-control",attrs:{type:"number",placeholder:""},domProps:{value:e.height},on:{input:function(t){t.target.composing||(e.height=t.target.value)}}}),e._v(" "),o("span",{staticClass:"input_span_right"},[e._v("cms")])])]),e._v(" "),o("div",{staticClass:"col s24 m16"},[o("div",{staticClass:"form-group small"},[o("label",{attrs:{for:"exampleInputEmail1"}},[e._v("Weight (Weight in kgs. More than 0)")]),e._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:e.weight,expression:"weight"}],staticClass:"form-control",attrs:{type:"number",placeholder:""},domProps:{value:e.weight},on:{input:function(t){t.target.composing||(e.weight=t.target.value)}}}),e._v(" "),o("span",{staticClass:"input_span_right"},[e._v("kgs")])])])])])])])])])])])])}),[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"popup-title"},[t("h3",[this._v("Error")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"column-padding header-bottom"},[t("h3",{staticStyle:{display:"flex","align-items":"center"}},[this._v("Add a Product to your catalogue")]),this._v(" "),t("p",{staticStyle:{"padding-left":"19px","padding-bottom":"10px"}},[this._v("\n          Product added here will be added to a common database and vendors\n          can use these as templates when adding their products\n        ")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("label",{attrs:{for:"tab1"}},[t("i",{staticClass:"fa fa-code"}),this._v(" Basic\n        ")])},function(){var e=this.$createElement,t=this._self._c||e;return t("label",{attrs:{for:"tab2"}},[t("i",{staticClass:"fa fa-history"}),this._v(" Descriptions\n        ")])},function(){var e=this.$createElement,t=this._self._c||e;return t("label",{attrs:{for:"tab3"}},[t("i",{staticClass:"fa fa-pencil"}),this._v(" Images\n        ")])},function(){var e=this.$createElement,t=this._self._c||e;return t("label",{attrs:{for:"tab4"}},[t("i",{staticClass:"fa fa-share-alt"}),this._v(" Specifications\n        ")])},function(){var e=this.$createElement,t=this._self._c||e;return t("label",{attrs:{for:"tab5"}},[t("i",{staticClass:"fa fa-share-alt"}),this._v(" Shipping\n        ")])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"column-padding"},[t("p",{staticStyle:{"padding-left":"19px","padding-bottom":"10px",color:"#E91E63"}},[this._v("These informations cannot be changed by the Vendors")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"content images",attrs:{id:"c3"}},[t("div",{staticClass:"bg-white"},[t("p",{staticStyle:{"padding-left":"19px","padding-bottom":"10px"}},[this._v("Upload Images. (Max 10)")]),this._v(" "),t("div",{staticStyle:{"padding-left":"19px","padding-bottom":"10px"}},[t("div",{staticClass:"dropzone dz-clickable",attrs:{id:"myDrop"}},[t("div",{staticClass:"dz-default dz-message",attrs:{"data-dz-message":""}},[t("span",[this._v("Drop files here to upload")])])])])])])}],!1,null,"54d12818",null);t.default=component.exports}}]);