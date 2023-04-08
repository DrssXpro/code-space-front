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
          @click="handleSkipToRoute(item)"
        >
          {{ item.text }}
        </li>
      </ul>
    </div>
    <div class="nav-menu_right">
      <el-button type="danger"><a href="#/share" target="_blank" style="color: #fff">分享</a></el-button>
      <div class="nav-menu_right__operator">
        <div class="login-operator" v-if="!userInfo" @click="$router.push('/login')">
          <span>登录</span>
          <span>/</span>
          <span>注册</span>
        </div>
        <div class="login-info" v-else>
          <img :src="userInfo.avatar" />
          <el-dropdown>
            <span class="el-dropdown-link">
              {{ userInfo.name }}
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="skipToSpace">我的空间</el-dropdown-item>
                <el-dropdown-item @click="exitLogin">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, toRefs } from "vue";
import { useRoute, useRouter } from "vue-router";
import useUserStore from "@/stores/userStore";
import { __debounce } from "@/utils/tools";
import { ElMessage } from "element-plus";
const $route = useRoute();
const $router = useRouter();

const { userInfo, mapRoutes, cancelLogin, addDynamicRoutes } = toRefs(useUserStore());

const activeIndex = computed(() => menus.findIndex((item) => $route.fullPath.split("/")[1] === item.path.slice(1)));

const skipToSpace = () => {
  if (userInfo.value && userInfo.value.space) {
    const spaceId = userInfo.value.space.spaceId;
    $router.push(`/space/detail/${spaceId}`);
  } else {
    ElMessage.warning("您还没有加入空间");
  }
};

// 退出登录
const exitLogin = () => {
  cancelLogin.value();
  ElMessage.success("退出成功");
};

// 路由跳转
const handleSkipToRoute = (item: { path: string; text: string }) => {
  // 判断是否是访问的管理端
  if (item.path !== "/admin") {
    $router.push(item.path);
  } else {
    // 是管理端，需要判断是否已有路由权限表
    if (mapRoutes.value.length) {
      $router.push(mapRoutes.value[0].path);
    } else {
      addDynamicRoutes.value().then(
        () => {
          $router.push(mapRoutes.value[0].path);
        },
        () => {
          cancelLogin.value();
        }
      );
    }
  }
};

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
      font-size: 24px;
      margin-right: 10px;
      font-weight: 600;
    }
    span {
      font-size: 22px;
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
    .login-info {
      display: flex;
      align-items: center;
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin: 0 10px;
      }
    }
  }
}
</style>
