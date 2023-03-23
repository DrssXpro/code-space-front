<template>
  <el-card shadow="never">
    <div class="introduce-container">
      <div class="introduce-cover">
        <img :src="props.spaceDetail?.spaceDetail.avatar" alt="空间头像" />
        <div class="shadow"></div>
        <div class="space-info">
          <div class="user-info">
            <div style="color: #fff">{{ props.spaceDetail?.spaceDetail.user.authorName }}</div>
            <div style="color: var(--el-text-color-secondary); font-size: 14px">
              创建{{ getDisDay(new Date(props.spaceDetail?.spaceDetail.createdAt || "").getTime(), Date.now()) }}天
            </div>
          </div>
          <div class="user-avatar">
            <img :src="props.spaceDetail?.spaceDetail.user.authorAvatar" alt="用户头像" />
          </div>
        </div>
      </div>
      <div class="space-introduce">
        <div class="space-title">{{ props.spaceDetail?.spaceDetail.name }}</div>
        <div class="introduce-content">
          {{ props.spaceDetail?.spaceDetail.introduce }}
        </div>
      </div>

      <div class="space-count">
        <div>
          <div class="desc">成员数</div>
          <div class="count">{{ props.spaceDetail?.userCount }}</div>
        </div>
        <div>
          <div class="desc">代码量</div>
          <div class="count">{{ props.spaceDetail?.codeCount }}</div>
        </div>
        <div>
          <div class="desc">任务数</div>
          <div class="count">{{ props.spaceDetail?.taskCount }}</div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import type { ISpaceDetail } from "@/types/spaceType";
import { getDisDay } from "@/utils/formatTime";

const props = defineProps<{
  spaceDetail?: ISpaceDetail;
}>();
</script>

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
  .space-count {
    display: flex;
    margin-bottom: 10px;
    border-top: 1px solid var(--el-card-border-color);
    padding-top: 10px;
    div {
      position: relative;
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;

      .desc {
        margin-bottom: 5px;
      }
      .count {
        font-weight: 700;
      }
    }

    .line {
      position: absolute;
      content: "";
      width: 1px;
      height: 110%;
      top: 0;
      right: 0;
      background-color: var(--el-card-border-color);
    }
    :nth-child(1) {
      &::after {
        .line();
      }
    }
    :nth-child(2) {
      &::after {
        .line();
      }
    }
  }
}
</style>
