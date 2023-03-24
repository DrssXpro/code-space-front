import type { IMenuItem } from "@/types/menuType";
import type { IUserLoginInfo } from "@/types/userType";
import { handleMenuMapRoutes, type IRouteItem } from "@/utils/tools";
import { defineStore } from "pinia";
import { ref, computed } from "vue";
import $router from "@/router/index";
import { getRoleMenu } from "@/service/api/roleRequest";
import router from "@/router/index";
import { ElMessage } from "element-plus";
import { getUserInfo } from "@/service/api/userRequest";
import usePwdStore from "./usePwdStore";

const useUserStore = defineStore("user", () => {
  // 个人信息
  const userInfo = ref<IUserLoginInfo | undefined>(JSON.parse(localStorage.getItem("userInfo") as string));
  // 菜单信息
  const menus = ref<IMenuItem[]>(JSON.parse(localStorage.getItem("menus") as string));
  // 菜单 -> 路由映射
  const mapRoutes = ref<IRouteItem[]>([]);
  // 操作权限标识
  const powerPerms = ref<string[]>([]);

  // 判断用户是否是管理员
  const isAdmin = computed(() => !mapRoutes.value.filter((item) => item.path === "/admin/personal").length);

  // 缓存个人信息 + 权限列表
  const saveUserInfo = () => {
    if (userInfo.value && menus.value) {
      localStorage.setItem("token", userInfo.value.token);
      localStorage.setItem("userInfo", JSON.stringify(userInfo.value));
      localStorage.setItem("menus", JSON.stringify(menus.value));
    }
  };

  // 动态添加路由
  const addDynamicRoutes = async () => {
    if (!userInfo.value) {
      ElMessage.warning("用户未登录");
      throw new Error("no info");
    }
    const rid = userInfo.value?.role.roleId;
    const res = await getRoleMenu(rid!);
    powerPerms.value = res.data.filter((item) => item.menuType === "B").map((item) => item.perms as string);
    console.log(powerPerms.value);
    mapRoutes.value = handleMenuMapRoutes(res.data);
    mapRoutes.value?.forEach((item) => {
      $router.addRoute("admin", item);
    });
  };

  // 重新获取个人信息并保存(刷新存储)
  const getUserInfoData = async () => {
    const id = userInfo.value?.id;
    const res = await getUserInfo(id!);
    userInfo.value = res.data;
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("userInfo", JSON.stringify(res.data));
  };

  // 注销登录
  const cancelLogin = () => {
    const { clearCodePwd } = usePwdStore();
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    localStorage.removeItem("menus");
    router.push("/login");
    clearCodePwd(); // 退出后清空存储的加密代码
    ElMessage.success("退出成功");
    userInfo.value = undefined;
  };

  return {
    userInfo,
    menus,
    mapRoutes,
    powerPerms,
    isAdmin,
    saveUserInfo,
    cancelLogin,
    addDynamicRoutes,
    getUserInfoData,
  };
});

export default useUserStore;
