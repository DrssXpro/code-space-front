<template>
  <el-card shadow="never">
    <template #header>优秀代码</template>
    <template v-if="props.greatList.length">
      <div class="code-item" v-for="i in props.greatList" :key="i.id">
        <i class="fa fa-code"></i>
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
      </div></template
    >
    <fs-empty-box v-else />
  </el-card>
</template>

<script setup lang="ts">
import FsEmptyBox from "@/components/FsEmptyBox/FsEmptyBox.vue";
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
