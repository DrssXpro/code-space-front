<template>
  <el-dialog v-model="showDialog" title="添加用户" width="25%" append-to-body>
    <div class="form-container">
      <el-form>
        <el-form-item label="用户名" labelWidth="100px">
          <el-input v-model="state.userName" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" labelWidth="100px">
          <el-input v-model="state.email" placeholder="请输邮箱"></el-input>
        </el-form-item>
        <el-form-item label="密码" labelWidth="100px">
          <el-input v-model="state.password" placeholder="请输入密码"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="showDialog = false">取消</el-button>
        <el-button type="primary" @click="showDialog = false">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { ElMessage, type UploadProps } from "element-plus";

const showDialog = ref(false);
const state = reactive({
  userName: "",
  email: "",
  password: "",
  imageUrl: "",
});

const controllDialog = (isShow: boolean) => {
  showDialog.value = isShow;
};

defineExpose({
  controllDialog,
});
</script>

<style scoped lang="less"></style>
