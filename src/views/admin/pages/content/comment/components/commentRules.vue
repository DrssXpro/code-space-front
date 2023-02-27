<template>
  <div class="comment-rules-container">
    <el-form class="form-container" ref="formRef" :model="state">
      <el-form-item label="关键词查询" prop="userName">
        <el-input v-model="state.userName" placeholder="请输入评论内容"></el-input>
      </el-form-item>
      <el-form-item label="评论者查询" prop="space">
        <el-input v-model="state.userName" placeholder="请输入评论内容"></el-input>
      </el-form-item>
      <div class="btn-group">
        <el-button type="danger" class="btn"><i class="fa fa-search"></i><span>查询</span></el-button>
        <el-button type="info" class="btn" @click="resetForm(formRef)"
          ><i class="fa fa-refresh"></i><span>重置</span></el-button
        >
      </div>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import type { FormInstance } from "element-plus";
const formRef = ref<FormInstance>();

const state = reactive({
  userName: "",
  space: "",
});

const resetForm = (formEl: FormInstance | undefined) => {
  formEl && formEl.resetFields();
};
</script>

<style scoped lang="less">
@import "../../../public.less";
.comment-rules-container {
  width: 100%;
  .public-container();
  .form-container();

}
</style>
