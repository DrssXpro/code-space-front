<template>
  <el-dialog v-model="isShow" :title="props.isEdit ? '编辑角色' : '创建角色'" :width="props.width || '25%'">
    <el-form>
      <el-form-item label="角色名称" label-width="100">
        <el-input v-model="formState.name" placeholder="请输入角色名称"></el-input>
      </el-form-item>
      <el-form-item label="角色标识" label-width="100">
        <el-input v-model="formState.roleChar" placeholder="请输入角色标识"></el-input>
      </el-form-item>
      <el-form-item label="角色简介" label-width="100">
        <el-input type="textarea" v-model="formState.introduce" placeholder="请输入角色简介" maxlength="20"></el-input>
      </el-form-item>
      <el-form-item label="角色状态" label-width="100">
        <el-radio-group v-model="formState.status">
          <el-radio :label="1">正常</el-radio>
          <el-radio :label="0">停用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="角色权限" label-width="100">
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
      <el-button type="primary" @click="handleSubmit">确定</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { getMenuList } from "@/service/api/menuRequest";
import type { IMenuItem } from "@/types/menuType";
import { handleMenuToTree } from "@/utils/tools";
import { ref, reactive, onMounted, nextTick, watch } from "vue";
import { addRole, updateRole } from "@/service/api/roleRequest";
import { ElMessage, ElTree } from "element-plus";
import type { IRoleFormPayload } from "@/types/roleType";

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
// 模态框展示

const isShow = ref(false);

// 所有权限列表展示
const allMenus = ref<IMenuItem[]>([]);

// 编辑状态：当前id
const currentId = ref<number>();

// 提交表单
const formState: IRoleFormPayload = reactive({
  name: "",
  introduce: "",
  roleChar: "",
  status: 1,
  menuList: [] as number[],
});

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
  getMenuList().then((res) => {
    const data = handleMenuToTree(res.data.rows);
    allMenus.value = data as IMenuItem[];
  });
});

// 提交表单
const handleSubmit = () => {
  formState.menuList = treeRef.value!.getCheckedKeys(false) as number[];
  if (!props.isEdit) {
    addRole({ ...formState })
      .then((res) => {
        res.code === 1000 ? ElMessage.success(res.message) : ElMessage.warning(res.message);
        isShow.value = false;
        emit("refreashTable");
      })
      .catch((err) => {
        console.log("check:", err);
        ElMessage.warning("添加失败");
      });
  } else {
    currentId.value &&
      updateRole(currentId.value, { ...formState })
        .then((res) => {
          res.code === 1000 ? ElMessage.success(res.message) : ElMessage.warning(res.message);
          isShow.value = false;
          emit("refreashTable");
        })
        .catch((err) => {
          console.log("check:", err);
          ElMessage.warning("修改失败");
        });
  }
};

// 控制模态框展示与数据回显
const controllModal = (show: boolean, formData?: IRoleDataBack) => {
  isShow.value = show;
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
