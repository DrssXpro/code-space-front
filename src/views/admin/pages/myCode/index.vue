<template>
  <div class="content-code-container">
    <div class="content-code-form gap-item">
      <fs-form ref="fsFormRef" :form-config="formConfig" v-model="searchState">
        <template #operator>
          <el-button type="danger" @click="searchDataList">查询</el-button>
          <el-button type="info" @click="resetForm">重置</el-button>
        </template>
      </fs-form>
    </div>
    <div class="content-code-table gap-item">
      <fs-table
        :list-data="codeState.codeList"
        :list-count="codeState.total"
        :loading="codeState.loading"
        :page="codeState.page"
        :page-size="codeState.pageSize"
        @page-change="handlePageChange"
        :table-config="tableConfig"
        :show-index-column="false"
      >
        <template #header>
          <div class="header-config">
            <span>代码列表</span>
          </div>
        </template>
        <template #id="{ row }">
          <div class="one-line" :title="row.id">{{ row.id }}</div>
        </template>
        <template #content="{ row }">
          <div class="one-line" :title="row.content">{{ row.content }}</div>
        </template>
        <template #status="{ row }">
          <el-tag :type="row.status == 1 ? 'success' : 'info'">{{ row.status == 1 ? "公开" : "私有" }}</el-tag>
        </template>
        <template #isPwd="{ row }">
          <el-tag :type="row.isPwd ? 'danger' : ''">{{ row.isPwd ? "是" : "否" }}</el-tag>
        </template>
        <template #createdAt="{ row }">
          {{ formatTime(row.createdAt, "YYYY-MM-DD hh:ss:mm") }}
        </template>
        <template #updatedAt="{ row }">
          {{ formatTime(row.updatedAt, "YYYY-MM-DD hh:ss:mm") }}
        </template>
        <template #operator="{ row }">
          <el-button type="info" link @click="handleSkipToDetail(row.id)">详情</el-button>
          <el-button type="success" link @click="handleCodeDrawer(row)">编辑</el-button>
          <el-button type="danger" link @click="handleDeleteCode(row.id)">删除</el-button>
        </template>
      </fs-table>

      <code-drawer ref="codeDrawerRef" @refresh-table="getMyCodeListData" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import codeDrawer from "./components/codeDrawer.vue";
import FsForm from "@/components/FsForm/FsForm.vue";
import FsTable from "@/components/FsTable/FsTable.vue";
import tableConfig from "./config/table.config";
import formConfig from "./config/form.config";
import useMyCode from "@/hooks/useMyCode";
import { formatTime } from "@/utils/formatTime";
import type { IMyCodeItem } from "@/types/codeType";
import { __debounce } from "@/utils/tools";
const fsFormRef = ref<InstanceType<typeof FsForm>>();
const codeDrawerRef = ref<InstanceType<typeof codeDrawer>>();

const { codeState, searchState, getMyCodeListData, deleteMyCodeData } = useMyCode();

onMounted(() => {
  getMyCodeListData();
});

// 跳转至代码详情
const handleSkipToDetail = (id: string) => {
  window.open(`/#/code/${id}`);
};

// 打开编辑抽屉：传递代码详情
const handleCodeDrawer = (row: IMyCodeItem) => {
  codeDrawerRef.value?.controllDrawer(true, row);
};

// 删除指定代码
const handleDeleteCode = (id: string) => {
  deleteMyCodeData(id, () => getMyCodeListData());
};

// 搜索
const searchDataList = __debounce(() => {
  getMyCodeListData();
}, 500);

// 分页
const handlePageChange = __debounce((current: number) => {
  codeState.page = current;
  getMyCodeListData();
}, 500);

// 重置
const resetForm = __debounce(() => {
  fsFormRef.value && fsFormRef.value.formRef?.resetFields();
  codeState.page = 1;
  getMyCodeListData();
}, 500);
</script>

<style scoped lang="less">
@import "../public.less";

.content-code-container {
  width: 100%;

  .content-code-form {
    width: 100%;
    .public-container();
    .form-container();
  }

  .content-code-table {
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
