<template>
  <div class="main-container">
    <el-config-provider :locale="zhCn">
      <router-view />
    </el-config-provider>
  </div>
</template>

<script setup lang="ts">
import zhCn from "element-plus/lib/locale/lang/zh-cn";
</script>

<style scoped lang="less">
.main-container {
  background-color: var(--el-bg-color-page);
  min-height: 100vh;
  transition: background-color 0.3s;
}
</style>
