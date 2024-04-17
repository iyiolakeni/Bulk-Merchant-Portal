import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'your-email@gmail.com', // You may consider using a dedicated email for sending emails
        pass: 'your-password',
      },
    });
  }

  async sendEmail(user: User, to: string, subject: string, body: string) {
    await this.transporter.sendMail({
      from: user.email, // Use the authenticated user's email
      to,
      subject,
      text: body,
    });
  }
}
