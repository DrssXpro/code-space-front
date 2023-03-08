<template>
  <div class="space-oveview-container">
    <space-form />
  </div>
</template>

<script setup lang="ts">
import spaceForm from "./components/spaceForm.vue";
import useUserStore from "@/stores/userStore";
import { onActivated } from "vue";
import { ElMessage } from "element-plus";
const { userInfo } = useUserStore();

onActivated(() => {
  if (!userInfo?.spaceId) {
    ElMessage.warning("请先设置空间信息哦");
  }
});
</script>

<style lang="less" scoped>
@import "../public.less";
.space-oveview-container {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
