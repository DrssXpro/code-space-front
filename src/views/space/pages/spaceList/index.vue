<template>
  <div class="space-list-container">

    <div class="space-content content-gap">
      <space-content @joinSpace="handleJoinSpace" />
    </div>
    <space-modal ref="spaceModalRef" />
    <div class="back-detail" title="前往我的空间" v-if="isSpace" @click="skipToSpace">
      <i class="fa fa-angle-left"></i>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import spaceContent from "./components/spaceContent.vue";
import spaceModal from "./components/spaceModal.vue";
import useUserStore from "@/stores/userStore";
import { useRouter } from "vue-router";
const $router = useRouter();
const { userInfo } = useUserStore();
const spaceModalRef = ref<InstanceType<typeof spaceModal>>();

// 判断是否加入空间
const isSpace = ref(false);

onMounted(() => {
  isSpace.value = userInfo && userInfo.space ? true : false;
});

const skipToSpace = () => {
  if (userInfo && userInfo.space) $router.push(`/space/detail/${userInfo.space.spaceId}`);
};

const handleJoinSpace = (id: number) => {
  spaceModalRef.value?.controllModal(true, id);
};
</script>

<style scoped lang="less">
.space-list-container {
  width: 90%;
  margin: 0 auto;
  .content-gap {
    margin-top: 20px;
  }
  .back-detail {
    display: flex;
    align-items: center;
    cursor: pointer;
    position: fixed;
    width: 100px;
    height: 60px;
    border-radius: 30px;
    font-size: 30px;
    font-weight: 700;
    background-color: var(--el-bg-color-overlay);
    box-shadow: 0 2px 10px #00000040;
    right: -50px;
    top: 50%;
    transform: translateY(-50%);
    transition: all 0.3s;
    z-index: 99;
    i {
      margin-left: 20px;
    }
    &:hover {
      right: -30px;
    }
  }
}
</style>
