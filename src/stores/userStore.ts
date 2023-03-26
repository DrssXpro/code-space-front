import type { IMenuItem } from "@/types/menuType";
import type { IUserLoginInfo } from "@/types/userType";
import { handleMenuMapRoutes, handleMenuToTree, type IRouteItem } from "@/utils/tools";
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
    mapRoutes.value = handleMenuMapRoutes(res.data);
    mapRoutes.value?.forEach((item) => {
      $router.addRoute("admin", item);
    });
  };

  // 重新获取个人信息并保存(刷新存储)
  const getUserInfoData = async (cb?: Function) => {
    const id = userInfo.value?.id;
    // 获取新的个人信息
    const res = await getUserInfo(id!);
    userInfo.value = res.data.userInfo;
    // 获取新的菜单列表
    const res2 = await getRoleMenu(userInfo.value.role.roleId);
    menus.value = res2.code === 1000 ? (handleMenuToTree(res2.data) as IMenuItem[]) : [];
    // 刷新token
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("userInfo", JSON.stringify(userInfo.value));
    localStorage.setItem("menus", JSON.stringify(menus.value));
    res.code === 1000 && cb && cb();
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
    saveUserInfo,
    cancelLogin,
    addDynamicRoutes,
    getUserInfoData,
  };
});

export default useUserStore;
