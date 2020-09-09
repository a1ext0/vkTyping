import TGbot from 'node-telegram-bot-api';
import secret from '../cr/secret';

class Bot {
  bot = new TGbot(secret.token, { polling: true });
  user = secret.user;
  constructor() {
    this.bot.onText(/\/listen (.+)/, (msg, match) => {
      if (msg.chat.id == this.user) {
        this.bot.sendMessage(this.user, 'testing');
      }
    });
  }
}

export default new Bot();
