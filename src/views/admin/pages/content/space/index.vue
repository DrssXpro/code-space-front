<template>
  <div class="content-space-container">
    <div class="gap-item">
      <space-rules />
    </div>
    <div class="gap-item">
      <space-table />
    </div>
  </div>
</template>

<script setup lang="ts">
import spaceRules from "./components/spaceRules.vue";
import spaceTable from "./components/spaceTable.vue";
</script>

<style scoped lang="less">
@import "../../public.less";
.content-space-container {
  width: 100%;
}
</style>
