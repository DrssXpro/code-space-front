<template>
  <el-dialog v-model="showModal" title="编辑用户" append-to-body width="25%">
    <el-form ref="formRef" :model="userForm" :rules="spaceUserRules">
      <el-form-item label="用户id" label-width="70">
        <el-input v-model="currentId" disabled></el-input>
      </el-form-item>
      <el-form-item label="空间昵称" label-width="70" prop="nickName">
        <el-input placeholder="编辑空间昵称" v-model="userForm.nickName"></el-input>
      </el-form-item>
      <el-form-item label="选择角色" label-width="70" prop="roleId">
        <el-select v-model="userForm.roleId" class="m-2" placeholder="请为该用户分配角色">
          <el-option v-for="item in roleList" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="showModal = false">取消</el-button>
      <el-button type="primary" :loading="formLoading" @click="handleSubmit">确定</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import useSpaceUser from "@/hooks/useSpaceUser";
import { getRoleListBySpace } from "@/service/api/roleRequest";
import type { ISpaceUserItem } from "@/types/userType";
import type { FormInstance } from "element-plus";

interface IRoleName {
  id: number;
  name: string;
}
const emit = defineEmits<{
  (e: "refreshTable"): void;
}>();

// 表单实例
const formRef = ref<FormInstance>();

// 控制dialog
const showModal = ref(false);

// 编辑id
const currentId = ref("");

// 获取角色
const roleList = ref<IRoleName[]>([{ id: 3, name: "普通用户" }]);

const { userForm, formLoading, spaceUserRules, editSpaceUserData } = useSpaceUser(formRef);

onMounted(async () => {
  const res = await getRoleListBySpace({ limit: 100, offset: 0 });
  roleList.value.push(...res.data.rows.map((item) => ({ id: item.id, name: item.name })));
});

// 提交邀请
const handleSubmit = () => {
  editSpaceUserData(currentId.value, () => {
    emit("refreshTable");
    showModal.value = false;
  });
};

// 控制dialog
const controllModal = (show: boolean, row?: ISpaceUserItem) => {
  showModal.value = show;
  currentId.value = row ? row.id : "";
  userForm.nickName = row ? row.nickName : "";
  userForm.roleId = row ? row["role.roleId"] : 3;
};

defineExpose({
  controllModal,
});
</script>

<style scoped lang="less"></style>
