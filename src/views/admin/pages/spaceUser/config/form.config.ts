import type { IFormConfigItem } from "@/components/FsForm/type";

const formConfig: IFormConfigItem[] = [
  {
    label: "用户名查询",
    placeholder: "请输入用户名",
    field: "nameKw",
    type: "input",
  },
  {
    label: "空间昵称查询",
    placeholder: "请输入空间昵称",
    field: "nickKw",
    type: "input",
  },
];

export default formConfig;
