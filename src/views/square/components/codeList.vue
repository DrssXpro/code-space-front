<template>
  <div class="code-list">
    <a class="code-item" :href="`code/${item.id}`" v-for="item in codeState.codeList" :key="item.id" target="_blank">
      <fs-code-card :code-detail="item" />
    </a>
    <div class="code-more">
      <el-button class="more-btn" @click="handleGetMore" type="info">点击查看更多</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import FsCodeCard from "@/components/FsCodeCard/FsCodeCard.vue";
import { getCodeListBySquare } from "@/service/api/codeRequest";
import type { ISquareCodeItem } from "@/types/codeType";
import { onMounted, reactive } from "vue";

const codeState = reactive({
  codeList: [] as ISquareCodeItem[],
  page: 1,
  pageSize: 10,
});

onMounted(() => {
  handleGetCodeList();
});

const handleGetCodeList = async () => {
  const res = await getCodeListBySquare({ limit: codeState.pageSize, offset: codeState.page - 1 });
  codeState.codeList = [...codeState.codeList, ...res.data.rows];
};

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
    }
  }
}
</style>
