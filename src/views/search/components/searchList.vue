<template>
  <div class="search-list-container">
    <div class="search-item" v-for="i in 10">
      <!-- <fs-code-card /> -->
    </div>
    <div class="search-pagination">
      <el-pagination background layout="prev, pager, next" :total="50" />
    </div>
  </div>
</template>

<script setup lang="ts">
import FsCodeCard from "@/components/FsCodeCard/FsCodeCard.vue";
</script>

<style scoped lang="less">
.search-list-container {
  .search-item {
    margin-top: 20px;
  }
  .search-pagination {
    width: 100%;
    padding: 20px 0;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
