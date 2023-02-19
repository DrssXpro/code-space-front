<template>
  <div class="nav-content-container">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
.nav-content-container {
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 70px;
  color: var(--font-color);
}
</style>
