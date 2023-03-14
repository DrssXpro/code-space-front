import type { IMenuItem, IMenuPayload } from "@/types/menuType";
import type { IResponseData, IList } from "@/types/responseType";
import { myRequest } from "../";

// 获取菜单所有权限列表
function getMenuList() {
  return myRequest.get<IResponseData<IList<IMenuItem>>>({
    url: "/menu/list",
  });
}

// 空间主：获取菜单权限列表
function getMenuListBySpace() {
  return myRequest.get<IResponseData<IMenuItem[]>>({
    url: "/menu/space_list",
  });
}

// 添加菜单
function addMenu(payload: IMenuPayload) {
  return myRequest.post<IResponseData>({
    url: "/menu/add",
    data: payload,
  });
}

// 修改菜单
function updateMenu(id: number, payload: IMenuPayload) {
  return myRequest.post<IResponseData>({
    url: `/menu/update/${id}`,
    data: payload,
  });
}

// 删除菜单
function deleteMenu(id: number) {
  return myRequest.post<IResponseData>({
    url: `/menu/delete/${id}`,
  });
}

export { getMenuList, getMenuListBySpace, addMenu, updateMenu, deleteMenu };
