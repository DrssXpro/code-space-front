<template>
  <el-dialog v-model="showDialog" title="编辑个人信息" width="25%" append-to-body>
    <div class="form-container">
      <el-form>
        <el-form-item label="编辑用户名" labelWidth="100px">
          <el-input v-model="state.userName" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="编辑邮箱" labelWidth="100px">
          <el-input v-model="state.email" placeholder="请输邮箱"></el-input>
        </el-form-item>
        <el-form-item label="编辑空间昵称" labelWidth="100px">
          <el-input v-model="state.nickName" placeholder="请输入空间显示的昵称"></el-input>
        </el-form-item>
        <el-form-item label="编辑头像" labelWidth="100px">
          <el-upload
            class="avatar-uploader"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
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
        <el-button type="primary" @click="showDialog = false">保存</el-button>
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
  nickName: "",
  imageUrl: "",
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
defineExpose({
  controllDialog,
});
</script>

<style scoped lang="less">
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
