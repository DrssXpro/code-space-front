import type { ICommentItem, ICommentPayload } from "@/types/commentType";
import type { IList, IResponseData } from "@/types/responseType";
import { myRequest } from "..";

// 获取当前代码下的评论列表
function getCurrentCodeCommentList(codeId: string, payload: { limit: number; offset: number }, loading = false) {
  return myRequest.get<IResponseData<IList<ICommentItem>>>(
    {
      url: `/comment_list/code/${codeId}`,
      params: payload,
    },
    loading
  );
}

// 获取指定评论下的子评论
function getChildCodeCommentList(
  codeId: string,
  payload: { limit: number; offset: number; rootId: number },
  loading = false
) {
  return myRequest.get<IResponseData<IList<ICommentItem>>>(
    {
      url: `/comment_list/child/${codeId}`,
      params: payload,
    },
    loading
  );
}

// 添加评论
function addComment(codeId: string, payload: ICommentPayload, loading = false) {
  return myRequest.post<IResponseData>(
    {
      url: `/comment/add/${codeId}`,
      data: payload,
    },
    loading
  );
}

// 评论点赞
function likeComment(commentId: number, loading = false) {
  return myRequest.post<IResponseData>(
    {
      url: `/comment/like/${commentId}`,
    },
    loading
  );
}

// 评论删除
function deleteComment(commentId: number, loading = false) {
  return myRequest.post<IResponseData>(
    {
      url: `/comment/delete/${commentId}`,
    },
    loading
  );
}

export { getCurrentCodeCommentList, getChildCodeCommentList, addComment, likeComment, deleteComment };
