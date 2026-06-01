import { Request, Response } from 'express';
import { PaymentService } from '../services/PaymentService.js';

export class PaymentController {
    private service = new PaymentService();

    create = async (req: Request, res: Response) => {
        try {
            const payment = await this.service.createPayment(req.body);
            res.status(201).json({
                success: true,
                message: 'Payment processed successfully',
                data: payment,
            });
        } catch (error: any) {
            const status =
                error.message === 'Order not found' ? 404 :
                    error.message === 'Order already paid' ? 409 :
                        error.message.includes('must be SERVED') ? 400 : 500;
            res.status(status).json({ success: false, message: error.message });
        }
    };

    getAll = async (_: Request, res: Response) => {
        try {
            const payments = await this.service.getAllPayments();
            res.status(200).json({
                success: true,
                message: 'Payments fetched successfully',
                data: payments,
            });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    };

    getById = async (req: Request, res: Response) => {
        try {
            const payment = await this.service.getPaymentById(Number(req.params.id));
            if (!payment) {
                res.status(404).json({ success: false, message: 'Payment not found' });
                return;
            }
            res.status(200).json({
                success: true,
                message: 'Payment fetched successfully',
                data: payment,
            });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    };

    getByOrderId = async (req: Request, res: Response) => {
        try {
            const payment = await this.service.getPaymentByOrderId(Number(req.params.order_id));
            if (!payment) {
                res.status(404).json({ success: false, message: 'Payment not found' });
                return;
            }
            res.status(200).json({
                success: true,
                message: 'Payment fetched successfully',
                data: payment,
            });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    };

    getByTable = async (req: Request, res: Response) => {
        try {
            const payments = await this.service.getPaymentsByTable(Number(req.params.table_number));
            res.status(200).json({
                success: true,
                message: 'Payments fetched by table',
                data: payments,
            });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    };
}