<template>
  <el-card shadow="never" class="space-card">
    <div class="card-title">空间信息</div>
    <el-form ref="formRef" :model="formState" :rules="spaceRules">
      <el-form-item label="空间名称" label-width="90" prop="spacename">
        <el-input v-model="formState.spacename" placeholder="请输入空间名称"></el-input>
      </el-form-item>
      <el-form-item label="空间介绍" label-width="90" prop="spaceintroduce">
        <el-input type="textarea" v-model="formState.spaceintroduce" placeholder="请输入空间名称"></el-input>
      </el-form-item>
      <el-form-item label="空间邀请码" label-width="90" prop="inviteCode">
        <div class="invite-code">
          <el-input v-model="formState.inviteCode" placeholder="请生成邀请码" disabled></el-input>
          <el-button type="success" @click="generateInviteCode">生成</el-button>
        </div>
      </el-form-item>
      <el-form-item label="空间头像" label-width="90">
        <div class="avatar-form">
          <el-radio-group v-model="formState.isDefault">
            <el-radio :label="1">默认</el-radio>
            <el-radio :label="0">自定义</el-radio>
          </el-radio-group>
          <el-upload
            class="avatar-uploader"
            :show-file-list="false"
            :on-change="getAvatarFile"
            :before-upload="beforeAvatarUpload"
            :auto-upload="false"
            v-if="!formState.isDefault"
          >
            <img v-if="formState.avatar" :src="formState.avatar" class="avatar" />
            <div v-else class="upload-icon">+</div>
          </el-upload>
        </div>
      </el-form-item>
      <el-button type="info" class="btn" :loading="formLoading" @click="handleCreateSpace">提交</el-button>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import { ElMessage, type FormInstance, type UploadFile, type UploadProps } from "element-plus";
import { ref } from "vue";
import useSpace from "@/hooks/useSpace";
import useUserStore from "@/stores/userStore";

const formRef = ref<FormInstance>();

const emit = defineEmits<{
  (e: "createSuccess"): void;
}>();
const { spaceRules, formState, formLoading, submitToSpace, generateInviteCode } = useSpace(formRef);
const { getUserInfoData } = useUserStore();

const currentFile = ref<File>();
const handleCreateSpace = () => {
  submitToSpace(false, currentFile.value, () => {
    getUserInfoData(() => {
      emit("createSuccess");
    });
  });
};

const getAvatarFile = (uploadFile: UploadFile) => {
  formState.avatar = URL.createObjectURL(uploadFile.raw!);
  currentFile.value = uploadFile.raw;
};

const beforeAvatarUpload: UploadProps["beforeUpload"] = (rawFile) => {
  if (rawFile.type !== "image/jpeg" && rawFile.type !== "image/png") {
    ElMessage.error("头像必须是jpg、png格式");
    return false;
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error("头像大小不能超过2MB");
    return false;
  }

  return true;
};
</script>

<style scoped lang="less">
.space-card {
  width: 350px;
  padding: 20px;
  .card-title {
    margin-bottom: 20px;
    text-align: center;
    font-size: 20px;
  }
  .invite-code {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .btn {
    display: block;
    margin: 0 auto;
    width: 140px;
  }
}
.avatar-form {
  display: flex;
  flex-direction: column;
}
.avatar-uploader {
  border: 1px dashed var(--el-border-color);
  width: 100px;
  height: 100px;
  display: block;
  margin-top: 10px;
  .avatar {
    width: 100px;
    height: 100px;
  }
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
