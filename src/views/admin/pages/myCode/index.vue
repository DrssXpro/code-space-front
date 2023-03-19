<template>
  <div class="content-code-container">
    <div class="content-code-form gap-item">
      <fs-form ref="fsFormRef" :form-config="formConfigReactive" v-model="formData">
        <template #operator>
          <el-button type="danger" class="btn" @click="searchDataList"
            ><i class="fa fa-search"></i><span>查询</span></el-button
          >
          <el-button type="info" class="btn" @click="resetForm"
            ><i class="fa fa-refresh"></i><span>重置</span></el-button
          >
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
        <template #content="{ row }">
          <div class="one-line" :title="row.content">{{ row.content }}</div>
        </template>
        <template #status="{ row }">
          <el-tag :type="row.status ? 'success' : 'info'">{{ row.status ? "公开" : "私有" }}</el-tag>
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
const fsFormRef = ref<InstanceType<typeof FsForm>>();
const codeDrawerRef = ref<InstanceType<typeof codeDrawer>>();
const formConfigReactive = ref(formConfig);

const { codeState, getMyCodeListData, deleteMyCodeData } = useMyCode();
const formData = ref({
  title: "1",
  lan: "1",
});

onMounted(() => {
  getMyCodeListData();
});

// 跳转至代码详情
const handleSkipToDetail = (id: string) => {
  const location = window.location;
  const url = `${location.protocol}://${location.host}/#/code/${id}`;
  window.open(url);
};

// 打开编辑抽屉：传递代码详情
const handleCodeDrawer = (row: IMyCodeItem) => {
  codeDrawerRef.value?.controllDrawer(true, row);
};

// 删除指定代码
const handleDeleteCode = (id: string) => {
  deleteMyCodeData(id, () => getMyCodeListData());
};

const searchDataList = () => {
  console.log("check:", formData.value);
};

const handlePageChange = (current: number) => {
  console.log(current);
};

const resetForm = () => {
  fsFormRef.value && fsFormRef.value.formRef?.resetFields();
};
</script>

<style scoped lang="less">
@import "../public.less";

.content-code-container {
  width: 100%;

  .content-code-form {
    width: 100%;
    .public-container();
    .form-container();

    .btn {
      display: flex;
      align-items: center;
      i {
        margin-right: 5px;
      }
    }
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
