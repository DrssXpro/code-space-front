<template>
  <div class="code-list">
    <a class="code-item" href="code/123" target="_blank" v-for="i in 10">
      <fs-code-card />
    </a>
    <div class="code-more">
      <div class="more-btn" @click="handleGetMore">点击查看更多</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import FsCodeCard from "@/components/FsCodeCard/FsCodeCard.vue";

const handleGetMore = () => {};
</script>

<style scoped lang="less">
.code-list {
  margin-top: 20px;
  .code-item {
    display: block;
    margin-bottom: 20px;
  }
  .code-more {
    width: 100%;
    .more-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 120px;
      padding: 5px 8px;
      margin: 20px auto;
      background-color: var(--choose-color);
      cursor: pointer;
      color: var(--font-active-color);
      &:hover {
        opacity: 0.8;
      }
    }
  }
}
</style>
