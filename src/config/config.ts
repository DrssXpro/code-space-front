import type { TLanguage } from "@/types/codeType";

const FAKE_IMAGE = "http://pic.fasyncsy.com.cn/coverPic/fake.png";

const EMPTY_IMAGE = "http://pic.fasyncsy.com.cn/empty.png";

const LANGUAGE = ["JavaScript", "Java", "Python", "PHP", "CSS", "cpp", "Vue"];

const EXTMAP: Record<TLanguage, string> = {
  JavaScript: "js",
  Java: "java",
  Python: "py",
  CSS: "css",
  cpp: "cpp",
  Vue: "vue",
  PHP: "php",
};

export { FAKE_IMAGE, EMPTY_IMAGE, LANGUAGE, EXTMAP };
