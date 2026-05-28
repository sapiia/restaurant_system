import { Router, Request, Response } from 'express';
import { AuthController } from '../controllers/AuthController.js';
import { AuthService } from '../services/AuthService.js';
import { UserRepository } from '../repositories/UserRepository.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { roleMiddleware } from '../middlewares/roleMiddleware.js';

const router = Router();
const userRepository = new UserRepository();
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

// Public
router.post('/login',             (req: Request, res: Response) => authController.login(req, res));
router.post('/register',          (req: Request, res: Response) => authController.register(req, res));
// router.post('/verify-email',      (req: Request, res: Response) => authController.verifyEmail(req, res));
// router.post('/send-verification', (req: Request, res: Response) => authController.sendVerificationCode(req, res));

// Any logged-in user
router.get('/profile',  authMiddleware, (req: Request, res: Response) => authController.getProfile(req, res));
router.put('/profile',  authMiddleware, (req: Request, res: Response) => authController.updateProfile(req, res));
router.post('/logout',  authMiddleware, (req: Request, res: Response) => authController.logout(req, res));

// ADMIN only
router.get('/users',          authMiddleware, roleMiddleware('ADMIN'), (req: Request, res: Response) => authController.getAllUsers(req, res));
router.get('/users/:email',   authMiddleware, roleMiddleware('ADMIN'), (req: Request, res: Response) => authController.findByEmail(req, res));
router.put('/users/:id',      authMiddleware, roleMiddleware('ADMIN'), (req: Request, res: Response) => authController.updateUser(req, res));
router.delete('/users/:id',   authMiddleware, roleMiddleware('ADMIN'), (req: Request, res: Response) => authController.deleteUser(req, res));

export default router;