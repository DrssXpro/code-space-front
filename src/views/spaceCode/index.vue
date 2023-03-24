<template>
  <div class="code-detail-container">
    <div class="code-detail-container__left">
      <code-detail @detail-ready="handleGetAuthorList" />
    </div>
    <div class="code-detail-container__right">
      <div class="card-item">
        <author-code-card :author-list="pageState.authorList" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import codeDetail from "./components/codeDetail.vue";
import authorCodeCard from "./components/authorCodeCard.vue";
import { reactive } from "vue";
import type { ISpecialCodeItem } from "@/types/codeType";
import { getAuthorCodeList } from "@/service/api/codeRequest";

const pageState = reactive({
  authorList: [] as ISpecialCodeItem[],
});

const handleGetAuthorList = async (authorId: string) => {
  const res = await getAuthorCodeList(authorId);
  pageState.authorList = res.data.rows;
};
</script>

<style scoped lang="less">
.code-detail-container {
  width: 1200px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  gap: 20px;
  &__left {
    flex: 1;
  }
  &__right {
    width: 300px;
    .card-item {
      margin-bottom: 20px;
    }
  }
}
</style>
