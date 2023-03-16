<template>
  <el-card shadow="never">
    <div class="introduce-container">
      <div class="introduce-cover">
        <img src="@/assets/image/avatar.jpg" alt="" />
        <div class="shadow"></div>
        <div class="space-info">
          <div class="user-info">
            <div style="color: #fff">空间主</div>
            <div style="color: var(--el-text-color-secondary); font-size: 14px">创建65天</div>
          </div>
          <div class="user-avatar">
            <img src="@/assets/image/avatar.jpg" alt="" />
          </div>
        </div>
      </div>
      <div class="space-introduce">
        <div class="space-title">我的空间</div>
        <div class="introduce-content">
          帮你学编程、做项目、找工作少走弯路的交流圈，进步从此开始！（请加入后的同学先阅读置顶帖）
        </div>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
.introduce-container {
  width: 100%;
  // height: 300px;
  .introduce-cover {
    position: relative;
    width: 100%;
    height: 150px;
    .shadow {
      position: absolute;
      bottom: 0px;
      width: 100%;
      height: 72px;
      background-image: linear-gradient(-180deg, rgba(0, 0, 0, 0) 4%, rgba(0, 0, 0, 0.6) 98%);
    }
    .space-info {
      width: 90%;
      bottom: -30px;
      // left: 20px;
      margin: 0 10px;
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .user-info {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        height: 50px;
      }

      .user-avatar {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        overflow: hidden;
      }
    }
  }
  .space-introduce {
    margin-top: 20px;
    padding: 10px;
    .space-title {
      font-size: 20px;
      font-weight: 700;
    }
    .introduce-content {
      margin-top: 10px;
      letter-spacing: 0.1em;
      line-height: 1.5em;
    }
  }
}
</style>
