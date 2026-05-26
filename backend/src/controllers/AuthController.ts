import { Request, Response } from 'express';
import { AuthService } from '../services/AuthService.js';

export class AuthController {
    constructor(private authService: AuthService) { }

    async getAllUsers(req: Request, res: Response): Promise<void> {
        try {
            const users = await this.authService.getAllUsers();
            res.status(200).json({
                success: true,
                message: 'Users fetched successfully',
                data: users,
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }

    async login(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body;
            const result = await this.authService.login(email, password);
            res.status(200).json({
                success: true,
                message: 'Authentication successful',
                data: result,
            });
        } catch (error: any) {
            const isCredentialError = error.message === 'Invalid credentials';
            res.status(isCredentialError ? 401 : 500).json({
                success: false,
                message: error.message,
            });
        }
    }

    async register(req: Request, res: Response): Promise<void> {
        try {
            const result = await this.authService.register(req.body);
            res.status(201).json({
                success: true,
                message: 'User registered successfully',
                data: result,
            });
        } catch (error: any) {
            res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    }
}
