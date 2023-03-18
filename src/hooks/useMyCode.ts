import { deleteMyCode, getMyCodeList, updateMyCode } from "@/service/api/codeRequest";
import type { IMyCodeItem, ISquareCodePayload } from "@/types/codeType";
import { ElMessage, ElMessageBox, type FormInstance } from "element-plus";
import { reactive, ref, type Ref } from "vue";

export default function useMyCode(formRef?: Ref<FormInstance | undefined>) {
  // 表单
  const codeForm: ISquareCodePayload = reactive({
    title: "",
    content: "",
    lan: "cpp",
    pwd: "",
    isPwd: false,
    status: 1,
  });

  const formLoading = ref(false);

  // 表格
  const codeState = reactive({
    codeList: [] as IMyCodeItem[],
    page: 1,
    pageSize: 10,
    total: 0,
    loading: false,
  });

  // 获取我的代码列表
  async function getMyCodeListData() {
    codeState.loading = true;
    try {
      const res = await getMyCodeList({ limit: codeState.pageSize, offset: codeState.page - 1 });
      codeState.codeList = res.data.rows;
      codeState.total = res.data.count;
    } catch (error) {
      ElMessage.warning("获取列表数据失败");
    }
    codeState.loading = false;
  }

  // 修改我的代码
  async function updateMyCodeData(codeId: string, cb?: Function) {
    if (!formRef?.value) return;
    formRef.value.validate(async (valid) => {
      if (valid) {
        try {
          formLoading.value = true;
          const res = await updateMyCode(codeId, { ...codeForm });
          res.code === 1000 ? ElMessage.success(res.message) : ElMessage.warning(res.message);
          res.code === 1000 && cb && cb();
        } catch (error) {
          ElMessage.warning("更新失败");
        }
        formLoading.value = false;
      } else {
        ElMessage.warning("输入内容不符合规范");
      }
    });
  }

  // 删除我的代码
  async function deleteMyCodeData(id: string, cb?: Function) {
    ElMessageBox.confirm(`确定要删除id为 ${id} 的这个代码片段吗？`, {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    }).then(async () => {
      const res = await deleteMyCode(id);
      res.code === 1000 ? ElMessage.success(res.message) : ElMessage.warning(res.message);
      res.code === 1000 && cb && cb();
    });
  }

  return {
    codeState,
    codeForm,
    formLoading,
    updateMyCodeData,
    getMyCodeListData,
    deleteMyCodeData,
  };
}
