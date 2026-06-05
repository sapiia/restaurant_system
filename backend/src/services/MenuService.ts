import { MenuItemRepository, CategoryRepository } from '../repositories/MenuRepository.js';
import { MenuItem } from '../entities/MenuItem.js';
import { Category } from '../entities/Category.js';

export interface CreateMenuItemDto {
  name: string;
  description?: string;
  price: number;
  image?: string;
  image_url?: string;
  imageUrl?: string;
  category_id: string;
  is_available?: boolean;
}

export interface UpdateMenuItemDto {
  name?: string;
  description?: string;
  price?: number;
  image?: string;
  image_url?: string;
  imageUrl?: string;
  category_id?: string;
  is_available?: boolean;
}

class MenuService {

  // ── Menu Items ─────────────────────────────────────────────────────────

  async getAllItems(categoryId?: string): Promise<MenuItem[]> {
    return await MenuItemRepository.findAll(categoryId);
  }

  async getItemById(id: string): Promise<MenuItem> {
    const item = await MenuItemRepository.findByIdWithCategory(id);
    if (!item) throw new Error('Menu item not found');
    return item;
  }

  async createItem(dto: CreateMenuItemDto): Promise<MenuItem> {
    const category = await CategoryRepository.findOneBy({ id: dto.category_id });
    if (!category) throw new Error('Category not found');

    const item = MenuItemRepository.create({
      name: dto.name.trim(),
      description: dto.description?.trim() ?? null,
      price: dto.price,
      image: this.normalizeImage(dto),
      category_id: dto.category_id,
      is_available: dto.is_available ?? true,
    });
    return await MenuItemRepository.save(item);
  }

  async updateItem(id: string, dto: UpdateMenuItemDto): Promise<MenuItem> {
    const item = await MenuItemRepository.findOneBy({ id });
    if (!item) throw new Error('Menu item not found');

    if (dto.category_id) {
      const category = await CategoryRepository.findOneBy({ id: dto.category_id });
      if (!category) throw new Error('Category not found');
    }

    const { image_url, imageUrl, ...updates } = dto;
    MenuItemRepository.merge(item, {
      ...updates,
      image: this.normalizeImage({ image: dto.image, image_url, imageUrl }) ?? item.image,
    });
    return await MenuItemRepository.save(item);
  }

  async toggleAvailability(id: string): Promise<MenuItem> {
    const item = await MenuItemRepository.findOneBy({ id });
    if (!item) throw new Error('Menu item not found');
    item.is_available = !item.is_available;
    return await MenuItemRepository.save(item);
  }

  async deleteItem(id: string): Promise<void> {
    const item = await MenuItemRepository.findOneBy({ id });
    if (!item) throw new Error('Menu item not found');
    await MenuItemRepository.remove(item);
  }

  // ── Categories ─────────────────────────────────────────────────────────

  async getAllCategories(): Promise<Category[]> {
    return await CategoryRepository.findAll();
  }

  async createCategory(dto: { name: string; description?: string }): Promise<Category> {
    const category = CategoryRepository.create({
      name: dto.name.trim(),
      description: dto.description?.trim() ?? null,
    });
    return await CategoryRepository.save(category);
  }

  private normalizeImage(dto: Pick<CreateMenuItemDto, 'image' | 'image_url' | 'imageUrl'>): string | null {
    return (dto.image ?? dto.image_url ?? dto.imageUrl)?.trim() || null;
  }
}

export default new MenuService();
