import type { App, Directive } from "vue";
import outSide from "./outSide";
import permissions from "./permissions";
import { vLoading } from "element-plus/es/components/loading/src/directive";

const directives: Record<string, Directive<any, any>> = {
  clickOutside: outSide,
  loading: vLoading,
  permissions: permissions,
};

export default function (app: App) {
  for (const i in directives) {
    app.directive(i, directives[i]);
  }
}
