import { Request, Response } from 'express';
import { AuthService } from '../services/AuthService.js';

export class AuthController {
    constructor(private authService: AuthService) { }

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

    async logout(req: Request, res: Response): Promise<void> {
        try {
            const result = await this.authService.logout();
            res.status(200).json({
                success: true,
                message: result.message,
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }

    async updateProfile(req: Request, res: Response): Promise<void> {
        try {
            const id = Number(req.user!.id);
            const user = await this.authService.updateProfile(id, req.body);
            res.status(200).json({
                success: true,
                message: 'Profile updated successfully',
                data: user,
            });
        } catch (error: any) {
            res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    }

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

    async findByEmail(req: Request, res: Response): Promise<void> {
        try {
            const email = Array.isArray(req.params.email) ? req.params.email[0] : req.params.email;
            const user = await this.authService.findByEmail(email);
            res.status(200).json({
                success: true,
                message: 'User fetched successfully',
                data: user,
            });
        } catch (error: any) {
            res.status(404).json({
                success: false,
                message: error.message,
            });
        }
    }

    async updateUser(req: Request, res: Response): Promise<void> {
        try {
            const id = Number(req.params.id);
            const user = await this.authService.updateUser(id, req.body);
            res.status(200).json({
                success: true,
                message: 'User updated successfully',
                data: user,
            });
        } catch (error: any) {
            res.status(404).json({
                success: false,
                message: error.message,
            });
        }
    }

    async deleteUser(req: Request, res: Response): Promise<void> {
        try {
            const id = Number(req.params.id);
            const result = await this.authService.deleteUser(id);
            res.status(200).json({
                success: true,
                message: result.message,
            });
        } catch (error: any) {
            res.status(404).json({
                success: false,
                message: error.message,
            });
        }
    }
}