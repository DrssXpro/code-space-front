<template>
  <div class="main-container">
    <router-view />
  </div>
</template>

<script setup lang="ts">
import useTheme from "./hooks/useTheme";

const { init } = useTheme();
init();
</script>

<style scoped lang="less">
.main-container {
  background-color: var(--bg-color);
  min-height: 100vh;
  transition: background-color 0.3s;
}
</style>
