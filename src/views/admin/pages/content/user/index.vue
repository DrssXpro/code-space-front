<template>
  <div class="content-user-container">
    <div class="gap-item">
      <user-rules />
    </div>
    <div class="gap-item">
      <user-table />
    </div>
  </div>
</template>

<script setup lang="ts">
import userRules from "./components/userRules.vue";
import userTable from "./components/userTable.vue";
</script>

<style scoped lang="less">
@import "../../public.less";
.content-user-container {
  width: 100%;
}
</style>
