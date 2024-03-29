import { deleteSpaceCode, getCodeListBySpaceMaster, updateSpaceCode } from "@/service/api/codeRequest";
import type { ISpaceCodeUpdatePayload, ISpaceMasterCodeItem } from "@/types/codeType";
import validator from "@/utils/validator";
import { ElMessage, ElMessageBox, type FormInstance, type FormRules } from "element-plus";
import { reactive, ref, type Ref } from "vue";

export default function useSpaceCode(formRef?: Ref<FormInstance | undefined>) {
  const { spaceCodeValidator } = validator;

  // 条件搜索
  const searchState = ref({
    kw: "",
    lan: "",
    taskId: "",
  });

  // 代码表单
  const codeForm: ISpaceCodeUpdatePayload = reactive({
    title: "",
    content: "",
    status: 1,
    lan: "JavaScript",
  });

  // 表单loading
  const formLoading = ref(false);

  // 表格
  const codeState = reactive({
    codeList: [] as ISpaceMasterCodeItem[],
    page: 1,
    pageSize: 10,
    total: 0,
    loading: false,
  });

  // 代码规则
  const codeRules: FormRules = {
    title: [{ validator: spaceCodeValidator.title, trigger: "blur" }],
    content: [{ validator: spaceCodeValidator.content, trigger: "blur" }],
    lan: [{ validator: spaceCodeValidator.lan, trigger: "blur" }],
  };

  // 获取列表内容
  async function getSpaceListData() {
    try {
      codeState.loading = true;
      const res = await getCodeListBySpaceMaster({
        limit: codeState.pageSize,
        offset: (codeState.page - 1) * codeState.pageSize,
        kw: searchState.value.kw,
        lan: searchState.value.lan,
        task: searchState.value.taskId,
      });
      codeState.codeList = res.code === 1000 ? res.data.rows : [];
      codeState.total = res.code === 1000 ? res.data.count : 0;
      res.code !== 1000 && ElMessage.warning(res.message);
    } catch (error) {
      ElMessage.error("获取数据列表失败");
    }
    codeState.loading = false;
  }

  // 更新空间代码
  function updateSpaceCodeData(codeId: string, cb?: Function) {
    if (!formRef?.value) return;
    formRef.value.validate(async (valid) => {
      if (valid) {
        formLoading.value = true;
        try {
          const res = await updateSpaceCode(codeId,  { ...codeForm });
          res.code === 1000 ? ElMessage.success(res.message) : ElMessage.warning(res.message);
          res.code === 1000 && cb && cb();
        } catch (error) {
          ElMessage.error("更新失败");
        }
        formLoading.value = false;
      } else {
        ElMessage.warning("输入内容不符合规范");
      }
    });
  }

  // 删除指定代码
  async function deleteSpaceCodeData(codeId: string, cb?: Function) {
    ElMessageBox.confirm(`确定要删除id为 ${codeId} 的这个代码吗？`, {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    }).then(async () => {
      const res = await deleteSpaceCode(codeId);
      res.code === 1000 ? ElMessage.success(res.message) : ElMessage.warning(res.message);
      res.code === 1000 && cb && cb();
    });
  }
  return {
    searchState,
    codeForm,
    codeState,
    formLoading,
    codeRules,
    getSpaceListData,
    updateSpaceCodeData,
    deleteSpaceCodeData,
  };
}
