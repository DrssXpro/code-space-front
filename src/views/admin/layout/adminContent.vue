<template>
  <div class="admin-content-container">
    <router-view v-slot="{ Component }">
      <transition name="slide-fade">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </transition>
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
  overflow-y: auto;
  overflow-x: hidden;
  .slide-fade-leave-to {
    opacity: 0;
    transform: translateX(40px);
  }
  .slide-fade-enter-from {
    opacity: 0;
    transform: translateX(-40px);
  }
  .slide-fade-enter-active,
  .slide-fade-leave-active {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100;
    transition: all 0.5s;
  }
}
</style>
