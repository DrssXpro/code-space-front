<template>
  <div class="content-role-container">
    <div class="content-role-form gap-item">
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
    <div class="content-role-table gap-item">
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

    <role-modal
      ref="roleModalRef"
      @refreash-table="getRoleListData(tableState.pageSize, tableState.current - 1)"
      :current-power="currentPower"
      :is-edit="isEdit"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import FsForm from "@/components/FsForm/FsForm.vue";
import FsTable from "@/components/FsTable/FsTable.vue";
import roleModal from "./components/roleModal.vue";
import tableConfig from "./config/table.config";
import formConfig from "./config/form.config";
import { deleteRole, getRoleList, getRoleMenu, updateRoleStatus } from "@/service/api/roleRequest";
import { ElMessage, ElMessageBox } from "element-plus";
import { formatTime } from "@/utils/formatTime";
import type { IRoleItem } from "@/types/roleType";

const fsFormRef = ref<InstanceType<typeof FsForm>>();
const roleModalRef = ref<InstanceType<typeof roleModal>>();
const formConfigReactive = ref(formConfig);

const formData = ref({
  title: "1",
  lan: "1",
});

const tableState = reactive({
  tableList: [] as IRoleItem[],
  current: 1,
  pageSize: 10,
  total: 0,
  loading: false,
});

const isEdit = ref(false);
const currentPower = ref<number[]>([]);

onMounted(() => {
  getRoleListData(tableState.pageSize, tableState.current - 1);
});

// 获取角色列表
const getRoleListData = (limit: number, offset: number) => {
  getRoleList({ limit, offset }).then((res) => {
    tableState.total = res.data.count;
    tableState.tableList = res.data.rows;
  });
};

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
        getRoleListData(tableState.pageSize, tableState.current - 1);
        resolve(true);
      })
      .catch(() => {
        resolve(false);
      });
  });
};

// 删除角色逻辑
const handleDeleteRole = (row: any) => {
  ElMessageBox.confirm(`确定要删除id为 ${row.id} 的这个角色吗？`, {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(async () => {
    const res = await deleteRole(row.id);
    getRoleListData(tableState.pageSize, tableState.current - 1);
    res.code === 1000 ? ElMessage.success(res.message) : ElMessage.warning(res.message);
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
@import "../../public.less";

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
