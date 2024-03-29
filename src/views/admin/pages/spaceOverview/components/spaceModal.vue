<template>
  <el-dialog v-model="isShow" title="编辑空间信息" width="25%" append-to-body>
    <el-form ref="formRef" :model="formState" :rules="spaceRules">
      <el-form-item label="空间名称" label-width="90" prop="spacename">
        <el-input v-model="formState.spacename" placeholder="请输入空间名称"></el-input>
      </el-form-item>
      <el-form-item label="空间介绍" label-width="90" prop="spaceintroduce">
        <el-input type="textarea" v-model="formState.spaceintroduce" placeholder="请输入空间介绍"></el-input>
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
      <el-button type="info" class="btn" :loading="formLoading" @click="handleSubmitEdit">提交</el-button>
    </el-form>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import useSpace from "@/hooks/useSpace";
import { ElMessage, type FormInstance, type UploadFile, type UploadProps } from "element-plus";
import type { ISpaceDetail } from "@/types/spaceType";
import mitter from "@/utils/mitter";
const formRef = ref<FormInstance>();

const isShow = ref(false);

const { formState, formLoading, spaceRules, submitToSpace, generateInviteCode } = useSpace(formRef);

// 获取选择的头像
const currentFile = ref<File>();

// 提交修改表单
const handleSubmitEdit = () => {
  // 成功后关闭弹窗
  submitToSpace(true, currentFile.value, () => {
    isShow.value = false;
    mitter.emit("refreshInfo");
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

// 控制dialog显示
const controllModal = (show: boolean, detail?: ISpaceDetail) => {
  isShow.value = show;
  formState.spacename = detail?.spaceDetail.name || "";
  formState.spaceintroduce = detail?.spaceDetail.introduce || "";
  formState.inviteCode = detail?.spaceDetail.inviteCode || "";
  formState.avatar = detail?.spaceDetail.avatar || "";
};

defineExpose({
  controllModal,
});
</script>

<style scoped lang="less">
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
