<template>
  <div class="content-user-container">
    <div class="gap-item">
      <user-rules @add-user="showDialog" />
    </div>
    <div class="gap-item">
      <user-table />
    </div>
    <user-dialog ref="dialogRef" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import userDialog from "./components/userDialog.vue";
import userRules from "./components/userRules.vue";
import userTable from "./components/userTable.vue";
const dialogRef = ref<InstanceType<typeof userDialog>>();

const showDialog = () => {
  dialogRef.value?.controllDialog(true);
};
</script>

<style scoped lang="less">
@import "../../public.less";
.content-user-container {
  width: 100%;
}
</style>
