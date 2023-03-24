<template>
  <div class="content-user-container">
    <div class="content-user-form gap-item">
      <fs-form ref="fsFormRef" :form-config="formConfig" v-model="searchState">
        <template #operator>
          <el-button type="danger" @click="searchDataList">查询</el-button>
          <el-button type="info" @click="resetForm">重置</el-button>
        </template>
      </fs-form>
    </div>
    <div class="content-user-table gap-item">
      <fs-table
        :list-data="userState.userList"
        :list-count="userState.total"
        :loading="userState.loading"
        :page="userState.page"
        :page-size="userState.pageSize"
        @page-change="handlePageChange"
        :table-config="tableConfig"
        :show-index-column="false"
      >
        <template #header>
          <div class="header-config">
            <span>用户列表</span>
            <el-button type="primary" v-permissions="['content:user:add']" @click="showModal(true)">添加用户</el-button>
          </div>
        </template>
        <template #id="{ row }">
          <div class="one-line" :title="row.id">{{ row.id }}</div>
        </template>
        <template #avatar="{ row }">
          <el-image :src="row.avatar" style="width: 50px"></el-image>
        </template>
        <template #roleName="{ row }">
          <el-tag type="success">{{ row["role.roleName"] }}</el-tag>
        </template>
        <template #status="{ row }">
          <el-tag :type="row.status ? '' : 'danger'">{{ row.status ? "正常" : "禁用" }}</el-tag>
        </template>
        <template #spaceId="{ row }">
          {{ row.spaceId ? `《${row.spaceName}》` : "未加入空间" }}
        </template>
        <template #createdAt="{ row }">
          {{ formatTime(row.createdAt, "YYYY-MM-DD hh:ss:mm") }}
        </template>
        <template #updatedAt="{ row }">
          {{ formatTime(row.updatedAt, "YYYY-MM-DD hh:ss:mm") }}
        </template>
        <template #operator="{ row }">
          <el-button type="success" v-permissions="['content:user:edit']" link @click="showModal(true, row)"
            >编辑</el-button
          >
          <el-button type="danger" v-permissions="['content:user:delete']" link @click="handleDeleteUser(row)"
            >删除</el-button
          >
        </template>
      </fs-table>

      <user-modal ref="userModalRef" :is-edit="isEdit" @refresh-table="getAdminUserListData" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import FsForm from "@/components/FsForm/FsForm.vue";
import FsTable from "@/components/FsTable/FsTable.vue";
import userModal from "./components/userModal.vue";
import type { IUserItem } from "@/types/userType";
import tableConfig from "./config/table.config";
import formConfig from "./config/form.config";
import useAdminUser from "@/hooks/useAdminUser";
import { formatTime } from "@/utils/formatTime";
import { __debounce } from "@/utils/tools";
const fsFormRef = ref<InstanceType<typeof FsForm>>();
const userModalRef = ref<InstanceType<typeof userModal>>();
const { userState, searchState, getAdminUserListData, deleteUserData } = useAdminUser();

const isEdit = ref(false);

onMounted(() => {
  getAdminUserListData();
});

// 删除用户
const handleDeleteUser = async (row: IUserItem) => {
  deleteUserData(row.id, () => getAdminUserListData());
};

// 搜索表格
const searchDataList = __debounce(() => {
  getAdminUserListData();
}, 500);

// 打开模态框
const showModal = (isShow: boolean, row?: IUserItem) => {
  isEdit.value = row ? true : false;
  userModalRef.value?.controllModal(isShow, row);
};

// 分页
const handlePageChange = __debounce((current: number) => {
  userState.page = current;
  getAdminUserListData();
}, 500);

// 重置表单
const resetForm = __debounce(() => {
  fsFormRef.value && fsFormRef.value.formRef?.resetFields();
  userState.page = 1;
  getAdminUserListData();
}, 500);
</script>

<style scoped lang="less">
@import "../public.less";

.content-user-container {
  width: 100%;

  .content-user-form {
    width: 100%;
    .public-container();
    .form-container();
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
