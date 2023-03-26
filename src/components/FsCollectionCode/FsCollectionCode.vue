<template>
  <div class="fs-collection-code">
    <div class="fs-collection-code_header">
      <div class="left">
        <img :src="props.codeDetail.user.authorAvatar" alt="作者头像" />
        <div class="code-info">
          <div style="font-size: 18px">{{ props.codeDetail.title }}</div>
          <div class="user-info">
            <i class="fa fa-user-circle-o"></i>
            <span>{{ props.codeDetail.user.authorName }}</span>
          </div>
        </div>
      </div>
      <div class="right">
        <el-button type="success" text @click="emit('checkCollectDetail', props.codeDetail.id)">查看详情</el-button>
        <el-button type="danger" text @click="emit('cancelCollect', props.codeDetail.id)">取消收藏</el-button>
      </div>
    </div>
    <div class="fs-collection-code_content">
      <div class="code-preview">
        {{ props.codeDetail.preview }}
      </div>
      <div class="code-count">
        <img :src="`/src/assets/icon/${props.codeDetail.lan}.svg`" class="lan-img" alt="语言" />
        <div>{{ props.codeDetail.lan }}</div>
        <div><i class="fa fa-eye" style="margin-right: 3px"></i> {{ props.codeDetail.views }} 浏览</div>
        <div>{{ props.codeDetail.line }} lines</div>
      </div>
    </div>
    <div class="fs-collection-code_footer">
      <ul>
        <li>
          <span>{{ formatTime(props.codeDetail.createdAt, "YYYY-MM-DD hh:ss:mm") }}</span>
        </li>
        <li>
          <div class="operator-btn">
            <i class="fa fa-thumbs-o-up"></i>
            <span style="margin-left: 10px">{{ props.codeDetail.liked }}</span>
          </div>
        </li>
        <li>
          <div class="operator-btn">
            <i class="fa fa-star-o"></i>
            <span style="margin-left: 10px">{{ props.codeDetail.collectCount }}</span>
          </div>
        </li>
        <li>
          <div class="operator-btn">
            <i class="fa fa-commenting-o"></i>
            <span style="margin-left: 10px">{{ props.codeDetail.commentCount }}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ICodeItem } from "@/types/codeType";
import { formatTime } from "@/utils/formatTime";

const props = defineProps<{
  codeDetail: ICodeItem;
}>();

const emit = defineEmits<{
  (e: "checkCollectDetail", codeId: string): void;
  (e: "cancelCollect", codeId: string): void;
}>();
</script>

<style scoped lang="less">
.fs-collection-code {
  padding: 20px 10px;
  &_header {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .left {
      display: flex;
      img {
        width: 50px;
        height: 50px;
        margin-right: 20px;
      }
      .code-info {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .user-info {
          color: var(--el-text-color-secondary);
          font-size: 14px;
          i {
            margin-right: 5px;
          }
        }
      }
    }
  }
  &_content {
    .code-count {
      margin-top: 10px;
      display: flex;
      font-size: 14px;
      gap: 10px;
      color: var(--el-text-color-secondary);
      .lan-img {
        width: 18px;
        height: 18px;
      }

      :nth-child(2) {
        padding-right: 10px;
        border-right: 1px solid var(--el-border-color-light);
      }
      :nth-child(3) {
        padding-right: 10px;
        border-right: 1px solid var(--el-border-color-light);
      }
    }
  }
  &_footer {
    margin-top: 10px;
    font-size: 14px;
    ul {
      display: flex;
      align-items: center;
      gap: 10px;
      li {
        position: relative;
        color: var(--el-text-color-secondary);
      }
      .line-gap {
        position: absolute;
        content: "";
        width: 1px;
        height: 70%;
        right: -2px;
        top: 5px;
      }
      & > li:nth-child(2)::after {
        .line-gap();
      }
      & > li:nth-child(3)::after {
        .line-gap();
      }
    }
    .operator-btn {
      padding: 4px 12px;
      display: flex;
      align-items: center;
      border-radius: 5px;
    }
  }
}
</style>
