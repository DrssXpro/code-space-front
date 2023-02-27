<template>
  <div class="space-rules-container">
    <el-form class="form-container" ref="formRef" :model="state">
      <el-form-item label="用户名" prop="userName">
        <el-input v-model="state.userName" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="所属空间" prop="space">
        <el-select v-model="state.space" placeholder="请选择对应空间">
          <el-option v-for="(item, index) in codes" :key="index" :label="item.text" :value="index" />
        </el-select>
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

const codes = [
  {
    text: "C",
  },
  {
    text: "C++",
  },
  {
    text: "Java",
  },
  {
    text: "JavaScript",
  },
  {
    text: "Python",
  },
];
</script>

<style scoped lang="less">
@import "../../../public.less";
.space-rules-container {
  width: 100%;
  .public-container();
  .form-container();
}
</style>
