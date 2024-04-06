import { Request } from 'express';
import { User } from './user.entity'; // Assuming this is your User entity

// Extend the Request interface to include a user property of type User
declare module 'express' {
  interface Request {
    user?: User;
  }
}
