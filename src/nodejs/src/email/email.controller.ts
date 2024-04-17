import { Controller, Get, Req } from '@nestjs/common';
import { EmailService } from './email.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { User } from 'src/user/entities/user.entity';
import { ImapService } from './imap.service';

@Controller('emails')
export class EmailController {
  constructor(
    private readonly emailService: EmailService,
    private readonly imapService: ImapService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  @Get('send')
  async sendEmail(@Req() req: Request) {
    const { to, subject, body } = req.body;
    const userEmail = req.user.email;
    
    try {
        const user = await this.userRepository.findOne({ where: { email: userEmail } });
      if (!user) throw new Error('User not found');

      await this.emailService.sendEmail(user, to, subject, body);
      return { message: 'Email sent successfully' };
    } catch (error) {
      return { error: 'Failed to send email' };
    }
  }

  @Get('receive')
  async receiveEmails(@Req() req: Request) {
    const userEmail = req.user.email;
    
    try {
        const user = await this.userRepository.findOne({ where: { email: userEmail } });
      if (!user) throw new Error('User not found');

      const emails = await this.imapService.receiveEmails(user);
      return { emails };
    } catch (error) {
      return { error: 'Failed to receive emails' };
    }
  }
}
