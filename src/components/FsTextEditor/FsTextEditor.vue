<template>
  <div class="fs-text-editor">
    <md-editor
      v-model="state.content"
      @onHtmlChanged="handleHtmlChange"
      :theme="isDark ? 'dark' : 'light'"
      :toolbarsExclude="['link', 'image', 'table', 'save', '=', 'github', 'catalog']"
    ></md-editor>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { useDark } from "@vueuse/core";
import MdEditor from "md-editor-v3";
import "md-editor-v3/lib/style.css";
const emit = defineEmits<{
  (e: "textHtml", str: string): void;
}>();

const isDark = useDark();
const state = reactive({
  content: "",
});

const handleHtmlChange = (str: string) => {
  emit("textHtml", str);
};
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
