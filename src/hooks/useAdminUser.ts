import {
  addUserByAdmin,
  deleteUserByAdmin,
  getUserListByAdmin,
  updateUserByAdmin,
  userUploadAvatar,
} from "@/service/api/userRequest";
import type { IUserItem } from "@/types/userType";
import validator from "@/utils/validator";
import { ElMessage, ElMessageBox, type FormInstance, type FormRules } from "element-plus";
import { reactive, ref, type Ref } from "vue";

export default function useAdminUser(formRef?: Ref<FormInstance | undefined>) {
  const { updateAdminUserValidator } = validator;
  // 搜索条件
  const searchState = ref({
    kw: "",
    email: "",
  });

  // 表单内容
  const userForm = reactive({
    name: "",
    email: "",
    password: "",
    roleId: 1,
    status: 1,
    avatar: "",
    isDefault: false, // 是否使用默认头像
  });

  const formLoading = ref(false);

  // 表格
  const userState = reactive({
    userList: [] as IUserItem[],
    page: 1,
    pageSize: 10,
    total: 0,
    loading: false,
  });

  // 表单校验
  const userRules: FormRules = {
    name: [{ validator: updateAdminUserValidator.name, trigger: "blur" }],
    email: [{ validator: updateAdminUserValidator.email, trigger: "blur" }],
    password: [{ validator: updateAdminUserValidator.password, trigger: "blur" }],
    roleId: [{ validator: updateAdminUserValidator.roleId, trigger: "blur" }],
  };

  // 添加新用户
  function addNewUserByAdminData(cb?: Function) {
    if (!formRef?.value) return;
    formRef.value.validate(async (valid) => {
      if (valid) {
        formLoading.value = true;
        try {
          const res = await addUserByAdmin({
            name: userForm.name,
            email: userForm.email,
            roleId: userForm.roleId,
            password: userForm.password,
            status: userForm.status as 0 | 1,
          });
          res.code === 1000 ? ElMessage.success(res.message) : ElMessage.warning(res.message);
          res.code === 1000 && cb && cb();
        } catch (error) {
          ElMessage.error("添加失败");
        }
        formLoading.value = false;
      } else {
        ElMessage.warning("输入内容不符合规范");
      }
    });
  }

  // 修改用户
  function updateUserByAdminData(userId: string, file?: File, cb?: Function) {
    if (!formRef?.value) return;
    formRef.value.validate(async (valid) => {
      if (valid) {
        formLoading.value = true;
        try {
          // 表单判断用户是否上传头像
          if (!userForm.isDefault && !file) {
            return ElMessage.warning("未上传头像");
          }

          // 上传用户头像：使用默认不进行上传
          !userForm.isDefault && file && (await uploadUserAvatar(file));
          const res = await updateUserByAdmin(userId, {
            name: userForm.name,
            email: userForm.email,
            roleId: userForm.roleId,
            status: userForm.status as 0 | 1,
            isDefault: userForm.isDefault,
            avatar: userForm.avatar,
          });
          res.code === 1000 ? ElMessage.success(res.message) : ElMessage.warning(res.message);
          res.code === 1000 && cb && cb();
        } catch (error) {
          ElMessage.error("添加失败");
        }
        formLoading.value = false;
      } else {
        ElMessage.warning("输入内容不符合规范");
      }
    });
  }

  // 管理员获取用户列表
  async function getAdminUserListData() {
    try {
      userState.loading = true;
      const res = await getUserListByAdmin({
        limit: userState.pageSize,
        offset: (userState.page - 1) * userState.pageSize,
        kw: searchState.value.kw,
        email: searchState.value.email,
      });
      res.code !== 1000 && ElMessage.warning(res.message);
      userState.userList = res.code === 1000 ? res.data.rows : [];
      userState.total = res.code === 1000 ? res.data.count : 0;
    } catch (error) {
      ElMessage.error("获取数据列表失败");
    }
    userState.loading = false;
  }

  // 删除用户
  async function deleteUserData(userId: string, cb?: Function) {
    ElMessageBox.confirm(`确定要删除id为 ${userId} 的这个用户吗？`, {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    }).then(async () => {
      const res = await deleteUserByAdmin(userId);
      res.code === 1000 ? ElMessage.success(res.message) : ElMessage.warning(res.message);
      res.code === 1000 && cb && cb();
    });
  }

  // 用户头像上传
  async function uploadUserAvatar(file: File) {
    const fd = new FormData();
    fd.append("avatar", file);
    try {
      const res = await userUploadAvatar(fd);
      userForm.avatar = res.data;
    } catch (error) {
      ElMessage.error("头像上传失败");
    }
  }

  return {
    searchState,
    userForm,
    userRules,
    formLoading,
    userState,
    addNewUserByAdminData,
    updateUserByAdminData,
    getAdminUserListData,
    deleteUserData,
  };
}
