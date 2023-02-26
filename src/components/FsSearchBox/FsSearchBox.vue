<template>
  <div :class="['my-search', isActive ? 'search-active' : '']">
    <div :class="['search-input', isActive ? 'searchInpu-active' : '']" v-click-outside="() => activeSearch(false)">
      <input
        type="text"
        class="my-input"
        :value="props.modelValue"
        @input="updateInputValue"
        @keyup.enter="emit('search', props.modelValue)"
        :placeholder="props.placeHolder"
        @focus="activeSearch(true)"
      />
      <i
        :class="['my-icon fa', props.modelValue.length ? 'fa-times-circle-o' : 'fa-search']"
        @click="handleSearchIcon"
      ></i>
      <div
        :class="['search-history', isActive && props.history && props.history.length ? 'search-history-active' : '']"
      >
        <div class="history-title">
          搜索记录
          <my-icon name="trash" style="cursor: pointer" @click="('clearHistory')" />
        </div>
        <div class="history-container">
          <ul class="history-list">
            <li
              class="history-item"
              v-for="(item, index) in props.history"
              :key="index"
              @click="handleClickHistory(item)"
            >
              {{ item }}
              <my-icon name="close" class="delete-icon" @click.stop="emit('deleteHistory', item)" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
  modelValue: string;
  history?: string[];
  placeHolder: string;
}>();

const emit = defineEmits<{
  (event: "update:modelValue", value: string): void;
  (event: "search", value: string): void;
  (event: "deleteHistory", value: string): void;
  (event: "clearHistory"): void;
}>();

const isActive = ref(false);

const updateInputValue = (e: any) => {
  emit("update:modelValue", e.target.value);
};

// 搜索icon事件
const handleSearchIcon = () => {
  props.modelValue.length ? emit("update:modelValue", "") : emit("search", props.modelValue);
};

const handleClickHistory = (content: string) => {
  emit("update:modelValue", content);
  emit("search", content);
};

const activeSearch = (status: boolean) => {
  isActive.value = status;
};
</script>

<style scoped lang="less">
.my-search {
  width: 50%;
  height: 40px;
  position: relative;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  transition: all 0.6s;
  z-index: 1000;

  .search-input {
    position: relative;
    width: 50%;
    height: 100%;
    transition: all 0.6s;
  }
  .searchInpu-active {
    width: 80%;
  }

  .my-input {
    width: 100%;
    height: 100%;
    outline: none;
    background-color: var(--el-bg-color-overlay);
    border-radius: 10px;
    border: none;
    font-size: 16px;
    text-indent: 1em;
    font-family: myFont;

    &::placeholder {
      font-size: 14px;
    }
    &:focus-within {
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
  }
  .my-icon {
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto 0;
    font-size: 20px;
    height: max-content;
    right: 15px;
    cursor: pointer;
    transition: opacity 0.3s;
    &:hover {
      opacity: 0.6;
    }
  }
  .search-history {
    position: absolute;
    width: 100%;
    top: 70px;
    left: 0;
    max-height: 0;
    overflow: hidden;
    background-color: var(--el-bg-color-page);
    border-radius: 12px;
    transition: all 0.3s;
    .history-container {
      margin-top: 20px;
      .history-list {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
        .history-item {
          position: relative;
          padding: 10px;
          transition: all 0.3s;
          border-radius: 5px;
          cursor: pointer;
          .delete-icon {
            position: absolute;
            top: -7px;
            right: -7px;
            font-size: 20px;
            z-index: 2;
            transition: all 0.3s;
            &:hover {
              color: #f00;
            }
          }
        }
      }
    }
  }
  .search-history-active {
    max-height: 220px;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
}
.search-active {
  transform: translate(50%, 100%);
}
</style>
