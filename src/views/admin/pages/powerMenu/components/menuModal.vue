<template>
  <el-dialog
    v-model="showModal"
    :title="props.isEdit ? '编辑菜单' : '添加菜单'"
    :width="props.width || '25%'"
    append-to-body
  >
    <el-form ref="formRef" :model="formState" :rules="menuRules">
      <el-form-item label="菜单名称" label-width="100" prop="name">
        <el-input v-model="formState.name" placeholder="请输入菜单名称"></el-input>
      </el-form-item>
      <el-form-item label="菜单图标" label-width="100" v-if="formState.menuType === 'M'" prop="menuIcon">
        <el-input v-model="formState.menuIcon" placeholder="按照font awesome4图标规范"></el-input>
      </el-form-item>
      <el-form-item label="组件路径" label-width="100" v-if="formState.menuType === 'D'" prop="comPath">
        <el-input v-model="formState.comPath" placeholder="请输入组件路径"></el-input>
      </el-form-item>
      <el-form-item label="路由路径" label-width="100" v-if="formState.menuType === 'D'" prop="routePath">
        <el-input v-model="formState.routePath" placeholder="请输入路由路径"></el-input>
      </el-form-item>
      <el-form-item label="权限标识" label-width="100" v-if="formState.menuType !== 'M'" prop="perms">
        <el-input v-model="formState.perms" placeholder="请输入权限标识"></el-input>
      </el-form-item>
      <el-form-item label="选择上级菜单" label-width="100" v-if="formState.menuType !== 'M'" prop="parentId">
        <el-tree-select
          v-model="formState.parentId"
          :data="menus"
          check-strictly
          :render-after-expand="false"
          placeholder="请选择上级菜单"
        />
      </el-form-item>
      <el-form-item label="权限类型" label-width="100" prop="menuType">
        <el-select v-model="formState.menuType" placeholder="请选择菜单类型">
          <el-option v-for="(item, index) in menuType" :value="item.value" :label="item.text" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="显示排序" label-width="100" prop="orderNum">
        <el-input-number v-model="formState.orderNum" :min="1" />
      </el-form-item>
      <el-form-item label="菜单状态" label-width="100" prop="status">
        <el-radio-group v-model="formState.status">
          <el-radio :label="1">正常</el-radio>
          <el-radio :label="0">停用</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="controllModal(false)">取消</el-button>
      <el-button type="primary" @click="handleSubmit" :loading="formLoading">确定</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import type { IMenuPayload } from "@/types/menuType";
import type { FormInstance } from "element-plus";
import { onMounted, ref } from "vue";
import useMenu from "@/hooks/useMenu";
interface IMenuDataBack extends IMenuPayload {
  id: number;
}
const props = defineProps<{
  isEdit: boolean;
  width?: string;
}>();

const emit = defineEmits<{
  (e: "refreshTable"): void;
}>();

const menuType = [
  {
    value: "M",
    text: "目录",
  },
  {
    value: "D",
    text: "菜单",
  },
  {
    value: "B",
    text: "按钮",
  },
];

const formRef = ref<FormInstance>();

const { formState, formLoading, showModal, menus, menuRules, getMenuListByOptions, updateMenuData, addMenuData } =
  useMenu(formRef);

// 当前菜单id：编辑使用
const currentId = ref<number>();

onMounted(() => {
  getMenuListByOptions();
});

const handleSubmit = () => {
  props.isEdit
    ? updateMenuData(currentId.value!, () => {
        controllModal(false);
        emit("refreshTable");
      })
    : addMenuData(() => {
        controllModal(false);
        emit("refreshTable");
      });
};

const controllModal = (show: boolean, formData?: IMenuDataBack) => {
  showModal.value = show;
  formState.name = formData ? formData.name : "";
  formState.menuIcon = formData ? formData.menuIcon : "";
  formState.routePath = formData ? formData.routePath : "";
  formState.comPath = formData ? formData.comPath : "";
  formState.menuType = formData ? formData.menuType : "M";
  formState.status = formData ? formData.status : 1;
  formState.perms = formData ? formData.perms : "";
  formState.parentId = formData ? formData.parentId : 1;
  formState.orderNum = formData ? formData.orderNum : 1;
  currentId.value = formData ? formData.id : 0;
};

defineExpose({
  controllModal,
});
</script>

<style scoped lang="less"></style>
