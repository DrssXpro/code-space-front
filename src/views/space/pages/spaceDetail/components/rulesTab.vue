<template>
  <div class="rules-tab-container">
    <div class="rules-item">
      <div class="rules-title">
        <i class="fa fa-search"></i>
        <span>搜素</span>
      </div>
      <div class="rules-content">
        <el-input v-model="currentSearch" placeholder="请输入搜索内容" clearable></el-input>
        <el-button type="success" text @click="searchContent">搜索</el-button>
      </div>
    </div>
    <div class="rules-item">
      <div class="rules-title">
        <i class="fa fa-tags"></i>
        <span>语言</span>
      </div>
      <div class="rules-content">
        <el-select v-model="searchState.lan" multiple placeholder="选择语言分类" style="width: 260px">
          <el-option v-for="(item, index) in LANGUAGE" :key="index" :label="item" :value="item" />
        </el-select>
      </div>
    </div>
    <div class="rules-item">
      <div class="rules-title">
        <i class="fa fa-send"></i>
        <span>任务</span>
      </div>
      <div class="rules-content">
        <el-select v-model="searchState.task" placeholder="选择已有任务" clearable style="width: 260px">
          <el-option v-for="(item, index) in props.taskOptions" :key="index" :label="item.name" :value="item.id" />
        </el-select>
      </div>
    </div>
    <div class="rules-item">
      <div class="rules-title">
        <i class="fa fa-line-chart"></i>
        <span>排序</span>
      </div>
      <div class="rules-content">
        <el-radio-group v-model="searchState.sort">
          <el-radio-button :label="1">综合</el-radio-button>
          <el-radio-button :label="2">最新</el-radio-button>
          <el-radio-button :label="3">最热</el-radio-button>
        </el-radio-group>
      </div>
    </div>
    <div class="rules-item">
      <div class="rules-title">
        <i class="fa fa-key"></i>
        <span>状态</span>
      </div>
      <div class="rules-content">
        <el-radio-group v-model="searchState.status">
          <el-radio :label="1">综合</el-radio>
          <el-radio :label="2">优秀</el-radio>
        </el-radio-group>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ISpaceSearchPayload } from "@/types/searchType";
import { reactive, ref, watch } from "vue";
import { LANGUAGE } from "@/config/config";
import type { ITaskItem } from "@/types/taskType";
const props = defineProps<{
  searchRules: ISpaceSearchPayload;
  taskOptions: ITaskItem[];
}>();

const emit = defineEmits<{
  (e: "update:searchRules", searchRule: ISpaceSearchPayload): void;
}>();

// 内部维护搜索内容
const searchState = reactive({ ...props.searchRules });

// 单独维护搜索内容，只有点击搜索再改变条件
const currentSearch = ref("");

const searchContent = () => {
  searchState.kw = currentSearch.value;
};

watch(
  () => searchState,
  (newValue) => {
    emit("update:searchRules", newValue);
  },
  {
    deep: true,
  }
);
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
