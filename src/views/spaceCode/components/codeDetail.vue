<template>
  <el-card shadow="never">
    <template #header>
      <div class="code-detail_header">
        <img :src="spaceCodeDetail?.user.authorAvatar" alt="" />
        <div class="code-info">
          <div class="code-name">{{ spaceCodeDetail?.title }}</div>
          <div class="info-list">
            <div class="icon-info">
              <i class="fa fa-user"></i>
              <span>{{ spaceCodeDetail?.user.authorName }}</span>
            </div>
            <div class="icon-info">
              <i class="fa fa-calendar"></i>
              <span>{{ formatTime(spaceCodeDetail?.createdAt!, "YYYY-MM-DD hh:ss:mm") }}</span>
            </div>
            <div class="icon-info">
              <i class="fa fa-eye"></i>
              <span>{{ spaceCodeDetail?.views }}</span>
            </div>
            <div class="icon-info operator" @click="addCodeLikeBySpace(spaceCodeDetail?.id!)">
              <i class="fa fa-thumbs-o-up"></i>
              <span>{{ spaceCodeDetail?.liked }}</span>
            </div>
          </div>
        </div>
      </div>
    </template>
    <div class="code-detail_content">
      <div class="code-detail-operator">
        <div class="code-detail-operator__left">
          <el-tag type="info" class="lan">
            <div style="display: flex; align-items: center">
              <img :src="`/src/assets/icon/${spaceCodeDetail?.lan}.svg`" alt="" />
            </div>
          </el-tag>
          <el-tag type="success"
            ><span>{{ spaceCodeDetail?.space.spaceName }}</span></el-tag
          >
          <el-tag type="info"
            ><span style="color: var(--el-text-color-primary)">{{ spaceCodeDetail?.line }} lines</span></el-tag
          >
        </div>
        <div class="code-detail-operator__right">
          <el-tooltip content="将代码文件下载至本地" placement="bottom" effect="light">
            <el-tag
              effect="plain"
              class="operator-item"
              @click="downloadCode(spaceCodeDetail!.title, spaceCodeDetail!.content, spaceCodeDetail!.lan)"
              ><i class="fa fa-cloud-download"></i> <span>下载</span></el-tag
            >
          </el-tooltip>
          <el-tooltip content="复制代码内容" placement="bottom" effect="light">
            <el-tag effect="plain" class="operator-item" @click="copyCode(spaceCodeDetail?.content || '')"
              ><i class="fa fa-chain-broken"></i> <span>复制</span></el-tag
            >
          </el-tooltip>
          <el-tooltip content="将代码导出为图片" placement="bottom" effect="light">
            <el-tag effect="plain" class="operator-item" @click="codeExportImage(codeFragmentRef!)"
              ><i class="fa fa-file-image-o"></i> <span>导出图片</span></el-tag
            >
          </el-tooltip>
          <el-tag effect="plain" class="operator-item" @click="() => copyCodeLink()"
            ><i class="fa fa-share"></i> <span>分享</span></el-tag
          >
        </div>
      </div>
      <div class="code-detail-fragment" ref="codeFragmentRef">
        <fs-code-mirror ref="codeMirrorRef" :code="spaceCodeDetail?.content || ''" :disabled="true" height="100px" />
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import FsCodeMirror from "@/components/FsCodeMirror/FsCodeMirror.vue";
import { formatTime } from "@/utils/formatTime";
import { __debounce } from "@/utils/tools";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import useFrontCode from "@/hooks/useFrontCode";
import useCodeTool from "@/hooks/useCodeTool";

const emit = defineEmits<{
  (e: "detailReady", authorId: string): void;
}>();

const { spaceCodeDetail, addCodeLikeBySpace, addCodeViewBySpace, getSpaceCodeDetail } = useFrontCode();
const { downloadCode, copyCode, codeExportImage, copyCodeLink } = useCodeTool();

const codeFragmentRef = ref<HTMLElement>();
const $route = useRoute();
const codeId = $route.params.id as string; // 拿到当前codeId

const codeMirrorRef = ref<InstanceType<typeof FsCodeMirror>>();

onMounted(async () => {
  await addCodeViewBySpace(codeId);
  await getSpaceCodeDetail(codeId);
  codeMirrorRef.value?.configCodeMirror(spaceCodeDetail.value?.lan!); // 设置codeMirror语言
  emit("detailReady", spaceCodeDetail.value!.user.authorId);
});
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
