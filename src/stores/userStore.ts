import type { IMenuItem } from "@/types/menuType";
import type { IUserLoginInfo } from "@/types/userType";
import { handleMenuMapRoutes, type IRouteItem } from "@/utils/tools";
import { defineStore } from "pinia";
import { ref } from "vue";
import $router from "@/router/index";
import { getRoleMenu } from "@/service/api/roleRequest";
import router from "@/router/index";
import { ElMessage } from "element-plus";
import { getUserInfo } from "@/service/api/userRequest";

const useUserStore = defineStore("user", () => {
  const userInfo = ref<IUserLoginInfo | undefined>(JSON.parse(localStorage.getItem("userInfo") as string));
  const menus = ref<IMenuItem[]>(JSON.parse(localStorage.getItem("menus") as string));
  const mapRoutes = ref<IRouteItem[]>();

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
    const rid = userInfo.value?.role.roleId;
    const res = await getRoleMenu(rid!);
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
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    localStorage.removeItem("menus");
    router.push("/login");
    ElMessage.success("退出成功");
    userInfo.value = undefined;
  };

  return {
    userInfo,
    menus,
    mapRoutes,
    saveUserInfo,
    cancelLogin,
    addDynamicRoutes,
    getUserInfoData,
  };
});

export default useUserStore;
