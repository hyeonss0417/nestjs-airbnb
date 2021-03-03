import { Injectable } from '@nestjs/common';
import { IEmail } from '../common/interfaces/utils.interface';
import * as nodemailer from 'nodemailer';
import * as sgTransport from 'nodemailer-sendgrid-transport';

@Injectable()
export class MailService {
  sendMail(email: IEmail) {
    const options = {
      auth: {
        api_key: process.env.SENDGRID_APIKEY,
      },
    };
    const client = nodemailer.createTransport(sgTransport(options));
    return client.sendMail(email);
  }

  sendVerificationEmail(address: string, code: string) {
    const email = {
      from: 'welcome@nestbnb.com',
      to: address,
      subject: '🔐 Verification Secret for Nestbnb 🔐',
      html: `Hello! Click this <a href="http://${process.env.HOST_NAME}/auth/verification/${code}">link</a> to activate your account.`,
    };
    console.log(`${address} - ${code}`);
    return this.sendMail(email);
  }
}
