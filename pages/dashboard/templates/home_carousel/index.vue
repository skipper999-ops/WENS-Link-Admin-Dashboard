<template>
  <div class="navbar-spacing padding-top-30">
    <div class="holder">
      <!-- <div>
        <h2>Category Order</h2>
        <draggable
        class="list-group"
        style="padding-left: 0;padding-top: 20px"
        tag="ul"
        :disabled="!enabled"
        v-model="list"
        v-bind="dragOptions"
        @start="drag = true"
        @end="drag = false"
      >
        <transition-group type="transition" :name="!drag ? 'flip-list' : null">
          <li
          class="list-group-item"
          v-for="(element, idx) in list"
          :key="element.name"
      >-->
      <!-- <div class="handler" style="background-color: red">
          
           <i data-feather="menu" class="handle"></i>

      </div>-->

      <!-- <span class="text">{{ element.name }} </span> -->

      <!-- <i class="fa fa-times close" @click="removeAt(idx)">x</i> -->
      <!-- </li>
        </transition-group>
      </draggable>
      </div>-->
      <div class="row">
        <div class="col s24">
          <div style="display: flex;justify-content: space-between;">
            <h3>Homepage Carousel Ordering</h3>
            <div class="btn btn-success" @click="navbarOrderUpdate">Save</div>
          </div>
        </div>
        <div class="col s24 m12">
          <h3>Active Carousels</h3>
          <draggable
            class="dragArea list-group"
            :list="final_category"
            :group="{ name: 'people', pull: pullFunction }"
            @start="start"
          >
            <div
              class="list-group-item"
              v-for="element in final_category"
              :key="element.id"
            >{{ element.title }}</div>
          </draggable>
        </div>

        <div class="col s24 m12">
          <h3>Available Carousels</h3>
          <draggable class="dragArea list-group" :list="category" group="people">
            <div
              class="list-group-item"
              v-for="element in category"
              :key="element.id"
            >{{ element.title }}</div>
          </draggable>
        </div>
      </div>

      <!-- <div class="row">
        <div class="col s24">
          <div style="display: flex;justify-content: space-between;">
            <h3>Homepage Carousel Ordering</h3>
            <div class="container-small p-0" style="background-color:#ededed">
              <client-only>
                <carousel
                  class="header-carousel"
                  :per-page="1"
                  :autoplay="true"
                  :mouse-drag="true"
                  :loop="true"
                  paginationColor="#e91e63"
                  paginationActiveColor="#ffffff"
                >
                  <slide v-for="p in 4" :key="p.id">
                    <p>asa</p>
                  </slide>
                </carousel>
              </client-only>
            </div>
          </div>
        </div>
      </div>-->
    </div>
  </div>
</template>

<script>
const message = [
  "vue.draggable",
  "draggable",
  "component",
  "for",
  "vue.js 2.0",
  "based",
  "on",
  "Sortablejs"
];

import draggable from "vuedraggable";
let idGlobal = 8;
export default {
  mounted() {
    feather.replace({ color: "black" });
    this.GetAllCarousels();
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      };
    }
  },
  components: {
    draggable
  },
  layout: "empty",
  data() {
    return {
      enabled: true,
      drag: false,
      final_category: [],
      category: []
    };
  },
  methods: {
    GetAllCarousels: function() {
      this.$store.dispatch("GetAllCarousels").then(res => {
        console.log(res);
        this.category = JSON.parse(JSON.stringify(res.data));
        this.navbarOrder();
      });
    },
    navbarOrder: function() {
      this.$store.dispatch("HomepageCarousel").then(res => {
        if (res.data.length != 0) {
          this.final_category = JSON.parse(res.data[0].value);
          console.log("final")
          console.log(this.final_category)
          this.category = this.category.filter(
            v => !this.containsObject_id(v, this.final_category)
          );
          console.log("cate")
          console.log(this.category)
        }
      });
    },
    navbarOrderUpdate: function() {
      var payload = {
        key: "HomepageCarousel",
        value: JSON.stringify(this.final_category)
      };
      this.$store.dispatch("HomepageCarouselUpdate", payload).then(res => {
        console.log(res.data);
        this.navbarOrder();
      });
    },
    containsObject: function(obj, list) {
      var i;
      for (i = 0; i < list.length; i++) {
        if (JSON.stringify(list[i]) === JSON.stringify(obj)) {
          return true;
        }
      }
      return false;
    },
    containsObject_id: function(obj, list) {
      var i;
      for (i = 0; i < list.length; i++) {
        if (JSON.stringify(list[i].id) === JSON.stringify(obj.id)) {
          return true;
        }
      }
      return false;
    },
    clone({ title }) {
      return { title, id: idGlobal++ };
    },
    pullFunction() {
      return this.controlOnStart ? "clone" : true;
    },
    start({ originalEvent }) {
      this.controlOnStart = originalEvent.ctrlKey;
    }
  }
};
</script>
<style scoped>
.button {
  margin-top: 35px;
}
.handle {
  float: left;
  padding-top: 8px;
  padding-bottom: 8px;
}
.close {
  float: right;
  padding-top: 8px;
  padding-bottom: 8px;
}
input {
  display: inline-block;
  width: 50%;
}
.text {
  margin: 20px;
}
.button {
  margin-top: 35px;
}
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.list-group {
  min-height: 39px;
  padding-bottom: 1px;
  border: 1px dashed #d2d2d2;
}
.list-group-item {
  position: relative;
  display: block;
  padding: 0.75rem 1.25rem;
  margin-bottom: -1px;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.125);
  cursor: move !important;
}
.handle {
  cursor: move !important;
}
.list-group-item i {
  cursor: pointer;
}

.sortable-chosen {
  background-color: #4caf50;
  color: white;
}
</style>
