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
        :list-data="tableData"
        :list-count="50"
        :loading="loading"
        :page-size="page.pageSize"
        @page-change="handlePageChange"
        :table-config="tableConfig"
        :show-index-column="false"
      >
        <template #header>
          <div class="header-config">
            <span>代码列表</span>
          </div>
        </template>
        <template #createdAt="{ row }">
          <el-tag type="danger">{{ row.createdAt }}</el-tag>
        </template>
        <template #operator="{ row }">
          <el-button type="success" link @click="handleEditCode">编辑</el-button>
          <el-button type="danger" link>删除</el-button>
        </template>
      </fs-table>

      <code-drawer ref="codeDrawerRef" title="代码编辑" :is-edit="true" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import codeDrawer from "./components/codeDrawer.vue";
import FsForm from "@/components/FsForm/FsForm.vue";
import FsTable from "@/components/FsTable/FsTable.vue";
import tableConfig from "./config/table.config";
import formConfig from "./config/form.config";
const fsFormRef = ref<InstanceType<typeof FsForm>>();
const codeDrawerRef = ref<InstanceType<typeof codeDrawer>>();
const formConfigReactive = ref(formConfig);
const loading = ref(false);

const formData = ref({
  title: "1",
  lan: "1",
});

const modalData = ref({
  title: "1",
  lan: "2",
});

const page = ref({
  current: 1,
  pageSize: 10,
});

const handleEditCode = () => {
  codeDrawerRef.value?.controllDrawer(true);
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

const tableData = [
  {
    test1: "2016-05-03",
    test2: "Tom",
    test3: "abc",
    createdAt: "No. 189, Grove St",
    updatedAt: "No. 189, Grove St",
  },
  {
    test1: "2016-05-03",
    test2: "Tom",
    test3: "abc",
    createdAt: "No. 189, Grove St",
    updatedAt: "No. 189, Grove St",
  },
  {
    test1: "2016-05-03",
    test2: "Tom",
    test3: "abc",
    createdAt: "No. 189, Grove St",
    updatedAt: "No. 189, Grove St",
  },
  {
    test1: "2016-05-03",
    test2: "Tom",
    test3: "abc",
    createdAt: "No. 189, Grove St",
    updatedAt: "No. 189, Grove St",
  },
  {
    test1: "2016-05-03",
    test2: "Tom",
    test3: "abc",
    createdAt: "No. 189, Grove St",
    updatedAt: "No. 189, Grove St",
  },
  {
    test1: "2016-05-03",
    test2: "Tom",
    test3: "abc",
    createdAt: "No. 189, Grove St",
    updatedAt: "No. 189, Grove St",
  },
  {
    test1: "2016-05-03",
    test2: "Tom",
    test3: "abc",
    createdAt: "No. 189, Grove St",
    updatedAt: "No. 189, Grove St",
  },
  {
    test1: "2016-05-03",
    test2: "Tom",
    test3: "abc",
    createdAt: "No. 189, Grove St",
    updatedAt: "No. 189, Grove St",
  },
];
</script>

<style scoped lang="less">
@import "../../public.less";

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
