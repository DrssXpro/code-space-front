<template>
  <div class="space-oveview-container">
    <div class="space-form-container" v-if="!isCreate"><space-form @create-success="isCreate = true" /></div>
    <div class="space-content-container" v-else>
      <space-content @edit-space-info="handleEditSpace" /> <space-modal ref="modalRef" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import spaceForm from "./components/spaceForm.vue";
import spaceContent from "./components/spaceContent.vue";
import spaceModal from "./components/spaceModal.vue";
import useUserStore from "@/stores/userStore";

import { ElMessage } from "element-plus";
import type { ISpaceDetail } from "@/types/spaceType";
const { userInfo } = useUserStore();

const modalRef = ref<InstanceType<typeof spaceModal>>();
const isCreate = ref(!!userInfo?.space?.spaceId);

const handleEditSpace = (item: ISpaceDetail) => {
  modalRef.value?.controllModal(true, item);
};

onMounted(() => {
  console.log(userInfo);
  if (!userInfo?.space?.spaceId) {
    ElMessage.warning("请先设置空间信息哦");
  }
});
</script>

<style lang="less" scoped>
@import "../public.less";
.space-oveview-container {
  width: 100%;
  .space-form-container {
    display: flex;
    justify-content: center;
  }
}
</style>
