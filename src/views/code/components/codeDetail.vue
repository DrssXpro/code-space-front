<template>
  <el-card shadow="never">
    <template #header>
      <div class="code-detail_header">
        <img :src="codeDetail?.user.authorAvatar" alt="" />
        <div class="code-info">
          <div class="code-name">{{ codeDetail?.title }}</div>
          <div class="info-list">
            <div class="icon-info">
              <i class="fa fa-user"></i>
              <span>{{ codeDetail?.user.authorName }}</span>
            </div>
            <div class="icon-info">
              <i class="fa fa-calendar"></i>
              <span>{{ formatTime(codeDetail?.createdAt!, "YYYY-MM-DD hh:ss:mm") }}</span>
            </div>
            <div class="icon-info">
              <i class="fa fa-eye"></i>
              <span>{{ codeDetail?.views }}</span>
            </div>
            <div class="icon-info operator">
              <i class="fa fa-thumbs-o-up"></i>
              <span>{{ codeDetail?.liked }}</span>
            </div>
            <div class="icon-info operator">
              <i class="fa fa-star-o"></i>
              <span>{{ codeDetail?.collectCount }}</span>
            </div>
          </div>
        </div>
        <div class="code-operator">
          <i class="fa fa-ellipsis-h"></i>
        </div>
      </div>
    </template>
    <div class="code-detail_content">
      <div class="code-detail-operator">
        <div class="code-detail-operator__left">
          <el-tag type="info" class="lan">
            <div style="display: flex; align-items: center; color: var(--el-text-color-primary)">
              <img src="@/assets/image/JS.jpg" alt="" /> <span style="margin-left: 5px">JavaScript</span>
            </div>
          </el-tag>
          <el-tag type="info"><span style="color: var(--el-text-color-primary)">7.13KB</span></el-tag>
        </div>
        <div class="code-detail-operator__right">
          <el-tooltip content="将代码文件下载至本地" placement="bottom" effect="light">
            <el-tag effect="plain" class="operator-item"><i class="fa fa-cloud-download"></i> <span>下载</span></el-tag>
          </el-tooltip>
          <el-tooltip content="复制代码内容" placement="bottom" effect="light">
            <el-tag effect="plain" class="operator-item"><i class="fa fa-chain-broken"></i> <span>复制</span></el-tag>
          </el-tooltip>
          <el-tooltip content="将代码导出为图片" placement="bottom" effect="light">
            <el-tag effect="plain" class="operator-item"
              ><i class="fa fa-file-image-o"></i> <span>导出图片</span></el-tag
            >
          </el-tooltip>
          <el-tag effect="plain" class="operator-item"><i class="fa fa-share"></i> <span>分享</span></el-tag>
        </div>
      </div>
      <div class="code-detail-fragment">
        <fs-code-mirror ref="codeMirrorRef" :code="codeDetail?.content || ''" :disabled="true" height="100px" />
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import FsCodeMirror from "@/components/FsCodeMirror/FsCodeMirror.vue";
import { getCurrentCode } from "@/service/api/codeRequest";
import type { ICodeDetail } from "@/types/codeType";
import { formatTime } from "@/utils/formatTime";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
const codeMirrorRef = ref<InstanceType<typeof FsCodeMirror>>();

const $route = useRoute();
const codeId = $route.params.id as string;
const codeDetail = ref<ICodeDetail>();

onMounted(async () => {
  await getCodeDetail(codeId);
  codeMirrorRef.value?.configCodeMirror(codeDetail.value?.lan!);
});

const getCodeDetail = async (codeId: string) => {
  const res = await getCurrentCode(codeId);
  codeDetail.value = res.data;
};
</script>

<style scoped lang="less">
.code-detail {
  &_header {
    display: flex;
    position: relative;
    img {
      width: 50px;
      height: 50px;
    }
    .code-info {
      margin-left: 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .code-name {
        font-weight: 700;
        font-size: 20px;
      }
    }
    .info-list {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 14px;
      .icon-info {
        display: flex;
        align-items: center;
        color: var(--el-text-color-secondary);
        span {
          margin-left: 5px;
        }
      }
      .operator {
        cursor: pointer;
        &:hover {
          color: var(--el-text-color-primary);
        }
      }
    }
    .code-operator {
      position: absolute;
      right: 5px;
      top: 0;
      z-index: 10;
      font-size: 20px;
      cursor: pointer;
    }
  }
  &_content {
    padding: 20px;
    .code-detail-operator {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;
      img {
        width: 15px;
        height: 15px;
      }
      &__left,
      &__right {
        display: flex;
        gap: 10px;
        align-items: center;
        .operator-item {
          cursor: pointer;
          &:hover {
            color: var(--el-text-color-secondary);
          }
        }
      }
    }
  }
}
</style>
