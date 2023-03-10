import type { IList, IResponseData } from "@/types/responseType";
import type { ITaskItem, ITaskPayload } from "@/types/taskType";
import { myRequest } from "..";

// 获取任务列表
function getTaskList(payload: { limit: number; offset: number; spaceId: number }) {
  return myRequest.get<IResponseData<IList<ITaskItem>>>({
    url: "/task/list",
    params: payload,
  });
}

// 添加任务列表
function addTask(payload: ITaskPayload) {
  return myRequest.post<IResponseData>({
    url: "/task/add",
    data: payload,
  });
}

// 更新任务
function updateTask(id: number, payload: ITaskPayload) {
  return myRequest.post<IResponseData>({
    url: `/task/update/${id}`,
    data: payload,
  });
}

// 删除任务
function deleteTask(id: number) {
  return myRequest.post<IResponseData>({
    url: `/task/delete/${id}`,
  });
}

export { getTaskList, addTask, updateTask, deleteTask };
