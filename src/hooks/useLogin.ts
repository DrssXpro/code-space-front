import { ElMessage, type FormInstance, type FormRules } from "element-plus";
import validator from "@/utils/validator";
import { reactive, ref, toRefs, type Ref } from "vue";
import useUserStore from "@/stores/userStore";
import { userLogin } from "@/service/api/userRequest";
import { useRouter } from "vue-router";
import { getRoleMenu } from "@/service/api/roleRequest";
import { handleMenuToTree } from "@/utils/tools";
import type { IMenuItem } from "@/types/menuType";

const { loginValidator } = validator;
export default function useLogin(formRef: Ref<FormInstance | undefined>) {
  const $router = useRouter();

  const loginState = reactive({
    // 用户名
    username: "",
    // 用户密码
    password: "",
    // 邮箱验证码
    emailCode: "",
    // 邮箱
    email: "",
  });

  // 是否忘记密码标识
  const isForget = ref(false);

  // 登录验证
  const loginRules: FormRules = {
    username: [{ validator: loginValidator.username, trigger: "blur" }],
    password: [{ validator: loginValidator.password, trigger: "blur" }],
  };

  // 处理表单登录逻辑
  async function submitToLogin() {
    if (!formRef.value) return;
    formRef.value.validate(async (valid) => {
      if (valid) {
        try {
          const res = await userLogin({ username: loginState.username, password: loginState.password });

          if (res.code === 1000) {
            // 获取该角色的菜单列表
            const res2 = await getRoleMenu(res.data.role.roleId);
            // 个人信息、树形菜单存储至store 缓存
            const { userInfo, menus, mapRoutes, saveUserInfo, addDynamicRoutes } = toRefs(useUserStore());

            userInfo.value = res.data;
            // 存储menus菜单
            menus.value = res2.code === 1000 ? (handleMenuToTree(res2.data) as IMenuItem[]) : [];
            // 动态添加路由
            await addDynamicRoutes.value();
            // 保存信息至缓存
            saveUserInfo.value();
            res2.code === 1000 ? ElMessage.success(res.message) : ElMessage.warning(res.message);
            // 注意需要先缓存再跳转
            console.log("check:", !!mapRoutes.value);
            res2.code === 1000 && $router.push({ path: mapRoutes.value ? mapRoutes.value[0].path : "/admin" });
          }
        } catch (err) {
          console.log("check:", err);
          ElMessage.warning("登录失败");
        }
      } else {
        ElMessage.warning("输入内容有误");
      }
    });
  }

  return {
    loginRules,
    loginState,
    isForget,
    submitToLogin,
  };
}
