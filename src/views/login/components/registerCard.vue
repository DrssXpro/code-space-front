<template>
  <el-card
    class="card register-card"
    :style="{ transform: props.isActive ? 'rotateY(0)' : 'rotateY(-180deg)' }"
    shadow="never"
  >
    <div class="card-content">
      <h2 class="title">注册</h2>
      <el-form class="card-form" label-position="left" ref="formRef" :model="registerState" :rules="registerRules">
        <el-form-item label="用户名：" label-width="90px" prop="username">
          <el-input v-model="registerState.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="邮箱：" label-width="90px" prop="email">
          <el-input v-model="registerState.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="密码：" label-width="90px" prop="password">
          <el-input v-model="registerState.password" placeholder="请输入密码" type="password"></el-input>
        </el-form-item>
        <el-form-item label="重复密码：" label-width="90px" prop="repeatpwd">
          <el-input v-model="registerState.repeatpwd" placeholder="请再输入一次密码" type="password"></el-input>
        </el-form-item>
      </el-form>
      <div class="tip">已有账号？<span class="tip-link" @click="emit('changeCard')">跳转登录</span></div>
      <el-button type="info" style="width: 120px" @click="handleSubmit">注册</el-button>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { ref } from "vue";
import useRegister from "@/hooks/useRegister";
import type { FormInstance } from "element-plus";

const props = defineProps<{
  isActive: boolean;
}>();

const formRef = ref<FormInstance>();

const { registerRules, registerState, submitToRegister } = useRegister(formRef);

const emit = defineEmits<{
  (e: "changeCard"): void;
}>();

// 注册成功执行反转回调
const handleSubmit = () => {
  submitToRegister(() => {
    emit("changeCard");
  });
};
</script>

<style scoped lang="less">
@import "../public.less";
.register-card {
  position: absolute;
  backface-visibility: hidden;
  transition: 0.7s;
}
</style>
