<template>
  <div class="code-list">
    <a class="code-item" :href="`/#/code/${item.id}`" v-for="item in props.codeList" :key="item.id" target="_blank">
      <fs-code-card :code-detail="item" />
    </a>
    <div class="code-more">
      <el-button class="more-btn" @click="emit('getMoreData')" type="info" v-if="!props.isFinish"
        >点击加载更多</el-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import FsCodeCard from "@/components/FsCodeCard/FsCodeCard.vue";
import type { ICodeItem } from "@/types/codeType";
import { __debounce } from "@/utils/tools";
const props = defineProps<{
  codeList: ICodeItem[];
  isFinish: boolean;
}>();

// 分页获取更多数据
const emit = defineEmits<{
  (e: "getMoreData"): void;
}>();



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
    }
  }
}
</style>
