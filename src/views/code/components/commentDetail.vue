<template>
  <el-card shadow="never" style="margin-top: 20px">
    <template #header> <span style="font-size: 24px; font-weight: 700">评论区</span></template>
    <div class="comment-detail">
      <div class="comment-info">
        <span style="font-size: 18px">64 个评论</span>
        <el-radio-group v-model="commentSort">
          <el-radio-button label="0">最新</el-radio-button>
          <el-radio-button label="1">最热</el-radio-button>
        </el-radio-group>
      </div>
      <div class="comment-input">
        <img src="@/assets/image/avatar.jpg" alt="" />
        <div class="input-box">
          <fs-text-editor />
          <el-button type="info" style="margin-top: 40px; border-radius: 0">发表评论</el-button>
        </div>
      </div>
      <div class="comment-list">
        <div class="comment-item" v-for="i in 5">
          <fs-comment-card />
        </div>
        <div class="comment-pagination">
          <el-pagination background layout="prev, pager, next" :total="50" />
        </div>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { ref } from "vue";
import FsCommentCard from "@/components/FsCommentCard/FsCommentCard.vue";
import FsTextEditor from "@/components/FsTextEditor/FsTextEditor.vue";
const commentSort = ref("0");
</script>

<style scoped lang="less">
.comment-detail {
  width: 100%;
  padding: 20px;
  .comment-info {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid var(--el-card-border-color);
  }
  .comment-input {
    display: flex;
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-right: 20px;
    }
  }
  .comment-list {
    margin-top: 20px;
    .comment-item {
      margin-bottom: 20px;
    }
    .comment-pagination {
      display: flex;
      justify-content: end;
    }
  }
}
</style>
