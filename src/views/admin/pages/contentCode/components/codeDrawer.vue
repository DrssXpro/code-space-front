<template>
  <div class="code-drawer-container">
    <el-drawer v-model="showDrawer" title="编辑代码" append-to-body>
      <div class="code-form">
        <el-form ref="formRef" :model="codeForm" :rules="codeRules">
          <el-form-item label="代码编号" label-width="70px">
            <el-input v-model="currentId" disabled></el-input>
          </el-form-item>
          <el-form-item label="作者" label-width="70px">
            <el-input v-model="currentAuthor" disabled></el-input>
          </el-form-item>
          <el-form-item label="代码标题" label-width="70px" prop="title">
            <el-input v-model="codeForm.title"></el-input>
          </el-form-item>
          <el-form-item label="编程语言" label-width="70px" prop="lan">
            <el-select v-model="codeForm.lan" @change="handleLanChange" placeholder="请选择合适的语言">
              <el-option v-for="(item, index) in codes" :key="index" :label="item" :value="item" />
            </el-select>
          </el-form-item>
          <el-form-item label="是否加密">
            <el-switch v-model="codeForm.isPwd"></el-switch>
          </el-form-item>
          <el-form-item label="加密密码" v-if="codeForm.isPwd" prop="pwd">
            <el-input v-model="codeForm.pwd" placeholder="重置代码密码"></el-input>
          </el-form-item>
          <el-form-item label="代码内容" label-width="70px" prop="content">
            <fs-code-mirror ref="codeMirrorRef" :code="codeForm.content" height="auto" :disabled="false" />
          </el-form-item>
        </el-form>
        <div class="operator-btn">
          <el-button type="success" plain @click="controllDrawer(false)">取消</el-button>
          <el-button type="primary" plain :loading="formLoading" @click="handleSubmit">保存修改</el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import FsCodeMirror from "@/components/FsCodeMirror/FsCodeMirror.vue";
import useAdminCode from "@/hooks/useAdminCode";
import type { FormInstance } from "element-plus";
import type { IAdminCodeItem } from "@/types/codeType";

const emit = defineEmits<{
  (e: "refreshTable"): void;
}>();

const codeMirrorRef = ref<InstanceType<typeof FsCodeMirror>>();

const formRef = ref<FormInstance>();

const currentId = ref("");

const currentAuthor = ref("");

const { codeForm, codeRules, formLoading, updateCodeByAdminData } = useAdminCode(formRef);

const showDrawer = ref(false);

const handleLanChange = () => {
  codeMirrorRef.value?.configCodeMirror(codeForm.lan);
};

// code选项
const codes = ["cpp", "Java", "JavaScript", "Python", "PHP", "CSS", "Vue"];

// 提交编辑表单
const handleSubmit = () => {
  updateCodeByAdminData(currentId.value!, () => {
    emit("refreshTable");
    controllDrawer(false);
  });
};

// 控制抽屉 + 数据回显
const controllDrawer = (isShow: boolean, row?: IAdminCodeItem) => {
  showDrawer.value = isShow;
  codeForm.title = row ? row.title : "";
  codeForm.content = row ? row.content : "";
  codeForm.lan = row ? row.lan : "cpp";
  codeForm.isPwd = row ? Boolean(row.isPwd) : false;
  currentId.value = row ? row.id : "";
  currentAuthor.value = row ? row["user.authorName"] : "";
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
