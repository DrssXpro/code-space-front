<template>
  <div class="user-content-container">
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane :label="`我的收藏(${19})`" name="first">
        <div class="gap-item" v-for="i in 5">
          <fs-collection-code />
        </div>
        <div class="commnet-pagination">
          <el-pagination background layout="prev, pager, next" :total="50" />
        </div>
      </el-tab-pane>
      <el-tab-pane :label="`我的评论(${10})`" name="second">
        <div class="gap-item" v-for="i in 5">
          <fs-my-comment />
        </div>
        <div class="commnet-pagination">
          <el-pagination background layout="prev, pager, next" :total="50" /></div
      ></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import FsMyComment from "@/components/FsMyComment/FsMyComment.vue";
import FsCollectionCode from "@/components/FsCollectionCode/FsCollectionCode.vue";

const activeName = ref("first");

const handleClick = (tab: any, event: Event) => {
  console.log(tab, event);
};
</script>

<style scoped lang="less">
.user-content-container {
  flex: 1;

  padding: 20px;
  background-color: var(--el-bg-color-overlay);
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  .gap-item {
    border-bottom: 1px solid var(--el-border-color-light);
  }
  .commnet-pagination {
    margin-top: 20px;
    display: flex;
    justify-content: end;
  }
}
</style>
