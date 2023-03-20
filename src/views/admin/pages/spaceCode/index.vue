<template>
  <div class="space-code-container">
    <div class="space-code-form gap-item">
      <fs-form ref="fsFormRef" :form-config="formConfigReactive" v-model="searchState">
        <template #operator>
          <el-button type="danger" class="btn" @click="searchDataList">查询</el-button>
          <el-button type="info" class="btn" @click="resetForm">重置</el-button>
        </template>
      </fs-form>
    </div>
    <div class="space-code-table gap-item">
      <fs-table
        :list-data="codeState.codeList"
        :list-count="codeState.total"
        :loading="codeState.loading"
        :page-size="codeState.pageSize"
        @page-change="handlePageChange"
        :table-config="tableConfig"
        :show-index-column="false"
      >
        <template #header>
          <div class="header-config">
            <span>代码列表</span>
          </div>
        </template>
        <template #id="{ row }">
          <div class="one-line" :title="row.id">{{ row.id }}</div>
        </template>
        <template #preview="{ row }">
          <div class="one-line" :title="row.content">{{ row.preview }}...</div>
        </template>
        <template #lan="{ row }">
          <el-tag type="success">{{ row.lan }}</el-tag>
        </template>
        <template #createdAt="{ row }"> {{ formatTime(row.createdAt, "YYYY-MM-DD hh:ss:mm") }} </template>
        <template #updatedAt="{ row }"> {{ formatTime(row.updatedAt, "YYYY-MM-DD hh:ss:mm") }} </template>
        <template #operator="{ row }">
          <el-button type="success" link @click="handleEditCode(row)">编辑</el-button>
          <el-button type="danger" link>删除</el-button>
        </template>
      </fs-table>

      <code-drawer ref="codeDrawerRef" @refresh-table="getSpaceListData" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import codeDrawer from "./components/codeDrawer.vue";
import FsForm from "@/components/FsForm/FsForm.vue";
import FsTable from "@/components/FsTable/FsTable.vue";
import tableConfig from "./config/table.config";
import formConfig from "./config/form.config";
import useSpaceCode from "@/hooks/useSpaceCode";
import { formatTime } from "@/utils/formatTime";
import type { ISpaceMasterCodeItem } from "@/types/codeType";
import { __debounce } from "@/utils/tools";
import { getTaskList } from "@/service/api/taskRequest";
import useUserStore from "@/stores/userStore";
import { ElMessage } from "element-plus";
const fsFormRef = ref<InstanceType<typeof FsForm>>();
const codeDrawerRef = ref<InstanceType<typeof codeDrawer>>();
const formConfigReactive = ref(formConfig);
const { codeState, searchState, getSpaceListData } = useSpaceCode();
const { userInfo } = useUserStore();

onMounted(() => {
  getSpaceListData();
  getTaskOptions();
});

// 获取任务列表选项
const getTaskOptions = async () => {
  if (!userInfo || !userInfo.space) return ElMessage.warning("获取任务列表失败");
  const res = await getTaskList({ limit: 100, offset: 0, kw: "", spaceId: userInfo.space.spaceId });
  if (res.code !== 1000) return ElMessage.warning("获取任务列表失败");
  formConfigReactive.value[2].options = res.data.rows.map((item) => ({ value: item.id, text: item.name }));
};

// 控制抽屉展示
const handleEditCode = (row: ISpaceMasterCodeItem) => {
  codeDrawerRef.value?.controllDrawer(true, row);
};

// 搜索列表
const searchDataList = __debounce(() => {
  console.log(searchState.value);
  getSpaceListData();
}, 500);

// 分页展示
const handlePageChange = (current: number) => {
  console.log(current);
};

// 重置表单
const resetForm = __debounce(() => {
  fsFormRef.value && fsFormRef.value.formRef?.resetFields();
  getSpaceListData();
}, 500);
</script>

<style scoped lang="less">
@import "../public.less";

.space-code-container {
  width: 100%;

  .space-code-form {
    width: 100%;
    .public-container();
    .form-container();
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
