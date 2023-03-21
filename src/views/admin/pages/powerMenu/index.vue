<template>
  <div class="content-menu-container">
    <div class="content-menu-form gap-item">
      <fs-form ref="fsFormRef" :form-config="formConfig" v-model="searchState">
        <template #operator>
          <el-button type="danger" @click="searchDataList">查询</el-button>
          <el-button type="info" @click="resetForm">重置</el-button>
        </template>
      </fs-form>
    </div>
    <div class="content-menu-table gap-item">
      <fs-table
        :list-data="tableState.tableData"
        :loading="tableState.loading"
        :show-footer="false"
        :table-config="tableConfig"
        :show-index-column="false"
      >
        <template #header>
          <div class="header-config">
            <span>菜单列表</span>
            <el-button type="primary" @click="controllModal(true)">添加菜单</el-button>
          </div>
        </template>
        <template #menuIcon="{ row }">
          <i :class="row.menuIcon"></i>
        </template>
        <template #status="{ row }">
          <el-tag :type="row.status ? '' : 'danger'">{{ row.status ? "正常" : "停用" }}</el-tag>
        </template>
        <template #createdAt="{ row }">
          {{ formatTime(row.createdAt, "YYYY-MM-DD hh:ss:mm") }}
        </template>
        <template #operator="{ row }">
          <el-button type="success" link @click="controllModal(true, row)">编辑</el-button>
          <el-button type="danger" link @click="handleDeleteMenu(row)">删除</el-button>
        </template>
      </fs-table>
      <menu-modal ref="menuModalRef" :is-edit="isEdit" @refresh-table="getMenuListData"></menu-modal>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import FsForm from "@/components/FsForm/FsForm.vue";
import FsTable from "@/components/FsTable/FsTable.vue";
import menuModal from "./components/menuModal.vue";
import tableConfig from "./config/table.config";
import formConfig from "./config/form.config";
import { formatTime } from "@/utils/formatTime";
import usePowerMenu from "@/hooks/usePowerMenu";
import { __debounce } from "@/utils/tools";
const fsFormRef = ref<InstanceType<typeof FsForm>>();
const menuModalRef = ref<InstanceType<typeof menuModal>>();

const { tableState, searchState, getMenuListData, deleteMenuData } = usePowerMenu();

const isEdit = ref(false);

onMounted(() => {
  getMenuListData();
});

// 删除指定的菜单
const handleDeleteMenu = (row: any) => {
  deleteMenuData(row.id!, () => getMenuListData());
};

const searchDataList = __debounce(() => {
  getMenuListData();
}, 500);

const controllModal = (isShow: boolean, row?: any) => {
  isEdit.value = row ? true : false;
  menuModalRef.value?.controllModal(isShow, row);
};

const resetForm = __debounce(() => {
  fsFormRef.value && fsFormRef.value.formRef?.resetFields();
  getMenuListData();
}, 500);
</script>

<style scoped lang="less">
@import "../public.less";

.content-menu-container {
  width: 100%;

  .content-menu-form {
    width: 100%;
    .public-container();
    .form-container();
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
