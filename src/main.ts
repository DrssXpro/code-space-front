import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import "@/style/global.less";
import "font-awesome/css/font-awesome.css";
import ClickOutSide from "./directives/outSide";
const app = createApp(App);
app.directive("click-outside", ClickOutSide);
app.use(createPinia());
app.use(router);

app.mount("#app");
