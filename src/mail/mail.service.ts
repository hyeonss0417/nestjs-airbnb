import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  sendVerificationEmail(email: string, code: string) {
    //TODO: Send verification code to email;
    console.log(`${email} - ${code}`);
    return true;
  }
}
