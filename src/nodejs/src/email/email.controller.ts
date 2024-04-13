import { Controller, Post, Body } from '@nestjs/common';
import { EmailService } from './email.service';
import { User } from 'src/user/entities/user.entity';
import { ApiTags } from '@nestjs/swagger';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('send')
  @ApiTags('email')
  async sendEmail(
    @Body('user') user: User,
    @Body('to') to: string,
    @Body('subject') subject: string,
    @Body('body') body: string,
  ): Promise<void> {
    await this.emailService.sendEmail(user, to, subject, body);
  }
}
