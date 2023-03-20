<template>
  <el-dialog
    v-model="showModal"
    :title="props.isEdit ? '编辑用户' : '添加用户'"
    :width="props.width || '25%'"
    append-to-body
  >
    <el-form ref="formRef" :model="userForm" :rules="userRules">
      <el-form-item label="用户名" label-width="100" prop="name">
        <el-input v-model="userForm.name" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" label-width="100" prop="email">
        <el-input v-model="userForm.email" placeholder="请输入用户邮箱"></el-input>
      </el-form-item>
      <el-form-item label="密码" label-width="100" v-if="!props.isEdit" prop="password">
        <el-input type="password" v-model="userForm.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item label="角色" label-width="100" v-if="props.isEdit" prop="roleId">
        <el-select v-model="userForm.roleId" placeholder="请选择角色">
          <el-option v-for="(item, index) in roles" :value="item.id" :label="item.name" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="改为默认头像" label-width="100" v-if="props.isEdit">
        <el-switch v-model="userForm.isDefault"></el-switch>
      </el-form-item>
      <el-form-item label="编辑头像" labelWidth="100" v-if="props.isEdit">
        <el-upload
          class="avatar-uploader"
          :show-file-list="false"
          :on-change="getAvatarFile"
          :before-upload="beforeAvatarUpload"
          :auto-upload="false"
        >
          <img v-if="userForm.avatar" :src="userForm.avatar" class="avatar" />
          <div v-else class="upload-icon">+</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="用户状态" label-width="100">
        <el-radio-group v-model="userForm.status">
          <el-radio :label="1">正常</el-radio>
          <el-radio :label="0">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="controllModal(false)">取消</el-button>
      <el-button type="primary" @click="handleSubmit">确定</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { getRoleList } from "@/service/api/roleRequest";
import type { IRoleItem } from "@/types/roleType";
import type { IUserItem } from "@/types/userType";
import { DEFAULT_AVATAR } from "@/config/config";
import { ElMessage, type FormInstance, type UploadFile, type UploadProps } from "element-plus";
import { onMounted, ref } from "vue";
import useAdminUser from "@/hooks/useAdminUser";

const formRef = ref<FormInstance>();

const { userForm, userRules, updateUserByAdminData, addNewUserByAdminData } = useAdminUser(formRef);
const props = defineProps<{
  isEdit: boolean;
  width?: string;
}>();

const emit = defineEmits<{
  (e: "refreshTable"): void;
}>();

// 模态框状态
const showModal = ref(false);

// 当前用户id：编辑使用
const currentId = ref<string>();

// 拿到上传的图片文件
const currentFile = ref<File>();

// 角色列表：选择角色使用
const roles = ref<IRoleItem[]>();

onMounted(() => {
  getRoleList({ limit: 100, offset: 0, kw: "", status: 1 }).then((res) => {
    roles.value = res.data.rows;
  });
});

// 拿到上传文件
const getAvatarFile = (uploadFile: UploadFile) => {
  userForm.avatar = URL.createObjectURL(uploadFile.raw!);
  currentFile.value = uploadFile.raw;
};

// 上传前检测
const beforeAvatarUpload: UploadProps["beforeUpload"] = (rawFile) => {
  if (rawFile.type !== "image/jpeg") {
    ElMessage.error("必须上传图片");
    return false;
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error("头像大小不能超过 2MB!");
    return false;
  }

  return true;
};

// 提交表单
const handleSubmit = () => {
  props.isEdit
    ? updateUserByAdminData(currentId.value!, currentFile.value, () => {
        emit("refreshTable");
        showModal.value = false;
      })
    : addNewUserByAdminData(() => {
        emit("refreshTable");
        showModal.value = false;
      });
};

const controllModal = (show: boolean, formData?: IUserItem) => {
  showModal.value = show;
  userForm.name = formData ? formData.name : "";
  userForm.email = formData ? formData.email : "";
  userForm.roleId = formData ? formData["role.roleId"] : 1;
  userForm.status = formData ? formData.status : 1;
  userForm.avatar = formData ? formData.avatar : "";
  userForm.isDefault = formData ? (formData.avatar === DEFAULT_AVATAR ? true : false) : false;
  userForm.password = "";
  currentId.value = formData ? formData.id : "";
};

defineExpose({
  controllModal,
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
