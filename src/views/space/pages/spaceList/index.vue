<template>
  <div class="space-list-container">
    <div class="space-search content-gap">
      <fs-search-box v-model="searchContent" place-holder="请输入关键字" />
    </div>
    <div class="space-content content-gap">
      <space-content />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import FsSearchBox from "@/components/FsSearchBox/FsSearchBox.vue";
import spaceContent from "./components/spaceContent.vue";

const searchContent = ref("");
</script>

<style scoped lang="less">
.space-list-container {
  width: 90%;
  margin: 0 auto;
  .content-gap {
    margin-top: 20px;
  }
}
</style>
