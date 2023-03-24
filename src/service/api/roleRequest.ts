import type { IMenuItem } from "@/types/menuType";
import type { IList, IResponseData } from "@/types/responseType";
import type { IRoleItem, IRoleFormPayload } from "@/types/roleType";
import { myRequest } from "../";

// 获取角色列表
function getRoleList(payload: { limit: number; offset: number; kw: string; status: 0 | 1 }, loading = false) {
  return myRequest.get<IResponseData<IList<IRoleItem>>>(
    {
      url: "/admin/role_list",
      params: payload,
    },
    loading
  );
}

// 获取空间对应的角色列表
function getRoleListBySpace(payload: { limit: number; offset: number; kw: string; status: number }, loading = false) {
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
      url: "/space_role/add",
      data: payload,
      params: { perm: "space:role:add" },
    },
    loading
  );
}

// 空间主：更新角色
function updateRoleInSpace(id: number, payload: IRoleFormPayload, loading = false) {
  return myRequest.post<IResponseData>(
    {
      url: `/space_role/update/${id}`,
      data: payload,
      params: { perm: "space:role:edit" },
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
      params: { perm: "power:role:edit" },
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
      params: { perm: "power:role:edit" },
    },
    loading
  );
}

// 删除对应角色
function deleteRole(id: number, loading = false) {
  return myRequest.post<IResponseData>(
    {
      url: `/role/delete/${id}`,
      params: { perm: "power:role:delete" },
    },
    loading
  );
}
// 空间主：删除对应角色
function deleteRoleInSpace(id: number, loading = false) {
  return myRequest.post<IResponseData>(
    {
      url: `/space_role/delete/${id}`,
      params: { perm: "space:role:delete" },
    },
    loading
  );
}

export {
  getRoleList,
  getRoleListBySpace,
  addRole,
  addRoleBySpace,
  updateRoleInSpace,
  updateRole,
  updateRoleStatus,
  getRoleMenu,
  deleteRole,
  deleteRoleInSpace,
};
