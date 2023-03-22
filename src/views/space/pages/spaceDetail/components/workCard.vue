<template>
  <el-card shadow="never">
    <template #header> 任务通知 </template>
    <div class="work-content" v-if="props.taskDetail">
      <div class="title">{{ props.taskDetail.name }}</div>
      <div class="introduce">{{ props.taskDetail.introduce }}</div>
      <div class="time">
        发布时间：<span style="color: var(--el-text-color-secondary)">{{
          formatTime(props.taskDetail?.createdAt || Date.now(), "YYYY-MM-DD hh:ss:mm")
        }}</span>
      </div>
    </div>
    <div class="empty" v-else>暂无任务</div>
  </el-card>
</template>

<script setup lang="ts">
import type { ITaskItem } from "@/types/taskType";
import { formatTime } from "@/utils/formatTime";

const props = defineProps<{
  taskDetail?: ITaskItem;
}>();
</script>

<style scoped lang="less">
.work-content {
  padding: 10px 20px;
  letter-spacing: 0.1em;
  line-height: 1.5em;
  .title {
    font-size: 18px;
  }
  .introduce {
    margin: 10px 0;
  }
  .time {
    font-size: 14px;
  }
}

.empty {
  padding: 20px;
  display: flex;
  align-items: center;
  color: var(--el-text-color-secondary);
  font-size: 18px;
}
</style>
