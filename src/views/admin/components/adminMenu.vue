<template>
  <div class="admin-menu-container">
    <el-menu
      :default-active="defaultRouter"
      background-color="none"
      text-color="var(--font-color)"
      active-text-color="var(--font-main-color)"
      unique-opened
      router
      @open="handleOpen"
      @close="handleClose"
    >
      <el-menu-item index="/admin/user">
        <i class="fa fa-user-circle icon"></i>
        <span>个人信息</span>
      </el-menu-item>
      <el-menu-item index="/admin/code">
        <i class="fa fa-code icon"></i>
        <span>我的代码</span>
      </el-menu-item>
      <el-menu-item index="/admin/comment">
        <i class="fa fa-commenting-o icon"></i>
        <span>我的评论</span>
      </el-menu-item>
      <el-menu-item index="/admin/colletion">
        <i class="fa fa-star-o icon"></i>
        <span>我的收藏</span>
      </el-menu-item>
      <el-sub-menu index="/admin/content">
        <template #title>
          <i class="fa fa-edit icon"></i>
          <span>内容管理</span>
        </template>
        <el-menu-item index="/admin/content/user"> 用户管理</el-menu-item>
        <el-menu-item index="/admin/content/code">代码管理</el-menu-item>
        <el-menu-item index="/admin/content/comment">评论管理</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="6">
        <template #title>
          <i class="fa fa-building-o icon"></i>
          <span>空间管理</span>
        </template>
        <el-menu-item index="/admin/space/space">空间管理</el-menu-item>
        <el-menu-item index="/admin/space/code">代码管理</el-menu-item>
        <el-menu-item index="/admin/space/file">文件管理</el-menu-item>
        <el-menu-item index="/admin/space/comment">评论管理</el-menu-item>
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
  overflow-y: scroll;
  .icon {
    font-size: 18px;
    margin-right: 10px;
  }
  .el-menu {
    border: 0 !important;
  }

}
</style>
