<template>
  <el-card shadow="never" v-if="props.greatList.length">
    <template #header>优秀代码</template>
    <a :href="`/#/spaceCode/${i.id}`" target="_blank" v-for="i in props.greatList" :key="i.id">
      <div class="code-item">
        <i class="fa fa-code" style="margin-top: 3px"></i>
        <div class="code-info">
          <div class="code-name">{{ i.title }}</div>
          <div>
            <span>{{ i.lan }}</span>
            <span>|</span>
            <span>{{ getTimeDis(i.createdAt) }}</span>
            <span>|</span>
            <span>{{ i.line }} lines</span>
          </div>
        </div>
      </div>
    </a>
  </el-card>
</template>

<script setup lang="ts">
import type { ISpecialCodeItem } from "@/types/codeType";
import { getTimeDis } from "@/utils/formatTime";

const props = defineProps<{
  greatList: ISpecialCodeItem[];
}>();
</script>

<style scoped lang="less">
.code-item {
  display: flex;
  cursor: pointer;
  padding: 10px 15px;
  color: var(--el-text-color-primary);
  .code-info {
    margin-left: 5px;

    span {
      font-size: 14px;
      margin-right: 3px;
      color: var(--el-text-color-secondary);
    }
  }
  &:hover {
    background-color: var(--el-bg-color-page);
  }
}
</style>
