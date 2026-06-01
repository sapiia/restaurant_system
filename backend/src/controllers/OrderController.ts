import { Request, Response } from "express";
import { OrderService } from "../services/OrderService.js";

export class OrderController {
  private service = new OrderService();

  create = async (req: Request, res: Response) => {
    const order = await this.service.createOrder(req.body);

    res.status(201).json(order);
  };

  getAll = async (_: Request, res: Response) => {
    const orders = await this.service.getOrders();

    res.json(orders);
  };
  getById = async (req: Request, res: Response) => {
    try {
      const order = await this.service.getOrderById(Number(req.params.id));
      if (!order) {
        res.status(404).json({ success: false, message: 'Order not found' });
        return;
      }
      res.status(200).json({
        success: true,
        message: 'Order fetched successfully',
        data: order,
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

  updateStatus = async (req: Request, res: Response) => {
    const order = await this.service.updateStatus(
      Number(req.params.id),
      req.body.status
    );

    res.json(order);
  };

  delete = async (req: Request, res: Response) => {
    await this.service.deleteOrder(
      Number(req.params.id)
    );

    res.json({
      message: "Deleted successfully"
    });
  };

  getByTable = async (req: Request, res: Response) => {
    try {
      const orders = await this.service.getOrdersByTable(Number(req.params.table_number));
      res.status(200).json({
        success: true,
        message: 'Orders fetched by table',
        data: orders,
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

  getUnpaidByTable = async (req: Request, res: Response) => {
    try {
      const orders = await this.service.getUnpaidByTable(Number(req.params.table_number));
      res.status(200).json({
        success: true,
        message: 'Unpaid orders fetched by table',
        data: orders,
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

  getAllUnpaid = async (_: Request, res: Response) => {
    try {
      const grouped = await this.service.getAllUnpaid();
      res.status(200).json({
        success: true,
        message: 'All unpaid orders grouped by table',
        data: grouped,
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
}