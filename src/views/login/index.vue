<template>
  <div class="login-container">
    <login-card @change-card="handleChangeCardState" :is-active="cardShow" />
    <register-card @change-card="handleChangeCardState" :is-active="cardShow" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import loginCard from "./components/loginCard.vue";
import registerCard from "./components/registerCard.vue";

const cardShow = ref(false);

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
  
}
</style>
