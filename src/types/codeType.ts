export type TLanguage = "JavaScript" | "Java" | "Python" | "PHP" | "CSS" | "cpp" | "Vue";
export interface ISquareCodePayload {
  title: string;
  lan: TLanguage;
  content: string;
  isPwd: boolean;
  pwd: string;
  taskId?: number | undefined;
  status: 0 | 1;
}

export interface ISpaceCodePayload {
  title: string;
  lan: TLanguage;
  content: string;
  taskId: number;
}

export interface ISpaceCodeUpdatePayload {
  title: string;
  lan: TLanguage;
  content: string;
  status: 1 | 2;
}

export interface IAdminCodePayload {
  title: string;
  content: string;
  lan: TLanguage;
  isPwd: boolean;
  pwd: string;
}

// 广场、搜索代码列表项
export interface ICodeItem {
  id: string;
  title: string;
  preview: string;
  lan: TLanguage;
  status: 0 | 1;
  isPwd: 0 | 1;
  views: number;
  liked: number;
  commentCount: number;
  collectCount: number;
  line: number;
  createdAt: string;
  updatedAt: string;
  user: {
    authorName: string;
    authorAvatar: string;
    authorId: string;
  };
}

// 广场最新 + 空间优秀 + 作者个人代码
export interface ISpecialCodeItem {
  id: string;
  title: string;
  preview: string;
  lan: TLanguage;
  liked: number;
  status: number;
  line: number;
  views: number;
  createdAt: string;
  updatedAt: string;
}

// 空间代码项
export interface ISpaceCodeItem extends ISpecialCodeItem {
  content: string;
  user: {
    nickName: string;
    authorAvatar: string;
    authorId: string;
  };
  task: {
    taskId: number;
    taskName: string;
  };
}

// 我的代码列表项
export interface IMyCodeItem {
  id: string;
  title: string;
  preview: string;
  content: string;
  lan: TLanguage;
  status: 0 | 1;
  isPwd: 0 | 1;
  views: number;
  liked: number;
  line: number;
  createdAt: string;
  updatedAt: string;
}

// 代码详情
export interface ICodeDetail {
  id: string;
  title: string;
  content: string;
  lan: TLanguage;
  line: number;
  status: 0 | 1;
  isPwd: 0 | 1;
  views: number;
  liked: number;
  collectCount: number;
  createdAt: string;
  updatedAt: string;

  user: {
    authorName: string;
    authorAvatar: string;
    authorId: string;
  };
}

// 空间代码详情
export interface ISpaceCodeDetail {
  id: string;
  title: string;
  content: string;
  lan: TLanguage;
  line: number;
  status: 1 | 2;
  views: number;
  liked: number;
  createdAt: string;
  updatedAt: string;
  user: {
    authorName: string;
    authorAvatar: string;
    authorId: string;
  };
  space: {
    spaceName: string;
    spaceId: number;
  };
}

// 空间管理代码项
export interface ISpaceMasterCodeItem {
  id: string;
  title: string;
  preview: string;
  content: string;
  lan: TLanguage;
  line: number;
  status: 1 | 2;
  createdAt: string;
  updatedAt: string;
  "user.authorName": string;
  "user.authorAvatar": string;
  "user.authorId": string;
  "task.taskId": number;
  "task.taskName": string;
}

// 管理员代码项
export interface IAdminCodeItem extends IMyCodeItem {
  "user.authorName": string;
  "user.authorAvatar": string;
  "user.authorId": string;
}

// 部分代码信息
export type CodePart = Pick<ICodeDetail, "id" | "title" | "isPwd" | "user" | "createdAt" | "updatedAt">;
