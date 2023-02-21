<template>
  <div class="code-rules">
    <el-form>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="关键词查询">
            <el-input v-model="state.keywords" placeholder="请输入代码标题"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="选择编程语言">
            <el-select v-model="state.lan" placeholder="选择排序规则">
              <el-option v-for="(item, index) in codes" :key="index" :label="item.text" :value="index" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-button type="danger" class="btn"><i class="fa fa-search"></i><span>查询</span></el-button>
        <el-button type="info" class="btn"><i class="fa fa-refresh"></i><span>重置</span></el-button>
      </el-row>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";

const state = reactive({
  keywords: "",
  lan: 0,
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
.code-rules {
  width: 100%;

  background-color: var(--main-color);
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  padding: 20px;
  .btn {
    display: flex;
    align-items: center;
    margin-left: 20px;
    span {
      margin-left: 5px;
    }
  }

  .el-form-item {
    margin-bottom: 0;
  }
  :deep(.el-form-item__label) {
    color: var(--font-main-color);
  }
}
</style>
