import { PromotionRepository } from '../repositories/PromotionRepository.js';
import { Promotion, PromotionType } from '../entities/Promotion.js';

export class PromotionService {
  private repo = new PromotionRepository();

  getAllPromotions() {
    return this.repo.findAll();
  }

  getActivePromotions() {
    return this.repo.findActive();
  }

  getPromotionById(id: number) {
    return this.repo.findById(id);
  }

  createPromotion(data: Partial<Promotion>) {
    return this.repo.create(data);
  }

  async updatePromotion(id: number, data: Partial<Promotion>) {
    const promo = await this.repo.findById(id);
    if (!promo) throw new Error('Promotion not found');
    return this.repo.update(id, data);
  }

  async deletePromotion(id: number) {
    const promo = await this.repo.findById(id);
    if (!promo) throw new Error('Promotion not found');
    const deleted = await this.repo.delete(id);
    if (!deleted) throw new Error('Failed to delete promotion');
    return { message: 'Promotion deleted successfully' };
  }

  // apply promotions to order items
  async applyPromotions(items: { menu_item_id: number; quantity: number; price: number }[]) {
    const promotions = await this.repo.findActive();
    const freeItems: { menu_item_id: number; quantity: number; price: number }[] = [];

    for (const promo of promotions) {

      // FREE_ITEM — buy main course get free drink
      if (promo.type === PromotionType.FREE_ITEM && promo.free_item_id) {
        const trigger = items.find(i =>
          (promo.buy_item_id && i.menu_item_id === promo.buy_item_id) ||
          (promo.buy_category_id)
        );
        if (trigger && trigger.quantity >= promo.min_quantity) {
          freeItems.push({
            menu_item_id: promo.free_item_id,
            quantity:     promo.free_quantity,
            price:        0,
          });
        }
      }

      // PERCENT discount
      if (promo.type === PromotionType.PERCENT && promo.discount_value) {
        items.forEach(i => {
          if (promo.buy_item_id && i.menu_item_id === promo.buy_item_id) {
            i.price = i.price * (1 - Number(promo.discount_value) / 100);
          }
        });
      }

      // FIXED discount
      if (promo.type === PromotionType.FIXED && promo.discount_value) {
        items.forEach(i => {
          if (promo.buy_item_id && i.menu_item_id === promo.buy_item_id) {
            i.price = Math.max(0, i.price - Number(promo.discount_value));
          }
        });
      }
    }

    return { items, freeItems };
  }
}