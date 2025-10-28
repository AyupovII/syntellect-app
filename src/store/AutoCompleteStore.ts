// src/models/AutoCompleteStore.ts
import { makeAutoObservable } from 'mobx';
import { getCountryByName } from '../api/apiService';
import { IQuery } from '../types/types';

export class AutoCompleteStore {
  query = { text: '', maxResults: 5 };
  results: { name: string; fullName: string; flag: string }[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setQuery(query: IQuery) {
    this.query = query;
    getCountryByName(query.text).then((res) => this.results = res.slice(0, query.maxResults));
  }

  selectResult(selectedItem: { name: string; fullName: string; flag: string }) {
    this.query.text = selectedItem.name;
    this.results = [];
  }
}
