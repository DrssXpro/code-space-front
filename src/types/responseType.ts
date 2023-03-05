// 公共返回信息
export interface IResponseData<T = any> {
  code: number;
  message: string;
  data: T;
}

// 返回数据列表信息
export interface IList<T> {
  count: number;
  rows: T[];
}
