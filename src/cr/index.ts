import secret from './secret';

class Credentials {
  vk = {
    tgToken: secret.tgToken,
    vkToken: secret.vkToken,
    user: secret.user,
  };
}

export = new Credentials();
