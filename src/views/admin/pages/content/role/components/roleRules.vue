<template>
  <div class="role-rules-container">
    <el-form class="form-container" ref="formRef" :model="state">
      <el-form-item label="角色名称" prop="userName">
        <el-input v-model="state.userName" placeholder="请输入角色名称"></el-input>
      </el-form-item>
      <el-form-item label="角色标识" prop="space">
        <el-input v-model="state.userName" placeholder="请输入角色标识"></el-input>
      </el-form-item>
      <el-form-item label="角色标识" prop="space">
        <el-select v-model="state.status" placeholder="角色状态" style="width: 100px">
          <el-option v-for="(item, index) in codes" :key="index" :label="item.text" :value="index" />
        </el-select>
      </el-form-item>
      <div class="btn-group">
        <el-button type="danger" class="btn"><i class="fa fa-search"></i><span>查询</span></el-button>
        <el-button type="info" class="btn" @click="resetForm(formRef)"
          ><i class="fa fa-refresh"></i><span>重置</span></el-button
        >
        <el-button type="primary" class="btn" @click="resetForm(formRef)"
          ><span>新增角色</span></el-button
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
  status: "",
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
.role-rules-container {
  width: 100%;
  .public-container();
  .form-container();
}
</style>
