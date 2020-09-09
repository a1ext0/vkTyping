/// <reference types="../../typings/easyvk" />
import easyvk from 'easyvk';
import { VK } from 'easyvk';
import { Longpoll } from 'easyvk';
import cr from '../cr';
import { EventEmitter } from 'node-telegram-bot-api';
import db from './db';

class Easyvk {
  vk: Promise<VK>;
  longpoll: null | Promise<Longpoll> = null;
  lpSettings = {
    forGetLongPollServer: {
      lp_version: 3,
    },
    forLongPollServer: {
      wait: 25,
      lp_version: 3,
    },
  };
  constructor() {
    this.vk = easyvk({
      token: cr.vk.vkToken,
      v: '5.122',
      utils: {
        longpoll: true,
      },
    });
  }

  async getUser(url: number): Promise<any> {
    let user: any;
    user = db.get(url);
    if (user) {
      return user;
    } else {
      let vk = await this.vk;
      try {
        user = await vk.call('users.get', {
          user_ids: url,
        });
        let name = db.add(user[0]);
        return name;
      } catch (error) {
        if (error.error_code != 113) {
          console.error(error);
        }
        return false;
      }
    }
  }

  async listen(event: EventEmitter) {
    let vk = await this.vk;
    this.longpoll = vk.longpoll.connect(this.lpSettings);
    let l = await this.longpoll;
    l.on('typeInDialog', async (data: any) => {
      if (data[1]) {
        let user = await this.getUser(data[1]);
        event.emit('typing', user);
      }
    });
  }
}
export default new Easyvk();
