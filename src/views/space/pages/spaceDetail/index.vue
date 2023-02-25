<template>
  <div class="space-detail-container">
    <div class="space-detail-container__left">
      <introduce-card />
    </div>
    <div class="space-detail-container__center">
      <div class="card-item">
        <fs-search-box v-model="state.searchContent" place-holder="空间搜索" />
      </div>
      <div class="card-item">
        <rules-tab />
      </div>
      <div class="card-item">
        <code-list />
      </div>
    </div>
    <div class="space-detail-container__right">
      <div class="card-item">
        <work-card />
      </div>
      <div class="card-item">
        <great-card />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import rulesTab from "./components/rulesTab.vue";
import codeList from "./components/codeList.vue";
import workCard from "./components/workCard.vue";
import greatCard from "./components/greatCard.vue";
import introduceCard from "./components/introduceCard.vue";
import FsSearchBox from "@/components/FsSearchBox/FsSearchBox.vue";
import { reactive } from "vue";

const state = reactive({
  searchContent: "",
});
</script>

<style scoped lang="less">
.space-detail-container {
  width: 1300px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  gap: 20px;
  &__left {
    width: 250px;
  }
  &__center {
    flex: 1;
  }
  &__right {
    width: 250px;
  }
  .card-item {
    margin-bottom: 20px;
  }
}
</style>
