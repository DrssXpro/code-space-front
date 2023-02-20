<template>
  <div class="code-list">
    <div class="code-item" v-for="i in 10">
      <fs-code-card />
    </div>
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
    margin-bottom: 20px;
  }
  .code-more {
    width: 100%;
    .more-btn {
      width: 120px;
      padding: 5px 8px;
      margin: 20px auto;
      background-color: var(--choose-color);
      cursor: pointer;
      border-radius: 5px;
      &:hover {
        opacity: 0.9;
      }
    }
  }
}
</style>
