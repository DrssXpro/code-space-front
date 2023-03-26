import type { TLanguage } from "@/types/codeType";

const BASE_IMAGE = "https://pic.fasyncsy.com.cn"

const FAKE_IMAGE = "https://pic.fasyncsy.com.cn/coverPic/fake.png";

const EMPTY_IMAGE = "https://pic.fasyncsy.com.cn/empty.png";

const DEFAULT_AVATAR = "https://pic.fasyncsy.com.cn/avatar/default.jpg";

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

export { BASE_IMAGE,FAKE_IMAGE, EMPTY_IMAGE, DEFAULT_AVATAR, LANGUAGE, EXTMAP };
