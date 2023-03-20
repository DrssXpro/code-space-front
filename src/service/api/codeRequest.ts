import type {
  CodePart,
  ICodeDetail,
  IMyCodeItem,
  ISpaceCodeDetail,
  ISpaceCodePayload,
  ISpaceCodeUpdatePayload,
  ISpaceMasterCodeItem,
  ISquareCodeItem,
  ISquareCodePayload,
  TLanguage,
} from "@/types/codeType";
import type { IList, IResponseData } from "@/types/responseType";
import { myRequest } from "..";

// 广场分享代码
function addCodeBySquare(payload: ISquareCodePayload, loading = false) {
  return myRequest.post<IResponseData>(
    {
      url: "/square_code/add",
      data: payload,
    },
    loading
  );
}

// 空间内分享代码
function addCodeBySpace(payload: ISpaceCodePayload, loading = false) {
  return myRequest.post<IResponseData>(
    {
      url: "/space_code/add",
      data: payload,
    },
    loading
  );
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

// 空间主：获取空间代码列表
function getCodeListBySpaceMaster(
  payload: { limit: number; offset: number; kw: string; lan: string; task: number | string },
  loading = false
) {
  return myRequest.get<IResponseData<IList<ISpaceMasterCodeItem>>>(
    {
      url: "/space_master/code/list",
      params: payload,
    },
    loading
  );
}

// 获取我的代码列表
function getMyCodeList(payload: { limit: number; offset: number; kw: string; lan: string }, loading = false) {
  return myRequest.get<IResponseData<IList<IMyCodeItem>>>(
    {
      url: "/own_code/list",
      params: payload,
    },
    loading
  );
}

// 删除我的代码
function deleteMyCode(codeId: string, loading = false) {
  return myRequest.post<IResponseData>(
    {
      url: `/own_code/delete/${codeId}`,
    },
    loading
  );
}

// 空间主：删除代码
function deleteSpaceCode(codeId: string, loading = false) {
  return myRequest.post<IResponseData>(
    {
      url: `/space_code/delete/${codeId}`,
    },
    loading
  );
}

// 空间主：更新代码
function updateSpaceCode(codeId: string, payload: ISpaceCodeUpdatePayload, loading = false) {
  return myRequest.post<IResponseData>(
    {
      url: `/space_code/update/${codeId}`,
      data: payload,
    },
    loading
  );
}

// 更新的我代码
function updateMyCode(codeId: string, payload: ISquareCodePayload, loading = false) {
  return myRequest.post<IResponseData>(
    {
      url: `/own_code/update/${codeId}`,
      data: payload,
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

// 获取指定空间代码详情
function getSpaceCurrentCode(codeId: string, loading = false) {
  return myRequest.get<IResponseData<ISpaceCodeDetail>>(
    {
      url: `/space_code/detail/${codeId}`,
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

// 收藏 / 取消收藏代码
function collectCode(codeId: string, loading = false) {
  return myRequest.post<IResponseData>(
    {
      url: `/code/collect/${codeId}`,
    },

    loading
  );
}

// 获取个人收藏代码
function getCollectList(payload: { limit: number; offset: number }, loading = false) {
  return myRequest.get<IResponseData<IList<ISquareCodeItem>>>(
    {
      url: "/code/collect/list",
      params: payload,
    },
    loading
  );
}

export {
  addCodeBySquare,
  addCodeBySpace,
  getCodeListBySquare,
  getCodeListBySpaceMaster,
  getCurrentCode,
  getSpaceCurrentCode,
  updateSpaceCode,
  getMyCodeList,
  updateMyCode,
  deleteMyCode,
  deleteSpaceCode,
  likeCodeBySquare,
  viewCodeBySquare,
  likeCodeBySpace,
  viewCodeBySpace,
  judgetCodeIsencrypt,
  judgetCodeEncryptPwd,
  getEncryptCodeInfo,
  getEnctryCodeDetail,
  collectCode,
  getCollectList,
};
