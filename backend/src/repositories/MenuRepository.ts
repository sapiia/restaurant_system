import { AppDataSource } from '../config/database.js';
import { MenuItem } from '../entities/MenuItem.js';
import { Category } from '../entities/Category.js';

export const MenuItemRepository = AppDataSource.getRepository(MenuItem).extend({

  async findAll(categoryId?: string): Promise<MenuItem[]> {
    const qb = this.createQueryBuilder('item')
      .leftJoinAndSelect('item.category', 'category')
      .orderBy('item.created_at', 'DESC');
    if (categoryId) qb.where('item.category_id = :categoryId', { categoryId });
    return await qb.getMany();
  },

  async findByIdWithCategory(id: string): Promise<MenuItem | null> {
    return await this.createQueryBuilder('item')
      .leftJoinAndSelect('item.category', 'category')
      .where('item.id = :id', { id })
      .getOne();
  },
});

export const CategoryRepository = AppDataSource.getRepository(Category).extend({
  async findAll(): Promise<Category[]> {
    return await this.find({ order: { name: 'ASC' } });
  },
});
