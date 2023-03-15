import { javascript } from "@codemirror/lang-javascript";
import { java } from "@codemirror/lang-java";
import { python } from "@codemirror/lang-python";
import { php } from "@codemirror/lang-php";
import { css } from "@codemirror/lang-css";
import { cpp } from "@codemirror/lang-cpp";
import { vue } from "@codemirror/lang-vue";
import { oneDark } from "@codemirror/theme-one-dark";
const language: {
  [key: string]: any;
} = {
  JavaScript: javascript(),
  Java: java(),
  Python: python(),
  PHP: php(),
  CSS: css(),
  cpp: cpp(),
  Vue: vue(),
};

const theme = {
  oneDark,
};

export { language, theme };
