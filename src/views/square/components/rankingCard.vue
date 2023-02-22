<template>
  <div class="ranking-card">
    <el-card shadow="never">
      <template #header>本月排行</template>
      <ul>
        <li v-for="i in 3">
          <div class="user-content">
            <img src="@/assets/image/avatar.jpg" class="user-content_avatar" alt="" />
            <div class="user-content_info">
              <div class="user-name">_Async__</div>
              <div class="user-info">本月贡献代码：20</div>
            </div>
          </div>
        </li>
      </ul>
    </el-card>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
.more-btn {
  font-size: 14px;
  cursor: pointer;
  &:hover {
    color: var(--font-main-color);
  }
}
li {
  padding: 10px 15px;
}
.user-content {
  display: flex;
  cursor: pointer;

  &_avatar {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    margin-right: 20px;
  }

  &_info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 10px;
    .user-info {
      font-size: 14px;
      color: var(--el-text-color-secondary);
    }
  }
}
</style>
