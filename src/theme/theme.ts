interface IThemeItem {
  name: ThemeName;
  color: string;
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
  },
  {
    name: "--nav-color",
    color: "#2f3042",
  },
  {
    name: "--main-color",
    color: "#222433",
  },
  {
    name: "--font-color",
    color: "#ffffffa3",
  },
  {
    name: "--font-main-color",
    color: "#fff",
  },
  {
    name: "--font-active-color",
    color: "#fff",
  },
  {
    name: "--choose-color",
    color: "#68C6BD",
  },
];

const LIGHT_THEME: IThemeItem[] = [
  {
    name: "--bg-color",
    color: "#EFEFF4",
  },
  {
    name: "--nav-color",
    color: "#fff",
  },
  {
    name: "--main-color",
    color: "#fff",
  },
  {
    name: "--font-color",
    color: "#bebebe",
  },
  {
    name: "--font-main-color",
    color: "#ffb4be",
  },
  {
    name: "--font-active-color",
    color: "#fff",
  },
  {
    name: "--choose-color",
    color: "#FF8C8C",
  },
];

export { DARK_THEME, LIGHT_THEME, type IThemeItem, type ThemeName };
