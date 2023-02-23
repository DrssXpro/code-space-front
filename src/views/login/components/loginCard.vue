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
          <el-input v-model="state.username"></el-input>
        </el-form-item>
        <el-form-item label="密码：" label-width="70px">
          <el-input v-model="state.username"></el-input>
        </el-form-item>
      </el-form>
      <div class="tip">还没有账号？<span class="tip-link" @click="emit('changeCard')">点击注册</span></div>
      <el-button type="info" style="width: 120px">登录</el-button>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { reactive } from "vue";

const props = defineProps<{
  isActive: boolean;
}>();
const emit = defineEmits<{
  (e: "changeCard"): void;
}>();

const state = reactive({
  username: "",
  password: "",
});
</script>

<style scoped lang="less">
@import "../public.less";
.login-card {
  position: absolute;
  transition: 0.7s;
  backface-visibility: hidden;
}
</style>
