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
      <fs-child-comment
        v-for="item in props.commentDetail.children"
        :key="item.id"
        :comment-detail="item"
        @like-comment="handleSonCommentLike"
        @replay-content="handleSonReplay"
      />
      <div class="comment-more" v-if="!isTotal && !showCount" @click="handleSonCommentPage">点击加载更多</div>
      <div class="comment-more" v-if="isTotal" @click="closeSonComment">收起</div>
    </template>
    <div class="fs-comment-card_count" v-if="showCount && props.commentDetail.childCount! > 3">
      共{{ props.commentDetail.childCount }}条回复 ,
      <span @click="handleGetMoreComment">点击查看</span>
    </div>
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
import { ElMessage } from "element-plus";
import useCommentStore from "@/stores/useCommentStore";
const props = defineProps<{
  commentDetail: ICommentItem;
}>();

const emit = defineEmits<{
  (e: "likeComment", commentId: number, rootId?: number): void;
  (e: "replaySonComment", commentPayload: ICommentPayload): void;
  (e: "getMoreSonComment", rootId: number): void;
}>();

const { getSonCommentList, clearSonCommentList } = useCommentStore();

// 当前回复对象
const currentReplayObj = ref("");

// 展示回复框
const showReplay = ref(false);

// 展示更多标志
const showCount = ref(true);

// 回复内容
const replayContent = ref("");

// 回复id
const replayId = ref(0);

// 判断是子评论互评还是回复根评论
const isSon = ref(false);

// 判断评论是否已全部加载
const isTotal = ref(false);

const showReplayBox = () => {
  currentReplayObj.value = props.commentDetail.user.authorName;
  showReplay.value = true;
};

const handleSonCommentLike = (commentId: number, rootId: number) => {
  emit("likeComment", commentId, rootId);
};

// 回复评论
const handleReplaySon = () => {
  if (replayContent.value.length < 4 || replayContent.value.length > 120) {
    ElMessage.warning("评论过长或过短");
    return;
  }
  // 判断是子评论互评还是回复根评论
  isSon.value
    ? emit("replaySonComment", {
        content: replayContent.value,
        commentId: replayId.value,
        rootId: props.commentDetail.id,
      })
    : emit("replaySonComment", {
        content: replayContent.value,
        commentId: props.commentDetail.id,
        rootId: props.commentDetail.id,
      });
  isSon.value = false;
};

// 子评论下的互相回复
const handleSonReplay = (replay: number, replayName: string) => {
  currentReplayObj.value = replayName;
  isSon.value = true;
  replayId.value = replay;
  showReplay.value = true;
};

// 获取更多子评论
const handleGetMoreComment = () => {
  emit("getMoreSonComment", props.commentDetail.id);
  showCount.value = false;
};

// 子评论处理分页加载更多
const handleSonCommentPage = () => {
  getSonCommentList(props.commentDetail.codeId, props.commentDetail.id, () => {
    isTotal.value = true;
    ElMessage.success("已加载全部评论");
  });
};

// 收起清空根评论下的内容
const closeSonComment = () => {
  clearSonCommentList(props.commentDetail.id);
  showCount.value = true;
  isTotal.value = false;
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
  &_count {
    margin-top: 10px;
    color: var(--el-text-color-secondary);
    span {
      cursor: pointer;
      &:hover {
        color: var(--el-color-primary);
      }
    }
  }
  &_replay {
    margin-left: 50px;
    margin-top: 20px;
    text-align: end;
  }
  .comment-more {
    margin-left: 30px;
    margin-top: 10px;
    color: var(--el-text-color-secondary);
    cursor: pointer;
    &:hover {
      color: var(--el-color-primary);
    }
  }
}
</style>
