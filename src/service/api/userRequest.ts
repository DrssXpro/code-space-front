import type { IResponseData } from "@/types/responseType";
import type { IUserAddByAdmin, IUserLoginInfo, IUserUpdateByAdmin } from "@/types/userType";
import { myRequest } from "../";

// 用户登录
function userLogin(payload: { username: string; password: string }) {
  return myRequest.post<IResponseData<IUserLoginInfo>>({
    url: "/user/login",
    data: payload,
  });
}

// 用户注册
function userRegister(payload: { username: string; password: string; email: string }) {
  return myRequest.post<IResponseData>({
    url: "/user/register",
    data: payload,
  });
}

// 获取指定用户信息
function getUserInfo(id: string) {
  return myRequest.get<IResponseData<IUserLoginInfo>>({
    url: `/user/info/${id}`,
  });
}

// 获取邮箱验证码
function getEmailCode(payload: { name: string; email: string }) {
  return myRequest.post<IResponseData>({
    url: "/email/sendCode",
    data: payload,
  });
}

// 验证验证码并修改密码
function verifyEmailCode(payload: { name: string; email: string; password: string; code: string }) {
  return myRequest.post<IResponseData>({
    url: "/email/verifyCode",
    data: payload,
  });
}

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

export {
  userLogin,
  userRegister,
  getUserInfo,
  getEmailCode,
  verifyEmailCode,
  getUserListByAdmin,
  addUserByAdmin,
  updateUserByAdmin,
  deleteUserByAdmin,
};
