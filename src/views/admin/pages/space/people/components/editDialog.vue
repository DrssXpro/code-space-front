<template>
  <el-dialog v-model="showDialog" title="编辑人员" width="25%" append-to-body>
    <div class="form-container">
      <el-form>
        <el-form-item label="编辑昵称" labelWidth="100px">
          <el-input v-model="state.userName" placeholder="请输入在空间显示的昵称"></el-input>
        </el-form-item>
        <el-form-item label="默认头像" labelWidth="100px">
          <el-switch v-model="state.isDefault"></el-switch>
        </el-form-item>
        <el-form-item label="编辑头像" labelWidth="100px">
          <el-upload
            class="avatar-uploader"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :disabled="state.isDefault"
          >
            <img v-if="state.imageUrl" :src="state.imageUrl" class="avatar" />
            <div v-else class="upload-icon">+</div>
          </el-upload>
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="showDialog = false">取消</el-button>
        <el-button type="primary" @click="showDialog = false">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { ElMessage, type UploadProps } from "element-plus";

const showDialog = ref(false);
const state = reactive({
  userName: "",
  email: "",
  password: "",
  imageUrl: "",
  role: "",
  isDefault: false,
});

const controllDialog = (isShow: boolean) => {
  showDialog.value = isShow;
};

const handleAvatarSuccess: UploadProps["onSuccess"] = (response, uploadFile) => {
  // state.imageUrl = URL.createObjectURL(uploadFile.raw!);
  state.imageUrl = URL.createObjectURL(uploadFile.raw!);
};

const beforeAvatarUpload: UploadProps["beforeUpload"] = (rawFile) => {
  if (rawFile.type !== "image/jpeg") {
    ElMessage.error("Avatar picture must be JPG format!");
    return false;
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error("Avatar picture size can not exceed 2MB!");
    return false;
  }

  return true;
};

const codes = [
  {
    text: "C",
  },
  {
    text: "C++",
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
];

defineExpose({
  controllDialog,
});
</script>

<style scoped lang="less">
.tip {
  margin-left: 100px;
  color: var(--el-text-color-secondary);
  font-size: 14px;
}
.avatar-uploader {
  border: 1px dashed var(--el-border-color);
  width: 100px;
  height: 100px;
  display: block;
  .upload-icon {
    width: 100px;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 40px;
  }
}
</style>
