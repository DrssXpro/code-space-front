<template>
  <el-dialog v-model="isShow" title="加入空间" append-to-body width="25%">
    <el-form>
      <el-form-item label="邀请码">
        <el-input v-model="state.inviteCode" placeholder="请输入邀请码"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="isShow = false">取消</el-button>
      <el-button type="primary" @click="handleJoinSpace">确定</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { joinSpaceByInviteCode } from "@/service/api/spaceRequest";
import useUserStore from "@/stores/userStore";
import { ElMessage } from "element-plus";
import { reactive, ref } from "vue";
const isShow = ref(false);

const state = reactive({
  inviteCode: "",
  spaceId: 0,
});

const { getUserInfoData } = useUserStore();

// 加入空间申请
const handleJoinSpace = async () => {
  const res = await joinSpaceByInviteCode(state.spaceId, state.inviteCode, true);
  res.code === 1000 ? ElMessage.success(res.message) : ElMessage.warning(res.message);
  isShow.value = false;
  getUserInfoData();
};

// 控制模态框
const controllModal = (show: boolean, spaceId: number) => {
  isShow.value = show;
  state.spaceId = spaceId;
  state.inviteCode = "";
};

defineExpose({
  controllModal,
});
</script>

<style scoped lang="less"></style>
