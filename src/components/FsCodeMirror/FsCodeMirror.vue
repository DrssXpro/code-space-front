<template>
  <div class="fs-code-mirror">
    <codemirror
      v-model="codeContent"
      placeholder="请输入代码片段"
      :style="{
        minHeight: `${props.height}`,
        width: '100%',
        borderRadius: '10px',
        border: 'var(--el-border)',
        fontSize: '16px',
      }"
      :autofocus="true"
      :indent-with-tab="true"
      :tab-size="2"
      :extensions="extensions"
      :disabled="props.disabled"
      @ready="handleReady"
      @change="handleCodeChange"
    />
  </div>
</template>

<script setup lang="ts">
import { shallowRef, ref, watch, onMounted } from "vue";
import { Codemirror } from "vue-codemirror";
import { language, theme } from "./config";
const view = shallowRef();
const codeContent = ref("");
const props = defineProps<{
  code: string;
  disabled: boolean;
  height?: string;
}>();

const emit = defineEmits<{
  (e: "update:code", value: string): void;
}>();


const darkTheme = theme.oneDark;
const extensions = shallowRef<any[]>([darkTheme]);

onMounted(() => {
  configCodeMirror("cpp");
});


watch(
  () => props.code,
  (newValue) => {
    codeContent.value = newValue;
  },
  {
    immediate: true,
  }
);

const configCodeMirror = (lan: string) => {
  extensions.value = [];
  extensions.value.push(language[lan]);
  extensions.value.push(darkTheme);
};

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
  :deep(.ͼo) {
    background-color: var(--el-bg-color-overlay) !important;
  }
}
</style>
