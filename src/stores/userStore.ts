import type { IMenuItem } from "@/types/menuType";
import type { IUserLoginInfo } from "@/types/userType";
import { defineStore } from "pinia";
import { ref } from "vue";

const useUserStore = defineStore("user", () => {
  const userInfo = ref<IUserLoginInfo | undefined>(JSON.parse(localStorage.getItem("userInfo") as string));
  const menus = ref<IMenuItem[]>();

  // 缓存个人信息 + 权限列表
  const saveUserInfo = () => {
    if (userInfo.value && menus.value) {
      localStorage.setItem("token", userInfo.value.token);
      localStorage.setItem("userInfo", JSON.stringify(userInfo.value));
      localStorage.setItem("menus", JSON.stringify(menus.value));
    }
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
    saveUserInfo,
    cancelLogin,
  };
});

export default useUserStore;
