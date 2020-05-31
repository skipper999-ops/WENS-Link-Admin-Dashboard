import Vue from 'vue';
import VueGoodTablePlugin from 'vue-good-table';

// import the styles 
import 'vue-good-table/dist/vue-good-table.css'

Vue.use(VueGoodTablePlugin);

import * as d3 from 'd3'

// Vue.use(d3);


Vue.component("d3", d3);