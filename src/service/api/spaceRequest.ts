import type { IList, IResponseData } from "@/types/responseType";
import type { ISpacePayload, ISpaceDetail, ISpaceItem } from "@/types/spaceType";
import type { ISpaceUserItem } from "@/types/userType";
import { myRequest } from "..";

// 添加空间
function addSpace(id: string, payload: ISpacePayload, loading = false) {
  return myRequest.post<IResponseData>(
    {
      url: `/space/add/${id}`,
      data: payload,
    },
    loading
  );
}

// 更新空间信息
function updateSpace(spaceId: number, payload: ISpacePayload, loading = false) {
  return myRequest.post<IResponseData>(
    {
      url: `/space/update/${spaceId}`,
      data: payload,
    },
    loading
  );
}

// 获取空间列表
function getSpaceList(payload: { limit: number; offset: number }, loading = false) {
  return myRequest.get<IResponseData<IList<ISpaceItem>>>(
    {
      url: "/space/list",
      params: payload,
    },
    loading
  );
}

// 获取空间用户列表
function getSpaceUserList(payload: { limit: number; offset: number }, loading = false) {
  return myRequest.get<IResponseData<IList<ISpaceUserItem>>>(
    {
      url: "/space/user/list",
      params: payload,
    },
    loading
  );
}

// 获取空间详情
function getSpaceDetail(spaceId: number, loading = false) {
  return myRequest.get<IResponseData<ISpaceDetail>>(
    {
      url: `/space/detail/${spaceId}`,
    },
    loading
  );
}

// 删除空间：管理员删除
function deleteSpace(spaceId: number, loading = false) {
  return myRequest.post<IResponseData>(
    {
      url: `/space/delete/${spaceId}`,
    },
    loading
  );
}

// 判断用户加入空间邀请码
function joinSpaceByInviteCode(spaceId: number, inviteCode: string, loading = false) {
  return myRequest.post<IResponseData>(
    {
      url: `/space/invite_code/${spaceId}`,
      data: { inviteCode },
    },
    loading
  );
}

export { addSpace, updateSpace, getSpaceList, getSpaceUserList, getSpaceDetail, deleteSpace, joinSpaceByInviteCode };
