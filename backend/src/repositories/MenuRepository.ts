import { AppDataSource } from '../config/database.js';
import { MenuItem } from '../entities/MenuItem.js';
import { Category } from '../entities/Category.js';

export const MenuItemRepository = AppDataSource.getRepository(MenuItem).extend({

  findAll(categoryId?: string) {
    const qb = this.createQueryBuilder('item')
      .leftJoinAndSelect('item.category', 'category')
      .orderBy('item.created_at', 'DESC');
    if (categoryId) qb.where('item.category_id = :categoryId', { categoryId });
    return qb.getMany();
  },

  findByIdWithCategory(id: string) {
    return this.createQueryBuilder('item')
      .leftJoinAndSelect('item.category', 'category')
      .where('item.id = :id', { id })
      .getOne();
  },
});

export const CategoryRepository = AppDataSource.getRepository(Category).extend({
  findAll() {
    return this.find({ order: { name: 'ASC' } });
  },
});