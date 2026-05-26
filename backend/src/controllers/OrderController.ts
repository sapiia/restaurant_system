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
}