<template>
  <div class="space-task-container">
    <div class="space-task-form gap-item">
      <fs-form ref="fsFormRef" :form-config="formConfig" v-model="searchState">
        <template #operator>
          <el-button type="danger" class="btn" :loading="searchLoading" @click="searchDataList"
            ><span>查询</span></el-button
          >
          <el-button type="info" class="btn" @click="resetForm"
            ><i class="fa fa-refresh"></i><span>重置</span></el-button
          >
        </template>
      </fs-form>
    </div>
    <div class="space-task-table gap-item">
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
            <span>任务列表</span>
            <el-button type="primary" @click="handleTask(false)">发布任务</el-button>
          </div>
        </template>
        <template #isEx="{ row }">
          <el-tag :type="isEx(row.extime) ? 'danger' : ''">{{ isEx(row.extime) ? "是" : "否" }}</el-tag>
        </template>
        <template #extime="{ row }">
          {{ formatTime(row.extime, "YYYY-MM-DD hh:ss:mm") }}
        </template>
        <template #createdAt="{ row }">
          {{ formatTime(row.updatedAt, "YYYY-MM-DD hh:ss:mm") }}
        </template>
        <template #operator="{ row }">
          <el-button type="success" link @click="handleTask(true, row)">编辑</el-button>
          <el-button type="danger" link @click="handleDeleteTask(row.id)">删除</el-button>
        </template>
      </fs-table>
    </div>
    <task-modal ref="taskModalRef" :is-edit="isEdit" @refresh-table="getTaskListData" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import FsForm from "@/components/FsForm/FsForm.vue";
import FsTable from "@/components/FsTable/FsTable.vue";
import taskModal from "./components/taskModal.vue";
import tableConfig from "./config/table.config";
import formConfig from "./config/form.config";
import useTask from "@/hooks/useTask";
import useUserStore from "@/stores/userStore";
import { formatTime } from "@/utils/formatTime";
const taskModalRef = ref<InstanceType<typeof taskModal>>();
const fsFormRef = ref<InstanceType<typeof FsForm>>();
// 获取当前空间id
const { userInfo } = useUserStore();

// 封装基本操作hook
const { tableState, searchState, searchLoading, getTaskListData, deleteTaskData } = useTask(userInfo?.space?.spaceId!);

// 编辑 or 添加
const isEdit = ref(false);

onMounted(() => {
  getTaskListData();
});

// 判断是否过期
const isEx = (exTime: string) => Date.now() >= new Date(exTime).getTime();

const searchDataList = () => {
  console.log("check2:", searchState.value);
};

// 处理task：编辑 or 添加
const handleTask = (edit: boolean, row?: any) => {
  isEdit.value = edit;
  taskModalRef.value?.controllModal(true, row);
};

// 处理task：删除
const handleDeleteTask = (id: number) => {
  deleteTaskData(id, () => {
    getTaskListData();
  });
};

// 分页获取数据
const handlePageChange = (current: number) => {
  console.log(current);
  tableState.currentPage = current;
  getTaskListData();
};

const resetForm = () => {
  fsFormRef.value && fsFormRef.value.formRef?.resetFields();
};
</script>

<style scoped lang="less">
@import "../public.less";

.space-task-container {
  width: 100%;

  .space-task-form {
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

  .space-task-table {
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
