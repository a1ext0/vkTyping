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
   * Добавляет пользователя
   */
  add(user: any): string | false {
    if (!this.data[user.id]) {
      let name = `${user.first_name} ${user.last_name}`;
      this._data[user.id] = name;
      let str: string;
      str = JSON.stringify(this.data);
      fs.writeFileSync(path.resolve('var.json'), str);
      return name;
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

export default new Db();
