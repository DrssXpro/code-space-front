<template>
  <div class="share-form">
    <el-form>
      <el-form-item label="代码名称">
        <el-input v-model="state.title" placeholder="请输入代码名称"></el-input>
      </el-form-item>
      <el-form-item label="选择语言">
        <el-select v-model="state.lan" @change="handleLanChange" placeholder="请选择合适的语言">
          <el-option v-for="(item, index) in codes" :key="index" :label="item.text" :value="index" />
        </el-select>
      </el-form-item>
      <el-form-item label="是否加密">
        <el-switch
          v-model="state.isCode"
          style="--el-switch-on-color: var(--choose-color); --el-switch-off-color: var(--bg-color)"
        ></el-switch>
      </el-form-item>
      <el-form-item label="访问密码" v-show="state.isCode">
        <el-input v-model="state.code" type="password"></el-input>
      </el-form-item>
      <el-form-item label="公开状态">
        <el-radio-group v-model="state.isPrivate">
          <el-radio label="1">公开</el-radio>
          <el-radio label="2">私有</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="代码片段">
        <fs-code-mirror ref="codeMirrorRef" :code="state.content" @update:code="handleUpdateCode" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import FsCodeMirror from "@/components/FsCodeMirror/FsCodeMirror.vue";
const codeMirrorRef = ref<InstanceType<typeof FsCodeMirror>>();
const state = reactive({
  title: "",
  isCode: false,
  isPrivate: false,
  lan: 0,
  content: "",
  code: "",
});
onMounted(() => {
  codeMirrorRef.value?.configCodeMirror(codes[state.lan].text, true);
});

const handleUpdateCode = (code: string) => {
  state.content = code;
};

const handleLanChange = () => {
  codeMirrorRef.value?.configCodeMirror(codes[state.lan].text, true);
};

const codes = [
  {
    text: "cpp",
  },
  {
    text: "Java",
  },
  {
    text: "JavaScript",
  },
  {
    text: "Python",
  },
  {
    text: "PHP",
  },
  {
    text: "HTML",
  },
  {
    text: "CSS",
  },
  {
    text: "SQL",
  },
  {
    text: "Vue",
  },
];
</script>

<style scoped lang="less"></style>
