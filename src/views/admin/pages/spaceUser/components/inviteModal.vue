<template>
  <el-dialog v-model="showModal" title="邀请人员" append-to-body width="25%">
    <el-form>
      <el-form-item label="用户名" label-width="70">
        <el-input placeholder="请输入用户名" v-model="name"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="controllModal(false)">取消</el-button>
      <el-button type="primary" :loading="formLoading" @click="handleSubmit">确定</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import useSpaceUser from "@/hooks/useSpaceUser";
const { name, formLoading, inviteSpaceUser } = useSpaceUser();

const showModal = ref(false);

const emit = defineEmits<{
  (e: "refreshTable"): void;
}>();

// 提交邀请
const handleSubmit = () => {
  inviteSpaceUser(() => {
    emit("refreshTable");
    showModal.value = false;
  });
};

// 控制dialog
const controllModal = (show: boolean) => {
  showModal.value = show;
};

defineExpose({
  controllModal,
});
</script>

<style scoped lang="less"></style>
