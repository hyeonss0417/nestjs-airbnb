import { Injectable } from '@nestjs/common';
import { IEmail } from '../common/interfaces/utils.interface';
import nodemailer from 'nodemailer';
import sgTransport from 'nodemailer-sendgrid-transport';

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
      html: `Hello! Click <link href={http://${process.env.HOST_NAME}/auth/verification/${code}}>this link</link> to activate your account.`,
    };
    //TODO: Send verification code to email;
    console.log(`${email} - ${code}`);
    return true;
  }
}
