export interface IFormConfigItem {
  field: string;
  type: string;
  placeholder?: string;
  label: string;
  labelWidth?: string;
  options?: ISelectItem[];
  remoteSelectFunction?: () => Promise<any>;
}

export interface ISelectItem {
  value: string;
  text: string;
}
