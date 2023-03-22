import { defineStore } from "pinia";
import { ref } from "vue";

const useHistoryStore = defineStore(
  "history",
  () => {
    const searchHistory = ref<string[]>([]);

    // 添加历史记录
    function addSearchHistory(value: string) {
      if (searchHistory.value.includes(value) || !value) return;
      searchHistory.value.unshift(value);
    }

    // 删除指定历史记录
    function removeSearchHistory(value: string) {
      searchHistory.value = searchHistory.value.filter((item) => item !== value);
    }

    // 清空记录
    function clearSearchHistory() {
      searchHistory.value = [];
    }

    return {
      searchHistory,
      addSearchHistory,
      removeSearchHistory,
      clearSearchHistory,
    };
  },
  {
    persist: {
      storage: localStorage,
      paths: ["searchHistory"],
    },
  }
);

export default useHistoryStore;
