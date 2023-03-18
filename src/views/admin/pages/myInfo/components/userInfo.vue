<template>
  <div class="user-info-container">
    <div class="user-info_avatar">
      <img :src="userInfo?.avatar" alt="用户头像" />
    </div>
    <div class="user-info_content">
      <div class="user-name">{{ userInfo?.name }}</div>
      <div class="user-email">邮箱：{{ userInfo?.email }}</div>
    </div>
    <div class="user-info_count">
      <div class="count-title">所属空间</div>
      <div class="space-info">
        <div class="space-empty" v-if="!userInfo?.space">
          <span style="color: var(--el-text-color-secondary)">暂未加入空间</span>
        </div>
        <div class="space-info-content" v-else @click="$router.push(`/space/detail/${userInfo?.space?.spaceId}`)">
          <el-tag size="large" type="success">{{ userInfo?.space?.spaceName }}</el-tag>
          <div class="space-operator"></div>
        </div>
        <el-button type="danger" text v-if="userInfo?.space" @click="exitSpaceByOwn">退出</el-button>
      </div>
    </div>

    <div class="user-edit">
      <el-button type="primary" text @click="showEditDialog">编辑</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRefs } from "vue";
import useUserStore from "@/stores/userStore";
import useInfo from "@/hooks/useInfo";

const { userInfo, getUserInfoData } = toRefs(useUserStore());
const { exitSpace } = useInfo();
const emit = defineEmits<{
  (e: "showEditDialog"): void;
}>();

// 退出空间
const exitSpaceByOwn = () => {
  exitSpace(() => getUserInfoData.value());
};

// 打开编辑dialog
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

    .user-email {
      width: 260px;
      font-size: 14px;
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
  }
}
</style>
