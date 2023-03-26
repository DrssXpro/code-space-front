<template>
  <div class="nav-content-container">
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less"></style>
