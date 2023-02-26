<template>
  <div class="search-container">
    <div class="gap-item">
      <fs-search-box place-holder="请输入关键字" v-model="searchContent" />
    </div>
    <div class="gap-item">
      <rules-content />
    </div>
    <div class="gap-item">
      <search-list />
    </div>
  </div>
</template>

<script setup lang="ts">
import FsSearchBox from "@/components/FsSearchBox/FsSearchBox.vue";
import rulesContent from "./components/rulesContent.vue";
import searchList from "./components/searchList.vue";
import { ref } from "vue";

const searchContent = ref("");
</script>

<style scoped lang="less">
.search-container {
  height: 100%;
  width: 1200px;
  margin: 0 auto;
  .gap-item {
    margin-top: 20px;
  }
}
</style>
