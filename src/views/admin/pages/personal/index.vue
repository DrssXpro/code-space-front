<template>
  <div class="user-container">
    <user-info @show-edit-dialog="handleShowEdit" />
    <user-content />
    <info-dialog ref="dialogRef" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import userInfo from "./components/userInfo.vue";
import userContent from "./components/userContent.vue";
import infoDialog from "./components/infoDialog.vue";
const dialogRef = ref<InstanceType<typeof infoDialog>>();
const handleShowEdit = () => {
  dialogRef.value?.controllDialog(true);
};
</script>

<style scoped lang="less">
.user-container {
  width: 100%;
  display: flex;
  gap: 20px;
}
</style>
