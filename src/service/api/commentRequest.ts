import type { ICommentItem, ICommentPayload, IMyCommentItem } from "@/types/commentType";
import type { IList, IResponseData } from "@/types/responseType";
import { myRequest } from "..";

// 管理员获取评论列表
function getCommentListByAdmin(payload: { limit: number; offset: number; kw: string; code: string }, loading = false) {
  return myRequest.get<IResponseData>(
    {
      url: "/admin_comment_list",
      params: payload,
    },
    loading
  );
}

// 管理员删除评论列表
function deleteCommentByAdmin(commentId: number, loading = false) {
  return myRequest.post<IResponseData>(
    {
      url: `/admin_comment/delete/${commentId}`,
    },
    loading
  );
}

// 获取当前代码下的评论列表
function getCurrentCodeCommentList(
  codeId: string,
  payload: { limit: number; offset: number; sort: 0 | 1 },
  loading = false
) {
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

// 获取我的评论列表
function getMyCommentList(payload: { limit: number; offset: number }, loading = false) {
  return myRequest.get<IResponseData<IList<IMyCommentItem>>>(
    {
      url: `/comment_list/me`,
      params: payload,
    },
    loading
  );
}

// 删除自己的评论
function deleteMyComment(commentId: number, loading = false) {
  return myRequest.post<IResponseData>(
    {
      url: `/comment/delete/${commentId}`,
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

export {
  getCommentListByAdmin,
  deleteCommentByAdmin,
  getCurrentCodeCommentList,
  getChildCodeCommentList,
  getMyCommentList,
  deleteMyComment,
  addComment,
  likeComment,
  deleteComment,
};
