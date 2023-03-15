import type { IList, IResponseData } from "@/types/responseType";
import type { ITaskItem, ITaskPayload } from "@/types/taskType";
import { myRequest } from "..";

// 获取任务列表
function getTaskList(payload: { limit: number; offset: number; spaceId: number }, loading = false) {
  return myRequest.get<IResponseData<IList<ITaskItem>>>(
    {
      url: "/task/list",
      params: payload,
    },
    loading
  );
}

// 添加任务列表
function addTask(payload: ITaskPayload, loading = false) {
  return myRequest.post<IResponseData>(
    {
      url: "/task/add",
      data: payload,
    },
    loading
  );
}

// 更新任务
function updateTask(id: number, payload: ITaskPayload, loading = false) {
  return myRequest.post<IResponseData>(
    {
      url: `/task/update/${id}`,
      data: payload,
    },
    loading
  );
}

// 删除任务
function deleteTask(id: number, loading = false) {
  return myRequest.post<IResponseData>(
    {
      url: `/task/delete/${id}`,
    },
    loading
  );
}

export { getTaskList, addTask, updateTask, deleteTask };
