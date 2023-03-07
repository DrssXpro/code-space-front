import { createApp } from "vue";
import Pinia from "./stores/index";
import App from "./App.vue";
import router from "./router";
import "@/style/global.less";
import "element-plus/theme-chalk/dark/css-vars.css";
import "element-plus/es/components/message/style/css";
import "element-plus/es/components/message-box/style/css";
import "font-awesome/css/font-awesome.css";
import { vLoading } from "element-plus/es/components/loading/src/directive";
import ClickOutSide from "./directives/outSide";
const app = createApp(App);
app.directive("click-outside", ClickOutSide);
app.directive("loading", vLoading);
app.use(Pinia);
app.use(router);

app.mount("#app");
