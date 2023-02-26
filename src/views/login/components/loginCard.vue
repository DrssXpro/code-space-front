<template>
  <el-card
    class="card login-card"
    :style="{ transform: props.isActive ? 'rotateY(180deg)' : 'rotateY(0)' }"
    shadow="never"
  >
    <div class="card-content">
      <h2 class="title">登录</h2>
      <el-form class="card-form" label-position="left">
        <el-form-item label="用户名：" label-width="70px">
          <el-input v-model="state.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码：" label-width="70px" v-show="!isForget">
          <el-input v-model="state.username" type="password" placeholder="请输入密码">
            <template #append>
              <span class="forget" @click="isForget = true">忘记密码？</span>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="邮箱：" label-width="70px" v-show="isForget">
          <el-input v-model="state.username" placeholder="请输入注册时的邮箱"></el-input>
        </el-form-item>
        <el-form-item label="验证码：" label-width="70px" v-show="isForget">
          <div class="code-box">
            <el-input v-model="state.username" placeholder="六位验证码"></el-input>
            <el-button type="primary" @click="handleCodeTime" :disabled="isStart">{{
              !isStart ? "发送验证码" : `${timeCount}s后重新发送`
            }}</el-button>
          </div>
        </el-form-item>
      </el-form>

      <div class="tip">没有账号？<span class="tip-link" @click="emit('changeCard')">点击注册</span></div>
      <div class="btn-group">
        <el-button type="info" style="width: 120px" @click="handleSendCode">{{ isForget ? "验证" : "登录" }}</el-button>
        <el-button type="danger" v-show="isForget" @click="isForget = false" style="width: 80px">取消</el-button>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { ref, reactive, onDeactivated } from "vue";
import useCountDown from "@/hooks/useCountDown";

const props = defineProps<{
  isActive: boolean;
}>();
const emit = defineEmits<{
  (e: "changeCard"): void;
}>();

const { isStart, timeCount, clearTimer, startTimer } = useCountDown(10);
const isForget = ref(false);
const state = reactive({
  username: "",
  password: "",
});

const handleCodeTime = () => {
  startTimer();
};

const handleSendCode = () => {
  isForget.value = false;
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

  .code-box {
    display: flex;
    gap: 10px;
  }
  :deep(.el-input-group__append, .el-input-group__prepend) {
    padding: 0 10px;
  }
}
</style>