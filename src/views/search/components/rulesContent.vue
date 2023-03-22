<template>
  <div class="search-content">
    <fs-search-box
      place-holder="请输入关键字"
      v-model="currentKw"
      @search="handleSearch"
      @clear-search-value="handleSearch"
    />
  </div>
  <div class="rules-content-container">
    <div class="rules-item">
      <div class="rules-title">
        <i class="fa fa-tags"></i>
        <span>分类</span>
      </div>
      <div class="rules-content">
        <el-select v-model="searchState.lan" multiple placeholder="选择语言分类" style="width: 300px">
          <el-option v-for="(item, index) in LANGUAGE" :key="index" :label="item" :value="item" />
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
        <span>私密</span>
      </div>
      <div class="rules-content">
        <el-checkbox v-model="searchState.isPwd" label="私密" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from "vue";
import FsSearchBox from "@/components/FsSearchBox/FsSearchBox.vue";
import { LANGUAGE } from "@/config/config";
import type { ISearchPayload } from "@/types/squareType";

const props = defineProps<{
  searchRules: ISearchPayload;
}>();

const emit = defineEmits<{
  (e: "update:searchRules", payload: ISearchPayload): void;
}>();

// 内部维护searchRules
const searchState = reactive({
  ...props.searchRules,
});
// 单独维护搜索框内容
const currentKw = ref("");

// 确认搜索 / 清除搜索 再更新payload
const handleSearch = () => {
  searchState.kw = currentKw.value;
};

watch(
  () => searchState,
  () => {
    emit("update:searchRules", searchState);
  },
  {
    deep: true,
  }
);
</script>

<style scoped lang="less">
.search-content {
  margin-bottom: 20px;
}
.rules-content-container {
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
      margin-right: 50px;
      span {
        margin-left: 10px;
      }
    }
  }
}
</style>
