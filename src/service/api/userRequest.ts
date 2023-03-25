import type { IList, IResponseData } from "@/types/responseType";
import type { IUserAddByAdmin, IUserItem, IUserLoginInfo, IUserUpdateByAdmin } from "@/types/userType";
import { myRequest } from "../";

// 用户登录
function userLogin(payload: { username: string; password: string }, loading = false) {
  return myRequest.post<IResponseData<IUserLoginInfo>>(
    {
      url: "/user/login",
      data: payload,
    },
    loading
  );
}

// 用户注册
function userRegister(payload: { username: string; password: string; email: string }, loading = false) {
  return myRequest.post<IResponseData>(
    {
      url: "/user/register",
      data: payload,
    },
    loading
  );
}

// 用户上传头像
function userUploadAvatar(fd: FormData) {
  return myRequest.uploadFilePost<IResponseData<string>>({
    url: "/user/upload",
    data: fd,
  });
}

// 用户更新自己的信息
function updateUserInfoByMe(
  userId: string,
  payload: { name: string; email: string; nickName: string; avatar: string; isDefault: boolean },
  loading = false
) {
  return myRequest.post<IResponseData>(
    {
      url: `/user/update/${userId}`,
      data: payload,
    },
    loading
  );
}

// 手动退出空间
function exitSpaceByOwn(loading = false) {
  return myRequest.post<IResponseData>(
    {
      url: "/space/exit",
    },
    loading
  );
}

// 获取指定用户信息
function getUserInfo(id: string, loading = false) {
  return myRequest.get<IResponseData<{ userInfo: IUserLoginInfo; token: string }>>(
    {
      url: `/user/info/${id}`,
    },
    loading
  );
}

// 获取邮箱验证码
function getEmailCode(payload: { name: string; email: string }, loading = false) {
  return myRequest.post<IResponseData>(
    {
      url: "/email/sendCode",
      data: payload,
    },
    loading
  );
}

// 验证验证码并修改密码
function verifyEmailCode(payload: { name: string; email: string; password: string; code: string }, loading = false) {
  return myRequest.post<IResponseData>(
    {
      url: "/email/verifyCode",
      data: payload,
    },
    loading
  );
}

// 管理员：获取用户列表
function getUserListByAdmin(payload: { limit: number; offset: number; kw: string; email: string }, loading = false) {
  return myRequest.get<IResponseData<IList<IUserItem>>>(
    {
      url: "/admin/user_list",
      params: payload,
    },
    loading
  );
}

// 管理员：直接添加用户
function addUserByAdmin(payload: IUserAddByAdmin, loading = false) {
  return myRequest.post<IResponseData>(
    {
      url: "/admin/user/add",
      data: payload,
      params: { perm: "content:user:add" },
    },
    loading
  );
}

// 管理员：修改用户
function updateUserByAdmin(id: string, payload: IUserUpdateByAdmin, loading = false) {
  return myRequest.post<IResponseData>(
    {
      url: `/admin/user/update/${id}`,
      data: payload,
      params: { perm: "content:user:edit" },
    },
    loading
  );
}

// 管理员：删除用户
function deleteUserByAdmin(id: string, loading = false) {
  return myRequest.post<IResponseData>(
    {
      url: `/admin/user/delete/${id}`,
      params: { perm: "content:user:delete" },
    },
    loading
  );
}

export {
  userLogin,
  userRegister,
  userUploadAvatar,
  getUserInfo,
  getEmailCode,
  verifyEmailCode,
  getUserListByAdmin,
  addUserByAdmin,
  updateUserByAdmin,
  deleteUserByAdmin,
  updateUserInfoByMe,
  exitSpaceByOwn,
};
