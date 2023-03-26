<template>
  <div class="not-found-container">
    <img src="../../assets/icon/notFound.svg" class="not-found" alt="404" />
    <div class="desc">您访问的页面不存在</div>
    <el-button type="primary" @click="$router.push('/square')">返回广场</el-button>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
.not-found-container {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  .desc {
    margin-bottom: 20px;
  }
  .not-found {
    width: 300px;
  }
}
</style>
