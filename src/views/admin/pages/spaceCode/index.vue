<template>
  <div class="space-code-container">
    <div class="space-code-form gap-item">
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
    <div class="space-code-table gap-item">
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
          <div class="one-line" :title="row.content">{{ row.preview }}...</div>
        </template>
        <template #lan="{ row }">
          <el-tag type="success">{{ row.lan }}</el-tag>
        </template>
        <template #createdAt="{ row }"> {{ formatTime(row.createdAt, "YYYY-MM-DD hh:ss:mm") }} </template>
        <template #updatedAt="{ row }"> {{ formatTime(row.updatedAt, "YYYY-MM-DD hh:ss:mm") }} </template>
        <template #operator="{ row }">
          <el-button type="success" link @click="handleEditCode(row)">编辑</el-button>
          <el-button type="danger" link>删除</el-button>
        </template>
      </fs-table>

      <code-drawer ref="codeDrawerRef" @refresh-table="getSpaceListData" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import codeDrawer from "./components/codeDrawer.vue";
import FsForm from "@/components/FsForm/FsForm.vue";
import FsTable from "@/components/FsTable/FsTable.vue";
import tableConfig from "./config/table.config";
import formConfig from "./config/form.config";
import useSpaceCode from "@/hooks/useSpaceCode";
import { formatTime } from "@/utils/formatTime";
import type { ISpaceMasterCodeItem } from "@/types/codeType";
const fsFormRef = ref<InstanceType<typeof FsForm>>();
const codeDrawerRef = ref<InstanceType<typeof codeDrawer>>();
const formConfigReactive = ref(formConfig);
const { codeState, getSpaceListData } = useSpaceCode();

onMounted(() => {
  getSpaceListData();
});

const formData = ref({
  title: "1",
  lan: "1",
});

const handleEditCode = (row: ISpaceMasterCodeItem) => {
  codeDrawerRef.value?.controllDrawer(true, row);
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

.space-code-container {
  width: 100%;

  .space-code-form {
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

  .space-code-table {
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
