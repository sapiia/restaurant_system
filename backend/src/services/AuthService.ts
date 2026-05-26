import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories/UserRepository.js';

interface LoginResult {
  accessToken: string;
  user: { id: number; email: string; role: string };
}

interface RegisterDto {
  name: string;
  email: string;
  password: string;
  role?: 'ADMIN' | 'CHEF' | 'CASHIER' | 'CUSTOMER';
}

export class AuthService {
  constructor(private userRepository: UserRepository) {}

  async getAllUsers() {
    return this.userRepository.findAll();
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new Error('User not found');
    return user;
  }

  async login(email: string, password: string): Promise<LoginResult> {
    const user = await this.userRepository.findByEmail(email);
    if (!user || !user.is_active) throw new Error('Invalid credentials');

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error('Invalid credentials');

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: '1h' }
    );

    return {
      accessToken: token,
      user: { id: user.id, email: user.email, role: user.role },
    };
  }

  async register(data: RegisterDto): Promise<Omit<LoginResult['user'], never>> {
    const existing = await this.userRepository.findByEmail(data.email);
    if (existing) throw new Error('Email already in use');

    const hashed = await bcrypt.hash(data.password, 10);
    const user = await this.userRepository.create({ ...data, password: hashed });

    return { id: user.id, email: user.email, role: user.role };
  }

  async updateProfile(
    id: number,
    data: Partial<{ name: string; email: string; password: string }>
  ) {
    const user = await this.userRepository.findById(id);
    if (!user) throw new Error('User not found');

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    return this.userRepository.update(id, data);
  }

  async updateUser(
    id: number,
    data: Partial<{ name: string; email: string; role?: 'ADMIN' | 'CHEF' | 'CASHIER' | 'CUSTOMER'; is_active: boolean }>
  ) {
    const user = await this.userRepository.findById(id);
    if (!user) throw new Error('User not found');

    return this.userRepository.update(id, data);
  }

  async deleteUser(id: number) {
    const user = await this.userRepository.findById(id);
    if (!user) throw new Error('User not found');

    const deleted = await this.userRepository.delete(id);
    if (!deleted) throw new Error('Failed to delete user');

    return { message: 'User deleted successfully' };
  }

  async logout() {
    return { message: 'Logged out successfully' };
  }
}