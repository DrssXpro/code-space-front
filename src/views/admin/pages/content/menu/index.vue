<template>
  <div class="content-menu-container">
    <div class="content-menu-form gap-item">
      <fs-form ref="fsFormRef" :form-config="formConfig" v-model="formData">
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
    <div class="content-menu-table gap-item">
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
            <span>菜单列表</span>
            <el-button type="primary">添加菜单</el-button>
          </div>
        </template>
        <template #createdAt="{ row }">
          <el-tag type="danger">{{ row.createdAt }}</el-tag>
        </template>
        <template #operator="{ row }">
          <el-button type="success" link>编辑</el-button>
          <el-button type="success" link>编辑</el-button>
          <el-button type="danger" link>删除</el-button>
        </template>
      </fs-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import FsForm from "@/components/FsForm/FsForm.vue";
import FsTable from "@/components/FsTable/FsTable.vue";
import tableConfig from "./config/table.config";
import formConfig from "./config/form.config";
import { ref } from "vue";
const fsFormRef = ref<InstanceType<typeof FsForm>>();
const loading = ref(false);

const formData = ref({
  title: "12312321",
  lan: "1",
});

const page = ref({
  current: 1,
  pageSize: 10,
});

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

.content-menu-container {
  width: 100%;

  .content-menu-form {
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

  .content-menu-table {
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
