import { PaymentRepository } from '../repositories/PaymentRepository.js';
import { OrderRepository } from '../repositories/OrderRepository.js';
import { PaymentMethod } from '../entities/Payment.js';
import { OrderStatus, PaymentStatus } from '../entities/Orders.js';

export class PaymentService {
  private paymentRepo = new PaymentRepository();
  private orderRepo   = new OrderRepository();

  async createPayment(data: {
    order_id: number;
    payment_method: PaymentMethod;
    amount: number;
  }) {
    const order = await this.orderRepo.findById(data.order_id);
    if (!order) throw new Error('Order not found');

    if (order.orderStatus !== OrderStatus.SERVED && order.orderStatus !== OrderStatus.COMPLETED) {
      throw new Error('Order must be SERVED before payment');
    }

    if (order.paymentStatus === PaymentStatus.PAID) {
      throw new Error('Order already paid');
    }

    const payment = await this.paymentRepo.create({
      order_id:       data.order_id,
      payment_method: data.payment_method,
      amount:         data.amount,
    });

    // update order to COMPLETED and PAID
    order.paymentStatus = PaymentStatus.PAID;
    order.orderStatus   = OrderStatus.COMPLETED;
    await this.orderRepo.save(order);

    return payment;
  }

  getAllPayments() {
    return this.paymentRepo.findAll();
  }

  getPaymentById(id: number) {
    return this.paymentRepo.findById(id);
  }

  getPaymentByOrderId(order_id: number) {
    return this.paymentRepo.findByOrderId(order_id);
  }
  
  getPaymentsByTable(tableNumber: number) {
  return this.paymentRepo.findByTableNumber(tableNumber);
}
}