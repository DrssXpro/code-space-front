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
  margin-top: 70px;
  border: 1px solid #000;
  color: var(--font-color);
}
</style>
