(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{225:function(t,e,n){var content=n(260);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(22).default)("b8569324",content,!0,{sourceMap:!1})},259:function(t,e,n){"use strict";var o=n(225);n.n(o).a},260:function(t,e,n){(e=n(21)(!1)).push([t.i,".handle[data-v-821002e6]{float:left}.close[data-v-821002e6],.handle[data-v-821002e6]{padding-top:8px;padding-bottom:8px}.close[data-v-821002e6]{float:right}input[data-v-821002e6]{display:inline-block;width:50%}.text[data-v-821002e6]{margin:20px}.button[data-v-821002e6]{margin-top:35px}.flip-list-move[data-v-821002e6]{transition:transform .5s}.no-move[data-v-821002e6]{transition:transform 0s}.ghost[data-v-821002e6]{opacity:.5;background:#c8ebfb}.list-group[data-v-821002e6]{min-height:39px;padding-bottom:1px;border:1px dashed #d2d2d2}.list-group-item[data-v-821002e6]{position:relative;display:block;padding:.75rem 1.25rem;margin-bottom:-1px;background-color:#fff;border:1px solid rgba(0,0,0,.125)}.handle[data-v-821002e6],.list-group-item[data-v-821002e6]{cursor:move!important}.list-group-item i[data-v-821002e6]{cursor:pointer}.sortable-chosen[data-v-821002e6]{background-color:#4caf50;color:#fff}",""]),t.exports=e},336:function(t,e,n){"use strict";n.r(e);n(15),n(33);var o=n(88),r=["vue.draggable","draggable","component","for","vue.js 2.0","based","on","Sortablejs"],l=8,c={mounted:function(){feather.replace({color:"black"}),this.getCategory()},computed:{dragOptions:function(){return{animation:200,group:"description",disabled:!1,ghostClass:"ghost"}}},components:{draggable:n.n(o).a},layout:"empty",data:function(){return{enabled:!0,exampleList:["Item 1","Item 2","Item 3","Item 4","Item 5"],list:r.map((function(t,e){return{name:t,order:e+1}})),drag:!1,final_category:[],category:[]}},methods:{getCategory:function(){var t=this;this.$store.dispatch("getCategory").then((function(e){console.log(e),t.category=JSON.parse(JSON.stringify(e.data)),t.navbarOrder()}))},navbarOrder:function(){var t=this;this.$store.dispatch("WebsiteNav").then((function(e){0!=e.data.length&&(t.final_category=JSON.parse(e.data[0].value),t.category=t.category.filter((function(e){return!t.containsObject_id(e,t.final_category)})))}))},navbarOrderUpdate:function(){var t=this,e={key:"WebsiteNav",value:JSON.stringify(this.final_category)};this.$store.dispatch("WebsiteNavUpdate",e).then((function(e){console.log(e.data),t.navbarOrder()}))},containsObject:function(t,e){var i;for(i=0;i<e.length;i++)if(console.log(JSON.stringify(t)),console.log(JSON.stringify(e[i])),JSON.stringify(e[i])===JSON.stringify(t))return!0;return!1},containsObject_id:function(t,e){var i;for(i=0;i<e.length;i++)if(console.log("----"),console.log(e[i].id),console.log(t.id),e[i].id===t.id)return console.log("Same"),!0;return!1},removeAt:function(t){this.list.splice(t,1)},add:function(){id++,this.list.push({name:"Juan "+id,id:id,text:""})},clone:function(t){return{name:t.name,id:l++}},pullFunction:function(){return!this.controlOnStart||"clone"},start:function(t){var e=t.originalEvent;this.controlOnStart=e.ctrlKey}}},d=(n(259),n(14)),component=Object(d.a)(c,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"navbar-spacing padding-top-30"},[n("div",{staticClass:"holder"},[n("div",{staticClass:"row"},[n("div",{staticClass:"col s24"},[n("div",{staticStyle:{display:"flex","justify-content":"space-between"}},[n("h3",[t._v("Navigation Menu Ordering")]),t._v(" "),n("div",{staticClass:"btn btn-success",on:{click:t.navbarOrderUpdate}},[t._v("Save")])])]),t._v(" "),n("div",{staticClass:"col s24 m12"},[n("h3",[t._v("Active Menus")]),t._v(" "),n("draggable",{staticClass:"dragArea list-group",attrs:{list:t.final_category,clone:t.clone,group:{name:"people",pull:t.pullFunction}},on:{start:t.start}},t._l(t.final_category,(function(element){return n("div",{key:element.id,staticClass:"list-group-item"},[t._v(t._s(element.name))])})),0)],1),t._v(" "),n("div",{staticClass:"col s24 m12"},[n("h3",[t._v("All Categories")]),t._v(" "),n("draggable",{staticClass:"dragArea list-group",attrs:{list:t.category,group:"people"}},t._l(t.category,(function(element){return n("div",{key:element.id,staticClass:"list-group-item"},[t._v(t._s(element.name))])})),0)],1)])])])}),[],!1,null,"821002e6",null);e.default=component.exports}}]);