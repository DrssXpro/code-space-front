<template>
  <div class="content-menu-container">
    <div class="content-menu-form gap-item">
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
    <div class="content-menu-table gap-item">
      <fs-table
        :list-data="tableState.tableList"
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
          <el-button type="danger" link>删除</el-button>
        </template>
      </fs-table>
      <menu-modal ref="menuModalRef" :is-edit="isEdit"></menu-modal>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import FsForm from "@/components/FsForm/FsForm.vue";
import FsTable from "@/components/FsTable/FsTable.vue";
import menuModal from "./components/menuModal.vue";
import tableConfig from "./config/table.config";
import formConfig from "./config/form.config";
import { getMenuList } from "@/service/api/menuRequest";
import type { IMenuItem } from "@/types/menuType";
import { handleMenuToTree } from "@/utils/tools";
import { formatTime } from "@/utils/formatTime";

const fsFormRef = ref<InstanceType<typeof FsForm>>();
const menuModalRef = ref<InstanceType<typeof menuModal>>();
const formConfigReactive = ref(formConfig);
const formData = ref({
  title: "12312321",
  lan: "1",
});

const isEdit = ref(false);

const tableState = reactive({
  tableList: [] as IMenuItem[],
  current: 1,
  pageSize: 10,
  total: 0,
  loading: false,
});

onMounted(() => {
  getMenuListData();
});

// 获取菜单数据
const getMenuListData = () => {
  tableState.loading = true;
  getMenuList().then((res) => {
    tableState.tableList = JSON.parse(JSON.stringify(handleMenuToTree(res.data.rows)));
    console.log("check:", tableState.tableList);
    tableState.total = res.data.count;
    tableState.loading = false;
  });
};

const getRemoteSelect = (searchValue: string) => {
  const more = [
    {
      value: "4",
      text: "1",
    },
    {
      value: "5",
      text: "2",
    },
    {
      value: "6",
      text: "3",
    },
  ];
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("cb:", searchValue);
      resolve(more);
    }, 2000);
  });
};

formConfigReactive.value.find((item) => item.field === "test")!.remoteSelectFunction = getRemoteSelect;

const searchDataList = () => {
  console.log("check:", formData.value);
};

const controllModal = (isShow: boolean, row?: any) => {
  isEdit.value = row ? true : false;
  menuModalRef.value?.controllModal(isShow);
};

const resetForm = () => {
  fsFormRef.value && fsFormRef.value.formRef?.resetFields();
};
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
