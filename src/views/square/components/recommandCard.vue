<template>
  <div class="ranking-card">
    <fs-side-card title="推荐好友">
      <template #operator>
        <div class="more-btn">更多</div>
      </template>
      <template #content>
        <ul>
          <li v-for="i in 5">
            <div class="user-content">
              <img src="@/assets/image/avatar.jpg" class="user-content_avatar" alt="" />
              <div class="user-content_info">
                <div class="user-name">_Async__</div>
                <div class="user-info">这个人很神秘，暂无个人介绍~</div>
              </div>
            </div>
          </li>
        </ul>
      </template>
    </fs-side-card>
  </div>
</template>

<script setup lang="ts">
import FsSideCard from "@/components/FsSideCard/FsSideCard.vue";
</script>

<style scoped lang="less">
.more-btn {
  font-size: 14px;
  cursor: pointer;
  &:hover {
    color: var(--font-main-color);
  }
}
li {
  padding: 10px 0;
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
    .user-name {
      color: var(--font-main-color);
    }
    .user-info {
      font-size: 12px;
    }
  }
}
</style>
