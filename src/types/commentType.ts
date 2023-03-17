// 评论列表项
export interface ICommentItem {
  id: number;
  content: string;
  commentId: number | null;
  rootId: number | null;
  userId: string;
  codeId: string;
  like: number;
  createdAt: string;
  updatedAt: string;
  childCount?: number;
  user: {
    authorAvatar: string;
    authorName: string;
  };
  replay?: {
    replayAvatar: string;
    replayName: string;
  };
  children?: ICommentItem[];
}

// 评论参数
export interface ICommentPayload {
  content: string;
  rootId?: number;
  commentId?: number;
}
