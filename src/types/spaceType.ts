// 添加空间所需参数
export interface ISpacePayload {
  spacename: string;
  spaceintroduce: string;
  inviteCode: string;
  avatar?: string;
}

// 空间项
export interface ISpaceItem {
  id: number;
  name: string;
  introduce: string;
  avatar: string;
  createdAt: string;
  updatedAt: string;
  "user.authorId": string;
  "user.authorAvatar": string;
  "user.authorName": string;
}

// 获取到空间详情
export interface ISpaceDetail {
  spaceDetail: {
    id: number;
    name: string;
    avatar: string;
    introduce: string;
    inviteCode: string;
    createdAt: string;
    updatedAt: string;
    user: {
      authorAvatar: string;
      authorId: string;
      authorName: string;
    };
  };
  codeCount: number;
  taskCount: number;
  userCount: number;
}
