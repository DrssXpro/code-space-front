import { defineStore } from "pinia";
import { ref } from "vue";

const usePwdStore = defineStore(
  "codePwd",
  () => {
    const codePwd = ref<string[]>([]);

    // 输入过后的密码加入到队列中
    function addCodePwd(codeId: string) {
      codePwd.value.unshift(codeId);
    }

    // 清空保存加密代码
    function clearCodePwd() {
      codePwd.value = [];
    }

    return {
      codePwd,
      addCodePwd,
      clearCodePwd,
    };
  },
  {
    persist: {
      storage: window.localStorage,
      key: "codePwd",
    },
  }
);

export default usePwdStore;
