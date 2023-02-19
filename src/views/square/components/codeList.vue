<template>
  <div class="code-list">
    <div class="code-item" v-for="i in 10">
      <fs-code-card />
    </div>
  </div>
</template>

<script setup lang="ts">
import FsCodeCard from "@/components/FsCodeCard/FsCodeCard.vue";
</script>

<style scoped lang="less">
.code-list {
  margin-top: 20px;
  .code-item {
    margin-bottom: 20px;
  }
}
</style>
