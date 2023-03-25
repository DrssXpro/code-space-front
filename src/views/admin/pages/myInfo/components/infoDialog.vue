<template>
  <el-dialog v-model="showDialog" title="编辑个人信息" width="25%" append-to-body>
    <div class="form-container">
      <el-form ref="formRef" :model="userState" :rules="updateRules">
        <el-form-item label="编辑用户名" labelWidth="100" prop="name">
          <el-input v-model="userState.name" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="编辑邮箱" labelWidth="100" prop="email">
          <el-input v-model="userState.email" placeholder="请输邮箱"></el-input>
        </el-form-item>
        <el-form-item label="编辑空间昵称" labelWidth="100" prop="nickName">
          <el-input v-model="userState.nickName" placeholder="请输入空间显示的昵称"></el-input>
        </el-form-item>
        <el-form-item label="改为默认头像" label-width="100">
          <el-switch v-model="userState.isDefault"></el-switch>
        </el-form-item>
        <el-form-item label="编辑头像" labelWidth="100">
          <el-upload
            class="avatar-uploader"
            :show-file-list="false"
            :on-change="getAvatarFile"
            :before-upload="beforeAvatarUpload"
            :auto-upload="false"
          >
            <img v-if="userState.avatar" :src="userState.avatar" class="avatar" />
            <div v-else class="upload-icon">+</div>
          </el-upload>
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="showDialog = false">取消</el-button>
        <el-button type="primary" @click="handleUpdateUserInfo">保存</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { reactive, ref, toRefs } from "vue";
import { ElMessage, type FormInstance, type UploadFile, type UploadProps } from "element-plus";
import useInfo from "@/hooks/useInfo";
import useUserStore from "@/stores/userStore";

const formRef = ref<FormInstance>();

const showDialog = ref(false);

// 获取到上传头像内容
const currentFile = ref<File>();

const { userInfo, cancelLogin } = toRefs(useUserStore());
const { userState, updateRules, updateMyInfo } = useInfo(formRef);

const handleUpdateUserInfo = () => {
  if (userInfo.value) {
    const userId = userInfo.value.id;
    updateMyInfo(userId, currentFile.value, () => {
      showDialog.value = false;
      cancelLogin.value();
    });
  } else {
    ElMessage.warning("未获取到用户信息");
  }
};

// 拿到上传文件
const getAvatarFile = (uploadFile: UploadFile) => {
  userState.avatar = URL.createObjectURL(uploadFile.raw!);
  currentFile.value = uploadFile.raw;
};

// 上传前检测
const beforeAvatarUpload: UploadProps["beforeUpload"] = (rawFile) => {
  if (rawFile.type !== "image/jpeg" && rawFile.type !== "image/png") {
    ElMessage.error("头像必须是jpg、png格式");
    return false;
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error("头像大小不能超过 2MB!");
    return false;
  }

  return true;
};

const controllDialog = (isShow: boolean) => {
  if (isShow && userInfo.value) {
    userState.name = userInfo.value.name;
    userState.email = userInfo.value.email;
    userState.avatar = userInfo.value.avatar;
    userState.nickName = userInfo.value.nickName;
  }
  showDialog.value = isShow;
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
