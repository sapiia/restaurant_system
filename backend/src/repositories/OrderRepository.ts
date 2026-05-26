import { AppDataSource } from "../config/database.js";
import { Orders } from "../entities/Orders.js";

export class OrderRepository {
  private repo = AppDataSource.getRepository(Orders);

  create(data: Partial<Orders>) {
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

  save(order: Orders) {
    return this.repo.save(order);
  }
}