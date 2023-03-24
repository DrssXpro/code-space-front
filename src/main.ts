import { createApp } from "vue";
import Pinia from "./stores/index";
import App from "./App.vue";
import router from "./router";
import "@/style/global.less";
import "element-plus/theme-chalk/dark/css-vars.css";
import "element-plus/es/components/loading/style/css";
import "element-plus/es/components/message/style/css";
import "element-plus/es/components/message-box/style/css";
import "font-awesome/css/font-awesome.css";
import directives from "./directives";
const app = createApp(App);
app.use(directives);
app.use(Pinia);
app.use(router);

app.mount("#app");
