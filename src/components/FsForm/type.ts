export interface IFormConfigItem {
  field: string;
  type: string;
  placeholder?: string;
  label: string;
  labelWidth?: string;
  options?: ISelectItem[];
  remoteSelectFunction?: (searchValue: string) => Promise<any>;
}

export interface ISelectItem {
  value: string | number;
  text: string;
}
