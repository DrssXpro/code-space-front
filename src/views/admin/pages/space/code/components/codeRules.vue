<template>
  <div class="code-rules">
    <el-form class="form-container">
      <el-form-item label="关键词查询">
        <el-input v-model="state.keywords" placeholder="请输入代码标题"></el-input>
      </el-form-item>

      <el-form-item label="选择编程语言">
        <el-select v-model="state.lan" placeholder="选择排序规则">
          <el-option v-for="(item, index) in codes" :key="index" :label="item.text" :value="index" />
        </el-select>
      </el-form-item>

      <el-form-item label="空间代码">
        <el-checkbox v-model="state.isSpace" label="筛选" />
      </el-form-item>
      <div class="btn-group">
        <el-button type="danger" class="btn"><i class="fa fa-search"></i><span>查询</span></el-button>
        <el-button type="info" class="btn"><i class="fa fa-refresh"></i><span>重置</span></el-button>
      </div>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";

const state = reactive({
  keywords: "",
  lan: 0,
  isSpace: false,
});

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
.code-rules {
  width: 100%;
  .public-container();
  .form-container();
}
</style>
