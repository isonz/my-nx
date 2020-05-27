export interface QueryResultList<T> {
  list?: T[],
  count?: number;
  query?: QueryResultParam;
}

export interface QueryResultParam {
  index?: number;
  size?: number;
  filter?: any;
}
