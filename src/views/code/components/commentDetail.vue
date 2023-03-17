<template>
  <el-card shadow="never" style="margin-top: 20px">
    <template #header> <span style="font-size: 24px; font-weight: 700">评论区</span></template>
    <div class="comment-detail">
      <div class="comment-info">
        <span style="font-size: 18px">{{ commentState.total }} 条评论</span>
        <el-radio-group v-model="commentSort" @change="handleSortChange">
          <el-radio-button :label="0">最新</el-radio-button>
          <el-radio-button :label="1">最热</el-radio-button>
        </el-radio-group>
      </div>
      <div class="comment-input">
        <img :src="userInfo?.avatar" alt="用户头像" />
        <div class="input-box">
          <fs-text-editor ref="editorRef" @text-html="handeGetComment" />
          <el-button type="info" style="margin-top: 40px; border-radius: 0" @click="handleSubmit">发表评论</el-button>
        </div>
      </div>
      <div class="comment-list">
        <div class="comment-item" v-for="item in commentState.commentList" :key="item.id">
          <fs-comment-card
            :comment-detail="item"
            @like-comment="handleLikeComment"
            @replay-son-comment="handleReplaySonComment"
            @get-more-son-comment="handleGetMoreSonComment"
          />
        </div>
        <div class="comment-pagination">
          <el-pagination
            background
            layout="prev, pager, next"
            @current-change="handleCommentPageChange"
            :page-size="commentState.pageSize"
            :total="commentState.total"
          />
        </div>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import FsCommentCard from "@/components/FsCommentCard/FsCommentCard.vue";
import FsTextEditor from "@/components/FsTextEditor/FsTextEditor.vue";
import { useRoute } from "vue-router";
import useUserStore from "@/stores/userStore";
import { ElMessage } from "element-plus";
import type { ICommentPayload } from "@/types/commentType";
import useCommentStore from "@/stores/useCommentStore";
import { treeCommentGetCurrent } from "@/utils/tools";
const commentSort = ref<0 | 1>(0);
const editorRef = ref<InstanceType<typeof FsTextEditor>>();

const $route = useRoute();
const codeId = $route.params.id as string; // 拿到路由id

const { userInfo } = useUserStore();
const { commentPayload, commentState, getCommentList, addCommnetData, likeCommentData, getSonCommentList } =
  useCommentStore();

onMounted(() => {
  getCommentList(codeId);
});

// 分页获取评论列表
const handleCommentPageChange = (page: number) => {
  getCommentList(codeId, page);
};

// 排序获取评论列表
const handleSortChange = () => {
  commentState.sort = commentSort.value;
  getCommentList(codeId);
};

// 拿到富文本编辑器里的文本
const handeGetComment = (content: string) => {
  commentPayload.content = content;
};

// 发表一级评论
const handleSubmit = () => {
  judgeCommentContent(commentPayload.content) &&
    addCommnetData(codeId, () => {
      getCommentList(codeId);
      // 发表成功清空富文本内容
      commentPayload.content = "";
      editorRef.value?.clearContent();
    });
};

// 点赞评论
const handleLikeComment = (commentId: number, rootId?: number) => {
  likeCommentData(commentId, () => {
    // 点赞根评论
    !rootId && commentState.commentList.find((item) => item.id === commentId)!.like++;

    // 点赞子评论：从根评论获取到子评论，将树形子评论扁平后改变状态
    if (rootId) {
      const fItem = commentState.commentList.find((item) => item.id === rootId)!;
      const currentComment = treeCommentGetCurrent(fItem.children!, commentId);
      currentComment!.like++;
    }
  });
};

// 发表二级评论：回复根评论
const handleReplaySonComment = (payload: ICommentPayload) => {
  if (judgeCommentContent(payload.content)) {
    commentPayload.commentId = payload.commentId;
    commentPayload.rootId = payload.rootId;
    commentPayload.content = payload.content;

    addCommnetData(codeId, () => {
      // getCommentList(codeId);
      getSonCommentList(codeId, payload.rootId!);
      commentPayload.commentId = undefined;
      commentPayload.rootId = undefined;
      commentPayload.content = "";
    });
  }
};

// 获取该评论下的子评论
const handleGetMoreSonComment = (rootId: number) => {
  getSonCommentList(codeId, rootId);
};

// 判断输入的内容
function judgeCommentContent(content: string) {
  if (!content.length) {
    ElMessage.warning("评论内容不能为空");
    return false;
  }
  if (
    content.length < 4 ||
    (!commentPayload.commentId && commentPayload.content.length > 300) ||
    (commentPayload.commentId && commentPayload.content.length < 120)
  ) {
    ElMessage.warning("评论内容过长或过短");
    return false;
  }
  return true;
}
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
