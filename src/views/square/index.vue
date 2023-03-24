<template>
  <div class="square-container">
    <div class="square-container__left">
      <code-tab v-model:search="searchState" />
      <code-list :is-finish="pageState.isFinish" :code-list="pageState.codeList" @get-more-data="handleGetMoreData" />
    </div>
    <div class="square-container__right">
      <div class="sticky">
        <div class="card-item">
          <new-code-card :new-code-list="pageState.newCodeList" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import codeTab from "./components/codeTab.vue";
import codeList from "./components/codeList.vue";
import newCodeCard from "./components/newCodeCard.vue";
import type { ISquareSearchPayload } from "@/types/searchType";
import { ref, reactive, onMounted, watch } from "vue";
import { getCodeListBySquare, getNewCodeListBySquare } from "@/service/api/codeRequest";
import { ElMessage } from "element-plus";
import type { ICodeItem, ISpecialCodeItem } from "@/types/codeType";
import { __debounce } from "@/utils/tools";

// 搜索条件
const searchState = ref<ISquareSearchPayload>({
  lan: "All",
  sort: 1,
});

// 页面总数据
const pageState = reactive({
  codeList: [] as ICodeItem[],
  pageSize: 10,
  page: 1,
  total: 0,
  isFinish: false,
  newCodeList: [] as ISpecialCodeItem[],
  userList: [],
});

onMounted(() => {
  handleGetCodeList();
  getNewCodeList();
});

// 搜索条件改变
watch(
  () => searchState.value,
  __debounce(() => {
    getSearchList();
  }, 500),
  {
    deep: true,
  }
);

// 分页获取更多数据
const handleGetMoreData = () => {
  pageState.page += 1;
  handleGetCodeList();
};

// 搜索逻辑：重置内容，page归第一页，完成为false
const getSearchList = () => {
  pageState.codeList = [];
  pageState.page = 1;
  pageState.isFinish = false;
  handleGetCodeList();
};

// 获取广场数据
async function handleGetCodeList() {
  if (pageState.isFinish) return;
  try {
    const res = await getCodeListBySquare(
      {
        limit: pageState.pageSize,
        offset: (pageState.page - 1) * pageState.pageSize,
        lan: searchState.value.lan,
        sort: searchState.value.sort,
      },
      true
    );
    if (!res.data.rows.length) {
      pageState.isFinish = true;
      ElMessage.success("已加载全部数据");
    }
    pageState.codeList = [...pageState.codeList, ...res.data.rows];
  } catch (error) {
    ElMessage.error("获取列表数据失败");
  }
}

// 获取最新分享列表
async function getNewCodeList() {
  const res = await getNewCodeListBySquare();
  pageState.newCodeList = res.data.rows;
}
</script>

<style scoped lang="less">
.square-container {
  width: 1200px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  gap: 20px;

  &__left {
    flex: 1;
  }
  &__right {
    width: 300px;
    .sticky {
      position: sticky;
      top: 20px;
    }
    .card-item {
      margin-bottom: 20px;
    }
  }
}
</style>
