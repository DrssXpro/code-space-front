<template>
  <div class="fs-my-comment">
    <div class="fs-my-comment_info">
      <div class="info-left">
        我 2023-2-26 11:35 评论了 _Async__ 的代码
        <span style="color: var(--el-color-primary); cursor: pointer">二分查找</span>
      </div>
      <div class="info-right">
        <el-button type="success" text>详情</el-button>
        <el-button type="danger" text>删除</el-button>
      </div>
    </div>
    <div class="fs-my-comment_content">这里是的内容</div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
.fs-my-comment {
  padding: 20px 10px;
  &_info {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &_content {
    margin-top: 20px;
  }
}
</style>
