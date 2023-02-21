<template>
  <div class="space-container">
    <div class="space-search content-gap">
      <fs-search-box v-model="searchContent" place-holder="请输入关键字" />
    </div>
    <div class="space-list content-gap">
      <space-list />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import FsSearchBox from "@/components/FsSearchBox/FsSearchBox.vue";
import spaceList from "./components/spaceList.vue";

const searchContent = ref("");
</script>

<style scoped lang="less">
.space-container {
  width: 1200px;
  margin: 0 auto;
  .content-gap {
    margin-top: 20px;
  }
}
</style>
