import { Router } from 'express';
import {
  getMenuItems, getMenuItemById, createMenuItem,
  updateMenuItem, toggleAvailability, deleteMenuItem,
  getCategories, createCategory,
} from '../controllers/MenuController.js';

const router = Router();

// Categories
router.get('/categories',     getCategories);
router.post('/categories',    createCategory);

// Menu Items
router.get('/menu-items',          getMenuItems);
router.get('/menu-items/:id',      getMenuItemById);
router.post('/menu-items',         createMenuItem);
router.patch('/menu-items/:id',    updateMenuItem);
router.patch('/menu-items/:id/toggle', toggleAvailability);
router.delete('/menu-items/:id',   deleteMenuItem);

export default router;