<template>
  <div class="space-detail-container">
    <div class="space-detail-container__left">
      <div class="sticky">
        <div class="gap-item">
          <introduce-card />
        </div>
      </div>
    </div>
    <div class="space-detail-container__center">
      <div class="gap-item">
        <rules-tab />
      </div>
      <div class="gap-item">
        <code-list />
      </div>
    </div>
    <div class="space-detail-container__right">
      <div class="sticky">
        <div class="gap-item">
          <work-card />
        </div>
        <div class="gap-item">
          <great-card />
        </div>
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
  .sticky {
    position: sticky;
    top: 20px;
  }
  &__left {
    width: 300px;
  }
  &__center {
    flex: 1;
  }
  &__right {
    width: 300px;
  }
  .gap-item {
    margin-bottom: 20px;
  }
}
</style>
