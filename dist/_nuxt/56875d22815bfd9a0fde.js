(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{222:function(t,e,o){var content=o(254);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(22).default)("202c3b64",content,!0,{sourceMap:!1})},253:function(t,e,o){"use strict";var c=o(222);o.n(c).a},254:function(t,e,o){(e=o(21)(!1)).push([t.i,".analytics .card.summary-card[data-v-412d37c0]{height:inherit}.analytics .card[data-v-412d37c0]{height:150px;border-radius:5px;background-color:#fff;box-shadow:0 3px 10px rgba(62,85,120,.07)}.analytics .card .card-content[data-v-412d37c0]{padding:20px;z-index:10;position:relative}.analytics .card .card-content h3[data-v-412d37c0]{font-size:15px;font-family:Regular}.analytics .card .card-content p[data-v-412d37c0]{font-size:30px}.analytics.row .col[data-v-412d37c0]{margin-bottom:0}.card.summary-card[data-v-412d37c0]{margin-bottom:20px}.analytics .charts[data-v-412d37c0]{position:absolute;width:100%;bottom:0;z-index:9}.page-title[data-v-412d37c0]{padding-top:5px}.red-text[data-v-412d37c0]{color:#f44336}.analytics-spacing .analytics[data-v-412d37c0]:not(:nth-child(2)){margin-top:35px}.date_options li[data-v-412d37c0]{padding:0 10px}",""]),t.exports=e},311:function(t,e,o){"use strict";o.r(e);var c=o(37),n=o(90),r=(o(28),o(5)),d=o(310),l={name:"PackChart",props:["tweetData"],data:function(){return{msg:"👋 from the Chart Component",height:600,width:600,loadData:{}}},mounted:function(){this.fetchData()},methods:{fetchData:function(){return Object(r.a)(regeneratorRuntime.mark((function t(){var svg,e,o,c,path,g;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:svg=n.select("#svg"),e=+svg.attr("width"),o=+svg.attr("height"),c=n.geoMercator().translate([e/2,o/2]),path=n.geoPath().projection(c),g=svg.append("g"),n.json("assam.json").then((function(t){console.log(t),g.selectAll("path").data(d.a(t,t.objects.assam_district).features).enter().append("path").attr("d",path)}));case 7:case"end":return t.stop()}}),t)})))()}}},h=o(14),v={name:"dashboard",data:function(){var t,e;return{baseurl:"https://www.wenslink.com",options:(t={grid:{show:!1,padding:{left:0,right:0}},animations:{enabled:!0,easing:"easeinout",speed:800,animateGradually:{enabled:!0,delay:150},dynamicAnimation:{enabled:!0,speed:350}},fill:{type:"gradient",colors:["#9188f1"],gradient:{shadeIntensity:1,opacityFrom:.7,opacityTo:.6,stops:[100]}},chart:{toolbar:{show:!1},sparkline:{enabled:!0}},dataLabels:{enabled:!1},stroke:{},xaxis:{type:"numeric",lines:{show:!1},axisBorder:{show:!1},labels:{show:!1}}},Object(c.a)(t,"stroke",{show:!0,width:0,colors:["#9188f1"]}),Object(c.a)(t,"yaxis",[{y:0,offsetX:0,offsetY:0,padding:{left:0,right:0}}]),Object(c.a)(t,"tooltip",{x:{show:!1,format:"dd/MM/yy HH:mm"}}),t),options_1:(e={grid:{show:!1,padding:{left:0,right:0}},fill:{type:"gradient",colors:["#4caf50"],gradient:{shadeIntensity:1,opacityFrom:.7,opacityTo:.6,stops:[100]}},chart:{toolbar:{show:!1},sparkline:{enabled:!0}},dataLabels:{enabled:!1},stroke:{},xaxis:{type:"numeric",lines:{show:!1},axisBorder:{show:!1},labels:{show:!1}}},Object(c.a)(e,"stroke",{show:!0,width:0,colors:["#4caf50"]}),Object(c.a)(e,"yaxis",[{y:0,offsetX:0,offsetY:0,padding:{left:0,right:0}}]),Object(c.a)(e,"tooltip",{x:{show:!1,format:"dd/MM/yy HH:mm"}}),e),options_2:{grid:{show:!1,padding:{left:0,right:0}},fill:{type:"gradient",colors:["#ff9800"],gradient:{shadeIntensity:1,opacityFrom:.7,opacityTo:.6,stops:[100]}},chart:{toolbar:{show:!1},sparkline:{enabled:!0}},dataLabels:{enabled:!1},fontFamily:"Regular",xaxis:{type:"numeric",lines:{show:!1},axisBorder:{show:!1},labels:{show:!1}},stroke:{show:!0,width:0,colors:["#ff9800"]},yaxis:[{y:0,offsetX:0,offsetY:0,padding:{left:0,right:0}}],tooltip:{x:{show:!1,format:"dd/MM/yy HH:mm"}}},options_3:{grid:{show:!1,padding:{left:0,right:0}},fill:{type:"gradient",colors:["#2196f3"],gradient:{shadeIntensity:1,opacityFrom:.7,opacityTo:.6,stops:[100]}},chart:{toolbar:{show:!1},sparkline:{enabled:!0}},dataLabels:{enabled:!1},xaxis:{type:"numeric",lines:{show:!1},axisBorder:{show:!1},labels:{show:!1}},stroke:{show:!0,width:0,colors:["#2196f3"]},yaxis:[{y:0,offsetX:0,offsetY:0,padding:{left:0,right:0}}],tooltip:{x:{show:!1,format:"dd/MM/yy HH:mm"}}},series:[{name:"Orders",data:[0,0,0,0,0,0,0]}],series1:[{name:"Customers",data:[10,20]}],columns:[{label:"Name",field:"images",sortable:!1,thClass:"capitalize"},{label:"",field:"product_name",sortable:!1,tdClass:"capitalize"},{label:"Issue",field:"issue",sortable:!1,width:"200px",thClass:"capitalize"}],issueproducts:[],days:7,orders_placed:0,new_customers:0,today_sales:0,admin_counts:[],loadData:{}}},components:{PackChart:Object(h.a)(l,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("h1",[t._v("Circle Pack in D3")]),t._v(" "),o("h2",[t._v(t._s(t.msg))]),t._v(" "),o("svg",{attrs:{id:"svg",height:t.height,width:t.width}})])}),[],!1,null,null,null).exports},updated:function(){},mounted:function(){this.getAnalytics(this.days),this.getProductIssues(),this.getAdminCounts(),this.fetchData()},watch:{},beforeMount:function(){},methods:{fetchData:function(){var data=n.json("assam.json").then((function(){console.log("shsjdhsjdhsjh")}));this.loadData=data},getAnalytics:function(t){var e=this;this.$store.dispatch("getAnalytics",t).then((function(t){console.log(t),e.orders_placed=t.data.all_orders.reduce(e.func),e.new_customers=t.data.new_customer.reduce(e.func),e.series=[{data:t.data.all_orders}],e.series1=[{data:t.data.new_customer}]}))},getProductIssues:function(){var t=this;this.$store.dispatch("getProductIssues").then((function(e){console.log(e),t.issueproducts=e.data.missing_shipping,t.issueproducts.filter((function(t){return t.images=JSON.parse(t.images)}))}))},getAdminCounts:function(){var t=this;this.$store.dispatch("admin_counts").then((function(e){console.log(e),t.admin_counts=e.data}))},func:function(a,b){return a+b},reloadCharts:function(t){this.days=t,this.getAnalytics(t)}}},_=(o(253),Object(h.a)(v,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"navbar-spacing padding-top-30 analytics-spacing"},[o("div",{staticClass:"page-header row no-gutters py-4"},[o("div",{staticClass:"col s24 text-center text-sm-left mb-0"},[o("div",{staticStyle:{display:"flex","justify-content":"space-between","align-items":"center"}},[o("div",[o("span",{staticClass:"text-uppercase page-subtitle"},[t._v("Dashboard")]),t._v(" "),o("h3",{staticClass:"page-title"},[t._v("\n            Website Overview\n            "),o("span",{staticStyle:{"font-size":"13px","font-family":"light","font-weight":"lighter"}},[t._v("(Last "+t._s(this.days)+" Days)")])])]),t._v(" "),o("div",[o("ul",{staticClass:"date_options",staticStyle:{display:"flex","list-style":"none"}},[o("li",{on:{click:function(e){return t.reloadCharts(7)}}},[t._v("7 Days")]),t._v(" "),o("li",{on:{click:function(e){return t.reloadCharts(30)}}},[t._v("30 Days")]),t._v(" "),o("li",{on:{click:function(e){return t.reloadCharts(90)}}},[t._v("3 Months")])])])])])]),t._v(" "),o("div",{staticClass:"analytics row",staticStyle:{"margin-bottom":"0"}},[o("div",{staticClass:"col s24 m8 l6"},[o("div",{staticClass:"card"},[o("div",{staticClass:"card-content"},[o("h3",[t._v("Total Orders Placed")]),t._v(" "),o("p",[t._v(t._s(t.orders_placed))])]),t._v(" "),o("apexchart",{staticClass:"charts",attrs:{height:"80",type:"area",options:t.options,series:t.series}})],1)]),t._v(" "),o("div",{staticClass:"col s24 m8 l6"},[o("div",{staticClass:"card"},[o("div",{staticClass:"card-content"},[o("h3",[t._v("Customers")]),t._v(" "),o("p",[t._v(t._s(t.new_customers))])])])]),t._v(" "),o("div",{staticClass:"col s24 m8 l6"},[o("div",{staticClass:"card"},[o("div",{staticClass:"card-content"},[o("h3",[t._v("Sales Today")]),t._v(" "),o("p",[t._v("₹ "+t._s(t.today_sales))])])])]),t._v(" "),o("div",{staticClass:"col s24 m8 l6"},[o("div",{staticClass:"card"},[o("div",{staticClass:"card-content"},[o("h3",[t._v("Orders Placed Today")]),t._v(" "),o("p",[t._v(t._s(t.orders_placed))])]),t._v(" "),o("apexchart",{staticClass:"charts hide",attrs:{height:"80",type:"area",options:t.options_3,series:t.series}})],1)])]),t._v(" "),o("div",{staticClass:"analytics row"},[t._m(0),t._v(" "),o("div",{staticClass:"col s24 m8 l6"},[o("div",{staticClass:"card summary-card"},[o("div",{staticClass:"card-content"},[o("h3",[t._v("Orders Bounce")]),t._v(" "),o("p",[t._v(t._s(t.admin_counts.orders_bounce))])])])]),t._v(" "),o("div",{staticClass:"col s24 m8 l6"},[o("div",{staticClass:"card summary-card"},[o("div",{staticClass:"card-content"},[o("h3",[t._v("Orders Completed")]),t._v(" "),o("p",[t._v(t._s(t.admin_counts.orders_completed))])])])]),t._v(" "),o("div",{staticClass:"col s24 m8 l6"},[o("div",{staticClass:"card summary-card"},[o("div",{staticClass:"card-content"},[o("h3",[t._v("Total Customers")]),t._v(" "),o("p",[t._v(t._s(t.admin_counts.total_customers))])])])]),t._v(" "),o("div",{staticClass:"col s24 m8 l6"},[o("div",{staticClass:"card summary-card"},[o("div",{staticClass:"card-content"},[o("h3",[t._v("Total Sellers")]),t._v(" "),o("p",[t._v(t._s(t.admin_counts.total_sellers))])])])]),t._v(" "),o("div",{staticClass:"col s24 m8 l6"},[o("div",{staticClass:"card summary-card"},[o("div",{staticClass:"card-content"},[o("h3",[t._v("Total Sale (30 Days)")]),t._v(" "),o("p",[t._v(t._s(t.admin_counts.total_sales_in_30_days))])])])]),t._v(" "),o("div",{staticClass:"col s24 m8 l6"},[o("div",{staticClass:"card summary-card"},[o("div",{staticClass:"card-content"},[o("h3",[t._v("Total Products Catalogue")]),t._v(" "),o("p",[t._v(t._s(t.admin_counts.total_products_catalogue))])])])]),t._v(" "),t._e(),t._v(" "),o("div",{staticClass:"col s24 m8 l6"},[o("div",{staticClass:"card summary-card"},[o("div",{staticClass:"card-content"},[o("h3",[t._v("Orders Processing")]),t._v(" "),o("p",[t._v(t._s(t.admin_counts.orders_processing))])])])]),t._v(" "),o("div",{staticClass:"col s24 m8 l6"},[o("div",{staticClass:"card summary-card"},[o("div",{staticClass:"card-content"},[o("h3",[t._v("Orders Delayed")]),t._v(" "),o("p",[t._v(t._s(t.admin_counts.orders_delayed))])])])]),t._v(" "),o("div",{staticClass:"col s24 m8 l6"},[o("div",{staticClass:"card summary-card"},[o("div",{staticClass:"card-content"},[o("h3",[t._v("Total Sales (30 Days)")]),t._v(" "),o("p",[t._v(t._s(t.admin_counts.total_sales_in_30_days))])])])])]),t._v(" "),o("div",{staticClass:"analytics"},[o("div",{staticClass:"row"},[o("div",{staticClass:"col s12"},[o("div",{staticClass:"holder"},[o("h3",{staticStyle:{"padding-left":".5em!important"}},[t._v("Product Issues")]),t._v(" "),o("vue-good-table",{staticClass:"vue-good-table-correction",attrs:{columns:t.columns,rows:t.issueproducts},scopedSlots:t._u([{key:"table-row",fn:function(e){return["images"===e.column.field?o("span",[o("img",{staticStyle:{width:"40px",height:"40px","object-fit":"contain"},attrs:{src:t.baseurl+"/backend/api/products/image/40/40/"+e.row.images[0]},on:{error:t.setFallbackImageUrl}})]):"issue"===e.column.field?o("span",[o("p",{staticClass:"red-text"},[t._v("Shipping Information Missing")])]):o("span",[t._v(t._s(e.formattedRow[e.column.field]))])]}}])})],1)])])])])}),[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"col s24"},[e("div",[e("h3",{staticClass:"page-title"},[this._v("Summary")])])])}],!1,null,"412d37c0",null));e.default=_.exports}}]);