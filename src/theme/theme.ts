interface IThemeItem {
  name: ThemeName;
  color: string;
  desc: string;
}

type ThemeName =
  | "--bg-color"
  | "--nav-color"
  | "--main-color"
  | "--font-color"
  | "--font-main-color"
  | "--font-active-color"
  | "--choose-color";

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
    name: "--main-color",
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
    name: "--main-color",
    color: "#fff",
    desc: "盒子背景色",
  },
  {
    name: "--font-color",
    color: "#bebebe",
    desc: "字体颜色",
  },
  {
    name: "--font-main-color",
    color: "#ffb4be",
    desc: "主字体颜色",
  },
  {
    name: "--font-active-color",
    color: "#fff",
    desc: "选中字体色",
  },
  {
    name: "--choose-color",
    color: "#FF8C8C",
    desc: "选中颜色",
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
    name: "粉色系",
    key: "light",
    value: LIGHT_THEME,
    themeColor: ["#EFEFF4", "#fff", "#ffb4be"],
  },
];

export { DARK_THEME, LIGHT_THEME, THEMES, type IThemeItem, type ThemeName };
