import { makeAutoObservable } from 'mobx';

class TextControlStore {
  text = '';

  constructor() {
    makeAutoObservable(this);
  }

  setText = (text: string) => {
    this.text = text;
  }

  resetText = () => {
    this.text = '';
  }

  helloWorld = () => {
    this.text = 'Hello world!';
  }
}

export const store = new TextControlStore();