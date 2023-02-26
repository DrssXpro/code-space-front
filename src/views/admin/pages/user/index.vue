<template>
  <div class="user-container">
    <user-info />
    <user-content />
  </div>
</template>

<script setup lang="ts">
import userInfo from "./components/userInfo.vue";
import userContent from "./components/userContent.vue";
</script>

<style scoped lang="less">
.user-container {
  width: 100%;
  display: flex;
  gap: 20px;
}
</style>
