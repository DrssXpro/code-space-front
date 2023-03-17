<template>
  <div class="fs-empty-box">
    <img :src="EMPTY_IMAGE" alt="空内容" />
  </div>
</template>

<script setup lang="ts">
import { EMPTY_IMAGE } from "@/config/config";
</script>

<style scoped lang="less">
.fs-empty-box {
  display: flex;
  margin: 20px 0;
  justify-content: center;
  img {
    width: 200px;
  }
}
</style>
