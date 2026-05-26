import { Router } from 'express';
import { AuthController } from '../controllers/AuthController.js';
import { AuthService } from '../services/AuthService.js';
import { UserRepository } from '../repositories/UserRepository.js';

const router = Router();
const userRepository = new UserRepository();
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

router.get('/users', (req, res) => authController.getAllUsers(req, res));
router.post('/login',    (req, res) => authController.login(req, res));
router.post('/register', (req, res) => authController.register(req, res));

export default router;
