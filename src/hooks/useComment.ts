import {
  addComment,
  getChildCodeCommentList,
  getCurrentCodeCommentList,
  likeComment,
} from "@/service/api/commentRequest";
import type { ICommentItem, ICommentPayload } from "@/types/commentType";
import { handleCommentMapTree } from "@/utils/tools";
import { ElMessage } from "element-plus";
import { reactive } from "vue";

export default function useComment() {
  // 添加评论参数
  const commentPayload: ICommentPayload = reactive({
    content: "",
    rootId: undefined,
    commentId: undefined,
  });

  // 获取评论列表
  const commentState = reactive({
    commentList: [] as ICommentItem[],
    total: 0,
    pageSize: 10,
    page: 1,
  });

  // 子孙评论列表
  const sonCommentState = reactive({
    commentList: [] as ICommentItem[],
    total: 0,
    pageSize: 5,
    page: 1,
  });

  // 获取代码评论列表
  async function getCommentList(codeId: string) {
    const res = await getCurrentCodeCommentList(
      codeId,
      {
        limit: commentState.pageSize,
        offset: commentState.page - 1,
      },
      true
    );
    commentState.commentList = res.data.rows;
    commentState.total = res.data.count;
  }

  // 获取子孙评论内容
  async function getSonCommentList(codeId: string, rootId: number) {
    const res = await getChildCodeCommentList(codeId, {
      limit: sonCommentState.pageSize,
      offset: sonCommentState.page - 1,
      rootId,
    });
    sonCommentState.commentList = handleCommentMapTree(res.data.rows);
    // 拿到子孙评论内容后添加到父级评论下面
    const fItem = commentState.commentList.find((item) => item.id === rootId)!;
    fItem.children = [];
    fItem.children = sonCommentState.commentList;
    sonCommentState.total = res.data.count;
  }

  // 点赞评论
  async function likeCommentData(commentId: number, cb?: Function) {
    const res = await likeComment(commentId);
    res.code === 1000 && ElMessage.success(res.message);
    res.code === 1000 && cb && cb();
  }

  // 添加评论
  async function addCommnetData(codeId: string, cb?: Function) {
    const res = await addComment(codeId, { ...commentPayload });
    res.code === 1000 && ElMessage.success(res.message);
    res.code === 1000 && cb && cb();
  }

  return {
    commentPayload,
    commentState,
    getCommentList,
    getSonCommentList,
    likeCommentData,
    addCommnetData,
  };
}
