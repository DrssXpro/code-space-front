<template>
  <div class="code-container">
    <div class="gap-item">
      <code-rules />
    </div>
    <div class="gap-item">
      <code-table @edit-code="handleEditCode" @check-code="handleCheckCode" />
    </div>
    <code-drawer ref="drawerRef" :title="isEditCode ? '代码编辑' : '代码详情'" :is-edit="isEditCode" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import codeTable from "./components/codeTable.vue";
import codeRules from "./components/codeRules.vue";
import codeDrawer from "./components/codeDrawer.vue";
const drawerRef = ref<InstanceType<typeof codeDrawer>>();
const isEditCode = ref(false);

const handleEditCode = () => {
  isEditCode.value = true;
  drawerRef.value?.controllDrawer(true);
};

const handleCheckCode = () => {
  isEditCode.value = false;
  drawerRef.value?.controllDrawer(true);
};
</script>

<style scoped lang="less">
@import "../public.less";
.code-container {
  width: 100%;

}
</style>
