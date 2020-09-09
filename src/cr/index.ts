import secret from './secret';

class Credentials {
  vk = {
    token: secret.token,
    user: secret.user,
  };
}

export = new Credentials();
