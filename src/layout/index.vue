<template>
  <header class="nav-header">
    <nav-header />
  </header>
  <main class="nav-content">
    <nav-content />
  </main>
  <footer class="nav-footer">
    <!-- <nav-footer /> -->
  </footer>
</template>

<script setup lang="ts">
import navHeader from "./components/navHeader.vue";
import navContent from "./components/navContent.vue";
import navFooter from "./components/navFooter.vue";
</script>

<style scoped lang="less">
.nav-header {
  position: fixed;
  top: 0;
  width: 100%;
  height: 70px;
  z-index: 9999;
}
.nav-content {
  width: 100%;
}
</style>
