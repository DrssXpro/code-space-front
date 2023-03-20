export interface ITaskPayload {
  name: string;
  introduce: string;
}

export interface ITaskItem {
  id: number;
  spaceId: number;
  name: string;
  introduce: string;
  status: number;
  createdAt: string;
  updatedAt: string;
}
