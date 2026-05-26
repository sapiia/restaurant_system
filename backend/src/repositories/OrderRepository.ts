import { AppDataSource } from "../config/database";
import { Order } from "../entities/Order";

export class OrderRepository {
  private repo = AppDataSource.getRepository(Order);

  create(data: Partial<Order>) {
    return this.repo.save(data);
  }

  findAll() {
    return this.repo.find({
      relations: {
        items: true
      }
    });
  }

  findById(id: number) {
    return this.repo.findOne({
      where: { id },
      relations: {
        items: true
      }
    });
  }

  async delete(id: number) {
    return this.repo.delete(id);
  }

  save(order: Order) {
    return this.repo.save(order);
  }
}