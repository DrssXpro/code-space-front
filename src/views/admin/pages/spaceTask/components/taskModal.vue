<template>
  <el-dialog v-model="showModal" :title="props.isEdit ? '编辑任务' : '添加任务'" width="25%" append-to-body>
    <el-form ref="formRef" :model="formState" :rules="formRules">
      <el-form-item label="任务名称" label-width="100" prop="name">
        <el-input v-model="formState.name" placeholder="请输入任务名称"></el-input>
      </el-form-item>
      <el-form-item label="任务详情" label-width="100" prop="introduce">
        <el-input type="textarea" v-model="formState.introduce" placeholder="请输入任务详情"></el-input>
      </el-form-item>
      <el-form-item label="过期时间" label-width="100" prop="extime">
        <el-date-picker
          v-model="formState.extime"
          type="datetime"
          placeholder="请选择过期时间"
          :disabled-date="disabledDate"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="controllModal(false)">取消</el-button>
      <el-button type="primary" :loading="formState.loading" @click="handleSubmit">确定</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { nextTick, ref } from "vue";

import type { FormInstance } from "element-plus";

import useTask from "@/hooks/useTask";
import useUserStore from "@/stores/userStore";

const props = defineProps<{
  isEdit: boolean;
}>();

const emit = defineEmits<{
  (e: "refreshTable"): void;
}>();
const { userInfo } = useUserStore(); // 获取个人信息

const currentId = ref(0); // 编辑：当前任务id

const formRef = ref<FormInstance>();

// hooks:封装增删改查操作
const { showModal, updateTaskData, addTaskData, formRules, formState } = useTask(userInfo?.space?.spaceId!, formRef);

// 控制表单状态并设置数据回显
const controllModal = (show: boolean, row?: any) => {
  showModal.value = show;
  currentId.value = row ? row.id : 0;
  formState.name = row ? row.name : "";
  formState.introduce = row ? row.introduce : "";
  formState.extime = row ? row.extime : "";
};

// 提交表单逻辑
const handleSubmit = async () => {
  props.isEdit
    ? updateTaskData(currentId.value, () => {
        controllModal(false);
        emit("refreshTable");
      })
    : addTaskData(() => {
        controllModal(false);
        emit("refreshTable");
      });
};

// 禁止选择之前的日期
const disabledDate = (time: Date) => {
  return time.getTime() < Date.now();
};

defineExpose({
  controllModal,
});
</script>

<style lang="less" scoped></style>
