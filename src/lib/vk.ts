/// <reference types="../../typings/easyvk" />
import easyvk from 'easyvk';
import { VK } from 'easyvk';
import cr from '../cr';

class Easyvk {
  vk: Promise<VK>;
  constructor() {
    this.vk = easyvk({
      token: cr.vk.token,
      v: '5.122',
    });
  }
}
export default new Easyvk();
