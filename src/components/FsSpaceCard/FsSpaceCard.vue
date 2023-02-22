<template>
  <div class="fs-space-card">
    <div class="fs-space-card_title">Python程序设计——2022秋季（软件学院）</div>
    <div class="fs-space-card_avatar">
      <img src="@/assets/image/avatar.jpg" alt="" />
      <div>_Async__</div>
    </div>
    <div class="fs-space-card_info">
      <div class="info-item">
        <i class="fa fa-eye"></i>
        <span>1123</span>
      </div>
      <div class="info-item">
        <i class="fa fa-users"></i>
        <span>76</span>
      </div>
      <div class="info-item">
        <i class="fa fa-code"></i>
        <span>144</span>
      </div>
    </div>
    <div class="fs-space-card__mask">
      <div class="mask-title">进入空间</div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
.fs-space-card {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  &_title {
    font-size: 20px;
    text-align: center;
    font-weight: 700;
    margin-bottom: 20px;
  }
  &_avatar {
    img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      margin-bottom: 5px;
    }
    font-size: 18px;
  }

  &_info {
    position: absolute;
    bottom: 10px;
    left: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 14px;
    span {
      margin-left: 5px;
    }
  }
  &__mask {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    opacity: 0;
    transition: all 0.3s;
    z-index: 100;

    .mask-title {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100px;
      height: 30px;
      padding: 5px 8px;
      border-radius: 15px;
      border: 1px solid #fff;
      color: #fff;

      cursor: pointer;
    }
  }
  &:hover &__mask {
    opacity: 1;
  }
}
</style>
