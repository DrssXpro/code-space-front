type IFormType = "input" | "password" | "select" | "switch" | "tree" | "upload";

export interface ISelectItem {
  value: string;
  text: string;
}

export interface ITreeItem {
  id: number;
  label: string;
  children?: ITreeItem[];
}

export interface IModalConfigItem {
  field: string;
  type: IFormType;
  placeholder?: string;
  label: string;
  labelWidth?: string;
  options?: ISelectItem[]; // select组件选项
  treeOptions?: ITreeItem[]; // tree组件选项
  defaultExpandedKey?: number[]; // 树形组件：默认展开
  defaultCheckKey?: number[]; // 树形组件：默认勾选
}

export default IModalConfigItem;
