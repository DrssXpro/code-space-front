<template>
  <div class="square-container">
    <div class="square-container__left">
      <code-tab />
      <code-list />
    </div>
    <div class="square-container__right"></div>
  </div>
</template>

<script setup lang="ts">
import codeTab from "./components/codeTab.vue";
import codeList from "./components/codeList.vue";
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

    border: 1px solid red;
  }
}
</style>
