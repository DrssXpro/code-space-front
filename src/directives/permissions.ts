import type { ObjectDirective } from "vue";
import useUserStore from "@/stores/userStore";
export default {
  mounted(el, binding) {
    const perm = binding.value as unknown as string[];
    const { powerPerms } = useUserStore();
    if (!powerPerms.includes(perm[0])) {
      el.parentNode?.removeChild(el);
    }
  },
} as ObjectDirective<HTMLElement, () => void>;
