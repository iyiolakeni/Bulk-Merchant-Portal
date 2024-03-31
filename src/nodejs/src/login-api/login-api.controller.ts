
import { Controller, Post, Body, UnauthorizedException,Res, Req } from '@nestjs/common';
import { LoginService } from './login-api.service';
import { LoginDto } from './dto/create-login-api.dto';
import { Response, Request } from 'express';
import { User } from '../user/entities/user.entity'
import { JwtService } from '@nestjs/jwt';

@Controller('users')
export class LoginController {
  constructor(
    private readonly loginService: LoginService,
    private readonly jwtService: JwtService,
    ) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<any> {
    const { username, password } = loginDto;
    const user = await this.loginService.findByUsernameAndPassword(username, password);
    if (!user) {
      return { success: false, message: 'Invalid username or password' };
    }
    return { success: true, user};

    const payload = { username: user.username, sub: user.id };
    const token = this.jwtService.sign(payload);

    return { token };
  }

  // @Post('logout')
  // async logout(@Req() req: Request & { session: { user: User } }, @Res() res: Response) {
  //   const user: User = req.session?.user;

  //   if (!user) {
  //     throw new UnauthorizedException('User not logged in');
  //   }

  //   req.session.destroy((err) => {
  //     if (err) {
  //       throw new Error('Error destroying session');
  //     }
  //     res.send({ message: 'Logged out successfully' });
  //   });
  // }
}
