<template>
  <div class="space-content-container">
    <div class="space-item" v-for="item in tableState.tableData" :key="item.id" @click="handleJoinSpace(item.id)">
      <fs-space-card :space-detail="item" />
    </div>
    <div class="space-pagination">
      <el-pagination background layout="prev, pager, next" :total="tableState.total" />
    </div>
  </div>
</template>

<script setup lang="ts">
import FsSpaceCard from "@/components/FsSpaceCard/FsSpaceCard.vue";
import useSpace from "@/hooks/useSpace";
import { onMounted } from "vue";
const { tableState, getSpaceListByAdmin } = useSpace();

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
