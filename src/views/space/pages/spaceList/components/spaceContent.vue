<template>
  <div class="space-search">
    <fs-search-box
      v-model="searchState.kw"
      place-holder="请输入关键字"
      @search="getSpaceListByAdmin"
      @clear-search-value="getSpaceListByAdmin"
    />
  </div>
  <div class="space-content-container" v-if="tableState.tableData.length">
    <div class="space-item" v-for="item in tableState.tableData" :key="item.id" @click="handleJoinSpace(item.id)">
      <fs-space-card :space-detail="item" />
    </div>
    <div class="space-pagination">
      <el-pagination background layout="prev, pager, next" :total="tableState.total" />
    </div>
  </div>
  <fs-empty-box v-else />
</template>

<script setup lang="ts">
import FsSearchBox from "@/components/FsSearchBox/FsSearchBox.vue";
import FsEmptyBox from "@/components/FsEmptyBox/FsEmptyBox.vue";
import FsSpaceCard from "@/components/FsSpaceCard/FsSpaceCard.vue";
import useSpace from "@/hooks/useSpace";
import { onMounted } from "vue";
const { tableState, searchState, getSpaceListByAdmin } = useSpace();

const emit = defineEmits<{
  (e: "joinSpace", spaceId: number): void;
}>();

onMounted(() => {
  getSpaceListByAdmin();
});

const handleJoinSpace = (spaceId: number) => {
  emit("joinSpace", spaceId);
};
</script>

<style scoped lang="less">
.space-search {
  margin-bottom: 20px;
}
.space-content-container {
  display: flex;
  flex-wrap: wrap;
  // justify-content: space-between;

  gap: 20px;
  .space-item {
    width: 270px;
    height: 270px;
    background-color: var(--el-bg-color-overlay);
    border-radius: 10px;
    overflow: hidden;
  }
  .space-pagination {
    width: 100%;
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
  }
}
</style>
