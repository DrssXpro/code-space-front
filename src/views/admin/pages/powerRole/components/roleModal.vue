<template>
  <el-dialog v-model="showModal" :title="props.isEdit ? '编辑角色' : '创建角色'" :width="props.width || '25%'">
    <el-form ref="formRef" :model="formState" :rules="roleRules">
      <el-form-item label="角色名称" label-width="100" prop="name">
        <el-input v-model="formState.name" placeholder="请输入角色名称"></el-input>
      </el-form-item>
      <el-form-item label="角色标识" label-width="100" prop="roleChar">
        <el-input v-model="formState.roleChar" placeholder="请输入角色标识"></el-input>
      </el-form-item>
      <el-form-item label="角色简介" label-width="100" prop="introduce">
        <el-input type="textarea" v-model="formState.introduce" placeholder="请输入角色简介" maxlength="20"></el-input>
      </el-form-item>
      <el-form-item label="角色状态" label-width="100" prop="status">
        <el-radio-group v-model="formState.status">
          <el-radio :label="1">正常</el-radio>
          <el-radio :label="0">停用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="角色权限" label-width="100" prop="menuList">
        <el-tree
          ref="treeRef"
          :data="allMenus"
          show-checkbox
          node-key="id"
          :props="{ children: 'children', label: 'name' }"
        >
        </el-tree>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="controllModal(false)">取消</el-button>
      <el-button type="primary" @click="handleSubmit" :loading="formLoading">确定</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, watch } from "vue";
import { ElTree, type FormInstance } from "element-plus";
import type { IRoleFormPayload } from "@/types/roleType";
import usePowerRole from "@/hooks/usePowerRole";
interface IRoleDataBack extends IRoleFormPayload {
  id: number;
}

const props = defineProps<{
  isEdit: boolean;
  width?: string;
  currentPower: number[];
}>();

const emit = defineEmits<{
  (e: "refreashTable"): void;
}>();

const treeRef = ref<InstanceType<typeof ElTree>>();

const formRef = ref<FormInstance>();

const {
  showModal,
  formLoading,
  formState,
  allMenus,
  roleRules,
  getMenuListData,
  updateRoleDataByAdmin,
  addRoleDataByAdmin,
} = usePowerRole(formRef, treeRef);
// 模态框展示

// 编辑状态：当前id
const currentId = ref<number>();

// nextTick设置树形结构数据回显
watch(
  () => props.currentPower,
  (newValue) => {
    nextTick(() => {
      treeRef.value!.setCheckedKeys(newValue, false);
    });
  }
);

onMounted(() => {
  // 获取所有菜单权限列表
  getMenuListData();
});

// 提交表单
const handleSubmit = () => {
  props.isEdit
    ? updateRoleDataByAdmin(currentId.value!, () => {
        controllModal(false);
        emit("refreashTable");
      })
    : addRoleDataByAdmin(() => {
        controllModal(false);
        emit("refreashTable");
      });
};

// 控制模态框展示与数据回显
const controllModal = (show: boolean, formData?: IRoleDataBack) => {
  showModal.value = show;
  formState.name = formData ? formData.name : "";
  formState.introduce = formData ? formData.introduce : "";
  formState.menuList = formData ? formData.menuList : [];
  formState.roleChar = formData ? formData.roleChar : "";
  formState.status = formData ? formData.status : 1;
  currentId.value = formData ? formData.id : -1;
};

defineExpose({
  controllModal,
});
</script>

<style scoped lang="less"></style>
