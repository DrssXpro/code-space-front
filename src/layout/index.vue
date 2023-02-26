<template>
  <div class="app-container">
    <header class="nav-header">
      <nav-header />
    </header>
    <main class="nav-content">
      <nav-content />
    </main>
    <footer class="nav-footer">
      <!-- <nav-footer /> -->
    </footer>
    <fs-back-top />
  </div>
</template>

<script setup lang="ts">
import navHeader from "./components/navHeader.vue";
import navContent from "./components/navContent.vue";
import navFooter from "./components/navFooter.vue";
import FsBackTop from "@/components/FsBackTop/FsBackTop.vue";
</script>

<style scoped lang="less">
.app-container {
  width: 100%;
  height: 100vh;
  overflow-y: auto;
  .nav-header {
    position: relative;
    top: 0;
    width: 100%;
    height: 70px;
    z-index: 9999;
  }
  .nav-content {
    width: 100%;
  }
}
</style>
