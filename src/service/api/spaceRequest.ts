import type { IResponseData } from "@/types/responseType";
import type { ISpacePayload, ISpaceDetail } from "@/types/spaceType";
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

// 获取空间详情
function getSpaceDetail(spaceId: number) {
  return myRequest.get<IResponseData<ISpaceDetail>>({
    url: `/space/detail/${spaceId}`,
  });
}

export { addSpace, updateSpace, getSpaceDetail };
