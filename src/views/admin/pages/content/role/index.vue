<template>
  <div class="content-role-container">
    <div class="gap-item">
      <role-rules />
    </div>
    <div class="gap-item">
      <role-table />
    </div>
  </div>
</template>

<script setup lang="ts">
import roleRules from "./components/roleRules.vue";
import roleTable from "./components/roleTable.vue";
</script>

<style scoped lang="less">
@import "../../public.less";
.content-role-container {
  width: 100%;
}
</style>
