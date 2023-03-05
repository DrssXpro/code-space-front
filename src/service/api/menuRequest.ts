import type { IMenuItem, IMenuAddPayload } from "@/types/menuType";
import type { IResponseData, IList } from "@/types/responseType";
import { myRequest } from "../";

// 获取菜单所有权限列表
function getMenuList() {
  return myRequest.get<IResponseData<IList<IMenuItem>>>({
    url: "/menu/list",
  });
}

// 添加菜单
function addMenu(payload: IMenuAddPayload) {
  return myRequest.post<IResponseData>({
    url: "/menu/add",
    data: payload,
  });
}

// 修改菜单
function updateMenu(id: number, payload: IMenuAddPayload) {
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

export { getMenuList, addMenu, updateMenu, deleteMenu };
