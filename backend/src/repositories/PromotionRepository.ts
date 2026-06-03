import { AppDataSource } from '../config/database.js';
import { Promotion } from '../entities/Promotion.js';

export class PromotionRepository {
  private repo = AppDataSource.getRepository(Promotion);

  findAll() {
    return this.repo.find({
      relations: {
        buy_item: true,
        buy_category: true,
        free_item: true,
      },
      order: { created_at: 'DESC' },
    });
  }

  findActive() {
    return this.repo
      .createQueryBuilder('promo')
      .leftJoinAndSelect('promo.buy_item', 'buy_item')
      .leftJoinAndSelect('promo.buy_category', 'buy_category')
      .leftJoinAndSelect('promo.free_item', 'free_item')
      .where('promo.is_active = true')
      .andWhere('(promo.starts_at IS NULL OR promo.starts_at <= NOW())')
      .andWhere('(promo.ends_at IS NULL OR promo.ends_at >= NOW())')
      .getMany();
  }

  findById(id: number) {
    return this.repo.findOne({
      where: { id },
      relations: {
        buy_item: true,
        buy_category: true,
        free_item: true,
      },
    });
  }

  create(data: Partial<Promotion>) {
    const promo = this.repo.create(data);
    return this.repo.save(promo);
  }

  async update(id: number, data: Partial<Promotion>) {
    await this.repo.update(id, data);
    return this.findById(id);
  }

  async delete(id: number) {
    const result = await this.repo.delete(id);
    return result.affected !== 0;
  }
}