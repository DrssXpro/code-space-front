import { DARK_THEME, type IThemeItem } from "@/theme/theme";
import myCache from "@/utils/cache";
export default function useTheme() {
  const setTheme = (ThemeArr: IThemeItem[]) => {
    ThemeArr.forEach((item) => {
      document.documentElement.style.setProperty(item.name, item.color);
    });
  };

  const saveTheme = (ThemeArr: IThemeItem[]) => {
    myCache.setItem("theme", ThemeArr);
  };

  const init = () => {
    const theme = myCache.getItem<IThemeItem[]>("theme");
    if (theme) {
      setTheme(theme);
    } else {
      setTheme(DARK_THEME);
      saveTheme(DARK_THEME);
    }
  };
  return {
    init,
    setTheme,
    saveTheme,
  };
}
