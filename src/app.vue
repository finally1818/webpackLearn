<template>
  <div>
    <div id="container">
      <h1>{{initData}}</h1>
    </div>
    <button v-on:click="reverseMessage">反转</button>
    <button v-on:click="handleDel">删减</button>
  </div>
</template>

<script>
import "./asset/index.less";
import "./asset/reset.less";
import "./asset/index.css";
import "./asset/reset.css";

export default {
  data() {
    return {
      initData: "Vue开发环境运行成功了"
    };
  },
  methods: {
    reverseMessage() {
      this.initData = this.initData
        .split("")
        .reverse()
        .join("");
    },
    handleDel() {
      const initData = this.initData.split("");
      initData.pop();
      this.initData = initData.join("");
    }
  }
};
</script>

<style scoped>
#container {
  color: red;
  display: flex;
}
</style>
