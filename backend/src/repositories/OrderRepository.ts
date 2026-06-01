import { AppDataSource } from '../config/database.js';
import { Orders } from '../entities/Orders.js';
import { PaymentStatus } from '../entities/Orders.js';
// import { PaymentStatus } from '../entities/Payment.js';

export class OrderRepository {
  private repo = AppDataSource.getRepository(Orders);

  create(data: Partial<Orders>) {
    return this.repo.save(data);
  }

  findAll() {
    return this.repo.find({
      relations: {
        items: {
          menuItem: true,
        },
      },
      order: { createdAt: 'DESC' },
    });
  }

  findById(id: number) {
    return this.repo.findOne({
      where: { id },
      relations: {
        items: {
          menuItem: true,
        },
      },
    });
  }

  async delete(id: number) {
    return this.repo.delete(id);
  }

  save(order: Orders) {
    return this.repo.save(order);
  }

  findByTableNumber(tableNumber: number) {
  return this.repo.find({
    where: { tableNumber },
    relations: { items: { menuItem: true } },
    order: { createdAt: 'DESC' },
  });
}

findUnpaidByTableNumber(tableNumber: number) {
  return this.repo.find({
    where: {
      tableNumber,
      paymentStatus: PaymentStatus.UNPAID,
    },
    relations: { items: { menuItem: true } },
    order: { createdAt: 'DESC' },
  });
}

findAllUnpaid() {
  return this.repo.find({
    where: { paymentStatus: PaymentStatus.UNPAID },
    relations: { items: { menuItem: true } },
    order: { tableNumber: 'ASC', createdAt: 'DESC' },
  });
}
}