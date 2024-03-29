import type { IList, IResponseData } from "@/types/responseType";
import type { ITaskItem, ITaskPayload } from "@/types/taskType";
import { myRequest } from "..";

// 获取任务列表
function getTaskList(payload: { limit: number; offset: number; spaceId: number; kw: string }, loading = false) {
  return myRequest.get<IResponseData<IList<ITaskItem>>>(
    {
      url: "/task/list",
      params: payload,
    },
    loading
  );
}

// 获取一条最新的任务
function getNewTask(loading = false) {
  return myRequest.get<IResponseData<ITaskItem[]>>({
    url: "/task/new",
  });
}

// 添加任务列表
function addTask(payload: ITaskPayload, loading = false) {
  return myRequest.post<IResponseData>(
    {
      url: "/task/add",
      data: payload,
      params: { perm: "space:task:add" },
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
      params: { perm: "space:task:edit" },
    },
    loading
  );
}

// 删除任务
function deleteTask(id: number, loading = false) {
  return myRequest.post<IResponseData>(
    {
      url: `/task/delete/${id}`,
      params: { perm: "space:task:delete" },
    },
    loading
  );
}

export { getTaskList, addTask, updateTask, deleteTask, getNewTask };
