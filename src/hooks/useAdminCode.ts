import { deleteCodeByAdmin, getCodeListByAdmin, updateAdminCode } from "@/service/api/codeRequest";
import type { IAdminCodeItem, IAdminCodePayload } from "@/types/codeType";
import validator from "@/utils/validator";
import { ElMessage, ElMessageBox, type FormInstance, type FormRules } from "element-plus";
import { reactive, ref, type Ref } from "vue";

export default function useAdminCode(formRef?: Ref<FormInstance | undefined>) {
  const { updateAdminCodeValidator } = validator;
  // 搜索条件
  const searchState = ref({
    kw: "",
    lan: "",
  });
  // 表单
  const codeForm: IAdminCodePayload = reactive({
    title: "",
    content: "",
    lan: "cpp",
    isPwd: false,
    pwd: "",
  });

  // 表单loading
  const formLoading = ref(false);

  // 表格数据
  const codeState = reactive({
    codeList: [] as IAdminCodeItem[],
    page: 1,
    pageSize: 10,
    total: 0,
    loading: false,
  });

  // 表单校验
  const codeRules: FormRules = {
    title: [{ validator: updateAdminCodeValidator.title, trigger: "blur" }],
    lan: [{ validator: updateAdminCodeValidator.lan, trigger: "blur" }],
    content: [{ validator: updateAdminCodeValidator.content, trigger: "blur" }],
    pwd: [{ validator: updateAdminCodeValidator.pwd, trigger: "blur" }],
  };

  // 更新代码信息
  function updateCodeByAdminData(codeId: string, cb?: Function) {
    if (!formRef?.value) return;
    formRef.value.validate(async (valid) => {
      if (valid) {
        formLoading.value = true;
        try {
          const res = await updateAdminCode(codeId, { ...codeForm });
          res.code === 1000 ? ElMessage.success(res.message) : ElMessage.warning(res.message);
          res.code === 1000 && cb && cb();
        } catch (error) {
          ElMessage.error("修改失败");
        }
        formLoading.value = false;
      } else {
        ElMessage.warning("输入内容不符合规范");
      }
    });
  }

  // 删除代码信息
  function deleteCodeByAdminData(codeId: string, cb?: Function) {
    ElMessageBox.confirm(`确定要删除id为 ${codeId} 的这个代码片段吗？`, {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    }).then(async () => {
      const res = await deleteCodeByAdmin(codeId);
      res.code === 1000 ? ElMessage.success(res.message) : ElMessage.warning(res.message);
      res.code === 1000 && cb && cb();
    });
  }

  // 获取代码列表数据
  async function getCodeListByAdminData() {
    try {
      codeState.loading = true;
      const res = await getCodeListByAdmin({
        limit: codeState.pageSize,
        offset: (codeState.page - 1) * codeState.page,
        kw: searchState.value.kw,
        lan: searchState.value.lan,
      });
      codeState.codeList = res.code === 1000 ? res.data.rows : [];
      codeState.total = res.code === 1000 ? res.data.count : 0;
      res.code !== 1000 && ElMessage.warning(res.message);
    } catch (error) {
      ElMessage.error("获取数据列表失败");
    }
    codeState.loading = false;
  }

  return {
    searchState,
    codeForm,
    codeRules,
    formLoading,
    codeState,
    getCodeListByAdminData,
    updateCodeByAdminData,
    deleteCodeByAdminData,
  };
}
