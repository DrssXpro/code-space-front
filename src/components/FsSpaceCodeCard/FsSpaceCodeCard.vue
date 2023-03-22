<template>
  <div class="fs-code-card">
    <el-card shadow="never">
      <div class="fs-code-content">
        <div class="fs-code-card_header">
          <span>{{ props.codeDetail.user.nickName }}</span>
        </div>
        <div class="fs-code-card_content">
          <div class="content-title line-one">
            {{ props.codeDetail.title }}
            <el-tag type="danger" style="margin-left: 8px">{{ props.codeDetail.task.taskName }}</el-tag>
          </div>
          <div class="content-preview line-one">{{ props.codeDetail.preview }}...</div>
          <div class="content-detail" v-show="fold">
            <fs-code-mirror ref="codeRef" :code="props.codeDetail.content" :disabled="true" />
          </div>
          <div class="content-info">
            <img :src="`/src/assets/icon/${props.codeDetail.lan}.svg`" class="lan-img" alt="语言" />
            <div>{{ props.codeDetail.lan }}</div>
            <div><i class="fa fa-eye"></i> {{ props.codeDetail.views }} 浏览</div>
            <div><i class="fa fa-thumbs-o-up"></i> {{ props.codeDetail.liked }}</div>
            <div>{{ props.codeDetail.line }} lines</div>
          </div>
        </div>
        <div class="fs-code-card_footer">
          <ul>
            <li>
              <span>{{ formatTime(codeDetail.createdAt, "YYYY-MM-DD hh:ss:mm") }}</span>
            </li>
          </ul>
        </div>
        <div class="fold-controll" @click.prevent="fold = !fold">
          <i :class="['fa', !fold ? 'fa-angle-down' : 'fa-angle-up']"></i> {{ !fold ? "展开" : "收起" }}
        </div>
        <div class="fs-code-card_tag" v-if="props.codeDetail.status == 2">优秀</div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { formatTime } from "@/utils/formatTime";
import FsCodeMirror from "../FsCodeMirror/FsCodeMirror.vue";
import type { ISpaceCodeItem } from "@/types/codeType";

const codeRef = ref<InstanceType<typeof FsCodeMirror>>();

const props = defineProps<{
  codeDetail: ISpaceCodeItem;
}>();

// 需要设置语言
watch(
  () => props.codeDetail,
  (newValue) => {
    codeRef.value?.configCodeMirror(newValue.lan);
  },
  {
    immediate: true,
  }
);

const fold = ref(false);
</script>

<style scoped lang="less">
.fs-code-card {
  position: relative;
  transition: all 0.3s;
  border-radius: 5px;
  overflow: hidden;
  .fs-code-content {
    position: relative;
    padding: 20px;
  }
  &_header {
    display: flex;
    align-items: center;
  }
  &_content {
    width: 600px;
    cursor: pointer;
    .content-title {
      display: flex;
      align-items: center;
      font-size: 18px;
      margin: 10px 0;
      font-weight: 700;
    }

    .content-preview {
      margin: 10px 0;
      font-size: 14px;
    }
    .content-detail {
      margin: 10px 0;
    }
    .content-info {
      display: flex;
      font-size: 14px;
      gap: 10px;
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
      :nth-child(4) {
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
    }
  }
  &_tag {
    position: absolute;
    width: 120px;
    height: 30px;
    right: -30px;
    top: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: rotate(40deg);
    background-color: #dd6161;
    color: #fff;
  }
  .fold-controll {
    position: absolute;
    bottom: 15px;
    right: 20px;
    font-size: 14px;
    color: var(--el-color-primary);
    z-index: 10;
  }

  .line-one {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
