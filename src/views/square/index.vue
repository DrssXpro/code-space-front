<template>
  <div class="square-container">
    <div class="square-container__left">
      <code-tab />
      <code-list />
    </div>
    <div class="square-container__right">
      <div class="card-item">
        <personal-card />
      </div>
      <div class="card-item">
        <ranking-card />
      </div>
      <div class="card-item">
        <recommand-card />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import codeTab from "./components/codeTab.vue";
import codeList from "./components/codeList.vue";
import personalCard from "./components/personalCard.vue";
import rankingCard from "./components/rankingCard.vue";
import recommandCard from "./components/recommandCard.vue";
</script>

<style scoped lang="less">
.square-container {
  padding: 20px;
  display: flex;
  gap: 20px;
  &__left {
    flex: 1;
  }
  &__right {
    width: 300px;
    .card-item {
      margin-bottom: 20px;
    }
  }
}
</style>
