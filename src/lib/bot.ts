import TGbot from 'node-telegram-bot-api';
import secret from '../cr/secret';
import EventEmitter from 'events';
import vk from './vk';

class Bot {
  event = new EventEmitter();
  bot = new TGbot(secret.tgToken, { polling: true });
  user = secret.user;
  constructor() {
    this.bot.onText(/\/listen/, (msg, match) => {
      this.listen();
      this.bot.sendMessage(this.user, 'listening');
      this.event.on('typing', (user) => {
        this.bot.sendMessage(this.user, `${user} набирает сообщение!`);
      });
    });
  }
  async listen() {
    (await vk).listen(this.event);
  }
}

export default new Bot();
