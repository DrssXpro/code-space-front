export interface IRoleItem {
  id: number;
  name: string;
  introduce: string;
  roleChar: string;
  status: number;
  isDelete: number;
  createdAt: string;
  updatedAt: string;
}

// 添加/编辑角色表单
export interface IRoleFormPayload {
  name: string;
  introduce: string;
  roleChar: string;
  status: 0 | 1;
  menuList: number[];
}
