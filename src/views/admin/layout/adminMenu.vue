<template>
  <div class="admin-menu-container">
    <el-menu
      :default-active="defaultRouter"
      unique-opened
      router
      background-color="var(--el-bg-color-overlay)"
      text-color="var(--el-text-color-secondary)"
      active-text-color="var(--el-text-color-primary)"
      @open="handleOpen"
      @close="handleClose"
    >
      <el-menu-item index="/admin/personal">
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
        <el-menu-item index="/admin/content/code">代码审核</el-menu-item>
        <el-menu-item index="/admin/content/comment">评论管理</el-menu-item>
        <el-menu-item index="/admin/content/space">空间管理</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="6">
        <template #title>
          <i class="fa fa-building-o icon"></i>
          <span>空间管理</span>
        </template>
        <el-menu-item index="/admin/space/code">人员管理</el-menu-item>
        <el-menu-item index="/admin/space/code">代码管理</el-menu-item>
        <el-menu-item index="/admin/space/file">文件管理</el-menu-item>
        <el-menu-item index="/admin/space/comment">评论管理</el-menu-item>
        <el-menu-item index="/admin/space/comment">权限分配</el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
const defaultRouter = ref("");
const $route = useRoute();

onMounted(() => {
  defaultRouter.value = $route.fullPath;
});
const handleOpen = () => {};

const handleClose = () => {};
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

  .icon {
    font-size: 18px;
    margin-right: 10px;
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
