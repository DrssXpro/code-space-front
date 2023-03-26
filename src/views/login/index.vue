<template>
  <div class="login-container">
    <login-card @change-card="handleChangeCardState" @show-account="showAccount = !showAccount" :is-active="cardShow" />
    <register-card @change-card="handleChangeCardState" :is-active="cardShow" />
    <div class="login-info" v-if="showAccount">
      <div class="item">用户名:_Async__ 密码：123456</div>
      <div class="item">用户名:SpaceMaster 密码：123456</div>
      <div class="item">用户名:Admin 密码：123456</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import loginCard from "./components/loginCard.vue";
import registerCard from "./components/registerCard.vue";

const cardShow = ref(false);

const showAccount = ref(false);

const handleChangeCardState = () => {
  cardShow.value = !cardShow.value;
};
</script>

<style scoped lang="less">
.login-container {
  width: 350px;
  height: 400px;
  margin: 40px auto;
  position: relative;
  perspective: 1500px;
  .login-info {
    position: absolute;
    right: -300px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--el-text-color-secondary);
    .item {
      margin-bottom: 20px;
    }
  }
}
</style>
