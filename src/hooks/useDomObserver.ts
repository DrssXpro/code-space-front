import { domObserver } from "@/utils/tools";
import { onMounted, isRef, type Ref } from "vue";

export default function useDomObserver(el: Ref<HTMLElement | undefined> | HTMLElement, cb: () => void) {
  onMounted(() => {
    const isElement = isRef(el);
    // 不是dom元素或者传递不存在
    if (!el || (isElement && !el.value)) return;
    domObserver(isElement ? el.value! : el, cb);
  });
}
