<template>
  <div class="share-container">
    <div class="share-form-conatiner">
      <share-form />
    </div>
    <div class="share-operator">
      <el-button type="info" style="width: 120px">发布代码</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import shareForm from "./components/shareForm.vue";
</script>

<style scoped lang="less">
.share-container {
  width: 900px;
  margin: 0 auto;
  margin-top: 20px;
  padding: 20px;
  border-radius: 20px;
  background-color: var(--el-bg-color-overlay);
  .share-operator {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
