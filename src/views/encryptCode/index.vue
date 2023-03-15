<template>
  <div class="encrypt-container">
    <el-card shadow="never" class="encrypt-card">
      <template #header>
        <div class="header">
          <img :src="partCode?.user.authorAvatar" class="avatar" alt="" />
          <div class="info">
            <div class="title">{{ partCode?.title }}</div>
            <div class="time">{{ formatTime(partCode?.createdAt!, "YYYY-MM-DD hh:ss:mm") }}</div>
          </div>
        </div>
      </template>
      <div class="encrypt-form">
        <el-form :model="pwdState" :rules="rules">
          <el-form-item prop="pwd" label="代码密码：">
            <div class="form-item">
              <el-input v-model="pwdState.pwd" type="password" placeholder="请输入密码"></el-input>
              <el-button type="info" @click="getEncryptCode(codeId)">获取代码</el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import useFrontCode from "@/hooks/useFrontCode";
import { formatTime } from "@/utils/formatTime";
import type { FormRules } from "element-plus";
import { onMounted } from "vue";
import { useRoute } from "vue-router";

const { getPartCode, getEncryptCode, partCode, pwdState } = useFrontCode();
const $route = useRoute();
const codeId = $route.params.id as string;

onMounted(() => {
  getPartCode(codeId);
});

const rules: FormRules = {
  pwd: [
    { required: true, message: "密码不能为空", trigger: "blur" },
    { min: 3, max: 15, message: "密码长度过长或过短", trigger: "blur" },
  ],
};
</script>

<style scoped lang="less">
.encrypt-card {
  width: 400px;
  height: 200px;
  margin: 60px auto;
  .header {
    display: flex;
    .avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-right: 10px;
    }
    .info {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      .time {
        color: var(--el-text-color-secondary);
        font-size: 14px;
      }
    }
  }
  .encrypt-form {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 120px;
    .form-item {
      display: flex;
      button {
        margin-left: 10px;
      }
    }
  }
}
</style>
