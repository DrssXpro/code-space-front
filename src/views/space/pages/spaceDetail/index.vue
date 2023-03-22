<template>
  <div class="space-detail-container">
    <div class="space-detail-container__left">
      <div class="sticky">
        <div class="gap-item">
          <introduce-card :space-detail="spaceDetail" />
        </div>
      </div>
    </div>
    <div class="space-detail-container__center">
      <div class="gap-item">
        <rules-tab v-model:searchRules="searchRules" :taskOptions="pageState.taskOptions" />
      </div>
      <div class="gap-item">
        <code-list
          :pageSize="pageState.pageSize"
          :page="pageState.page"
          :total="pageState.total"
          :codeList="pageState.codeList"
          @pageChange="handlePageChange"
        />
      </div>
    </div>
    <div class="space-detail-container__right">
      <div class="sticky">
        <div class="gap-item">
          <work-card :taskDetail="taskDetail" />
        </div>
        <div class="gap-item">
          <great-card :greatList="pageState.greatList" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import rulesTab from "./components/rulesTab.vue";
import codeList from "./components/codeList.vue";
import workCard from "./components/workCard.vue";
import greatCard from "./components/greatCard.vue";
import introduceCard from "./components/introduceCard.vue";
import { onMounted, reactive, ref, watch } from "vue";
import type { ISpaceSearchPayload } from "@/types/searchType";
import type { ISpaceCodeItem, ISpecialCodeItem } from "@/types/codeType";
import { getCodeListBySpace, getGreatListBySpace } from "@/service/api/codeRequest";
import { ElMessage } from "element-plus";
import { getNewTask, getTaskList } from "@/service/api/taskRequest";
import type { ITaskItem } from "@/types/taskType";
import useUserStore from "@/stores/userStore";
import { __debounce } from "@/utils/tools";
import { getSpaceDetail } from "@/service/api/spaceRequest";
import type { ISpaceDetail } from "@/types/spaceType";

const { userInfo } = useUserStore();

// 搜索条件
const searchRules = ref<ISpaceSearchPayload>({
  kw: "",
  lan: [],
  sort: 1,
  task: undefined,
  status: 1,
});

// 页面数据
const pageState = reactive({
  codeList: [] as ISpaceCodeItem[],
  page: 1,
  pageSize: 10,
  total: 0,
  greatList: [] as ISpecialCodeItem[],
  taskOptions: [] as ITaskItem[],
});

// 任务详情
const taskDetail = ref<ITaskItem>();

// 空间详情
const spaceDetail = ref<ISpaceDetail>();

onMounted(() => {
  getSpaceCodeList(); // 获取代码列表
  getGreatList(); // 获取优秀代码列表
  getNewTaskData(); // 获取最新任务通知
  getTaskListData(); // 获取任务options
  getSpaceDetailData(); // 获取空间详情
});

// 监听条件改变搜索内容
watch(
  () => searchRules.value,
  __debounce(() => {
    searchList();
  }, 500),
  { deep: true }
);

// 搜索内容
function searchList() {
  pageState.page = 1;
  getSpaceCodeList();
}

// 分页
function handlePageChange(page: number) {
  pageState.page = page;
  getSpaceCodeList();
}

// 获取列表数据
async function getSpaceCodeList() {
  try {
    const res = await getCodeListBySpace(
      {
        limit: pageState.pageSize,
        offset: (pageState.page - 1) * pageState.pageSize,
        ...searchRules.value,
      },
      true
    );
    pageState.codeList = res.data.rows;
    pageState.total = res.data.count;
    console.log(pageState.codeList);
  } catch (error) {
    ElMessage.error("获取列表数据失败");
  }
}

// 获取优秀代码列表
async function getGreatList() {
  try {
    const res = await getGreatListBySpace();
    pageState.greatList = res.data.rows;
  } catch (error) {
    ElMessage.error("获取列表数据失败");
  }
}

async function getNewTaskData() {
  try {
    const res = await getNewTask();
    taskDetail.value = res.data[0];
  } catch (error) {
    ElMessage.error("获取任务失败");
  }
}

// 获取任务options
async function getTaskListData() {
  try {
    if (userInfo && userInfo.space) {
      const spaceId = userInfo.space.spaceId;
      const res = await getTaskList({ limit: 100, offset: 0, kw: "", spaceId });
      pageState.taskOptions = res.data.rows;
    }
  } catch (error) {
    ElMessage.error("获取任务列表失败");
  }
}

// 获取空间详细信息
async function getSpaceDetailData() {
  try {
    if (userInfo && userInfo.space) {
      const spaceId = userInfo.space.spaceId;
      const res = await getSpaceDetail(spaceId);
      spaceDetail.value = res.data;
      console.log("get", spaceDetail.value);
    }
  } catch (error) {
    ElMessage.error("获取空间详情失败");
  }
}
</script>

<style scoped lang="less">
.space-detail-container {
  width: 1300px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  gap: 20px;
  .sticky {
    position: sticky;
    top: 20px;
  }
  &__left {
    width: 300px;
  }
  &__center {
    flex: 1;
  }
  &__right {
    width: 300px;
  }
  .gap-item {
    margin-bottom: 20px;
  }
}
</style>
