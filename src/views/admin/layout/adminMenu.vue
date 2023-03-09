<template>
  <div class="admin-menu-container">
    <div class="menu-title">{{ userInfo?.role.roleChar }}</div>
    <el-menu
      :default-active="defaultRouter"
      router
      background-color="var(--el-bg-color-overlay)"
      text-color="var(--el-text-color-secondary)"
      active-text-color="var(--el-text-color-primary)"
    >
      <template v-for="item in menus" :key="item.id">
        <fs-deep-menu :menu-item="item" />
      </template>
      <!-- <el-menu-item index="/admin/personal">
        <i class="fa fa-user-circle icon"></i>
        <span>个人中心</span>
      </el-menu-item>
      <el-menu-item index="/admin/code">
        <i class="fa fa-code icon"></i>
        <span>我的代码</span>
      </el-menu-item>

      <el-sub-menu index="/admin/content">
        <template #title>
          <i class="fa fa-edit icon"></i>
          <span>内容管理</span>
        </template>
        <el-menu-item index="/admin/content/user"> 用户管理</el-menu-item>
        <el-menu-item index="/admin/content/code">代码管理</el-menu-item>
        <el-menu-item index="/admin/content/comment">评论管理</el-menu-item>
        <el-menu-item index="/admin/content/space">空间管理</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="/admin/power">
        <template #title>
          <i class="fa fa-power-off icon"></i>
          <span>权限管理</span>
        </template>
        <el-menu-item index="/admin/power/role">角色管理</el-menu-item>
        <el-menu-item index="/admin/power/menu">菜单管理</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="/admin/space">
        <template #title>
          <i class="fa fa-building-o icon"></i>
          <span>空间管理</span>
        </template>
        <el-menu-item index="/admin/space/overview">空间总览</el-menu-item>
        <el-menu-item index="/admin/space/people">人员管理</el-menu-item>
        <el-menu-item index="/admin/space/code">代码管理</el-menu-item>
        <el-menu-item index="/admin/space/task">任务管理</el-menu-item>
        <el-menu-item index="/admin/space/role">角色分配</el-menu-item>
      </el-sub-menu> -->
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { computed, toRefs } from "vue";
import { useRoute } from "vue-router";
import useUserStore from "@/stores/userStore";
import FsDeepMenu from "@/components/FsDeepMenu/FsDeepMenu.vue";

const { menus, userInfo } = toRefs(useUserStore());

const defaultRouter = computed(() => $route.fullPath);
const $route = useRoute();
</script>

<style scoped lang="less">
.admin-menu-container {
  position: absolute;
  width: 200px;
  height: calc(100vh - 110px);
  left: 0;
  top: 20px;
  background-color: var(--el-bg-color-overlay);
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  padding: 10px;
  overflow-y: auto;
  .menu-title {
    text-align: center;
    margin: 10px 0 20px 0;
    font-size: 25px;
    font-weight: 700;
  }
  .el-menu {
    border: 0 !important;
  }
  .is-active {
    background-color: var(--el-bg-color-page);
  }
  .el-menu-item:hover {
    color: var(--el-text-color-primary);
    background-color: var(--el-bg-color-page);
  }
  :deep(.el-sub-menu__title):hover {
    color: var(--el-text-color-primary) !important;
    background-color: none !important;
  }
}
</style>
