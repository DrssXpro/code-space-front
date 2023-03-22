<template>
  <div class="search-container">
    <div class="gap-item">
      <rules-content v-model:search-rules="searchRules" />
    </div>
    <div class="gap-item">
      <search-list
        :total="pageState.total"
        :page="pageState.page"
        :page-size="pageState.pageSize"
        :code-list="pageState.codeList"
        @page-change="handlePageChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, watch } from "vue";
import rulesContent from "./components/rulesContent.vue";
import searchList from "./components/searchList.vue";
import { getCodeListBySearch } from "@/service/api/codeRequest";
import type { ISearchPayload } from "@/types/squareType";
import type { ICodeItem } from "@/types/codeType";
import { ElMessage } from "element-plus";
import { __debounce } from "@/utils/tools";

// 搜索payload
const searchRules = ref<ISearchPayload>({
  kw: "",
  lan: [],
  sort: 1,
  isPwd: false,
});

// 搜索列表
const pageState = reactive({
  codeList: [] as ICodeItem[],
  page: 1,
  pageSize: 10,
  total: 0,
});

onMounted(() => {
  getCodeList();
});

watch(
  () => searchRules.value,
  __debounce(() => {
    searchCode();
  }, 500),
  {
    deep: true,
  }
);

// 搜索
const searchCode = () => {
  pageState.page = 1;
  pageState.codeList = [];
  getCodeList();
};

// 分页
const handlePageChange = (page: number) => {
  pageState.page = page;
  getCodeList();
};

async function getCodeList() {
  try {
    const res = await getCodeListBySearch(
      {
        limit: pageState.pageSize,
        offset: (pageState.page - 1) * pageState.pageSize,
        ...searchRules.value,
      },
      true
    );
    pageState.codeList = res.data.rows;
    pageState.total = res.data.count;
  } catch (error) {
    ElMessage.error("获取数据列表失败");
  }
}
</script>

<style scoped lang="less">
.search-container {
  height: 100%;
  width: 1200px;
  margin: 0 auto;
  .gap-item {
    margin-top: 20px;
  }
}
</style>
