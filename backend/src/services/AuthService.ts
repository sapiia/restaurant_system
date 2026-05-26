import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories/UserRepository.js';

interface LoginResult {
    accessToken: string;
    user: { id: string; email: string; role: string };
}

interface RegisterDto {
    name: string;
    email: string;
    password: string;
    role?: 'ADMIN' | 'CHEF' | 'CASHIER'| 'CUSTOMER';
}

export class AuthService {
    UserRepository: any;
    constructor(private userRepository: UserRepository) { }

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
        if (!user || !user.is_active)
            throw new Error('Invalid credentials');

        const valid = await bcrypt.compare(password, user.password);
        if (!valid)
            throw new Error('Invalid credentials');

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
        if (existing)
            throw new Error('Email already in use');

        const hashed = await bcrypt.hash(data.password, 10);
        const user = await this.userRepository.create({ ...data, password: hashed });

        return { id: user.id, email: user.email, role: user.role };
    }
}
