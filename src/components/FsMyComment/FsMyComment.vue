<template>
  <div class="fs-my-comment">
    <div class="fs-my-comment_info">
      <div class="info-left">
        我在 {{ formatTime(props.commentDetail.createdAt, "YYYY-MM-DD hh:ss:mm") }} 评论了 代码
        <span
          style="color: var(--el-color-primary); cursor: pointer"
          @click="emit('skipToCode', props.commentDetail.codeId)"
          >{{ props.commentDetail.code.codeTitle }}</span
        >
      </div>
      <div class="info-right">
        <el-button type="danger" text @click="emit('deleteComment', props.commentDetail.id)">删除</el-button>
      </div>
    </div>
    <div class="fs-my-comment_content" :title="props.commentDetail.content">{{ props.commentDetail.content }}</div>
  </div>
</template>

<script setup lang="ts">
import type { IMyCommentItem } from "@/types/commentType";
import { formatTime } from "@/utils/formatTime";

const emit = defineEmits<{
  (e: "deleteComment", commentId: number): void;
  (e: "skipToCode", codeId: string): void;
}>();

const props = defineProps<{
  commentDetail: IMyCommentItem;
}>();
</script>

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
    width: 50vw;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
}
</style>
