import { OrderRepository } from "../repositories/OrderRepository";
import { OrderStatus } from "../entities/Order";

export class OrderService {
  private repo = new OrderRepository();

  async createOrder(data: any) {
    const total = data.items.reduce(
      (sum: number, item: any) =>
        sum + item.price * item.quantity,
      0
    );

    return this.repo.create({
      tableNumber: data.tableNumber,
      totalPrice: total,
      items: data.items
    });
  }

  async getOrders() {
    return this.repo.findAll();
  }

  async updateStatus(id: number, status: OrderStatus) {
    const order = await this.repo.findById(id);

    if (!order) throw new Error("Order not found");

    order.status = status;

    return this.repo.save(order);
  }

  async deleteOrder(id: number) {
    return this.repo.delete(id);
  }
}