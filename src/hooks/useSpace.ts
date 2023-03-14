import { ElMessage, ElMessageBox, type FormInstance, type FormRules } from "element-plus";
import validator from "@/utils/validator";
import { reactive, ref, type Ref } from "vue";
import { addSpace, deleteSpace, getSpaceList, updateSpace } from "@/service/api/spaceRequest";
import useUserStore from "@/stores/userStore";
import type { ISpaceItem } from "@/types/spaceType";

const { spaceValidator } = validator;
export default function useSpace(formRef?: Ref<FormInstance | undefined>) {
  const { userInfo } = useUserStore();
  const formState = reactive({
    // 空间名
    spacename: "",
    // 空间介绍
    spaceintroduce: "",

    // 邀请码
    inviteCode: "",

    // 是否使用默认头像
    isDefault: 1,

    // 空间头像地址（不使用默认头像）
    avatar: "",
  });
  // 生成空间头像
  const imageUrl = ref("");

  // 搜索关键词
  const searchState = ref({
    kw: "",
  });

  // admin：表格数据
  const tableState = reactive({
    tableData: [] as ISpaceItem[],
    loading: false,
    currentPage: 1,
    pageSize: 10,
    total: 0,
  });

  // 表单校验
  const spaceRules: FormRules = {
    spacename: [{ validator: spaceValidator.spacename, trigger: "blur" }],
    spaceintroduce: [{ validator: spaceValidator.spaceintroduce, trigger: "blur" }],
    inviteCode: [{ validator: spaceValidator.inviteCode, trigger: "blur" }],
  };

  // 提交空间表单：设置空间信息
  async function submitToSpace(isEdit: boolean, cb?: Function) {
    if (!formRef?.value) return;
    formRef?.value.validate(async (valid) => {
      if (valid) {
        if (!isEdit) {
          // 创建操作
          try {
            const userId = userInfo?.id;
            const res = await addSpace(userId!, {
              spaceintroduce: formState.spaceintroduce,
              spacename: formState.spacename,
              inviteCode: formState.inviteCode,
              avatar: formState.avatar.length ? formState.avatar : undefined,
            });
            res.code === 1000 ? ElMessage.success("设置成功") : ElMessage.warning(res.message);
            res.code === 1000 && cb && cb(); // 操作成功后执行回调
          } catch (err) {
            ElMessage.warning("设置失败");
          }
        } else {
          // 修改操作
          const spaceId = userInfo?.space?.spaceId as number;
          const res = await updateSpace(spaceId, {
            spaceintroduce: formState.spaceintroduce,
            spacename: formState.spacename,
            inviteCode: formState.inviteCode,
            avatar: formState.avatar.length ? formState.avatar : undefined,
          });
          res.code === 1000 ? ElMessage.success("修改成功") : ElMessage.warning(res.message);
          res.code === 1000 && cb && cb(); // 操作成功后执行回调
        }
      } else {
        ElMessage.warning("输入内容不符合规范");
      }
    });
  }

  // 随机生成六位邀请码
  function generateInviteCode() {
    const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let code = "";
    for (let i = 0; i < 6; i++) {
      let randomIndex = Math.floor(Math.random() * chars.length);
      code += chars[randomIndex];
    }
    formState.inviteCode = code;
  }

  // 获取空间列表数据
  async function getSpaceListByAdmin() {
    try {
      const res = await getSpaceList({ limit: tableState.pageSize, offset: tableState.currentPage - 1 });
      tableState.tableData = res.data.rows;
      tableState.total = res.data.count;
    } catch (error) {
      ElMessage.warning("获取列表数据失败");
    }
  }

  // 删除空间
  async function deleteSpaceByAdmin(spaceId: number, cb?: Function) {
    ElMessageBox.confirm(`确定要删除id为 ${spaceId} 的这个空间吗？`, {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    }).then(async () => {
      const res = await deleteSpace(spaceId);
      res.code === 1000 ? ElMessage.success(res.message) : ElMessage.warning(res.message);
      res.code === 1000 && cb && cb();
    });
  }

  return {
    formState,
    imageUrl,
    spaceRules,
    tableState,
    searchState,
    submitToSpace,
    generateInviteCode,
    getSpaceListByAdmin,
    deleteSpaceByAdmin,
  };
}
