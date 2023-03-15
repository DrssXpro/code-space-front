import type { IMenuItem } from "@/types/menuType";
import type { IList, IResponseData } from "@/types/responseType";
import type { IRoleItem, IRoleFormPayload } from "@/types/roleType";
import { myRequest } from "../";

// 获取角色列表
function getRoleList(payload: { limit: number; offset: number }, loading = false) {
  return myRequest.get<IResponseData<IList<IRoleItem>>>(
    {
      url: "/role_list",
      params: payload,
    },
    loading
  );
}

// 获取空间对应的角色列表
function getRoleListBySpace(payload: { limit: number; offset: number }, loading = false) {
  return myRequest.get<IResponseData<IList<IRoleItem>>>(
    {
      url: "/role_space_list",
      params: payload,
    },
    loading
  );
}

// 获取角色列表菜单
function getRoleMenu(id: number, loading = false) {
  return myRequest.get<IResponseData<IMenuItem[]>>(
    {
      url: `/role_menu/${id}`,
    },
    loading
  );
}

// 添加角色
function addRole(payload: IRoleFormPayload, loading = false) {
  return myRequest.post<IResponseData>(
    {
      url: "/role/add",
      data: payload,
    },
    loading
  );
}

// 空间主：添加角色
function addRoleBySpace(payload: IRoleFormPayload, loading = false) {
  return myRequest.post<IResponseData>(
    {
      url: "/role_space/add",
      data: payload,
    },
    loading
  );
}

// 更新角色
function updateRole(id: number, payload: IRoleFormPayload, loading = false) {
  return myRequest.post<IResponseData>(
    {
      url: `/role/update/${id}`,
      data: payload,
    },
    loading
  );
}

// 更新角色状态
function updateRoleStatus(id: number, status: 0 | 1, loading = false) {
  return myRequest.post<IResponseData>(
    {
      url: `/role_status/update/${id}`,
      data: { status },
    },
    loading
  );
}

// 删除对应角色
function deleteRole(id: number, loading = false) {
  return myRequest.post<IResponseData>(
    {
      url: `/role/delete/${id}`,
    },
    loading
  );
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
