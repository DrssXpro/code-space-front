import {
  addComment,
  getChildCodeCommentList,
  getCurrentCodeCommentList,
  likeComment,
} from "@/service/api/commentRequest";
import type { ICommentItem, ICommentPayload } from "@/types/commentType";
import { handleCommentMapTree, __debounce } from "@/utils/tools";
import { ElMessage } from "element-plus";
import { defineStore } from "pinia";
import { reactive } from "vue";

interface ICommentState {
  commentList: ICommentItem[];
  total: number;
  pageSize: number;
  page: number;
}

const useCommentStore = defineStore("comment", () => {
  // 添加评论参数
  const commentPayload: ICommentPayload = reactive({
    content: "",
    rootId: undefined,
    commentId: undefined,
  });

  // 获取评论列表
  const commentState: ICommentState = reactive({
    commentList: [],
    total: 0,
    pageSize: 10,
    page: 1,
  });

  // 根评论下的子评论列表：map
  const sonCommentMap: Record<string, ICommentState> = {};

  // 获取代码评论列表
  async function getCommentList(codeId: string, page?: number) {
    const res = await getCurrentCodeCommentList(
      codeId,
      {
        limit: commentState.pageSize,
        offset: !page ? commentState.page - 1 : (page - 1) * commentState.pageSize,
      },
      true
    );
    commentState.commentList = res.data.rows;
    commentState.total = res.data.count;
    commentState.commentList.forEach((item) => {
      item.children = handleCommentMapTree(item.children!); // 子评论树形结构化
      sonCommentMap[item.id] = { commentList: [], total: 0, pageSize: 5, page: 1 }; // 初始化子评论map数据
    });
  }

  // 获取子孙评论内容
  async function getSonCommentList(codeId: string, rootId: number, page?: number) {
    const res = await getChildCodeCommentList(
      codeId,
      {
        limit: sonCommentMap[rootId].pageSize,
        offset: !page ? sonCommentMap[rootId].page - 1 : (page - 1) * sonCommentMap[rootId].pageSize,
        rootId,
      },
      true
    );
    sonCommentMap[rootId].commentList = handleCommentMapTree(res.data.rows);
    sonCommentMap[rootId].total = res.data.count;

    // 拿到子孙评论内容后添加到父级评论下面
    const fItem = commentState.commentList.find((item) => item.id === rootId)!;
    fItem.children = sonCommentMap[rootId].commentList;
  }

  // 点赞评论
  const likeCommentData = __debounce(async (commentId: number, cb?: Function) => {
    const res = await likeComment(commentId);
    res.code === 1000 && ElMessage.success(res.message);
    res.code === 1000 && cb && cb();
  }, 500);

  // 添加评论
  async function addCommnetData(codeId: string, cb?: Function) {
    const res = await addComment(codeId, { ...commentPayload });
    res.code === 1000 && ElMessage.success(res.message);
    res.code === 1000 && cb && cb();
  }

  return {
    commentPayload,
    commentState,
    sonCommentMap,
    getCommentList,
    getSonCommentList,
    likeCommentData,
    addCommnetData,
  };
});

export default useCommentStore;
