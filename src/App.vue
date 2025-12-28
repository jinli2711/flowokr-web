<script setup lang="ts">
import {RouterView} from 'vue-router'
</script>

<template>
  <RouterView />
</template>

<style>
/* 全局重置样式，去除白边 */
body,
html,
#app {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
  overflow-x: hidden;   /* 只禁横向 */
  overflow-y: auto;     /* 允许纵向滚动 */
}
</style>
