import type { App } from "vue";
import { createPinia } from "pinia";
const Pinia = createPinia();

export default function registerPinia(app: App) {
  app.use(Pinia);
}
