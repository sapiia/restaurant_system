import { OrderRepository } from '../repositories/OrderRepository.js';
import { OrderStatus } from '../entities/Orders.js';
import { MenuItemRepository } from '../repositories/MenuRepository.js';

export class OrderService {
  private repo = new OrderRepository();

  async createOrder(data: any) {
    const { table_number, items } = data;

    let total = 0;
    const orderItems = [];

    for (const item of items) {
      const menuItem = await MenuItemRepository.findOne({
        where: { id: Number(item.menu_item_id) },
      });

      if (!menuItem) throw new Error(`Menu item ${item.menu_item_id} not found`);
      if (!menuItem.is_available) throw new Error(`Menu item ${menuItem.name} is not available`);

      const itemTotal = Number(menuItem.price) * Number(item.quantity);
      total += itemTotal;

      orderItems.push({
        menuItem: { id: menuItem.id },
        quantity: Number(item.quantity),
        price: Number(menuItem.price),
      });
    }

    return this.repo.create({
      tableNumber: Number(table_number),
      totalPrice: total,
      items: orderItems as any,
    });
  }

  async getOrders() {
    return this.repo.findAll();
  }
  async getOrderById(id: number) {
    return this.repo.findById(id);
  }

  async updateStatus(id: number, status: OrderStatus) {
    const order = await this.repo.findById(id);
    if (!order) throw new Error('Order not found');

    order.orderStatus = status;
    return this.repo.save(order);
  }

  async deleteOrder(id: number) {
    return this.repo.delete(id);
  }

  async getOrdersByTable(tableNumber: number) {
    return this.repo.findByTableNumber(tableNumber);
  }

  async getUnpaidByTable(tableNumber: number) {
    return this.repo.findUnpaidByTableNumber(tableNumber);
  }

  async getAllUnpaid() {
    const orders = await this.repo.findAllUnpaid();

    // group by table number
    const grouped = orders.reduce((acc: any, order) => {
      const table = order.tableNumber;
      if (!acc[table]) {
        acc[table] = {
          table_number: table,
          orders: [],
          total_unpaid: 0,
        };
      }
      acc[table].orders.push(order);
      acc[table].total_unpaid += Number(order.totalPrice);
      return acc;
    }, {});

    return Object.values(grouped);
  }
}