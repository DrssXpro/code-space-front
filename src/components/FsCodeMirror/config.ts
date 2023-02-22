import { javascript } from "@codemirror/lang-javascript";
import { java } from "@codemirror/lang-java";
import { python } from "@codemirror/lang-python";
import { php } from "@codemirror/lang-php";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { cpp } from "@codemirror/lang-cpp";
import { vue } from "@codemirror/lang-vue";
import { sql } from "@codemirror/lang-sql";
import { oneDark } from "@codemirror/theme-one-dark";
const language: {
  [key: string]: any;
} = {
  JavaScript: javascript(),
  Java: java(),
  Python: python(),
  PHP: php(),
  HTML: html(),
  CSS: css(),
  cpp: cpp(),
  Vue: vue(),
  SQL: sql(),
};

const theme = {
  oneDark,
};

export { language, theme };
