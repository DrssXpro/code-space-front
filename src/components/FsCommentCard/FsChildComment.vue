<template>
  <div class="fs-child-comment-container">
    <div class="child-header">
      <img :src="props.commentDetail.user.authorAvatar" alt="用户头像" />
      <div class="user-info">
        <span>{{ props.commentDetail.user.authorName }}</span>
      </div>
    </div>
    <div class="child-content">
      {{ props.commentDetail.content }}
    </div>
    <div class="child-footer">
      <div>{{ formatTime(props.commentDetail.createdAt, "YYYY-MM-DD hh:ss:mm") }}</div>
      <el-button type="info" text>
        <i class="fa fa fa-thumbs-o-up"></i>
        <span style="margin-left: 5px">{{ props.commentDetail.like }}</span></el-button
      >
      <el-button type="danger" text @click="emit('replayContent', '123')">回复</el-button>
    </div>
  </div>
  <!-- 递归评论 -->
  <fs-child-comment :comment-detail="i" v-for="i in props.commentDetail.children" :key="i.id" />
</template>

<script setup lang="ts">
import type { ICommentItem } from "@/types/commentType";
import { formatTime } from "@/utils/formatTime";

const props = defineProps<{
  commentDetail: ICommentItem;
}>();
const emit = defineEmits<{
  (e: "replayContent", replayObj: string): void;
}>();
</script>

<style scoped lang="less">
@import "./style.less";
.fs-child-comment-container {
  margin-left: 40px;
  margin-top: 20px;
  .child-header {
    .comment-header();
  }
  .child-content {
    margin: 10px 0;
    font-size: 18px;
  }
  .child-footer {
    .comment-footer();
  }
}
</style>
