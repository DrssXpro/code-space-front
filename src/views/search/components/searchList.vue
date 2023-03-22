<template>
  <div class="search-list-container" v-if="props.codeList.length">
    <div class="search-item" v-for="i in props.codeList" :key="i.id">
      <fs-code-card :code-detail="i" />
    </div>
    <div class="search-pagination">
      <el-pagination
        background
        :current-page="currentPage"
        layout="prev, pager, next"
        :page-size="props.pageSize"
        :total="props.total"
        @current-change="handleChangePage"
      />
    </div>
  </div>
  <fs-empty-box v-else />
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import FsCodeCard from "@/components/FsCodeCard/FsCodeCard.vue";
import FsEmptyBox from "@/components/FsEmptyBox/FsEmptyBox.vue";
import type { ICodeItem } from "@/types/codeType";

const props = defineProps<{
  total: number;
  page: number;
  pageSize: number;
  codeList: ICodeItem[];
}>();

// 内部维护页码，主要用于搜索条件改变时回显至第一页
const currentPage = ref(props.page);

watch(
  () => props.page,
  (newValue) => (currentPage.value = newValue)
);

const emit = defineEmits<{
  (e: "pageChange", current: number): void;
}>();

const handleChangePage = (page: number) => {
  emit("pageChange", page);
};
</script>

<style scoped lang="less">
.search-list-container {
  .search-item {
    margin-top: 20px;
  }
  .search-pagination {
    width: 100%;
    padding: 20px 0;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
