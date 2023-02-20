<template>
  <div class="theme-picker">
    <div class="pre-set">
      <div class="theme-title">预设选择</div>
      <div class="pre-set-container">
        <div class="pre-set-item" v-for="(item, index) in preSetTheme" :key="index" @click="changeDefaultTheme(index)">
          <div class="pre-set-box-container">
            <div
              class="pre-set-box"
              v-for="(i, index) in item.themeColor"
              :key="index"
              :style="{
                background: i + '',
              }"
            ></div>
          </div>

          <div class="pre-set-title">{{ item.name }}</div>
        </div>
      </div>
    </div>
    <div class="color-set">
      <div class="theme-title">颜色选择</div>
      <div class="picker-container">
        <div class="picker-item" v-for="(item, index) in systemColor" :key="index">
          <el-color-picker v-model="pickColors[index]" @change="handlePickColorChange" />
          <div class="picker-title">{{ item.desc }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { DARK_THEME, LIGHT_THEME, THEMES, type IThemeItem } from "@/theme/theme";

const props = defineProps<{
  currentTheme: IThemeItem[];
}>();

const emit = defineEmits<{
  (event: "chooseColor", payload: IThemeItem[]): void;
}>();

const preSetTheme = ref(THEMES);
const systemColor = ref(props.currentTheme);

const pickColors = ref(props.currentTheme.map((item) => item.color));

// 重置currentTheme，监听变化设置color
watch(
  () => props.currentTheme,
  (newValue: IThemeItem[]) => {
    pickColors.value = newValue.map((item) => item.color);
  }
);

// 更改pick颜色
const handlePickColorChange = () => {
  emit(
    "chooseColor",
    props.currentTheme.map((item, index) => {
      return { ...item, color: pickColors.value[index] };
    })
  );
};

// 选择默认主题
const changeDefaultTheme = (index: number) => {
  emit("chooseColor", index === 0 ? DARK_THEME : LIGHT_THEME);
};
</script>

<style scoped lang="less">
.theme-picker {
  .theme-title {
    font-size: 18px;
  }
  .pre-set {
    margin-bottom: 30px;
    .pre-set-container {
      display: flex;
      margin-top: 20px;
    }
    .pre-set-item {
      position: relative;
      margin-right: 50px;
      cursor: pointer;
      transition: transform 0.3s;

      .pre-set-title {
        text-align: center;
        margin-left: 10px;
      }
      .pre-set-box-container {
        position: relative;
        width: 60px;
        height: 80px;
        .pre-set-box {
          position: absolute;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          &:nth-child(1) {
            transform: translateX(50%);
          }

          &:nth-child(2) {
            transform: translate(10%, 60%);
          }
          &:nth-child(3) {
            transform: translate(80%, 60%);
          }
        }
      }
      &:hover {
        transform: scale(1.1);
      }
    }
  }
  .color-set {
    .picker-container {
      display: flex;
      flex-wrap: wrap;
      margin-top: 20px;
      .picker-item {
        display: flex;

        flex-direction: column;
        align-items: center;
        width: 70px;
        margin-right: 15px;
        .picker-title {
          margin-top: 20px;
          text-align: center;
          font-size: 14px;
        }
      }
    }
  }
}
</style>
