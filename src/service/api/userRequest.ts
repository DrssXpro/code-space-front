import type { IResponseData } from "@/types/responseType";
import type { IUserAddByAdmin, IUserUpdateByAdmin } from "@/types/userType";
import { myRequest } from "../";

// 管理员：获取用户列表
function getUserListByAdmin(payload: { limit: number; offset: number }) {
  return myRequest.get<IResponseData>({
    url: "/admin/user_list",
    params: payload,
  });
}

// 管理员：直接添加用户
function addUserByAdmin(payload: IUserAddByAdmin) {
  return myRequest.post<IResponseData>({
    url: "/admin/user/add",
    data: payload,
  });
}

// 管理员：修改用户
function updateUserByAdmin(id: string, payload: IUserUpdateByAdmin) {
  return myRequest.post<IResponseData>({
    url: `/admin/user/update/${id}`,
    data: payload,
  });
}

// 管理员：删除用户
function deleteUserByAdmin(id: string) {
  return myRequest.post<IResponseData>({
    url: `/admin/user/delete/${id}`,
  });
}

export { getUserListByAdmin, addUserByAdmin, updateUserByAdmin, deleteUserByAdmin };
