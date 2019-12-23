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
        > -->
      <!-- <div class="handler" style="background-color: red">
          
           <i data-feather="menu" class="handle"></i>

        </div> -->

      <!-- <span class="text">{{ element.name }} </span> -->

      <!-- <i class="fa fa-times close" @click="removeAt(idx)">x</i> -->
      <!-- </li>
        </transition-group>
      </draggable>
      </div> -->
      <div class="row">
        <div class="col s24 m6 s4">
          <h3>Active Menus</h3>
          <draggable
            class="dragArea list-group"
            :list="final_category"
            :clone="clone"
            :group="{ name: 'people', pull: pullFunction }"
            @start="start"
          >
            <div
              class="list-group-item"
              v-for="element in final_category"
              :key="element.id"
            >
              {{ element.name }}
            </div>
          </draggable>
        </div>

        <div class="col  s24 m6 s4">
          <h3>All Categories</h3>
          <draggable
            class="dragArea list-group"
            :list="category"
            group="people"
          >
            <div
              class="list-group-item"
              v-for="element in category"
              :key="element.id"
            >
              {{ element.name }}
            </div>
          </draggable>
        </div>
        <div class="col s24">
          <div class="btn btn-success">
            Save
          </div>
        </div>
      </div>
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
    this.getCategory();
    this.navbarOrder();
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
      exampleList: ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"],
      list: message.map((name, index) => {
        return { name, order: index + 1 };
      }),
      drag: false,
      final_category: [],
      category: []
    };
  },
  methods: {
    getCategory: function() {
      this.$store.dispatch("getCategory").then(res => {
        console.log(res);
        this.category = JSON.parse(JSON.stringify(res.data));
      });
    },
    navbarOrder: function() {
      this.$store.dispatch("navbarOrder").then(res => {
        console.log(JSON.parse(res.data[0].value));
        this.final_category = JSON.parse(res.data[0].value);
      });
    },
    removeAt(idx) {
      this.list.splice(idx, 1);
    },
    add: function() {
      id++;
      this.list.push({ name: "Juan " + id, id, text: "" });
    },
    clone({ name }) {
      return { name, id: idGlobal++ };
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
