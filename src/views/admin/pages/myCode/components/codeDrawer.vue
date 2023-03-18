<template>
  <div class="code-drawer-container">
    <el-drawer v-model="showDrawer" title="编辑代码" append-to-body>
      <div class="code-form">
        <el-form ref="formRef" :model="codeForm">
          <el-form-item label="代码编号">
            <el-input v-model="currentId" disabled></el-input>
          </el-form-item>
          <el-form-item label="代码标题">
            <el-input v-model="codeForm.title"></el-input>
          </el-form-item>
          <el-form-item label="编程语言">
            <el-select v-model="codeForm.lan" @change="handleLanChange" placeholder="请选择合适的语言">
              <el-option v-for="(item, index) in codes" :key="index" :label="item" :value="item" />
            </el-select>
          </el-form-item>
          <el-form-item label="是否加密">
            <el-switch v-model="codeForm.isPwd"></el-switch>
          </el-form-item>
          <el-form-item label="重置密码" v-show="codeForm.isPwd">
            <el-input v-model="codeForm.pwd" placeholder="请输入重置后的密码"></el-input>
          </el-form-item>
          <el-form-item label="是否公开">
            <el-radio-group v-model="codeForm.status">
              <el-radio :label="1">公开</el-radio>
              <el-radio :label="0">私有</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="代码内容">
            <fs-code-mirror ref="codeMirrorRef" :code="codeForm.content" height="auto" :disabled="false" />
          </el-form-item>
        </el-form>
        <div class="operator-btn">
          <el-button type="success" plain @click="showDrawer = false">取消</el-button>
          <el-button type="primary" plain @click="handleSaveCode" :loading="formLoading">保存修改</el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import FsCodeMirror from "@/components/FsCodeMirror/FsCodeMirror.vue";
import type { IMyCodeItem } from "@/types/codeType";
import useMyCode from "@/hooks/useMyCode";
import type { FormInstance } from "element-plus";

const emit = defineEmits<{
  (e: "refreshTable"): void;
}>();

// 表单 Ref
const formRef = ref<FormInstance>();

// code Ref
const codeMirrorRef = ref<InstanceType<typeof FsCodeMirror>>();

// 保存当前编辑id
const currentId = ref<string>("");

// 控制抽屉
const showDrawer = ref(false);

const { codeForm, formLoading, updateMyCodeData } = useMyCode(formRef);

// 语言切换时改变code编辑器样式
const handleLanChange = () => {
  codeMirrorRef.value?.configCodeMirror(codeForm.lan);
};

const handleSaveCode = () => {
  updateMyCodeData(currentId.value!, () => {
    emit("refreshTable");
    showDrawer.value = false;
  });
};

// 遍历code选项
const codes = ["cpp", "Java", "JavaScript", "Python", "PHP", "CSS", "Vue"];

// 控制抽屉+数据回显
const controllDrawer = (isShow: boolean, row: IMyCodeItem) => {
  showDrawer.value = isShow;
  currentId.value = row.id;
  codeForm.title = row.title;
  codeForm.lan = row.lan;
  codeForm.content = row.content;
  codeForm.isPwd = Boolean(row.isPwd);
  codeForm.status = row.status;
};

defineExpose({
  controllDrawer,
});
</script>

<style scoped lang="less">
.operator-btn {
  display: flex;
  justify-content: end;
  align-items: center;
}
</style>
