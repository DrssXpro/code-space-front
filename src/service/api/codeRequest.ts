import type { CodePart, ICodeDetail, ISquareCodeItem, ISquareCodePayload } from "@/types/codeType";
import type { ICommentItem } from "@/types/commentType";
import type { IList, IResponseData } from "@/types/responseType";
import { myRequest } from "..";

// 广场分享代码
function addCodeBySquare(payload: ISquareCodePayload) {
  return myRequest.post<IResponseData>({
    url: "/square_code/add",
    data: payload,
  });
}

// 获取广场代码列表
function getCodeListBySquare(payload: { limit: number; offset: number }) {
  return myRequest.get<IResponseData<IList<ISquareCodeItem>>>({
    url: "/square_code/list",
    params: payload,
  });
}

// 获取指定代码详情
function getCurrentCode(codeId: string) {
  return myRequest.get<IResponseData<ICodeDetail>>({
    url: `/code/detail/${codeId}`,
  });
}

// 获取指定代码评论
function getCurrentCodeComment(codeId: string, payload: { limit: number; offset: number }) {
  return myRequest.get<IResponseData<IList<ICommentItem>>>({
    url: `/code/comment/${codeId}`,
    params: payload,
  });
}

// 广场代码增加点赞量
function likeCodeBySquare(codeId: string) {
  return myRequest.post<IResponseData>({
    url: `/square_code/like/${codeId}`,
  });
}

// 广场代码增加浏览量
function viewCodeBySquare(codeId: string) {
  return myRequest.post<IResponseData>({
    url: `/square_code/view/${codeId}`,
  });
}

// 空间代码增加点赞量
function likeCodeBySpace(codeId: string) {
  return myRequest.post<IResponseData>({
    url: `/space_code/like/${codeId}`,
  });
}

// 空间代码增加浏览量
function viewCodeBySpace(codeId: string) {
  return myRequest.post<IResponseData>({
    url: `/space_code/view/${codeId}`,
  });
}

// 判断代码是否加密
function judgetCodeIsencrypt(codeId: string) {
  return myRequest.get<IResponseData>({
    url: `/code/encrypt/${codeId}`,
  });
}

// 获取代码判断输入的密码是否正确
function judgetCodeEncryptPwd(codeId: string, payload: { pwd: string }) {
  return myRequest.post<IResponseData>({
    url: `/code/encrypt_judge/${codeId}`,
    data: payload,
  });
}

// 获取加密代码部分信息：输入密码界面使用
function getEncryptCodeInfo(codeId: string) {
  return myRequest.get<IResponseData<CodePart>>({
    url: `/part_code/${codeId}`,
  });
}

// 通过密码获取代码
function getEnctryCodeDetail(codeId: string, payload: { pwd: string }) {
  return myRequest.post<IResponseData<ICodeDetail>>({
    url: `/encrypt_code/${codeId}`,
    data: payload,
  });
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
