import { ref } from "vue";

// 倒计时hook
export default function useCountDown(time: number) {
  const isStart = ref(false);
  const timeCount = ref(time);
  let timer: any = null;

  const startTimer = () => {
    isStart.value = true;
    timer = setInterval(() => {
      timeCount.value--;
      if (timeCount.value === 0) {
        clearTimer();
      }
    }, 1000);
  };

  const clearTimer = () => {
    timer && clearInterval(timer);
    timer = null;
    isStart.value = false;
    timeCount.value = time;
  };

  return {
    isStart,
    timeCount,
    clearTimer,
    startTimer,
  };
}
