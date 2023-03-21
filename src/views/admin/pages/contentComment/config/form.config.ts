import type { IFormConfigItem } from "@/components/FsForm/type";

const formConfig: IFormConfigItem[] = [
  {
    label: "关键词查询",
    placeholder: "请输入评论内容",
    field: "kw",
    type: "input",
  },
  {
    label: "指定代码查询",
    placeholder: "请输入代码id查询",
    field: "code",
    type: "input",
  },
];

export default formConfig;
