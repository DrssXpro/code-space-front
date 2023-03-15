import type { CodePart, ICodeDetail, ISquareCodeItem, ISquareCodePayload } from "@/types/codeType";
import type { ICommentItem } from "@/types/commentType";
import type { IList, IResponseData } from "@/types/responseType";
import { myRequest } from "..";

// 广场分享代码
function addCodeBySquare(payload: ISquareCodePayload, loading = false) {
  return myRequest.post<IResponseData>({
    url: "/square_code/add",
    data: payload,
  });
}

// 获取广场代码列表
function getCodeListBySquare(payload: { limit: number; offset: number }, loading = false) {
  return myRequest.get<IResponseData<IList<ISquareCodeItem>>>(
    {
      url: "/square_code/list",
      params: payload,
    },
    loading
  );
}

// 获取指定代码详情
function getCurrentCode(codeId: string, loading = false) {
  return myRequest.get<IResponseData<ICodeDetail>>(
    {
      url: `/code/detail/${codeId}`,
    },
    loading
  );
}

// 获取指定代码评论
function getCurrentCodeComment(codeId: string, payload: { limit: number; offset: number }, loading = false) {
  return myRequest.get<IResponseData<IList<ICommentItem>>>(
    {
      url: `/code/comment/${codeId}`,
      params: payload,
    },
    loading
  );
}

// 广场代码增加点赞量
function likeCodeBySquare(codeId: string, loading = false) {
  return myRequest.post<IResponseData>(
    {
      url: `/square_code/like/${codeId}`,
    },
    loading
  );
}

// 广场代码增加浏览量
function viewCodeBySquare(codeId: string, loading = false) {
  return myRequest.post<IResponseData>(
    {
      url: `/square_code/view/${codeId}`,
    },
    loading
  );
}

// 空间代码增加点赞量
function likeCodeBySpace(codeId: string, loading = false) {
  return myRequest.post<IResponseData>(
    {
      url: `/space_code/like/${codeId}`,
    },
    loading
  );
}

// 空间代码增加浏览量
function viewCodeBySpace(codeId: string, loading = false) {
  return myRequest.post<IResponseData>(
    {
      url: `/space_code/view/${codeId}`,
    },
    loading
  );
}

// 判断代码是否加密
function judgetCodeIsencrypt(codeId: string, loading = false) {
  return myRequest.get<IResponseData>(
    {
      url: `/code/encrypt/${codeId}`,
    },
    loading
  );
}

// 获取代码判断输入的密码是否正确
function judgetCodeEncryptPwd(codeId: string, payload: { pwd: string }, loading = false) {
  return myRequest.post<IResponseData>(
    {
      url: `/code/encrypt_judge/${codeId}`,
      data: payload,
    },
    loading
  );
}

// 获取加密代码部分信息：输入密码界面使用
function getEncryptCodeInfo(codeId: string, loading = false) {
  return myRequest.get<IResponseData<CodePart>>(
    {
      url: `/part_code/${codeId}`,
    },
    loading
  );
}

// 通过密码获取代码
function getEnctryCodeDetail(codeId: string, payload: { pwd: string }, loading = false) {
  return myRequest.post<IResponseData<ICodeDetail>>(
    {
      url: `/encrypt_code/${codeId}`,
      data: payload,
    },
    loading
  );
}

export {
  addCodeBySquare,
  getCodeListBySquare,
  getCurrentCode,
  getCurrentCodeComment,
  likeCodeBySquare,
  viewCodeBySquare,
  likeCodeBySpace,
  viewCodeBySpace,
  judgetCodeIsencrypt,
  judgetCodeEncryptPwd,
  getEncryptCodeInfo,
  getEnctryCodeDetail,
};
