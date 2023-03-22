<template>
  <div class="code-list" v-if="props.codeList.length">
    <a class="code-item" :href="`#/spaceCode/${i.id}`" target="_blank" v-for="i in props.codeList" :key="i.id">
      <fs-space-code-card :code-detail="i" />
    </a>
    <div class="pagination">
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
import FsSpaceCodeCard from "@/components/FsSpaceCodeCard/FsSpaceCodeCard.vue";
import FsEmptyBox from "@/components/FsEmptyBox/FsEmptyBox.vue";
import type { ISpaceCodeItem } from "@/types/codeType";
import { ref } from "vue";
const props = defineProps<{
  codeList: ISpaceCodeItem[];
  pageSize: number;
  page: number;
  total: number;
}>();

const emit = defineEmits<{
  (e: "pageChange", page: number): void;
}>();

const currentPage = ref(props.page);

// 分页
const handleChangePage = (page: number) => {
  emit("pageChange", page);
};
</script>

<style scoped lang="less">
.code-list {
  .code-item {
    display: block;
    margin-bottom: 20px;
  }
  .pagination {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
