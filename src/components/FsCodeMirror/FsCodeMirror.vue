<template>
  <div class="fs-code-mirror">
    <codemirror
      v-model="codeContent"
      placeholder="请输入代码片段"
      :style="{ height: '400px', width: '100%', borderRadius: '10px', border: 'var(--el-border)' }"
      :autofocus="true"
      :indent-with-tab="true"
      :tab-size="2"
      :extensions="extensions"
      @ready="handleReady"
      @change="handleCodeChange"
    />
  </div>
</template>

<script setup lang="ts">
import { shallowRef, ref, watch } from "vue";
import { Codemirror } from "vue-codemirror";
import { language, theme } from "./config";
const view = shallowRef();
const codeContent = ref("");
const props = defineProps<{
  code: string;
}>();

const extensions = ref<any[]>([]);

const configCodeMirror = (lan: string, isDark: boolean) => {
  extensions.value = [];
  extensions.value.push(language[lan]);
  isDark && extensions.value.push(theme.oneDark);
};

watch(
  () => props.code,
  (newValue) => {
    codeContent.value = newValue;
  },
  {
    immediate: true,
  }
);

const emit = defineEmits<{
  (e: "update:code", value: string): void;
}>();

const handleReady = (payload: any) => {
  view.value = payload.view;
};
const handleCodeChange = (code: string) => {
  emit("update:code", code);
};

defineExpose({
  configCodeMirror,
});
</script>

<style scoped lang="less">
.fs-code-mirror {
  width: 100%;
  height: 100%;
  // border: var(--el-border);
  :deep(.ͼo) {
    background-color: var(--el-bg-color-overlay) !important;
  }
  // :deep(.ͼo .cm-gutters) {
  //   background-color: var(--el-bg-color-overlay);
  // }
}
</style>
