<template>
  <el-card
    class="card login-card"
    :style="{ transform: props.isActive ? 'rotateY(180deg)' : 'rotateY(0)' }"
    shadow="never"
  >
    <div class="card-content">
      <h2 class="title">登录</h2>
      <el-form class="card-form" label-position="right" ref="formRef" :model="loginState" :rules="loginRules">
        <el-form-item label="用户名：" label-width="85px" prop="username">
          <el-input v-model="loginState.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码：" label-width="85px" v-if="!isForget" prop="password">
          <el-input v-model="loginState.password" type="password" placeholder="请输入密码">
            <template #append>
              <span class="forget" @click="isForget = true">忘记密码？</span>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="重置密码：" label-width="85px" v-if="isForget" prop="password">
          <el-input v-model="loginState.password" type="password" placeholder="请输入密码"> </el-input>
        </el-form-item>
        <el-form-item label="邮箱：" label-width="85px" prop="email" v-if="isForget">
          <el-input v-model="loginState.email" placeholder="请输入注册时的邮箱"></el-input>
        </el-form-item>
        <el-form-item label="验证码：" label-width="85px" v-if="isForget">
          <div class="code-box">
            <el-input v-model="loginState.emailCode" placeholder="六位验证码"></el-input>
            <el-button type="primary" @click="handleCodeTime" :disabled="isStart">{{
              !isStart ? "发送验证码" : `${timeCount}s后重新发送`
            }}</el-button>
          </div>
        </el-form-item>
      </el-form>

      <div class="tip">没有账号？<span class="tip-link" @click="emit('changeCard')">点击注册</span></div>
      <div class="btn-group">
        <el-button type="info" style="width: 120px" v-if="isForget" @click="verfiyCodeAndReset">验证</el-button>
        <el-button type="info" style="width: 120px" v-else @click="submitToLogin">登录</el-button>
        <el-button type="danger" v-show="isForget" @click="isForget = false" style="width: 80px">取消</el-button>
      </div>
      <div class="alert" @click="emit('showAccount')">显示账号</div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { ref, onDeactivated } from "vue";
import useCountDown from "@/hooks/useCountDown";
import useLogin from "@/hooks/useLogin";
import type { FormInstance } from "element-plus";
const props = defineProps<{
  isActive: boolean;
}>();
const emit = defineEmits<{
  (e: "changeCard"): void;
  (e: "showAccount"): void;
}>();

const formRef = ref<FormInstance>();

const { loginState, loginRules, isForget, submitToLogin, verfiyCodeAndReset, getEmailCodeByreset } = useLogin(formRef);
const { isStart, timeCount, clearTimer, startTimer } = useCountDown(60);

// 获取验证码
const handleCodeTime = () => {
  getEmailCodeByreset();
  startTimer();
};

onDeactivated(() => {
  clearTimer();
});
</script>

<style scoped lang="less">
@import "../public.less";
.login-card {
  position: absolute;
  transition: 0.7s;
  backface-visibility: hidden;
  .forget {
    cursor: pointer;
    &:hover {
      color: var(--el-color-warning);
    }
  }

  .alert {
    position: absolute;
    bottom: 10px;
    right: 10px;
    cursor: pointer;
    color: #dd6161;
    &:hover {
      opacity: 0.5;
    }
  }

  .code-box {
    display: flex;
    gap: 10px;
  }
  :deep(.el-input-group__append, .el-input-group__prepend) {
    padding: 0 10px;
  }
}
</style>
