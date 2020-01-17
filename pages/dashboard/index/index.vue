<template>
  <div class="navbar-spacing padding-top-30">
    <div class="page-header row no-gutters py-4">
      <div class="col s24 text-center text-sm-left mb-0">
        <span class="text-uppercase page-subtitle">Dashboard</span>
        <h3 class="page-title">
          Website Overview
          <span style="font-size: 13px;font-family:light;font-weight: lighter;"
            >(Last 7 Days)</span
          >
        </h3>
      </div>
    </div>

    <div class="analytics row">
      <div class="col s24 m8 l6">
        <div class="card">
          <div class="card-content">
            <h3>Orders Placed</h3>
            <p>18</p>
          </div>
          <apexchart
            class="charts"
            height="80"
            type="area"
            :options="options"
            :series="series"
          ></apexchart>
        </div>
      </div>
      <div class="col s24 m8 l6">
        <div class="card">
          <div class="card-content">
            <h3>Customers</h3>
            <p>4</p>
          </div>
          <apexchart
            class="charts"
            height="80"
            type="area"
            :options="options_1"
            :series="series1"
          ></apexchart>
        </div>
      </div>
      <div class="col s24 m8 l6">
        <div class="card">
          <div class="card-content">
            <h3>Sales Today</h3>
            <p>₹ 18</p>
          </div>
          <apexchart
            class="charts"
            height="80"
            type="area"
            :options="options_2"
            :series="series"
          ></apexchart>
        </div>
      </div>
      <div class="col s24 m8 l6">
        <div class="card">
          <div class="card-content">
            <h3>Orders Placed Today</h3>
            <p>18</p>
          </div>
          <apexchart
            class="charts"
            height="80"
            type="area"
            :options="options_3"
            :series="series"
          ></apexchart>
        </div>
      </div>
    </div>

    <!-- <div class="analytics">
      <div class="row">
        <div class="col s24">
          <vue-good-table :columns="columns" :rows="rows" />
        </div>
      </div>
    </div> -->

    <!-- <div class="analytics row">
      <div class="col s18">
        <div class="card">
          <div class="card-content">
            <h3>Orders Placed Today</h3>
            <p>18</p>
          </div>
          <apexchart
            class="charts"
            height="100"
            type="area"
            :options="options_3"
            :series="series"
          ></apexchart>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  name: "dashboard",
  data() {
    return {
      options: {
        grid: {
          show: false,
          padding: {
            left: 0,
            right: 0
          }
        },
        fill: {
          type: "gradient",
          colors: ["#9188f1"],
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.6,
            stops: [100]
          }
        },
        chart: {
          toolbar: {
            show: false
          },
          sparkline: {
            enabled: true
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: "smooth"
        },
        xaxis: {
          type: "numeric",
          lines: {
            show: false
          },
          axisBorder: {
            show: false
          },

          labels: {
            show: false
          }
        },
        stroke: {
          show: true,
          width: 0,
          curve: "smooth",
          colors: ["#9188f1"]
        },
        yaxis: [
          {
            y: 0,
            offsetX: 0,
            offsetY: 0,
            padding: {
              left: 0,
              right: 0
            }
          }
        ],
        tooltip: {
          x: {
            show: false,
            format: "dd/MM/yy HH:mm"
          }
        }
      },
      options_1: {
        grid: {
          show: false,
          padding: {
            left: 0,
            right: 0
          }
        },
        fill: {
          type: "gradient",
          colors: ["#4caf50"],
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.6,
            stops: [100]
          }
        },
        chart: {
          toolbar: {
            show: false
          },
          sparkline: {
            enabled: true
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: "smooth"
        },
        xaxis: {
          type: "numeric",
          lines: {
            show: false
          },
          axisBorder: {
            show: false
          },

          labels: {
            show: false
          }
        },
        stroke: {
          show: true,
          width: 0,
          curve: "smooth",
          colors: ["#4caf50"]
        },
        yaxis: [
          {
            y: 0,
            offsetX: 0,
            offsetY: 0,
            padding: {
              left: 0,
              right: 0
            }
          }
        ],
        tooltip: {
          x: {
            show: false,
            format: "dd/MM/yy HH:mm"
          }
        }
      },
      options_2: {
        grid: {
          show: false,
          padding: {
            left: 0,
            right: 0
          }
        },
        fill: {
          type: "gradient",
          colors: ["#ff9800"],
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.6,
            stops: [100]
          }
        },
        chart: {
          toolbar: {
            show: false
          },
          sparkline: {
            enabled: true
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: "smooth"
        },
        fontFamily: "Regular",
        xaxis: {
          type: "numeric",
          lines: {
            show: false
          },
          axisBorder: {
            show: false
          },

          labels: {
            show: false
          }
        },
        stroke: {
          show: true,
          width: 0,
          curve: "smooth",
          colors: ["#ff9800"]
        },
        yaxis: [
          {
            y: 0,
            offsetX: 0,
            offsetY: 0,
            padding: {
              left: 0,
              right: 0
            }
          }
        ],
        tooltip: {
          x: {
            show: false,
            format: "dd/MM/yy HH:mm"
          }
        }
      },
      options_3: {
        grid: {
          show: false,
          padding: {
            left: 0,
            right: 0
          }
        },
        fill: {
          type: "gradient",
          colors: ["#2196f3"],
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.6,
            stops: [100]
          }
        },
        chart: {
          toolbar: {
            show: false
          },
          sparkline: {
            enabled: true
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: "smooth"
        },
        xaxis: {
          type: "numeric",
          lines: {
            show: false
          },
          axisBorder: {
            show: false
          },

          labels: {
            show: false
          }
        },
        stroke: {
          show: true,
          width: 0,
          curve: "smooth",
          colors: ["#2196f3"]
        },
        yaxis: [
          {
            y: 0,
            offsetX: 0,
            offsetY: 0,
            padding: {
              left: 0,
              right: 0
            }
          }
        ],
        tooltip: {
          x: {
            show: false,
            format: "dd/MM/yy HH:mm"
          }
        }
      },
      series: [
        {
          name: "Orders",
          data: [100, 109, 80, 51, 42, 30, 10]
        }
      ],
      series1: [
        {
          name: "Customers",
          data: [10, 20]
        }
      ],
      columns: [
        {
          label: "Name",
          field: "name"
        },
        {
          label: "Age",
          field: "age",
          type: "number"
        },
        {
          label: "Created On",
          field: "createdAt",
          type: "date",
          dateInputFormat: "yyyy-MM-dd",
          dateOutputFormat: "MMM Do yy"
        },
        {
          label: "Percent",
          field: "score",
          type: "percentage"
        }
      ],
      rows: [
        { id: 1, name: "John", age: 20, createdAt: "", score: 0.03343 },
        {
          id: 2,
          name: "Jane",
          age: 24,
          createdAt: "2011-10-31",
          score: 0.03343
        },
        {
          id: 3,
          name: "Susan",
          age: 16,
          createdAt: "2011-10-30",
          score: 0.03343
        },
        {
          id: 4,
          name: "Chris",
          age: 55,
          createdAt: "2011-10-11",
          score: 0.03343
        },
        {
          id: 5,
          name: "Dan",
          age: 40,
          createdAt: "2011-10-21",
          score: 0.03343
        },
        {
          id: 6,
          name: "John",
          age: 20,
          createdAt: "2011-10-31",
          score: 0.03343
        }
      ]
    };
  },

  updated: function() {},
  mounted() {},
  watch: {},
  beforeMount() {},
  methods: {}
};
</script>

<style scoped>
.analytics .card {
  height: 150px;
  border-radius: 5px;
  background-color: white;
  box-shadow: 0 3px 10px rgba(62, 85, 120, 0.07);
}
.analytics .card .card-content {
  padding: 20px;
  z-index: 10;
  position: relative;
}
.analytics .card .card-content h3 {
  font-size: 15px;
  font-family: "Regular";
}
.analytics .card .card-content p {
  font-size: 30px;
}

.analytics .charts {
  position: absolute;
  width: 100%;
  bottom: 0;
  z-index: 9;
}

.page-title {
  padding-top: 5px;
}
</style>
