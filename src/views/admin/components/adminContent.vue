<template>
  <div class="admin-content-container">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
.admin-content-container {
  position: absolute;
  left: 220px;
  top: 20px;
  width: calc(100% - 220px);
  height: calc(100vh - 110px);
  overflow-y: scroll;
}
</style>
