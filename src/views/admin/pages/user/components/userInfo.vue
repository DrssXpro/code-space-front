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
      <div class="space-info" @click="$router.push('/space/detail/123')">
        <img src="@/assets/image/avatar.jpg" alt="" />
        <span>我的空间 - <span style="font-size: 14px">_Async__</span></span>
      </div>
    </div>
    <div class="user-info_count">
      <div class="count-title">个人信息</div>
      <div class="info-count">获赞数：79</div>
      <div class="info-count">收藏数：101</div>
      <div class="info-count">分享代码：100</div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
.user-info {
  &-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 300px;
    max-height: 500px;
    padding: 20px;
    background-color: var(--el-bg-color-overlay);
    border-radius: 20px;
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
      cursor: pointer;
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
