<template>
  <div class="share-form">
    <el-form>
      <el-form-item label="代码名称">
        <el-input v-model="formState.title" placeholder="请输入代码名称"></el-input>
      </el-form-item>
      <el-form-item label="选择语言">
        <el-select
          v-model="formState.lan"
          @change="handleLanChange"
          placeholder="请选择合适的语言"
          style="width: 300px"
        >
          <el-option v-for="(item, index) in LANGUAGE" :key="index" :label="item" :value="item" />
        </el-select>
      </el-form-item>
      <el-form-item label="空间任务">
        <el-select v-model="formState.taskId" placeholder="请选择空间里的一项任务提交" style="width: 300px" clearable>
          <el-option v-for="(item, index) in LANGUAGE" :key="index" :label="item" :value="item" />
        </el-select>
      </el-form-item>
      <el-form-item label="是否加密">
        <el-switch v-model="formState.isPwd" :disabled="isSpace"></el-switch>
      </el-form-item>
      <el-form-item label="访问密码" v-show="formState.isPwd">
        <el-input v-model="formState.pwd" type="password"></el-input>
      </el-form-item>
      <el-form-item label="公开状态">
        <el-radio-group v-model="formState.status" :disabled="isSpace">
          <el-radio label="1">公开</el-radio>
          <el-radio label="2">私有</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="代码片段">
        <fs-code-mirror
          ref="codeMirrorRef"
          :code="formState.content"
          :disabled="false"
          @update:code="handleUpdateCode"
          height="400px"
        />
      </el-form-item>
    </el-form>
    <div class="share-operator">
      <el-button type="info" style="width: 120px" @click="handleShareCode">发布代码</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from "vue";
import FsCodeMirror from "@/components/FsCodeMirror/FsCodeMirror.vue";
import { LANGUAGE } from "@/config/config";
import type { ISquareCodePayload } from "@/types/codeType";
import { addCodeBySquare } from "@/service/api/codeRequest";
import { ElMessage } from "element-plus";

const codeMirrorRef = ref<InstanceType<typeof FsCodeMirror>>();

const formState: ISquareCodePayload = reactive({
  title: "",
  content: "",
  lan: "JavaScript",
  isPwd: false,
  pwd: "",
  link: "123456",
  status: 1,
  taskId: 1,
});

// 判断是否在空间分享
const isSpace = computed(() => {
  if (formState.taskId) {
    formState.isPwd = false;
    formState.status = 0;
  }
  return !!formState.taskId;
});
onMounted(() => {
  codeMirrorRef.value?.configCodeMirror(formState.lan);
});

// 分享内容
const handleShareCode = async () => {
  const res = await addCodeBySquare({
    title: formState.title,
    content: formState.content,
    lan: formState.lan,
    isPwd: formState.isPwd,
    pwd: formState.pwd,
    status: formState.status,
    link: formState.link,
  });
  res.code === 1000 ? ElMessage.success("发布成功") : ElMessage.warning(res.message);
};

// 获取代码内容
const handleUpdateCode = (code: string) => {
  formState.content = code;
};

// 更改选择语言
const handleLanChange = () => {
  codeMirrorRef.value?.configCodeMirror(formState.lan);
};
</script>

<style scoped lang="less">
.share-operator {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
