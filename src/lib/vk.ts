/// <reference types="../../typings/easyvk" />
import easyvk from 'easyvk';
import { VK } from 'easyvk';
import { Longpoll } from 'easyvk';
import cr from '../cr';
import { EventEmitter } from 'node-telegram-bot-api';

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
  async listen(event: EventEmitter) {
    let vk = await this.vk;
    this.longpoll = vk.longpoll.connect(this.lpSettings);
    let l = await this.longpoll;
    l.on('typeInDialog', (data: any) => {
      if (data[1]) {
        event.emit('typing', data[1]);
      }
    });
  }
}
export default new Easyvk();
