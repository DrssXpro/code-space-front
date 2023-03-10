import { reactive, ref, type Ref } from "vue";
import validator from "@/utils/validator";
import { ElMessage, ElMessageBox, type FormInstance, type FormRules } from "element-plus";
import { addTask, deleteTask, getTaskList, updateTask } from "@/service/api/taskRequest";
import type { ITaskItem } from "@/types/taskType";
export default function useTask(spaceId: number, formRef?: Ref<FormInstance | undefined>) {
  const { taskValidator } = validator; // modal验证规则
  // 表单数据
  const formState = reactive({
    // 任务名
    name: "",
    // 任务描述
    introduce: "",
    // 过期时间
    extime: "",
    // 表单loading
    loading: false,
  });

  // 搜索条件：自主封装的FsForm组件限制只能使用ref，不然无法触发v-model响应式更新
  const searchState = ref({
    kw: "",
    isEx: "",
  });

  // 搜索loading
  const searchLoading = ref(false);

  // 表格数据
  const tableState = reactive({
    tableData: [] as ITaskItem[],
    loading: false,
    currentPage: 1,
    pageSize: 10,
    total: 0,
  });

  const showModal = ref(false); // 控制dialog

  // 表单校验规则
  const formRules: FormRules = {
    name: [{ validator: taskValidator.name, trigger: "blur" }],
    introduce: [{ validator: taskValidator.introduce, trigger: "blur" }],
    extime: [{ validator: taskValidator.extime, trigger: "blur" }],
  };

  // 添加任务
  async function addTaskData(cb?: Function) {
    if (!formRef?.value) return;
    formRef.value.validate(async (valid) => {
      if (valid) {
        try {
          formState.loading = true;
          const res = await addTask({ name: formState.name, introduce: formState.introduce, extime: formState.extime });
          res.code === 1000 ? ElMessage.success("添加成功") : ElMessage.warning(res.message);
          res.code === 1000 && cb && cb();
        } catch (error) {
          ElMessage.warning("添加失败");
        }
        formState.loading = false;
      } else {
        ElMessage.warning("输入内容不符合规范");
      }
    });
  }

  // 更新任务
  async function updateTaskData(id: number, cb?: Function) {
    if (!formRef?.value) return;
    formRef.value.validate(async (valid) => {
      if (valid) {
        try {
          formState.loading = true;
          const res = await updateTask(id, {
            name: formState.name,
            introduce: formState.introduce,
            extime: formState.extime,
          });
          res.code === 1000 ? ElMessage.success("更新成功") : ElMessage.warning(res.message);
          res.code === 1000 && cb && cb();
        } catch (error) {
          ElMessage.warning("更新失败");
        }
        formState.loading = false;
      } else {
        ElMessage.warning("输入内容不符合规范");
      }
    });
  }

  // 删除任务
  async function deleteTaskData(id: number, cb?: Function) {
    ElMessageBox.confirm(`确定要删除id为 ${id} 的这个任务吗？`, {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    }).then(async () => {
      const res = await deleteTask(id);
      res.code === 1000 ? ElMessage.success(res.message) : ElMessage.warning(res.message);
      res.code === 1000 && cb && cb();
    });
  }

  // 获取任务列表
  async function getTaskListData() {
    tableState.loading = true;
    const res = await getTaskList({ spaceId, limit: tableState.pageSize, offset: tableState.currentPage - 1 });
    tableState.tableData = res.data.rows;
    tableState.total = res.data.count;
    tableState.loading = false;
  }

  return {
    showModal,
    formRules,
    searchState,
    formState,
    tableState,
    searchLoading,
    addTaskData,
    updateTaskData,
    getTaskListData,
    deleteTaskData,
  };
}
