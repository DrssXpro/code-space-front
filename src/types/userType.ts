export interface IUserItem {
  id: string;
  name: string;
  email: string;
  avatar: string;
  status: 0 | 1;
  createdAt: string;
  updatedAt: string;
  role: {
    roleName: string;
    roleId: number;
  };
}

// 管理员添加用户参数
export interface IUserAddByAdmin {
  name: string;
  password: string;
  email: string;
  roleId: number;
  status: 0 | 1;
}

// 管理员修改用户参数
export interface IUserUpdateByAdmin {
  name: string;
  email: string;
  roleId: number;
  status: 0 | 1;
  isDefault: boolean; // 选择是否为默认头像
}
