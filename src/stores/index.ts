import type { App } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
const Pinia = createPinia();

export default function registerPinia(app: App) {
  Pinia.use(piniaPluginPersistedstate); // 使用持久化插件
  app.use(Pinia);
}
