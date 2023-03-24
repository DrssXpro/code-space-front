import { defineStore } from "pinia";
import { ref } from "vue";

const useHistoryStore = defineStore(
  "history",
  () => {
    const searchHistory = ref<string[]>([]);
    const spaceSearchHistory = ref<string[]>([]);

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

    // 空间列表：添加历史记录
    function addSpaceSearchHistory(value: string) {
      if (spaceSearchHistory.value.includes(value) || !value) return;
      spaceSearchHistory.value.unshift(value);
    }

    // 空间列表：删除指定历史记录
    function removeSpaceSearchHistory(value: string) {
      spaceSearchHistory.value = spaceSearchHistory.value.filter((item) => item !== value);
    }

    // 空间列表：清空记录
    function clearSpaceSearchHistory() {
      spaceSearchHistory.value = [];
    }

    return {
      searchHistory,
      spaceSearchHistory,
      addSearchHistory,
      removeSearchHistory,
      clearSearchHistory,
      addSpaceSearchHistory,
      removeSpaceSearchHistory,
      clearSpaceSearchHistory,
    };
  },
  {
    persist: {
      storage: localStorage,
      paths: ["searchHistory", "spaceSearchHistory"],
    },
  }
);

export default useHistoryStore;
