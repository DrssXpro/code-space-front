<template>
  <div class="nav-menu-container">
    <div class="nav-menu_left">
      <i class="fa fa-code icon"></i>
      <span>Code Space</span>
    </div>
    <div class="nav-menu_center">
      <ul>
        <li
          :class="['menu-item', index === activeIndex ? 'menu-item__active' : '']"
          v-for="(item, index) in menus"
          :key="index"
          @click="$router.push(item.path)"
        >
          {{ item.text }}
        </li>
      </ul>
    </div>
    <div class="nav-menu_right">
      <fs-switch v-model="themeFlag" @change-status="handleChangeTheme">
        <i :class="[themeFlag ? 'fa fa-sun-o' : 'fa fa-moon-o']"></i>
      </fs-switch>
      <button class="share-btn">分享</button>
      <div class="nav-menu_right__operator">
        <span>登录</span>
        <span>/</span>
        <span>注册</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import FsSwitch from "@/components/FsSwitch/FsSwitch.vue";
import { useRoute } from "vue-router";
import useTheme from "@/hooks/useTheme";
import { LIGHT_THEME, DARK_THEME } from "@/theme/theme";
import { __debounce } from "@/utils/tools";
const $route = useRoute(),
  { setTheme } = useTheme();
const activeIndex = ref(0);
const themeFlag = ref(false);

watch(
  () => $route.fullPath,
  (newValue) => {
    activeIndex.value = menus.findIndex((item) => item.path == newValue);
    console.log(activeIndex.value);
  }
);

const handleChangeTheme = __debounce(() => {
  themeFlag.value ? setTheme(LIGHT_THEME) : setTheme(DARK_THEME);
}, 500);

const menus = [
  {
    path: "/square",
    text: "广场",
  },
  {
    path: "/space",
    text: "圈子",
  },
  {
    path: "/search",
    text: "搜索",
  },
  {
    path: "/personal",
    text: "个人",
  },
  {
    path: "/admin",
    text: "后台",
  },
];
</script>

<style scoped lang="less">
.nav-menu-container {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 30px;
  box-shadow: 0 1px 4px 0 rgb(0 21 41 / 12%);
  background-color: var(--nav-color);
  color: var(--font-color);
  .nav-menu_left {
    display: flex;
    height: 100%;
    align-items: center;
    color: var(--font-main-color);
    .icon {
      font-size: 25px;
      margin-right: 10px;
    }
    span {
      font-size: 25px;
      font-weight: 600;
    }
  }
  .nav-menu_center {
    font-size: 18px;
    flex: 1;
    margin-left: 50px;
    height: 100%;
    ul {
      height: 100%;
      display: flex;
      align-items: center;
      gap: 20px;

      .underLine {
        position: absolute;
        content: "";
        left: 0;
        bottom: 0;
        width: 100%;
        height: 2px;
        background-color: var(--font-active-color);
      }
      .menu-item {
        cursor: pointer;
        position: relative;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        &:hover {
          font-weight: 700;
          color: var(--font-active-color);
        }
        &:hover::after {
          display: block;
        }
        &::after {
          display: none;
          .underLine();
        }
      }
      .menu-item__active {
        font-weight: 700;
        color: var(--font-active-color);

        &::after {
          display: block;
          .underLine();
        }
      }
    }
  }
  .nav-menu_right {
    display: flex;
    gap: 10px;
    justify-content: space-between;
    height: 100%;
    align-items: center;
    .share-btn {
      width: 65px;
      height: 32px;
      border-radius: 5px;
      &:hover {
        opacity: 0.8;
      }
    }
    span {
      cursor: pointer;
      margin: 0 2px;
      &:hover {
        font-weight: 700;
        color: var(--font-main-color);
      }
    }
  }
}
</style>
