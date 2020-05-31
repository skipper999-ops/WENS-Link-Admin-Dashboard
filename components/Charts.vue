<template>
  <div>
    <h1>Circle Pack in D3</h1>
    <h2>{{ msg }}</h2>
    <svg id="svg" :height="height" :width="width" />
  </div>
</template>

<script>
import * as d3 from "d3";
import * as topojson from "topojson";

export default {
  name: "PackChart",
  props: ["tweetData"],
  data() {
    return {
      msg: "👋 from the Chart Component",
      height: 600,
      width: 600,
      loadData: {}
    };
  },

  mounted() {
    this.fetchData();
    // const svg = d3.select("#svg");
    // const width = +svg.attr("width");
    // const height = +svg.attr("height");

    // const projection = d3.geoMercator().translate([width / 2, height / 2]);

    // var path = d3.geoPath().projection(projection);

    // var g = svg.append("g");

    // d3.json("assam.json", function(error, topology) {
    //   g.selectAll("path")
    //     .data(topojson.object(topology, topology.objects.assam_district).geometries)
    //     .enter()
    //     .append("path")
    //     .attr("d", path);
    // });
  },

  methods: {
    async fetchData() {
      // let data = await d3.json("assam.json");
      // this.loadData = data;
      // console.log("loaded data")
      // console.log(this.loadData)

      const svg = d3.select("#svg");
      const width = +svg.attr("width");
      const height = +svg.attr("height");

      const projection = d3.geoMercator().translate([width / 2, height / 2]);

      var path = d3.geoPath().projection(projection);

      var g = svg.append("g");

      d3.json("assam.json").then(function(loadData) {
        console.log(loadData)

        g.selectAll("path")
          .data(
            topojson.feature(
              loadData,
              loadData.objects.assam_district
            ).features
          )
          .enter()
          .append("path")
          .attr("d", path);
      });
    }
  }
};
</script>

<style>
</style>