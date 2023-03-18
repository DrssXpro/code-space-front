type TLanguage = "JavaScript" | "Java" | "Python" | "PHP" | "CSS" | "cpp" | "Vue";
export interface ISquareCodePayload {
  title: string;
  lan: TLanguage;
  content: string;
  isPwd: boolean;
  pwd: string;
  taskId?: number;
  status: 0 | 1;
}

// 广场代码列表项
export interface ISquareCodeItem {
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
  commentCount: number;
  collectCount: number;
  link: string;
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

// 部分代码信息
export type CodePart = Pick<ICodeDetail, "id" | "title" | "isPwd" | "user" | "createdAt" | "updatedAt">;
