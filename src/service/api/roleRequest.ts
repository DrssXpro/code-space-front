import type { IMenuItem } from "@/types/menuType";
import type { IList, IResponseData } from "@/types/responseType";
import type { IRoleItem, IRoleFormPayload } from "@/types/roleType";
import { myRequest } from "../";

// 获取角色列表
function getRoleList(payload: { limit: number; offset: number }) {
  return myRequest.get<IResponseData<IList<IRoleItem>>>({
    url: "/role_list",
    params: payload,
  });
}

// 获取空间对应的角色列表
function getRoleListBySpace(payload: { limit: number; offset: number }) {
  return myRequest.get<IResponseData<IList<IRoleItem>>>({
    url: "/role_space_list",
    params: payload,
  });
}

// 获取角色列表菜单
function getRoleMenu(id: number) {
  return myRequest.get<IResponseData<IMenuItem[]>>({
    url: `/role_menu/${id}`,
  });
}

// 添加角色
function addRole(payload: IRoleFormPayload) {
  return myRequest.post<IResponseData>({
    url: "/role/add",
    data: payload,
  });
}

// 空间主：添加角色
function addRoleBySpace(payload: IRoleFormPayload) {
  return myRequest.post<IResponseData>({
    url: "/role_space/add",
    data: payload,
  });
}

// 更新角色
function updateRole(id: number, payload: IRoleFormPayload) {
  return myRequest.post<IResponseData>({
    url: `/role/update/${id}`,
    data: payload,
  });
}

// 更新角色状态
function updateRoleStatus(id: number, status: 0 | 1) {
  return myRequest.post<IResponseData>({
    url: `/role_status/update/${id}`,
    data: { status },
  });
}

// 删除对应角色
function deleteRole(id: number) {
  return myRequest.post<IResponseData>({
    url: `/role/delete/${id}`,
  });
}

export {
  getRoleList,
  getRoleListBySpace,
  addRole,
  addRoleBySpace,
  updateRole,
  updateRoleStatus,
  getRoleMenu,
  deleteRole,
};
