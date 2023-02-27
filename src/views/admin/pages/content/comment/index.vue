<template>
  <div class="content-comment-container">
    <div class="gap-item">
      <comment-rules />
    </div>
    <div class="gap-item">
      <comment-table />
    </div>
  </div>
</template>

<script setup lang="ts">
import commentRules from "./components/commentRules.vue";
import commentTable from "./components/commentTable.vue";
</script>

<style scoped lang="less">
@import "../../public.less";
.content-comment-container {
  width: 100%;
}
</style>
