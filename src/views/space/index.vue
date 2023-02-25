<template>
  <div class="space-container">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
.space-container {
  width: 1300px;
  margin: 0 auto;
}
</style>
