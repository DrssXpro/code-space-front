export interface IMenuItem {
  id: number;
  name: string;
  parentId: null | number;
  menuIcon: string;
  orderNum: number;
  routePath: null | string;
  comPath: null | string;
  menuType: "D" | "M" | "B";
  perms: null | string;
  status: number;
  createdAt: string;
  updatedAt: string;
  // 补充字段
  children?: IMenuItem[];
}

// 添加菜单参数
export interface IMenuPayload {
  name: string;
  menuIcon: string;
  routePath: string;
  comPath: string;
  menuType: "M" | "D" | "B";
  status: 0 | 1;
  parentId: number;
  perms: string;
  orderNum: number;
}
