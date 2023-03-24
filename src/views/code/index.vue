<template>
  <div class="code-detail-container">
    <div class="code-detail-container__left">
      <code-detail @detail-ready="handleGetUserId" />
      <comment-detail />
    </div>
    <div class="code-detail-container__right">
      <div class="card-item">
        <new-code-card :code-list="pageState.newCodeList" />
      </div>
      <div class="card-item">
        <author-code-card :author-list="pageState.authorList" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import codeDetail from "./components/codeDetail.vue";
import commentDetail from "./components/commentDetail.vue";
import newCodeCard from "./components/newCodeCard.vue";
import authorCodeCard from "./components/authorCodeCard.vue";
import { onMounted, reactive } from "vue";
import type { ISpecialCodeItem } from "@/types/codeType";
import { getAuthorCodeList, getNewCodeListBySquare } from "@/service/api/codeRequest";

const pageState = reactive({
  authorList: [] as ISpecialCodeItem[],
  newCodeList: [] as ISpecialCodeItem[],
});

onMounted(() => {
  getNewCodeList();
});

// 获取最新代码列表
async function getNewCodeList() {
  const res = await getNewCodeListBySquare();
  pageState.newCodeList = res.data.rows;
}

// 代码详情拿到后获取用户id查询用户分享
const handleGetUserId = async (userId: string) => {
  const res = await getAuthorCodeList(userId);
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
