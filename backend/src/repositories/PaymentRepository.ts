import { AppDataSource } from '../config/database.js';
import { Payment } from '../entities/Payment.js';

export class PaymentRepository {
  private repo = AppDataSource.getRepository(Payment);

  findAll() {
    return this.repo.find({
      relations: { order: true },
      order: { paid_at: 'DESC' },
    });
  }

  findById(id: number) {
    return this.repo.findOne({
      where: { id },
      relations: { order: true },
    });
  }

  findByOrderId(order_id: number) {
    return this.repo.findOne({
      where: { order_id },
      relations: { order: true },
    });
  }

  findByTableNumber(tableNumber: number) {
    return this.repo
      .createQueryBuilder('payment')
      .leftJoinAndSelect('payment.order', 'order')
      .where('order.tableNumber = :tableNumber', { tableNumber })
      .orderBy('payment.paid_at', 'DESC')
      .getMany();
  }

  create(data: Partial<Payment>) {
    return this.repo.save(data);
  }
}