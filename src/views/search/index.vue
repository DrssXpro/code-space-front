<template>
  <div class="search-container">
    <div class="search-box">
      <fs-search-box place-holder="请输入关键字" v-model="searchContent" />
    </div>
    <div class="search-rules">
      <rules-content />
    </div>
    <div class="search-list">
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
  .search-box {
    margin-top: 10px;
  }
  .search-rules {
    margin-top: 20px;
  }
  .search-list {
    margin-top: 20px;
  }
}
</style>
