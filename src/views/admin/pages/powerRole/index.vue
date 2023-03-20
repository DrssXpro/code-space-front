<template>
  <div class="content-role-container">
    <div class="content-role-form gap-item">
      <fs-form ref="fsFormRef" :form-config="formConfig" v-model="searchState">
        <template #operator>
          <el-button type="danger" class="btn" @click="searchDataList">查询</el-button>
          <el-button type="info" class="btn" @click="resetForm">重置</el-button>
        </template>
      </fs-form>
    </div>
    <div class="content-role-table gap-item">
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
            <span>角色列表</span>
            <el-button type="primary" @click="showModal(true)">创建角色</el-button>
          </div>
        </template>
        <template #status="{ row }">
          <el-switch
            v-model="row.status"
            :active-value="1"
            :inactive-value="0"
            :before-change="() => beforeStatusChange(row)"
          ></el-switch>
        </template>
        <template #createdAt="{ row }">
          {{ formatTime(row.createdAt, "YYYY-MM-DD hh:ss:mm") }}
        </template>
        <template #updatedAt="{ row }">
          {{ formatTime(row.updatedAt, "YYYY-MM-DD hh:ss:mm") }}
        </template>
        <template #operator="{ row }">
          <el-button type="success" link @click="showModal(true, row)">编辑</el-button>
          <el-button type="danger" link @click="handleDeleteRole(row)">删除</el-button>
        </template>
      </fs-table>
    </div>

    <role-modal ref="roleModalRef" @refreash-table="getRoleListData" :current-power="currentPower" :is-edit="isEdit" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import FsForm from "@/components/FsForm/FsForm.vue";
import FsTable from "@/components/FsTable/FsTable.vue";
import roleModal from "./components/roleModal.vue";
import tableConfig from "./config/table.config";
import formConfig from "./config/form.config";
import useAdminRole from "@/hooks/useAdminRole";
import { getRoleMenu, updateRoleStatus } from "@/service/api/roleRequest";
import { ElMessage, ElMessageBox } from "element-plus";
import { formatTime } from "@/utils/formatTime";

const fsFormRef = ref<InstanceType<typeof FsForm>>();
const roleModalRef = ref<InstanceType<typeof roleModal>>();

const { tableState, searchState, getRoleListData, deleteRoleByAdmin } = useAdminRole();

const isEdit = ref(false);
const currentPower = ref<number[]>([]);

onMounted(() => {
  getRoleListData();
});

// change方法第一次进入会触发switch改变，改用before-change
const beforeStatusChange = (row: any) => {
  const text = row.status === 0 ? "启用" : "停用";
  return new Promise<boolean>((resolve) => {
    ElMessageBox.confirm(`确定要${text}${row.name}角色吗？`, {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    })
      .then(async () => {
        ElMessage.success(`${text}成功`);
        await updateRoleStatus(row.id, row.status === 0 ? 1 : 0);
        getRoleListData();
        resolve(true);
      })
      .catch(() => {
        resolve(false);
      });
  });
};

// 删除角色逻辑
const handleDeleteRole = (row: any) => {
  deleteRoleByAdmin(row.id as number, () => {
    getRoleListData();
  });
};

const showModal = async (show: boolean, row?: any) => {
  isEdit.value = row ? true : false;
  if (isEdit.value) {
    const res = await getRoleMenu(row.id);
    console.log(res.data);
    currentPower.value = res.data.map((item) => item.id);
    row.menuList = [];
    roleModalRef.value?.controllModal(show, row);
  } else {
    currentPower.value = [];
    roleModalRef.value?.controllModal(show);
  }
};
const searchDataList = () => {
  console.log("check:", searchState.value);
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

.content-role-container {
  width: 100%;

  .content-role-form {
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

  .content-role-table {
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
