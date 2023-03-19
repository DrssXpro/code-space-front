import { editSpaceUser, getSpaceUserList, inviteUser, kickUserOut } from "@/service/api/spaceRequest";
import type { ISpaceUserItem } from "@/types/userType";
import validator from "@/utils/validator";
import { ElMessage, ElMessageBox, type FormInstance, type FormRules } from "element-plus";
import { reactive, ref, type Ref } from "vue";

export default function useSpaceUser(formRef?: Ref<FormInstance | undefined>) {
  const { spaceUserValidator } = validator;
  // 编辑表单
  const userForm = reactive({
    nickName: "",
    roleId: 3,
  });

  // 邀请人员name
  const name = ref("");

  // 表单loading
  const formLoading = ref(false);
  // 表格
  const userState = reactive({
    userList: [] as ISpaceUserItem[],
    pageSize: 10,
    page: 1,
    total: 0,
    loading: false,
  });

  // 编辑用户规则
  const spaceUserRules: FormRules = {
    nickName: [{ validator: spaceUserValidator.nickName, trigger: "blur" }],
    roleId: [{ validator: spaceUserValidator.roleId, trigger: "blur" }],
  };

  // 获取空间用户列表
  async function getSpaceUserListData() {
    userState.loading = true;
    try {
      const res = await getSpaceUserList({ limit: userState.pageSize, offset: userState.page - 1 });
      userState.userList = res.data.rows;
      userState.total = res.data.count;
    } catch (error) {
      ElMessage.error("获取数据列表失败");
    }
    userState.loading = false;
  }

  // 踢出用户
  async function kickSpaceUser(userId: string, cb?: Function) {
    ElMessageBox.confirm(`确定要踢出id为 ${userId} 的这个用户吗？`, {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    }).then(async () => {
      const res = await kickUserOut(userId);
      res.code === 1000 ? ElMessage.success(res.message) : ElMessage.warning(res.message);
      res.code === 1000 && cb && cb();
    });
  }

  // 邀请用户
  async function inviteSpaceUser(cb?: Function) {
    formLoading.value = true;
    try {
      const res = await inviteUser({ name: name.value });
      res.code === 1000 ? ElMessage.success(res.message) : ElMessage.warning(res.message);
      res.code === 1000 && cb && cb();
    } catch (error) {
      ElMessage.error("邀请失败");
    }
    formLoading.value = false;
  }

  // 编辑用户
  function editSpaceUserData(userId: string, cb?: Function) {
    if (!formRef?.value) return;
    formRef.value.validate(async (valid) => {
      if (valid) {
        try {
          formLoading.value = true;
          const res = await editSpaceUser(userId, { ...userForm });
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

  return {
    name,
    userState,
    userForm,
    formLoading,
    spaceUserRules,
    getSpaceUserListData,
    kickSpaceUser,
    inviteSpaceUser,
    editSpaceUserData,
  };
}
