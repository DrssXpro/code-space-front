<template>
  <div class="user-content-container" v-loading="collectState.loading">
    <el-tabs v-model="activeName" class="demo-tabs">
      <el-tab-pane :label="`我的收藏(${collectState.total})`" name="first">
        <div class="gap-item" v-for="item in collectState.collectList" :key="item.id">
          <fs-collection-code
            :code-detail="item"
            @cancel-collect="handleCancelCollectCode"
            @check-collect-detail="handleSkipToCode"
          />
        </div>
        <div class="pagination" v-if="collectState.total">
          <el-pagination
            background
            layout="prev, pager, next"
            :page-size="collectState.pageSize"
            :total="collectState.total"
            @current-change="handleCollectPageChange"
          />
        </div>
        <fs-empty-box v-else />
      </el-tab-pane>
      <el-tab-pane :label="`我的评论(${commentState.total})`" name="second">
        <div class="gap-item" v-for="i in commentState.commentList" :key="i.id">
          <fs-my-comment :comment-detail="i" @delete-comment="handleDeleteComment" @skip-to-code="handleSkipToCode" />
        </div>
        <div class="pagination" v-if="commentState.total">
          <el-pagination
            background
            layout="prev, pager, next"
            :page-size="commentState.pageSize"
            :total="commentState.total"
            @current-change="handleCommentPageChange"
          />
        </div>
        <fs-empty-box v-else
      /></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import FsMyComment from "@/components/FsMyComment/FsMyComment.vue";
import FsEmptyBox from "@/components/FsEmptyBox/FsEmptyBox.vue";
import FsCollectionCode from "@/components/FsCollectionCode/FsCollectionCode.vue";
import useInfo from "@/hooks/useInfo";

const {
  collectState,
  commentState,
  getCollectListData,
  getMyCommentListData,
  cancelCollectCode,
  deleteMyCurrentComment,
} = useInfo();
const activeName = ref("first");

// 获取收藏代码列表
onMounted(() => {
  getCollectListData();
  getMyCommentListData();
});

// 取消收藏代码
const handleCancelCollectCode = (codeId: string) => {
  cancelCollectCode(codeId, () => getCollectListData());
};

// 删除指定评论
const handleDeleteComment = (commentId: number) => {
  deleteMyCurrentComment(commentId, () => getMyCommentListData());
};
// 跳转至代码详情
const handleSkipToCode = (codeId: string) => {
  window.open(`/#/code/${codeId}`);
};

// 分页加载
const handleCollectPageChange = (page: number) => {
  collectState.page = page;
  getCollectListData();
};

// 分页加载
const handleCommentPageChange = (page: number) => {
  commentState.page = page;
  getMyCommentListData();
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
