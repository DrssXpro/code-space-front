<template>
  <div class="square-container">
    <div class="square-container__left">
      <code-tab />
      <code-list />
    </div>
    <div class="square-container__right">
      <div class="sticky">
        <div class="card-item">
          <new-code-card />
        </div>
        <div class="card-item">
          <ranking-card />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import codeTab from "./components/codeTab.vue";
import codeList from "./components/codeList.vue";
import rankingCard from "./components/rankingCard.vue";
import newCodeCard from "./components/newCodeCard.vue";
</script>

<style scoped lang="less">
.square-container {
  width: 1200px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  gap: 20px;

  &__left {
    flex: 1;
  }
  &__right {
    width: 300px;
    .sticky {
      position: sticky;
      top: 20px;
    }
    .card-item {
      margin-bottom: 20px;
    }
  }
}
</style>
