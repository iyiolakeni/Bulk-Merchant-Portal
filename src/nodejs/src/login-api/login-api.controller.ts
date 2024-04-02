import { Controller, Post, Body, UnauthorizedException,Res, Req } from '@nestjs/common';
import { LoginService } from './login-api.service';
import { LoginDto } from './dto/create-login-api.dto';

@Controller('users')
export class LoginController {
  constructor(
    private readonly loginService: LoginService,
    ) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<any> {
    const { username, password } = loginDto;
    const user = await this.loginService.findByUsernameAndPassword(username, password);
    if (!user) {
      return { success: false, message: 'Invalid username or password' };
    }
    return { success: true, user};
  }
}
