<template>
  <el-card shadow="never">
    <template #header>最新代码</template>
    <div class="code-item" v-for="i in 5">
      <i class="fa fa-code"></i>
      <div class="code-info">
        <div class="code-name">二分排序</div>
        <div>
          <span>python</span>
          <span>|</span>
          <span>2月前</span>
          <span>|</span>
          <span>7.13KB</span>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts"></script>

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
