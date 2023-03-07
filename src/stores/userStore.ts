import type { IMenuItem } from "@/types/menuType";
import type { IUserLoginInfo } from "@/types/userType";
import { handleMenuMapRoutes, type IRouteItem } from "@/utils/tools";
import { defineStore } from "pinia";
import { ref } from "vue";
import $router from "@/router/index";
import { getRoleMenu } from "@/service/api/roleRequest";

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
    const rid = userInfo.value?.roleId;
    const res = await getRoleMenu(rid!);
    mapRoutes.value = handleMenuMapRoutes(res.data);
    console.log(mapRoutes.value);
    // 删除原有路由
    // mapRoutes.value?.forEach((item) => {
    //   $router.removeRoute(item.name);
    // });
    // 添加新路由
    mapRoutes.value?.forEach((item) => {
      $router.addRoute("admin", item);
    });
  };

  // 注销登录
  const cancelLogin = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    userInfo.value = undefined;
  };

  return {
    userInfo,
    menus,
    mapRoutes,
    saveUserInfo,
    cancelLogin,
    addDynamicRoutes,
  };
});

export default useUserStore;
