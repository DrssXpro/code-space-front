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
      <el-button type="danger"><a href="/share" target="_blank">分享</a></el-button>
      <div class="nav-menu_right__operator" @click="$router.push('/login')">
        <span>登录</span>
        <span>/</span>
        <span>注册</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import FsSwitch from "@/components/FsSwitch/FsSwitch.vue";
import { useDark, useToggle } from "@vueuse/core";
import { useRoute } from "vue-router";

import { __debounce } from "@/utils/tools";
const $route = useRoute();

const themeFlag = ref(false);
const isDark = useDark();
const toggleDark = useToggle(isDark);

const activeIndex = computed(() => menus.findIndex((item) => $route.fullPath.includes(item.path)));

const handleChangeTheme = __debounce(() => {
  toggleDark();
}, 500);

const menus = [
  {
    path: "/square",
    text: "广场",
  },
  {
    path: "/search",
    text: "搜索",
  },
  {
    path: "/space",
    text: "空间",
  },
  {
    path: "/admin",
    text: "个人",
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
  background-color: var(--el-bg-color-overlay);

  transition: background-color 0.3s;
  .nav-menu_left {
    display: flex;
    height: 100%;
    align-items: center;
    .icon {
      font-size: 25px;
      margin-right: 10px;
      font-weight: 600;
    }
    span {
      font-size: 24px;
      font-weight: 600;
    }
  }
  .nav-menu_center {
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
        background-color: var(--el-text-color-primary);
      }
      .menu-item {
        cursor: pointer;
        position: relative;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--el-text-color-secondary);
        &:hover {
          font-weight: 700;
          color: var(--el-text-color-primary);
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
        color: var(--font-main-color);

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
