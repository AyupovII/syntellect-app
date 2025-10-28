export interface IQuery { text: string; maxResults: number };
export interface IAutoCompleteStore {
  query: IQuery;
  results: { name: string; fullName: string; flag: string }[];
  setQuery(query: IQuery): void;
  selectResult(selectedItem: { name: string; fullName: string; flag: string }): void;
}