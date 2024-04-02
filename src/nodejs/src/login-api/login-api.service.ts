
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Request } from 'express';

// Define a custom interface to represent session data
interface SessionData {
  user?: User; // Define 'user' property with User type
}



@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  // async findByUsernameAndPassword(username: string, password: string): Promise<User | null> {
  //   const user = await this.userRepository.findOne({ where: { username: username } });
  //   if (!user) {
  //     throw new UnauthorizedException('Invalid username or password');
  //   }
  //   const isPasswordValid = await user.comparePassword(password);
  //   if (!isPasswordValid) {
  //     throw new UnauthorizedException('Invalid username or password');
  //   }
  //   return user;
  // }

  async findByUsernameAndPassword(username: string, password: string, req: Request): Promise<User | null> {
    const session = req.session as SessionData; // Cast req.session to SessionData interface
    const user = await this.userRepository.findOne({ where: { username: username } });
    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid username or password');
    }
    // Store user information in session upon successful login
    session.user = user;
    return user;
  }
}