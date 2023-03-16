<template>
  <div class="user-content-container" v-loading="collectState.loading">
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane :label="`我的收藏(${collectState.total})`" name="first">
        <div class="gap-item" v-for="item in collectState.collectList" :key="item.id">
          <fs-collection-code
            :code-detail="item"
            @cancel-collect="handleCancelCollectCode"
            @check-collect-detail="handleCheckCollectCode"
          />
        </div>
        <div class="pagination">
          <el-pagination
            background
            layout="prev, pager, next"
            :page-size="collectState.pageSize"
            :total="collectState.total"
            @current-change="handlePageChange"
          />
        </div>
      </el-tab-pane>
      <el-tab-pane :label="`我的评论(${10})`" name="second">
        <div class="gap-item" v-for="i in 5">
          <fs-my-comment />
        </div>
        <div class="pagination">
          <el-pagination background layout="prev, pager, next" :page-size="10" :total="100" /></div
      ></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import FsMyComment from "@/components/FsMyComment/FsMyComment.vue";
import FsCollectionCode from "@/components/FsCollectionCode/FsCollectionCode.vue";
import useInfo from "@/hooks/useInfo";

const { collectState, getCollectListData, cancelCollectCode } = useInfo();
const activeName = ref("first");

// 获取收藏代码列表
onMounted(() => {
  getCollectListData();
});

// 取消收藏代码
const handleCancelCollectCode = (codeId: string) => {
  cancelCollectCode(codeId, () => {
    getCollectListData();
  });
};

// 跳转至代码详情
const handleCheckCollectCode = (codeId: string) => {
  const location = window.location;
  const url = `${location.protocol}//${location.host}/#/code/${codeId}`;
  window.open(url);
};

// 分页加载
const handlePageChange = (page: number) => {
  collectState.page = page;
  getCollectListData();
};

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
  .pagination {
    margin-top: 20px;
    display: flex;
    justify-content: end;
  }
}
</style>
