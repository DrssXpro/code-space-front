<template>
  <div class="admin-container">
    <admin-menu />
    <admin-content />
  </div>
</template>

<script setup lang="ts">
import adminMenu from "./layout/adminMenu.vue";
import adminContent from "./layout/adminContent.vue";
</script>

<style scoped lang="less">
.admin-container {
  position: relative;
}
</style>
