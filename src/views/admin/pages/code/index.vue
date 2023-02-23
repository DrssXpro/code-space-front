<template>
  <div class="code-container">
    <div class="container-item">
      <code-rules />
    </div>
    <div class="container-item">
      <code-table />
    </div>
  </div>
</template>

<script setup lang="ts">
import codeTable from "./components/codeTable.vue";
import codeRules from "./components/codeRules.vue";
</script>

<style scoped lang="less">
.code-container {
  width: 100%;
  .container-item {
    margin-bottom: 20px;
  }
}
</style>
