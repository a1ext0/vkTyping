import fs from 'fs';
import path from 'path';

class Db {
  _data: any;
  constructor() {
    let file;
    file = fs.readFileSync(path.resolve('var.json')).toString();
    if (typeof file == 'string') {
      this._data = JSON.parse(file);
    } else {
      throw new Error('Error with JSON DB');
    }
  }
  /**
   * Возвращает объект
   */
  get data() {
    return this._data;
  }
  /**
   * Записывает объект в файл
   */
  set data(json: any) {
    console.log(123);

    let str: string;
    str = JSON.stringify(json);
    fs.writeFileSync(path.resolve('var.json'), str);
    this._data = json;
  }
  /**
   * Добавляет пользователя
   */
  add(id: number, name: string): true | false {
    if (!this.data[id]) {
      this.data[id] = name;
      return true;
    } else {
      return false;
    }
  }
  /**
   * Проверяет наличие пользователя
   */
  get(id: number): string | false {
    if (this.data[id]) {
      return this.data[id];
    } else {
      return false;
    }
  }
}

let db = new Db();

db.add(321, 'peter');
console.log(db.get(321));
console.log(db.get(123));
db.data = { 123: 'test2' };
console.log(db.get(123));

// export default new Db();
