<template>
  <div class="navbar-spacing padding-top-30 analytics-spacing">
    <div class="page-header row no-gutters py-4">
      <div class="col s24 text-center text-sm-left mb-0">
        <div style="display:flex;justify-content: space-between;align-items:center">
          <div>
            <span class="text-uppercase page-subtitle">Dashboard</span>
            <h3 class="page-title">
              Website Overview
              <span
                style="font-size: 13px;font-family:light;font-weight: lighter;"
              >(Last {{this.days}} Days)</span>
            </h3>
          </div>
          <div>
            <ul class="date_options" style="display: flex; list-style:none">
              <li @click="reloadCharts(7)">7 Days</li>
              <li @click="reloadCharts(30)">30 Days</li>
              <li @click="reloadCharts(90)">3 Months</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="analytics row">
      <div class="col s24 m8 l6">
        <div class="card">
          <div class="card-content">
            <h3>Total Orders Placed</h3>
            <p>{{orders_placed}}</p>
          </div>
          <apexchart class="charts" height="80" type="area" :options="options" :series="series"></apexchart>
        </div>
      </div>
      <div class="col s24 m8 l6">
        <div class="card">
          <div class="card-content">
            <h3>Customers</h3>
            <p>{{new_customers}}</p>
          </div>
          <!-- <apexchart class="charts" height="80" type="area" :options="options_1" :series="series1"></apexchart> -->
        </div>
      </div>
      <div class="col s24 m8 l6">
        <div class="card">
          <div class="card-content">
            <h3>Sales Today</h3>
            <p>₹ {{today_sales}}</p>
          </div>
          <!-- <apexchart class="charts" height="80" type="area" :options="options_2" :series="series"></apexchart> -->
        </div>
      </div>
      <div class="col s24 m8 l6">
        <div class="card">
          <div class="card-content">
            <h3>Orders Placed Today</h3>
            <p>{{orders_placed}}</p>
          </div>
          <apexchart class="charts hide" height="80" type="area" :options="options_3" :series="series"></apexchart>
        </div>
      </div>
    </div>

    <div class="analytics row">
      <div class="col s24">
        <div>
          <h3 class="page-title">
            Summary
          </h3>
        </div>
      </div>
      <div class="col s24 m8 l6">
        <div class="card summary-card">
          <div class="card-content">
            <h3>Orders Bounce</h3>
            <p>{{admin_counts.orders_bounce}}</p>
          </div>
        </div>
      </div>
      <div class="col s24 m8 l6">
        <div class="card summary-card">
          <div class="card-content">
            <h3>Orders Completed</h3>
            <p>{{admin_counts.orders_completed}}</p>
          </div>
        </div>
      </div>
      <div class="col s24 m8 l6">
        <div class="card summary-card">
          <div class="card-content">
            <h3>Total Customers</h3>
            <p>{{admin_counts.total_customers}}</p>
          </div>
        </div>
      </div>
      <div class="col s24 m8 l6">
        <div class="card summary-card">
          <div class="card-content">
            <h3>Total Sellers</h3>
            <p>{{admin_counts.total_sellers}}</p>
          </div>
        </div>
      </div>
      <div class="col s24 m8 l6">
        <div class="card summary-card">
          <div class="card-content">
            <h3>Total Sale (30 Days)</h3>
            <p>{{admin_counts.total_sales_in_30_days}}</p>
          </div>
        </div>
      </div>
      <div class="col s24 m8 l6">
        <div class="card summary-card">
          <div class="card-content">
            <h3>Total Products Catalogue</h3>
            <p>{{admin_counts.total_products_catalogue}}</p>
          </div>
        </div>
      </div>
      <div class="col s24 m8 l6">
        <div class="card summary-card">
          <div class="card-content">
            <h3>Total Seller Products</h3>
            <p>{{admin_counts.total_products_sellers}}</p>
          </div>
        </div>
      </div>
      <div class="col s24 m8 l6">
        <div class="card summary-card">
          <div class="card-content">
            <h3>Orders Processing</h3>
            <p>{{admin_counts.orders_processing}}</p>
          </div>
        </div>
      </div>
      <div class="col s24 m8 l6">
        <div class="card summary-card">
          <div class="card-content">
            <h3>Orders Delayed</h3>
            <p>{{admin_counts.orders_delayed}}</p>
          </div>
        </div>
      </div>
      <div class="col s24 m8 l6">
        <div class="card summary-card">
          <div class="card-content">
            <h3>Total Sales (30 Days)</h3>
            <p>{{admin_counts.total_sales_in_30_days}}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="analytics">
      <div class="row">
        <div class="col s12">
          <div class="holder">
            <h3 style="padding-left: .5em!important;">Product Issues</h3>
            <vue-good-table
              class="vue-good-table-correction"
              :columns="columns"
              :rows="issueproducts"
            >
              <template slot="table-row" slot-scope="props">
                <span v-if="props.column.field === 'images'">
                  <img
                    style="width: 40px; height: 40px; object-fit:contain"
                    :src="
                    baseurl +
                      '/backend/api/products/image/40/40/' +
                      props.row.images[0]
                  "
                    @error="setFallbackImageUrl"
                  />
                </span>
                <span v-else-if="props.column.field === 'issue'">
                  <p class="red-text">Shipping Information Missing</p>
                </span>
                <span v-else>{{ props.formattedRow[props.column.field] }}</span>
              </template>
            </vue-good-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "dashboard",
  data() {
    return {
      baseurl: process.env.baseUrl,
      options: {
        grid: {
          show: false,
          padding: {
            left: 0,
            right: 0
          }
        },
        animations: {
          enabled: true,
          easing: "easeinout",
          speed: 800,
          animateGradually: {
            enabled: true,
            delay: 150
          },
          dynamicAnimation: {
            enabled: true,
            speed: 350
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
        stroke: {},
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
        stroke: {},
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
          data: [0, 0, 0, 0, 0, 0, 0]
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
          field: "images",
          sortable: false,
          thClass: "capitalize"
        },
        {
          label: "",
          field: "product_name",
          sortable: false,
          tdClass: "capitalize"
        },
        {
          label: "Issue",
          field: "issue",
          sortable: false,
          width: "200px",
          thClass: "capitalize"
        }
      ],
      issueproducts: [],
      days: 7,
      orders_placed: 0,
      new_customers: 0,
      today_sales: 0,
      admin_counts: []
    };
  },

  updated: function() {},
  mounted() {
    this.getAnalytics(this.days);
    this.getProductIssues();
    this.getAdminCounts();
  },
  watch: {},
  beforeMount() {},
  methods: {
    getAnalytics: function(days) {
      this.$store.dispatch("getAnalytics", days).then(res => {
        console.log(res);
        this.orders_placed = res.data.all_orders.reduce(this.func);
        this.new_customers = res.data.new_customer.reduce(this.func);
        this.series = [
          {
            data: res.data.all_orders
          }
        ];
        this.series1 = [
          {
            data: res.data.new_customer
          }
        ];
      });
    },
    getProductIssues: function() {
      this.$store.dispatch("getProductIssues").then(res => {
        console.log(res);
        this.issueproducts = res.data.missing_shipping;
        this.issueproducts.filter(v => (v.images = JSON.parse(v.images)));
      });
    },
    getAdminCounts: function() {
      this.$store.dispatch("admin_counts").then(res => {
        console.log(res);
        this.admin_counts = res.data;
      });
    },
    func: function(a, b) {
      return a + b;
    },
    reloadCharts: function(days) {
      this.days = days;
      this.getAnalytics(days);
    }
  }
};
</script>

<style scoped>
.analytics .card.summary-card {
  height: inherit;
}

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

.analytics.row .col {
  margin-bottom: 25px;
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

.red-text {
  color: #f44336;
}

.analytics-spacing .analytics:not(:nth-child(2)) {
  margin-top: 40px;
}

.date_options li {
  padding: 0 10px;
}
</style>
