export default class LocalStorage {
  key: string;
  value: IValue;
  storage = window.sessionStorage;

  constructor(key: string, value: IValue) {
    this.key = key;
    this.value = value;
  }

  find(): IValue {
    const value = this.storage.getItem(this.key);
    return value ? JSON.parse(value) : null;
  }

  save(value: IValue): IValue {
    const newValue = value || this.value;
    this.storage.setItem(this.key, JSON.stringify(newValue));
    return this.find();
  }

  remove(): IValue {
    this.storage.removeItem(this.key);
    return this.find();
  }
}

type IValue = string | object | number | boolean | null | Array<IValue>;
