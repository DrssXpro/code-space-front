// 广场代码搜索
export interface ISquareSearchPayload {
  lan: string;
  sort: 1 | 2 | 3;
}

// 搜索界面
export interface ISearchPayload {
  kw: string;
  lan: string[];
  sort: 1 | 2 | 3;
  isPwd: false;
}
