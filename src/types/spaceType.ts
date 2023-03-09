// 添加空间所需参数
export interface ISpacePayload {
  spacename: string;
  spaceintroduce: string;
  inviteCode: string;
  avatar?: string;
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
