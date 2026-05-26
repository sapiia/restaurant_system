import { Request, Response, NextFunction } from 'express';
import menuService from '../services/MenuService.js';

const ok = (res: Response, data: unknown, message = 'Success') => {
  res.status(200).json({ success: true, message, data });
};

const created = (res: Response, data: unknown, message: string) => {
  res.status(201).json({ success: true, message, data });
};

const fail = (res: Response, message: string, status = 400) => {
  res.status(status).json({ success: false, message });
};

const routeParam = (value: string | string[]) => Array.isArray(value) ? value[0] : value;

export const getMenuItems = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { category_id } = req.query as { category_id?: string };
    const items = await menuService.getAllItems(category_id);
    ok(res, items);
  } catch (err) {
    next(err);
  }
};

export const getMenuItemById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const item = await menuService.getItemById(routeParam(req.params.id));
    ok(res, item);
  } catch (err: unknown) {
    if (err instanceof Error && err.message === 'Menu item not found') {
      return void fail(res, err.message, 404);
    }
    next(err);
  }
};

export const createMenuItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const item = await menuService.createItem(req.body);
    created(res, item, 'Menu item created');
  } catch (err: unknown) {
    if (err instanceof Error && err.message === 'Category not found') {
      return void fail(res, err.message, 400);
    }
    next(err);
  }
};

export const updateMenuItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const item = await menuService.updateItem(routeParam(req.params.id), req.body);
    ok(res, item, 'Menu item updated');
  } catch (err: unknown) {
    if (err instanceof Error) {
      if (err.message === 'Menu item not found') return void fail(res, err.message, 404);
      if (err.message === 'Category not found') return void fail(res, err.message, 400);
    }
    next(err);
  }
};

export const toggleAvailability = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const item = await menuService.toggleAvailability(routeParam(req.params.id));
    ok(res, item, `Item is now ${item.is_available ? 'available' : 'unavailable'}`);
  } catch (err: unknown) {
    if (err instanceof Error && err.message === 'Menu item not found') {
      return void fail(res, err.message, 404);
    }
    next(err);
  }
};

export const deleteMenuItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await menuService.deleteItem(routeParam(req.params.id));
    ok(res, null, 'Menu item deleted');
  } catch (err: unknown) {
    if (err instanceof Error && err.message === 'Menu item not found') {
      return void fail(res, err.message, 404);
    }
    next(err);
  }
};

export const getCategories = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const categories = await menuService.getAllCategories();
    ok(res, categories);
  } catch (err) {
    next(err);
  }
};

export const createCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const category = await menuService.createCategory(req.body);
    created(res, category, 'Category created');
  } catch (err) {
    next(err);
  }
};
