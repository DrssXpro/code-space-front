export interface ITaskPayload {
  name: string;
  introduce: string;
  extime: string;
}

export interface ITaskItem {
  id: number;
  spaceId: number;
  name: string;
  introduce: string;
  extime: string;
  status: number;
  createdAt: string;
  updatedAt: string;
}
