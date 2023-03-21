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
        <template #preview="{ row }">
          <div class="one-line" :title="row.content">{{ row.preview }}</div>
        </template>
        <template #lan="{ row }">
          <el-tag type="success">{{ row.lan }}</el-tag>
        </template>
        <template #status="{ row }">
          <el-tag :type="row.status ? 'info' : 'danger'">{{ row.status ? "公开" : "私有" }}</el-tag>
        </template>
        <template #isPwd="{ row }">
          <el-tag :type="row.isPwd ? 'danger' : ''">{{ row.isPwd ? "加密" : "未加密" }}</el-tag>
        </template>
        <template #createdAt="{ row }">
          {{ formatTime(row.createdAt, "YYYY-MM-DD hh:ss:mm") }}
        </template>
        <template #updatedAt="{ row }">
          {{ formatTime(row.updatedAt, "YYYY-MM-DD hh:ss:mm") }}
        </template>
        <template #operator="{ row }">
          <el-button type="success" link @click="skipToDetail(row.id)">详情</el-button>
          <el-button type="success" link @click="handleEditCode(row)">编辑</el-button>
          <el-button type="danger" link>删除</el-button>
        </template>
      </fs-table>

      <code-drawer ref="codeDrawerRef" @refresh-table="getCodeListByAdminData" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import useAdminCode from "@/hooks/useAdminCode";
import codeDrawer from "./components/codeDrawer.vue";
import FsForm from "@/components/FsForm/FsForm.vue";
import FsTable from "@/components/FsTable/FsTable.vue";
import tableConfig from "./config/table.config";
import formConfig from "./config/form.config";
import { formatTime } from "@/utils/formatTime";
import { __debounce } from "@/utils/tools";
import type { IAdminCodeItem } from "@/types/codeType";
const fsFormRef = ref<InstanceType<typeof FsForm>>();
const codeDrawerRef = ref<InstanceType<typeof codeDrawer>>();

const { searchState, codeState, getCodeListByAdminData } = useAdminCode();

// 查询
const searchDataList = __debounce(() => {
  getCodeListByAdminData();
}, 500);

const handlePageChange = __debounce((current: number) => {
  codeState.page = current;
  getCodeListByAdminData();
}, 500);

const skipToDetail = (codeId: string) => {
  window.open(`/#/code/${codeId}`);
};

// 展示编辑抽屉
const handleEditCode = (row: IAdminCodeItem) => {
  codeDrawerRef.value?.controllDrawer(true, row);
};

// 重置
const resetForm = __debounce(() => {
  fsFormRef.value && fsFormRef.value.formRef?.resetFields();
  getCodeListByAdminData();
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
