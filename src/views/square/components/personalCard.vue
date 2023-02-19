<template>
  <div class="personal-card">
    <div class="personal-card__avatar">
      <img src="@/assets/image/avatar.jpg" alt="" />
    </div>
    <div class="personal-card__info">
      <div class="user-name">_Async__</div>
      <div class="user-introduce">这个人很神秘，暂无个人介绍~</div>
    </div>
    <div class="personal-card__count">
      <div class="count-item" v-for="item in countArr">
        <span>{{ item.count }}</span>
        <span>{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const countArr = [
  {
    name: "贡献",
    count: 50,
  },
  {
    name: "关注",
    count: 14,
  },
  {
    name: "粉丝",
    count: 9,
  },
  {
    name: "收藏",
    count: 101,
  },
];
</script>

<style scoped lang="less">
.personal-card {
  background-color: var(--main-color);
  border-radius: 10px;
  padding-bottom: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  &__avatar {
    width: 50px;
    height: 50px;
    overflow: hidden;
    border-radius: 50%;
    margin-top: 20px;
  }
  &__info {
    text-align: center;
    padding: 0 20px;
    .user-introduce {
      margin-top: 10px;
      font-size: 12px;
    }
  }
  &__count {
    width: 100%;
    display: flex;
    justify-content: space-around;
    border-top: 1px solid var(--font-color);
    padding-top: 10px;
    .count-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
    }

    & > div:nth-child(1)::before,
    & > div:nth-child(2)::before,
    & > div:nth-child(3)::before {
      content: "";
      position: absolute;
      right: -18px;
      top: 0;
      display: block;
      width: 1px;
      height: 100%;
      background: var(--font-color);
    }
  }
}
</style>
