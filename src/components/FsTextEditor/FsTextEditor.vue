<template>
  <div class="fs-text-editor">
    <md-editor
      v-model="state.content"
      @onHtmlChanged="handleHtmlChange"
      theme="dark"
      :toolbarsExclude="['link', 'image', 'table', 'save', '=', 'github', 'catalog']"
    ></md-editor>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import MdEditor from "md-editor-v3";
import "md-editor-v3/lib/style.css";
const emit = defineEmits<{
  (e: "textHtml", str: string): void;
}>();
const state = reactive({
  content: "",
});

// 输入内容改变时触发
const handleHtmlChange = (str: string) => {
  emit("textHtml", str);
};

// 清空富文本内容
const clearContent = () => {
  state.content = "";
};

defineExpose({
  clearContent,
});
</script>

<style scoped lang="less">
.fs-text-editor {
  width: 100%;
  height: 400px;
  .md-editor-dark {
    --md-bk-color: var(--el-bg-color-overlay) !important;
  }
  :deep(.md-editor-toolbar-wrapper .md-editor-toolbar) {
    min-width: 500px;
  }
}
</style>
