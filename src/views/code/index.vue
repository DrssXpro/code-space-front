<template>
  <div class="code-detail-container">
    <div class="code-detail-container__left">
      <code-detail />
      <comment-detail />
    </div>
    <div class="code-detail-container__right">
      <div class="card-item">
        <new-code-card />
      </div>
      <div class="card-item">
        <author-code-card />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import codeDetail from "./components/codeDetail.vue";
import commentDetail from "./components/commentDetail.vue";
import newCodeCard from "./components/newCodeCard.vue";
import authorCodeCard from "./components/authorCodeCard.vue";
</script>

<style scoped lang="less">
.code-detail-container {
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
    .card-item {
      margin-bottom: 20px;
    }
  }
}
</style>
