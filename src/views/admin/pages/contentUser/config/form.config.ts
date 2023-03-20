import type { IFormConfigItem } from "@/components/FsForm/type";

const formConfig: IFormConfigItem[] = [
  {
    label: "关键词查询",
    placeholder: "请输入用户名",
    field: "kw",
    type: "input",
  },
  {
    label: "邮箱查询",
    placeholder: "请输入用户邮箱",
    field: "email",
    type: "input",
  },
];

export default formConfig;
