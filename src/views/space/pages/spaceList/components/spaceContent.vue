<template>
  <div class="space-content-container">
    <div class="space-item" v-for="i in 12" @click="$router.push('/space/detail/123')">
      <fs-space-card />
    </div>
    <div class="space-pagination">
      <el-pagination background layout="prev, pager, next" :total="50" />
    </div>
  </div>
</template>

<script setup lang="ts">
import FsSpaceCard from "@/components/FsSpaceCard/FsSpaceCard.vue";
</script>

<style scoped lang="less">
.space-content-container {
  display: flex;
  flex-wrap: wrap;
  // justify-content: space-between;

  gap: 20px;
  .space-item {
    width: 270px;
    height: 270px;
    background-color: var(--el-bg-color-overlay);
    border-radius: 10px;
    overflow: hidden;
  }
  .space-pagination {
    width: 100%;
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
  }
}
</style>
