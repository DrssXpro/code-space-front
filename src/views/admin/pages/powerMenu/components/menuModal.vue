<template>
  <el-dialog
    v-model="isShow"
    :title="props.isEdit ? '编辑菜单' : '添加菜单'"
    :width="props.width || '25%'"
    append-to-body
  >
    <el-form>
      <el-form-item label="菜单名称" label-width="100">
        <el-input v-model="formState.name" placeholder="请输入菜单名称"></el-input>
      </el-form-item>
      <el-form-item label="菜单图标" label-width="100" v-show="formState.menuType === 'M'">
        <el-input v-model="formState.menuIcon" placeholder="按照font awesome4图标规范"></el-input>
      </el-form-item>
      <el-form-item label="组件路径" label-width="100" v-show="formState.menuType === 'D'">
        <el-input v-model="formState.comPath" placeholder="请输入组件路径"></el-input>
      </el-form-item>
      <el-form-item label="路由路径" label-width="100" v-show="formState.menuType === 'D'">
        <el-input v-model="formState.routePath" placeholder="请输入路由路径"></el-input>
      </el-form-item>
      <el-form-item label="权限标识" label-width="100" v-show="formState.menuType !== 'M'">
        <el-input v-model="formState.perms" placeholder="请输入权限标识"></el-input>
      </el-form-item>
      <el-form-item label="选择上级菜单" label-width="100" v-show="formState.menuType !== 'M'">
        <el-tree-select
          v-model="formState.parentId"
          :data="menus"
          check-strictly
          :render-after-expand="false"
          placeholder="请选择上级菜单"
        />
      </el-form-item>
      <el-form-item label="权限类型" label-width="100">
        <el-select v-model="formState.menuType" placeholder="请选择菜单类型">
          <el-option v-for="(item, index) in menuType" :value="item.value" :label="item.text" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="显示排序" label-width="100">
        <el-input-number v-model="formState.orderNum" :min="1" />
      </el-form-item>
      <el-form-item label="菜单状态" label-width="100">
        <el-radio-group v-model="formState.status">
          <el-radio :label="1">正常</el-radio>
          <el-radio :label="0">停用</el-radio>
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
import { addMenu, getMenuList, updateMenu } from "@/service/api/menuRequest";
import type { IMenuAddPayload } from "@/types/menuType";
import { handleMenuToTree } from "@/utils/tools";
import { ElMessage } from "element-plus";
import { onMounted, reactive, ref } from "vue";
interface IMenuDataBack extends IMenuAddPayload {
  id: number;
}
const props = defineProps<{
  isEdit: boolean;
  width?: string;
}>();

const emit = defineEmits<{
  (e: "refreshTable"): void;
}>();

// 模态框状态
const isShow = ref(false);

// 所有菜单列表:选择上级菜单使用
const menus = ref<any[]>();

// 当前菜单id：编辑使用
const currentId = ref<number>();

// 表单参数
const formState: IMenuAddPayload = reactive({
  name: "",
  menuIcon: "",
  routePath: "",
  comPath: "",
  menuType: "M",
  status: 1,
  parentId: 0,
  perms: "",
  orderNum: 1,
});
onMounted(() => {
  getMenuList().then((res) => {
    const data = handleMenuToTree(
      res.data.rows.map((item) => ({
        label: item.name,
        value: item.id,
        parentId: item.parentId,
        id: item.id,
      }))
    );
    menus.value = data;
  });
});

const handleSubmit = async () => {
  if (!props.isEdit) {
    try {
      const res = await addMenu({ ...formState });
      res.code === 1000 ? ElMessage.success(res.message) : ElMessage.warning(res.message);
      isShow.value = res.code === 1000 ? false : true;
    } catch (err) {
      ElMessage.warning("添加失败");
    }
  } else {
    try {
      const res = await updateMenu(currentId.value!, { ...formState });
      res.code === 1000 ? ElMessage.success(res.message) : ElMessage.warning(res.message);
      isShow.value = res.code === 1000 ? false : true;
    } catch (err) {
      ElMessage.warning("修改失败");
    }
  }
  emit("refreshTable");
};

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

const controllModal = (show: boolean, formData?: IMenuDataBack) => {
  isShow.value = show;
  formState.name = formData ? formData.name : "";
  formState.menuIcon = formData ? formData.menuIcon : "";
  formState.routePath = formData ? formData.routePath : "";
  formState.comPath = formData ? formData.comPath : "";
  formState.menuType = formData ? formData.menuType : "M";
  formState.status = formData ? formData.status : 1;
  formState.perms = formData ? formData.perms : "";
  formState.parentId = formData ? formData.parentId : 0;
  formState.orderNum = formData ? formData.orderNum : 1;
  currentId.value = formData ? formData.id : 0;
};

defineExpose({
  controllModal,
});
</script>

<style scoped lang="less"></style>
