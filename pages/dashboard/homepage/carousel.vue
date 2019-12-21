<template>
  <div class="navbar-spacing padding-top-30">
    <div class="container">
      <div>
        <h2>Draggable Wrapper</h2>
        <draggable v-model="exampleList">
          <div v-for="text in exampleList" :key="text">{{text}}</div>
        </draggable>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
export default {
  components: {
    draggable
  },
  layout: "empty",
  data() {
    return {
      exampleList: ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"]
    };
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
</style>