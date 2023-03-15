import type { IMenuItem, IMenuPayload } from "@/types/menuType";
import type { IResponseData, IList } from "@/types/responseType";
import { myRequest } from "../";

// 获取菜单所有权限列表
function getMenuList(loading = false) {
  return myRequest.get<IResponseData<IList<IMenuItem>>>(
    {
      url: "/menu/list",
    },
    loading
  );
}

// 空间主：获取菜单权限列表
function getMenuListBySpace(loading = false) {
  return myRequest.get<IResponseData<IMenuItem[]>>(
    {
      url: "/menu/space_list",
    },
    loading
  );
}

// 添加菜单
function addMenu(payload: IMenuPayload, loading = false) {
  return myRequest.post<IResponseData>(
    {
      url: "/menu/add",
      data: payload,
    },
    loading
  );
}

// 修改菜单
function updateMenu(id: number, payload: IMenuPayload, loading = false) {
  return myRequest.post<IResponseData>(
    {
      url: `/menu/update/${id}`,
      data: payload,
    },
    loading
  );
}

// 删除菜单
function deleteMenu(id: number, loading = false) {
  return myRequest.post<IResponseData>(
    {
      url: `/menu/delete/${id}`,
    },
    loading
  );
}

export { getMenuList, getMenuListBySpace, addMenu, updateMenu, deleteMenu };
