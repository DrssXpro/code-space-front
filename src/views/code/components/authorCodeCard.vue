<template>
  <el-card shadow="never" v-if="props.authorList.length">
    <template #header>作者分享</template>
    <a :href="`#/code/${i.id}`" target="_blank" v-for="i in props.authorList" :key="i.id">
      <div class="code-item">
        <i class="fa fa-code"></i>
        <div class="code-info">
          <div class="code-name one-line">{{ i.title }}</div>
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
  authorList: ISpecialCodeItem[];
}>();
</script>

<style scoped lang="less">
.code-item {
  display: flex;
  cursor: pointer;
  padding: 10px 15px;

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

  .one-line {
    width: 220px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
