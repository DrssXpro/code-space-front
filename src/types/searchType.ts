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

// 空间搜索
export interface ISpaceSearchPayload {
  kw: string;
  task: number | undefined;
  lan: string[];
  sort: 1 | 2 | 3;
  status: 1 | 2;
}
