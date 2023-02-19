<template>
  <div class="code-tab-container">
    <div class="tab-title">相关标签</div>
    <div class="code-tab-list">
      <div
        :class="['code-tab-item', currentIndex === index ? 'tab-item__active' : '']"
        v-for="(item, index) in codes"
        :key="index"
        @click="handleChooseTab(index)"
      >
        {{ item.text }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const currentIndex = ref(0);

const handleChooseTab = (index: number) => {
  currentIndex.value = index;
};

const codes = [
  {
    text: "全部",
  },
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
  {
    text: "标签1",
  },
  {
    text: "标签2",
  },
  {
    text: "测试",
  },
  {
    text: "Pyt",
  },
  {
    text: "Pyt测试hon",
  },
  {
    text: "Pyt测试hon",
  },
];
</script>

<style scoped lang="less">
.code-tab-container {
  padding: 20px;
  background-color: var(--main-color);
  .tab-title {
    font-size: 20px;
    margin-bottom: 20px;
  }
  .code-tab-list {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;

    .code-tab-item {
      padding: 5px 8px;
      border-radius: 5px;
      transition: all 0.3s;
      cursor: pointer;
      font-size: 18px;
      border: 1px solid transparent;
      &:hover {
        border-color: var(--choose-color);
      }
    }
    .tab-item__active {
      background-color: var(--choose-color);
      color: var(--font-active-color);
    }
  }
}
</style>
