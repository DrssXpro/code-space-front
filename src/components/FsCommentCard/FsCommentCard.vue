<template>
  <div class="fs-comment-card">
    <div class="fs-comment-card_header">
      <img :src="props.commentDetail.user.authorAvatar" alt="用户头像" />
      <div class="user-info">
        <span>{{ props.commentDetail.user.authorName }}</span>
      </div>
    </div>
    <div class="fs-comment-card_content">
      <div v-html="props.commentDetail.content"></div>
    </div>
    <div class="fs-comment-card_footer">
      <div>{{ formatTime(props.commentDetail.createdAt, "YYYY-MM-DD hh:ss:mm") }}</div>
      <el-button type="info" text @click="emit('likeComment', props.commentDetail.id)">
        <i class="fa fa fa-thumbs-o-up"></i>
        <span style="margin-left: 5px">{{ props.commentDetail.like }}</span></el-button
      >
      <el-button type="danger" text @click="showReplayBox">回复</el-button>
    </div>
    <template v-if="props.commentDetail.children && props.commentDetail.children.length">
      <fs-child-comment v-for="item in props.commentDetail.children" :key="item.id" :comment-detail="item" />
    </template>
    <div class="fs-comment-card_replay" v-show="showReplay">
      <el-input
        v-model="replayContent"
        type="textarea"
        :placeholder="`回复 @${currentReplayObj}`"
        maxlength="120"
        show-word-limit
        :autosize="{ minRows: 6 }"
      ></el-input>
      <el-button type="primary" style="width: 120px; border-radius: 0; margin-top: 20px" @click="handleReplaySon"
        >回复</el-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import FsChildComment from "./FsChildComment.vue";
import type { ICommentItem, ICommentPayload } from "@/types/commentType";
import { formatTime } from "@/utils/formatTime";
const props = defineProps<{
  commentDetail: ICommentItem;
}>();

const emit = defineEmits<{
  (e: "likeComment", commentId: number): void;
  (e: "replaySonComment", commentPayload: ICommentPayload): void;
}>();

// 当前回复对象
const currentReplayObj = ref("");

// 展示回复框
const showReplay = ref(false);

const replayContent = ref("");

const showReplayBox = () => {
  currentReplayObj.value = props.commentDetail.user.authorName;
  showReplay.value = true;
};

// 子评论回复根评论
const handleReplaySon = () => {
  emit("replaySonComment", {
    content: replayContent.value,
    commentId: props.commentDetail.id,
    rootId: props.commentDetail.id,
  });
};
</script>

<style scoped lang="less">
@import "./style.less";
.fs-comment-card {
  width: 100%;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--el-card-border-color);
  &_header {
    .comment-header();
  }

  &_content {
    margin: 20px 0;
  }
  &_footer {
    .comment-footer();
  }
  &_replay {
    margin-left: 50px;
    margin-top: 20px;
    text-align: end;
  }
}
</style>
