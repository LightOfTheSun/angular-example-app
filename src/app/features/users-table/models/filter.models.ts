export interface IFilter {
  not: boolean;
  empty: boolean;
  includes?: string;
  startsWith?: string;
  endsWith?: string;
  eq?: string | number;
  le?: number;
  ge?: number;
  less?: number;
  greater?: number;
}

export interface ISortingFilter {
  col: string;
  ascending: boolean;
}

export interface IFilterData {
  col: string;
  filterType: 'string' | 'number' | 'bigint' | 'boolean' | 'symbol' | 'undefined' | 'object' | 'function' | 'mixed';
  filter: IFilter;
  sorting?: boolean;
}
