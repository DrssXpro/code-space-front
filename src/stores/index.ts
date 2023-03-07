import type { App } from "vue";
import { createPinia } from "pinia";
import useUserStore from "./userStore";
const Pinia = createPinia();

export default function registerPinia(app: App) {
  app.use(Pinia);
  const { addDynamicRoutes } = useUserStore();
  addDynamicRoutes();
}
