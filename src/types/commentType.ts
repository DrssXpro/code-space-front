// 评论列表项
export interface ICommentItem {
  id: number;
  content: string;
  commentId: number | null;
  userId: string;
  codeId: string;
  like: number;
  createdAt: string;
  updatedAt: string;
  children?: ICommentItem[];
}
