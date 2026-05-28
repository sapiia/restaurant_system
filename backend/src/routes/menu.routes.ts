import { Router } from 'express';
import {
  getMenuItems, getMenuItemById, createMenuItem,
  updateMenuItem, toggleAvailability, deleteMenuItem,
  getCategories, createCategory,
} from '../controllers/MenuController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { roleMiddleware } from '../middlewares/roleMiddleware.js';

const router = Router();

// ── Categories ─────────────────────────────────────────────────────────
router.get('/categories',              getCategories);
router.post('/categories',             authMiddleware, roleMiddleware('ADMIN'), createCategory);

// ── Menu Items ─────────────────────────────────────────────────────────
router.get('/items',              getMenuItems);
router.get('/items/:id',          getMenuItemById);
router.post('/items',             authMiddleware, roleMiddleware('ADMIN'), createMenuItem);
router.patch('/items/:id',        authMiddleware, roleMiddleware('ADMIN'), updateMenuItem);
router.patch('/items/:id/toggle', authMiddleware, roleMiddleware('ADMIN'), toggleAvailability);
router.delete('/items/:id',       authMiddleware, roleMiddleware('ADMIN'), deleteMenuItem);

export default router;