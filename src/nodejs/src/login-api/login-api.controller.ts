import { Controller, Post, Body, UnauthorizedException,Res, Req } from '@nestjs/common';
import { LoginService } from './login-api.service';
import { LoginDto } from './dto/create-login-api.dto';
import { Response, Request } from 'express';
import { Session } from '@nestjs/common';
import { User } from '../user/entities/user.entity'

@Controller('users')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Session() session: Record<string, any>): Promise<any> {
    const { email, password } = loginDto;
    const user = await this.loginService.findByEmailAndPassword(email, password);
    if (!user) {
      return { success: false, message: 'Invalid username or password' };
    }
    session.user = user;
    return { success: true, user };
  }

  @Post('logout')
  async logout(@Req() req: Request & { session: { user: User } }, @Res() res: Response) {
    const user: User = req.session?.user;

    if (!user) {
      throw new UnauthorizedException('User not logged in');
    }

    req.session.destroy((err) => {
      if (err) {
        throw new Error('Error destroying session');
      }
      res.send({ message: 'Logged out successfully' });
    });
  }
}
