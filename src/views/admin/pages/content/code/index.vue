<template>
  <div class="content-code-container">
    <div class="gap-item">
      <code-rules />
    </div>
    <div class="gap-item">
      <code-table />
    </div>
  </div>
</template>

<script setup lang="ts">
import codeRules from "./components/codeRules.vue";
import codeTable from "./components/codeTable.vue";
</script>

<style scoped lang="less">
@import "../../public.less";
.content-code-container {
  width: 100%;
}
</style>
