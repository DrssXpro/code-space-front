<template>
  <div class="fs-child-comment-container">
    <div class="child-header">
      <img :src="props.commentDetail.user.authorAvatar" alt="用户头像" />
      <div class="user-info">
        <span>{{ props.commentDetail.user.authorName }}</span>
        <span v-if="props.commentDetail.replay"
          ><span style="color: var(--el-text-color-secondary)">回复</span> @
          <span style="color: var(--el-color-primary)">{{ props.commentDetail.replay.replayName }}</span>
        </span>
      </div>
    </div>
    <div class="child-content">
      {{ props.commentDetail.content }}
    </div>
    <div class="child-footer">
      <div>{{ formatTime(props.commentDetail.createdAt, "YYYY-MM-DD hh:ss:mm") }}</div>
      <el-button type="info" text @click="handleLikeComment(props.commentDetail.id, props.commentDetail.rootId!)">
        <i class="fa fa fa-thumbs-o-up"></i>
        <span style="margin-left: 5px">{{ props.commentDetail.like }}</span></el-button
      >
      <el-button
        type="danger"
        text
        @click="handleReplayComment(props.commentDetail.id, props.commentDetail.user.authorName)"
        >回复</el-button
      >
    </div>
  </div>
  <!-- 递归评论 -->
  <fs-child-comment
    :comment-detail="i"
    v-for="i in props.commentDetail.children"
    :key="i.id"
    @like-comment="handleLikeComment"
  />
</template>

<script setup lang="ts">
import type { ICommentItem } from "@/types/commentType";
import { formatTime } from "@/utils/formatTime";

const props = defineProps<{
  commentDetail: ICommentItem;
}>();
const emit = defineEmits<{
  (e: "replayContent", replayId: number, replayName: string): void;
  (e: "likeComment", commentId: number, rootId: number): void;
}>();

// 点赞评论：递归组件传递事件,需传递根评论id来改变状态
const handleLikeComment = (commentId: number, rootId: number) => {
  emit("likeComment", commentId, rootId);
};

// 回复评论：递归组件传递事件,将要回复的id传出
const handleReplayComment = (replayId: number, replayName: string) => {
  emit("replayContent", replayId, replayName);
};
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
