<template>
  <div class="rules-content-container">
    <div class="rules-item">
      <div class="rules-title">
        <i class="fa fa-tags"></i>
        <span>分类</span>
      </div>
      <div class="rules-content">
        <el-select v-model="select" multiple placeholder="选择语言分类" style="width: 300px">
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
        <span>私密</span>
      </div>
      <div class="rules-content">
        <el-checkbox v-model="checked" label="私密" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const radio = ref("");
const checked = ref("");
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
.rules-content-container {
  width: 100%;
  border-radius: 10px;
  background-color: var(--main-color);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  .rules-item {
    display: flex;
    align-items: center;
    .rules-title {
      margin-right: 50px;
      span {
        margin-left: 10px;
      }
    }
  }
}
</style>
