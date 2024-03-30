
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity'
import { compare } from 'bcrypt';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async findByUsernameAndPassword(username: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { username: username, password: password } });
    if (!user) {
      throw new UnauthorizedException('Invalid username');
    }
    if (!user.password) {
      throw new UnauthorizedException('Invalid password');
    }
    return user;
  }
}