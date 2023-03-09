<template>
  <div class="user-info-container">
    <div class="user-info_avatar">
      <img src="@/assets/image/avatar.jpg" alt="" />
    </div>
    <div class="user-info_content">
      <div class="user-name">_Async__</div>
      <div class="line-one user-introduce" title="这个人很神秘，暂时没有个人介绍~">这个人很神秘，暂时没有个人介绍~</div>
      <div class="user-email">邮箱：1827951482@qq.com</div>
    </div>
    <div class="user-info_count">
      <div class="count-title">所属空间</div>
      <div class="space-info">
        <div class="space-info-content" @click="$router.push('/space/detail/123')">
          <img src="@/assets/image/avatar.jpg" alt="" />
          <span>我的空间 - <span style="font-size: 14px">_Async__</span></span>
          <div class="space-operator"></div>
        </div>
        <el-button type="danger" plain>退出</el-button>
      </div>
    </div>

    <div class="user-edit">
      <el-button type="primary" text @click="showEditDialog">编辑</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: "showEditDialog"): void;
}>();

const showEditDialog = () => {
  emit("showEditDialog");
};
</script>

<style scoped lang="less">
.user-info {
  &-container {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: auto;
    overflow-x: hidden;
    width: 300px;
    padding: 20px;
    max-height: 360px;
    background-color: var(--el-bg-color-overlay);
    border-radius: 20px;
    .user-edit {
      position: absolute;
      right: 10px;
      top: 20px;
    }
  }
  &_avatar {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    overflow: hidden;
  }
  &_content {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    .user-name {
      font-size: 18px;
      margin-top: 20px;
    }
    .user-introduce,
    .user-email {
      width: 260px;
      font-size: 14px;
    }
    .line-one {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  &_count {
    width: 100%;
    border-top: 1px solid var(--el-border-color-light);
    margin-top: 20px;
    .count-title {
      margin: 20px 0;

      font-size: 20px;
    }
    .space-info {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .space-info-content {
        display: flex;
        align-items: center;
      }
    }
    .info-count {
      margin-bottom: 10px;
      font-size: 18px;
    }
    img {
      width: 40px;
      height: 40px;
      margin-right: 10px;
    }
  }
}
</style>
