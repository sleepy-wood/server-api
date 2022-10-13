import { Injectable } from '@nestjs/common';

import { SMSService } from '@service/index';

@Injectable()
export class SunflowerService {
  constructor(private readonly smsService: SMSService) {}

  async requestSMS(hp: string): Promise<number> {
    let code = Math.floor(Math.random() * 899999) + 100000;
    await this.smsService.sendAuthSMS([hp], `해바라기 케어 인증번호는 [${code}]입니다`);
    return code;
  }

  create() {
    return 'This action adds a new needer';
  }

  findAll() {
    return `This action returns all needer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} needer`;
  }

  update(id: number) {
    return `This action updates a #${id} needer`;
  }

  remove(id: number) {
    return `This action removes a #${id} needer`;
  }
}
