<template>
  <div class="admin-container">
    <admin-menu />
    <admin-content />
  </div>
</template>

<script setup lang="ts">
import adminMenu from "./components/adminMenu.vue";
import adminContent from "./components/adminContent.vue";
</script>

<style scoped lang="less">
.admin-container {
  position: relative;
}
</style>
