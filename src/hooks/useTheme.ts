import { DARK_THEME, type IThemeItem } from "@/theme/theme";
import myCache from "@/utils/cache";
import { ref } from "vue";
export default function useTheme() {
  const currentTheme = ref<IThemeItem[]>();
  const setTheme = (ThemeArr: IThemeItem[]) => {
    currentTheme.value = ThemeArr;
    ThemeArr.forEach((item) => {
      document.documentElement.style.setProperty(item.name, item.color);
    });
  };

  const saveTheme = (ThemeArr: IThemeItem[]) => {
    myCache.setItem("theme", ThemeArr);
  };

  const init = () => {
    const theme = myCache.getItem<IThemeItem[]>("theme");
    currentTheme.value = theme as IThemeItem[];
    console.log("check:", currentTheme.value);
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
    currentTheme,
  };
}
