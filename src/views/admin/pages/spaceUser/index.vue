<template>
  <div class="space-people-container">
    <div class="space-people-form gap-item">
      <fs-form ref="fsFormRef" :form-config="formConfig" v-model="searchState">
        <template #operator>
          <el-button type="danger" @click="searchDataList">查询</el-button>
          <el-button type="info" @click="resetForm">重置</el-button>
        </template>
      </fs-form>
    </div>
    <div class="space-people-table gap-item">
      <fs-table
        :list-data="userState.userList"
        :list-count="userState.total"
        :loading="userState.loading"
        :page-size="userState.pageSize"
        @page-change="handlePageChange"
        :table-config="tableConfig"
        :show-index-column="false"
      >
        <template #header>
          <div class="header-config">
            <span>人员列表</span>
            <el-button type="primary" @click="inviteUser">邀请人员</el-button>
          </div>
        </template>
        <template #id="{ row }">
          <div class="one-line" :title="row.id">{{ row.id }}</div>
        </template>
        <template #avatar="{ row }">
          <img :src="row.avatar" alt="用户头像" class="avatar" />
        </template>
        <template #roleName="{ row }">
          <el-tag type="success">{{ row["role.roleName"] }}</el-tag>
        </template>
        <template #createdAt="{ row }">
          {{ formatTime(row.createdAt, "YYYY-MM-DD hh:ss:mm") }}
        </template>
        <template #updatedAt="{ row }">
          {{ formatTime(row.updatedAt, "YYYY-MM-DD hh:ss:mm") }}
        </template>
        <template #operator="{ row }">
          <el-button type="success" link @click="showEditModal(row)">编辑</el-button>
          <el-button type="danger" link @click="kickUserOut(row.id)">踢出</el-button>
        </template>
      </fs-table>
      <invite-modal ref="modalRef" @refresh-table="getSpaceUserListData" />
      <edit-modal ref="editModalRef" @refresh-table="getSpaceUserListData" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import FsForm from "@/components/FsForm/FsForm.vue";
import FsTable from "@/components/FsTable/FsTable.vue";
import inviteModal from "./components/inviteModal.vue";
import editModal from "./components/editModal.vue";
import tableConfig from "./config/table.config";
import formConfig from "./config/form.config";
import useSpaceUser from "@/hooks/useSpaceUser";
import useUserStore from "@/stores/userStore";
import { formatTime } from "@/utils/formatTime";
import { ElMessage } from "element-plus";
import type { ISpaceUserItem } from "@/types/userType";
import { __debounce } from "@/utils/tools";
const fsFormRef = ref<InstanceType<typeof FsForm>>();
const modalRef = ref<InstanceType<typeof inviteModal>>();
const editModalRef = ref<InstanceType<typeof editModal>>();

const { userState, searchState, getSpaceUserListData, kickSpaceUser } = useSpaceUser();
const { userInfo, cancelLogin } = useUserStore();

onMounted(() => {
  getSpaceUserListData();
});

// 打开邀请dialog
const inviteUser = () => {
  modalRef.value?.controllModal(true);
};

// 打开编辑dialog
const showEditModal = (row: ISpaceUserItem) => {
  editModalRef.value?.controllModal(true, row);
};

// 踢出用户
const kickUserOut = (userId: string) => {
  if (!userInfo) {
    cancelLogin();
    return;
  }
  if (userInfo.id == userId) {
    ElMessage.warning("不能踢出自己");
    return;
  }
  kickSpaceUser(userId, () => getSpaceUserListData());
};

const searchDataList = __debounce(() => {
  getSpaceUserListData()
}, 500);

const handlePageChange = (current: number) => {
  console.log(current);
};

const resetForm = __debounce(() => {
  fsFormRef.value && fsFormRef.value.formRef?.resetFields();
  getSpaceUserListData()
}, 500);
</script>

<style scoped lang="less">
@import "../public.less";

.space-people-container {
  width: 100%;

  .space-people-form {
    width: 100%;
    .public-container();
    .form-container();
  }

  .space-people-table {
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
    .avatar {
      width: 60px;
      height: 60px;
    }
  }
}
</style>
