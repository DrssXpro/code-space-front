<template>
  <div class="rules-tab-container">
    <div class="rules-item">
      <div class="rules-title">
        <i class="fa fa-search"></i>
        <span>搜素</span>
      </div>
      <div class="rules-content">
        <el-input v-model="searchContent" placeholder="请输入搜索内容"></el-input>
        <el-button type="success" text>搜索</el-button>
      </div>
    </div>
    <div class="rules-item">
      <div class="rules-title">
        <i class="fa fa-tags"></i>
        <span>语言</span>
      </div>
      <div class="rules-content">
        <el-select v-model="select" multiple placeholder="选择语言分类" style="width: 260px">
          <el-option v-for="(item, index) in codes" :key="index" :label="item.text" :value="index" />
        </el-select>
      </div>
    </div>
    <div class="rules-item">
      <div class="rules-title">
        <i class="fa fa-send"></i>
        <span>任务</span>
      </div>
      <div class="rules-content">
        <el-select v-model="select" placeholder="选择已有任务" clearable style="width: 260px">
          <el-option v-for="(item, index) in codes" :key="index" :label="item.text" :value="index" />
        </el-select>
      </div>
    </div>
    <div class="rules-item">
      <div class="rules-title">
        <i class="fa fa-line-chart"></i>
        <span>排序</span>
      </div>
      <div class="rules-content">
        <el-radio-group v-model="radio">
          <el-radio-button label="综合" />
          <el-radio-button label="最新" />
          <el-radio-button label="最热" />
        </el-radio-group>
      </div>
    </div>
    <div class="rules-item">
      <div class="rules-title">
        <i class="fa fa-key"></i>
        <span>状态</span>
      </div>
      <div class="rules-content">
        <el-radio-group v-model="radio">
          <el-radio :label="3">优秀</el-radio>
          <el-radio :label="6">纠错</el-radio>
        </el-radio-group>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const searchContent = ref("");
const radio = ref("");
const select = ref(0);

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
.rules-tab-container {
  width: 100%;
  border-radius: 10px;
  background-color: var(--el-bg-color-overlay);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  .rules-item {
    display: flex;
    align-items: center;
    .rules-title {
      margin-right: 20px;
      span {
        margin-left: 10px;
      }
    }
    .rules-content {
      display: flex;
      align-items: center;
      gap: 20px;
    }
  }
}
</style>
