<template>
  <div class="content-user-container">
    <div class="content-user-form gap-item">
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
    <div class="content-user-table gap-item">
      <fs-table
        :list-data="tableState.tableList"
        :list-count="tableState.total"
        :loading="tableState.loading"
        :page-size="tableState.pageSize"
        @page-change="handlePageChange"
        :table-config="tableConfig"
        :show-index-column="false"
      >
        <template #header>
          <div class="header-config">
            <span>用户列表</span>
            <el-button type="primary" @click="showModal(true)">添加用户</el-button>
          </div>
        </template>
        <template #avatar="{ row }">
          <el-image :src="row.avatar" style="width: 50px"></el-image>
        </template>
        <template #roleName="{ row }">
          <el-tag type="success">{{ row.role.roleName }}</el-tag>
        </template>
        <template #status="{ row }">
          <el-tag :type="row.status ? '' : 'danger'">{{ row.status ? "正常" : "禁用" }}</el-tag>
        </template>
        <template #spaceName="{ row }">
          {{ row.spaceName || "未加入空间" }}
        </template>
        <template #createdAt="{ row }">
          {{ formatTime(row.createdAt, "YYYY-MM-DD hh:ss:mm") }}
        </template>
        <template #updatedAt="{ row }">
          {{ formatTime(row.updatedAt, "YYYY-MM-DD hh:ss:mm") }}
        </template>
        <template #operator="{ row }">
          <el-button type="success" link @click="showModal(true, row)">编辑</el-button>
          <el-button type="danger" link @click="handleDeleteUser(row)">删除</el-button>
        </template>
      </fs-table>

      <user-modal
        ref="userModalRef"
        :is-edit="isEdit"
        @refresh-table="getUserListData(tableState.pageSize, tableState.current - 1)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import FsForm from "@/components/FsForm/FsForm.vue";
import FsTable from "@/components/FsTable/FsTable.vue";
import userModal from "./components/userModal.vue";
import type { IUserItem } from "@/types/userType";
import tableConfig from "./config/table.config";
import formConfig from "./config/form.config";
import { ElMessage, ElMessageBox } from "element-plus";
import { formatTime } from "@/utils/formatTime";
import { deleteUserByAdmin, getUserListByAdmin } from "@/service/api/userRequest";
const fsFormRef = ref<InstanceType<typeof FsForm>>();
const userModalRef = ref<InstanceType<typeof userModal>>();
const formConfigReactive = ref(formConfig);

const formData = ref({
  title: "1",
  lan: "1",
});

const isEdit = ref(false);

const tableState = reactive({
  tableList: [] as IUserItem[],
  current: 1,
  pageSize: 10,
  total: 0,
  loading: false,
});
onMounted(() => {
  getUserListData(tableState.pageSize, tableState.current - 1);
});

// 获取用户列表
const getUserListData = (limit: number, offset: number) => {
  getUserListByAdmin({ limit, offset }).then((res) => {
    tableState.total = res.data.count;
    tableState.tableList = res.data.rows;
  });
};

// 删除用户
const handleDeleteUser = async (row: any) => {
  ElMessageBox.confirm(`确定要删除id为 ${row.id} 的这个用户吗？`, {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(async () => {
    const res = await deleteUserByAdmin(row.id);
    res.code === 1000 ? ElMessage.success(res.message) : ElMessage.warning(res.message);
    getUserListData(tableState.pageSize, tableState.current - 1);
  });
};

// 打开模态框
const showModal = (isShow: boolean, row?: any) => {
  isEdit.value = row ? true : false;
  userModalRef.value?.controllModal(isShow, row);
};

const handlePageChange = (current: number) => {
  console.log(current);
};

const resetForm = () => {
  fsFormRef.value && fsFormRef.value.formRef?.resetFields();
};

const searchDataList = () => {
  console.log("check:", formData.value);
};
</script>

<style scoped lang="less">
@import "../public.less";

.content-user-container {
  width: 100%;

  .content-user-form {
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

  .content-user-table {
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
