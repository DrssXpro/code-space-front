<template>
  <el-dialog
    v-model="isShow"
    :title="props.isEdit ? '编辑用户' : '添加用户'"
    :width="props.width || '25%'"
    append-to-body
  >
    <el-form>
      <el-form-item label="用户名" label-width="100">
        <el-input v-model="formState.name" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" label-width="100">
        <el-input v-model="formState.email" placeholder="请输入用户邮箱"></el-input>
      </el-form-item>
      <el-form-item label="密码" label-width="100" v-show="!props.isEdit">
        <el-input type="password" v-model="formState.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item label="角色" label-width="100" v-show="props.isEdit">
        <el-select v-model="formState.roleId" placeholder="请选择角色">
          <el-option v-for="(item, index) in roles" :value="item.id" :label="item.name" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="改为默认头像" label-width="100" v-show="props.isEdit">
        <el-switch v-model="isDefault"></el-switch>
      </el-form-item>
      <el-form-item label="用户状态" label-width="100">
        <el-radio-group v-model="formState.status">
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
import { addUserByAdmin, updateUserByAdmin } from "@/service/api/userRequest";
import type { IRoleItem } from "@/types/roleType";
import type { IUserAddByAdmin, IUserItem } from "@/types/userType";
import { ElMessage } from "element-plus";
import { onMounted, reactive, ref } from "vue";

const props = defineProps<{
  isEdit: boolean;
  width?: string;
}>();

const emit = defineEmits<{
  (e: "refreshTable"): void;
}>();

// 模态框状态
const isShow = ref(false);

// 当前用户id：编辑使用
const currentId = ref<string>();

// 角色列表：选择角色使用
const roles = ref<IRoleItem[]>();

// 表单参数
const formState: IUserAddByAdmin = reactive({
  name: "",
  email: "",
  password: "",
  roleId: 1,
  status: 1,
});

// 编辑用：是否启用为默认头像（用来修改违规头像）
const isDefault = ref(false);

onMounted(() => {
  getRoleList({ limit: 100, offset: 0 }).then((res) => {
    roles.value = res.data.rows;
  });
});

// 提交表单
const handleSubmit = async () => {
  if (!props.isEdit) {
    try {
      const res = await addUserByAdmin({ ...formState });
      res.code === 1000 ? ElMessage.success(res.message) : ElMessage.warning(res.message);
      isShow.value = res.code === 1000 ? false : true;
    } catch (err) {
      ElMessage.warning("添加失败");
    }
  } else {
    try {
      const res = await updateUserByAdmin(currentId.value!, {
        name: formState.name,
        email: formState.email,
        roleId: formState.roleId,
        status: formState.status,
        isDefault: isDefault.value,
      });
      res.code === 1000 ? ElMessage.success(res.message) : ElMessage.warning(res.message);
      isShow.value = res.code === 1000 ? false : true;
    } catch (err) {
      ElMessage.warning("修改失败");
    }
  }
  emit("refreshTable");
};

const controllModal = (show: boolean, formData?: IUserItem) => {
  isShow.value = show;
  formState.name = formData ? formData.name : "";
  formState.email = formData ? formData.email : "";
  formState.roleId = formData ? formData.role.roleId : 1;
  formState.status = formData ? formData.status : 1;
  formState.password = "";
  currentId.value = formData ? formData.id : "";
};

defineExpose({
  controllModal,
});
</script>

<style scoped lang="less"></style>
