<template>
  <div class="content-space-container">
    <div class="content-space-form gap-item">
      <fs-form ref="fsFormRef" :form-config="formConfig" v-model="searchState">
        <template #operator>
          <el-button type="danger" @click="searchDataList">查询</el-button>
          <el-button type="info" @click="resetForm">重置</el-button>
        </template>
      </fs-form>
    </div>
    <div class="content-space-table gap-item">
      <fs-table
        :list-data="tableState.tableData"
        :list-count="tableState.total"
        :loading="tableState.loading"
        :page-size="tableState.pageSize"
        @page-change="handlePageChange"
        :table-config="tableConfig"
        :show-index-column="false"
      >
        <template #header>
          <div class="header-config">
            <span>空间列表</span>
          </div>
        </template>
        <template #introduce="{ row }">
          <div class="one-line">{{ row.introduce }}</div>
        </template>
        <template #peopleCount="{ row }">
          <el-tag>{{ row.peopleCount }}</el-tag>
        </template>
        <template #codeCount="{ row }">
          <el-tag type="success">{{ row.codeCount }}</el-tag>
        </template>
        <template #createdAt="{ row }">
          {{ formatTime(row.createdAt, "YYYY-MM-DD hh:ss:mm") }}
        </template>
        <template #updatedAt="{ row }">
          {{ formatTime(row.updatedAt, "YYYY-MM-DD hh:ss:mm") }}
        </template>
        <template #operator="{ row }">
          <el-button type="danger" link @click="handleDeleteSpace(row.id)">删除</el-button>
        </template>
      </fs-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import FsForm from "@/components/FsForm/FsForm.vue";
import FsTable from "@/components/FsTable/FsTable.vue";
import tableConfig from "./config/table.config";
import formConfig from "./config/form.config";
import useSpace from "@/hooks/useSpace";
import { formatTime } from "@/utils/formatTime";
import { __debounce } from "@/utils/tools";
const fsFormRef = ref<InstanceType<typeof FsForm>>();

const { tableState, searchState, getSpaceListByAdmin, deleteSpaceByAdmin } = useSpace();

onMounted(() => {
  getSpaceListByAdmin();
});

// 搜索内容
const searchDataList = __debounce(() => {
  getSpaceListByAdmin();
}, 500);

const handlePageChange = (current: number) => {
  console.log(current);
};

// 删除指定空间
const handleDeleteSpace = (spaceId: number) => {
  deleteSpaceByAdmin(spaceId, () => {
    getSpaceListByAdmin();
  });
};

// 重置搜索条件
const resetForm = __debounce(() => {
  fsFormRef.value && fsFormRef.value.formRef?.resetFields();
  getSpaceListByAdmin();
}, 500);
</script>

<style scoped lang="less">
@import "../public.less";

.content-space-container {
  width: 100%;

  .content-space-form {
    width: 100%;
    .public-container();
    .form-container();
  }

  .content-space-table {
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
