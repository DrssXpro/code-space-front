<template>
  <div class="code-tab-container">
    <div class="tab-title">
      <span class="title-content">语言分类</span>
      <div class="title-choose">
        <el-select v-model="value" placeholder="选择排序规则" size="small">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </div>
    </div>
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
const value = ref(1);

const handleChooseTab = (index: number) => {
  currentIndex.value = index;
};

const codes = [
  {
    text: "cpp",
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
    text: "PHP",
  },

  {
    text: "CSS",
  },
  {
    text: "SQL",
  },
  {
    text: "Vue",
  },
];

const options = [
  {
    value: 1,
    label: "最新分享",
  },
  {
    value: 2,
    label: "最多浏览",
  },
  {
    value: 3,
    label: "最多点赞",
  },
];
</script>

<style scoped lang="less">
.code-tab-container {
  padding: 20px;
  background-color: var(--el-bg-color-overlay);
  border-radius: 10px;
  .tab-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    color: var(--font-main-color);
    .title-content {
      font-size: 22px;
    }
    .title-choose {
      width: 100px;
    }
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
      border: 1px solid transparent;
    }
    .tab-item__active {
      background-color: var(--el-bg-color-page);
    }
  }
}
</style>
