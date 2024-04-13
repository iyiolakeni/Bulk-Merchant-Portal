import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async sendEmail(user: User, to: string, subject: string, body: string): Promise<void> {
    const mailOptions = {
      from: user.email, // Use user's email
      to,
      subject,
      text: body,
    };

    // Send the email
    await this.transporter.sendMail(mailOptions);
  }
}
