<template>
  <div class="content-comment-container">
    <div class="content-comment-form gap-item">
      <fs-form ref="fsFormRef" :form-config="formConfig" v-model="searchState">
        <template #operator>
          <el-button type="danger" @click="searchDataList">查询</el-button>
          <el-button type="info" @click="resetForm">重置</el-button>
        </template>
      </fs-form>
    </div>
    <div class="content-comment-table gap-item">
      <fs-table
        :list-data="commentState.commentList"
        :list-count="commentState.total"
        :loading="commentState.loading"
        :page-size="commentState.pageSize"
        :page="commentState.page"
        @page-change="handlePageChange"
        :table-config="tableConfig"
        :show-index-column="false"
      >
        <template #header>
          <div class="header-config">
            <span>评论列表</span>
          </div>
        </template>
        <template #content="{ row }">
          <div class="one-line" :title="row.content">{{ row.content }}</div>
        </template>
        <template #codeTitle="{ row }">
          <el-tag type="danger" style="cursor: pointer" @click="skipToDetail(row['code.codeId'])">{{
            row["code.codeTitle"]
          }}</el-tag>
        </template>
        <template #rootId="{ row }">
          <el-tag :type="row.rootId ? 'info' : 'success'">{{ row.rootId ? "回复" : "评论" }}</el-tag>
        </template>
        <template #createdAt="{ row }">
          {{ formatTime(row.createdAt, "YYYY-MM-DD hh:ss:mm") }}
        </template>
        <template #operator="{ row }">
          <el-button type="danger" v-permissions="['content:comment:delete']" link @click="deleteComment(row.id)"
            >删除</el-button
          >
        </template>
      </fs-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import useAdminComment from "@/hooks/useAdminComment";
import FsForm from "@/components/FsForm/FsForm.vue";
import FsTable from "@/components/FsTable/FsTable.vue";
import tableConfig from "./config/table.config";
import formConfig from "./config/form.config";
import { __debounce } from "@/utils/tools";
import { formatTime } from "@/utils/formatTime";

const fsFormRef = ref<InstanceType<typeof FsForm>>();

const { commentState, searchState, getCommentListByAdminData, deleteCurrentCommentByAdmin } = useAdminComment();

onMounted(() => {
  getCommentListByAdminData();
});

// 搜索
const searchDataList = __debounce(() => {
  getCommentListByAdminData();
}, 500);

const handlePageChange = __debounce((current: number) => {
  commentState.page = current;
  getCommentListByAdminData();
}, 500);

// 跳转至代码详情
const skipToDetail = (codeId: string) => {
  window.open(`/#/code/${codeId}`);
};

// 删除
const deleteComment = (id: number) => {
  deleteCurrentCommentByAdmin(id, () => getCommentListByAdminData);
};

// 重置
const resetForm = __debounce(() => {
  fsFormRef.value && fsFormRef.value.formRef?.resetFields();
  commentState.page = 1;
  getCommentListByAdminData();
}, 500);
</script>

<style scoped lang="less">
@import "../public.less";

.content-comment-container {
  width: 100%;

  .content-comment-form {
    width: 100%;
    .public-container();
    .form-container();
  }

  .content-comment-table {
    width: 100%;
    min-height: calc(100vh - 230px);
    .public-container();
    .header-config {
      display: flex;
      align-items: center;
      justify-content: space-between;
      span {
        font-size: 20px;
      }
      margin-bottom: 20px;
    }
  }
}
</style>
