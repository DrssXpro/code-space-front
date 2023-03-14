import type { ICodeDetail, ISquareCodeItem, ISquareCodePayload } from "@/types/codeType";
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

export { addCodeBySquare, getCodeListBySquare, getCurrentCode, getCurrentCodeComment };
