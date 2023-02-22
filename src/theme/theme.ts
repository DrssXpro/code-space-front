interface IThemeItem {
  name: ThemeName;
  color: string;
  desc: string;
}

type ThemeName =
  | "--bg-color"
  | "--nav-color"
  | "--el-bg-color-overlay"
  | "--font-color"
  | "--font-main-color"
  | "--font-active-color"
  | "--choose-color"
  | "--table-font-color"
  | "--table-border-color";

const DARK_THEME: IThemeItem[] = [
  {
    name: "--bg-color",
    color: "#1e1d2b",
    desc: "主背景色",
  },
  {
    name: "--nav-color",
    color: "#2f3042",
    desc: "导航颜色",
  },
  {
    name: "--el-bg-color-overlay",
    color: "#222433",
    desc: "盒子背景色",
  },
  {
    name: "--font-color",
    color: "#ffffffa3",
    desc: "字体颜色",
  },
  {
    name: "--font-main-color",
    color: "#fff",
    desc: "主字体颜色",
  },
  {
    name: "--font-active-color",
    color: "#fff",
    desc: "选中字体色",
  },
  {
    name: "--choose-color",
    color: "#68C6BD",
    desc: "选中颜色",
  },

  {
    name: "--table-font-color",
    color: "#fff",
    desc: "表格字体颜色",
  },
  {
    name: "--table-border-color",
    color: "#0E3636",
    desc: "表格边框颜色",
  },
];

const LIGHT_THEME: IThemeItem[] = [
  {
    name: "--bg-color",
    color: "#EFEFF4",
    desc: "主背景色",
  },
  {
    name: "--nav-color",
    color: "#fff",
    desc: "导航颜色",
  },
  {
    name: "--el-bg-color-overlay",
    color: "#fff",
    desc: "盒子背景色",
  },
  {
    name: "--font-color",
    color: "#aaa",
    desc: "字体颜色",
  },
  {
    name: "--font-main-color",
    color: "#000",
    desc: "主字体颜色",
  },
  {
    name: "--font-active-color",
    color: "#fff",
    desc: "选中字体色",
  },
  {
    name: "--choose-color",
    color: "#000",

    desc: "选中颜色",
  },
  {
    name: "--table-font-color",
    color: "#000",
    desc: "表格字体颜色",
  },
  {
    name: "--table-border-color",
    color: "#eee",
    desc: "表格边框颜色",
  },
];

const THEMES = [
  {
    name: "暗黑系",
    key: "dark",
    value: DARK_THEME,
    themeColor: ["#1e1d2b", "#2f3042", "#222433"],
  },
  {
    name: "黑白系",
    key: "light",
    value: LIGHT_THEME,
    themeColor: ["#EFEFF4", "#fff", "#000"],
  },
];

export { DARK_THEME, LIGHT_THEME, THEMES, type IThemeItem, type ThemeName };
