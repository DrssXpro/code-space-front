import type { IList, IResponseData } from "@/types/responseType";
import type { ISpacePayload, ISpaceDetail, ISpaceItem } from "@/types/spaceType";
import { myRequest } from "..";

// 添加空间
function addSpace(id: string, payload: ISpacePayload) {
  return myRequest.post<IResponseData>({
    url: `/space/add/${id}`,
    data: payload,
  });
}

// 更新空间信息
function updateSpace(spaceId: number, payload: ISpacePayload) {
  return myRequest.post<IResponseData>({
    url: `/space/update/${spaceId}`,
    data: payload,
  });
}

// 获取空间列表
function getSpaceList(payload: { limit: number; offset: number }) {
  return myRequest.get<IResponseData<IList<ISpaceItem>>>({
    url: "/space/list",
    params: payload,
  });
}

// 获取空间详情
function getSpaceDetail(spaceId: number) {
  return myRequest.get<IResponseData<ISpaceDetail>>({
    url: `/space/detail/${spaceId}`,
  });
}

// 删除空间：管理员删除
function deleteSpace(spaceId: number) {
  return myRequest.post<IResponseData>({
    url: `/space/delete/${spaceId}`,
  });
}

export { addSpace, updateSpace, getSpaceList, getSpaceDetail, deleteSpace };
