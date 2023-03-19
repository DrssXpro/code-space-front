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
          <el-form-item label="代码状态" label-width="70px">
            <el-select v-model="codeForm.status" placeholder="设置当前状态">
              <el-option v-for="(item, index) in statusOptions" :key="index" :label="item.text" :value="item.value" />
            </el-select>
          </el-form-item>

          <el-form-item label="代码内容" label-width="70px" prop="content">
            <fs-code-mirror ref="codeMirrorRef" :code="codeForm.content" height="auto" :disabled="false" />
          </el-form-item>
        </el-form>
        <div class="operator-btn">
          <el-button type="success" plain @click="controllDrawer(false)">取消</el-button>
          <el-button type="primary" plain :loading="formLoading" @click="updateCode">保存修改</el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import FsCodeMirror from "@/components/FsCodeMirror/FsCodeMirror.vue";
import useSpaceCode from "@/hooks/useSpaceCode";
import type { ISpaceMasterCodeItem } from "@/types/codeType";
import { ElMessage, type FormInstance } from "element-plus";

const emit = defineEmits<{
  (e: "refreshTable"): void;
}>();

const formRef = ref<FormInstance>();

// 当前代码id
const currentId = ref("");

// 当前代码作者
const currentAuthor = ref("");

// 代码展示实例
const codeMirrorRef = ref<InstanceType<typeof FsCodeMirror>>();

// 控制抽屉
const showDrawer = ref(false);

const { codeForm, formLoading, codeRules, updateSpaceCodeData } = useSpaceCode(formRef);

// 更新代码
const updateCode = () => {
  if (codeForm.content.length < 10 || codeForm.content.length > 1000) {
    ElMessage.warning("代码长度在10-1000个字符之间");
    return;
  }
  updateSpaceCodeData(currentId.value, () => {
    controllDrawer(false);
    emit("refreshTable");
  });
};

// 更改代码展示语言
const handleLanChange = () => {
  codeMirrorRef.value?.configCodeMirror(codeForm.lan);
};

// code选项
const codes = ["cpp", "Java", "JavaScript", "Python", "PHP", "CSS", "Vue"];

// status选项
const statusOptions = [
  {
    value: 1,
    text: "正常",
  },
  {
    value: 2,
    text: "优秀",
  },
];

// 控制dialog
const controllDrawer = (isShow: boolean, row?: ISpaceMasterCodeItem) => {
  showDrawer.value = isShow;
  codeForm.content = row ? row.content : "";
  codeForm.lan = row ? row.lan : "cpp";
  codeForm.status = row ? row.status : 1;
  codeForm.title = row ? row.title : "";
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
