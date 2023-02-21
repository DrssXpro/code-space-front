<template>
  <div class="system-container">
    <div class="theme-config">
      <div class="theme-title">主题色配置</div>
      <div class="theme-picker">
        <theme-picker :current-theme="currentTheme as IThemeItem[]" @chooseColor="handleGetChooseColor" />
      </div>
      <div class="operator">
        <el-button type="danger" round @click="resetTheme">重置</el-button>
        <el-button type="primary" round @click="saveThemeToLocal">保存</el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRefs } from "vue";
import themePicker from "./components/themePicker.vue";
import useTheme from "@/hooks/useTheme";
import { DARK_THEME, type IThemeItem } from "@/theme/theme";

const { currentTheme, init, setTheme } = toRefs(useTheme());
currentTheme.value || init.value();

const handleGetChooseColor = (item: IThemeItem[]) => {
  currentTheme.value = item;
  setTheme.value(item);
};
const resetTheme = () => {
  setTheme.value(DARK_THEME);
};

const saveThemeToLocal = () => {};
</script>

<style scoped lang="less">
.system-container {
  width: 1200px;
  margin: 0 auto;
  margin-top: 20px;
  padding: 20px;
  border-radius: 10px;
  background-color: var(--main-color);
  .theme-title {
    color: var(--choose-color);
    font-size: 25px;
    font-weight: 700;
  }
  .theme-config {
    width: 100%;
    transition: background-color 0.3s;

    .theme-picker {
      margin: 20px 0;
    }
    .opeartor {
      display: flex;
    }
  }
}
</style>
